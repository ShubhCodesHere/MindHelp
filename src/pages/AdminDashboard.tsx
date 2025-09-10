import React from 'react';
import { 
  UserGroupIcon, 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

const AdminDashboard: React.FC = () => {
  const stats = [
    { label: 'Total Users', value: '2,847', change: '+12%', icon: UserGroupIcon, color: 'bg-blue-500' },
    { label: 'Active Sessions', value: '156', change: '+5%', icon: ClockIcon, color: 'bg-green-500' },
    { label: 'Completed Sessions', value: '1,234', change: '+18%', icon: CheckCircleIcon, color: 'bg-purple-500' },
    { label: 'High Priority Cases', value: '23', change: '-8%', icon: ExclamationTriangleIcon, color: 'bg-red-500' },
  ];

  const recentSessions = [
    { id: '1', student: 'Anonymous User', helper: 'Sarah M.', status: 'active', priority: 'high', duration: '25 min' },
    { id: '2', student: 'Anonymous User', helper: 'Dr. Chen', status: 'completed', priority: 'medium', duration: '45 min' },
    { id: '3', student: 'Anonymous User', helper: 'Alex K.', status: 'pending', priority: 'high', duration: '-' },
    { id: '4', student: 'Anonymous User', helper: 'Jordan P.', status: 'active', priority: 'low', duration: '15 min' },
  ];

  const alertRequests = [
    { id: '1', message: 'High PHQ-9 score detected (Score: 18)', user: 'Anonymous', time: '5 min ago', severity: 'urgent' },
    { id: '2', message: 'User reporting suicidal ideation', user: 'Anonymous', time: '12 min ago', severity: 'critical' },
    { id: '3', message: 'Multiple failed connection attempts', user: 'Anonymous', time: '30 min ago', severity: 'medium' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white';
      case 'urgent': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-3 sm:py-4 lg:py-8 overflow-x-hidden">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1 lg:mt-2 text-sm lg:text-base">Monitor platform health and user engagement</p>
        </div>

        {/* Critical Alerts - Mobile Optimized */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 lg:p-6 mb-6 lg:mb-8">
          <div className="flex items-center mb-3 lg:mb-4">
            <ExclamationTriangleIcon className="w-5 h-5 lg:w-6 lg:h-6 text-red-600 mr-2 lg:mr-3 flex-shrink-0" />
            <h2 className="text-base lg:text-lg font-semibold text-red-900">Critical Alerts</h2>
          </div>
          <div className="space-y-2 lg:space-y-3">
            {alertRequests.map((alert) => (
              <div key={alert.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-3 lg:p-4 rounded-lg space-y-2 sm:space-y-0">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm lg:text-base truncate sm:whitespace-normal">{alert.message}</p>
                  <p className="text-xs lg:text-sm text-gray-600">User: {alert.user} • {alert.time}</p>
                </div>
                <div className="flex items-center space-x-2 lg:space-x-3 flex-shrink-0">
                  <span className={`px-2 lg:px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </span>
                  <button className="btn-primary text-xs lg:text-sm px-3 py-1 lg:px-4 lg:py-2">Review</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid - Mobile Responsive */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="card p-3 lg:p-4">
                <div className="flex items-center">
                  <div className={`p-2 lg:p-3 rounded-lg ${stat.color} flex-shrink-0`}>
                    <Icon className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div className="ml-3 lg:ml-4 flex-1 min-w-0">
                    <p className="text-xs lg:text-sm text-gray-600 truncate">{stat.label}</p>
                    <div className="flex items-center space-x-1 lg:space-x-2">
                      <p className="text-lg lg:text-2xl font-bold text-gray-900">{stat.value}</p>
                      <span className={`text-xs lg:text-sm font-medium ${
                        stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {/* Recent Sessions - Mobile Optimized */}
          <div className="card p-4 lg:p-6">
            <div className="flex items-center justify-between mb-4 lg:mb-6">
              <h2 className="text-base lg:text-lg font-semibold text-gray-900">Recent Sessions</h2>
              <button className="text-primary-600 hover:text-primary-700 text-xs lg:text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-3 lg:space-y-4">
              {recentSessions.map((session) => (
                <div key={session.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 lg:p-4 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3 mb-2">
                      <p className="font-medium text-gray-900 text-sm lg:text-base truncate">{session.student}</p>
                      <span className="text-gray-500 hidden sm:inline">→</span>
                      <p className="text-gray-700 text-sm lg:text-base truncate">{session.helper}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 lg:gap-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                        {session.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(session.priority)}`}>
                        {session.priority} priority
                      </span>
                      <span className="text-xs lg:text-sm text-gray-600">{session.duration}</span>
                    </div>
                  </div>
                  <button className="btn-secondary text-xs lg:text-sm px-3 py-1 lg:px-4 lg:py-2 whitespace-nowrap">Monitor</button>
                </div>
              ))}
            </div>
          </div>

          {/* Comprehensive Analytics Charts - Mobile Optimized */}
          <div className="space-y-6 lg:space-y-8">
            {/* Analytics Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <h2 className="text-base lg:text-lg font-semibold text-gray-900">Platform Analytics</h2>
              <div className="flex items-center space-x-2">
                <ArrowTrendingUpIcon className="w-4 h-4 lg:w-5 lg:h-5 text-primary-600" />
                <span className="text-xs lg:text-sm text-gray-600">Live Data</span>
              </div>
            </div>

            {/* Charts Grid - Mobile First */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
              {/* User Activity Chart */}
              <div className="bg-white rounded-lg shadow p-4 lg:p-6">
                <h3 className="text-sm lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4">Daily User Activity</h3>
                <div className="h-32 lg:h-48 flex items-end justify-between space-x-1 lg:space-x-2">
                  {[
                    { day: 'Mon', users: 420, sessions: 180 },
                    { day: 'Tue', users: 380, sessions: 160 },
                    { day: 'Wed', users: 510, sessions: 220 },
                    { day: 'Thu', users: 460, sessions: 190 },
                    { day: 'Fri', users: 390, sessions: 170 },
                    { day: 'Sat', users: 290, sessions: 120 },
                    { day: 'Sun', users: 340, sessions: 140 },
                  ].map((data, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center space-y-1">
                      <div className="w-full flex flex-col space-y-1">
                        <div 
                          className="bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600 cursor-pointer"
                          style={{ height: `${(data.users / 510) * (window.innerWidth < 1024 ? 80 : 120)}px`, minHeight: '4px' }}
                          title={`${data.users} users`}
                        ></div>
                        <div 
                          className="bg-green-500 rounded-b transition-all duration-300 hover:bg-green-600 cursor-pointer"
                          style={{ height: `${(data.sessions / 220) * (window.innerWidth < 1024 ? 40 : 60)}px`, minHeight: '2px' }}
                          title={`${data.sessions} sessions`}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 font-medium">{data.day}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6 mt-3 lg:mt-4">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span className="text-xs lg:text-sm text-gray-600">Active Users</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-xs lg:text-sm text-gray-600">Sessions</span>
                  </div>
                </div>
              </div>

              {/* Wellness Score Distribution */}
              <div className="bg-white rounded-lg shadow p-4 lg:p-6">
                <h3 className="text-sm lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4">Wellness Score Distribution</h3>
                <div className="space-y-3 lg:space-y-4">
                  {[
                    { range: 'Excellent (80-100%)', count: 420, color: 'bg-green-500', percentage: 23 },
                    { range: 'Good (60-79%)', count: 680, color: 'bg-blue-500', percentage: 37 },
                    { range: 'Fair (40-59%)', count: 520, color: 'bg-yellow-500', percentage: 28 },
                    { range: 'Poor (20-39%)', count: 180, color: 'bg-orange-500', percentage: 10 },
                    { range: 'Critical (0-19%)', count: 47, color: 'bg-red-500', percentage: 2 },
                  ].map((segment, index) => (
                    <div key={index} className="group">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0 mb-2">
                        <span className="text-xs lg:text-sm font-medium text-gray-700">{segment.range}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs lg:text-sm text-gray-600">{segment.count} users</span>
                          <span className="text-xs lg:text-sm font-semibold text-gray-900">{segment.percentage}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${segment.color} h-2 rounded-full transition-all duration-500 group-hover:opacity-80`}
                          style={{ width: `${segment.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature Usage */}
              <div className="bg-white rounded-lg shadow p-4 lg:p-6">
                <h3 className="text-sm lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4">Feature Usage Analytics</h3>
                <div className="space-y-3 lg:space-y-4">
                  {[
                    { feature: 'AI Chatbot', usage: 85, users: 2420, color: 'bg-blue-500' },
                    { feature: 'Peer Support', usage: 72, users: 2050, color: 'bg-green-500' },
                    { feature: 'Wellness Hub', usage: 68, users: 1936, color: 'bg-purple-500' },
                    { feature: 'Community Forum', usage: 45, users: 1281, color: 'bg-yellow-500' },
                    { feature: 'Token Store', usage: 31, users: 883, color: 'bg-orange-500' },
                    { feature: 'Professional Help', usage: 23, users: 655, color: 'bg-red-500' },
                  ].map((item, index) => (
                    <div key={index} className="group">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0 mb-2">
                        <span className="text-xs lg:text-sm font-medium text-gray-700">{item.feature}</span>
                        <div className="flex items-center space-x-2 lg:space-x-3">
                          <span className="text-xs lg:text-sm text-gray-600">{item.users.toLocaleString()} users</span>
                          <span className="text-xs lg:text-sm font-semibold text-gray-900">{item.usage}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${item.color} h-2 rounded-full transition-all duration-500 group-hover:opacity-80`}
                          style={{ width: `${item.usage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Response Time Trends */}
              <div className="bg-white rounded-lg shadow p-4 lg:p-6">
                <h3 className="text-sm lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4">Response Time Improvement</h3>
                <div className="h-48 flex items-end space-x-6">
                  {[
                    { month: 'Jan', time: 3.2 },
                    { month: 'Feb', time: 2.8 },
                    { month: 'Mar', time: 2.5 },
                    { month: 'Apr', time: 2.3 },
                    { month: 'May', time: 2.1 },
                    { month: 'Jun', time: 2.3 },
                  ].map((data, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                      <div className="relative w-full flex justify-center">
                        <div 
                          className="bg-gradient-to-t from-purple-500 to-purple-300 rounded-t w-6 transition-all duration-300 hover:from-purple-600 hover:to-purple-400 cursor-pointer"
                          style={{ height: `${(4 - data.time) * 30 + 20}px` }}
                          title={`${data.time} minutes avg response`}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 font-medium">{data.month}</span>
                      <span className="text-xs text-purple-600 font-semibold">{data.time}m</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <span className="font-semibold">📈 Improvement:</span> 34% faster response time over 6 months
                  </p>
                </div>
              </div>
            </div>

            {/* Real-time Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">156</p>
                    <p className="text-blue-100 text-sm">Live Sessions</p>
                  </div>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">94.2%</p>
                    <p className="text-green-100 text-sm">Success Rate</p>
                  </div>
                  <span className="text-green-200 text-sm">+2.1%</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">23</p>
                    <p className="text-orange-100 text-sm">Crisis Cases</p>
                  </div>
                  <span className="text-orange-200 text-sm">-8%</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">2.3m</p>
                    <p className="text-purple-100 text-sm">Avg Response</p>
                  </div>
                  <span className="text-purple-200 text-sm">-34%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Health - Mobile Optimized */}
        <div className="mt-6 lg:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="card text-center p-4 lg:p-6">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-lg mx-auto mb-3 lg:mb-4 flex items-center justify-center">
              <CheckCircleIcon className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
            </div>
            <h3 className="text-sm lg:text-base font-medium text-gray-900 mb-2">System Status</h3>
            <p className="text-xs lg:text-sm text-green-600 font-medium">All systems operational</p>
          </div>

          <div className="card text-center p-4 lg:p-6">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-lg mx-auto mb-3 lg:mb-4 flex items-center justify-center">
              <UserGroupIcon className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
            </div>
            <h3 className="text-sm lg:text-base font-medium text-gray-900 mb-2">Active Helpers</h3>
            <p className="text-xs lg:text-sm text-gray-600">42 online • 128 total</p>
          </div>

          <div className="card text-center p-4 lg:p-6 sm:col-span-2 lg:col-span-1">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-100 rounded-lg mx-auto mb-3 lg:mb-4 flex items-center justify-center">
              <ArrowTrendingUpIcon className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
            </div>
            <h3 className="text-sm lg:text-base font-medium text-gray-900 mb-2">Response Time</h3>
            <p className="text-xs lg:text-sm text-gray-600">Avg: 2.3 minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
