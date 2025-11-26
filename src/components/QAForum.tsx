import { useState } from 'react';
import { ArrowLeft, ThumbsUp, MessageSquare, Plus, Search, TrendingUp } from 'lucide-react';
import { User } from '../App';

interface QAForumProps {
  user: User;
  onBack: () => void;
}

const QUESTIONS = [
  {
    id: 1,
    author: 'Sarah K.',
    role: 'Student',
    title: 'How do I solve quadratic equations with complex roots?',
    subject: 'Mathematics',
    content: 'I understand the basic quadratic formula but I\'m stuck when the discriminant is negative. Can someone explain the process?',
    upvotes: 12,
    answers: 3,
    time: '2 hours ago',
    hasAnswer: true
  },
  {
    id: 2,
    author: 'Omar M.',
    role: 'Student',
    title: 'Difference between mitosis and meiosis?',
    subject: 'Biology',
    content: 'I always confuse these two processes. What are the key differences I should remember for the exam?',
    upvotes: 8,
    answers: 5,
    time: '5 hours ago',
    hasAnswer: true
  },
  {
    id: 3,
    author: 'Layla H.',
    role: 'Student',
    title: 'Understanding Newton\'s Third Law',
    subject: 'Physics',
    content: 'If action and reaction are equal and opposite, why do things move at all?',
    upvotes: 15,
    answers: 4,
    time: '1 day ago',
    hasAnswer: true
  },
  {
    id: 4,
    author: 'Karim S.',
    role: 'Student',
    title: 'Best way to memorize French verb conjugations?',
    subject: 'French',
    content: 'Any tips or tricks for remembering all the different tenses?',
    upvotes: 6,
    answers: 2,
    time: '1 day ago',
    hasAnswer: false
  },
];

const ANSWERS = {
  1: [
    {
      id: 1,
      author: 'Dr. Rami Nassar',
      role: 'Tutor',
      content: 'Great question! When the discriminant (b² - 4ac) is negative, you get complex roots. The key is to use the imaginary unit i, where i² = -1. For example, if you have x² + 2x + 5 = 0, the discriminant is 4 - 20 = -16. The roots are: x = (-2 ± √-16) / 2 = (-2 ± 4i) / 2 = -1 ± 2i',
      upvotes: 15,
      time: '1 hour ago',
      isBestAnswer: true
    },
    {
      id: 2,
      author: 'Ahmad H.',
      role: 'Tutor',
      content: 'Also remember that complex roots always come in conjugate pairs! If -1 + 2i is a root, then -1 - 2i is also a root.',
      upvotes: 8,
      time: '1 hour ago',
      isBestAnswer: false
    }
  ]
};

export function QAForum({ user, onBack }: QAForumProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [showNewQuestion, setShowNewQuestion] = useState(false);
  const [newQuestionTitle, setNewQuestionTitle] = useState('');
  const [newQuestionContent, setNewQuestionContent] = useState('');
  const [newQuestionSubject, setNewQuestionSubject] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handlePostQuestion = () => {
    if (!newQuestionTitle || !newQuestionContent || !newQuestionSubject) {
      alert('Please fill in all fields');
      return;
    }
    
    // Check for homework cheating patterns
    const forbiddenPhrases = ['do my homework', 'solve this for me', 'give me the answer'];
    const combinedText = (newQuestionTitle + ' ' + newQuestionContent).toLowerCase();
    
    if (forbiddenPhrases.some(phrase => combinedText.includes(phrase))) {
      alert('⚠️ This platform is for teaching, not completing homework. Please rephrase your question to ask for help understanding the concept.');
      return;
    }
    
    alert('Question posted successfully! Tutors and peers will be notified.');
    setShowNewQuestion(false);
    setNewQuestionTitle('');
    setNewQuestionContent('');
    setNewQuestionSubject('');
  };

  if (selectedQuestion) {
    const answers = ANSWERS[selectedQuestion.id as keyof typeof ANSWERS] || [];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button 
            onClick={() => setSelectedQuestion(null)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to questions
          </button>

          {/* Question */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                {selectedQuestion.author.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-blue-900">{selectedQuestion.author}</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                    {selectedQuestion.role}
                  </span>
                  <span className="text-blue-400">•</span>
                  <span className="text-blue-600 text-sm">{selectedQuestion.time}</span>
                </div>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                  {selectedQuestion.subject}
                </span>
              </div>
            </div>

            <h2 className="text-blue-900 mb-4">{selectedQuestion.title}</h2>
            <p className="text-blue-700 mb-6">{selectedQuestion.content}</p>

            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition">
                <ThumbsUp className="w-4 h-4" />
                <span>{selectedQuestion.upvotes}</span>
              </button>
            </div>
          </div>

          {/* Answers */}
          <div className="space-y-4">
            <h3 className="text-blue-900">{answers.length} Answer{answers.length !== 1 ? 's' : ''}</h3>
            
            {answers.map((answer: any) => (
              <div 
                key={answer.id} 
                className={`bg-white rounded-xl shadow p-6 ${
                  answer.isBestAnswer ? 'border-2 border-green-500' : ''
                }`}
              >
                {answer.isBestAnswer && (
                  <div className="mb-3 px-3 py-1 bg-green-100 text-green-700 rounded inline-block text-sm">
                    ✓ Best Answer
                  </div>
                )}
                
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white">
                    {answer.author.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-blue-900">{answer.author}</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                        {answer.role}
                      </span>
                      <span className="text-blue-400">•</span>
                      <span className="text-blue-600 text-sm">{answer.time}</span>
                    </div>
                  </div>
                </div>

                <p className="text-blue-700 mb-4">{answer.content}</p>

                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition text-sm">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{answer.upvotes}</span>
                  </button>
                </div>
              </div>
            ))}

            {/* Add Answer */}
            {user.role === 'tutor' && (
              <div className="bg-white rounded-xl shadow p-6">
                <h4 className="text-blue-900 mb-4">Your Answer</h4>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                  rows={6}
                  placeholder="Share your knowledge..."
                />
                <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                  Post Answer
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (showNewQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button 
            onClick={() => setShowNewQuestion(false)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Cancel
          </button>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-blue-900 mb-6">Ask a Question</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-blue-900 mb-2">Subject</label>
                <select
                  value={newQuestionSubject}
                  onChange={(e) => setNewQuestionSubject(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a subject...</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="English">English</option>
                  <option value="French">French</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Computer Science">Computer Science</option>
                </select>
              </div>

              <div>
                <label className="block text-blue-900 mb-2">Question Title</label>
                <input
                  type="text"
                  value={newQuestionTitle}
                  onChange={(e) => setNewQuestionTitle(e.target.value)}
                  placeholder="What's your question about?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-blue-900 mb-2">Details</label>
                <textarea
                  value={newQuestionContent}
                  onChange={(e) => setNewQuestionContent(e.target.value)}
                  placeholder="Explain what you're trying to understand..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={8}
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  ⚠️ <strong>Important:</strong> This forum is for learning and understanding concepts. 
                  Questions asking others to complete your homework will be automatically flagged and removed.
                </p>
              </div>

              <button
                onClick={handlePostQuestion}
                className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Post Question
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

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-blue-900 mb-2">Q&A Forum</h1>
            <p className="text-blue-600">Ask questions and get free answers from tutors and peers</p>
          </div>
          <button
            onClick={() => setShowNewQuestion(true)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Ask Question
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg whitespace-nowrap">
            All Questions
          </button>
          <button className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition whitespace-nowrap">
            Unanswered
          </button>
          <button className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition whitespace-nowrap flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Trending
          </button>
          <button className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition whitespace-nowrap">
            My Questions
          </button>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {QUESTIONS.map(question => (
            <div 
              key={question.id}
              onClick={() => setSelectedQuestion(question)}
              className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  {question.author.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-blue-900">{question.author}</span>
                    <span className="text-blue-400">•</span>
                    <span className="text-blue-600 text-sm">{question.time}</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                      {question.subject}
                    </span>
                  </div>
                  <h3 className="text-blue-900 mb-2 hover:text-blue-700">
                    {question.title}
                  </h3>
                  <p className="text-blue-600 mb-4 line-clamp-2">
                    {question.content}
                  </p>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-blue-600">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm">{question.upvotes}</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm">{question.answers} answer{question.answers !== 1 ? 's' : ''}</span>
                    </div>
                    {question.hasAnswer && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                        ✓ Has answer
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
