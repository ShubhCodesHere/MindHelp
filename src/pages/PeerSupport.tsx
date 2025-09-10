import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  UserGroupIcon, 
  VideoCameraIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  ClockIcon,
  CalendarIcon,
  HeartIcon,
  UserIcon
} from '@heroicons/react/24/outline';

const PeerSupport: React.FC = () => {
  const { user } = useAuth();
  
  // Set default tab based on user role
  const getDefaultTab = () => {
    switch (user?.role) {
      case 'student':
        return 'find-help';
      case 'helper':
      case 'psychiatrist':
        return 'be-helper';
      default:
        return 'find-help';
    }
  };

  const [activeTab, setActiveTab] = useState<'find-help' | 'sessions' | 'be-helper'>(getDefaultTab());

  // Get available tabs based on user role
  const getAvailableTabs = () => {
    const tabs = [];
    
    if (user?.role === 'student') {
      tabs.push(
        { id: 'find-help', label: 'Get Support', icon: UserGroupIcon },
        { id: 'sessions', label: 'My Sessions', icon: CalendarIcon }
      );
    }
    
    if (user?.role === 'helper' || user?.role === 'psychiatrist') {
      tabs.push(
        { id: 'be-helper', label: user?.role === 'psychiatrist' ? 'Patient Management' : 'Help Others', icon: HeartIcon },
        { id: 'sessions', label: 'My Sessions', icon: CalendarIcon }
      );
    }
    
    return tabs;
  };

  const availableTabs = getAvailableTabs();

  const availableHelpers = [
    { id: '1', name: 'Sarah M.', rating: 4.8, helpCount: 45, isOnline: true, specialties: ['Anxiety', 'Study Stress'] },
    { id: '2', name: 'Alex K.', rating: 4.9, helpCount: 62, isOnline: true, specialties: ['Depression', 'Social Anxiety'] },
    { id: '3', name: 'Jordan P.', rating: 4.7, helpCount: 38, isOnline: false, specialties: ['Sleep Issues', 'Time Management'] },
  ];

  const professionals = [
    { id: '1', name: 'Dr. Emily Chen', title: 'Clinical Psychologist', rating: 4.9, nextAvailable: 'Today 3:00 PM' },
    { id: '2', name: 'Dr. Michael Rodriguez', title: 'Psychiatrist', rating: 4.8, nextAvailable: 'Tomorrow 10:00 AM' },
    { id: '3', name: 'Dr. Aisha Patel', title: 'Counselor', rating: 4.9, nextAvailable: 'Today 5:00 PM' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dynamic Header based on role */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {user?.role === 'student' && 'Support Network'}
            {user?.role === 'helper' && 'Helper Dashboard'}
            {user?.role === 'psychiatrist' && 'Professional Dashboard'}
          </h1>
          <p className="text-gray-600 mt-2">
            {user?.role === 'student' && 'Connect with peer helpers and mental health professionals'}
            {user?.role === 'helper' && 'Help fellow students and manage your support sessions'}
            {user?.role === 'psychiatrist' && 'Manage patient appointments and high-priority cases'}
          </p>
        </div>

        {/* Dynamic Tabs */}
        <div className="flex bg-white rounded-lg p-1 mb-8 shadow-sm border border-gray-200">
          {availableTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'find-help' | 'sessions' | 'be-helper')}
                className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id ? 'bg-primary-100 text-primary-700' : 'text-gray-600'
                }`}
              >
                <Icon className="w-5 h-5 inline mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Get Support Tab */}
        {activeTab === 'find-help' && (
          <div className="space-y-8">
            {/* Emergency Contact */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-red-800 font-semibold mb-2">Need immediate help?</h3>
              <p className="text-red-700 text-sm mb-4">If you're in crisis, please reach out immediately:</p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                  <PhoneIcon className="w-4 h-4 inline mr-2" />
                  Emergency Hotline
                </button>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                  <ChatBubbleLeftRightIcon className="w-4 h-4 inline mr-2" />
                  Crisis Chat
                </button>
              </div>
            </div>

            {/* Peer Helpers */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Peer Helpers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableHelpers.map((helper) => (
                  <div key={helper.id} className="card">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <UserGroupIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{helper.name}</h3>
                          <div className="flex items-center space-x-1">
                            <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">{helper.rating}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`w-3 h-3 rounded-full ${helper.isOnline ? 'bg-green-400' : 'bg-gray-300'}`} />
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600">Helped {helper.helpCount} students</p>
                      <div className="flex flex-wrap gap-1">
                        {helper.specialties.map((specialty) => (
                          <span key={specialty} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button 
                        className="flex-1 btn-primary text-sm"
                        disabled={!helper.isOnline}
                      >
                        <ChatBubbleLeftRightIcon className="w-4 h-4 inline mr-1" />
                        Chat Now
                      </button>
                      <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <VideoCameraIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mental Health Professionals */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Mental Health Professionals</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {professionals.map((professional) => (
                  <div key={professional.id} className="card">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                        <UserIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{professional.name}</h3>
                        <p className="text-sm text-gray-600">{professional.title}</p>
                        <div className="flex items-center space-x-1">
                          <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{professional.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <ClockIcon className="w-4 h-4" />
                        <span>Next available: {professional.nextAvailable}</span>
                      </div>
                    </div>

                    <button className="w-full btn-primary">
                      <CalendarIcon className="w-4 h-4 inline mr-2" />
                      Book Session
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Other tabs content would go here */}
        {activeTab === 'sessions' && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your Sessions</h3>
            <p className="text-gray-600">Session management interface would go here</p>
          </div>
        )}

        {activeTab === 'be-helper' && (
          <div className="space-y-6">
            {user?.role === 'helper' && (
              <>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-blue-800 font-semibold mb-2">Helper Queue</h3>
                  <p className="text-blue-700 text-sm mb-4">Students waiting for support:</p>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Anonymous Student</p>
                          <p className="text-sm text-gray-600">Anxiety about upcoming exams</p>
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Medium Priority</span>
                        </div>
                        <button className="btn-primary">Accept</button>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Anonymous Student</p>
                          <p className="text-sm text-gray-600">Feeling overwhelmed with coursework</p>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Low Priority</span>
                        </div>
                        <button className="btn-primary">Accept</button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {user?.role === 'psychiatrist' && (
              <>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="text-red-800 font-semibold mb-2">High Priority Cases</h3>
                  <p className="text-red-700 text-sm mb-4">Urgent cases requiring immediate attention:</p>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-lg border-l-4 border-red-500">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Patient #1234</p>
                          <p className="text-sm text-gray-600">PHQ-9 Score: 18 (Severe Depression)</p>
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Urgent</span>
                        </div>
                        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                          Immediate Session
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="text-purple-800 font-semibold mb-2">Scheduled Appointments</h3>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Patient #5678</p>
                          <p className="text-sm text-gray-600">Follow-up session - Anxiety treatment</p>
                          <p className="text-xs text-gray-500">Today 3:00 PM</p>
                        </div>
                        <button className="btn-primary">Join Session</button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PeerSupport;
