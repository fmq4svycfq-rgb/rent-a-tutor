import { useState } from 'react';
import { GraduationCap, Zap, Calendar, MessageSquare, Wallet, LogOut, Book, Video, Star } from 'lucide-react';
import { User } from '../App';

interface StudentDashboardProps {
  user: User;
  onLogout: () => void;
  onNavigate: (page: string) => void;
  onStartSession: (sessionData: any) => void;
}

const SUBJECTS = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology',
  'Arabic', 'English', 'French', 'History',
  'Geography', 'Computer Science', 'Economics'
];

const RECENT_SESSIONS = [
  { id: 1, tutor: 'Dr. Rami Nassar', subject: 'Mathematics', duration: 30, rating: 5, date: '2 days ago' },
  { id: 2, tutor: 'Lina Karam', subject: 'Physics', duration: 20, rating: 4.5, date: '5 days ago' },
  { id: 3, tutor: 'Ahmad Hassan', subject: 'Chemistry', duration: 10, rating: 5, date: '1 week ago' },
];

export function StudentDashboard({ user, onLogout, onNavigate, onStartSession }: StudentDashboardProps) {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [sessionDuration, setSessionDuration] = useState(10);
  const [showInstantRequest, setShowInstantRequest] = useState(false);

  const handleInstantRequest = () => {
    if (!selectedSubject) {
      alert('Please select a subject first');
      return;
    }
    
    // Simulate matching with a tutor
    const mockTutor = {
      id: '2',
      name: 'Ahmad Hassan',
      subject: selectedSubject,
      rating: 4.8,
      duration: sessionDuration,
      price: sessionDuration === 10 ? 1.50 : sessionDuration === 20 ? 2.50 : 3.50
    };
    
    onStartSession(mockTutor);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-blue-500" />
            <span className="text-blue-900">Rent a Tutor</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
              <Wallet className="w-5 h-5 text-blue-500" />
              <span className="text-blue-900">${user.balance?.toFixed(2)}</span>
            </div>
            <span className="text-blue-700">{user.name}</span>
            <button 
              onClick={onLogout}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-blue-900 mb-8">Welcome back, {user.name.split(' ')[0]}!</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Instant Help Card */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-8 h-8" />
                <h2>Get Instant Help</h2>
              </div>
              <p className="text-blue-100 mb-6">
                Connect with an available tutor right now. No waiting, no booking needed.
              </p>
              
              {!showInstantRequest ? (
                <button 
                  onClick={() => setShowInstantRequest(true)}
                  className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition"
                >
                  Help Me Now
                </button>
              ) : (
                <div className="space-y-4 bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div>
                    <label className="block text-sm mb-2">Select Subject</label>
                    <select 
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-white text-blue-900"
                    >
                      <option value="">Choose a subject...</option>
                      {SUBJECTS.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-2">Session Duration</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { duration: 10, price: 1.50 },
                        { duration: 20, price: 2.50 },
                        { duration: 30, price: 3.50 }
                      ].map(({ duration, price }) => (
                        <button
                          key={duration}
                          onClick={() => setSessionDuration(duration)}
                          className={`p-3 rounded-lg transition ${
                            sessionDuration === duration
                              ? 'bg-white text-blue-600'
                              : 'bg-white/20 hover:bg-white/30'
                          }`}
                        >
                          <div>{duration} min</div>
                          <div className="text-sm">${price}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={handleInstantRequest}
                      className="flex-1 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition"
                    >
                      Find Tutor Now
                    </button>
                    <button 
                      onClick={() => setShowInstantRequest(false)}
                      className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-4">
              <button 
                onClick={() => onNavigate('booking')}
                className="bg-white rounded-xl p-6 text-left hover:shadow-lg transition"
              >
                <Calendar className="w-8 h-8 text-blue-500 mb-3" />
                <h3 className="text-blue-900 mb-2">Book a Session</h3>
                <p className="text-blue-600 text-sm">
                  Schedule a 30 or 60-minute session with your preferred tutor
                </p>
              </button>
              
              <button 
                onClick={() => onNavigate('forum')}
                className="bg-white rounded-xl p-6 text-left hover:shadow-lg transition"
              >
                <MessageSquare className="w-8 h-8 text-blue-500 mb-3" />
                <h3 className="text-blue-900 mb-2">Q&A Forum</h3>
                <p className="text-blue-600 text-sm">
                  Ask questions and get free answers from tutors and peers
                </p>
              </button>
            </div>

            {/* Recent Sessions */}
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Video className="w-6 h-6 text-blue-500" />
                <h2 className="text-blue-900">Recent Sessions</h2>
              </div>
              
              <div className="space-y-4">
                {RECENT_SESSIONS.map(session => (
                  <div key={session.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-blue-900">{session.tutor}</span>
                        <span className="text-blue-400">•</span>
                        <span className="text-blue-600">{session.subject}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-blue-600">
                        <span>{session.duration} minutes</span>
                        <span>{session.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-blue-900">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{session.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Wallet */}
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Wallet className="w-6 h-6 text-blue-500" />
                <h3 className="text-blue-900">Wallet</h3>
              </div>
              <div className="text-blue-900 mb-4">
                ${user.balance?.toFixed(2)}
              </div>
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                Add Funds
              </button>
            </div>

            {/* Study Progress */}
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Book className="w-6 h-6 text-blue-500" />
                <h3 className="text-blue-900">This Month</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-600">Sessions</span>
                  <span className="text-blue-900">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-600">Hours</span>
                  <span className="text-blue-900">5.5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-600">Subjects</span>
                  <span className="text-blue-900">4</span>
                </div>
              </div>
            </div>

            {/* Top Subjects */}
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-blue-900 mb-4">Your Top Subjects</h3>
              <div className="space-y-2">
                {['Mathematics', 'Physics', 'Chemistry'].map((subject, index) => (
                  <div key={subject} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm">
                      {index + 1}
                    </div>
                    <span className="text-blue-700">{subject}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
