import { useState } from 'react';
import { GraduationCap, LogOut, Users, DollarSign, Video, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { User } from '../App';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

const PENDING_TUTORS = [
  {
    id: 1,
    name: 'Nour Khalil',
    email: 'nour@example.com',
    university: 'American University of Beirut',
    gpa: 3.7,
    subjects: ['Mathematics', 'Physics'],
    status: 'pending'
  },
  {
    id: 2,
    name: 'Rania Saad',
    email: 'rania@example.com',
    university: 'Lebanese American University',
    gpa: 3.5,
    subjects: ['Chemistry', 'Biology'],
    status: 'pending'
  },
];

const FLAGGED_SESSIONS = [
  {
    id: 1,
    tutor: 'Ahmad Hassan',
    student: 'Omar M.',
    subject: 'Mathematics',
    reason: 'Student reported inappropriate behavior',
    date: '2024-11-25',
    status: 'pending'
  },
  {
    id: 2,
    tutor: 'Lina Karam',
    student: 'Sarah K.',
    subject: 'Physics',
    reason: 'AI detected possible homework completion',
    date: '2024-11-24',
    status: 'pending'
  },
];

const PLATFORM_STATS = {
  totalStudents: 1247,
  totalTutors: 89,
  activeSessions: 12,
  totalRevenue: 8942.50,
  monthlyRevenue: 2341.20,
  averageRating: 4.7,
  sessionsToday: 45,
  sessionsMonth: 892
};

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [pendingTutors, setPendingTutors] = useState(PENDING_TUTORS);
  const [flaggedSessions, setFlaggedSessions] = useState(FLAGGED_SESSIONS);
  const [activeTab, setActiveTab] = useState<'overview' | 'tutors' | 'sessions' | 'reports'>('overview');

  const handleApproveTutor = (tutorId: number) => {
    setPendingTutors(pendingTutors.filter(t => t.id !== tutorId));
    alert('Tutor approved! Welcome email sent.');
  };

  const handleRejectTutor = (tutorId: number) => {
    setPendingTutors(pendingTutors.filter(t => t.id !== tutorId));
    alert('Tutor application rejected. Notification email sent.');
  };

  const handleResolveFlag = (sessionId: number, action: 'dismiss' | 'warn' | 'ban') => {
    setFlaggedSessions(flaggedSessions.filter(s => s.id !== sessionId));
    
    if (action === 'dismiss') {
      alert('Flag dismissed. No action taken.');
    } else if (action === 'warn') {
      alert('Warning sent to tutor. Session recorded in their profile.');
    } else {
      alert('Tutor banned from platform. All pending payouts frozen.');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-blue-500" />
            <span className="text-blue-900">Rent a Tutor - Admin</span>
          </div>
          <div className="flex items-center gap-4">
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
        <h1 className="text-blue-900 mb-8">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'tutors', label: 'Tutor Applications' },
            { id: 'sessions', label: 'Flagged Sessions' },
            { id: 'reports', label: 'Reports' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 transition ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-blue-700 hover:text-blue-900'
              }`}
            >
              {tab.label}
              {tab.id === 'tutors' && pendingTutors.length > 0 && (
                <span className="ml-2 px-2 py-1 bg-red-500 text-white rounded-full text-xs">
                  {pendingTutors.length}
                </span>
              )}
              {tab.id === 'sessions' && flaggedSessions.length > 0 && (
                <span className="ml-2 px-2 py-1 bg-yellow-500 text-white rounded-full text-xs">
                  {flaggedSessions.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <Users className="w-5 h-5" />
                  <span className="text-sm">Total Students</span>
                </div>
                <div className="text-blue-900 text-3xl">{PLATFORM_STATS.totalStudents.toLocaleString()}</div>
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <GraduationCap className="w-5 h-5" />
                  <span className="text-sm">Active Tutors</span>
                </div>
                <div className="text-blue-900 text-3xl">{PLATFORM_STATS.totalTutors}</div>
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <Video className="w-5 h-5" />
                  <span className="text-sm">Live Sessions</span>
                </div>
                <div className="text-blue-900 text-3xl">{PLATFORM_STATS.activeSessions}</div>
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="text-sm">Monthly Revenue</span>
                </div>
                <div className="text-blue-900 text-3xl">${(PLATFORM_STATS.monthlyRevenue / 1000).toFixed(1)}K</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-blue-900 mb-4">Revenue Overview</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-blue-600">Total Revenue</span>
                    <span className="text-blue-900">${PLATFORM_STATS.totalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-600">This Month</span>
                    <span className="text-blue-900">${PLATFORM_STATS.monthlyRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-600">Platform Share (30%)</span>
                    <span className="text-blue-900">${(PLATFORM_STATS.monthlyRevenue * 0.3).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-600">Tutor Payouts (70%)</span>
                    <span className="text-blue-900">${(PLATFORM_STATS.monthlyRevenue * 0.7).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-blue-900 mb-4">Session Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-blue-600">Today</span>
                    <span className="text-blue-900">{PLATFORM_STATS.sessionsToday} sessions</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-600">This Month</span>
                    <span className="text-blue-900">{PLATFORM_STATS.sessionsMonth} sessions</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-600">Average Rating</span>
                    <span className="text-blue-900">{PLATFORM_STATS.averageRating} / 5.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-600">Avg. Session Duration</span>
                    <span className="text-blue-900">28 minutes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tutor Applications Tab */}
        {activeTab === 'tutors' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-blue-900">Pending Tutor Applications</h2>
              <span className="text-blue-600">{pendingTutors.length} pending</span>
            </div>

            {pendingTutors.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-12 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <p className="text-blue-600">No pending applications</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingTutors.map(tutor => (
                  <div key={tutor.id} className="bg-white rounded-xl shadow p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl">
                          {tutor.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-blue-900 mb-1">{tutor.name}</h3>
                          <p className="text-blue-600 text-sm mb-2">{tutor.email}</p>
                          <div className="flex flex-wrap gap-2">
                            {tutor.subjects.map(subject => (
                              <span key={subject} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                {subject}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4 p-4 bg-blue-50 rounded-lg">
                      <div>
                        <span className="text-blue-600 text-sm">University</span>
                        <p className="text-blue-900">{tutor.university}</p>
                      </div>
                      <div>
                        <span className="text-blue-600 text-sm">GPA</span>
                        <p className="text-blue-900">{tutor.gpa} / 4.0</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleApproveTutor(tutor.id)}
                        className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectTutor(tutor.id)}
                        className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </button>
                      <button className="px-4 py-2 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Flagged Sessions Tab */}
        {activeTab === 'sessions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-blue-900">Flagged Sessions</h2>
              <span className="text-blue-600">{flaggedSessions.length} pending review</span>
            </div>

            {flaggedSessions.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-12 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <p className="text-blue-600">No flagged sessions</p>
              </div>
            ) : (
              <div className="space-y-4">
                {flaggedSessions.map(session => (
                  <div key={session.id} className="bg-white rounded-xl shadow p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-blue-900">Session #{session.id}</span>
                          <span className="text-blue-400">•</span>
                          <span className="text-blue-600">{session.date}</span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <span className="text-blue-600 text-sm">Tutor:</span>
                            <p className="text-blue-900">{session.tutor}</p>
                          </div>
                          <div>
                            <span className="text-blue-600 text-sm">Student:</span>
                            <p className="text-blue-900">{session.student}</p>
                          </div>
                          <div>
                            <span className="text-blue-600 text-sm">Subject:</span>
                            <p className="text-blue-900">{session.subject}</p>
                          </div>
                        </div>
                        <div className="p-3 bg-yellow-50 rounded-lg mb-4">
                          <span className="text-yellow-800">
                            <strong>Reason:</strong> {session.reason}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleResolveFlag(session.id, 'dismiss')}
                        className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                      >
                        Dismiss
                      </button>
                      <button
                        onClick={() => handleResolveFlag(session.id, 'warn')}
                        className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                      >
                        Warn Tutor
                      </button>
                      <button
                        onClick={() => handleResolveFlag(session.id, 'ban')}
                        className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        Ban Tutor
                      </button>
                      <button className="px-4 py-2 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition">
                        View Recording
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <h2 className="text-blue-900 mb-4">Platform Reports</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-blue-900 mb-4">Top Subjects</h3>
                <div className="space-y-3">
                  {[
                    { subject: 'Mathematics', sessions: 245 },
                    { subject: 'Physics', sessions: 189 },
                    { subject: 'Chemistry', sessions: 156 },
                    { subject: 'English', sessions: 134 }
                  ].map(item => (
                    <div key={item.subject} className="flex items-center justify-between">
                      <span className="text-blue-700">{item.subject}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${(item.sessions / 245) * 100}%` }}
                          />
                        </div>
                        <span className="text-blue-900 w-12 text-right">{item.sessions}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-blue-900 mb-4">Top Tutors</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Dr. Rami Nassar', earnings: 1245 },
                    { name: 'Maya Sleiman', earnings: 1089 },
                    { name: 'Ahmad Hassan', earnings: 945 },
                    { name: 'Lina Karam', earnings: 876 }
                  ].map((tutor, index) => (
                    <div key={tutor.name} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="text-blue-900">{tutor.name}</div>
                        <div className="text-blue-600 text-sm">${tutor.earnings} earned</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
