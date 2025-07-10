
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, User, Mail, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface InterviewSchedulerProps {
  applicant: {
    name: string;
    email: string;
    phone: string;
    skills: string;
  };
  internshipTitle: string;
  onClose: () => void;
}

const InterviewScheduler = ({ applicant, internshipTitle, onClose }: InterviewSchedulerProps) => {
  const { toast } = useToast();
  const [scheduleData, setScheduleData] = useState({
    date: '',
    time: '',
    duration: '30',
    interviewType: 'video',
    meetingLink: '',
    notes: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setScheduleData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleScheduleInterview = () => {
    if (!scheduleData.date || !scheduleData.time) {
      toast({
        title: "❌ Missing Information",
        description: "Please select both date and time for the interview.",
        className: "bg-red-50 border-red-200 rounded-xl shadow-lg",
      });
      return;
    }

    console.log('Interview scheduled:', {
      applicant,
      internshipTitle,
      ...scheduleData
    });

    toast({
      title: "📅 Interview Scheduled Successfully!",
      description: `Interview with ${applicant.name} scheduled for ${scheduleData.date} at ${scheduleData.time}. Invitation sent!`,
      className: "bg-green-50 border-green-200 rounded-xl shadow-lg",
    });

    onClose();
  };

  const generateMeetingLink = () => {
    const meetingId = Math.random().toString(36).substring(2, 10);
    setScheduleData(prev => ({
      ...prev,
      meetingLink: `https://meet.google.com/${meetingId}`
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
          <CardTitle className="text-[#0A66C2] flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Schedule Interview
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Applicant Info */}
          <div className="bg-gray-50 p-4 rounded-xl mb-6">
            <h3 className="font-semibold text-[#333333] mb-2 flex items-center gap-2">
              <User className="h-4 w-4" />
              Candidate Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Name:</span> {applicant.name}
              </div>
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {applicant.email}
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {applicant.phone}
              </div>
              <div>
                <span className="font-medium">Skills:</span> {applicant.skills}
              </div>
            </div>
            <div className="mt-2">
              <span className="font-medium">Position:</span> {internshipTitle}
            </div>
          </div>

          {/* Interview Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-[#333333] font-medium">Interview Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={scheduleData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time" className="text-[#333333] font-medium">Interview Time *</Label>
                <Input
                  id="time"
                  type="time"
                  value={scheduleData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-[#333333] font-medium">Duration (minutes)</Label>
                <Select value={scheduleData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                  <SelectTrigger className="rounded-xl border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="interviewType" className="text-[#333333] font-medium">Interview Type</Label>
                <Select value={scheduleData.interviewType} onValueChange={(value) => handleInputChange('interviewType', value)}>
                  <SelectTrigger className="rounded-xl border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video Call</SelectItem>
                    <SelectItem value="phone">Phone Call</SelectItem>
                    <SelectItem value="in-person">In-Person</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {scheduleData.interviewType === 'video' && (
              <div className="space-y-2">
                <Label htmlFor="meetingLink" className="text-[#333333] font-medium">Meeting Link</Label>
                <div className="flex gap-2">
                  <Input
                    id="meetingLink"
                    value={scheduleData.meetingLink}
                    onChange={(e) => handleInputChange('meetingLink', e.target.value)}
                    placeholder="https://meet.google.com/..."
                    className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={generateMeetingLink}
                    className="rounded-xl border-blue-300 text-blue-600 hover:bg-blue-50"
                  >
                    Generate
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-[#333333] font-medium">Additional Notes</Label>
              <Textarea
                id="notes"
                value={scheduleData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Any specific instructions or topics to cover..."
                rows={3}
                className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 mt-6 pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="rounded-xl border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleScheduleInterview}
              className="bg-[#0A66C2] hover:bg-[#004182] rounded-xl text-white"
            >
              <Clock className="h-4 w-4 mr-2" />
              Schedule Interview
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewScheduler;
