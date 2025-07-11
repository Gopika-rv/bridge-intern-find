import { useState } from 'react';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FreeInternships = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [domainFilter, setDomainFilter] = useState('');

  // Real free internships - empty by default, would come from database
  const freeInternships: any[] = [];

  const filteredInternships = freeInternships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || internship.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesDomain = !domainFilter || internship.domain === domainFilter;
    
    return matchesSearch && matchesLocation && matchesDomain;
  });

  const handleApply = (internshipId: number, title: string) => {
    toast({
      title: "🎉 Application Submitted!",
      description: `Your application for ${title} has been submitted successfully.`,
      className: "bg-green-50 border-green-200 rounded-xl shadow-lg",
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
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search internships, companies, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-xl border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2]"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Filter by location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="rounded-xl border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2]"
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
                <SelectItem value="Content">Content</SelectItem>
                <SelectItem value="Research">Research</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Empty State or Internships Grid */}
        {freeInternships.length === 0 ? (
          <div className="text-center py-16">
            <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Free Internships Available Yet</h3>
            <p className="text-gray-500 mb-6">Check back soon for new free internship opportunities with certificates</p>
            <Button className="bg-[#0A66C2] hover:bg-[#004182] rounded-xl">
              Browse Paid Internships
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInternships.map((internship) => (
              <Card key={internship.id} className="hover:shadow-lg transition-shadow cursor-pointer rounded-xl border-0 shadow-md">
                {/* Real internship content would be rendered here */}
              </Card>
            ))}
          </div>
        )}

        {filteredInternships.length === 0 && freeInternships.length > 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No free internships found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FreeInternships;
