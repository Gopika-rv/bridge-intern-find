
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Mail, Phone, MapPin, GraduationCap, Award, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ViewProfile = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const profileId = searchParams.get('id');
  const profileType = searchParams.get('type') || 'student';

  // Mock student data - in real app, fetch based on profileId
  const studentProfile = {
    id: profileId || '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@gmail.com',
    phone: '+91-9876543210',
    location: 'Mumbai, Maharashtra, India',
    university: 'Indian Institute of Technology, Mumbai',
    degree: 'Bachelor of Computer Science',
    year: '3rd Year',
    skills: ['React', 'Node.js', 'Python', 'Machine Learning', 'MongoDB'],
    portfolio: 'https://alexjohnson.dev',
    bio: 'Passionate computer science student with strong foundation in full-stack development and machine learning. Seeking internship opportunities to apply theoretical knowledge in real-world projects.',
    experience: [
      {
        title: 'Frontend Developer Intern',
        company: 'TechStart',
        duration: '3 months',
        description: 'Built responsive web applications using React and TypeScript'
      }
    ],
    projects: [
      {
        title: 'E-commerce Platform',
        description: 'Full-stack web application with payment integration',
        tech: ['React', 'Node.js', 'MongoDB']
      },
      {
        title: 'ML Image Classifier',
        description: 'Deep learning model for image classification',
        tech: ['Python', 'TensorFlow', 'OpenCV']
      }
    ],
    gpa: '8.5/10',
    achievements: ['Dean\'s List 2023', 'Hackathon Winner', 'Open Source Contributor']
  };

  const handleShortlist = () => {
    toast({
      title: "Student Shortlisted! ✅",
      description: `${studentProfile.name} has been added to your shortlist. They will be notified about your interest.`,
      className: "bg-green-50 border-green-200",
    });
  };

  const handleScheduleInterview = () => {
    toast({
      title: "Interview Invitation Sent! 📅",
      description: `Interview invitation has been sent to ${studentProfile.name}. Check your messages for further communication.`,
      className: "bg-blue-50 border-blue-200",
    });
  };

  const handleContactStudent = () => {
    navigate(`/messages?student=${studentProfile.id}`);
  };

  if (!user || user.userType !== 'company') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="pt-6">
            <p className="text-center text-gray-600">Access restricted to company accounts only.</p>
            <Button onClick={() => navigate('/login')} className="w-full mt-4">
              Login as Company
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{studentProfile.name}</CardTitle>
                    <CardDescription className="text-lg mt-1">
                      {studentProfile.degree} • {studentProfile.year}
                    </CardDescription>
                    <CardDescription className="flex items-center mt-2">
                      <GraduationCap className="h-4 w-4 mr-1" />
                      {studentProfile.university}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="mb-2">
                      GPA: {studentProfile.gpa}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{studentProfile.bio}</p>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{studentProfile.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{studentProfile.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{studentProfile.location}</span>
                  </div>
                </div>

                {studentProfile.portfolio && (
                  <div className="mt-4">
                    <a 
                      href={studentProfile.portfolio} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-blue-600 hover:underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>View Portfolio</span>
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Technical Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {studentProfile.skills.map((skill, index) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Projects */}
            <Card>
              <CardHeader>
                <CardTitle>Projects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {studentProfile.projects.map((project, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium">{project.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.tech.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader>
                <CardTitle>Experience</CardTitle>
              </CardHeader>
              <CardContent>
                {studentProfile.experience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-medium">{exp.title}</h4>
                    <p className="text-sm text-gray-600">{exp.company} • {exp.duration}</p>
                    <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Action Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={handleShortlist} 
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  Shortlist Candidate
                </Button>
                <Button 
                  onClick={handleScheduleInterview} 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Schedule Interview
                </Button>
                <Button 
                  onClick={handleContactStudent} 
                  variant="outline" 
                  className="w-full"
                >
                  Send Message
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {studentProfile.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">{achievement}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
