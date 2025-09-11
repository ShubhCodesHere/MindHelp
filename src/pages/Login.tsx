import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { HeartIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import type { User } from '../types';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<User['role']>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, register, guestLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await login(email, password, role);
      } else {
        await register(name, email, password, role);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await guestLogin('Guest User');
    } catch (error) {
      console.error('Guest login error:', error);
      setError('Guest login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Demo credentials
  const demoCredentials = [
    { role: 'student', email: 'student@demo.com', name: 'Demo Student' },
    { role: 'helper', email: 'helper@demo.com', name: 'Demo Helper' },
    { role: 'psychiatrist', email: 'doctor@demo.com', name: 'Dr. Demo' },
    { role: 'admin', email: 'admin@demo.com', name: 'Admin Demo' },
  ];

  const fillDemoCredentials = (demoRole: User['role']) => {
    const demo = demoCredentials.find(d => d.role === demoRole);
    if (demo) {
      setEmail(demo.email);
      setPassword('demo123');
      setName(demo.name);
      setRole(demoRole);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
              <HeartIcon className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome to MindHelp
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your digital mental health companion
          </p>
        </div>

        {/* Demo Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <h3 className="col-span-2 text-center text-sm font-medium text-gray-700 mb-2">
            Quick Demo Access:
          </h3>
          {demoCredentials.map((demo) => (
            <button
              key={demo.role}
              type="button"
              onClick={() => fillDemoCredentials(demo.role as User['role'])}
              className="text-xs px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors capitalize"
            >
              {demo.role}
            </button>
          ))}
        </div>

        {/* Guest Login Section */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Try as Guest 🌟
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Get started immediately without creating an account. Take our wellness assessment and explore the platform!
            </p>
            <button
              type="button"
              onClick={handleGuestLogin}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Continue as Guest
            </button>
          </div>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            {/* Toggle Login/Register */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  isLogin ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  !isLogin ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Register
              </button>
            </div>

            <div className="space-y-4">
              {/* Name Field (Register only) */}
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required={!isLogin}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 input-field"
                    placeholder="Enter your full name"
                  />
                </div>
              )}

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 input-field"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field pr-10"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  I am a...
                </label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as User['role'])}
                  className="mt-1 input-field"
                >
                  <option value="student">Student</option>
                  <option value="helper">Peer Helper</option>
                  <option value="psychiatrist">Mental Health Professional</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
              </button>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center text-sm text-gray-600">
          <p>Need help? Contact our support team</p>
          <p className="mt-1">This is a demo application for hackathon purposes</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
