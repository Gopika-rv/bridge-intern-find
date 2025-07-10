
import { useLocation, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Eye, Mail, Phone, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ViewAllApplications = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const internshipTitle = location.state?.internshipTitle || 'Internship';

  // Sample comprehensive applicant data
  const allApplicants = [
    {
      id: 1,
      name: 'Priya Sharma',
      email: 'priya.sharma@gmail.com',
      phone: '9876543210',
      university: 'IIT Delhi',
      degree: 'B.Tech Computer Science',
      skills: 'React, JavaScript, CSS, Node.js, MongoDB',
      experience: '6 months internship at StartupXYZ',
      status: 'pending',
      appliedDate: '2 days ago',
      resumeUrl: '/resume-priya.pdf',
      portfolio: 'https://priya-portfolio.com',
      rating: 4.2
    },
    {
      id: 2,
      name: 'Rahul Kumar',
      email: 'rahul.kumar@gmail.com',
      phone: '9876543211',
      university: 'NIT Warangal',
      degree: 'B.Tech Information Technology',
      skills: 'Vue.js, Node.js, MongoDB, Express.js, MySQL',
      experience: '1 year experience at TechCorp',
      status: 'shortlisted',
      appliedDate: '3 days ago',
      resumeUrl: '/resume-rahul.pdf',
      portfolio: 'https://rahul-dev.com',
      rating: 4.7
    },
    {
      id: 3,
      name: 'Anita Patel',
      email: 'anita.patel@gmail.com',
      phone: '9876543212',
      university: 'BITS Pilani',
      degree: 'B.E Computer Science',
      skills: 'Angular, TypeScript, HTML, CSS, Python',
      experience: 'Fresher with multiple projects',
      status: 'interviewed',
      appliedDate: '5 days ago',
      resumeUrl: '/resume-anita.pdf',
      portfolio: 'https://anita-codes.com',
      rating: 4.5
    },
    {
      id: 4,
      name: 'Vikram Singh',
      email: 'vikram.singh@gmail.com',
      phone: '9876543213',
      university: 'Delhi University',
      degree: 'MCA',
      skills: 'Python, SQL, Tableau, Power BI, Excel',
      experience: '8 months at DataTech Solutions',
      status: 'shortlisted',
      appliedDate: '1 week ago',
      resumeUrl: '/resume-vikram.pdf',
      portfolio: 'https://vikram-data.com',
      rating: 4.3
    },
    {
      id: 5,
      name: 'Meera Joshi',
      email: 'meera.joshi@gmail.com',
      phone: '9876543214',
      university: 'Pune University',
      degree: 'B.Sc Statistics',
      skills: 'R, Excel, Power BI, SQL, Data Analysis',
      experience: 'Multiple data analysis projects',
      status: 'hired',
      appliedDate: '2 weeks ago',
      resumeUrl: '/resume-meera.pdf',
      portfolio: 'https://meera-analytics.com',
      rating: 4.8
    }
  ];

  const handleViewProfile = (applicant: any) => {
    toast({
      title: "👤 Opening Full Profile",
      description: `Loading ${applicant.name}'s complete profile with portfolio...`,
      className: "bg-blue-50 border-blue-200 rounded-xl shadow-lg",
    });
    navigate('/view-profile', { state: { applicant } });
  };

  const handleDownloadResume = (applicantName: string) => {
    toast({
      title: "📄 Resume Downloaded",
      description: `${applicantName}'s resume has been downloaded successfully.`,
      className: "bg-green-50 border-green-200 rounded-xl shadow-lg",
    });
  };

  const handleContactApplicant = (applicant: any) => {
    toast({
      title: "📧 Contact Initiated",
      description: `Opening email to contact ${applicant.name} at ${applicant.email}`,
      className: "bg-blue-50 border-blue-200 rounded-xl shadow-lg",
    });
  };

  const handleShortlist = (applicantName: string) => {
    toast({
      title: "✅ Applicant Shortlisted!",
      description: `${applicantName} has been shortlisted and will be notified via email.`,
      className: "bg-green-50 border-green-200 rounded-xl shadow-lg",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="rounded-full">Pending Review</Badge>;
      case 'shortlisted':
        return <Badge className="bg-blue-100 text-blue-800 rounded-full">Shortlisted</Badge>;
      case 'interviewed':
        return <Badge className="bg-yellow-100 text-yellow-800 rounded-full">Interviewed</Badge>;
      case 'hired':
        return <Badge className="bg-green-100 text-green-800 rounded-full">Hired</Badge>;
      default:
        return <Badge variant="secondary" className="rounded-full">{status}</Badge>;
    }
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-[#F3F6F8]">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(-1)}
            className="rounded-xl"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-[#333333]">All Applications</h1>
            <p className="text-gray-600 mt-2">
              {allApplicants.length} applications for: <span className="font-medium">{internshipTitle}</span>
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          {allApplicants.map((applicant) => (
            <Card key={applicant.id} className="rounded-xl border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  {/* Left Section - Main Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-[#333333] mb-1">{applicant.name}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          {getRatingStars(applicant.rating)}
                          <span className="text-sm text-gray-600">({applicant.rating}/5.0)</span>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          {getStatusBadge(applicant.status)}
                          <span className="text-sm text-gray-500">Applied {applicant.appliedDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          <Mail className="h-4 w-4 inline mr-1" />
                          {applicant.email}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          <Phone className="h-4 w-4 inline mr-1" />
                          {applicant.phone}
                        </p>
                        <p className="text-sm font-medium text-[#333333]">
                          {applicant.degree} from {applicant.university}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1"><strong>Skills:</strong></p>
                        <p className="text-sm text-[#333333] mb-2">{applicant.skills}</p>
                        <p className="text-sm text-gray-600"><strong>Experience:</strong></p>
                        <p className="text-sm text-[#333333]">{applicant.experience}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Actions */}
                  <div className="flex flex-col gap-3 min-w-[200px]">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewProfile(applicant)}
                      className="rounded-xl w-full"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Full Profile
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownloadResume(applicant.name)}
                      className="rounded-xl w-full"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Resume
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleContactApplicant(applicant)}
                      className="rounded-xl w-full"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Contact
                    </Button>

                    {applicant.status === 'pending' && (
                      <Button
                        size="sm"
                        onClick={() => handleShortlist(applicant.name)}
                        className="bg-[#0A66C2] hover:bg-[#004182] text-white rounded-xl w-full"
                      >
                        Shortlist Candidate
                      </Button>
                    )}

                    {applicant.status === 'shortlisted' && (
                      <Button
                        size="sm"
                        onClick={() => toast({
                          title: "📅 Interview Scheduled!",
                          description: `Interview invitation sent to ${applicant.name}.`,
                          className: "bg-blue-50 border-blue-200 rounded-xl shadow-lg",
                        })}
                        className="bg-[#1E90FF] hover:bg-[#0A66C2] text-white rounded-xl w-full"
                      >
                        Schedule Interview
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {allApplicants.length === 0 && (
          <Card className="rounded-xl border-0 shadow-md">
            <CardContent className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Eye className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Yet</h3>
              <p className="text-gray-500">Applications for this internship will appear here.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ViewAllApplications;
