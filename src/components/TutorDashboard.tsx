import { useState } from 'react';
import { GraduationCap, DollarSign, LogOut, Star, Clock, Users, TrendingUp, Calendar, Bell } from 'lucide-react';
import { User } from '../App';

interface TutorDashboardProps {
  user: User;
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

const INCOMING_REQUESTS = [
  { id: 1, student: 'Sarah K.', subject: 'English', duration: 20, price: 4.00, time: 'Just now' },
  { id: 2, student: 'Omar M.', subject: 'English', duration: 30, price: 6.00, time: '2 min ago' },
];

const UPCOMING_BOOKINGS = [
  { id: 1, student: 'Layla H.', subject: 'English', time: 'Today, 6:00 PM', duration: 60 },
  { id: 2, student: 'Karim S.', subject: 'English', time: 'Tomorrow, 2:00 PM', duration: 30 },
];

const RECENT_SESSIONS = [
  { id: 1, student: 'Sarah K.', subject: 'English', duration: 30, earned: 6.00, rating: 5, date: 'Today' },
  { id: 2, student: 'Rami N.', subject: 'English', duration: 20, earned: 4.00, rating: 5, date: 'Yesterday' },
  { id: 3, student: 'Maya L.', subject: 'English', duration: 60, earned: 20.00, rating: 4.5, date: '2 days ago' },
];

export function TutorDashboard({ user, onLogout, onNavigate }: TutorDashboardProps) {
  const [isOnline, setIsOnline] = useState(true);

  const handleAcceptRequest = (requestId: number) => {
    alert('Session accepted! Starting video call...');
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
            <div className="flex items-center gap-2">
              <span className="text-blue-700">Status:</span>
              <button
                onClick={() => setIsOnline(!isOnline)}
                className={`px-4 py-2 rounded-lg transition ${
                  isOnline 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {isOnline ? 'Online' : 'Offline'}
              </button>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
              <DollarSign className="w-5 h-5 text-blue-500" />
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-blue-900">Tutor Dashboard</h1>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="text-blue-900">{user.rating} Rating</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="text-sm">This Month</span>
                </div>
                <div className="text-blue-900 text-2xl">$142.30</div>
              </div>
              
              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <Users className="w-5 h-5" />
                  <span className="text-sm">Sessions</span>
                </div>
                <div className="text-blue-900 text-2xl">28</div>
              </div>
              
              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm">Hours</span>
                </div>
                <div className="text-blue-900 text-2xl">12.5</div>
              </div>
              
              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-sm">Rating</span>
                </div>
                <div className="text-blue-900 text-2xl">{user.rating}</div>
              </div>
            </div>

            {/* Incoming Requests */}
            {isOnline && INCOMING_REQUESTS.length > 0 && (
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <Bell className="w-6 h-6 animate-pulse" />
                  <h2>Incoming Requests</h2>
                </div>
                
                <div className="space-y-3">
                  {INCOMING_REQUESTS.map(request => (
                    <div key={request.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="mb-1">{request.student} needs help</div>
                          <div className="text-sm text-green-100">
                            {request.subject} • {request.duration} min • ${request.price.toFixed(2)}
                          </div>
                        </div>
                        <div className="text-sm text-green-100">{request.time}</div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleAcceptRequest(request.id)}
                          className="flex-1 px-4 py-2 bg-white text-green-600 rounded-lg hover:bg-green-50 transition"
                        >
                          Accept (20s)
                        </button>
                        <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition">
                          Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Bookings */}
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-6 h-6 text-blue-500" />
                <h2 className="text-blue-900">Upcoming Bookings</h2>
              </div>
              
              <div className="space-y-3">
                {UPCOMING_BOOKINGS.map(booking => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div className="flex-1">
                      <div className="text-blue-900 mb-1">{booking.student}</div>
                      <div className="text-sm text-blue-600">
                        {booking.subject} • {booking.duration} min
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-blue-900">{booking.time}</div>
                      <button className="text-sm text-blue-600 hover:underline">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Sessions */}
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-blue-900 mb-6">Recent Sessions</h2>
              
              <div className="space-y-3">
                {RECENT_SESSIONS.map(session => (
                  <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-blue-900">{session.student}</span>
                        <span className="text-blue-400">•</span>
                        <span className="text-blue-600">{session.subject}</span>
                      </div>
                      <div className="text-sm text-blue-600">
                        {session.duration} min • {session.date}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-blue-900 mb-1">${session.earned.toFixed(2)}</div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-blue-600">{session.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Earnings */}
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-6 h-6 text-blue-500" />
                <h3 className="text-blue-900">Earnings</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-blue-600 mb-1">Available Balance</div>
                  <div className="text-blue-900 text-2xl">${user.balance?.toFixed(2)}</div>
                </div>
                
                <div>
                  <div className="text-sm text-blue-600 mb-1">Pending (This Week)</div>
                  <div className="text-blue-900">$260</div>
                </div>
                
                <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                  Request Payout
                </button>
                
                <div className="text-xs text-blue-600">
                  Minimum payout: $50. Transferred via bank or payment service within 3-5 days.
                </div>
              </div>
            </div>

            {/* Performance */}
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-blue-900 mb-4">Performance</h3>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-blue-600 text-sm">Rating</span>
                    <span className="text-blue-900">{user.rating}/5.0</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(user.rating! / 5.0) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-blue-600 text-sm">Response Rate</span>
                    <span className="text-blue-900">95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-blue-600 text-sm">Acceptance Rate</span>
                    <span className="text-blue-900">88%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '88%' }} />
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <div className="text-green-800 text-sm">✓ Great job! You meet all requirements to stay active.</div>
                <div className="text-green-600 text-xs mt-1">
                  Minimum rating needed: 4.5
                </div>
              </div>
            </div>

            {/* Teaching Subjects */}
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-blue-900 mb-4">Your Subjects</h3>
              <div className="space-y-2">
                {['English'].map(subject => (
                  <div key={subject} className="flex items-center justify-between p-2 bg-blue-50 rounded">
                    <span className="text-blue-700">{subject}</span>
                    <span className="text-blue-600 text-sm">Verified ✓</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition text-sm">
                Add Subject
              </button>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-blue-900 mb-4">Availability</h3>
              <button className="w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition">
                Manage Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
