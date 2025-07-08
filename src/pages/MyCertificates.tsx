
import Navigation from '../components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Award, Calendar, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MyCertificates = () => {
  const { toast } = useToast();

  // Mock certificates data - in real app, this would come from user's completed courses
  const certificates = [
    {
      id: 1,
      courseName: 'Introduction to Web Development',
      instructor: 'InternConnect Academy',
      completedDate: '2024-01-15',
      certificateId: 'IC-WD-2024-001',
      skills: ['HTML', 'CSS', 'JavaScript'],
      status: 'verified',
    },
    {
      id: 2,
      courseName: 'Digital Marketing Fundamentals',
      instructor: 'Marketing Pro Institute',
      completedDate: '2024-02-28',
      certificateId: 'IC-DM-2024-002',
      skills: ['SEO', 'Social Media', 'Analytics'],
      status: 'verified',
    },
    {
      id: 3,
      courseName: 'Data Analysis with Excel',
      instructor: 'Data Skills Academy',
      completedDate: '2024-03-10',
      certificateId: 'IC-DA-2024-003',
      skills: ['Excel', 'Data Visualization', 'Analytics'],
      status: 'verified',
    },
  ];

  const handleDownload = (courseName: string, certificateId: string) => {
    // Simulate certificate download
    toast({
      title: "Certificate Downloaded!",
      description: `Certificate for ${courseName} (${certificateId}) has been downloaded.`,
    });
  };

  const handleShare = (courseName: string) => {
    // Simulate sharing certificate
    toast({
      title: "Certificate Shared!",
      description: `Your ${courseName} certificate has been shared to your profile.`,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Certificates</h1>
          <p className="text-gray-600 mt-2">Download and share your earned certificates</p>
        </div>

        {certificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate) => (
              <Card key={certificate.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{certificate.courseName}</CardTitle>
                  <CardDescription>{certificate.instructor}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Certificate ID:</span>
                      <span className="font-mono text-xs">{certificate.certificateId}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Completed:</span>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(certificate.completedDate)}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <span className="text-sm text-gray-600">Skills Certified:</span>
                      <div className="flex flex-wrap gap-1">
                        {certificate.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <Badge className="bg-green-100 text-green-800">
                        ✓ Verified
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-4">
                      <Button 
                        onClick={() => handleDownload(certificate.courseName, certificate.certificateId)}
                        size="sm"
                        className="flex items-center space-x-1"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </Button>
                      <Button 
                        onClick={() => handleShare(certificate.courseName)}
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-1"
                      >
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Award className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Certificates Yet</h3>
            <p className="text-gray-500 mb-6">Complete free courses to earn your first certificate!</p>
            <Button asChild>
              <a href="/free-courses">Browse Free Courses</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCertificates;
