
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Bell, MessageSquare, User, Briefcase, Home, LogOut, GraduationCap, Award } from 'lucide-react';

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  if (!user) return null;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-[#0A66C2]">
              InternConnect
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to={user.userType === 'student' ? '/student-dashboard' : '/company-dashboard'}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/student-dashboard') || isActive('/company-dashboard')
                    ? 'text-[#0A66C2] bg-[#F3F6F8]'
                    : 'text-gray-700 hover:text-[#0A66C2] hover:bg-gray-50'
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              
              <Link
                to="/profile"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/profile')
                    ? 'text-[#0A66C2] bg-[#F3F6F8]'
                    : 'text-gray-700 hover:text-[#0A66C2] hover:bg-gray-50'
                }`}
              >
                <User className="h-4 w-4" />
                <span>My Profile</span>
              </Link>
              
              {user.userType === 'student' && (
                <>
                  <Link
                    to="/internships"
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/internships')
                        ? 'text-[#0A66C2] bg-[#F3F6F8]'
                        : 'text-gray-700 hover:text-[#0A66C2] hover:bg-gray-50'
                    }`}
                  >
                    <Briefcase className="h-4 w-4" />
                    <span>Internships</span>
                  </Link>
                  
                  <Link
                    to="/free-courses"
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/free-courses')
                        ? 'text-[#0A66C2] bg-[#F3F6F8]'
                        : 'text-gray-700 hover:text-[#0A66C2] hover:bg-gray-50'
                    }`}
                  >
                    <GraduationCap className="h-4 w-4" />
                    <span>Free Courses</span>
                  </Link>
                  
                  <Link
                    to="/my-certificates"
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/my-certificates')
                        ? 'text-[#0A66C2] bg-[#F3F6F8]'
                        : 'text-gray-700 hover:text-[#0A66C2] hover:bg-gray-50'
                    }`}
                  >
                    <Award className="h-4 w-4" />
                    <span>Certificates</span>
                  </Link>
                </>
              )}
              
              <Link
                to="/messages"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/messages')
                    ? 'text-[#0A66C2] bg-[#F3F6F8]'
                    : 'text-gray-700 hover:text-[#0A66C2] hover:bg-gray-50'
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                <span>Messages</span>
              </Link>
              
              <Link
                to="/notifications"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/notifications')
                    ? 'text-[#0A66C2] bg-[#F3F6F8]'
                    : 'text-gray-700 hover:text-[#0A66C2] hover:bg-gray-50'
                }`}
              >
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">Welcome, {user.name}</span>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="flex items-center space-x-1 border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
