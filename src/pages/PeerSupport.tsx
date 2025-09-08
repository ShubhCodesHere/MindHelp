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
  const [activeTab, setActiveTab] = useState<'find-help' | 'sessions' | 'be-helper'>('find-help');

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
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Support Network</h1>
          <p className="text-gray-600 mt-2">Connect with peer helpers and mental health professionals</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-white rounded-lg p-1 mb-8 shadow-sm border border-gray-200">
          <button
            onClick={() => setActiveTab('find-help')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'find-help' ? 'bg-primary-100 text-primary-700' : 'text-gray-600'
            }`}
          >
            <UserGroupIcon className="w-5 h-5 inline mr-2" />
            Get Support
          </button>
          <button
            onClick={() => setActiveTab('sessions')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'sessions' ? 'bg-primary-100 text-primary-700' : 'text-gray-600'
            }`}
          >
            <CalendarIcon className="w-5 h-5 inline mr-2" />
            My Sessions
          </button>
          {(user?.role === 'helper' || user?.role === 'psychiatrist') && (
            <button
              onClick={() => setActiveTab('be-helper')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'be-helper' ? 'bg-primary-100 text-primary-700' : 'text-gray-600'
              }`}
            >
              <HeartIcon className="w-5 h-5 inline mr-2" />
              Help Others
            </button>
          )}
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
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Helper Dashboard</h3>
            <p className="text-gray-600">Helper interface and queue management would go here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeerSupport;
