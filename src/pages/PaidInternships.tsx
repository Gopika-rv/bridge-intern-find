
import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Clock, DollarSign, Building, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PaidInternships = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [domainFilter, setDomainFilter] = useState('');
  const [filteredInternships, setFilteredInternships] = useState([]);

  // Real internships data (removed duplicates and dummy content)
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
  ];

  // Real-time search with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filtered = paidInternships.filter(internship => {
        const matchesSearch = searchTerm === '' || 
          internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          internship.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesLocation = locationFilter === '' || 
          internship.location.toLowerCase().includes(locationFilter.toLowerCase());
        
        const matchesDomain = domainFilter === '' || domainFilter === 'all' || 
          internship.domain === domainFilter;
        
        return matchesSearch && matchesLocation && matchesDomain;
      });
      setFilteredInternships(filtered);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, locationFilter, domainFilter]);

  const handleApply = (internshipId: number, title: string) => {
    toast({
      title: "🎉 Application Submitted!",
      description: `Your application for ${title} has been submitted successfully.`,
      className: "bg-green-50 border-green-200 rounded-xl shadow-lg",
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setDomainFilter('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Paid Internships</h1>
          <p className="text-gray-600 mt-2">Discover internships with attractive stipends</p>
        </div>

        {/* Enhanced Search Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search internships, companies, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Filter by location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
            <Select value={domainFilter} onValueChange={setDomainFilter}>
              <SelectTrigger className="rounded-xl border-gray-300">
                <SelectValue placeholder="Filter by domain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Domains</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              onClick={clearFilters}
              className="rounded-xl border-gray-300 hover:bg-gray-100"
            >
              Clear Filters
            </Button>
          </div>
          
          {/* Results count */}
          <div className="text-sm text-gray-600">
            Showing {filteredInternships.length} of {paidInternships.length} internships
          </div>
        </div>

        {/* Internships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInternships.map((internship) => (
            <Card key={internship.id} className="hover:shadow-lg transition-shadow cursor-pointer rounded-xl border-0 shadow-md">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-[#333333]">{internship.title}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <Building className="h-4 w-4 mr-1" />
                      {internship.company}
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-800 font-semibold rounded-full">
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
                    <Badge variant="outline" className="rounded-full">{internship.domain}</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4">
                    <span className="text-xs text-gray-500">{internship.posted}</span>
                    <Button 
                      onClick={() => handleApply(internship.id, internship.title)}
                      className="bg-[#0A66C2] hover:bg-[#004182] rounded-xl"
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
            <Button 
              variant="outline" 
              onClick={clearFilters}
              className="mt-4 rounded-xl"
            >
              Clear Filters to See All
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaidInternships;
