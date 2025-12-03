import { GraduationCap, Clock, DollarSign, Shield, Zap, Users } from 'lucide-react';
import { UserRole } from '../App';

interface LandingPageProps {
  onLogin: (role: UserRole) => void;
}

export function LandingPage({ onLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-blue-500" />
            <span className="text-blue-900">Rent a Tutor</span>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => onLogin('student')}
              className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
            >
              Sign In
            </button>
            <button 
              onClick={() => onLogin('student')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-blue-900 mb-4">
          Lebanon's Fastest Academic Help
        </h1>
        <p className="text-blue-700 max-w-2xl mx-auto mb-8">
          Connect with qualified tutors instantly for short sessions or book lessons. 
          Get help anytime, even late at night, with affordable pricing tailored for Lebanese students.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button 
            onClick={() => onLogin('student')}
            className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
          >
            <Zap className="w-5 h-5" />
            Get Instant Help
          </button>
          <button 
            onClick={() => onLogin('tutor')}
            className="px-8 py-3 border-2 border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition flex items-center gap-2"
          >
            <Users className="w-5 h-5" />
            Become a Tutor
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-blue-900 mb-12">
            Why Choose Rent a Tutor?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-blue-900 mb-2">Instant Tutoring</h3>
              <p className="text-blue-600">
                Get help in 10-30 minute sessions. No booking needed - just click and connect with a tutor immediately.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-blue-900 mb-2">Affordable Pricing</h3>
              <p className="text-blue-600">
                Sessions start at just $2.00 for 10 minutes. Lebanon-based pricing that fits your budget.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-blue-900 mb-2">24/7 Availability</h3>
              <p className="text-blue-600">
                Study late at night? No problem. Our tutors are available round the clock across different time zones.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-blue-900 mb-2">Qualified Tutors</h3>
              <p className="text-blue-600">
                All tutors have GPA ≥ 3.0 and pass subject tests. Lebanese curriculum experts ready to help.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-blue-900 mb-2">Anti-Cheating System</h3>
              <p className="text-blue-600">
                Built for teaching, not homework completion. AI monitoring ensures academic integrity.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-blue-900 mb-2">Q&A Community</h3>
              <p className="text-blue-600">
                Ask questions in our forum. Get answers from tutors and peers for free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-center text-blue-900 mb-12">Simple, Affordable Pricing</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-blue-900 mb-4">Instant Sessions</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-blue-700">10 minutes</span>
                <span className="text-blue-900">$2.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">20 minutes</span>
                <span className="text-blue-900">$4.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">30 minutes</span>
                <span className="text-blue-900">$6.00</span>
              </div>
            </div>
            <p className="text-blue-600 mt-4 text-sm">Perfect for quick questions and concept clarification</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-blue-900 mb-4">Booked Sessions</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-blue-700">30 minutes</span>
                <span className="text-blue-900">$8.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">60 minutes</span>
                <span className="text-blue-900">$14-20</span>
              </div>
            </div>
            <p className="text-blue-600 mt-4 text-sm">Schedule in advance with your favorite tutor</p>
          </div>
        </div>
      </section>

      {/* CTA for Tutors */}
      <section className="bg-blue-500 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="mb-4">High-GPA Student? Earn Money Tutoring</h2>
          <p className="mb-8 text-blue-100">
            GPA ≥ 3.0? Join our platform and help students while earning 70% of session fees. Flexible hours, work from anywhere.
          </p>
          <button 
            onClick={() => onLogin('tutor')}
            className="px-8 py-3 bg-white text-blue-500 rounded-lg hover:bg-blue-50 transition"
          >
            Apply to Become a Tutor
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="w-6 h-6" />
            <span>Rent a Tutor</span>
          </div>
          <p className="text-blue-300 text-sm">Lebanon's fastest academic help platform</p>
          <div className="mt-4 flex gap-4 justify-center text-sm text-blue-300">
            <button onClick={() => onLogin('admin')} className="hover:text-white">Admin Login</button>
            <span>•</span>
            <a href="#" className="hover:text-white">Terms</a>
            <span>•</span>
            <a href="#" className="hover:text-white">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
