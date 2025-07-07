
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Send, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Messages = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock conversations data
  const conversations = [
    {
      id: 1,
      name: user?.userType === 'student' ? 'TechStart Inc. - HR Team' : 'John Doe',
      lastMessage: 'Thank you for your application. We would like to schedule an interview.',
      timestamp: '2 hours ago',
      unread: 2,
      isOnline: true,
      avatar: user?.userType === 'student' ? 'T' : 'J',
      messages: [
        {
          id: 1,
          sender: user?.userType === 'student' ? 'TechStart Inc.' : 'John Doe',
          content: 'Hello! Thank you for applying to our Frontend Developer Intern position.',
          timestamp: '10:30 AM',
          isOwn: false,
        },
        {
          id: 2,
          sender: user?.name,
          content: 'Thank you for considering my application. I\'m very excited about this opportunity.',
          timestamp: '10:45 AM',
          isOwn: true,
        },
        {
          id: 3,
          sender: user?.userType === 'student' ? 'TechStart Inc.' : 'John Doe',
          content: 'Great! We would like to schedule an interview with you. Are you available this week?',
          timestamp: '2:15 PM',
          isOwn: false,
        },
      ],
    },
    {
      id: 2,
      name: user?.userType === 'student' ? 'Analytics Pro - Recruiter' : 'Sarah Wilson',
      lastMessage: 'Your technical skills look impressive. Let\'s discuss the role further.',
      timestamp: '1 day ago',
      unread: 0,
      isOnline: false,
      avatar: user?.userType === 'student' ? 'A' : 'S',
      messages: [
        {
          id: 1,
          sender: user?.userType === 'student' ? 'Analytics Pro' : 'Sarah Wilson',
          content: 'Hi! I reviewed your profile and I\'m impressed by your data science background.',
          timestamp: 'Yesterday 3:20 PM',
          isOwn: false,
        },
        {
          id: 2,
          sender: user?.name,
          content: 'Thank you! I\'m passionate about data science and would love to contribute to your team.',
          timestamp: 'Yesterday 4:05 PM',
          isOwn: true,
        },
        {
          id: 3,
          sender: user?.userType === 'student' ? 'Analytics Pro' : 'Sarah Wilson',
          content: 'Your technical skills look impressive. Let\'s discuss the role further.',
          timestamp: 'Yesterday 4:30 PM',
          isOwn: false,
        },
      ],
    },
    {
      id: 3,
      name: user?.userType === 'student' ? 'Creative Studio - Design Lead' : 'Mike Johnson',
      lastMessage: 'Could you share your design portfolio with us?',
      timestamp: '2 days ago',
      unread: 1,
      isOnline: true,
      avatar: user?.userType === 'student' ? 'C' : 'M',
      messages: [
        {
          id: 1,
          sender: user?.userType === 'student' ? 'Creative Studio' : 'Mike Johnson',
          content: 'Hello! We loved your application for the UI/UX Design Intern position.',
          timestamp: '2 days ago 11:15 AM',
          isOwn: false,
        },
        {
          id: 2,
          sender: user?.userType === 'student' ? 'Creative Studio' : 'Mike Johnson',
          content: 'Could you share your design portfolio with us?',
          timestamp: '2 days ago 11:20 AM',
          isOwn: false,
        },
      ],
    },
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    // In a real app, this would send to database
    console.log('Sending message:', newMessage, 'to:', selectedConversation.name);
    
    // Add message to conversation (mock)
    const newMsg = {
      id: Date.now(),
      sender: user?.name || 'You',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    };
    
    selectedConversation.messages.push(newMsg);
    
    toast({
      title: "Message Sent!",
      description: `Your message has been sent to ${selectedConversation.name}`,
    });
    
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-2">Communicate with {user?.userType === 'student' ? 'companies' : 'candidates'}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 h-[600px]">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Conversations</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-4 cursor-pointer hover:bg-gray-50 border-b transition-colors ${
                        selectedConversation?.id === conversation.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                      }`}
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarFallback>{conversation.avatar}</AvatarFallback>
                          </Avatar>
                          {conversation.isOnline && (
                            <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {conversation.name}
                            </h4>
                            <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                        </div>
                        {conversation.unread > 0 && (
                          <Badge className="bg-blue-600">{conversation.unread}</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <CardHeader className="border-b">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarFallback>{selectedConversation.avatar}</AvatarFallback>
                        </Avatar>
                        {selectedConversation.isOnline && (
                          <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{selectedConversation.name}</h3>
                        <p className="text-sm text-gray-500">
                          {selectedConversation.isOnline ? 'Online' : 'Last seen ' + selectedConversation.timestamp}
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Messages */}
                  <CardContent className="flex-1 p-0">
                    <div className="h-96 overflow-y-auto p-4 space-y-4">
                      {selectedConversation.messages.map((message: any) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.isOwn
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${message.isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>

                  {/* Message Input */}
                  <div className="border-t p-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} className="flex items-center space-x-1">
                        <Send className="h-4 w-4" />
                        <span>Send</span>
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                    <p className="text-gray-500">Choose a conversation from the list to start messaging</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
