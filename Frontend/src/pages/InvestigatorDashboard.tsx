import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Search, AlertTriangle, Filter, Users, BarChart3, Settings, Brain, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const InvestigatorDashboard = () => {
  const navigate = useNavigate();

  const cases = [
    {
      caseNumber: "NW-2025-TIX-0147",
      category: "Sexual Harassment",
      status: "Investigation",
      priority: "Urgent",
      progress: 35,
      daysElapsed: 8,
      deadline: "Dec 30, 2025",
      complainant: "Alex K.",
      respondent: "Jordan M.",
    },
    {
      caseNumber: "NW-2025-TIX-0146",
      category: "Discrimination",
      status: "Review",
      priority: "Standard",
      progress: 15,
      daysElapsed: 3,
      deadline: "Jan 15, 2026",
      complainant: "Taylor S.",
      respondent: "Morgan P.",
    },
    {
      caseNumber: "NW-2025-TIX-0145",
      category: "Retaliation",
      status: "Investigation",
      priority: "Standard",
      progress: 68,
      daysElapsed: 41,
      deadline: "Dec 18, 2025",
      complainant: "Casey R.",
      respondent: "Riley T.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold">Investigator Dashboard</h1>
              <Badge variant="secondary">47 Active Cases</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <ThemeToggle />
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate("/")}
                title="Exit to Home"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <nav className="space-y-2">
                <Button variant="default" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Cases (47)
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Patterns
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Analytics
                </Button>
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filters */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search cases..." className="pl-10" />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>

            {/* Pattern Alert */}
            <Card className="p-6 bg-warning/10 border-warning/30">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-6 w-6 text-warning flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Pattern Detected: Repeat Respondent</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Jordan M. appears in 3 cases with similar allegations. Risk assessment: HIGH (87%)
                  </p>
                  <Button variant="outline" size="sm">
                    View Pattern Analysis
                  </Button>
                </div>
              </div>
            </Card>

            {/* Cases List */}
            <div className="space-y-4">
              {cases.map((caseItem) => (
                <Card
                  key={caseItem.caseNumber}
                  className={`p-6 hover-lift cursor-pointer border-l-4 ${
                    caseItem.priority === "Urgent" ? "border-l-destructive" : "border-l-primary"
                  }`}
                  onClick={() => navigate("/investigator/council", { state: { caseNumber: caseItem.caseNumber } })}
                >
                  <div className="space-y-4">
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold font-mono">{caseItem.caseNumber}</h3>
                          <Badge
                            variant={caseItem.priority === "Urgent" ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {caseItem.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{caseItem.category}</Badge>
                          <Badge variant="secondary">{caseItem.status}</Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Brain className="mr-2 h-4 w-4" />
                        AI Council
                      </Button>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{caseItem.progress}%</span>
                      </div>
                      <Progress value={caseItem.progress} className="h-2" />
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="text-muted-foreground">
                          Day <span className="font-medium text-foreground">{caseItem.daysElapsed}</span>
                        </span>
                        <span className="text-muted-foreground">
                          Deadline: <span className="font-medium text-foreground">{caseItem.deadline}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span className="text-xs">
                          {caseItem.complainant} vs {caseItem.respondent}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestigatorDashboard;
