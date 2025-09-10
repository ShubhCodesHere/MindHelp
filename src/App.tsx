import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ChatBot from './pages/ChatBot';
import PeerSupport from './pages/PeerSupport';
import WellnessHub from './pages/WellnessHub';
import Community from './pages/Community';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import Store from './pages/Store';
import StoreManagement from './pages/StoreManagement';
import Assessment from './pages/Assessment';
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';

const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({ 
  children, 
  allowedRoles 
}) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  // If allowedRoles is specified, check if user's role is allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" />;
  }
  
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  // Check if student needs to take assessment
  const needsAssessment = user?.role === 'student' && 
    !localStorage.getItem(`wellnessScore_${user.id}`) &&
    window.location.pathname !== '/assessment' &&
    window.location.pathname !== '/login';

  return (
    <>
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to={needsAssessment ? "/assessment" : "/dashboard"} />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            {needsAssessment ? <Navigate to="/assessment" /> : 
             user?.role === 'admin' ? <AdminDashboard /> : <Dashboard />}
          </ProtectedRoute>
        } />
        <Route path="/chatbot" element={
          <ProtectedRoute allowedRoles={['student']}>
            <ChatBot />
          </ProtectedRoute>
        } />
        <Route path="/peer-support" element={
          <ProtectedRoute allowedRoles={['student', 'helper', 'psychiatrist']}>
            <PeerSupport />
          </ProtectedRoute>
        } />
        <Route path="/wellness" element={
          <ProtectedRoute allowedRoles={['student']}>
            <WellnessHub />
          </ProtectedRoute>
        } />
        <Route path="/community" element={
          <ProtectedRoute allowedRoles={['student', 'helper']}>
            <Community />
          </ProtectedRoute>
        } />
        <Route path="/store" element={
          <ProtectedRoute allowedRoles={['student', 'helper']}>
            <Store />
          </ProtectedRoute>
        } />
        <Route path="/store-management" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <StoreManagement />
          </ProtectedRoute>
        } />
        <Route path="/assessment" element={
          <ProtectedRoute allowedRoles={['student']}>
            <Assessment />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
