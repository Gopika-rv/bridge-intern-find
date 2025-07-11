import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import InterviewScheduler from '../components/InterviewScheduler';
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
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showScheduler, setShowScheduler] = useState(false);
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

  // Real stats - these would come from actual database
  const stats = {
    activeInternship: 0,
    totalApplications: 0,
    interviewsScheduled: 0,
    positionsHired: 0,
  };

  // Empty array - real data would come from database
  const postedInternship = [];

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
      className: "bg-green-50 border-green-200 rounded-xl shadow-lg",
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
      title: "👤 Opening Student Profile",
      description: `Loading ${applicant.name}'s complete profile...`,
      className: "bg-blue-50 border-blue-200 rounded-xl shadow-lg",
    });
    navigate('/view-profile', { state: { applicant } });
  };

  const handleShortlist = (applicantName: string) => {
    toast({
      title: "✅ Applicant Shortlisted Successfully!",
      description: `${applicantName} has been shortlisted and will be notified via email.`,
      className: "bg-green-50 border-green-200 rounded-xl shadow-lg",
    });
  };

  const handleScheduleInterview = (applicant: any, internshipTitle: string) => {
    setSelectedApplicant({ ...applicant, internshipTitle });
    setShowScheduler(true);
  };

  const handleViewAllApplications = (internshipTitle: string) => {
    navigate('/view-all-applications', { state: { internshipTitle } });
  };

  return (
    <div className="min-h-screen bg-[#F3F6F8]">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#333333]">Company Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your internship and review applications</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 rounded-xl px-6 py-3 text-white">
                <Plus className="h-4 w-4" />
                <span>Post Internship</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-gradient-to-br from-green-50 to-amber-50">
              <DialogHeader>
                <DialogTitle className="text-green-800 text-xl">Post New Internship</DialogTitle>
                <DialogDescription className="text-amber-700">Create a new internship posting to attract top talent.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-green-800 font-medium">Job Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={newInternship.title}
                      onChange={handleInputChange}
                      placeholder="e.g., Frontend Developer Intern"
                      className="rounded-xl border-green-300 focus:border-green-500 focus:ring-green-500 bg-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-green-800 font-medium">Location *</Label>
                    <Input
                      id="location"
                      name="location"
                      value={newInternship.location}
                      onChange={handleInputChange}
                      placeholder="e.g., Remote, Mumbai, India"
                      className="rounded-xl border-green-300 focus:border-green-500 focus:ring-green-500 bg-white"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration" className="text-green-800 font-medium">Duration *</Label>
                    <Input
                      id="duration"
                      name="duration"
                      value={newInternship.duration}
                      onChange={handleInputChange}
                      placeholder="e.g., 3 months"
                      className="rounded-xl border-green-300 focus:border-green-500 focus:ring-green-500 bg-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-green-800 font-medium">Work Type *</Label>
                    <Select value={newInternship.type} onValueChange={(value) => setNewInternship({...newInternship, type: value})}>
                      <SelectTrigger className="rounded-xl border-green-300 bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="internshipType" className="text-green-800 font-medium">Compensation Type *</Label>
                    <Select value={newInternship.internshipType} onValueChange={(value) => setNewInternship({...newInternship, internshipType: value})}>
                      <SelectTrigger className="rounded-xl border-green-300 bg-white">
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
                  <Label htmlFor="stipend" className="text-green-800 font-medium">Stipend/Compensation *</Label>
                  <Input
                    id="stipend"
                    name="stipend"
                    value={newInternship.stipend}
                    onChange={handleInputChange}
                    placeholder="e.g., ₹25,000/month or Certificate of Completion"
                    className="rounded-xl border-green-300 focus:border-green-500 focus:ring-green-500 bg-white"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-green-800 font-medium">Job Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={newInternship.description}
                    onChange={handleInputChange}
                    placeholder="Describe the role, responsibilities, and what the intern will learn..."
                    rows={4}
                    className="rounded-xl border-green-300 focus:border-green-500 focus:ring-green-500 bg-white"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="requirements" className="text-green-800 font-medium">Requirements *</Label>
                  <Textarea
                    id="requirements"
                    name="requirements"
                    value={newInternship.requirements}
                    onChange={handleInputChange}
                    placeholder="List the required skills, education, and qualifications..."
                    rows={3}
                    className="rounded-xl border-green-300 focus:border-green-500 focus:ring-green-500 bg-white"
                    required
                  />
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-xl border-amber-400 text-amber-700 hover:bg-amber-50">
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700 rounded-xl text-white">Post Internship</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="rounded-xl border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#333333]">Active Internship</CardTitle>
              <Briefcase className="h-4 w-4 text-[#0A66C2]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0A66C2]">{stats.activeInternship}</div>
              <p className="text-xs text-muted-foreground">Currently posted</p>
            </CardContent>
          </Card>

          <Card className="rounded-xl border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#333333]">Total Applications</CardTitle>
              <Users className="h-4 w-4 text-[#0A66C2]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0A66C2]">{stats.totalApplications}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card className="rounded-xl border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#333333]">Interviews Scheduled</CardTitle>
              <MessageSquare className="h-4 w-4 text-[#0A66C2]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0A66C2]">{stats.interviewsScheduled}</div>
              <p className="text-xs text-muted-foreground">Upcoming</p>
            </CardContent>
          </Card>

          <Card className="rounded-xl border-0 shadow-md">
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
        <Card className="rounded-xl border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-[#333333]">Posted Internship</CardTitle>
            <CardDescription>Manage your internship postings and review applications</CardDescription>
          </CardHeader>
          <CardContent>
            {postedInternship.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Internships Posted Yet</h3>
                <p className="text-gray-500 mb-6">Start by posting your first internship to attract talented students</p>
                <Button 
                  onClick={() => setIsDialogOpen(true)}
                  className="bg-green-600 hover:bg-green-700 rounded-xl text-white px-6 py-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Post Your First Internship
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Real internship data would be mapped here */}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Interview Scheduler Modal */}
      {showScheduler && selectedApplicant && (
        <InterviewScheduler
          applicant={selectedApplicant}
          internshipTitle={selectedApplicant.internshipTitle}
          onClose={() => {
            setShowScheduler(false);
            setSelectedApplicant(null);
          }}
        />
      )}
    </div>
  );
};

export default CompanyDashboard;
