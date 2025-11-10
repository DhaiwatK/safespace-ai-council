const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Types
export interface Case {
  id: string;
  case_number: string;
  category: string;
  status: string;
  priority: string;
  filed_date: string;
  description: string;
  evidence_count: number;
  witness_count: number;
}

export interface AgentVote {
  agent: string;
  specialty: string;
  vote: "YES" | "NO";
  confidence: number;
  reasoning: string;
  citations: string[];
}

export interface ConsensusResult {
  question: string;
  consensus_decision: "YES" | "NO";
  consensus_confidence: number;
  yes_votes: number;
  no_votes: number;
  yes_percentage: number;
  disagreement_flag: boolean;
  recommendation: string;
  agent_votes: AgentVote[];
}

// Cases API
export const casesAPI = {
  async getCases(): Promise<Case[]> {
    const response = await fetch(`${API_BASE_URL}/api/cases/`);
    if (!response.ok) throw new Error('Failed to fetch cases');
    return response.json();
  },

  async getCase(caseId: string): Promise<Case> {
    const response = await fetch(`${API_BASE_URL}/api/cases/${caseId}`);
    if (!response.ok) throw new Error('Failed to fetch case');
    return response.json();
  },

  async createCase(caseData: any): Promise<Case> {
    const response = await fetch(`${API_BASE_URL}/api/cases/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(caseData)
    });
    if (!response.ok) throw new Error('Failed to create case');
    return response.json();
  }
};

// AI API
export const aiAPI = {
  async runConsensus(question: string, caseData: Case): Promise<ConsensusResult> {
    const response = await fetch(`${API_BASE_URL}/api/ai/consensus`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question,
        case_data: caseData
      })
    });
    if (!response.ok) throw new Error('Failed to run consensus');
    return response.json();
  },

  async checkBias(text: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/api/ai/bias-check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    if (!response.ok) throw new Error('Failed to check bias');
    return response.json();
  }
};

// Evidence API
export const evidenceAPI = {
  async uploadEvidence(caseId: string, file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('case_id', caseId);

    const response = await fetch(`${API_BASE_URL}/api/evidence/upload`, {
      method: 'POST',
      body: formData
    });
    if (!response.ok) throw new Error('Failed to upload evidence');
    return response.json();
  },

  async getEvidence(caseId: string): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/api/evidence/${caseId}`);
    if (!response.ok) throw new Error('Failed to fetch evidence');
    return response.json();
  }
};
