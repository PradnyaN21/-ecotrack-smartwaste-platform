import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import RequestPickup from './pages/RequestPickup';
import TrackRequest from './pages/TrackRequest';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminRequests from './pages/AdminRequests';
import AdminScheduled from './pages/AdminScheduled';
import AdminHistory from './pages/AdminHistory';
import AdminAnalytics from './pages/AdminAnalytics';
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected Route wrapper for Admin panel
const ProtectedAdminRoute = ({ children }) => {
  const { isAdminAuthenticated } = useAuth();
  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
          <Navbar />

          <div className="flex-1">
            <Routes>
              {/* Public User Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/request" element={<RequestPickup />} />
              <Route path="/track" element={<TrackRequest />} />
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Protected Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedAdminRoute>
                    <AdminDashboard />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin/requests"
                element={
                  <ProtectedAdminRoute>
                    <AdminRequests />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin/scheduled"
                element={
                  <ProtectedAdminRoute>
                    <AdminScheduled />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin/history"
                element={
                  <ProtectedAdminRoute>
                    <AdminHistory />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin/analytics"
                element={
                  <ProtectedAdminRoute>
                    <AdminAnalytics />
                  </ProtectedAdminRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
