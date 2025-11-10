import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronUp, Scale, Brain, Shield, Search, AlertTriangle, Download, Share2, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AgentVote {
  agent: "lex" | "sofia" | "equity" | "holmes" | "sentinel";
  name: string;
  role: string;
  vote: "YES" | "NO";
  confidence: number;
  reasoning: string;
  citations: string[];
  color: string;
}

const AICouncil = () => {
  const navigate = useNavigate();
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);

  const question = "Does this incident meet Title IX hostile environment standard?";
  const consensus = {
    decision: "YES" as const,
    confidence: 90,
    agreement: "5/5",
    confidenceRange: [85, 95] as [number, number],
    recommendation: "HIGH CONFIDENCE: Strong consensus reached. Evidence supports Title IX violation. Recommend proceeding to formal investigation.",
  };

  const agents: AgentVote[] = [
    {
      agent: "lex",
      name: "Lex",
      role: "Legal Compliance Agent",
      vote: "YES",
      confidence: 88,
      reasoning: "The pattern of conduct described meets the legal threshold for hostile environment harassment under Title IX. Multiple incidents over time, creating an intimidating educational environment, with the institution having actual knowledge.",
      citations: [
        "20 U.S.C. § 1681 (Title IX statute)",
        "Davis v. Monroe County Board of Education (1999)",
        "OCR 2001 Revised Sexual Harassment Guidance",
      ],
      color: "lex",
    },
    {
      agent: "sofia",
      name: "Sofia",
      role: "Trauma-Informed Analysis",
      vote: "YES",
      confidence: 92,
      reasoning: "Complainant's account shows clear trauma indicators consistent with genuine disclosure. Delayed reporting is typical (73% of cases). Emotional responses align with research on harassment survivors. Power dynamics evident in relationship.",
      citations: [
        "Delayed disclosure typical in 73% of harassment cases",
        "Avoidance behavior matches PTSD criteria",
        "Language patterns consistent with authentic trauma narrative",
      ],
      color: "sofia",
    },
    {
      agent: "equity",
      name: "Equity",
      role: "Bias Detection Specialist",
      vote: "YES",
      confidence: 85,
      reasoning: "Analysis of both accounts reveals no significant investigator bias. Language used is balanced and neutral. Both parties given equal opportunity to present evidence. Minor stylistic differences noted but not material to findings.",
      citations: [
        "Neutral language ratio: 94% compliant",
        "No gender-based language discrepancies detected",
        "Equal questioning time: complainant 47 min, respondent 49 min",
      ],
      color: "equity",
    },
    {
      agent: "holmes",
      name: "Holmes",
      role: "Evidence Analysis",
      vote: "YES",
      confidence: 95,
      reasoning: "Physical evidence strongly corroborates complainant timeline. Three independent witnesses verify key facts. Text message metadata confirms dates/times. No contradictory evidence found. Chain of custody intact for all exhibits.",
      citations: [
        "3 witnesses corroborate complainant timeline",
        "Text message metadata timestamp verified",
        "Security camera footage confirms location at stated time",
        "SHA-256 hash verified for all digital evidence",
      ],
      color: "holmes",
    },
    {
      agent: "sentinel",
      name: "Sentinel",
      role: "Risk Assessment",
      vote: "YES",
      confidence: 90,
      reasoning: "HIGH RISK: Respondent has prior complaint on record (2023). Pattern suggests escalating behavior. Without intervention, probability of future incidents: 78%. Immediate protective measures warranted. Recommend interim restrictions pending resolution.",
      citations: [
        "Prior complaint: NW-2023-TIX-0089 (similar allegations)",
        "Risk assessment score: 8.2/10 (high)",
        "Reoffense probability without intervention: 78%",
      ],
      color: "sentinel",
    },
  ];

  const getAgentIcon = (agent: string) => {
    switch (agent) {
      case "lex": return Scale;
      case "sofia": return Brain;
      case "equity": return Shield;
      case "holmes": return Search;
      case "sentinel": return AlertTriangle;
      default: return Brain;
    }
  };

  const toggleAgent = (agentName: string) => {
    setExpandedAgent(expandedAgent === agentName ? null : agentName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => navigate("/investigator")}>
                ← Back to Case
              </Button>
              <Badge variant="outline" className="font-mono">
                Case: NW-2025-TIX-0147
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Title Section */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">AI DELIBERATION COUNCIL</h1>
            <Card className="p-6 bg-muted border-l-4 border-l-primary">
              <p className="text-lg font-medium">{question}</p>
            </Card>
          </div>

          {/* Consensus Summary - The Hero Moment */}
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-card border-2 border-primary shadow-xl animate-scale-in">
            <div className="space-y-6">
              <p className="text-xs font-semibold text-primary text-center uppercase tracking-wider">
                CONSENSUS REACHED
              </p>
              
              <div className="text-center">
                <p className="text-6xl md:text-7xl font-extrabold text-success mb-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                  {consensus.decision}
                </p>
                <p className="text-2xl text-muted-foreground mb-4">[{consensus.confidence}% confidence]</p>
              </div>

              {/* Confidence Bar */}
              <div className="space-y-2">
                <div className="relative h-6 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-success to-primary transition-all duration-1000 ease-out flex items-center justify-end pr-3"
                    style={{ width: `${consensus.confidence}%` }}
                  >
                    <span className="text-xs font-bold text-white">{consensus.confidence}%</span>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{consensus.agreement} agents agree</span>
                  <span>Range: {consensus.confidenceRange[0]}% - {consensus.confidenceRange[1]}%</span>
                </div>
              </div>

              {/* Recommendation */}
              <Card className="p-4 bg-success/10 border-l-4 border-l-success">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-success flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-sm leading-relaxed">{consensus.recommendation}</p>
                </div>
              </Card>
            </div>
          </Card>

          {/* Individual Agent Cards */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Individual Agent Analysis</h2>
            
            {agents.map((agent, index) => {
              const Icon = getAgentIcon(agent.agent);
              const isExpanded = expandedAgent === agent.agent;
              const agentColorClass = `agent-${agent.color}`;
              
              return (
                <Card
                  key={agent.agent}
                  className={`transition-all duration-300 hover-lift ${
                    isExpanded ? `border-2 border-${agentColorClass}` : `border-2 border-${agentColorClass}/30`
                  }`}
                  style={{
                    animationDelay: `${1400 + index * 100}ms`,
                    borderColor: isExpanded ? `hsl(var(--agent-${agent.color}))` : `hsl(var(--agent-${agent.color}) / 0.3)`,
                  }}
                >
                  {/* Card Header */}
                  <div
                    className="p-5 cursor-pointer"
                    onClick={() => toggleAgent(agent.agent)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div
                          className={`h-4 w-4 rounded-full flex-shrink-0 mt-1 agent-pulse`}
                          style={{ backgroundColor: `hsl(var(--agent-${agent.color}))` }}
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold">{agent.name}</h3>
                          <p className="text-sm text-muted-foreground">{agent.role}</p>
                          
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
                                        width: `${agent.confidence}%`,
                                        backgroundColor: `hsl(var(--agent-${agent.color}))`,
                                        boxShadow: `0 0 8px hsl(var(--agent-${agent.color}) / 0.4)`,
                                      }}
                                    />
                                  </div>
                                  <span
                                    className="text-sm font-semibold min-w-[3rem] text-right"
                                    style={{ color: `hsl(var(--agent-${agent.color}))` }}
                                  >
                                    {agent.confidence}%
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
                        style={{ color: `hsl(var(--agent-${agent.color}))` }}
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
                                  width: `${agent.confidence}%`,
                                  backgroundColor: `hsl(var(--agent-${agent.color}))`,
                                  boxShadow: `0 0 8px hsl(var(--agent-${agent.color}) / 0.4)`,
                                }}
                              />
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {agent.confidence}% confidence
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4
                          className="text-sm font-bold uppercase tracking-wide mb-2"
                          style={{ color: `hsl(var(--agent-${agent.color}))`, letterSpacing: '0.5px' }}
                        >
                          Reasoning
                        </h4>
                        <p className="text-base leading-relaxed whitespace-pre-wrap">{agent.reasoning}</p>
                      </div>

                      <div>
                        <h4
                          className="text-sm font-bold uppercase tracking-wide mb-2"
                          style={{ color: `hsl(var(--agent-${agent.color}))`, letterSpacing: '0.5px' }}
                        >
                          {agent.agent === 'lex' ? 'Legal Citations' : 
                           agent.agent === 'sofia' ? 'Trauma Indicators' :
                           agent.agent === 'equity' ? 'Bias Analysis' :
                           agent.agent === 'holmes' ? 'Evidence' :
                           'Risk Factors'}
                        </h4>
                        <ul className="space-y-2 pl-6">
                          {agent.citations.map((citation, idx) => (
                            <li
                              key={idx}
                              className="text-sm leading-relaxed list-disc"
                            >
                              {citation}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          style={{
                            borderColor: `hsl(var(--agent-${agent.color}))`,
                            color: `hsl(var(--agent-${agent.color}))`,
                          }}
                          className="hover:bg-opacity-10"
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          View Full Analysis
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 justify-center pt-4">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Analysis Report
            </Button>
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share with Supervisor
            </Button>
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Add to Investigation Notes
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AICouncil;
