
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Eye, Send, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  // Mock data for dashboard stats
  const stats = {
    applicationsSubmitted: 8,
    profileViews: 24,
    interviewInvites: 3,
    savedInternships: 12,
  };

  // Mock recent activity
  const recentActivity = [
    { id: 1, action: 'Applied to Software Developer Intern at TechCorp', time: '2 hours ago', status: 'pending' },
    { id: 2, action: 'Profile viewed by Microsoft Recruiter', time: '1 day ago', status: 'viewed' },
    { id: 3, action: 'Interview invite from StartupXYZ', time: '2 days ago', status: 'interview' },
    { id: 4, action: 'Saved Marketing Intern position at AdAgency', time: '3 days ago', status: 'saved' },
  ];

  // Mock recommended internships
  const recommendedInternships = [
    {
      id: 1,
      title: 'Frontend Developer Intern',
      company: 'TechStart Inc.',
      location: 'Remote',
      stipend: '$1,500/month',
      type: 'Full-time',
      postedDate: '2 days ago',
    },
    {
      id: 2,
      title: 'Data Science Intern',
      company: 'Analytics Pro',
      location: 'New York, NY',
      stipend: '$2,000/month',
      type: 'Full-time',
      postedDate: '1 week ago',
    },
    {
      id: 3,
      title: 'UI/UX Design Intern',
      company: 'Creative Studio',
      location: 'San Francisco, CA',
      stipend: '$1,800/month',
      type: 'Part-time',
      postedDate: '3 days ago',
    },
  ];

  const handleApplyNow = (internshipTitle: string) => {
    toast({
      title: "Application Submitted!",
      description: `Your application for ${internshipTitle} has been submitted successfully.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'viewed':
        return <Badge variant="outline">Viewed</Badge>;
      case 'interview':
        return <Badge className="bg-green-100 text-green-800">Interview</Badge>;
      case 'saved':
        return <Badge variant="secondary">Saved</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600 mt-2">Here's what's happening with your internship search</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Applications</CardTitle>
              <Send className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.applicationsSubmitted}</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.profileViews}</div>
              <p className="text-xs text-muted-foreground">+8 from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interview Invites</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.interviewInvites}</div>
              <p className="text-xs text-muted-foreground">+1 from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saved Positions</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.savedInternships}</div>
              <p className="text-xs text-muted-foreground">+3 from last week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest applications and profile interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      {getStatusBadge(activity.status)}
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/notifications">View All Activity</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommended Internships */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
                <CardDescription>Internships matching your profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedInternships.map((internship) => (
                    <div key={internship.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm">{internship.title}</h4>
                        <Briefcase className="h-4 w-4 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{internship.company}</p>
                      <p className="text-xs text-gray-500 mb-2">{internship.location}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-green-600">{internship.stipend}</span>
                        <span className="text-xs text-gray-500">{internship.postedDate}</span>
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full mt-3 bg-primary hover:bg-primary/90"
                        onClick={() => handleApplyNow(internship.title)}
                      >
                        Apply Now
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-6 space-y-2">
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/paid-internships">Browse Paid Internships</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/free-internships">Browse Free Internships</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/free-courses">Browse Free Courses</Link>
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
