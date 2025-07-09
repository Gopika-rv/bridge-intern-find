
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Eye, Send, Star, TrendingUp, BookOpen, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  // Unique stats for each user
  const stats = {
    applicationsSubmitted: 5,
    profileViews: 18,
    interviewInvites: 2,
    coursesCompleted: 3,
  };

  // Unique recent activity
  const recentActivity = [
    { id: 1, action: 'Applied to Frontend Developer Intern at TechCorp', time: '3 hours ago', status: 'pending' },
    { id: 2, action: 'Profile viewed by Google Recruiter', time: '1 day ago', status: 'viewed' },
    { id: 3, action: 'Completed React Fundamentals Course', time: '2 days ago', status: 'completed' },
    { id: 4, action: 'Interview invite from InnovateLab', time: '3 days ago', status: 'interview' },
  ];

  // Unique recommended internships
  const recommendedInternships = [
    {
      id: 1,
      title: 'Full Stack Developer Intern',
      company: 'TechStart Inc.',
      location: 'Remote',
      stipend: '₹25,000/month',
      type: 'Paid',
      postedDate: '1 day ago',
    },
    {
      id: 2,
      title: 'UI/UX Design Intern',
      company: 'Creative Studio',
      location: 'Bangalore, IN',
      stipend: '₹20,000/month',
      type: 'Paid',
      postedDate: '2 days ago',
    },
    {
      id: 3,
      title: 'Content Writing Intern',
      company: 'Digital Agency',
      location: 'Mumbai, IN',
      stipend: 'Certificate',
      type: 'Free',
      postedDate: '3 days ago',
    },
  ];

  // Free courses with certificates
  const freeCourses = [
    {
      id: 1,
      title: 'React Development Bootcamp',
      duration: '4 weeks',
      students: 1250,
      rating: 4.8,
      category: 'Technology'
    },
    {
      id: 2,
      title: 'Digital Marketing Essentials',
      duration: '3 weeks',
      students: 890,
      rating: 4.6,
      category: 'Marketing'
    },
  ];

  const handleApplyNow = (internshipTitle: string) => {
    toast({
      title: "🎉 Application Submitted!",
      description: `Your application for ${internshipTitle} has been submitted successfully. You'll hear back soon!`,
      className: "bg-green-50 border-green-200 rounded-lg",
    });
  };

  const handleEnrollCourse = (courseTitle: string) => {
    toast({
      title: "📚 Enrolled Successfully!",
      description: `You've enrolled in ${courseTitle}. Start learning now and earn your certificate!`,
      className: "bg-blue-50 border-blue-200 rounded-lg",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="rounded-full">Pending</Badge>;
      case 'viewed':
        return <Badge variant="outline" className="rounded-full">Viewed</Badge>;
      case 'interview':
        return <Badge className="bg-green-100 text-green-800 rounded-full">Interview</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800 rounded-full">Completed</Badge>;
      default:
        return <Badge variant="secondary" className="rounded-full">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F6F8]">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#333333]">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600 mt-2">Here's what's happening with your internship search</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="rounded-lg border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#333333]">Applications</CardTitle>
              <Send className="h-4 w-4 text-[#0A66C2]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0A66C2]">{stats.applicationsSubmitted}</div>
              <p className="text-xs text-muted-foreground">Active applications</p>
            </CardContent>
          </Card>

          <Card className="rounded-lg border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#333333]">Profile Views</CardTitle>
              <Eye className="h-4 w-4 text-[#0A66C2]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0A66C2]">{stats.profileViews}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card className="rounded-lg border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#333333]">Interview Invites</CardTitle>
              <Star className="h-4 w-4 text-[#0A66C2]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0A66C2]">{stats.interviewInvites}</div>
              <p className="text-xs text-muted-foreground">Pending interviews</p>
            </CardContent>
          </Card>

          <Card className="rounded-lg border-0 shadow-md">
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
            <Card className="rounded-lg border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-[#333333]">Recent Activity</CardTitle>
                <CardDescription>Your latest applications and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#333333]">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      {getStatusBadge(activity.status)}
                    </div>
                  ))}
                </div>
                <div className="mt-6 space-y-2">
                  <Button asChild variant="outline" className="w-full rounded-lg border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white">
                    <Link to="/notifications">View All Activity</Link>
                  </Button>
                  <Button asChild className="w-full bg-[#0A66C2] hover:bg-[#004182] rounded-lg">
                    <Link to="/achievements">View Achievements</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommended Section */}
          <div className="space-y-6">
            {/* Recommended Internships */}
            <Card className="rounded-lg border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-[#333333]">Recommended Internships</CardTitle>
                <CardDescription>Matches based on your profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedInternships.map((internship) => (
                    <div key={internship.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm text-[#333333]">{internship.title}</h4>
                        <Briefcase className="h-4 w-4 text-[#0A66C2]" />
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{internship.company}</p>
                      <p className="text-xs text-gray-500 mb-2">{internship.location}</p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-green-600">{internship.stipend}</span>
                        <Badge variant="outline" className="rounded-full text-xs">{internship.type}</Badge>
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full bg-[#0A66C2] hover:bg-[#004182] rounded-lg"
                        onClick={() => handleApplyNow(internship.title)}
                      >
                        Apply Now
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button asChild variant="outline" className="w-full rounded-lg border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white">
                    <Link to="/internships">Browse All Internships</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Free Courses */}
            <Card className="rounded-lg border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-[#333333]">Free Courses with Certificates</CardTitle>
                <CardDescription>Enhance your skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {freeCourses.map((course) => (
                    <div key={course.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm text-[#333333]">{course.title}</h4>
                        <BookOpen className="h-4 w-4 text-[#0A66C2]" />
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <span>{course.duration}</span>
                        <span>⭐ {course.rating}</span>
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full bg-[#1E90FF] hover:bg-[#0A66C2] rounded-lg"
                        onClick={() => handleEnrollCourse(course.title)}
                      >
                        Enroll Free + Certificate
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button asChild variant="outline" className="w-full rounded-lg border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white">
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
