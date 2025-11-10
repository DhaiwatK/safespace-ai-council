import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Search, AlertTriangle, Filter, Users, BarChart3, Settings, Brain, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { casesAPI, aiAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import GlobalFooter from "@/components/GlobalFooter";

const InvestigatorDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [cases, setCases] = useState<any[]>([]);
  const [patterns, setPatterns] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [casesData, patternsData, statsData] = await Promise.all([
          casesAPI.getCases(),
          aiAPI.getPatterns(),
          casesAPI.getStats()
        ]);

        setCases(casesData);
        setPatterns(patternsData);
        setStats(statsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast({
          title: "Failed to load data",
          description: "Could not connect to backend.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const calculateProgress = (status: string) => {
    const statusProgress: Record<string, number> = {
      "Intake": 10,
      "Review": 25,
      "Investigation": 50,
      "Hearing": 75,
      "Resolution": 90,
      "Closed": 100
    };
    return statusProgress[status] || 0;
  };

  const calculateDaysElapsed = (filedDate: string) => {
    const filed = new Date(filedDate);
    const now = new Date();
    const diff = now.getTime() - filed.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const formatDeadline = (deadlineDate: string) => {
    return new Date(deadlineDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold">Investigator Dashboard</h1>
              {user && <span className="text-sm text-muted-foreground">Welcome, {user.name}</span>}
              <Badge variant="secondary">{stats?.active_cases || cases.length} Active Cases</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                title="Logout"
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
            {patterns.length > 0 && patterns.map((pattern) => (
              <Card key={pattern.id} className="p-6 bg-warning/10 border-warning/30">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-6 w-6 text-warning flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">Pattern Detected: {pattern.pattern_type}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {pattern.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <Badge variant="destructive">Risk Score: {Math.round(pattern.risk_score * 100)}%</Badge>
                      <Button variant="outline" size="sm">
                        View Pattern Analysis
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {/* Cases List */}
            <div className="space-y-4">
              {cases.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">No cases found</p>
                </Card>
              ) : (
                cases.map((caseItem) => {
                  const progress = calculateProgress(caseItem.status);
                  const daysElapsed = calculateDaysElapsed(caseItem.filed_date);
                  const deadline = formatDeadline(caseItem.deadline_date);

                  return (
                    <Card
                      key={caseItem.id}
                      className={`p-6 cursor-pointer border-l-4 transition-transform hover:scale-[1.01] ${
                        caseItem.priority === "Urgent" ? "border-l-destructive" : "border-l-primary"
                      }`}
                      onClick={() => navigate("/investigator/council", { state: { caseId: caseItem.id } })}
                    >
                      <div className="space-y-4">
                        {/* Header Row */}
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold font-mono">{caseItem.case_number}</h3>
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
                            <span className="font-medium">{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>

                        {/* Metadata */}
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <span className="text-muted-foreground">
                              Day <span className="font-medium text-foreground">{daysElapsed}</span>
                            </span>
                            <span className="text-muted-foreground">
                              Deadline: <span className="font-medium text-foreground">{deadline}</span>
                            </span>
                          </div>
                          {caseItem.evidence_count > 0 && (
                            <div className="text-xs text-muted-foreground">
                              {caseItem.evidence_count} evidence items
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Global Footer */}
      <GlobalFooter />
    </div>
  );
};

export default InvestigatorDashboard;
