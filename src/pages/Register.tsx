
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
import { validateIndianPhone, validateGmail, validateUniversity, validateDegree, validateName, validatePassword, formatPhoneNumber, isValidPhoneInput } from '../utils/validation';

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
    university: '',
    degree: '',
    skills: '',
    portfolio: '',
    companyName: '',
    description: '',
    website: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateField = (fieldName: string, value: string) => {
    let error = '';
    
    switch (fieldName) {
      case 'name':
      case 'companyName':
        if (!validateName(value)) {
          error = userType === 'company' ? 'Company name must be at least 2 characters' : 'Name must be at least 2 characters';
        }
        break;
      case 'email':
        if (value && !validateGmail(value)) {
          error = 'Email must be a valid @gmail.com address';
        }
        break;
      case 'phone':
        const cleanPhone = value.replace(/\D/g, '');
        if (value && !isValidPhoneInput(value)) {
          error = 'Phone number must start with 6, 7, 8, or 9';
        } else if (cleanPhone.length > 0 && cleanPhone.length < 10) {
          error = 'Phone number must be exactly 10 digits';
        } else if (cleanPhone.length === 10 && !validateIndianPhone(cleanPhone)) {
          error = 'Invalid Indian phone number format';
        }
        break;
      case 'university':
        if (userType === 'student' && value && !validateUniversity(value)) {
          error = 'University name must be at least 3 characters';
        }
        break;
      case 'degree':
        if (userType === 'student' && value && !validateDegree(value)) {
          error = 'Degree must be at least 3 characters';
        }
        break;
      case 'password':
        if (value && !validatePassword(value, userType === 'company')) {
          error = userType === 'company' 
            ? 'Password must be at least 8 characters with uppercase, lowercase, number, and special character'
            : 'Password must be at least 6 characters';
        }
        break;
      case 'confirmPassword':
        if (value !== formData.password) {
          error = 'Passwords do not match';
        }
        break;
    }
    
    setFieldErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let { name, value } = e.target;
    
    // Format phone number input
    if (name === 'phone') {
      value = formatPhoneNumber(value);
    }
    
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Real-time validation
    validateField(name, value);
    
    // Clear general validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const errors: string[] = [];
    const requiredFields = userType === 'student' 
      ? ['name', 'email', 'phone', 'password', 'confirmPassword', 'city', 'state', 'university', 'degree', 'skills']
      : ['companyName', 'email', 'phone', 'password', 'confirmPassword', 'city', 'state', 'description'];
    
    // Check required fields
    requiredFields.forEach(field => {
      const value = formData[field as keyof typeof formData];
      if (!value || !value.toString().trim()) {
        errors.push(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
      }
    });
    
    // Specific validations
    if (!validateName(userType === 'company' ? formData.companyName : formData.name)) {
      errors.push(userType === 'company' ? 'Company name must be at least 2 characters' : 'Name must be at least 2 characters');
    }
    
    if (!validateGmail(formData.email)) {
      errors.push('Email must be a valid @gmail.com address');
    }
    
    if (!validateIndianPhone(formData.phone)) {
      errors.push('Phone must be a valid 10-digit Indian number starting with 6, 7, 8, or 9');
    }
    
    if (!validatePassword(formData.password, userType === 'company')) {
      errors.push(userType === 'company' 
        ? 'Password must be at least 8 characters with uppercase, lowercase, number, and special character'
        : 'Password must be at least 6 characters');
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.push('Passwords do not match');
    }

    if (userType === 'student') {
      if (!validateUniversity(formData.university)) {
        errors.push('University name must be at least 3 characters');
      }
      if (!validateDegree(formData.degree)) {
        errors.push('Degree must be at least 3 characters');
      }
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      toast({
        title: "⚠️ Validation Error",
        description: "Please fix the errors below before submitting.",
        variant: "destructive",
        className: "rounded-lg",
      });
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
        title: "❌ Registration Failed",
        description: error.message,
        variant: "destructive",
        className: "rounded-lg",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F6F8] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-[#0A66C2]">
            InternConnect
          </Link>
          <p className="text-gray-600 mt-2">Create your account and start your journey</p>
        </div>

        <Card className="shadow-lg border-0 rounded-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-[#0A66C2] text-2xl font-bold">Join InternConnect</CardTitle>
            <CardDescription>Choose your account type and get started</CardDescription>
          </CardHeader>
          <CardContent>
            {validationErrors.length > 0 && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <span className="text-red-500 text-xl">⚠️</span>
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
              <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-xl p-1">
                <TabsTrigger value="student" className="data-[state=active]:bg-[#0A66C2] data-[state=active]:text-white rounded-lg transition-all">
                  👨‍🎓 Student
                </TabsTrigger>
                <TabsTrigger value="company" className="data-[state=active]:bg-[#0A66C2] data-[state=active]:text-white rounded-lg transition-all">
                  🏢 Company
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="student" className="mt-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#333333] font-medium">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`rounded-xl border-2 transition-colors ${fieldErrors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-[#0A66C2]'} focus:ring-[#0A66C2]`}
                      placeholder="Enter your full name"
                      required
                    />
                    {fieldErrors.name && <p className="text-red-500 text-sm">{fieldErrors.name}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[#333333] font-medium">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="yourname@gmail.com"
                        className={`rounded-xl border-2 transition-colors ${fieldErrors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-[#0A66C2]'} focus:ring-[#0A66C2]`}
                        required
                      />
                      {fieldErrors.email && <p className="text-red-500 text-sm">{fieldErrors.email}</p>}
                      <p className="text-xs text-gray-500">Only Gmail addresses are accepted</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-[#333333] font-medium">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="9876543210"
                        maxLength={10}
                        className={`rounded-xl border-2 transition-colors ${fieldErrors.phone ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-[#0A66C2]'} focus:ring-[#0A66C2]`}
                        required
                      />
                      {fieldErrors.phone && <p className="text-red-500 text-sm">{fieldErrors.phone}</p>}
                      <p className="text-xs text-gray-500">Must start with 6, 7, 8, or 9 (10 digits)</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-[#333333] font-medium">Password *</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`rounded-xl border-2 transition-colors ${fieldErrors.password ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-[#0A66C2]'} focus:ring-[#0A66C2]`}
                        placeholder="Minimum 6 characters"
                        required
                      />
                      {fieldErrors.password && <p className="text-red-500 text-sm">{fieldErrors.password}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-[#333333] font-medium">Confirm Password *</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`rounded-xl border-2 transition-colors ${fieldErrors.confirmPassword ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-[#0A66C2]'} focus:ring-[#0A66C2]`}
                        placeholder="Repeat your password"
                        required
                      />
                      {fieldErrors.confirmPassword && <p className="text-red-500 text-sm">{fieldErrors.confirmPassword}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-[#333333] font-medium">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="rounded-xl border-2 border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2]"
                        placeholder="Your city"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-[#333333] font-medium">State *</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="rounded-xl border-2 border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2]"
                        placeholder="Your state"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country" className="text-[#333333] font-medium">Country *</Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="rounded-xl border-2 border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="university" className="text-[#333333] font-medium">University Name *</Label>
                      <Input
                        id="university"
                        name="university"
                        value={formData.university}
                        onChange={handleInputChange}
                        placeholder="e.g., Harvard University"
                        className={`rounded-xl border-2 transition-colors ${fieldErrors.university ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-[#0A66C2]'} focus:ring-[#0A66C2]`}
                        required
                      />
                      {fieldErrors.university && <p className="text-red-500 text-sm">{fieldErrors.university}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="degree" className="text-[#333333] font-medium">Degree Program *</Label>
                      <Input
                        id="degree"
                        name="degree"
                        value={formData.degree}
                        onChange={handleInputChange}
                        placeholder="e.g., Bachelor of Computer Science"
                        className={`rounded-xl border-2 transition-colors ${fieldErrors.degree ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-[#0A66C2]'} focus:ring-[#0A66C2]`}
                        required
                      />
                      {fieldErrors.degree && <p className="text-red-500 text-sm">{fieldErrors.degree}</p>}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="skills" className="text-[#333333] font-medium">Skills & Expertise *</Label>
                    <Textarea
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleInputChange}
                      placeholder="List your technical and soft skills (e.g., JavaScript, React, Communication, Leadership)"
                      className="rounded-xl border-2 border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2] min-h-[100px]"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="portfolio" className="text-[#333333] font-medium">Portfolio/LinkedIn URL</Label>
                    <Input
                      id="portfolio"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      placeholder="https://your-portfolio.com or LinkedIn profile"
                      className="rounded-xl border-2 border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2]"
                    />
                    <p className="text-xs text-gray-500">Optional but recommended</p>
                  </div>
                  
                  <Button type="submit" className="w-full bg-[#0A66C2] hover:bg-[#004182] rounded-xl py-3 text-lg font-semibold transition-colors" disabled={isLoading}>
                    {isLoading ? '🔄 Creating Account...' : '🚀 Create Student Account'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="company" className="mt-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-[#333333] font-medium">Company Name *</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className={`rounded-xl border-2 transition-colors ${fieldErrors.companyName ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-[#0A66C2]'} focus:ring-[#0A66C2]`}
                      placeholder="Enter your company name"
                      required
                    />
                    {fieldErrors.companyName && <p className="text-red-500 text-sm">{fieldErrors.companyName}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[#333333] font-medium">Company Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="company@gmail.com"
                        className={`rounded-xl border-2 transition-colors ${fieldErrors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-[#0A66C2]'} focus:ring-[#0A66C2]`}
                        required
                      />
                      {fieldErrors.email && <p className="text-red-500 text-sm">{fieldErrors.email}</p>}
                      <p className="text-xs text-gray-500">Only Gmail addresses are accepted</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-[#333333] font-medium">Contact Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="9876543210"
                        maxLength={10}
                        className={`rounded-xl border-2 transition-colors ${fieldErrors.phone ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-[#0A66C2]'} focus:ring-[#0A66C2]`}
                        required
                      />
                      {fieldErrors.phone && <p className="text-red-500 text-sm">{fieldErrors.phone}</p>}
                      <p className="text-xs text-gray-500">Must start with 6, 7, 8, or 9 (10 digits)</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-[#333333] font-medium">Strong Password *</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Min 8 chars, A-z, 0-9, !@#"
                        className={`rounded-xl border-2 transition-colors ${fieldErrors.password ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-[#0A66C2]'} focus:ring-[#0A66C2]`}
                        required
                      />
                      {fieldErrors.password && <p className="text-red-500 text-sm">{fieldErrors.password}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-[#333333] font-medium">Confirm Password *</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`rounded-xl border-2 transition-colors ${fieldErrors.confirmPassword ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-[#0A66C2]'} focus:ring-[#0A66C2]`}
                        placeholder="Repeat your password"
                        required
                      />
                      {fieldErrors.confirmPassword && <p className="text-red-500 text-sm">{fieldErrors.confirmPassword}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-[#333333] font-medium">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="rounded-xl border-2 border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2]"
                        placeholder="Company city"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-[#333333] font-medium">State *</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="rounded-xl border-2 border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2]"
                        placeholder="Company state"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country" className="text-[#333333] font-medium">Country *</Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="rounded-xl border-2 border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2]"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-[#333333] font-medium">Company Website</Label>
                    <Input
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://company.com"
                      className="rounded-xl border-2 border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2]"
                    />
                    <p className="text-xs text-gray-500">Optional</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-[#333333] font-medium">Company Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Tell us about your company, what you do, and what makes you unique..."
                      className="rounded-xl border-2 border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2] min-h-[120px]"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-[#0A66C2] hover:bg-[#004182] rounded-xl py-3 text-lg font-semibold transition-colors" disabled={isLoading}>
                    {isLoading ? '🔄 Creating Account...' : '🏢 Create Company Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-[#0A66C2] hover:underline font-medium transition-colors">
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
