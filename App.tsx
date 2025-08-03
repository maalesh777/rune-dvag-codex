import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { ReferralForm } from './components/ReferralForm.tsx';
import { About } from './components/About.tsx';
import { Booking } from './components/Booking.tsx';
import { Login } from './components/Login.tsx';
import { AdminDashboard } from './components/AdminDashboard.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import { useAuth } from './AuthContext.tsx';


const App = () => {
  const { loading } = useAuth();

  // Show a global loader while Firebase initializes and determines auth state.
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-transparent">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
                <div className="max-w-2xl mx-auto">
                    <ReferralForm />
                </div>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Admin Route */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;