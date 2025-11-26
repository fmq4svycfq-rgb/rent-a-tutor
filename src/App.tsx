import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { StudentDashboard } from './components/StudentDashboard';
import { TutorDashboard } from './components/TutorDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { InstantSession } from './components/InstantSession';
import { BookingPage } from './components/BookingPage';
import { QAForum } from './components/QAForum';
import { TutorApplication } from './components/TutorApplication';

export type UserRole = 'guest' | 'student' | 'tutor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  rating?: number;
  balance?: number;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<string>('landing');
  const [activeSession, setActiveSession] = useState<any>(null);

  const handleLogin = (role: UserRole) => {
    // Mock login
    const mockUsers: Record<UserRole, User> = {
      guest: { id: '', name: '', email: '', role: 'guest' },
      student: { 
        id: '1', 
        name: 'Elias Kallas', 
        email: 'eliaskallas@example.com', 
        role: 'student',
        balance: 25.50
      },
      tutor: { 
        id: '2', 
        name: 'Ahmad Hassan', 
        email: 'ahmad@example.com', 
        role: 'tutor',
        rating: 4.8,
        balance: 142.30
      },
      admin: { 
        id: '3', 
        name: 'Admin User', 
        email: 'admin@example.com', 
        role: 'admin' 
      }
    };
    
    setCurrentUser(mockUsers[role]);
    setCurrentPage(role === 'student' ? 'student-dashboard' : role === 'tutor' ? 'tutor-dashboard' : 'admin-dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('landing');
    setActiveSession(null);
  };

  const navigateTo = (page: string) => {
    setCurrentPage(page);
  };

  const startInstantSession = (sessionData: any) => {
    setActiveSession(sessionData);
    setCurrentPage('instant-session');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {currentPage === 'landing' && (
        <LandingPage onLogin={handleLogin} />
      )}
      
      {currentPage === 'student-dashboard' && currentUser && (
        <StudentDashboard 
          user={currentUser} 
          onLogout={handleLogout}
          onNavigate={navigateTo}
          onStartSession={startInstantSession}
        />
      )}
      
      {currentPage === 'tutor-dashboard' && currentUser && (
        <TutorDashboard 
          user={currentUser} 
          onLogout={handleLogout}
          onNavigate={navigateTo}
        />
      )}
      
      {currentPage === 'admin-dashboard' && currentUser && (
        <AdminDashboard 
          user={currentUser} 
          onLogout={handleLogout}
        />
      )}
      
      {currentPage === 'instant-session' && currentUser && activeSession && (
        <InstantSession 
          user={currentUser}
          session={activeSession}
          onEndSession={() => navigateTo(currentUser.role + '-dashboard')}
        />
      )}
      
      {currentPage === 'booking' && currentUser && (
        <BookingPage 
          user={currentUser}
          onBack={() => navigateTo('student-dashboard')}
        />
      )}
      
      {currentPage === 'forum' && currentUser && (
        <QAForum 
          user={currentUser}
          onBack={() => navigateTo(currentUser.role + '-dashboard')}
        />
      )}
      
      {currentPage === 'tutor-application' && (
        <TutorApplication 
          onBack={() => navigateTo('landing')}
          onSubmit={() => {
            alert('Application submitted! You will receive an email within 48 hours.');
            navigateTo('landing');
          }}
        />
      )}
    </div>
  );
}
