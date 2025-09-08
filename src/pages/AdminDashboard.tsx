import React from 'react';
import { 
  UserGroupIcon, 
  ChartBarIcon, 
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor platform health and user engagement</p>
        </div>

        {/* Critical Alerts */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <ExclamationTriangleIcon className="w-6 h-6 text-red-600 mr-3" />
            <h2 className="text-lg font-semibold text-red-900">Critical Alerts</h2>
          </div>
          <div className="space-y-3">
            {alertRequests.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between bg-white p-4 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{alert.message}</p>
                  <p className="text-sm text-gray-600">User: {alert.user} • {alert.time}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </span>
                  <button className="btn-primary text-sm">Review</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="card">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <span className={`text-sm font-medium ${
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Sessions */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Sessions</h2>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <p className="font-medium text-gray-900">{session.student}</p>
                      <span className="text-gray-500">→</span>
                      <p className="text-gray-700">{session.helper}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                        {session.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(session.priority)}`}>
                        {session.priority} priority
                      </span>
                      <span className="text-sm text-gray-600">{session.duration}</span>
                    </div>
                  </div>
                  <button className="btn-secondary text-sm">Monitor</button>
                </div>
              ))}
            </div>
          </div>

          {/* Analytics Chart Placeholder */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Usage Analytics</h2>
              <ArrowTrendingUpIcon className="w-5 h-5 text-primary-600" />
            </div>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <ChartBarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Analytics chart would be displayed here</p>
                <p className="text-sm text-gray-500 mt-2">Integration with Chart.js or similar library</p>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Health */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">System Status</h3>
            <p className="text-sm text-green-600 font-medium">All systems operational</p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <UserGroupIcon className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Active Helpers</h3>
            <p className="text-sm text-gray-600">42 online • 128 total</p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <ArrowTrendingUpIcon className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Response Time</h3>
            <p className="text-sm text-gray-600">Avg: 2.3 minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
