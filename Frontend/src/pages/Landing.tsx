import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Users, Settings, Phone } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Landing = () => {
  const navigate = useNavigate();

  const roles = [
    {
      title: "Complainant",
      description: "File a report and track your case",
      icon: ShieldCheck,
      path: "/complainant/intake",
      gradient: "from-primary/10 to-primary/5",
    },
    {
      title: "Investigator",
      description: "Manage cases and review evidence",
      icon: Users,
      path: "/investigator",
      gradient: "from-agent-lex/10 to-agent-lex/5",
    },
    {
      title: "Administrator",
      description: "System oversight and analytics",
      icon: Settings,
      path: "/admin",
      gradient: "from-purple/10 to-purple/5",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-10 w-10 text-purple" />
            <h1 className="text-2xl font-bold text-purple">SAFESPACE</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Trauma-Informed Case Management
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            A safe, confidential platform for reporting and investigating Title IX incidents with AI-powered insights
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Card
                key={role.title}
                className={`p-8 cursor-pointer hover-lift bg-gradient-to-br ${role.gradient} border-2 hover:border-primary/50 transition-all duration-300`}
                onClick={() => navigate(role.path)}
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-card flex items-center justify-center shadow-md">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{role.title}</h3>
                    <p className="text-muted-foreground text-sm">{role.description}</p>
                  </div>
                  <Button variant="ghost" className="mt-2 text-primary">
                    Enter Portal →
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Crisis Resources */}
        <div className="max-w-2xl mx-auto">
          <Card className="p-6 bg-secondary/10 border-secondary/30">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
              <Phone className="h-6 w-6 text-secondary flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-foreground mb-1">Need immediate support?</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge variant="secondary" className="text-sm">
                    CAPS 24/7: (847) 491-2151
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    988 Crisis Line
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
        <p>🔒 All communications encrypted end-to-end • Confidential & secure</p>
      </footer>
    </div>
  );
};

export default Landing;
