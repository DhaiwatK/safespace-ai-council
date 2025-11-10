import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import ComplainantIntake from "./pages/ComplainantIntake";
import ComplainantDashboard from "./pages/ComplainantDashboard";
import InvestigatorDashboard from "./pages/InvestigatorDashboard";
import AICouncil from "./pages/AICouncil";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Landing />} />
            <Route
              path="/complainant/intake"
              element={
                <ProtectedRoute allowedRoles={['complainant']}>
                  <ComplainantIntake />
                </ProtectedRoute>
              }
            />
            <Route
              path="/complainant/dashboard"
              element={
                <ProtectedRoute allowedRoles={['complainant']}>
                  <ComplainantDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/investigator"
              element={
                <ProtectedRoute allowedRoles={['investigator', 'administrator']}>
                  <InvestigatorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/investigator/council"
              element={
                <ProtectedRoute allowedRoles={['investigator', 'administrator']}>
                  <AICouncil />
                </ProtectedRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
