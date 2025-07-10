
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { validateGmail, validateIndianPhone } from '../utils/validation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'student' | 'company'>('student');
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateField = (fieldName: string, value: string) => {
    let error = '';
    
    switch (fieldName) {
      case 'email':
        if (value && !validateGmail(value)) {
          error = 'Email must be a valid @gmail.com address';
        }
        break;
    }
    
    setFieldErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateField('email', value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate fields
    if (!email || !password) {
      toast({
        title: "⚠️ Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
        className: "rounded-lg",
      });
      return;
    }
    
    if (!validateGmail(email)) {
      toast({
        title: "⚠️ Invalid Email",
        description: "Please enter a valid @gmail.com address.",
        variant: "destructive",
        className: "rounded-lg",
      });
      return;
    }
    
    setIsLoading(true);

    try {
      const success = await login(email, password, userType);
      if (success) {
        toast({
          title: "🎉 Welcome back!",
          description: "You have successfully logged in to InternConnect.",
          className: "bg-green-50 border-green-200 rounded-lg",
        });
        navigate(userType === 'student' ? '/student-dashboard' : '/company-dashboard');
      }
    } catch (error: any) {
      toast({
        title: "❌ Login Failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
        className: "rounded-lg",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F6F8] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-[#0A66C2]">
            InternConnect
          </Link>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <Card className="shadow-lg border-0 rounded-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-[#0A66C2] text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>Choose your account type and sign in</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={userType} onValueChange={(value) => setUserType(value as 'student' | 'company')}>
              <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-xl p-1">
                <TabsTrigger value="student" className="data-[state=active]:bg-[#0A66C2] data-[state=active]:text-white rounded-lg transition-all">
                  👨‍🎓 Student
                </TabsTrigger>
                <TabsTrigger value="company" className="data-[state=active]:bg-[#0A66C2] data-[state=active]:text-white rounded-lg transition-all">
                  🏢 Company
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="student" className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#333333] font-medium">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="yourname@gmail.com"
                      className={`rounded-xl border-2 transition-colors ${fieldErrors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-[#0A66C2]'} focus:ring-[#0A66C2]`}
                      required
                    />
                    {fieldErrors.email && <p className="text-red-500 text-sm">{fieldErrors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-[#333333] font-medium">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="rounded-xl border-2 border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2]"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#0A66C2] hover:bg-[#004182] rounded-xl py-3 text-lg font-semibold transition-colors" disabled={isLoading}>
                    {isLoading ? '🔄 Signing in...' : '🚀 Sign In as Student'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="company" className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="company-email" className="text-[#333333] font-medium">Company Email</Label>
                    <Input
                      id="company-email"
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="company@gmail.com"
                      className={`rounded-xl border-2 transition-colors ${fieldErrors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-[#0A66C2]'} focus:ring-[#0A66C2]`}
                      required
                    />
                    {fieldErrors.email && <p className="text-red-500 text-sm">{fieldErrors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-password" className="text-[#333333] font-medium">Password</Label>
                    <Input
                      id="company-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="rounded-xl border-2 border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2]"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#0A66C2] hover:bg-[#004182] rounded-xl py-3 text-lg font-semibold transition-colors" disabled={isLoading}>
                    {isLoading ? '🔄 Signing in...' : '🏢 Sign In as Company'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-[#0A66C2] hover:underline font-medium transition-colors">
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
