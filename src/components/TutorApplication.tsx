import { useState } from 'react';
import { ArrowLeft, Upload, GraduationCap, CheckCircle } from 'lucide-react';

interface TutorApplicationProps {
  onBack: () => void;
  onSubmit: () => void;
}

const SUBJECTS = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology',
  'Arabic', 'English', 'French', 'History',
  'Geography', 'Computer Science', 'Economics'
];

export function TutorApplication({ onBack, onSubmit }: TutorApplicationProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    university: '',
    gpa: '',
    selectedSubjects: [] as string[],
    idUploaded: false,
    transcriptUploaded: false
  });

  const handleSubjectToggle = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      selectedSubjects: prev.selectedSubjects.includes(subject)
        ? prev.selectedSubjects.filter(s => s !== subject)
        : [...prev.selectedSubjects, subject]
    }));
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.fullName || !formData.email || !formData.phone) {
        alert('Please fill in all fields');
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.university || !formData.gpa) {
        alert('Please fill in all fields');
        return;
      }
      if (parseFloat(formData.gpa) < 3.0) {
        alert('Minimum GPA requirement is 3.0/4.0');
        return;
      }
    } else if (currentStep === 3) {
      if (formData.selectedSubjects.length === 0) {
        alert('Please select at least one subject');
        return;
      }
    } else if (currentStep === 4) {
      if (!formData.idUploaded || !formData.transcriptUploaded) {
        alert('Please upload all required documents');
        return;
      }
    }
    
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit();
    }
  };

  const handleFileUpload = (type: 'id' | 'transcript') => {
    // Simulate file upload
    setFormData(prev => ({
      ...prev,
      [type === 'id' ? 'idUploaded' : 'transcriptUploaded']: true
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to home
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="w-10 h-10 text-blue-500" />
            <div>
              <h1 className="text-blue-900">Become a Tutor</h1>
              <p className="text-blue-600">Join Lebanon's fastest growing tutoring platform</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3, 4, 5].map(step => (
                <div key={step} className="flex items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                  </div>
                  {step < 5 && (
                    <div className={`flex-1 h-1 mx-2 ${
                      step < currentStep ? 'bg-blue-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-blue-600">
              <span>Personal</span>
              <span>Academic</span>
              <span>Subjects</span>
              <span>Documents</span>
              <span>Test</span>
            </div>
          </div>

          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-blue-900">Personal Information</h2>
              
              <div>
                <label className="block text-blue-900 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-blue-900 mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-blue-900 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+961 XX XXX XXX"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Step 2: Academic Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-blue-900">Academic Information</h2>
              
              <div>
                <label className="block text-blue-900 mb-2">University Name</label>
                <input
                  type="text"
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  placeholder="e.g., American University of Beirut"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-blue-900 mb-2">GPA (out of 4.0)</label>
                <input
                  type="number"
                  step="0.01"
                  min="3.0"
                  max="4.0"
                  value={formData.gpa}
                  onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                  placeholder="3.5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-blue-600 text-sm mt-2">Minimum GPA requirement: 3.0/4.0</p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-sm">
                  💡 Your academic credentials will be verified. Please ensure all information is accurate.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Subject Selection */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-blue-900">Select Subjects to Teach</h2>
              <p className="text-blue-600">Choose all subjects you're qualified to teach. You'll take a short test for each.</p>
              
              <div className="grid md:grid-cols-3 gap-3">
                {SUBJECTS.map(subject => (
                  <button
                    key={subject}
                    onClick={() => handleSubjectToggle(subject)}
                    className={`p-4 rounded-lg border-2 transition ${
                      formData.selectedSubjects.includes(subject)
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-200 text-blue-700 hover:border-blue-300'
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  Selected {formData.selectedSubjects.length} subject{formData.selectedSubjects.length !== 1 ? 's' : ''}. 
                  You'll need to pass a test for each subject before you can start tutoring.
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Document Upload */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-blue-900">Upload Documents</h2>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition">
                  {formData.idUploaded ? (
                    <div className="text-green-600">
                      <CheckCircle className="w-12 h-12 mx-auto mb-3" />
                      <p>ID Card Uploaded</p>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                      <h3 className="text-blue-900 mb-2">Upload ID Card</h3>
                      <p className="text-blue-600 text-sm mb-4">
                        Valid government-issued ID or passport
                      </p>
                      <button
                        onClick={() => handleFileUpload('id')}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                      >
                        Choose File
                      </button>
                    </>
                  )}
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition">
                  {formData.transcriptUploaded ? (
                    <div className="text-green-600">
                      <CheckCircle className="w-12 h-12 mx-auto mb-3" />
                      <p>Transcript Uploaded</p>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                      <h3 className="text-blue-900 mb-2">Upload Academic Transcript</h3>
                      <p className="text-blue-600 text-sm mb-4">
                        Official transcript showing your GPA
                      </p>
                      <button
                        onClick={() => handleFileUpload('transcript')}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                      >
                        Choose File
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-sm">
                  🔒 Your documents are securely encrypted and will only be used for verification purposes.
                </p>
              </div>
            </div>
          )}

          {/* Step 5: Subject Test */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-blue-900">Subject Tests</h2>
              <p className="text-blue-600">
                Complete a short test for each selected subject to demonstrate your expertise.
              </p>

              <div className="space-y-3">
                {formData.selectedSubjects.map(subject => (
                  <div key={subject} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <h3 className="text-blue-900 mb-1">{subject}</h3>
                      <p className="text-blue-600 text-sm">10 questions • 15 minutes • Pass: 70%</p>
                    </div>
                    <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                      Start Test
                    </button>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  ⏱️ You can take each test once. Make sure you're in a quiet environment before starting.
                </p>
              </div>

              <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white">
                <h3 className="mb-2">Almost There!</h3>
                <p className="text-blue-100 mb-4">
                  After completing all tests, your application will be reviewed by our admin team within 48 hours.
                </p>
                <ul className="space-y-2 text-blue-100 text-sm">
                  <li>✓ Earn 70% of all session fees</li>
                  <li>✓ Flexible working hours</li>
                  <li>✓ Work from anywhere</li>
                  <li>✓ Help students succeed</li>
                </ul>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-6 py-3 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition"
              >
                Previous
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              {currentStep === 5 ? 'Submit Application' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
