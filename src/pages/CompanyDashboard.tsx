
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Briefcase, Eye, Plus, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const CompanyDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newInternship, setNewInternship] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    duration: '',
    stipend: '',
    type: 'full-time',
    internshipType: 'paid',
  });

  // Unique stats for this company
  const stats = {
    activeInternships: 4,
    totalApplications: 32,
    interviewsScheduled: 6,
    positionsHired: 3,
  };

  // Unique internships posted by this company
  const postedInternships = [
    {
      id: 1,
      title: 'Frontend Developer Intern',
      applications: 12,
      status: 'active',
      postedDate: '2 days ago',
      type: 'paid',
      stipend: '₹30,000/month',
      applicants: [
        { name: 'Priya Sharma', status: 'pending', email: 'priya@gmail.com', phone: '9876543210', skills: 'React, JavaScript, CSS' },
        { name: 'Rahul Kumar', status: 'shortlisted', email: 'rahul@gmail.com', phone: '9876543211', skills: 'Vue.js, Node.js, MongoDB' },
        { name: 'Anita Patel', status: 'interviewed', email: 'anita@gmail.com', phone: '9876543212', skills: 'Angular, TypeScript, HTML' },
      ]
    },
    {
      id: 2,
      title: 'Data Analyst Intern',
      applications: 8,
      status: 'active',
      postedDate: '5 days ago',
      type: 'paid',
      stipend: '₹25,000/month',
      applicants: [
        { name: 'Vikram Singh', status: 'shortlisted', email: 'vikram@gmail.com', phone: '9876543213', skills: 'Python, SQL, Tableau' },
        { name: 'Meera Joshi', status: 'hired', email: 'meera@gmail.com', phone: '9876543214', skills: 'R, Excel, Power BI' },
      ]
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewInternship({
      ...newInternship,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New internship posted:', newInternship);
    toast({
      title: "🎉 Internship Posted Successfully!",
      description: `Your ${newInternship.internshipType} internship "${newInternship.title}" is now live and accepting applications.`,
      className: "bg-green-50 border-green-200 rounded-lg",
    });
    setIsDialogOpen(false);
    setNewInternship({
      title: '',
      description: '',
      requirements: '',
      location: '',
      duration: '',
      stipend: '',
      type: 'full-time',
      internshipType: 'paid',
    });
  };

  const handleViewProfile = (applicant: any) => {
    toast({
      title: "👤 Student Profile",
      description: `${applicant.name} - ${applicant.email} - Skills: ${applicant.skills}`,
      className: "bg-blue-50 border-blue-200 rounded-lg",
    });
    navigate('/view-profile', { state: { applicant } });
  };

  const handleShortlist = (applicantName: string) => {
    toast({
      title: "✅ Applicant Shortlisted!",
      description: `${applicantName} has been shortlisted and will be notified via email.`,
      className: "bg-green-50 border-green-200 rounded-lg",
    });
  };

  const handleScheduleInterview = (applicantName: string) => {
    toast({
      title: "📅 Interview Scheduled!",
      description: `Interview invitation sent to ${applicantName}. They'll receive calendar invite shortly.`,
      className: "bg-blue-50 border-blue-200 rounded-lg",
    });
  };

  const handleViewAllApplications = (internshipTitle: string) => {
    toast({
      title: "📋 All Applications",
      description: `Viewing all applications for ${internshipTitle}. Detailed list opened.`,
      className: "bg-blue-50 border-blue-200 rounded-lg",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="rounded-full">Pending</Badge>;
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

  return (
    <div className="min-h-screen bg-[#F3F6F8]">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#333333]">Company Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your internships and review applications</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2 bg-[#0A66C2] hover:bg-[#004182] rounded-lg px-6 py-3">
                <Plus className="h-4 w-4" />
                <span>Post Internship</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg">
              <DialogHeader>
                <DialogTitle className="text-[#333333]">Post New Internship</DialogTitle>
                <DialogDescription>Create a new internship posting to attract top talent.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-[#333333]">Job Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={newInternship.title}
                      onChange={handleInputChange}
                      placeholder="e.g., Frontend Developer Intern"
                      className="rounded-lg border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-[#333333]">Location *</Label>
                    <Input
                      id="location"
                      name="location"
                      value={newInternship.location}
                      onChange={handleInputChange}
                      placeholder="e.g., Remote, Mumbai, India"
                      className="rounded-lg border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2]"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration" className="text-[#333333]">Duration *</Label>
                    <Input
                      id="duration"
                      name="duration"
                      value={newInternship.duration}
                      onChange={handleInputChange}
                      placeholder="e.g., 3 months"
                      className="rounded-lg border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-[#333333]">Work Type *</Label>
                    <Select value={newInternship.type} onValueChange={(value) => setNewInternship({...newInternship, type: value})}>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="internshipType" className="text-[#333333]">Compensation Type *</Label>
                    <Select value={newInternship.internshipType} onValueChange={(value) => setNewInternship({...newInternship, internshipType: value})}>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="free">Free (Certificate Only)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="stipend" className="text-[#333333]">Stipend/Compensation *</Label>
                  <Input
                    id="stipend"
                    name="stipend"
                    value={newInternship.stipend}
                    onChange={handleInputChange}
                    placeholder="e.g., ₹25,000/month or Certificate of Completion"
                    className="rounded-lg border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2]"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-[#333333]">Job Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={newInternship.description}
                    onChange={handleInputChange}
                    placeholder="Describe the role, responsibilities, and what the intern will learn..."
                    rows={4}
                    className="rounded-lg border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2]"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="requirements" className="text-[#333333]">Requirements *</Label>
                  <Textarea
                    id="requirements"
                    name="requirements"
                    value={newInternship.requirements}
                    onChange={handleInputChange}
                    placeholder="List the required skills, education, and qualifications..."
                    rows={3}
                    className="rounded-lg border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2]"
                    required
                  />
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-lg">
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-[#0A66C2] hover:bg-[#004182] rounded-lg">Post Internship</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="rounded-lg border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#333333]">Active Internships</CardTitle>
              <Briefcase className="h-4 w-4 text-[#0A66C2]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0A66C2]">{stats.activeInternships}</div>
              <p className="text-xs text-muted-foreground">Currently posted</p>
            </CardContent>
          </Card>

          <Card className="rounded-lg border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#333333]">Total Applications</CardTitle>
              <Users className="h-4 w-4 text-[#0A66C2]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0A66C2]">{stats.totalApplications}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card className="rounded-lg border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#333333]">Interviews Scheduled</CardTitle>
              <MessageSquare className="h-4 w-4 text-[#0A66C2]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0A66C2]">{stats.interviewsScheduled}</div>
              <p className="text-xs text-muted-foreground">Upcoming</p>
            </CardContent>
          </Card>

          <Card className="rounded-lg border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#333333]">Positions Filled</CardTitle>
              <Eye className="h-4 w-4 text-[#0A66C2]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0A66C2]">{stats.positionsHired}</div>
              <p className="text-xs text-muted-foreground">Successfully hired</p>
            </CardContent>
          </Card>
        </div>

        {/* Posted Internships */}
        <Card className="rounded-lg border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-[#333333]">Posted Internships</CardTitle>
            <CardDescription>Manage your internship postings and review applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {postedInternships.map((internship) => (
                <div key={internship.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                    <div>
                      <h3 className="text-lg font-semibold text-[#333333]">{internship.title}</h3>
                      <p className="text-sm text-gray-500">Posted {internship.postedDate}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="rounded-full">{internship.applications} applications</Badge>
                      <Badge className="bg-green-100 text-green-800 rounded-full">
                        {internship.type === 'paid' ? `Paid - ${internship.stipend}` : 'Free - Certificate'}
                      </Badge>
                      <Badge className="bg-green-100 text-green-800 rounded-full">{internship.status}</Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-[#333333]">Recent Applicants</h4>
                    <div className="space-y-3">
                      {internship.applicants.map((applicant, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg gap-3">
                          <div className="flex-1">
                            <span className="font-medium text-[#333333]">{applicant.name}</span>
                            <p className="text-xs text-gray-500">{applicant.skills}</p>
                          </div>
                          <div className="flex items-center flex-wrap gap-2">
                            {getStatusBadge(applicant.status)}
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleViewProfile(applicant)}
                              className="rounded-lg"
                            >
                              View Profile
                            </Button>
                            {applicant.status === 'pending' && (
                              <Button 
                                size="sm"
                                onClick={() => handleShortlist(applicant.name)}
                                className="bg-[#0A66C2] hover:bg-[#004182] text-white rounded-lg"
                              >
                                Shortlist
                              </Button>
                            )}
                            {applicant.status === 'shortlisted' && (
                              <Button 
                                size="sm"
                                onClick={() => handleScheduleInterview(applicant.name)}
                                className="bg-[#1E90FF] hover:bg-[#0A66C2] text-white rounded-lg"
                              >
                                Interview
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewAllApplications(internship.title)}
                      className="rounded-lg"
                    >
                      View All Applications
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyDashboard;
