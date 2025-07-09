import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const [userType, setUserType] = useState<'student' | 'company'>('student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    city: '',
    state: '',
    country: 'India',
    // Student specific
    university: '',
    degree: '',
    skills: '',
    portfolio: '',
    // Company specific
    companyName: '',
    description: '',
    website: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear validation errors when user starts typing
    setValidationErrors([]);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email: string) => {
    return email.endsWith('@gmail.com') && email.length > 10;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Custom validation
    const errors: string[] = [];
    
    if (!validatePhone(formData.phone)) {
      errors.push('Please enter a valid Indian mobile number (must start with 6, 7, 8, or 9 and be exactly 10 digits)');
    }
    
    if (!validateEmail(formData.email)) {
      errors.push('Email must be a valid Gmail address (@gmail.com)');
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.push('Passwords do not match');
    }

    if (userType === 'student') {
      if (!formData.university.trim()) {
        errors.push('University name is required');
      }
      if (!formData.degree.trim()) {
        errors.push('Degree is required');
      }
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      const success = await register(formData, userType);
      if (success) {
        toast({
          title: "🎉 Welcome to InternConnect!",
          description: `Your ${userType} account has been created successfully. Start exploring opportunities now!`,
          className: "bg-green-50 border-green-200 rounded-lg",
        });
        navigate(userType === 'student' ? '/student-dashboard' : '/company-dashboard');
      }
    } catch (error: any) {
      setValidationErrors([error.message]);
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F6F8] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-[#0A66C2]">
            InternConnect
          </Link>
          <p className="text-gray-600 mt-2">Create your account</p>
        </div>

        <Card className="shadow-lg border-0 rounded-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-[#0A66C2]">Get Started</CardTitle>
            <CardDescription>Join our community of students and companies</CardDescription>
          </CardHeader>
          <CardContent>
            {validationErrors.length > 0 && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <span className="text-red-500">⚠️</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Please fix these errors:</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <ul className="list-disc pl-5 space-y-1">
                        {validationErrors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <Tabs value={userType} onValueChange={(value) => setUserType(value as 'student' | 'company')}>
              <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-lg">
                <TabsTrigger value="student" className="data-[state=active]:bg-[#0A66C2] data-[state=active]:text-white rounded-lg">Student</TabsTrigger>
                <TabsTrigger value="company" className="data-[state=active]:bg-[#0A66C2] data-[state=active]:text-white rounded-lg">Company</TabsTrigger>
              </TabsList>
              
              <TabsContent value="student" className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2] rounded-lg"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email (Gmail only) *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="yourname@gmail.com"
                      className="border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2] rounded-lg"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="9876543210"
                      className="border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2] rounded-lg"
                      required
                    />
                    <p className="text-xs text-gray-500">Must start with 6, 7, 8, or 9 and be exactly 10 digits</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password (min 6 chars) *</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2] rounded-lg"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password *</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2] rounded-lg"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2] rounded-lg"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2] rounded-lg"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2] rounded-lg"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="university">University Name *</Label>
                    <Input
                      id="university"
                      name="university"
                      value={formData.university}
                      onChange={handleInputChange}
                      placeholder="e.g., Harvard University"
                      className="border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2] rounded-lg"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="degree">Degree Program *</Label>
                    <Input
                      id="degree"
                      name="degree"
                      value={formData.degree}
                      onChange={handleInputChange}
                      placeholder="e.g., Bachelor of Computer Science"
                      className="border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2] rounded-lg"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills *</Label>
                    <Textarea
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleInputChange}
                      placeholder="List your technical and soft skills"
                      className="border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2] rounded-lg"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="portfolio">Portfolio/LinkedIn URL (Optional)</Label>
                    <Input
                      id="portfolio"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      placeholder="https://your-portfolio.com"
                      className="border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2] rounded-lg"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-[#0A66C2] hover:bg-[#004182] rounded-lg" disabled={isLoading}>
                    {isLoading ? 'Creating Account...' : 'Create Student Account'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="company" className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2] rounded-lg"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email (Gmail only) *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="company@gmail.com"
                      className="border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2] rounded-lg"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="9876543210"
                      className="border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2] rounded-lg"
                      required
                    />
                    <p className="text-xs text-gray-500">Must start with 6, 7, 8, or 9 and be exactly 10 digits</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Strong Password *</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Min 8 chars, A-z, 0-9, !@#"
                        className="border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2] rounded-lg"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password *</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2] rounded-lg"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2] rounded-lg"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2] rounded-lg"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2] rounded-lg"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://company.com"
                      className="border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2] rounded-lg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Company Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Brief description of your company"
                      className="border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2] rounded-lg"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-[#0A66C2] hover:bg-[#004182] rounded-lg" disabled={isLoading}>
                    {isLoading ? 'Creating Account...' : 'Create Company Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-[#0A66C2] hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
