
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

const CompanyDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newInternship, setNewInternship] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    duration: '',
    stipend: '',
    type: 'full-time',
  });

  // Mock data for dashboard stats
  const stats = {
    activeInternships: 5,
    totalApplications: 47,
    interviewsScheduled: 12,
    positionsHired: 3,
  };

  // Mock active internships
  const activeInternships = [
    {
      id: 1,
      title: 'Software Developer Intern',
      applications: 15,
      status: 'active',
      postedDate: '1 week ago',
      applicants: [
        { name: 'John Doe', status: 'pending' },
        { name: 'Jane Smith', status: 'shortlisted' },
        { name: 'Mike Johnson', status: 'interviewed' },
      ]
    },
    {
      id: 2,
      title: 'Marketing Intern',
      applications: 8,
      status: 'active',
      postedDate: '3 days ago',
      applicants: [
        { name: 'Sarah Wilson', status: 'pending' },
        { name: 'Tom Brown', status: 'shortlisted' },
      ]
    },
    {
      id: 3,
      title: 'Data Science Intern',
      applications: 24,
      status: 'active',
      postedDate: '2 weeks ago',
      applicants: [
        { name: 'Emily Davis', status: 'interviewed' },
        { name: 'Alex Chen', status: 'hired' },
        { name: 'Maria Garcia', status: 'shortlisted' },
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
    // In a real app, this would save to database
    console.log('New internship posted:', newInternship);
    toast({
      title: "Internship Posted!",
      description: "Your internship has been successfully posted.",
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
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'shortlisted':
        return <Badge className="bg-blue-100 text-blue-800">Shortlisted</Badge>;
      case 'interviewed':
        return <Badge className="bg-yellow-100 text-yellow-800">Interviewed</Badge>;
      case 'hired':
        return <Badge className="bg-green-100 text-green-800">Hired</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Company Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your internships and review applications</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Post New Internship</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Post New Internship</DialogTitle>
                <DialogDescription>Create a new internship posting for students to apply to.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={newInternship.title}
                      onChange={handleInputChange}
                      placeholder="e.g., Software Developer Intern"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={newInternship.location}
                      onChange={handleInputChange}
                      placeholder="e.g., Remote, New York, NY"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      name="duration"
                      value={newInternship.duration}
                      onChange={handleInputChange}
                      placeholder="e.g., 3 months"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stipend">Stipend</Label>
                    <Input
                      id="stipend"
                      name="stipend"
                      value={newInternship.stipend}
                      onChange={handleInputChange}
                      placeholder="e.g., $1500/month"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select value={newInternship.type} onValueChange={(value) => setNewInternship({...newInternship, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={newInternship.description}
                    onChange={handleInputChange}
                    placeholder="Describe the role, responsibilities, and what the intern will learn..."
                    rows={4}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements</Label>
                  <Textarea
                    id="requirements"
                    name="requirements"
                    value={newInternship.requirements}
                    onChange={handleInputChange}
                    placeholder="List the required skills, education, and qualifications..."
                    rows={3}
                    required
                  />
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Post Internship</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Internships</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeInternships}</div>
              <p className="text-xs text-muted-foreground">+1 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalApplications}</div>
              <p className="text-xs text-muted-foreground">+12 from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interviews Scheduled</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.interviewsScheduled}</div>
              <p className="text-xs text-muted-foreground">+3 from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Positions Filled</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.positionsHired}</div>
              <p className="text-xs text-muted-foreground">+1 from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Internships */}
        <Card>
          <CardHeader>
            <CardTitle>Active Internships</CardTitle>
            <CardDescription>Manage your posted internships and review applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {activeInternships.map((internship) => (
                <div key={internship.id} className="border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{internship.title}</h3>
                      <p className="text-sm text-gray-500">Posted {internship.postedDate}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline">{internship.applications} applications</Badge>
                      <Badge className="bg-green-100 text-green-800">{internship.status}</Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Recent Applicants</h4>
                    {internship.applicants.map((applicant, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="font-medium">{applicant.name}</span>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(applicant.status)}
                          <Button size="sm" variant="outline">
                            View Profile
                          </Button>
                          {applicant.status === 'pending' && (
                            <Button size="sm">
                              Shortlist
                            </Button>
                          )}
                          {applicant.status === 'shortlisted' && (
                            <Button size="sm">
                              Interview
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-end mt-4 space-x-2">
                    <Button variant="outline" size="sm">
                      View All Applications
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit Posting
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
