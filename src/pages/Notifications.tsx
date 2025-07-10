
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Briefcase, MessageSquare, User, Calendar, CheckCircle, Trash2 } from 'lucide-react';
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
      priority: 'high',
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
      priority: 'high',
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
      priority: 'medium',
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
      priority: 'low',
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
      priority: 'medium',
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
      title: "✅ All notifications marked as read",
      description: "Your notifications have been updated successfully.",
      className: "bg-green-50 border-green-200 rounded-xl shadow-lg",
    });
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    toast({
      title: "🗑️ Notification deleted",
      description: "The notification has been removed.",
      className: "bg-red-50 border-red-200 rounded-xl shadow-lg",
    });
  };

  const getNotificationsByType = (type: string) => {
    return notifications.filter(notification => notification.type === type);
  };

  const handleNotificationAction = (notification: any) => {
    switch (notification.type) {
      case 'message':
        toast({
          title: "💬 Opening Messages",
          description: "Redirecting to your messages...",
          className: "bg-blue-50 border-blue-200 rounded-xl shadow-lg",
        });
        break;
      case 'interview':
        toast({
          title: "📅 Interview Details",
          description: "Check your email for interview details.",
          className: "bg-green-50 border-green-200 rounded-xl shadow-lg",
        });
        break;
      case 'application':
        if (user?.userType === 'company') {
          toast({
            title: "👤 Viewing Application",
            description: "Opening applicant profile...",
            className: "bg-blue-50 border-blue-200 rounded-xl shadow-lg",
          });
        } else {
          toast({
            title: "📋 Application Details",
            description: "Check application status in your dashboard.",
            className: "bg-green-50 border-green-200 rounded-xl shadow-lg",
          });
        }
        break;
      default:
        break;
    }
    markAsRead(notification.id);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-blue-500 bg-blue-50';
    }
  };

  const NotificationItem = ({ notification }: { notification: any }) => {
    const IconComponent = notification.icon;
    
    return (
      <Card className={`cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 rounded-xl ${
        !notification.isRead 
          ? `border-l-4 ${getPriorityColor(notification.priority)}` 
          : 'bg-white hover:bg-gray-50'
      }`}>
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-full transition-colors ${
              !notification.isRead ? 'bg-white shadow-md' : 'bg-gray-100'
            }`}>
              <IconComponent className={`h-5 w-5 ${
                !notification.isRead ? 'text-[#0A66C2]' : 'text-gray-600'
              }`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-semibold text-gray-900">{notification.title}</h4>
                <div className="flex items-center space-x-3">
                  {!notification.isRead && (
                    <Badge className="bg-[#0A66C2] text-white text-xs px-2 py-1 rounded-full animate-pulse">
                      New
                    </Badge>
                  )}
                  <span className="text-sm text-gray-500">{notification.timestamp}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notification.id);
                    }}
                    className="h-8 w-8 p-0 rounded-full hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">{notification.message}</p>
              <div className="flex justify-between items-center">
                <div className="flex space-x-3">
                  {!notification.isRead && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(notification.id);
                      }}
                      className="rounded-xl border-gray-300 hover:border-[#0A66C2] hover:text-[#0A66C2]"
                    >
                      Mark as Read
                    </Button>
                  )}
                  {notification.actionable && (
                    <Button
                      size="sm"
                      onClick={() => handleNotificationAction(notification)}
                      className="bg-[#0A66C2] hover:bg-[#004182] text-white rounded-xl shadow-md hover:shadow-lg transition-all"
                    >
                      {notification.type === 'message' ? '💬 Reply' : 
                       notification.type === 'interview' ? '📅 View Details' : 
                       notification.type === 'application' && user?.userType === 'company' ? '👤 View Application' : '📋 View'}
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
    <div className="min-h-screen bg-[#F3F6F8]">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#333333] mb-2">Notifications</h1>
            <p className="text-gray-600 text-lg">
              Stay updated with your activity 
              {unreadCount > 0 && (
                <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                  {unreadCount} unread
                </span>
              )}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button 
              onClick={markAllAsRead} 
              variant="outline"
              className="rounded-xl border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all"
            >
              ✅ Mark All as Read
            </Button>
          )}
        </div>

        <Tabs defaultValue="all" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 rounded-xl bg-white shadow-sm">
            <TabsTrigger value="all" className="flex items-center space-x-2 rounded-xl">
              <Bell className="h-4 w-4" />
              <span>All</span>
              {unreadCount > 0 && (
                <Badge className="ml-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="application" className="flex items-center space-x-2 rounded-xl">
              <Briefcase className="h-4 w-4" />
              <span>Applications</span>
            </TabsTrigger>
            <TabsTrigger value="interview" className="flex items-center space-x-2 rounded-xl">
              <Calendar className="h-4 w-4" />
              <span>Interviews</span>
            </TabsTrigger>
            <TabsTrigger value="message" className="flex items-center space-x-2 rounded-xl">
              <MessageSquare className="h-4 w-4" />
              <span>Messages</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2 rounded-xl">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="space-y-6">
              {notifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="application" className="space-y-6">
            <div className="space-y-6">
              {getNotificationsByType('application').map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="interview" className="space-y-6">
            <div className="space-y-6">
              {getNotificationsByType('interview').map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="message" className="space-y-6">
            <div className="space-y-6">
              {getNotificationsByType('message').map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="space-y-6">
              {getNotificationsByType('profile').map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {notifications.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white rounded-xl p-12 shadow-md">
              <Bell className="h-16 w-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-medium text-gray-900 mb-4">No notifications</h3>
              <p className="text-gray-500 text-lg">You're all caught up! Check back later for updates.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
