
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Eye, Send, Star, TrendingUp, BookOpen, Award, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  // Real stats - these would come from actual database
  const stats = {
    applicationsSubmitted: 0,
    profileViews: 0,
    interviewInvites: 0,
    coursesCompleted: 0,
  };

  // Empty arrays - real data would come from database
  const recentActivity = [];
  const recommendedInternship = [];
  const freeCourses = [];

  const handleApplyNow = (internshipTitle: string) => {
    toast({
      title: "🎉 Application Submitted Successfully!",
      description: `Your application for ${internshipTitle} has been submitted. You'll hear back soon!`,
      className: "bg-green-50 border-green-200 rounded-xl shadow-lg",
    });
  };

  const handleEnrollCourse = (courseTitle: string) => {
    toast({
      title: "📚 Enrolled Successfully!",
      description: `You've enrolled in ${courseTitle}. Start learning now and earn your certificate!`,
      className: "bg-blue-50 border-blue-200 rounded-xl shadow-lg",
    });
  };

  return (
    <div className="min-h-screen bg-[#F3F6F8]">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#333333]">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600 mt-2">Here's what's happening with your internship search</p>
        </div>

        {/* Dynamic Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search internships, companies, skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 rounded-xl border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2] text-lg"
            />
          </div>
          <div className="text-center mt-4">
            <Button asChild className="bg-[#0A66C2] hover:bg-[#004182] rounded-xl px-8">
              <Link to="/paid-internships">Browse All Internships</Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="rounded-xl border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#333333]">Applications</CardTitle>
              <Send className="h-4 w-4 text-[#0A66C2]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0A66C2]">{stats.applicationsSubmitted}</div>
              <p className="text-xs text-muted-foreground">Active applications</p>
            </CardContent>
          </Card>

          <Card className="rounded-xl border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#333333]">Profile Views</CardTitle>
              <Eye className="h-4 w-4 text-[#0A66C2]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0A66C2]">{stats.profileViews}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card className="rounded-xl border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#333333]">Interview Invites</CardTitle>
              <Star className="h-4 w-4 text-[#0A66C2]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0A66C2]">{stats.interviewInvites}</div>
              <p className="text-xs text-muted-foreground">Pending interviews</p>
            </CardContent>
          </Card>

          <Card className="rounded-xl border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#333333]">Courses Completed</CardTitle>
              <Award className="h-4 w-4 text-[#0A66C2]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0A66C2]">{stats.coursesCompleted}</div>
              <p className="text-xs text-muted-foreground">Certificates earned</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="rounded-xl border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-[#333333]">Recent Activity</CardTitle>
                <CardDescription>Your latest applications and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                {recentActivity.length === 0 ? (
                  <div className="text-center py-12">
                    <TrendingUp className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No recent activity yet</p>
                    <p className="text-sm text-gray-400">Start applying to internships to see your activity here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Real activity data would be mapped here */}
                  </div>
                )}
                <div className="mt-6 space-y-2">
                  <Button asChild variant="outline" className="w-full rounded-xl border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white">
                    <Link to="/notifications">View All Activity</Link>
                  </Button>
                  <Button asChild className="w-full bg-[#0A66C2] hover:bg-[#004182] rounded-xl">
                    <Link to="/achievements">View Achievements</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommended Section */}
          <div className="space-y-6">
            {/* Recommended Internships */}
            <Card className="rounded-xl border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-[#333333]">Recommended Internship</CardTitle>
                <CardDescription>Matches based on your profile</CardDescription>
              </CardHeader>
              <CardContent>
                {recommendedInternship.length === 0 ? (
                  <div className="text-center py-8">
                    <Briefcase className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 mb-2">No recommendations yet</p>
                    <p className="text-sm text-gray-400 mb-4">Complete your profile to get personalized recommendations</p>
                    <Button asChild size="sm" className="bg-[#0A66C2] hover:bg-[#004182] rounded-xl">
                      <Link to="/profile">Complete Profile</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Real internship recommendations would be mapped here */}
                  </div>
                )}
                <div className="mt-4">
                  <Button asChild variant="outline" className="w-full rounded-xl border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white">
                    <Link to="/internships">Browse All Internship</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Free Courses */}
            <Card className="rounded-xl border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-[#333333]">Free Courses with Certificates</CardTitle>
                <CardDescription>Enhance your skills</CardDescription>
              </CardHeader>
              <CardContent>
                {freeCourses.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 mb-2">No courses available yet</p>
                    <p className="text-sm text-gray-400 mb-4">Check back soon for new courses</p>
                    <Button asChild size="sm" className="bg-[#1E90FF] hover:bg-[#0A66C2] rounded-xl">
                      <Link to="/free-courses">Explore Courses</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Real course data would be mapped here */}
                  </div>
                )}
                <div className="mt-4">
                  <Button asChild variant="outline" className="w-full rounded-xl border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white">
                    <Link to="/free-courses">View All Free Courses</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
