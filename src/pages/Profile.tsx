import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  UserIcon, 
  TrophyIcon, 
  CogIcon,
  StarIcon,
  UserGroupIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

const Profile: React.FC = () => {
  const { user } = useAuth();

  const achievements = [
    { id: '1', title: 'First Step', description: 'Completed your first session', icon: '🌟', earned: true },
    { id: '2', title: 'Helper Hero', description: 'Helped 10 fellow students', icon: '🦸', earned: user?.role === 'helper' },
    { id: '3', title: 'Consistent User', description: 'Used MindLink for 7 days straight', icon: '📅', earned: true },
    { id: '4', title: 'Community Contributor', description: 'Made 5 helpful posts', icon: '💬', earned: false },
    { id: '5', title: 'Wellness Warrior', description: 'Completed 20 wellness activities', icon: '🧘', earned: false },
  ];

  const stats = {
    student: [
      { label: 'Sessions Completed', value: '12', icon: UserGroupIcon },
      { label: 'Tokens Earned', value: user?.tokens || '0', icon: TrophyIcon },
      { label: 'Days Active', value: '28', icon: HeartIcon },
      { label: 'Wellness Activities', value: '15', icon: StarIcon },
    ],
    helper: [
      { label: 'Students Helped', value: user?.helpCount || '0', icon: UserGroupIcon },
      { label: 'Average Rating', value: `${user?.rating || 0}⭐`, icon: StarIcon },
      { label: 'Tokens Earned', value: user?.tokens || '0', icon: TrophyIcon },
      { label: 'Total Sessions', value: '45', icon: HeartIcon },
    ],
  };

  const currentStats = user?.role === 'helper' ? stats.helper : stats.student;

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center">
              <UserIcon className="w-12 h-12 text-white" />
            </div>
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
              <p className="text-gray-600 capitalize">{user?.role}</p>
              {user?.role === 'helper' && (
                <div className="flex items-center justify-center sm:justify-start space-x-1 mt-2">
                  <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{user?.rating} rating</span>
                </div>
              )}
              <p className="text-sm text-gray-500 mt-2">{user?.email}</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-50 px-4 py-2 rounded-lg">
                <p className="text-yellow-600 font-semibold text-lg">🪙 {user?.tokens}</p>
                <p className="text-yellow-600 text-sm">Tokens</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Stats</h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {currentStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="card text-center">
                    <div className="flex justify-center mb-3">
                      <div className="p-3 bg-primary-100 rounded-lg">
                        <Icon className="w-6 h-6 text-primary-600" />
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Achievements */}
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Achievements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`card ${
                    achievement.earned
                      ? 'border-yellow-200 bg-yellow-50'
                      : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                    {achievement.earned && (
                      <div className="text-yellow-500">
                        <TrophyIcon className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Token Balance */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Token Balance</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">🪙 {user?.tokens}</div>
                <p className="text-sm text-gray-600 mb-4">
                  Earn tokens by helping others and engaging with the community
                </p>
                <button className="w-full btn-primary">Redeem Tokens</button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Completed breathing exercise</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Earned 5 tokens</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Posted in community</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <CogIcon className="w-5 h-5 mr-2" />
                Settings
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                  Notification Preferences
                </button>
                <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                  Privacy Settings
                </button>
                <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                  Account Security
                </button>
                <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                  Data Export
                </button>
              </div>
            </div>

            {/* Help & Support */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Help & Support</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                  Help Center
                </button>
                <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                  Contact Support
                </button>
                <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                  Report an Issue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
