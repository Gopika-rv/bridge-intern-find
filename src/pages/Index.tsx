
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building, Search, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSmartMatching = () => {
    toast({
      title: "🎯 Smart Matching Available!",
      description: "Sign up as a student to access our AI-powered internship matching system.",
      className: "bg-green-50 border-green-200 rounded-lg",
    });
    navigate('/register');
  };

  const handleDirectCommunication = () => {
    toast({
      title: "💬 Direct Messaging Ready!",
      description: "Join InternConnect to start communicating directly with recruiters.",
      className: "bg-blue-50 border-blue-200 rounded-lg",
    });
    navigate('/register');
  };

  const handleStudentSignup = () => {
    navigate('/register');
  };

  const handleCompanySignup = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-[#0A66C2]">InternConnect</div>
            <div className="space-x-4">
              <Button asChild variant="outline" className="rounded-lg border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="bg-[#0A66C2] hover:bg-[#004182] rounded-lg">
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Smart Internship Network
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect students with meaningful internship opportunities. 
            A professional platform designed specifically for the next generation of talent.
          </p>
          <div className="space-x-4">
            <Button size="lg" className="text-lg px-8 py-3 bg-[#0A66C2] hover:bg-[#004182] rounded-lg" onClick={handleStudentSignup}>
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3 border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white rounded-lg" onClick={() => navigate('/login')}>
              Sign In
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer rounded-lg border-0 shadow-md" onClick={handleStudentSignup}>
            <CardHeader>
              <Users className="h-12 w-12 text-[#0A66C2] mx-auto mb-4" />
              <CardTitle className="text-[#333333]">For Students</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Create your profile, showcase your skills, and apply to internships from top companies.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer rounded-lg border-0 shadow-md" onClick={handleCompanySignup}>
            <CardHeader>
              <Building className="h-12 w-12 text-[#0A66C2] mx-auto mb-4" />
              <CardTitle className="text-[#333333]">For Companies</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Post internships, review applications, and find the perfect interns for your team.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer rounded-lg border-0 shadow-md" onClick={handleSmartMatching}>
            <CardHeader>
              <Search className="h-12 w-12 text-[#0A66C2] mx-auto mb-4" />
              <CardTitle className="text-[#333333]">Smart Matching</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Advanced AI helps students find relevant opportunities and companies find ideal candidates.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer rounded-lg border-0 shadow-md" onClick={handleDirectCommunication}>
            <CardHeader>
              <MessageSquare className="h-12 w-12 text-[#0A66C2] mx-auto mb-4" />
              <CardTitle className="text-[#333333]">Direct Communication</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Built-in messaging system enables seamless communication between students and recruiters.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to get started?</h2>
          <p className="text-lg text-gray-600 mb-8">Join thousands of students and companies already using InternConnect.</p>
          <Button size="lg" className="text-lg px-8 py-3 bg-[#0A66C2] hover:bg-[#004182] rounded-lg" onClick={handleStudentSignup}>
            Create Your Account
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Index;
