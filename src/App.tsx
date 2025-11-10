import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import ComplainantIntake from "./pages/ComplainantIntake";
import ComplainantDashboard from "./pages/ComplainantDashboard";
import InvestigatorDashboard from "./pages/InvestigatorDashboard";
import AICouncil from "./pages/AICouncil";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/complainant/intake" element={<ComplainantIntake />} />
          <Route path="/complainant/dashboard" element={<ComplainantDashboard />} />
          <Route path="/investigator" element={<InvestigatorDashboard />} />
          <Route path="/investigator/council" element={<AICouncil />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
