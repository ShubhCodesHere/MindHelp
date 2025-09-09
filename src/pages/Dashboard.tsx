import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ChatBubbleLeftRightIcon, 
  UserGroupIcon, 
  HeartIcon, 
  CalendarIcon,
  TrophyIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      title: 'Talk to AI Assistant',
      description: 'Get immediate support and coping strategies',
      href: '/chatbot',
      icon: ChatBubbleLeftRightIcon,
      color: 'bg-blue-500',
      urgent: false,
    },
    {
      title: 'Connect with Peer',
      description: 'Anonymous 1-on-1 support from trained helpers',
      href: '/peer-support',
      icon: UserGroupIcon,
      color: 'bg-green-500',
      urgent: false,
    },
    {
      title: 'Book Professional',
      description: 'Schedule with licensed mental health professionals',
      href: '/peer-support',
      icon: CalendarIcon,
      color: 'bg-purple-500',
      urgent: true,
    },
    {
      title: 'Wellness Content',
      description: 'Guided meditations, breathing exercises & more',
      href: '/wellness',
      icon: HeartIcon,
      color: 'bg-pink-500',
      urgent: false,
    },
  ];

  const recentActivity = [
    { type: 'session', message: 'Completed chat with peer helper', time: '2 hours ago', status: 'completed' },
    { type: 'achievement', message: 'Earned "First Step" achievement', time: '1 day ago', status: 'new' },
    { type: 'wellness', message: 'Completed breathing exercise', time: '2 days ago', status: 'completed' },
  ];

  const upcomingSessions = [
    { type: 'Video Call', with: 'Dr. Sarah Johnson', time: 'Today, 3:00 PM', status: 'confirmed' },
    { type: 'Peer Chat', with: 'Anonymous Helper', time: 'Tomorrow, 10:00 AM', status: 'pending' },
  ];

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Welcome Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {getWelcomeMessage()}, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            {user?.role === 'student' && "How are you feeling today? We're here to support you."}
            {user?.role === 'helper' && "Ready to help fellow students? You're making a difference!"}
            {user?.role === 'psychiatrist' && "Your patients are waiting. Let's make today better for them."}
          </p>
        </div>

        {/* Crisis Alert */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8">
          <div className="flex items-start">
            <ExclamationTriangleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-red-800 font-medium text-sm sm:text-base">Need immediate help?</h3>
              <p className="text-red-700 text-xs sm:text-sm mt-1">
                If you're having thoughts of self-harm, please contact emergency services or call the National Suicide Prevention Lifeline: 988
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 bg-yellow-100 rounded-lg">
                <TrophyIcon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
              </div>
              <div className="ml-3 sm:ml-4 min-w-0">
                <p className="text-xs sm:text-sm text-gray-600">Tokens Earned</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{user?.tokens}</p>
              </div>
            </div>
          </div>

          {user?.role === 'helper' && (
            <>
              <div className="card">
                <div className="flex items-center">
                  <div className="p-2 sm:p-3 bg-green-100 rounded-lg">
                    <UserGroupIcon className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  </div>
                  <div className="ml-3 sm:ml-4 min-w-0">
                    <p className="text-xs sm:text-sm text-gray-600">Students Helped</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{user?.helpCount || 0}</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center">
                  <div className="p-2 sm:p-3 bg-blue-100 rounded-lg">
                    <TrophyIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <div className="ml-3 sm:ml-4 min-w-0">
                    <p className="text-xs sm:text-sm text-gray-600">Average Rating</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{user?.rating || 0}⭐</p>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="card">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 bg-purple-100 rounded-lg">
                <HeartIcon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <div className="ml-3 sm:ml-4 min-w-0">
                <p className="text-xs sm:text-sm text-gray-600">Wellness Score</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">78%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
          {/* Quick Actions */}
          <div className="xl:col-span-2">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={index}
                    to={action.href}
                    className={`card hover:shadow-lg transition-shadow duration-200 touch-target ${
                      action.urgent ? 'ring-2 ring-red-200 bg-red-50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className={`p-2 sm:p-3 rounded-lg flex-shrink-0 ${action.color}`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 flex items-center text-sm sm:text-base">
                          {action.title}
                          {action.urgent && (
                            <span className="ml-2 px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full flex-shrink-0">
                              Priority
                            </span>
                          )}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">{action.description}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Recent Activity */}
            <div className="mt-6 sm:mt-8">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="card">
                <div className="space-y-3 sm:space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        activity.status === 'completed' ? 'bg-green-400' : 'bg-blue-400'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      {activity.status === 'completed' ? (
                        <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Sessions */}
            <div className="card">
              <h3 className="font-medium text-gray-900 mb-4 text-sm sm:text-base">Upcoming Sessions</h3>
              <div className="space-y-3">
                {upcomingSessions.map((session, index) => (
                  <div key={index} className="border-l-4 border-primary-400 pl-4">
                    <p className="font-medium text-gray-900">{session.type}</p>
                    <p className="text-sm text-gray-600">{session.with}</p>
                    <p className="text-xs text-gray-500 mt-1">{session.time}</p>
                    <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                      session.status === 'confirmed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {session.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mood Tracker */}
            <div className="card">
              <h3 className="font-medium text-gray-900 mb-4">How are you feeling?</h3>
              <div className="grid grid-cols-5 gap-2">
                {['😢', '😟', '😐', '🙂', '😊'].map((emoji, index) => (
                  <button
                    key={index}
                    className="p-3 text-2xl hover:bg-gray-100 rounded-lg transition-colors"
                    title={['Very Sad', 'Sad', 'Neutral', 'Happy', 'Very Happy'][index]}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center">
                Track your daily mood to identify patterns
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
