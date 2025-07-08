
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Search, MapPin, Clock, DollarSign, Building, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Internships = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [domainFilter, setDomainFilter] = useState('');
  const [selectedInternship, setSelectedInternship] = useState<any>(null);
  const [applicationText, setApplicationText] = useState('');

  // Mock internships data
  const internships = [
    {
      id: 1,
      title: 'Frontend Developer Intern',
      company: 'TechStart Inc.',
      location: 'Remote',
      stipend: '$1,500/month',
      duration: '3 months',
      type: 'Full-time',
      domain: 'Technology',
      description: 'Join our dynamic team as a Frontend Developer Intern. You will work on cutting-edge web applications using React, TypeScript, and modern CSS frameworks.',
      requirements: 'Knowledge of HTML, CSS, JavaScript, and React. Portfolio of projects preferred.',
      postedDate: '2 days ago',
      applications: 15,
    },
    {
      id: 2,
      title: 'Data Science Intern',
      company: 'Analytics Pro',
      location: 'New York, NY',
      stipend: '$2,000/month',
      duration: '6 months',
      type: 'Full-time',
      domain: 'Data Science',
      description: 'Work with our data science team to analyze large datasets and build predictive models using Python and machine learning libraries.',
      requirements: 'Strong background in statistics, Python programming, and experience with pandas, scikit-learn.',
      postedDate: '1 week ago',
      applications: 28,
    },
    {
      id: 3,
      title: 'UI/UX Design Intern',
      company: 'Creative Studio',
      location: 'San Francisco, CA',
      stipend: '$1,800/month',
      duration: '4 months',
      type: 'Part-time',
      domain: 'Design',
      description: 'Create beautiful and intuitive user interfaces for web and mobile applications. Work closely with product managers and developers.',
      requirements: 'Proficiency in Figma, Adobe Creative Suite, and understanding of design principles.',
      postedDate: '3 days ago',
      applications: 22,
    },
    {
      id: 4,
      title: 'Marketing Intern',
      company: 'Growth Marketing Co.',
      location: 'Chicago, IL',
      stipend: '$1,200/month',
      duration: '3 months',
      type: 'Full-time',
      domain: 'Marketing',
      description: 'Support digital marketing campaigns, content creation, and social media management for B2B clients.',
      requirements: 'Understanding of digital marketing, content creation skills, and social media experience.',
      postedDate: '5 days ago',
      applications: 18,
    },
    {
      id: 5,
      title: 'Software Engineering Intern',
      company: 'Innovation Labs',
      location: 'Austin, TX',
      stipend: '$2,200/month',
      duration: '5 months',
      type: 'Full-time',
      domain: 'Technology',
      description: 'Develop backend services and APIs using Node.js, PostgreSQL, and cloud technologies. Work on scalable solutions.',
      requirements: 'Experience with JavaScript/Node.js, databases, and basic understanding of cloud platforms.',
      postedDate: '1 week ago',
      applications: 31,
    },
    {
      id: 6,
      title: 'Business Analyst Intern',
      company: 'Consulting Group',
      location: 'Boston, MA',
      stipend: '$1,600/month',
      duration: '4 months',
      type: 'Full-time',
      domain: 'Business',
      description: 'Analyze business processes, gather requirements, and support project management activities for enterprise clients.',
      requirements: 'Strong analytical skills, Excel proficiency, and business acumen.',
      postedDate: '4 days ago',
      applications: 12,
    },
  ];

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || internship.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesDomain = !domainFilter || internship.domain === domainFilter;
    
    return matchesSearch && matchesLocation && matchesDomain;
  });

  const handleApply = (internship: any) => {
    setSelectedInternship(internship);
    setApplicationText('');
  };

  const submitApplication = () => {
    if (!applicationText.trim()) {
      toast({
        title: "Error",
        description: "Please write a cover letter for your application.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would submit to database
    console.log('Application submitted for:', selectedInternship.title);
    toast({
      title: "Application Submitted!",
      description: `Your application for ${selectedInternship.title} has been sent successfully.`,
    });
    setSelectedInternship(null);
    setApplicationText('');
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setDomainFilter('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Browse Internships</h1>
          <p className="text-gray-600 mt-2">Find your perfect internship opportunity</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search internships..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={domainFilter} onValueChange={setDomainFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Domain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Domains</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                </SelectContent>
              </Select>
              
              <Button onClick={clearAllFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredInternships.length} of {internships.length} internships
          </p>
        </div>

        {/* Internships Grid */}
        <div className="grid gap-6">
          {filteredInternships.map((internship) => (
            <Card key={internship.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{internship.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <Building className="h-4 w-4" />
                        <span>{internship.company}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{internship.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{internship.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4" />
                        <span>{internship.stipend}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{internship.description}</p>
                    <div className="flex items-center space-x-2 mb-4">
                      <Badge variant="secondary">{internship.domain}</Badge>
                      <Badge variant="outline">{internship.type}</Badge>
                      <Badge variant="outline">{internship.applications} applications</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Posted {internship.postedDate}</span>
                  {user?.userType === 'student' && (
                    <Button onClick={() => handleApply(internship)} className="flex items-center space-x-2">
                      <Send className="h-4 w-4" />
                      <span>Apply Now</span>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredInternships.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No internships found matching your criteria.</p>
            <Button onClick={clearAllFilters} className="mt-4">
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Application Dialog */}
        <Dialog open={!!selectedInternship} onOpenChange={() => setSelectedInternship(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Apply for {selectedInternship?.title}</DialogTitle>
              <DialogDescription>
                Submit your application to {selectedInternship?.company}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Position Details</h4>
                <p className="text-sm text-gray-600 mb-2">{selectedInternship?.description}</p>
                <p className="text-sm"><strong>Requirements:</strong> {selectedInternship?.requirements}</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="application">Cover Letter</Label>
                <Textarea
                  id="application"
                  placeholder="Write a compelling cover letter explaining why you're perfect for this role..."
                  value={applicationText}
                  onChange={(e) => setApplicationText(e.target.value)}
                  rows={6}
                />
              </div>
              
              <div className="flex justify-end space-x-4 pt-4">
                <Button variant="outline" onClick={() => setSelectedInternship(null)}>
                  Cancel
                </Button>
                <Button onClick={submitApplication} className="flex items-center space-x-2">
                  <Send className="h-4 w-4" />
                  <span>Submit Application</span>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Internships;
