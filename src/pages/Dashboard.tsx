import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import WellnessVideos from '../components/WellnessVideos';
import { 
  ChatBubbleLeftRightIcon, 
  UserGroupIcon, 
  HeartIcon, 
  CalendarIcon,
  TrophyIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  ShoppingBagIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface DashboardSession {
  type: string;
  with: string;
  time: string;
  status: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Get stored wellness score
  const getWellnessScore = () => {
    if (user) {
      const storedScore = localStorage.getItem(`wellnessScore_${user.email}`);
      return storedScore ? parseInt(storedScore) : 78; // Default to 78 if no assessment taken
    }
    return 78;
  };

  const getAssessmentDate = () => {
    if (user) {
      const assessmentDate = localStorage.getItem(`assessmentDate_${user.email}`);
      if (assessmentDate) {
        const date = new Date(assessmentDate);
        return date.toLocaleDateString();
      }
    }
    return null;
  };

  const wellnessScore = getWellnessScore();
  const assessmentDate = getAssessmentDate();

  // Get scheduled sessions (including auto-scheduled ones)
  const getScheduledSessions = () => {
    const sessions = JSON.parse(localStorage.getItem('userSessions') || '[]');
    return sessions;
  };

  const scheduledSessions = getScheduledSessions();

  // Define role-specific quick actions
  const getQuickActionsForRole = () => {
    switch (user?.role) {
      case 'student':
        return [
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
          {
            title: 'Token Store',
            description: 'Redeem tokens for wellness merchandise and books',
            href: '/store',
            icon: ShoppingBagIcon,
            color: 'bg-yellow-500',
            urgent: false,
          },
        ];

      case 'helper':
        return [
          {
            title: 'Help Students',
            description: 'Respond to student support requests',
            href: '/peer-support',
            icon: UserGroupIcon,
            color: 'bg-green-500',
            urgent: false,
          },
          {
            title: 'Community Forum',
            description: 'Engage with the community and share experiences',
            href: '/community',
            icon: ChatBubbleLeftRightIcon,
            color: 'bg-blue-500',
            urgent: false,
          },
          {
            title: 'Token Store',
            description: 'Redeem tokens for wellness merchandise and books',
            href: '/store',
            icon: ShoppingBagIcon,
            color: 'bg-yellow-500',
            urgent: false,
          },
        ];

      case 'psychiatrist':
        return [
          {
            title: 'Patient Sessions',
            description: 'Manage appointments and patient interactions',
            href: '/peer-support',
            icon: CalendarIcon,
            color: 'bg-purple-500',
            urgent: false,
          },
          {
            title: 'Crisis Cases',
            description: 'Handle high-priority mental health cases',
            href: '/peer-support',
            icon: ExclamationTriangleIcon,
            color: 'bg-red-500',
            urgent: true,
          },
        ];

      case 'admin':
        return [
          {
            title: 'Store Management',
            description: 'Manage products, inventory, and view analytics',
            href: '/store-management',
            icon: ShoppingBagIcon,
            color: 'bg-purple-500',
            urgent: false,
          },
          {
            title: 'User Management',
            description: 'Monitor user activity and platform health',
            href: '/dashboard',
            icon: UserGroupIcon,
            color: 'bg-blue-500',
            urgent: false,
          },
          {
            title: 'System Analytics',
            description: 'View platform metrics and performance data',
            href: '/dashboard',
            icon: ChartBarIcon,
            color: 'bg-green-500',
            urgent: false,
          },
        ];

      case 'guest':
        return [
          {
            title: 'Take Wellness Assessment',
            description: 'Complete our mental health assessment to get started',
            href: '/assessment',
            icon: ClockIcon,
            color: 'bg-indigo-500',
            urgent: true,
          },
          {
            title: 'Connect with Peer',
            description: 'Get anonymous support from trained helpers',
            href: '/peer-support',
            icon: UserGroupIcon,
            color: 'bg-green-500',
            urgent: false,
          },
          {
            title: 'Explore Wellness Content',
            description: 'Browse guided meditations and breathing exercises',
            href: '/wellness',
            icon: HeartIcon,
            color: 'bg-pink-500',
            urgent: false,
          },
          {
            title: 'Community Forum',
            description: 'Read and explore community discussions',
            href: '/community',
            icon: ChatBubbleLeftRightIcon,
            color: 'bg-blue-500',
            urgent: false,
          },
        ];

      default:
        return [
          {
            title: 'Get Support',
            description: 'Connect with mental health resources',
            href: '/peer-support',
            icon: UserGroupIcon,
            color: 'bg-green-500',
            urgent: false,
          },
        ];
    }
  };

  const quickActions = getQuickActionsForRole();

  const recentActivity = [
    { type: 'session', message: 'Completed chat with peer helper', time: '2 hours ago', status: 'completed' },
    { type: 'achievement', message: 'Earned "First Step" achievement', time: '1 day ago', status: 'new' },
    { type: 'wellness', message: 'Completed breathing exercise', time: '2 days ago', status: 'completed' },
  ];

  const upcomingSessions = [
    { type: 'Video Call', with: 'Dr. Kavya Patel', time: 'Today, 3:00 PM', status: 'confirmed' },
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {getWelcomeMessage()}, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            {user?.role === 'student' && "How are you feeling today? We're here to support you."}
            {user?.role === 'helper' && "Ready to help fellow students? Check your pending support requests."}
            {user?.role === 'psychiatrist' && "Your patients are waiting. Review high-priority cases and appointments."}
            {user?.role === 'admin' && "Monitor platform health and manage critical alerts."}
            {user?.role === 'guest' && "Welcome to MindHelp! Complete your wellness assessment to get personalized support."}
          </p>
        </div>

        {/* Crisis Alert */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="w-6 h-6 text-red-600 mr-3" />
            <div>
              <h3 className="text-red-800 font-medium">Need immediate help?</h3>
              <p className="text-red-700 text-sm mt-1">
                If you're having thoughts of self-harm, please contact emergency services or call the National Suicide Prevention Lifeline: 988
              </p>
            </div>
          </div>
        </div>

        {/* Role-Specific Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Tokens only for students and helpers */}
          {(user?.role === 'student' || user?.role === 'helper') && (
            <div className="card">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <TrophyIcon className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Tokens Earned</p>
                  <p className="text-2xl font-bold text-gray-900">{user?.tokens}</p>
                </div>
              </div>
            </div>
          )}

          {/* Student-specific stats */}
          {user?.role === 'student' && (
            <>
              <div className="card">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <UserGroupIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Sessions Completed</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <CalendarIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Days Active</p>
                    <p className="text-2xl font-bold text-gray-900">28</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <HeartIcon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">
                      Wellness Score {assessmentDate && `(${assessmentDate})`}
                    </p>
                    <p className={`text-2xl font-bold ${
                      wellnessScore >= 75 ? 'text-green-600' :
                      wellnessScore >= 50 ? 'text-yellow-600' :
                      wellnessScore >= 30 ? 'text-orange-600' :
                      'text-red-600'
                    }`}>{wellnessScore}%</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Helper-specific stats */}
          {user?.role === 'helper' && (
            <>
              <div className="card">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <UserGroupIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Students Helped</p>
                    <p className="text-2xl font-bold text-gray-900">{user?.helpCount || 0}</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <TrophyIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Average Rating</p>
                    <p className="text-2xl font-bold text-gray-900">{user?.rating || 0}⭐</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <ClockIcon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Response Time</p>
                    <p className="text-2xl font-bold text-gray-900">2.3m</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Psychiatrist-specific stats */}
          {user?.role === 'psychiatrist' && (
            <>
              <div className="card">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <UserGroupIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Patients Treated</p>
                    <p className="text-2xl font-bold text-gray-900">47</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Critical Cases</p>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <CalendarIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Today's Sessions</p>
                    <p className="text-2xl font-bold text-gray-900">6</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Admin-specific stats */}
          {user?.role === 'admin' && (
            <>
              <div className="card">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <UserGroupIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Active Users</p>
                    <p className="text-2xl font-bold text-gray-900">1,247</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Critical Alerts</p>
                    <p className="text-2xl font-bold text-gray-900">2</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <ClockIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">System Uptime</p>
                    <p className="text-2xl font-bold text-gray-900">99.9%</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Guest-specific stats - all show 0 */}
          {user?.role === 'guest' && (
            <>
              <div className="card">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <TrophyIcon className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Tokens Earned</p>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <UserGroupIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Sessions Completed</p>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <CalendarIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Days Active</p>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <HeartIcon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">
                      Wellness Score {assessmentDate && `(${assessmentDate})`}
                    </p>
                    {localStorage.getItem(`wellnessScore_${user.email}`) ? (
                      <p className={`text-2xl font-bold ${
                        wellnessScore >= 75 ? 'text-green-600' :
                        wellnessScore >= 50 ? 'text-yellow-600' :
                        wellnessScore >= 30 ? 'text-orange-600' :
                        'text-red-600'
                      }`}>{wellnessScore}%</p>
                    ) : (
                      <p className="text-2xl font-bold text-gray-600">Not assessed</p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Scheduled Sessions Alert for Low Wellness Score */}
        {(user?.role === 'student' || user?.role === 'guest') && wellnessScore < 30 && scheduledSessions.length > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
            <div className="flex items-start">
              <ExclamationTriangleIcon className="w-6 h-6 text-orange-600 mr-3 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-orange-800 mb-2">
                  Wellness Support Scheduled
                </h3>
                <p className="text-orange-700 mb-4">
                  Based on your wellness assessment, we've scheduled priority support sessions to help you feel better.
                </p>
                <div className="space-y-3">
                  {scheduledSessions.slice(0, 2).map((session: DashboardSession, index: number) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-orange-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{session.type}</h4>
                          <p className="text-sm text-gray-600">with {session.with}</p>
                          <p className="text-sm text-orange-600 font-medium">{session.time}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            session.status === 'auto-scheduled' 
                              ? 'bg-orange-100 text-orange-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {session.status === 'auto-scheduled' ? 'Priority' : session.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link
                    to="/peer-support"
                    className="inline-flex items-center text-orange-700 hover:text-orange-900 font-medium"
                  >
                    View all sessions →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Wellness Score Improvement Tips for Students */}
        {user?.role === 'student' && wellnessScore < 50 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-start">
              <HeartIcon className="w-6 h-6 text-blue-600 mr-3 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  Ways to Improve Your Wellness
                </h3>
                <p className="text-blue-700 mb-4">
                  Here are some personalized suggestions to help boost your mental wellness:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link
                    to="/wellness"
                    className="bg-white rounded-lg p-4 border border-blue-200 hover:border-blue-300 transition-colors"
                  >
                    <h4 className="font-semibold text-gray-900 mb-1">🧘 Try Meditation</h4>
                    <p className="text-sm text-gray-600">Start with 5-minute guided sessions</p>
                  </Link>
                  <Link
                    to="/community"
                    className="bg-white rounded-lg p-4 border border-blue-200 hover:border-blue-300 transition-colors"
                  >
                    <h4 className="font-semibold text-gray-900 mb-1">💬 Join Community</h4>
                    <p className="text-sm text-gray-600">Connect with others who understand</p>
                  </Link>
                  <Link
                    to="/chatbot"
                    className="bg-white rounded-lg p-4 border border-blue-200 hover:border-blue-300 transition-colors"
                  >
                    <h4 className="font-semibold text-gray-900 mb-1">🤖 Talk to AI Assistant</h4>
                    <p className="text-sm text-gray-600">Get instant coping strategies</p>
                  </Link>
                  <Link
                    to="/peer-support"
                    className="bg-white rounded-lg p-4 border border-blue-200 hover:border-blue-300 transition-colors"
                  >
                    <h4 className="font-semibold text-gray-900 mb-1">🤝 Peer Support</h4>
                    <p className="text-sm text-gray-600">Connect with trained helpers</p>
                  </Link>
                  <Link
                    to="/assessment"
                    className="bg-white rounded-lg p-4 border border-blue-200 hover:border-blue-300 transition-colors"
                  >
                    <h4 className="font-semibold text-gray-900 mb-1">📊 Retake Assessment</h4>
                    <p className="text-sm text-gray-600">Update your wellness score</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={index}
                    to={action.href}
                    className={`card hover:shadow-lg transition-shadow duration-200 ${
                      action.urgent ? 'ring-2 ring-red-200 bg-red-50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${action.color}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 flex items-center">
                          {action.title}
                          {action.urgent && (
                            <span className="ml-2 px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                              Priority
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Recent Activity */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="card">
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.status === 'completed' ? 'bg-green-400' : 'bg-blue-400'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      {activity.status === 'completed' ? (
                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      ) : (
                        <ClockIcon className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Wellness Videos - Show for low wellness scores */}
            {wellnessScore < 30 && (
              <div className="mt-8">
                <WellnessVideos />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            {/* Upcoming Sessions */}
            <div className="card mb-6">
              <h3 className="font-medium text-gray-900 mb-4">Upcoming Sessions</h3>
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

            {/* Mood Tracker - Only for Students */}
            {user?.role === 'student' && (
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
            )}

            {/* Role-specific sidebar content */}
            {user?.role === 'helper' && (
              <div className="card">
                <h3 className="font-medium text-gray-900 mb-4">Helper Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Pending Requests</span>
                    <span className="font-medium">4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Active Chats</span>
                    <span className="font-medium">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">This Week</span>
                    <span className="font-medium">12 helped</span>
                  </div>
                </div>
              </div>
            )}

            {user?.role === 'psychiatrist' && (
              <div className="card">
                <h3 className="font-medium text-gray-900 mb-4">Patient Overview</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Next Appointment</span>
                    <span className="font-medium">3:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Urgent Cases</span>
                    <span className="font-medium text-red-600">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Today's Load</span>
                    <span className="font-medium">6 sessions</span>
                  </div>
                </div>
              </div>
            )}

            {user?.role === 'admin' && (
              <div className="card">
                <h3 className="font-medium text-gray-900 mb-4">Platform Health</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">System Status</span>
                    <span className="font-medium text-green-600">Healthy</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Active Sessions</span>
                    <span className="font-medium">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Response Time</span>
                    <span className="font-medium">98ms</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
