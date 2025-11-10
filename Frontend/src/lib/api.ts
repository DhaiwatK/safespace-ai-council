/**
 * API client for SafeSpace AI Council Backend
 */

// Use empty string (same origin) for production, localhost:8000 for dev
const API_BASE_URL = import.meta.env.VITE_API_URL !== undefined
  ? import.meta.env.VITE_API_URL
  : (import.meta.env.DEV ? 'http://localhost:8000' : '');

// Helper function for API requests
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `API Error: ${response.status}`);
  }

  return response.json();
}

// Auth API
export const authAPI = {
  login: async (role: 'complainant' | 'respondent' | 'investigator' | 'administrator') => {
    return apiRequest<{
      user: {
        id: string;
        email: string;
        name: string;
        role: string;
      };
      token: string;
    }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ role }),
    });
  },

  getCurrentUser: async () => {
    return apiRequest<{
      id: string;
      email: string;
      name: string;
      role: string;
    }>('/api/auth/user');
  },
};

// Cases API
export const casesAPI = {
  getCases: async (filters?: { status?: string; category?: string }) => {
    const params = new URLSearchParams(filters as any).toString();
    return apiRequest<any[]>(`/api/cases?${params}`);
  },

  getCase: async (caseId: string) => {
    return apiRequest<any>(`/api/cases/${caseId}`);
  },

  submitComplaint: async (complaint: {
    category: string;
    incident_date: string;
    incident_location?: string;
    description: string;
    is_ongoing: boolean;
    is_crisis: boolean;
  }) => {
    return apiRequest<any>('/api/cases/intake', {
      method: 'POST',
      body: JSON.stringify(complaint),
    });
  },

  getStats: async () => {
    return apiRequest<{
      total_cases: number;
      active_cases: number;
      pending_review: number;
      approaching_deadline: number;
      average_resolution_days: number;
    }>('/api/cases/stats');
  },
};

// Evidence API
export const evidenceAPI = {
  getCaseEvidence: async (caseId: string) => {
    return apiRequest<any[]>(`/api/evidence/case/${caseId}`);
  },

  uploadEvidence: async (caseId: string, upload: {
    file_name: string;
    file_type: string;
    file_data: string;
    description?: string;
  }) => {
    return apiRequest<any>(`/api/evidence/upload?case_id=${caseId}`, {
      method: 'POST',
      body: JSON.stringify(upload),
    });
  },
};

// AI Analysis API
export const aiAPI = {
  analyzeCase: async (caseId: string, question: string) => {
    return apiRequest<{
      question: string;
      decision: string;
      confidence: number;
      yes_votes: number;
      no_votes: number;
      yes_percentage: number;
      has_disagreement: boolean;
      agent_breakdown: Array<{
        agent_name: string;
        agent_role: string;
        vote: string;
        confidence: number;
        reasoning: string;
        citations?: string[];
        recommendations?: string[];
      }>;
      recommendation: string;
      analyzed_at: string;
    }>('/api/ai/analyze', {
      method: 'POST',
      body: JSON.stringify({ case_id: caseId, question }),
    });
  },

  analyzeTitleIX: async (caseId: string) => {
    return apiRequest<any>(`/api/ai/analyze/title-ix/${caseId}`);
  },

  getPatterns: async () => {
    return apiRequest<any[]>('/api/ai/patterns/');
  },

  biasCheck: async (text: string) => {
    return apiRequest<{
      has_bias: boolean;
      flags: Array<{
        term: string;
        suggestion: string;
        severity: string;
      }>;
      overall_tone: string;
    }>('/api/ai/bias-check', {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  },
};

// Health check
export const healthAPI = {
  check: async () => {
    return apiRequest<{
      status: string;
      llm_provider: string;
      anthropic_available: boolean;
      local_llm_available: boolean;
    }>('/api/health');
  },

  getConfig: async () => {
    return apiRequest<{
      llm_provider: string;
      anthropic_available: boolean;
      local_llm_available: boolean;
      can_toggle_provider: boolean;
    }>('/api/config');
  },
};
