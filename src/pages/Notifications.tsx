
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Briefcase, MessageSquare, User, Calendar, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Notifications = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'application',
      title: 'New Application Received',
      message: user?.userType === 'student' 
        ? 'Your application for Frontend Developer Intern at TechStart Inc. has been received'
        : 'John Doe applied for Frontend Developer Intern position',
      timestamp: '2 hours ago',
      isRead: false,
      icon: Briefcase,
      actionable: user?.userType === 'company',
    },
    {
      id: 2,
      type: 'interview',
      title: 'Interview Scheduled',
      message: user?.userType === 'student'
        ? 'Interview scheduled for tomorrow at 2:00 PM with Analytics Pro'
        : 'Interview scheduled with Sarah Wilson for tomorrow at 2:00 PM',
      timestamp: '4 hours ago',
      isRead: false,
      icon: Calendar,
      actionable: true,
    },
    {
      id: 3,
      type: 'message',
      title: 'New Message',
      message: user?.userType === 'student'
        ? 'Message from Creative Studio - Design Lead'
        : 'Message from Mike Johnson',
      timestamp: '1 day ago',
      isRead: true,
      icon: MessageSquare,
      actionable: true,
    },
    {
      id: 4,
      type: 'profile',
      title: 'Profile Viewed',
      message: user?.userType === 'student'
        ? 'Your profile was viewed by Microsoft Recruiter'
        : 'Your company profile was viewed by 5 students',
      timestamp: '1 day ago',
      isRead: true,
      icon: User,
      actionable: false,
    },
    {
      id: 5,
      type: 'application',
      title: user?.userType === 'student' ? 'Application Status Update' : 'Application Shortlisted',
      message: user?.userType === 'student'
        ? 'Your application for Data Science Intern has been shortlisted'
        : 'You shortlisted Emily Davis for Data Science Intern position',
      timestamp: '2 days ago',
      isRead: true,
      icon: CheckCircle,
      actionable: user?.userType === 'student',
    },
    {
      id: 6,
      type: 'interview',
      title: 'Interview Invite',
      message: user?.userType === 'student'
        ? 'You have been invited for an interview at StartupXYZ'
        : 'You sent an interview invite to Alex Chen',
      timestamp: '3 days ago',
      isRead: true,
      icon: Calendar,
      actionable: user?.userType === 'student',
    },
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
    toast({
      title: "All notifications marked as read",
      description: "Your notifications have been updated.",
    });
  };

  const getNotificationsByType = (type: string) => {
    return notifications.filter(notification => notification.type === type);
  };

  const handleNotificationAction = (notification: any) => {
    switch (notification.type) {
      case 'message':
        // Navigate to messages
        toast({
          title: "Opening Messages",
          description: "Redirecting to your messages...",
        });
        break;
      case 'interview':
        toast({
          title: "Interview Details",
          description: "Check your email for interview details.",
        });
        break;
      case 'application':
        if (user?.userType === 'company') {
          toast({
            title: "Viewing Application",
            description: "Opening applicant profile...",
          });
        } else {
          toast({
            title: "Application Details",
            description: "Check application status in your dashboard.",
          });
        }
        break;
      default:
        break;
    }
    markAsRead(notification.id);
  };

  const NotificationItem = ({ notification }: { notification: any }) => {
    const IconComponent = notification.icon;
    
    return (
      <Card className={`cursor-pointer transition-all hover:shadow-md ${!notification.isRead ? 'border-l-4 border-l-blue-500 bg-blue-50' : ''}`}>
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-full ${!notification.isRead ? 'bg-blue-100' : 'bg-gray-100'}`}>
              <IconComponent className={`h-4 w-4 ${!notification.isRead ? 'text-blue-600' : 'text-gray-600'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                <div className="flex items-center space-x-2">
                  {!notification.isRead && <Badge className="bg-blue-600 text-xs">New</Badge>}
                  <span className="text-xs text-gray-500">{notification.timestamp}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  {!notification.isRead && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(notification.id);
                      }}
                    >
                      Mark as Read
                    </Button>
                  )}
                  {notification.actionable && (
                    <Button
                      size="sm"
                      onClick={() => handleNotificationAction(notification)}
                    >
                      {notification.type === 'message' ? 'Reply' : 
                       notification.type === 'interview' ? 'View Details' : 
                       notification.type === 'application' && user?.userType === 'company' ? 'View Application' : 'View'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600 mt-2">
              Stay updated with your activity {unreadCount > 0 && `(${unreadCount} unread)`}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button onClick={markAllAsRead} variant="outline">
              Mark All as Read
            </Button>
          )}
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all" className="flex items-center space-x-1">
              <Bell className="h-4 w-4" />
              <span>All</span>
              {unreadCount > 0 && <Badge className="ml-1 bg-red-500 text-xs">{unreadCount}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="application" className="flex items-center space-x-1">
              <Briefcase className="h-4 w-4" />
              <span>Applications</span>
            </TabsTrigger>
            <TabsTrigger value="interview" className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Interviews</span>
            </TabsTrigger>
            <TabsTrigger value="message" className="flex items-center space-x-1">
              <MessageSquare className="h-4 w-4" />
              <span>Messages</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="space-y-4">
              {notifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="application" className="space-y-4">
            <div className="space-y-4">
              {getNotificationsByType('application').map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="interview" className="space-y-4">
            <div className="space-y-4">
              {getNotificationsByType('interview').map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="message" className="space-y-4">
            <div className="space-y-4">
              {getNotificationsByType('message').map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <div className="space-y-4">
              {getNotificationsByType('profile').map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {notifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-500">You're all caught up! Check back later for updates.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
