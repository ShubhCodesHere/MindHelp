import React, { useState } from 'react';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ClockIcon, 
  BookOpenIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';
import { 
  PEER_HELPER_GUIDELINES, 
  PEER_HELPER_ASSESSMENT_QUESTIONS, 
  PASSING_SCORE 
} from '../data/peerHelperAssessment';

interface PeerHelperAssessmentProps {
  onSuccess: () => void;
  onFailure: () => void;
}

const PeerHelperAssessment: React.FC<PeerHelperAssessmentProps> = ({ onSuccess, onFailure }) => {
  const [currentStep, setCurrentStep] = useState<'guidelines' | 'assessment' | 'results'>('guidelines');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(15 * 60); // 15 minutes
  const [showResults, setShowResults] = useState(false);

  // Timer effect
  React.useEffect(() => {
    if (currentStep === 'assessment' && !showResults) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentStep, showResults]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimeUp = () => {
    setShowResults(true);
    calculateResults();
  };

  const startAssessment = () => {
    setCurrentStep('assessment');
    setTimeRemaining(15 * 60);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer];
      setAnswers(newAnswers);
      setSelectedAnswer(null);

      if (currentQuestion < PEER_HELPER_ASSESSMENT_QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
        calculateResults();
      }
    }
  };

  const calculateResults = () => {
    const finalAnswers = selectedAnswer !== null ? [...answers, selectedAnswer] : answers;
    let correctCount = 0;
    
    finalAnswers.forEach((answer, index) => {
      if (answer === PEER_HELPER_ASSESSMENT_QUESTIONS[index]?.correctAnswer) {
        correctCount++;
      }
    });

    const score = correctCount / PEER_HELPER_ASSESSMENT_QUESTIONS.length;
    const passed = score >= PASSING_SCORE;

    setTimeout(() => {
      if (passed) {
        onSuccess();
      } else {
        onFailure();
      }
    }, 3000);

    setCurrentStep('results');
  };

  const getScore = () => {
    const finalAnswers = selectedAnswer !== null ? [...answers, selectedAnswer] : answers;
    let correctCount = 0;
    
    finalAnswers.forEach((answer, index) => {
      if (answer === PEER_HELPER_ASSESSMENT_QUESTIONS[index]?.correctAnswer) {
        correctCount++;
      }
    });

    return {
      correct: correctCount,
      total: PEER_HELPER_ASSESSMENT_QUESTIONS.length,
      percentage: Math.round((correctCount / PEER_HELPER_ASSESSMENT_QUESTIONS.length) * 100)
    };
  };

  if (currentStep === 'guidelines') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpenIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Peer Helper Certification Program
              </h1>
              <p className="text-gray-600">
                Study the guidelines carefully before taking the assessment
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">
                📋 Assessment Requirements
              </h2>
              <ul className="space-y-2 text-blue-700">
                <li>• Study the guidelines thoroughly</li>
                <li>• Answer 20 multiple-choice questions</li>
                <li>• Achieve minimum 80% score to pass</li>
                <li>• Complete within 15 minutes</li>
                <li>• You have only one attempt</li>
              </ul>
            </div>

            <div className="prose max-w-none">
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Guidelines</h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {PEER_HELPER_GUIDELINES}
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={startAssessment}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Start Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'assessment') {
    const question = PEER_HELPER_ASSESSMENT_QUESTIONS[currentQuestion];
    const progress = ((currentQuestion + 1) / PEER_HELPER_ASSESSMENT_QUESTIONS.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Peer Helper Assessment
                </h1>
                <p className="text-gray-600">
                  Question {currentQuestion + 1} of {PEER_HELPER_ASSESSMENT_QUESTIONS.length}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-orange-600">
                  <ClockIcon className="w-5 h-5 mr-1" />
                  <span className="font-mono font-semibold">
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-2">
                <span className="text-sm font-medium text-blue-800">
                  {question.category}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {question.question}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedAnswer === index
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        selectedAnswer === index
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedAnswer === index && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                      <span className="text-gray-800">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <div></div>
              <button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                  selectedAnswer !== null
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {currentQuestion === PEER_HELPER_ASSESSMENT_QUESTIONS.length - 1 
                  ? 'Submit Assessment' 
                  : 'Next Question'
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'results') {
    const score = getScore();
    const passed = score.percentage >= (PASSING_SCORE * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
              passed ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {passed ? (
                <CheckCircleIcon className="w-12 h-12 text-green-600" />
              ) : (
                <XCircleIcon className="w-12 h-12 text-red-600" />
              )}
            </div>

            <h1 className={`text-3xl font-bold mb-4 ${
              passed ? 'text-green-800' : 'text-red-800'
            }`}>
              {passed ? 'Congratulations!' : 'Assessment Not Passed'}
            </h1>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {score.percentage}%
              </div>
              <div className="text-gray-600">
                {score.correct} out of {score.total} questions correct
              </div>
              <div className="text-sm text-gray-500 mt-2">
                Required: {PASSING_SCORE * 100}% or higher
              </div>
            </div>

            {passed ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-green-800 mb-2">
                  ✅ You're now qualified as a Peer Helper!
                </h3>
                <p className="text-green-700 text-sm">
                  You'll be redirected to your dashboard shortly. Welcome to the MindHelp peer support team!
                </p>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <div className="flex items-start">
                  <ExclamationTriangleIcon className="w-6 h-6 text-red-600 mr-3 mt-1" />
                  <div className="text-left">
                    <h3 className="font-semibold text-red-800 mb-2">
                      Unfortunately, you didn't meet the minimum requirements
                    </h3>
                    <p className="text-red-700 text-sm mb-2">
                      To become a peer helper, you need to score at least 80%. 
                      Please review the guidelines and apply again after gaining more knowledge.
                    </p>
                    <p className="text-red-600 text-sm">
                      You'll be redirected to the login page shortly.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default PeerHelperAssessment;
