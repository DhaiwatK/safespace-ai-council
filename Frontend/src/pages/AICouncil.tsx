import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Scale, Heart, Users, Search as SearchIcon, Shield as ShieldIcon, Brain, ArrowLeft, Loader2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { casesAPI, aiAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import GlobalFooter from "@/components/GlobalFooter";

const AICouncil = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Get caseId from location state
  const caseId = location.state?.caseId;

  const [caseData, setCaseData] = useState<any>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [expandedAgents, setExpandedAgents] = useState<string[]>([]);

  // Fetch case data and cached analysis on mount
  useEffect(() => {
    const fetchCase = async () => {
      if (!caseId) {
        toast({
          title: "No case selected",
          description: "Please select a case from the dashboard.",
          variant: "destructive"
        });
        navigate("/investigator");
        return;
      }

      try {
        const data = await casesAPI.getCase(caseId);
        setCaseData(data);

        // Check for cached analysis
        try {
          const cachedAnalysis = await aiAPI.getCachedAnalysis(caseId);
          if (cachedAnalysis) {
            setAnalysisResult(cachedAnalysis);
            console.log("✓ Loaded cached analysis for", caseId);
          }
        } catch (error) {
          // No cached analysis available - that's ok
          console.log("No cached analysis for", caseId);
        }
      } catch (error) {
        console.error("Failed to fetch case:", error);
        toast({
          title: "Failed to load case",
          description: "Could not load case details.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCase();
  }, [caseId, navigate, toast]);

  const toggleAgent = (agentId: string) => {
    setExpandedAgents(prev =>
      prev.includes(agentId) ? prev.filter(id => id !== agentId) : [...prev, agentId]
    );
  };

  const runAnalysis = async () => {
    if (!caseData) return;

    setAnalyzing(true);
    try {
      const question = "Does this incident meet Title IX hostile environment standard?";
      const result = await aiAPI.analyzeCase(caseData.id, question);
      setAnalysisResult(result);
      toast({
        title: "Analysis complete",
        description: `AI Council reached ${result.decision} with ${Math.round(result.confidence * 100)}% confidence.`,
      });
    } catch (error) {
      console.error("Analysis failed:", error);
      toast({
        title: "Analysis failed",
        description: "Could not complete AI analysis. Please try again.",
        variant: "destructive"
      });
    } finally {
      setAnalyzing(false);
    }
  };

  // Map agent name to icon and color
  const getAgentConfig = (agentName: string) => {
    const name = agentName.toLowerCase();
    if (name.includes('lex')) return { icon: Scale, color: 'agent-lex' };
    if (name.includes('sofia')) return { icon: Heart, color: 'agent-sofia' };
    if (name.includes('equity')) return { icon: Users, color: 'agent-equity' };
    if (name.includes('holmes')) return { icon: SearchIcon, color: 'agent-holmes' };
    if (name.includes('sentinel')) return { icon: ShieldIcon, color: 'agent-sentinel' };
    return { icon: Brain, color: 'primary' };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading case details...</p>
        </div>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8">
          <p className="text-muted-foreground">Case not found</p>
          <Button onClick={() => navigate("/investigator")} className="mt-4">
            Back to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  // Check if there's disagreement
  const hasDisagreement = analysisResult?.has_disagreement || false;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/investigator")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold mb-2">AI DELIBERATION COUNCIL</h1>
                <p className="text-sm text-muted-foreground">Case #{caseData.case_number} • {caseData.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-sm">
                <Brain className="mr-2 h-4 w-4" />
                5 Agents
              </Badge>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Case Summary */}
          <Card className="p-6 bg-muted/50">
            <h2 className="text-lg font-semibold mb-3">Case Summary</h2>
            <p className="text-base leading-relaxed mb-4">{caseData.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Status:</span>{" "}
                <Badge variant="secondary">{caseData.status}</Badge>
              </div>
              <div>
                <span className="text-muted-foreground">Priority:</span>{" "}
                <Badge variant={caseData.priority === "Urgent" ? "destructive" : "secondary"}>
                  {caseData.priority}
                </Badge>
              </div>
              <div>
                <span className="text-muted-foreground">Evidence:</span>{" "}
                <span className="font-medium">{caseData.evidence_count} items</span>
              </div>
              <div>
                <span className="text-muted-foreground">Witnesses:</span>{" "}
                <span className="font-medium">{caseData.witness_count}</span>
              </div>
            </div>
          </Card>

          {/* Run Analysis Button */}
          {!analysisResult && (
            <Card className="p-8 text-center">
              <h2 className="text-xl font-semibold mb-4">Ready to Analyze</h2>
              <p className="text-muted-foreground mb-6">
                Run AI Council analysis to get independent assessments from 5 specialized agents
              </p>
              <Button
                onClick={runAnalysis}
                disabled={analyzing}
                size="lg"
                className="min-w-[200px]"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-5 w-5" />
                    Analyze Title IX Jurisdiction
                  </>
                )}
              </Button>
              {analyzing && (
                <p className="text-sm text-muted-foreground mt-4">
                  This may take 15-25 seconds with local LLM...
                </p>
              )}
            </Card>
          )}

          {/* Analysis Results */}
          {analysisResult && (
            <>
              {/* Consensus Summary */}
              <Card className={`p-8 bg-gradient-to-br ${
                hasDisagreement
                  ? "from-warning/10 to-background border-2 border-warning"
                  : analysisResult.decision === "NO"
                  ? "from-destructive/10 to-background border-2 border-destructive"
                  : "from-primary/10 to-background border-2 border-primary"
              } shadow-lg`}>
                <div className="text-center space-y-6">
                  <p className={`text-xs font-semibold uppercase tracking-wider ${
                    hasDisagreement ? "text-warning" : "text-primary"
                  }`}>
                    {hasDisagreement ? "⚠️ AGENTS DISAGREE" : "CONSENSUS REACHED"}
                  </p>

                  <div className="space-y-2">
                    <h2 className={`text-6xl font-extrabold animate-in fade-in-50 zoom-in-95 duration-500 ${
                      hasDisagreement
                        ? "text-warning"
                        : analysisResult.decision === "YES"
                        ? "text-success"
                        : "text-destructive"
                    }`}>
                      {analysisResult.decision}
                    </h2>
                    <p className="text-xl text-muted-foreground">
                      [{Math.round(analysisResult.confidence * 100)}% confidence]
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="relative h-6 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${
                          hasDisagreement
                            ? "from-warning to-destructive"
                            : analysisResult.decision === "YES"
                            ? "from-success to-primary"
                            : "from-destructive to-red-600"
                        } animate-in slide-in-from-left-full duration-1000 flex items-center justify-end pr-3`}
                        style={{ width: `${analysisResult.confidence * 100}%` }}
                      >
                        <span className="text-xs font-bold text-white">
                          {Math.round(analysisResult.confidence * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <Card className={`p-4 text-left ${
                    hasDisagreement
                      ? "bg-warning/10 border-warning/30"
                      : "bg-success/10 border-success/30"
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        hasDisagreement
                          ? "bg-warning/20"
                          : "bg-success/20"
                      }`}>
                        <span className={`text-sm ${
                          hasDisagreement ? "text-warning" : "text-success"
                        }`}>
                          {hasDisagreement ? "⚠" : "✓"}
                        </span>
                      </div>
                      <div>
                        <h3 className={`font-semibold mb-1 ${
                          hasDisagreement ? "text-warning" : "text-success"
                        }`}>
                          {hasDisagreement ? "PROCEED WITH CAUTION" : "RECOMMENDATION"}
                        </h3>
                        <p className="text-sm text-foreground/90">
                          {analysisResult.recommendation}
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Button
                    onClick={runAnalysis}
                    disabled={analyzing}
                    variant="outline"
                    size="sm"
                  >
                    {analyzing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Re-run Analysis
                  </Button>
                </div>
              </Card>

              {/* Agent Cards */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Individual Agent Analysis</h2>

                {analysisResult.agent_breakdown.map((agent: any) => {
                  const isExpanded = expandedAgents.includes(agent.agent_name);
                  const config = getAgentConfig(agent.agent_name);
                  const Icon = config.icon;

                  return (
                    <Card
                      key={agent.agent_name}
                      className={`transition-all duration-300 hover-lift border-2`}
                      style={{
                        borderColor: isExpanded ? `hsl(var(--${config.color}))` : `hsl(var(--${config.color}) / 0.3)`,
                      }}
                    >
                      {/* Card Header */}
                      <div
                        className="p-5 cursor-pointer"
                        onClick={() => toggleAgent(agent.agent_name)}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3 flex-1">
                            <div
                              className={`h-4 w-4 rounded-full flex-shrink-0 mt-1`}
                              style={{ backgroundColor: `hsl(var(--${config.color}))` }}
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-bold">{agent.agent_name}</h3>
                              <p className="text-sm text-muted-foreground">{agent.agent_role}</p>

                              {!isExpanded && (
                                <div className="mt-3 space-y-2">
                                  <div className="flex items-center gap-3">
                                    <span className={`text-2xl font-bold ${agent.vote === 'YES' ? 'text-success' : 'text-destructive'}`}>
                                      {agent.vote}
                                    </span>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                                        <div
                                          className="h-full transition-all duration-700"
                                          style={{
                                            width: `${agent.confidence * 100}%`,
                                            backgroundColor: `hsl(var(--${config.color}))`,
                                            boxShadow: `0 0 8px hsl(var(--${config.color}) / 0.4)`,
                                          }}
                                        />
                                      </div>
                                      <span
                                        className="text-sm font-semibold min-w-[3rem] text-right"
                                        style={{ color: `hsl(var(--${config.color}))` }}
                                      >
                                        {Math.round(agent.confidence * 100)}%
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex-shrink-0"
                            style={{ color: `hsl(var(--${config.color}))` }}
                          >
                            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                          </Button>
                        </div>
                      </div>

                      {/* Expanded Content */}
                      {isExpanded && (
                        <div className="px-5 pb-5 space-y-4 border-t animate-accordion-down">
                          <div className="pt-4">
                            <div className="flex items-center gap-3 mb-3">
                              <span className={`text-3xl font-bold ${agent.vote === 'YES' ? 'text-success' : 'text-destructive'}`}>
                                {agent.vote}
                              </span>
                              <div className="flex-1">
                                <div className="h-4 bg-muted rounded-full overflow-hidden">
                                  <div
                                    className="h-full transition-all duration-700"
                                    style={{
                                      width: `${agent.confidence * 100}%`,
                                      backgroundColor: `hsl(var(--${config.color}))`,
                                      boxShadow: `0 0 8px hsl(var(--${config.color}) / 0.4)`,
                                    }}
                                  />
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {Math.round(agent.confidence * 100)}% confidence
                                </p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4
                              className="text-sm font-bold uppercase tracking-wide mb-2"
                              style={{ color: `hsl(var(--${config.color}))`, letterSpacing: '0.5px' }}
                            >
                              Reasoning
                            </h4>
                            <p className="text-base leading-relaxed whitespace-pre-wrap">{agent.reasoning}</p>
                          </div>

                          {agent.citations && agent.citations.length > 0 && (
                            <div>
                              <h4
                                className="text-sm font-bold uppercase tracking-wide mb-2"
                                style={{ color: `hsl(var(--${config.color}))`, letterSpacing: '0.5px' }}
                              >
                                Supporting Evidence
                              </h4>
                              <ul className="space-y-2 pl-6">
                                {agent.citations.map((citation: string, idx: number) => (
                                  <li
                                    key={idx}
                                    className="text-sm leading-relaxed list-disc"
                                  >
                                    {citation}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Global Footer */}
      <GlobalFooter />
    </div>
  );
};

export default AICouncil;
