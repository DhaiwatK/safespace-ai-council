/**
 * Login page - Demo authentication by role selection
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, UserCircle, Search, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const roles = [
    {
      value: 'complainant' as const,
      label: 'Complainant',
      description: 'File a report or view your case',
      icon: UserCircle,
      color: 'bg-purple-500 hover:bg-purple-600',
      route: '/complainant/dashboard',
    },
    {
      value: 'investigator' as const,
      label: 'Investigator',
      description: 'Manage cases and use AI tools',
      icon: Search,
      color: 'bg-blue-500 hover:bg-blue-600',
      route: '/investigator',
    },
    {
      value: 'administrator' as const,
      label: 'Administrator',
      description: 'View analytics and patterns',
      icon: Settings,
      color: 'bg-gray-500 hover:bg-gray-600',
      route: '/investigator',
    },
    {
      value: 'respondent' as const,
      label: 'Respondent',
      description: 'View case notifications',
      icon: Shield,
      color: 'bg-green-500 hover:bg-green-600',
      route: '/respondent/portal',
    },
  ];

  const handleLogin = async (role: typeof roles[number]['value']) => {
    setLoading(true);

    try {
      await login(role);

      toast({
        title: 'Login successful',
        description: `Welcome back!`,
      });

      // Find the route for this role
      const roleConfig = roles.find((r) => r.value === role);
      navigate(roleConfig?.route || '/');
    } catch (error) {
      toast({
        title: 'Login failed',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">SafeSpace AI Council</h1>
          <p className="text-lg text-gray-600">
            AI-Powered Title IX Case Management System
          </p>
          <p className="text-sm text-gray-500 mt-2">Northwestern University</p>
        </div>

        {/* Role Selection */}
        <Card className="border-2 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Select Your Role</CardTitle>
            <CardDescription>Choose how you want to access the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <Button
                    key={role.value}
                    onClick={() => handleLogin(role.value)}
                    disabled={loading}
                    className={`h-auto py-6 px-6 flex flex-col items-center justify-center text-white ${role.color} transition-all hover:scale-105`}
                  >
                    <Icon className="h-12 w-12 mb-3" />
                    <span className="text-xl font-semibold mb-1">{role.label}</span>
                    <span className="text-sm opacity-90 text-center">{role.description}</span>
                  </Button>
                );
              })}
            </div>

            {/* Demo Notice */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 text-center">
                <strong>Demo Mode:</strong> This is a demonstration system. Click any role to
                explore the platform. No real authentication required.
              </p>
            </div>

            {/* Features */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="font-semibold text-purple-900 mb-1">Multi-Agent AI</p>
                <p className="text-xs text-purple-700">5 specialized AI agents deliberate on every decision</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="font-semibold text-blue-900 mb-1">Trauma-Informed</p>
                <p className="text-xs text-blue-700">Empathetic design prioritizes psychological safety</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="font-semibold text-green-900 mb-1">Bias Detection</p>
                <p className="text-xs text-green-700">Real-time fairness checking in all processes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Built with FastAPI + React + Multi-Agent AI System</p>
          <p className="mt-1">© 2025 Northwestern University - AI Council Hackathon</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
