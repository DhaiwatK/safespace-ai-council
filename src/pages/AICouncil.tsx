import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronUp, Scale, Heart, Users, Search as SearchIcon, Shield as ShieldIcon, Brain, Download, Share2, FileText, ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

const AICouncil = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const caseNumber = location.state?.caseNumber || "NW-2025-TIX-0147";
  const [expandedAgents, setExpandedAgents] = useState<string[]>([]);

  const toggleAgent = (agentId: string) => {
    setExpandedAgents(prev =>
      prev.includes(agentId) ? prev.filter(id => id !== agentId) : [...prev, agentId]
    );
  };

  // Case NW-2025-TIX-0146 has disagreement
  const isDisagreementCase = caseNumber === "NW-2025-TIX-0146";

  const caseData = isDisagreementCase ? {
    question: "Does this incident meet Title IX hostile environment standard?",
    consensus: {
      decision: "SPLIT DECISION",
      confidence: 62,
      agreement: "3/5",
      confidenceRange: [45, 88],
      recommendation: "PROCEED WITH CAUTION: Significant disagreement among agents. Manual review and additional evidence gathering recommended before proceeding."
    }
  } : {
    question: "Does this incident meet Title IX hostile environment standard?",
    consensus: {
      decision: "YES",
      confidence: 90,
      agreement: "5/5",
      confidenceRange: [85, 95],
      recommendation: "HIGH CONFIDENCE: Strong consensus reached across all analysis frameworks. Proceed with formal investigation following standard protocols."
    }
  };

  const agents = isDisagreementCase ? [
    {
      id: "lex",
      name: "Lex",
      role: "Legal Framework Specialist",
      color: "agent-lex",
      icon: Scale,
      vote: "NO",
      confidence: 58,
      reasoning: "While the behavior described is concerning, it may not meet the stringent legal threshold of 'severe, pervasive, and objectively offensive' required under the Davis standard. The incidents appear isolated rather than pervasive, and the subjective impact, while valid, needs corroboration against an objective reasonable person standard.",
      citations: [
        "Davis v. Monroe County Board of Education, 526 U.S. 629 (1999) - requires severe, pervasive, and objectively offensive conduct",
        "OCR 2020 Title IX Final Rule §106.30 - defines sexual harassment",
        "Northwestern University Title IX Policy Section 3.1 - threshold requirements"
      ]
    },
    {
      id: "sofia",
      name: "Sofia",
      role: "Trauma-Informed Specialist",
      color: "agent-sofia",
      icon: Heart,
      vote: "YES",
      confidence: 88,
      reasoning: "The complainant's account contains multiple trauma indicators consistent with genuine sexual harassment experiences. The delayed disclosure timeline, fragmented memory, and emotional responses all align with established trauma psychology research. The impact on the complainant's well-being and academic performance is clearly documented.",
      citations: [
        "Delayed disclosure (typical in 73% of cases per Lonsway & Archambault, 2012)",
        "Avoidance behaviors: dropped shared class, altered campus routes",
        "Physiological stress responses: sleep disruption, concentration difficulties",
        "Shame and self-blame language patterns",
        "Detailed sensory memories despite time elapsed"
      ]
    },
    {
      id: "equity",
      name: "Equity",
      role: "Bias Detection Specialist",
      color: "agent-equity",
      icon: Users,
      vote: "YES",
      confidence: 75,
      reasoning: "Analysis reveals potential gender-based power dynamics and credibility discounting patterns that warrant proceeding. However, investigators should be aware of confirmation bias risks and ensure equal scrutiny of all accounts. The respondent's position and complainant's junior status create structural vulnerabilities consistent with harassment scenarios.",
      citations: [
        "Power differential: Respondent is senior faculty, complainant is graduate student",
        "Historical gender dynamics in department (70% male faculty, 55% female students)",
        "Risk of 'perfect victim' bias - focus on behavior, not complainant characteristics"
      ]
    },
    {
      id: "holmes",
      name: "Holmes",
      role: "Evidence Analysis Specialist",
      color: "agent-holmes",
      icon: SearchIcon,
      vote: "NO",
      confidence: 45,
      reasoning: "Current evidence base is insufficient for high-confidence determination. We have complainant testimony and one corroborating witness, but lack contemporaneous documentation, message records that would establish pattern, and respondent's account. Timeline gaps exist between alleged incidents and report filing. Additional evidence gathering is critical before proceeding.",
      citations: [
        "No text message or email records submitted",
        "Witness testimony is second-hand (complainant told them after the fact)",
        "3-month delay between last incident and formal report",
        "Respondent has not yet been interviewed or provided their account"
      ]
    },
    {
      id: "sentinel",
      name: "Sentinel",
      role: "Risk Assessment Specialist",
      color: "agent-sentinel",
      icon: ShieldIcon,
      vote: "YES",
      confidence: 82,
      reasoning: "Risk assessment indicates HIGH institutional liability if investigation is not pursued. Respondent has prior informal complaints on file (2 in past 3 years), creating pattern evidence. Failure to investigate could expose institution to deliberate indifference claims under Title IX. The complainant's documented academic decline and mental health impacts demonstrate tangible harm.",
      citations: [
        "Prior complaints against respondent (2 informal, 0 formal) - pattern indicator",
        "Respondent holds position of authority over complainant's academic progress",
        "Complainant has documented therapy records and academic performance decline",
        "Power differential creates retaliation vulnerability"
      ]
    }
  ] : [
    {
      id: "lex",
      name: "Lex",
      role: "Legal Framework Specialist",
      color: "agent-lex",
      icon: Scale,
      vote: "YES",
      confidence: 92,
      reasoning: "The described behavior meets the legal standard for Title IX hostile environment sexual harassment. The conduct was unwelcome, severe and pervasive, and interfered with the complainant's educational opportunities.",
      citations: [
        "20 U.S.C. § 1681 (Title IX statute)",
        "Davis v. Monroe County Board of Education, 526 U.S. 629 (1999)",
        "OCR 2020 Title IX Final Rule §106.44",
        "Northwestern University Title IX Policy Section 4.2"
      ]
    },
    {
      id: "sofia",
      name: "Sofia",
      role: "Trauma-Informed Specialist",
      color: "agent-sofia",
      icon: Heart,
      vote: "YES",
      confidence: 90,
      reasoning: "Complainant's account shows clear trauma indicators consistent with genuine disclosure. Delayed reporting is typical (73% of cases). Emotional responses align with research on harassment survivors. Power dynamics evident in relationship.",
      citations: [
        "Delayed disclosure typical in 73% of harassment cases",
        "Avoidance behavior matches PTSD criteria",
        "Language patterns consistent with authentic trauma narrative"
      ]
    },
    {
      id: "equity",
      name: "Equity",
      role: "Bias Detection Specialist",
      color: "agent-equity",
      icon: Users,
      vote: "YES",
      confidence: 85,
      reasoning: "Analysis of both accounts reveals no significant investigator bias. Language used is balanced and neutral. Both parties given equal opportunity to present evidence. Minor stylistic differences noted but not material to findings.",
      citations: [
        "Neutral language ratio: 94% compliant",
        "No gender-based language discrepancies detected",
        "Equal questioning time: complainant 47 min, respondent 49 min"
      ]
    },
    {
      id: "holmes",
      name: "Holmes",
      role: "Evidence Analysis Specialist",
      color: "agent-holmes",
      icon: SearchIcon,
      vote: "YES",
      confidence: 95,
      reasoning: "Physical evidence strongly corroborates complainant timeline. Three independent witnesses verify key facts. Text message metadata confirms dates/times. No contradictory evidence found. Chain of custody intact for all exhibits.",
      citations: [
        "3 witnesses corroborate complainant timeline",
        "Text message metadata timestamp verified",
        "Security camera footage confirms location at stated time",
        "SHA-256 hash verified for all digital evidence"
      ]
    },
    {
      id: "sentinel",
      name: "Sentinel",
      role: "Risk Assessment Specialist",
      color: "agent-sentinel",
      icon: ShieldIcon,
      vote: "YES",
      confidence: 90,
      reasoning: "HIGH RISK: Respondent has prior complaint on record (2023). Pattern suggests escalating behavior. Without intervention, probability of future incidents: 78%. Immediate protective measures warranted. Recommend interim restrictions pending resolution.",
      citations: [
        "Prior complaint: NW-2023-TIX-0089 (similar allegations)",
        "Risk assessment score: 8.2/10 (high)",
        "Reoffense probability without intervention: 78%"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="border-b bg-card">
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
                <p className="text-sm text-muted-foreground">Case #{caseNumber} • Analysis Session</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-sm">
                <Brain className="mr-2 h-4 w-4" />
                5 Agents Active
              </Badge>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Question Card */}
          <Card className="p-6 bg-muted/50 border-l-4 border-l-primary">
            <h2 className="text-lg font-semibold mb-3">Question Under Analysis</h2>
            <p className="text-lg leading-relaxed">
              {caseData.question}
            </p>
          </Card>

          {/* Consensus Summary */}
          <Card className={`p-8 bg-gradient-to-br ${
            isDisagreementCase 
              ? "from-warning/10 to-background border-2 border-warning" 
              : "from-primary/10 to-background border-2 border-primary"
          } shadow-lg`}>
            <div className="text-center space-y-6">
              <p className={`text-xs font-semibold uppercase tracking-wider ${
                isDisagreementCase ? "text-warning" : "text-primary"
              }`}>
                {isDisagreementCase ? "AGENTS DISAGREE" : "CONSENSUS REACHED"}
              </p>
              
              <div className="space-y-2">
                <h2 className={`text-6xl font-extrabold animate-in fade-in-50 zoom-in-95 duration-500 ${
                  isDisagreementCase 
                    ? "text-warning" 
                    : "text-success"
                }`}>
                  {caseData.consensus.decision}
                </h2>
                <p className="text-xl text-muted-foreground">[{caseData.consensus.confidence}% confidence]</p>
              </div>

              <div className="space-y-2">
                <div className="relative h-6 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`absolute inset-y-0 left-0 bg-gradient-to-r ${
                      isDisagreementCase
                        ? "from-warning to-destructive"
                        : "from-success to-primary"
                    } animate-in slide-in-from-left-full duration-1000 flex items-center justify-end pr-3`}
                    style={{ width: `${caseData.consensus.confidence}%` }}
                  >
                    <span className="text-xs font-bold text-white">{caseData.consensus.confidence}%</span>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{caseData.consensus.agreement} agents agree</span>
                  <span>Confidence Range: {caseData.consensus.confidenceRange[0]}% - {caseData.consensus.confidenceRange[1]}%</span>
                </div>
              </div>

              <Card className={`p-4 text-left ${
                isDisagreementCase
                  ? "bg-warning/10 border-warning/30"
                  : "bg-success/10 border-success/30"
              }`}>
                <div className="flex items-start gap-3">
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isDisagreementCase
                      ? "bg-warning/20"
                      : "bg-success/20"
                  }`}>
                    <span className={`text-sm ${
                      isDisagreementCase ? "text-warning" : "text-success"
                    }`}>
                      {isDisagreementCase ? "⚠" : "✓"}
                    </span>
                  </div>
                  <div>
                    <h3 className={`font-semibold mb-1 ${
                      isDisagreementCase ? "text-warning" : "text-success"
                    }`}>
                      {isDisagreementCase ? "PROCEED WITH CAUTION" : "HIGH CONFIDENCE"}
                    </h3>
                    <p className="text-sm text-foreground/90">
                      {caseData.consensus.recommendation}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </Card>

          {/* Agent Cards */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Individual Agent Analysis</h2>
            
            {agents.map((agent) => {
              const Icon = agent.icon;
              const isExpanded = expandedAgents.includes(agent.id);
              
              return (
                <Card
                  key={agent.id}
                  className={`transition-all duration-300 hover-lift ${
                    isExpanded ? `border-2` : `border-2`
                  }`}
                  style={{
                    borderColor: isExpanded ? `hsl(var(--${agent.color}))` : `hsl(var(--${agent.color}) / 0.3)`,
                  }}
                >
                  {/* Card Header */}
                  <div
                    className="p-5 cursor-pointer"
                    onClick={() => toggleAgent(agent.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div
                          className={`h-4 w-4 rounded-full flex-shrink-0 mt-1 agent-pulse`}
                          style={{ backgroundColor: `hsl(var(--${agent.color}))` }}
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
                                        backgroundColor: `hsl(var(--${agent.color}))`,
                                        boxShadow: `0 0 8px hsl(var(--${agent.color}) / 0.4)`,
                                      }}
                                    />
                                  </div>
                                  <span
                                    className="text-sm font-semibold min-w-[3rem] text-right"
                                    style={{ color: `hsl(var(--${agent.color}))` }}
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
                        style={{ color: `hsl(var(--${agent.color}))` }}
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
                                  backgroundColor: `hsl(var(--${agent.color}))`,
                                  boxShadow: `0 0 8px hsl(var(--${agent.color}) / 0.4)`,
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
                          style={{ color: `hsl(var(--${agent.color}))`, letterSpacing: '0.5px' }}
                        >
                          Reasoning
                        </h4>
                        <p className="text-base leading-relaxed whitespace-pre-wrap">{agent.reasoning}</p>
                      </div>

                      <div>
                        <h4
                          className="text-sm font-bold uppercase tracking-wide mb-2"
                          style={{ color: `hsl(var(--${agent.color}))`, letterSpacing: '0.5px' }}
                        >
                          {agent.id === 'lex' ? 'Legal Citations' : 
                           agent.id === 'sofia' ? 'Trauma Indicators' :
                           agent.id === 'equity' ? 'Bias Analysis' :
                           agent.id === 'holmes' ? 'Evidence' :
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
                            borderColor: `hsl(var(--${agent.color}))`,
                            color: `hsl(var(--${agent.color}))`,
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
