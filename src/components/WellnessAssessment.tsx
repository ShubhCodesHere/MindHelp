import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  HeartIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';

interface Question {
  id: number;
  question: string;
  category: string;
}

interface Answer {
  emoji: string;
  label: string;
  value: number;
  description: string;
}

const WellnessAssessment: React.FC<{ onComplete: (score: number) => void }> = ({ onComplete }) => {
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const questions: Question[] = [
    {
      id: 1,
      question: "How would you describe your overall mood today?",
      category: "Emotional Well-being"
    },
    {
      id: 2,
      question: "How well have you been sleeping recently?",
      category: "Sleep Quality"
    },
    {
      id: 3,
      question: "How manageable do you find your daily stress levels?",
      category: "Stress Management"
    },
    {
      id: 4,
      question: "How connected do you feel to your friends and family?",
      category: "Social Connection"
    },
    {
      id: 5,
      question: "How confident do you feel about handling life's challenges?",
      category: "Resilience"
    }
  ];

  const answerOptions: Answer[] = [
    {
      emoji: "😄",
      label: "Great",
      value: 100,
      description: "Excellent"
    },
    {
      emoji: "😊",
      label: "Good",
      value: 75,
      description: "Pretty good"
    },
    {
      emoji: "😐",
      label: "Neutral",
      value: 50,
      description: "It's okay"
    },
    {
      emoji: "😞",
      label: "Bad",
      value: 25,
      description: "Not great"
    },
    {
      emoji: "😢",
      label: "Poor",
      value: 0,
      description: "Really struggling"
    }
  ];

  const handleAnswerSelect = (answerValue: number) => {
    const newAnswers = [...answers, answerValue];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate final score
      const totalScore = newAnswers.reduce((sum, answer) => sum + answer, 0);
      const finalScore = Math.round(totalScore / questions.length);
      setScore(finalScore);
      setIsCompleted(true);
      
      // Auto-schedule session based on score severity
      if (finalScore <= 10) {
        scheduleImmediateSession();
      } else if (finalScore < 30) {
        scheduleUrgentSession();
      }
      
      onComplete(finalScore);
    }
  };

  const scheduleUrgentSession = () => {
    // Schedule same-day session for wellness scores < 30%
    const timeSlots = ['4:00 PM', '5:30 PM', '7:00 PM', '8:30 PM'];
    const availableTime = timeSlots[Math.floor(Math.random() * timeSlots.length)];
    
    const urgentSession = {
      id: `urgent-${Date.now()}`,
      type: 'Priority Consultation',
      with: 'Dr. Shreya Sharma',
      time: `Today, ${availableTime}`,
      status: 'auto-scheduled',
      priority: 'urgent',
      reason: 'Low wellness score detected - same day priority session'
    };

    // Store in localStorage for demo purposes (user-specific)
    const sessionKey = `userSessions_${user?.email || 'guest'}`;
    const existingSessions = JSON.parse(localStorage.getItem(sessionKey) || '[]');
    existingSessions.unshift(urgentSession);
    localStorage.setItem(sessionKey, JSON.stringify(existingSessions));
    
    // Also store in general userSessions for backward compatibility
    localStorage.setItem('userSessions', JSON.stringify(existingSessions));
  };

  const scheduleImmediateSession = () => {
    // Schedule immediate session for critical wellness scores
    const timeSlots = ['2:00 PM', '3:30 PM', '5:00 PM', '6:30 PM'];
    const availableTime = timeSlots[Math.floor(Math.random() * timeSlots.length)];
    
    const immediateSession = {
      id: `immediate-${Date.now()}`,
      type: 'Emergency Consultation',
      with: 'Dr. Priya Gupta',
      time: `Today, ${availableTime}`,
      status: 'auto-scheduled',
      priority: 'immediate',
      reason: 'Critical wellness score - immediate attention required'
    };

    // Store in localStorage for demo purposes (user-specific)
    const sessionKey = `userSessions_${user?.email || 'guest'}`;
    const existingSessions = JSON.parse(localStorage.getItem(sessionKey) || '[]');
    existingSessions.unshift(immediateSession);
    localStorage.setItem(sessionKey, JSON.stringify(existingSessions));
    
    // Also store in general userSessions for backward compatibility
    localStorage.setItem('userSessions', JSON.stringify(existingSessions));

    // Also show immediate help resources
    localStorage.setItem('showEmergencyResources', 'true');
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    if (score >= 30) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 75) return { 
      title: "Great Job! 🎉", 
      message: "Your mental wellness is in excellent shape. Keep up the great work!",
      icon: CheckCircleIcon,
      color: "green"
    };
    if (score >= 50) return { 
      title: "You're Doing Well 👍", 
      message: "Your wellness is good, but there's room for improvement. Consider exploring our wellness resources.",
      icon: HeartIcon,
      color: "yellow"
    };
    if (score >= 30) return { 
      title: "Let's Focus on Improvement 💪", 
      message: "Your wellness needs attention. We recommend connecting with our peer support community.",
      icon: HeartIcon,
      color: "orange"
    };
    return { 
      title: "We're Here to Help 🤗", 
      message: "Your wellness score indicates you could benefit from professional support. We've automatically scheduled a session with a psychiatrist.",
      icon: ExclamationTriangleIcon,
      color: "red"
    };
  };

  const restartAssessment = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setIsCompleted(false);
    setScore(0);
  };

  if (isCompleted) {
    const scoreMessage = getScoreMessage(score);
    const IconComponent = scoreMessage.icon;

    return (
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
            scoreMessage.color === 'green' ? 'bg-green-100' :
            scoreMessage.color === 'yellow' ? 'bg-yellow-100' :
            scoreMessage.color === 'orange' ? 'bg-orange-100' :
            'bg-red-100'
          }`}>
            <IconComponent className={`w-8 h-8 ${
              scoreMessage.color === 'green' ? 'text-green-600' :
              scoreMessage.color === 'yellow' ? 'text-yellow-600' :
              scoreMessage.color === 'orange' ? 'text-orange-600' :
              'text-red-600'
            }`} />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{scoreMessage.title}</h2>
          
          <div className="mb-6">
            <div className="text-6xl font-bold mb-2">
              <span className={getScoreColor(score)}>{score}%</span>
            </div>
            <p className="text-gray-600">Your Wellness Score</p>
          </div>

          <p className="text-gray-700 mb-8 leading-relaxed">{scoreMessage.message}</p>

          {score < 30 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <ExclamationTriangleIcon className="w-6 h-6 text-red-600 mr-3 mt-1" />
                <div className="text-left">
                  <h4 className="font-semibold text-red-800 mb-1">Urgent Session Scheduled</h4>
                  <p className="text-red-700 text-sm">
                    We've automatically scheduled a consultation with Dr. Kavya Sharma for tomorrow at 10:00 AM. 
                    You can view this in your dashboard under "Upcoming Sessions".
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Continue to Dashboard
            </button>
            
            <button
              onClick={restartAssessment}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Retake Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Question {currentQuestion + 1} of {questions.length}</span>
          <span className="text-sm text-gray-600">{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="text-center mb-8">
        <div className="text-sm text-indigo-600 font-semibold mb-2 uppercase tracking-wide">
          {questions[currentQuestion].category}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {questions[currentQuestion].question}
        </h2>
        <p className="text-gray-600">Choose the option that best describes how you feel:</p>
      </div>

      {/* Answer Options */}
      <div className="space-y-3">
        {answerOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option.value)}
            className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 text-left group"
          >
            <div className="flex items-center space-x-4">
              <div className="text-3xl">{option.emoji}</div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 group-hover:text-indigo-700">
                  {option.label}
                </div>
                <div className="text-sm text-gray-600">
                  {option.description}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Skip Option */}
      <div className="text-center mt-6">
        <button
          onClick={() => window.location.href = '/dashboard'}
          className="text-gray-500 hover:text-gray-700 text-sm underline"
        >
          Skip assessment (not recommended)
        </button>
      </div>
    </div>
  );
};

export default WellnessAssessment;
