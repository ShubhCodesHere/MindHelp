import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GoogleTranslate from './GoogleTranslate';
import { 
  HomeIcon, 
  ChatBubbleLeftRightIcon, 
  UserGroupIcon, 
  HeartIcon, 
  UserIcon,
  Cog6ToothIcon,
  BellIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Filter navigation based on user role
  const getNavigationForUser = () => {
    const baseNavigation = [
      { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    ];

    // Role-specific navigation
    switch (user?.role) {
      case 'student':
        // Students get all features
        baseNavigation.push(
          { name: 'AI Assistant', href: '/chatbot', icon: ChatBubbleLeftRightIcon },
          { name: 'Peer Support', href: '/peer-support', icon: UserGroupIcon },
          { name: 'Wellness Hub', href: '/wellness', icon: HeartIcon },
          { name: 'Community', href: '/community', icon: UserGroupIcon },
          { name: 'Store', href: '/store', icon: ShoppingBagIcon }
        );
        break;
      
      case 'helper':
        // Helpers can provide support and engage with community
        baseNavigation.push(
          { name: 'Peer Support', href: '/peer-support', icon: UserGroupIcon },
          { name: 'Community', href: '/community', icon: UserGroupIcon },
          { name: 'Store', href: '/store', icon: ShoppingBagIcon }
        );
        break;
      
      case 'psychiatrist':
        // Psychiatrists only need professional support features
        baseNavigation.push(
          { name: 'Peer Support', href: '/peer-support', icon: UserGroupIcon }
        );
        break;
      
      case 'admin':
        // Admins get store management features
        baseNavigation.push(
          { name: 'Store Management', href: '/store-management', icon: ShoppingBagIcon }
        );
        break;
      
      case 'guest':
        // Guests get limited features to explore the platform
        baseNavigation.push(
          { name: 'AI Assistant', href: '/chatbot', icon: ChatBubbleLeftRightIcon },
          { name: 'Peer Support', href: '/peer-support', icon: UserGroupIcon },
          { name: 'Wellness Hub', href: '/wellness', icon: HeartIcon },
          { name: 'Community', href: '/community', icon: UserGroupIcon }
        );
        break;
      
      default:
        // Fallback for unknown roles
        baseNavigation.push(
          { name: 'Peer Support', href: '/peer-support', icon: UserGroupIcon }
        );
    }

    return baseNavigation;
  };

  const navigation = getNavigationForUser();

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <HeartIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">MindHelp</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {/* Google Translate */}
            <GoogleTranslate />

            {/* Notifications */}
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <BellIcon className="w-5 h-5" />
            </button>

            {/* Tokens Display - Only for students and helpers */}
            {user?.role && ['student', 'helper'].includes(user.role) && (
              <div className="hidden sm:flex items-center space-x-2 bg-yellow-50 px-3 py-1 rounded-full">
                <span className="text-yellow-600 text-sm font-medium">🪙 {user?.tokens || 0}</span>
              </div>
            )}

            {/* Profile Dropdown */}
            <div className="relative">
              <Link 
                to="/profile"
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
              >
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <UserIcon className="w-5 h-5 text-white" />
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                  <div className="text-xs text-gray-500 capitalize">{user?.role}</div>
                </div>
              </Link>
            </div>

            {/* Settings */}
            <button
              onClick={logout}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              title="Logout"
            >
              <Cog6ToothIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200">
        <div className="flex overflow-x-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex-1 flex flex-col items-center py-2 px-1 text-xs ${
                  isActive
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-gray-600'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
