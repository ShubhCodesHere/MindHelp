import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import WellnessAssessment from '../components/WellnessAssessment';
import { HeartIcon } from '@heroicons/react/24/outline';

const Assessment: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hasStarted, setHasStarted] = useState(false);

  const handleAssessmentComplete = (score: number) => {
    // Save the wellness score to the user's profile
    if (user) {
      // In a real app, this would be an API call
      localStorage.setItem(`wellnessScore_${user.id}`, score.toString());
      localStorage.setItem(`assessmentDate_${user.id}`, new Date().toISOString());
    }
    
    // Navigate to dashboard after a short delay
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };

  if (hasStarted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <WellnessAssessment onComplete={handleAssessmentComplete} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <HeartIcon className="w-8 h-8 text-indigo-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome to MindHelp! 🌟
        </h1>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          Before we get started, we'd like to understand how you're feeling today. 
          This quick 5-question assessment will help us personalize your experience 
          and provide the best support for your mental wellness journey.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">What to expect:</h3>
          <ul className="text-blue-700 text-sm space-y-1 text-left">
            <li>• 5 simple questions about your wellness</li>
            <li>• Emoji-based answers (no typing required)</li>
            <li>• Takes less than 2 minutes</li>
            <li>• Completely confidential</li>
          </ul>
        </div>

        <button
          onClick={() => setHasStarted(true)}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors mb-4"
        >
          Start Assessment
        </button>
        
        <button
          onClick={() => navigate('/dashboard')}
          className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors text-sm"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
};

export default Assessment;
