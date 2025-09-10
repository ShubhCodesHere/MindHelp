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

  const getAchievementsForRole = () => {
    switch (user?.role) {
      case 'student':
        return [
          { id: '1', title: 'First Step', description: 'Completed your first session', icon: '🌟', earned: true },
          { id: '2', title: 'Wellness Warrior', description: 'Completed 20 wellness activities', icon: '�', earned: false },
          { id: '3', title: 'Consistent User', description: 'Used MindLink for 7 days straight', icon: '📅', earned: true },
          { id: '4', title: 'Community Contributor', description: 'Made 5 helpful posts', icon: '💬', earned: false },
          { id: '5', title: 'Progress Tracker', description: 'Logged mood for 30 days', icon: '📊', earned: false },
        ];
      case 'helper':
        return [
          { id: '1', title: 'Helper Hero', description: 'Helped 10 fellow students', icon: '🦸', earned: true },
          { id: '2', title: 'Top Rated', description: 'Maintained 4.5+ star rating', icon: '⭐', earned: true },
          { id: '3', title: 'Quick Responder', description: 'Average response time under 3 minutes', icon: '⚡', earned: true },
          { id: '4', title: 'Trusted Helper', description: 'Completed 50+ support sessions', icon: '🎖️', earned: false },
          { id: '5', title: 'Night Owl', description: 'Provided late-night support', icon: '🦉', earned: false },
        ];
      case 'psychiatrist':
        return [
          { id: '1', title: 'Professional License', description: 'Verified mental health professional', icon: '👨‍⚕️', earned: true },
          { id: '2', title: 'Crisis Expert', description: 'Successfully handled 10+ critical cases', icon: '🚨', earned: true },
          { id: '3', title: 'Patient Advocate', description: 'Maintained excellent patient outcomes', icon: '❤️', earned: true },
          { id: '4', title: 'Mentor', description: 'Trained 5+ peer helpers', icon: '🎓', earned: false },
          { id: '5', title: 'Research Contributor', description: 'Published mental health research', icon: '📚', earned: false },
        ];
      case 'admin':
        return [
          { id: '1', title: 'Platform Guardian', description: 'Maintained 99%+ uptime', icon: '🛡️', earned: true },
          { id: '2', title: 'Crisis Manager', description: 'Handled emergency situations', icon: '🚨', earned: true },
          { id: '3', title: 'Data Protector', description: 'Ensured user privacy and security', icon: '🔒', earned: true },
          { id: '4', title: 'Community Builder', description: 'Grew platform to 1000+ users', icon: '🏗️', earned: true },
          { id: '5', title: 'Innovation Leader', description: 'Implemented new platform features', icon: '💡', earned: false },
        ];
      case 'guest':
        return [
          { id: '1', title: 'Welcome Visitor', description: 'Started exploring MindHelp', icon: '👋', earned: true },
          { id: '2', title: 'Assessment Complete', description: 'Completed wellness assessment', icon: '📋', earned: false },
          { id: '3', title: 'Explorer', description: 'Visited all available sections', icon: '🗺️', earned: false },
        ];
      default:
        return [
          { id: '1', title: 'Getting Started', description: 'Created your account', icon: '🌟', earned: true },
        ];
    }
  };

  const achievements = getAchievementsForRole();

  const getStatsForRole = () => {
    switch (user?.role) {
      case 'student':
        return [
          { label: 'Sessions Completed', value: '12', icon: UserGroupIcon },
          { label: 'Tokens Earned', value: user?.tokens || '0', icon: TrophyIcon },
          { label: 'Days Active', value: '28', icon: HeartIcon },
          { label: 'Wellness Activities', value: '15', icon: StarIcon },
        ];
      case 'helper':
        return [
          { label: 'Students Helped', value: user?.helpCount || '0', icon: UserGroupIcon },
          { label: 'Average Rating', value: `${user?.rating || 0}⭐`, icon: StarIcon },
          { label: 'Tokens Earned', value: user?.tokens || '0', icon: TrophyIcon },
          { label: 'Response Time', value: '2.3m', icon: HeartIcon },
        ];
      case 'psychiatrist':
        return [
          { label: 'Patients Treated', value: '47', icon: UserGroupIcon },
          { label: 'Professional Rating', value: '4.9⭐', icon: StarIcon },
          { label: 'Critical Cases Resolved', value: '12', icon: TrophyIcon },
          { label: 'Years Experience', value: '8', icon: HeartIcon },
        ];
      case 'admin':
        return [
          { label: 'Platform Uptime', value: '99.9%', icon: UserGroupIcon },
          { label: 'Users Managed', value: '1,247', icon: StarIcon },
          { label: 'Crisis Interventions', value: '89', icon: TrophyIcon },
          { label: 'System Alerts', value: '2', icon: HeartIcon },
        ];
      case 'guest':
        return [
          { label: 'Sessions Completed', value: '0', icon: UserGroupIcon },
          { label: 'Tokens Earned', value: '0', icon: TrophyIcon },
          { label: 'Days Active', value: '0', icon: HeartIcon },
          { label: 'Assessment Status', value: 'Pending', icon: StarIcon },
        ];
      default:
        return [
          { label: 'Tokens Earned', value: user?.tokens || '0', icon: TrophyIcon },
        ];
    }
  };

  const currentStats = getStatsForRole();

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
            {/* Tokens - Only for students and helpers */}
            {user?.role && ['student', 'helper'].includes(user.role) && (
              <div className="text-center">
                <div className="bg-yellow-50 px-4 py-2 rounded-lg">
                  <p className="text-yellow-600 font-semibold text-lg">🪙 {user?.tokens}</p>
                  <p className="text-yellow-600 text-sm">Tokens</p>
                </div>
              </div>
            )}
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
            {/* Token Balance - Only for students and helpers */}
            {user?.role && ['student', 'helper'].includes(user.role) && (
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
            )}

            {/* Recent Activity */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      {user?.role === 'admin' ? 'System maintenance completed' :
                       user?.role === 'psychiatrist' ? 'Patient consultation completed' :
                       'Completed breathing exercise'}
                    </p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                {/* Token activity only for students and helpers */}
                {user?.role && ['student', 'helper'].includes(user.role) && (
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">Earned 5 tokens</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      {user?.role === 'admin' ? 'Managed user reports' :
                       user?.role === 'psychiatrist' ? 'Updated patient records' :
                       'Posted in community'}
                    </p>
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
