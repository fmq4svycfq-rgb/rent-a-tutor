import { useState, useEffect } from 'react';
import { Video, Mic, MicOff, VideoOff, Phone, Upload, Pencil, MessageSquare, Star } from 'lucide-react';
import { User } from '../App';

interface InstantSessionProps {
  user: User;
  session: any;
  onEndSession: () => void;
}

export function InstantSession({ user, session, onEndSession }: InstantSessionProps) {
  const [timeRemaining, setTimeRemaining] = useState(session.duration * 60);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [messages, setMessages] = useState<any[]>([
    { sender: 'tutor', text: 'Hi! How can I help you today?', time: '00:00' }
  ]);
  const [messageInput, setMessageInput] = useState('');
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowRating(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    const currentTime = formatTime((session.duration * 60) - timeRemaining);
    setMessages([...messages, { sender: 'student', text: messageInput, time: currentTime }]);
    setMessageInput('');
    
    // Simulate tutor response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        sender: 'tutor', 
        text: 'Let me explain that concept...', 
        time: formatTime((session.duration * 60) - timeRemaining + 3)
      }]);
    }, 2000);
  };

  const handleEndSession = () => {
    setShowRating(true);
  };

  const handleSubmitRating = () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    alert('Thank you for your feedback!');
    onEndSession();
  };

  if (showRating) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-8 max-w-md w-full">
          <h2 className="text-blue-900 text-center mb-6">Rate Your Session</h2>
          
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-blue-900 text-2xl">{session.name.charAt(0)}</span>
            </div>
            <div className="text-blue-900 mb-1">{session.name}</div>
            <div className="text-blue-600 text-sm">{session.subject}</div>
          </div>

          <div className="mb-6">
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star 
                    className={`w-10 h-10 ${
                      star <= rating 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            
            <div className="space-y-2 mb-6">
              <label className="block text-blue-900 text-sm">Additional Feedback (Optional)</label>
              <textarea 
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                placeholder="How was your experience?"
              />
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-blue-700">Session Cost</span>
                <span className="text-blue-900">${session.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Duration</span>
                <span className="text-blue-900">{session.duration} minutes</span>
              </div>
            </div>

            <button 
              onClick={handleSubmitRating}
              className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Submit & Complete
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
            {session.name.charAt(0)}
          </div>
          <div>
            <div className="text-white">{session.name}</div>
            <div className="text-gray-400 text-sm">{session.subject}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-white text-xl">{formatTime(timeRemaining)}</div>
          <button 
            onClick={handleEndSession}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            End Session
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Area */}
        <div className="flex-1 flex flex-col">
          {/* Tutor Video (Main) */}
          <div className="flex-1 bg-gray-800 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl">
                  {session.name.charAt(0)}
                </div>
                <div className="text-white text-xl">{session.name}</div>
                <div className="text-gray-400">Tutor</div>
              </div>
            </div>

            {/* Student Video (Picture-in-Picture) */}
            <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-700 rounded-lg overflow-hidden border-2 border-gray-600">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-xl">
                    {user.name.charAt(0)}
                  </div>
                  <div className="text-white text-sm">You</div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-800 px-6 py-4 flex items-center justify-center gap-4">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-4 rounded-full transition ${
                isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {isMuted ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-white" />}
            </button>
            
            <button
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`p-4 rounded-full transition ${
                isVideoOff ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {isVideoOff ? <VideoOff className="w-6 h-6 text-white" /> : <Video className="w-6 h-6 text-white" />}
            </button>

            <button className="p-4 bg-gray-700 rounded-full hover:bg-gray-600 transition">
              <Upload className="w-6 h-6 text-white" />
            </button>

            <button className="p-4 bg-gray-700 rounded-full hover:bg-gray-600 transition">
              <Pencil className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Sidebar - Whiteboard & Chat */}
        <div className="w-96 bg-white flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button className="flex-1 px-4 py-3 text-blue-600 border-b-2 border-blue-600">
              <MessageSquare className="w-5 h-5 mx-auto mb-1" />
              <span className="text-sm">Chat</span>
            </button>
            <button className="flex-1 px-4 py-3 text-gray-600 hover:bg-gray-50">
              <Pencil className="w-5 h-5 mx-auto mb-1" />
              <span className="text-sm">Whiteboard</span>
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div 
                key={index}
                className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${
                  msg.sender === 'student' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-900'
                } rounded-lg px-4 py-2`}>
                  <div>{msg.text}</div>
                  <div className={`text-xs mt-1 ${
                    msg.sender === 'student' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button 
                onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Send
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              💡 Remember: This platform is for teaching, not completing homework
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
