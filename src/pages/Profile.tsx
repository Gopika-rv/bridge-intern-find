
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Edit, Save, X } from 'lucide-react';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.profile?.phone || '',
    education: user?.profile?.education || '',
    skills: user?.profile?.skills || '',
    portfolio: user?.profile?.portfolio || '',
    companyName: user?.profile?.companyName || '',
    description: user?.profile?.description || '',
    website: user?.profile?.website || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
    toast({
      title: "Profile Updated!",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.profile?.phone || '',
      education: user?.profile?.education || '',
      skills: user?.profile?.skills || '',
      portfolio: user?.profile?.portfolio || '',
      companyName: user?.profile?.companyName || '',
      description: user?.profile?.description || '',
      website: user?.profile?.website || '',
    });
    setIsEditing(false);
  };

  const skillsArray = formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="flex items-center space-x-2">
              <Edit className="h-4 w-4" />
              <span>Edit Profile</span>
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button onClick={handleSave} className="flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>Save</span>
              </Button>
              <Button onClick={handleCancel} variant="outline" className="flex items-center space-x-2">
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </Button>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Header */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-6">
                  <Avatar className="h-24 w-24">
                    <AvatarFallback className="text-2xl">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">{user?.name}</h2>
                    <p className="text-gray-600">{user?.email}</p>
                    <Badge className="mt-2" variant={user?.userType === 'student' ? 'default' : 'secondary'}>
                      {user?.userType === 'student' ? 'Student' : 'Company'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Profile Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  {isEditing ? 'Edit your profile information' : 'Your profile information'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-sm text-gray-900">{formData.name || 'Not provided'}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <p className="text-sm text-gray-900">{formData.email}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-sm text-gray-900">{formData.phone || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {user?.userType === 'student' ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="education">Education</Label>
                      {isEditing ? (
                        <Input
                          id="education"
                          name="education"
                          value={formData.education}
                          onChange={handleInputChange}
                          placeholder="University, Degree, Year"
                        />
                      ) : (
                        <p className="text-sm text-gray-900">{formData.education || 'Not provided'}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="skills">Skills</Label>
                      {isEditing ? (
                        <Textarea
                          id="skills"
                          name="skills"
                          value={formData.skills}
                          onChange={handleInputChange}
                          placeholder="Enter skills separated by commas"
                          rows={3}
                        />
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {skillsArray.length > 0 ? skillsArray.map((skill, index) => (
                            <Badge key={index} variant="secondary">{skill}</Badge>
                          )) : (
                            <p className="text-sm text-gray-500">No skills added</p>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="portfolio">Portfolio Link</Label>
                      {isEditing ? (
                        <Input
                          id="portfolio"
                          name="portfolio"
                          value={formData.portfolio}
                          onChange={handleInputChange}
                          placeholder="https://your-portfolio.com"
                        />
                      ) : (
                        <p className="text-sm text-gray-900">
                          {formData.portfolio ? (
                            <a href={formData.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              {formData.portfolio}
                            </a>
                          ) : (
                            'Not provided'
                          )}
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      {isEditing ? (
                        <Input
                          id="companyName"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="text-sm text-gray-900">{formData.companyName || 'Not provided'}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="website">Company Website</Label>
                      {isEditing ? (
                        <Input
                          id="website"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          placeholder="https://company.com"
                        />
                      ) : (
                        <p className="text-sm text-gray-900">
                          {formData.website ? (
                            <a href={formData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              {formData.website}
                            </a>
                          ) : (
                            'Not provided'
                          )}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Company Description</Label>
                      {isEditing ? (
                        <Textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Brief description of your company"
                          rows={4}
                        />
                      ) : (
                        <p className="text-sm text-gray-900">{formData.description || 'Not provided'}</p>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Profile Stats */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Profile Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {user?.userType === 'student' ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Profile Views</span>
                      <span className="text-sm font-medium">24</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Applications Sent</span>
                      <span className="text-sm font-medium">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Interview Invites</span>
                      <span className="text-sm font-medium">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Profile Completion</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Active Postings</span>
                      <span className="text-sm font-medium">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Applications</span>
                      <span className="text-sm font-medium">47</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Interviews Scheduled</span>
                      <span className="text-sm font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Hires Made</span>
                      <span className="text-sm font-medium">3</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
