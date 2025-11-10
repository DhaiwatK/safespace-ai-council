import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

/**
 * Global footer component with project attribution
 * Displays on all pages with consistent styling
 */
const GlobalFooter = () => {
  return (
    <footer className="w-full py-6 px-4">
      <div className="container mx-auto">
        <Card className="p-4 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 border-purple-500/20">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-center">
            <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Built by The Experts Project @ Kabaria Labs</span>
              {" • "}
              <span className="text-purple-600 dark:text-purple-400">developed by Claude Code × OpenAI Codex × Lovable</span>
              {" • "}
              <span className="font-medium">Kellogg AI Hackathon 2025</span>
              {" • "}
              <span className="text-blue-600 dark:text-blue-400">Challenge by NyAI</span>
            </p>
          </div>
        </Card>
      </div>
    </footer>
  );
};

export default GlobalFooter;
