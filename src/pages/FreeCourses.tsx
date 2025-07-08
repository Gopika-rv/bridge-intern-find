
import { useState } from 'react';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Clock, Users, Award, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FreeCourses = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState<number[]>([]);
  const [completedCourses, setCompletedCourses] = useState<number[]>([]);

  // Mock courses data
  const freeCourses = [
    {
      id: 1,
      title: 'Introduction to Web Development',
      instructor: 'InternConnect Academy',
      duration: '4 weeks',
      category: 'Technology',
      description: 'Learn HTML, CSS, and basic JavaScript to build your first website',
      modules: 12,
      students: 1234,
      rating: 4.8,
      image: '/placeholder.svg',
      certificateAvailable: true,
    },
    {
      id: 2,
      title: 'Digital Marketing Fundamentals',
      instructor: 'Marketing Pro Institute',
      duration: '3 weeks',
      category: 'Marketing',
      description: 'Master the basics of digital marketing, SEO, and social media strategies',
      modules: 10,
      students: 892,
      rating: 4.6,
      image: '/placeholder.svg',
      certificateAvailable: true,
    },
    {
      id: 3,
      title: 'Data Analysis with Excel',
      instructor: 'Data Skills Academy',
      duration: '2 weeks',
      category: 'Analytics',
      description: 'Learn advanced Excel functions, pivot tables, and data visualization',
      modules: 8,
      students: 567,
      rating: 4.7,
      image: '/placeholder.svg',
      certificateAvailable: true,
    },
    {
      id: 4,
      title: 'Communication Skills for Professionals',
      instructor: 'Soft Skills Institute',
      duration: '3 weeks',
      category: 'Soft Skills',
      description: 'Improve your verbal and written communication skills',
      modules: 9,
      students: 743,
      rating: 4.5,
      image: '/placeholder.svg',
      certificateAvailable: true,
    },
  ];

  const filteredCourses = freeCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || course.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleEnroll = (courseId: number, title: string) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses([...enrolledCourses, courseId]);
      toast({
        title: "Enrolled Successfully!",
        description: `You have enrolled in ${title}. Start learning now!`,
      });
    }
  };

  const handleMarkComplete = (courseId: number, title: string) => {
    if (!completedCourses.includes(courseId)) {
      setCompletedCourses([...completedCourses, courseId]);
      toast({
        title: "Course Completed!",
        description: `Congratulations! Your certificate for ${title} is ready for download.`,
      });
    }
  };

  const handleDownloadCertificate = (courseTitle: string) => {
    // Simulate certificate download
    toast({
      title: "Certificate Downloaded!",
      description: `Your certificate for ${courseTitle} has been downloaded.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Free Courses</h1>
          <p className="text-gray-600 mt-2">Learn new skills and earn certificates - completely free!</p>
        </div>

        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Search courses or instructors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Analytics">Analytics</SelectItem>
              <SelectItem value="Soft Skills">Soft Skills</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-white" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <CardDescription>{course.instructor}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.students}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{course.category}</Badge>
                    <div className="flex items-center text-sm text-yellow-600">
                      ⭐ {course.rating}
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    {course.modules} modules • Certificate included
                  </div>
                  
                  <div className="pt-4 space-y-2">
                    {!enrolledCourses.includes(course.id) ? (
                      <Button 
                        onClick={() => handleEnroll(course.id, course.title)}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        Enroll Now - Free
                      </Button>
                    ) : !completedCourses.includes(course.id) ? (
                      <div className="space-y-2">
                        <Badge className="w-full justify-center bg-green-100 text-green-800">
                          Enrolled
                        </Badge>
                        <Button 
                          onClick={() => handleMarkComplete(course.id, course.title)}
                          variant="outline"
                          className="w-full"
                        >
                          Mark as Complete
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Badge className="w-full justify-center bg-blue-100 text-blue-800">
                          Completed
                        </Badge>
                        <Button 
                          onClick={() => handleDownloadCertificate(course.title)}
                          className="w-full flex items-center justify-center space-x-2"
                        >
                          <Download className="h-4 w-4" />
                          <span>Download Certificate</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No courses found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FreeCourses;
