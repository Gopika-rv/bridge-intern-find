import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Internships = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [domainFilter, setDomainFilter] = useState('');

  // Real internships - empty by default, would come from database
  const internships: any[] = [];

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || internship.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesDomain = !domainFilter || internship.domain === domainFilter;
    
    return matchesSearch && matchesLocation && matchesDomain;
  });

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
        <Card className="mb-8 rounded-xl border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search internships..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-xl border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2]"
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="pl-10 rounded-xl border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2]"
                />
              </div>
              
              <Select value={domainFilter} onValueChange={setDomainFilter}>
                <SelectTrigger className="rounded-xl border-gray-300">
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
              
              <Button onClick={clearAllFilters} variant="outline" className="rounded-xl border-gray-300 hover:bg-gray-100">
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

        {/* Empty State or Internships List */}
        {internships.length === 0 ? (
          <div className="text-center py-16">
            <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Internships Available Yet</h3>
            <p className="text-gray-500 mb-6">
              {user?.userType === 'company' 
                ? "Start by posting your first internship to attract talented students"
                : "Check back soon for new internship opportunities"
              }
            </p>
            {user?.userType === 'company' && (
              <Button className="bg-green-600 hover:bg-green-700 rounded-xl">
                Post Your First Internship
              </Button>
            )}
          </div>
        ) : filteredInternships.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No internships found matching your criteria.</p>
            <Button onClick={clearAllFilters} className="mt-4 bg-[#0A66C2] hover:bg-[#004182] rounded-xl">
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredInternships.map((internship) => (
              <Card key={internship.id} className="hover:shadow-lg transition-shadow rounded-xl border-0 shadow-md">
                {/* Real internship content would be rendered here */}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Internships;
