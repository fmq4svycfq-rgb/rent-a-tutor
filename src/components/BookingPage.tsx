import { useState } from 'react';
import { ArrowLeft, Star, Calendar, Clock } from 'lucide-react';
import { User } from '../App';

interface BookingPageProps {
  user: User;
  onBack: () => void;
}

const TUTORS = [
  { 
    id: 1, 
    name: 'Dr. Katya Frangie Eter', 
    subjects: ['English'], 
    rating: 4.9, 
    sessions: 156,
    hourlyRate: 20,
    availability: ['Mon 2-6 PM', 'Wed 4-8 PM', 'Fri 1-7 PM']
  },
  { 
    id: 2, 
    name: 'Lina Karam', 
    subjects: ['Chemistry', 'Biology'], 
    rating: 4.8, 
    sessions: 142,
    hourlyRate: 15,
    availability: ['Tue 3-7 PM', 'Thu 2-6 PM', 'Sat 10 AM-4 PM']
  },
  { 
    id: 3, 
    name: 'Ahmad Hassan', 
    subjects: ['Mathematics', 'Computer Science'], 
    rating: 4.7, 
    sessions: 98,
    hourlyRate: 18,
    availability: ['Mon 6-10 PM', 'Wed 7-11 PM', 'Sun 2-8 PM']
  },
  { 
    id: 4, 
    name: 'Maya Sleiman', 
    subjects: ['English', 'French', 'Arabic'], 
    rating: 4.9, 
    sessions: 203,
    hourlyRate: 14,
    availability: ['Daily 4-9 PM']
  },
];

export function BookingPage({ user, onBack }: BookingPageProps) {
  const [selectedTutor, setSelectedTutor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState(30);

  const handleBookSession = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time');
      return;
    }
    
    const cost = duration === 30 ? 8 : selectedTutor.hourlyRate;
    alert(`Session booked with ${selectedTutor.name}!\nDate: ${selectedDate}\nTime: ${selectedTime}\nDuration: ${duration} min\nCost: $${cost}`);
    onBack();
  };

  if (selectedTutor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button 
            onClick={() => setSelectedTutor(null)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to tutors
          </button>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-start gap-6 mb-8 pb-8 border-b border-gray-200">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl">
                {selectedTutor.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h2 className="text-blue-900 mb-2">{selectedTutor.name}</h2>
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-blue-900">{selectedTutor.rating}</span>
                  </div>
                  <span className="text-blue-600">{selectedTutor.sessions} sessions</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedTutor.subjects.map((subject: string) => (
                    <span key={subject} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <h3 className="text-blue-900 mb-4">Book a Session</h3>

            <div className="space-y-6">
              <div>
                <label className="block text-blue-900 mb-2">Duration</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setDuration(30)}
                    className={`p-4 rounded-lg border-2 transition ${
                      duration === 30
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-blue-900 mb-1">30 minutes</div>
                    <div className="text-blue-600">$8.00</div>
                  </button>
                  <button
                    onClick={() => setDuration(60)}
                    className={`p-4 rounded-lg border-2 transition ${
                      duration === 60
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-blue-900 mb-1">60 minutes</div>
                    <div className="text-blue-600">${selectedTutor.hourlyRate}.00</div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-blue-900 mb-2">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-blue-900 mb-2">Select Time</label>
                <div className="grid grid-cols-3 gap-3">
                  {['2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'].map(time => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-4 py-3 rounded-lg border-2 transition ${
                        selectedTime === time
                          ? 'border-blue-500 bg-blue-50 text-blue-900'
                          : 'border-gray-200 text-blue-700 hover:border-blue-300'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="text-blue-900 mb-2">Tutor Availability</h4>
                <div className="space-y-1">
                  {selectedTutor.availability.map((slot: string) => (
                    <div key={slot} className="text-blue-700 text-sm">• {slot}</div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-blue-700">Duration</span>
                  <span className="text-blue-900">{duration} minutes</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-blue-700">Date & Time</span>
                  <span className="text-blue-900">
                    {selectedDate && selectedTime ? `${selectedDate} at ${selectedTime}` : 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="text-blue-900">Total Cost</span>
                  <span className="text-blue-900">
                    ${duration === 30 ? '8.00' : selectedTutor.hourlyRate + '.00'}
                  </span>
                </div>
              </div>

              <button
                onClick={handleBookSession}
                className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to dashboard
        </button>

        <div className="mb-8">
          <h1 className="text-blue-900 mb-2">Book a Session</h1>
          <p className="text-blue-600">
            Choose your preferred tutor and schedule a 30 or 60-minute session
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {TUTORS.map(tutor => (
            <div key={tutor.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl">
                  {tutor.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-blue-900 mb-1">{tutor.name}</h3>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-blue-900">{tutor.rating}</span>
                    </div>
                    <span className="text-blue-600 text-sm">{tutor.sessions} sessions</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tutor.subjects.map(subject => (
                      <span key={subject} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 text-blue-700 text-sm mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>Availability</span>
                </div>
                {tutor.availability.map(slot => (
                  <div key={slot} className="text-blue-600 text-sm">• {slot}</div>
                ))}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">30 min: $5 • 60 min: ${tutor.hourlyRate}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedTutor(tutor)}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Book Session
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
