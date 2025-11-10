import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { Lock, CheckCircle, Upload, FileText, ArrowLeft, ArrowRight, LayoutDashboard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import GlobalFooter from "@/components/GlobalFooter";

const ComplainantIntake = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [incidentType, setIncidentType] = useState("");
  const [narrative, setNarrative] = useState("");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const sessionCode = "SAFE-X7K9-M2P4";

  const incidentTypes = [
    { value: "sexual-harassment", label: "Sexual Harassment", description: "Unwelcome sexual advances, requests for favors, or verbal/physical conduct" },
    { value: "discrimination", label: "Discrimination", description: "Unequal treatment based on protected characteristics" },
    { value: "assault", label: "Assault", description: "Physical or sexual assault" },
    { value: "retaliation", label: "Retaliation", description: "Adverse action for reporting misconduct" },
    { value: "other", label: "Other", description: "Other Title IX related concerns" },
  ];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      toast({
        title: "Report Submitted",
        description: "Your case has been securely filed. You can track it on your dashboard.",
      });
      navigate("/complainant/dashboard");
    }
  };

  const handleSave = () => {
    setLastSaved(new Date());
    toast({
      title: "Progress Saved",
      description: "Your information has been securely saved.",
      variant: "default",
    });
  };

  const progressValue = (step / 4) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate("/")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Exit
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigate("/complainant/dashboard")}>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              <Badge variant="outline" className="font-mono">
                Session: {sessionCode}
              </Badge>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Step {step} of 4</span>
              <span className="text-sm text-muted-foreground">{progressValue}% Complete</span>
            </div>
            <Progress value={progressValue} className="h-2" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {step === 1 && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold">You're safe here</h1>
                <p className="text-lg text-muted-foreground">We'll guide you through this step by step</p>
              </div>

              <Card className="p-8 bg-primary/5 border-primary/20">
                <div className="flex items-start gap-4">
                  <Lock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Your Information is Protected</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• All data encrypted end-to-end</li>
                      <li>• You can save and return anytime</li>
                      <li>• Your identity remains confidential</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <div className="flex gap-4">
                <Button onClick={handleNext} className="flex-1" size="lg">
                  Begin Report <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={handleSave} size="lg">
                  Save & Exit
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold mb-2">What type of incident are you reporting?</h2>
                <p className="text-muted-foreground">Select the category that best describes your situation</p>
              </div>

              <RadioGroup value={incidentType} onValueChange={setIncidentType} className="space-y-3">
                {incidentTypes.map((type) => (
                  <Card
                    key={type.value}
                    className={`p-4 cursor-pointer transition-all hover:border-primary/50 ${
                      incidentType === type.value ? "border-primary border-2 bg-primary/5" : ""
                    }`}
                    onClick={() => setIncidentType(type.value)}
                  >
                    <div className="flex items-start gap-3">
                      <RadioGroupItem value={type.value} id={type.value} className="mt-1" />
                      <Label htmlFor={type.value} className="flex-1 cursor-pointer">
                        <div className="font-semibold mb-1">{type.label}</div>
                        <div className="text-sm text-muted-foreground">{type.description}</div>
                      </Label>
                    </div>
                  </Card>
                ))}
              </RadioGroup>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!incidentType} className="flex-1">
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold mb-2">Tell us what happened</h2>
                <p className="text-muted-foreground">Share as much detail as you're comfortable with. You can always add more later.</p>
              </div>

              <Card className="p-4 bg-warning/10 border-warning/30">
                <p className="text-sm font-medium mb-2">💡 Helpful Tips</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Include dates, times, and locations if possible</li>
                  <li>• Describe what happened in your own words</li>
                  <li>• Note any witnesses who were present</li>
                  <li>• Mention any previous related incidents</li>
                </ul>
              </Card>

              <div className="space-y-2">
                <Textarea
                  value={narrative}
                  onChange={(e) => setNarrative(e.target.value)}
                  placeholder="Start typing your account here..."
                  className="min-h-[320px] text-base resize-none"
                />
                <div className="flex justify-between items-center text-sm">
                  {lastSaved && (
                    <div className="flex items-center gap-1 text-success">
                      <CheckCircle className="h-4 w-4" />
                      <span>Auto-saved {Math.floor((Date.now() - lastSaved.getTime()) / 1000)} seconds ago</span>
                    </div>
                  )}
                  <span className="text-muted-foreground ml-auto">{narrative.length} characters</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={handleNext} disabled={narrative.length < 50} className="flex-1">
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold mb-2">Upload Supporting Evidence</h2>
                <p className="text-muted-foreground">Add any relevant documents, photos, or screenshots (optional)</p>
              </div>

              <Card className="p-12 border-2 border-dashed border-primary/30 hover:border-primary/60 transition-colors cursor-pointer bg-primary/5">
                <div className="flex flex-col items-center text-center gap-4">
                  <Upload className="h-12 w-12 text-primary" />
                  <div>
                    <p className="font-semibold mb-1">Drop files here or click to browse</p>
                    <p className="text-sm text-muted-foreground">PDF, images, or documents up to 25MB</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-success/10 border-success/30">
                <div className="flex items-start gap-3">
                  <Lock className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold mb-1">Chain of Custody Maintained</p>
                    <p className="text-muted-foreground">All files are encrypted, timestamped, and tracked with cryptographic hashing</p>
                  </div>
                </div>
              </Card>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={handleNext} className="flex-1">
                  <FileText className="mr-2 h-4 w-4" />
                  Submit Report
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Global Footer */}
      <GlobalFooter />
    </div>
  );
};

export default ComplainantIntake;
