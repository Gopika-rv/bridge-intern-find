
import { useState } from 'react';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Clock, Users, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FreeInternships = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [domainFilter, setDomainFilter] = useState('');

  // Mock free internships data
  const freeInternships = [
    {
      id: 1,
      title: 'Content Writing Intern',
      company: 'BlogCorp',
      location: 'Remote',
      duration: '3 months',
      domain: 'Content',
      description: 'Create engaging blog posts and articles for various clients',
      requirements: 'Excellent writing skills, creativity, basic SEO knowledge',
      posted: '1 day ago',
      applicants: 23,
      benefits: 'Certificate, Portfolio building, Mentorship',
    },
    {
      id: 2,
      title: 'Social Media Intern',
      company: 'StartupXYZ',
      location: 'Pune, Maharashtra',
      duration: '4 months',
      domain: 'Marketing',
      description: 'Manage social media accounts and create engaging content',
      requirements: 'Social media knowledge, creative thinking',
      posted: '3 days ago',
      applicants: 18,
      benefits: 'Certificate, Experience letter, Networking',
    },
    {
      id: 3,
      title: 'UI/UX Design Intern',
      company: 'Design Hub',
      location: 'Chennai, Tamil Nadu',
      duration: '6 months',
      domain: 'Design',
      description: 'Work on user interface designs for mobile and web applications',
      requirements: 'Figma, Adobe XD, basic design principles',
      posted: '1 week ago',
      applicants: 41,
      benefits: 'Certificate, Portfolio projects, Mentorship',
    },
    {
      id: 4,
      title: 'Research Intern',
      company: 'Academic Institute',
      location: 'Kolkata, West Bengal',
      duration: '5 months',
      domain: 'Research',
      description: 'Assist in research projects and data collection',
      requirements: 'Research methodology, analytical skills',
      posted: '4 days ago',
      applicants: 15,
      benefits: 'Certificate, Research experience, Publications',
    },
  ];

  const filteredInternships = freeInternships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || internship.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesDomain = !domainFilter || internship.domain === domainFilter;
    
    return matchesSearch && matchesLocation && matchesDomain;
  });

  const handleApply = (internshipId: number, title: string) => {
    toast({
      title: "Application Submitted!",
      description: `Your application for ${title} has been submitted successfully.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Free Internships</h1>
          <p className="text-gray-600 mt-2">Gain valuable experience and skills without worrying about stipend</p>
        </div>

        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Search internships or companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Input
            placeholder="Filter by location..."
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
          <Select value={domainFilter} onValueChange={setDomainFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by domain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Domains</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Content">Content</SelectItem>
              <SelectItem value="Research">Research</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Internships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInternships.map((internship) => (
            <Card key={internship.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{internship.title}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <Building className="h-4 w-4 mr-1" />
                      {internship.company}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    Experience
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {internship.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {internship.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    {internship.applicants} applicants
                  </div>
                  
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {internship.description}
                  </p>
                  
                  <div className="space-y-2">
                    <Badge variant="outline">{internship.domain}</Badge>
                    <p className="text-xs text-green-600 font-medium">
                      Benefits: {internship.benefits}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4">
                    <span className="text-xs text-gray-500">{internship.posted}</span>
                    <Button 
                      onClick={() => handleApply(internship.id, internship.title)}
                      variant="outline"
                      className="border-blue-600 text-blue-600 hover:bg-blue-50"
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredInternships.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No free internships found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FreeInternships;
