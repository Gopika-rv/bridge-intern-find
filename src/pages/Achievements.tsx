
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Award, Download, Calendar, Trophy, Star, CheckCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Achievements = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  // Mock achievements data
  const achievements = [
    {
      id: 1,
      title: 'React Fundamentals',
      issuer: 'InternConnect Academy',
      date: 'December 2024',
      type: 'Course Certificate',
      description: 'Completed comprehensive React.js course with hands-on projects',
      skills: ['React', 'JavaScript', 'Web Development'],
      status: 'completed',
      certificateId: 'IC-REACT-2024-001'
    },
    {
      id: 2,
      title: 'Full Stack Development',
      issuer: 'TechCorp Training',
      date: 'November 2024',
      type: 'Internship Certificate',
      description: 'Successfully completed 3-month internship program',
      skills: ['Node.js', 'MongoDB', 'Express.js'],
      status: 'completed',
      certificateId: 'TC-FS-2024-045'
    },
    {
      id: 3,
      title: 'Python for Data Science',
      issuer: 'DataLearn Institute',
      date: 'October 2024',
      type: 'Course Certificate',
      description: 'Advanced Python programming for data analysis and visualization',
      skills: ['Python', 'Pandas', 'Data Analysis'],
      status: 'completed',
      certificateId: 'DL-PY-2024-089'
    },
    {
      id: 4,
      title: 'Digital Marketing Basics',
      issuer: 'Marketing Pro Academy',
      date: 'In Progress',
      type: 'Course Certificate',
      description: 'Learning digital marketing strategies and tools',
      skills: ['Digital Marketing', 'SEO', 'Social Media'],
      status: 'in-progress',
      certificateId: null
    }
  ];

  const stats = {
    totalCertificates: achievements.filter(a => a.status === 'completed').length,
    coursesCompleted: achievements.filter(a => a.type === 'Course Certificate' && a.status === 'completed').length,
    internshipsCertified: achievements.filter(a => a.type === 'Internship Certificate').length,
    inProgress: achievements.filter(a => a.status === 'in-progress').length
  };

  const handleDownloadCertificate = (achievement: any) => {
    if (achievement.status !== 'completed') {
      toast({
        title: "Certificate Not Available",
        description: "Complete the course first to download your certificate.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Certificate Downloaded! 🎉",
      description: `${achievement.title} certificate has been downloaded successfully.`,
      className: "bg-green-50 border-green-200",
    });

    // Simulate certificate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${achievement.title.replace(/\s+/g, '_')}_Certificate.pdf`;
    link.click();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <Award className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Trophy className="h-8 w-8 mr-3 text-yellow-500" />
            My Achievements
          </h1>
          <p className="text-gray-600 mt-2">Track your learning progress and download certificates</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Certificates</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCertificates}</div>
              <p className="text-xs text-muted-foreground">Ready for download</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.coursesCompleted}</div>
              <p className="text-xs text-muted-foreground">Learning achievements</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Internships</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.internshipsCertified}</div>
              <p className="text-xs text-muted-foreground">Professional experience</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.inProgress}</div>
              <p className="text-xs text-muted-foreground">Continue learning</p>
            </CardContent>
          </Card>
        </div>

        {/* Achievements List */}
        <div className="space-y-6">
          {achievements.map((achievement) => (
            <Card key={achievement.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      {getStatusIcon(achievement.status)}
                      <CardTitle className="text-lg">{achievement.title}</CardTitle>
                      {getStatusBadge(achievement.status)}
                    </div>
                    <CardDescription className="text-base">
                      {achievement.issuer} • {achievement.date}
                    </CardDescription>
                    <p className="text-gray-600 mt-2">{achievement.description}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="mb-2">
                      {achievement.type}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {achievement.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    {achievement.certificateId && (
                      <p className="text-xs text-gray-500">
                        Certificate ID: {achievement.certificateId}
                      </p>
                    )}
                  </div>
                  <div>
                    <Button
                      onClick={() => handleDownloadCertificate(achievement)}
                      disabled={achievement.status !== 'completed'}
                      className="flex items-center space-x-2"
                    >
                      <Download className="h-4 w-4" />
                      <span>
                        {achievement.status === 'completed' ? 'Download' : 'Not Available'}
                      </span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {achievements.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Award className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No achievements yet</h3>
              <p className="text-gray-600 mb-6">
                Start taking courses and completing internships to earn certificates and build your profile.
              </p>
              <Button onClick={() => window.location.href = '/free-courses'}>
                Browse Free Courses
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Achievements;
