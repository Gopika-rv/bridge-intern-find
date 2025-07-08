
import { useState } from 'react';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Clock, DollarSign, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PaidInternships = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [domainFilter, setDomainFilter] = useState('');

  // Mock paid internships data
  const paidInternships = [
    {
      id: 1,
      title: 'Software Developer Intern',
      company: 'TechCorp Solutions',
      location: 'Bangalore, Karnataka',
      duration: '6 months',
      stipend: '₹25,000/month',
      domain: 'Technology',
      description: 'Work on cutting-edge web applications using React and Node.js',
      requirements: 'Knowledge of JavaScript, React, HTML/CSS',
      posted: '2 days ago',
      applicants: 45,
    },
    {
      id: 2,
      title: 'Digital Marketing Intern',
      company: 'Creative Agency Ltd',
      location: 'Mumbai, Maharashtra',
      duration: '4 months',
      stipend: '₹18,000/month',
      domain: 'Marketing',
      description: 'Assist in social media campaigns and content creation',
      requirements: 'Basic understanding of digital marketing, creativity',
      posted: '1 week ago',
      applicants: 32,
    },
    {
      id: 3,
      title: 'Data Science Intern',
      company: 'Analytics Pro',
      location: 'Hyderabad, Telangana',
      duration: '5 months',
      stipend: '₹30,000/month',
      domain: 'Technology',
      description: 'Work with machine learning models and data analysis',
      requirements: 'Python, SQL, Machine Learning basics',
      posted: '3 days ago',
      applicants: 67,
    },
    {
      id: 4,
      title: 'Graphic Design Intern',
      company: 'Design Studio',
      location: 'Delhi, NCR',
      duration: '3 months',
      stipend: '₹15,000/month',
      domain: 'Design',
      description: 'Create visual content for brands and marketing materials',
      requirements: 'Adobe Creative Suite, portfolio required',
      posted: '5 days ago',
      applicants: 28,
    },
  ];

  const filteredInternships = paidInternships.filter(internship => {
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
          <h1 className="text-3xl font-bold text-gray-900">Paid Internships</h1>
          <p className="text-gray-600 mt-2">Discover internships with attractive stipends</p>
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
              <SelectItem value="Finance">Finance</SelectItem>
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
                  <Badge className="bg-green-100 text-green-800 font-semibold">
                    {internship.stipend}
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
                    <DollarSign className="h-4 w-4 mr-1" />
                    {internship.applicants} applicants
                  </div>
                  
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {internship.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline">{internship.domain}</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4">
                    <span className="text-xs text-gray-500">{internship.posted}</span>
                    <Button 
                      onClick={() => handleApply(internship.id, internship.title)}
                      className="bg-blue-600 hover:bg-blue-700"
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
            <p className="text-gray-500">No paid internships found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaidInternships;
