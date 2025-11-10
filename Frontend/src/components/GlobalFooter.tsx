import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

/**
 * Global footer component with project attribution
 * Displays on all pages with consistent styling
 */
const GlobalFooter = () => {
  return (
    <footer className="w-full mt-auto py-6 px-4">
      <div className="container mx-auto">
        <Card className="p-4 bg-gradient-to-r from-purple/5 via-agent-lex/5 to-purple/5 border-purple/20">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-center">
            <Sparkles className="h-4 w-4 text-purple flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Built by The Experts Project @ Kabaria Labs</span>
              {" • "}
              <span className="text-purple">developed by Claude Code × OpenAI Codex × Lovable</span>
              {" • "}
              <span className="font-medium">Kellogg AI Hackathon 2025</span>
              {" • "}
              <span className="text-agent-lex">Challenge by NyAI</span>
            </p>
          </div>
        </Card>
      </div>
    </footer>
  );
};

export default GlobalFooter;
