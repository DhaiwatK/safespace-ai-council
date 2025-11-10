import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, FileText, MessageSquare, HelpCircle, CheckCircle, Clock, ArrowLeft, Plus } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import GlobalFooter from "@/components/GlobalFooter";

const ComplainantDashboard = () => {
  const navigate = useNavigate();
  const sessionCode = "SAFE-X7K9-M2P4";

  const stages = [
    { name: "Intake", status: "complete" },
    { name: "Review", status: "complete" },
    { name: "Investigation", status: "active" },
    { name: "Hearing", status: "upcoming" },
    { name: "Resolution", status: "upcoming" },
  ];

  const updates = [
    { icon: FileText, text: "Your case has been assigned to an investigator", date: "2 hours ago" },
    { icon: CheckCircle, text: "Evidence successfully uploaded and verified", date: "1 day ago" },
    { icon: MessageSquare, text: "Case filed and intake complete", date: "8 days ago" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => navigate("/")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Home
              </Button>
              <ShieldCheck className="h-6 w-6 text-purple" />
              <h1 className="text-xl font-bold">SAFESPACE</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigate("/complainant/intake")}>
                <Plus className="mr-2 h-4 w-4" />
                New Report
              </Button>
              <Badge variant="outline" className="font-mono">
                Session: {sessionCode}
              </Badge>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Welcome Header */}
          <div>
            <h2 className="text-3xl font-bold mb-2">Your Case Dashboard</h2>
            <p className="text-muted-foreground">Track your case progress and stay informed</p>
          </div>

          {/* Progress Stepper */}
          <Card className="p-8">
            <h3 className="text-lg font-semibold mb-6">Case Progress</h3>
            <div className="flex items-center justify-between mb-4">
              {stages.map((stage, idx) => (
                <div key={stage.name} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center border-2 transition-all ${
                        stage.status === "complete"
                          ? "bg-success border-success text-white"
                          : stage.status === "active"
                          ? "bg-primary border-primary text-white"
                          : "bg-background border-muted-foreground/30 text-muted-foreground"
                      }`}
                    >
                      {stage.status === "complete" ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : stage.status === "active" ? (
                        <Clock className="h-5 w-5" />
                      ) : (
                        <span className="text-sm">{idx + 1}</span>
                      )}
                    </div>
                    <p className={`text-sm mt-2 font-medium ${stage.status === "active" ? "text-primary" : ""}`}>
                      {stage.name}
                    </p>
                    {stage.status === "active" && (
                      <Badge variant="default" className="mt-1 text-xs bg-primary">
                        You are here
                      </Badge>
                    )}
                  </div>
                  {idx < stages.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 mx-2 ${
                        stages[idx + 1].status === "complete" || stages[idx + 1].status === "active"
                          ? "bg-primary"
                          : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Timeline Card */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Current Day</span>
                  <span className="text-2xl font-bold text-primary">Day 8</span>
                </div>
                <Progress value={13.3} className="h-2" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">of 60-day timeline</span>
                  <span className="font-medium">52 days remaining</span>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-1">Next Milestone</p>
                  <p className="font-medium">Investigator interview scheduled</p>
                  <p className="text-sm text-muted-foreground">Est. Dec 20, 2025</p>
                </div>
              </div>
            </Card>

            {/* Messages Card */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Messages</h3>
                <Badge variant="default" className="bg-primary">
                  1 New
                </Badge>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">Investigator Sarah Chen</p>
                      <p className="text-sm text-muted-foreground truncate">
                        Thank you for your submission. I'll be reaching out soon to...
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  View All Messages
                </Button>
              </div>
            </Card>
          </div>

          {/* Recent Updates */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Updates</h3>
            <div className="space-y-4">
              {updates.map((update, idx) => {
                const Icon = update.icon;
                return (
                  <div key={idx} className="flex items-start gap-4 p-3 hover:bg-muted/50 rounded-lg transition-colors">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{update.text}</p>
                      <p className="text-sm text-muted-foreground">{update.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto py-4">
              <FileText className="mr-2 h-5 w-5" />
              View Evidence
            </Button>
            <Button variant="outline" className="h-auto py-4">
              <MessageSquare className="mr-2 h-5 w-5" />
              Contact Support
            </Button>
            <Button variant="outline" className="h-auto py-4">
              <HelpCircle className="mr-2 h-5 w-5" />
              Resources
            </Button>
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <GlobalFooter />
    </div>
  );
};

export default ComplainantDashboard;
