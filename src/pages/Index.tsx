
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building, Search, MessageSquare } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-blue-600">InternConnect</div>
            <div className="space-x-4">
              <Button asChild variant="outline">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
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
            <Button asChild size="lg" className="text-lg px-8 py-3">
              <Link to="/register">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>For Students</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Create your profile, showcase your skills, and apply to internships from top companies.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Building className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>For Companies</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Post internships, review applications, and find the perfect interns for your team.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Search className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Smart Matching</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Advanced filters help students find relevant opportunities and companies find ideal candidates.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <MessageSquare className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Direct Communication</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Built-in messaging system enables seamless communication between students and recruiters.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to get started?</h2>
          <p className="text-lg text-gray-600 mb-8">Join thousands of students and companies already using InternConnect.</p>
          <Button asChild size="lg" className="text-lg px-8 py-3">
            <Link to="/register">Create Your Account</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Index;
