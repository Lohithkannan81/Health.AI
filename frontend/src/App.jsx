import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { ImageModal } from './components/ImageModal';
import { UserProfileModal } from './components/UserProfileModal';
import { Toast } from './components/Toast';

import { LandingPage } from './pages/LandingPage';
import { PatientRegistrationPage } from './pages/PatientRegistrationPage';
import { ChatbotPage } from './pages/ChatbotPage';
import { ImageAnalysisPage } from './pages/ImageAnalysisPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { AboutPage } from './pages/AboutPage';
import { AuthPage } from './pages/AuthPage';
import { WelcomePage } from './pages/WelcomePage';

function MainAppContent() {
  const { isAuthenticated } = useAuth();

  // Active tab state
  const [activeTab, setActiveTab] = useState(() => {
    try {
      const savedUser = localStorage.getItem('medivision_user');
      return savedUser ? 'chatbot' : 'welcome';
    } catch {
      return 'welcome';
    }
  });

  // Active Medical Image Analysis Context for Chatbot Follow-up
  const [activeImageContext, setActiveImageContext] = useState(null);

  // Watch authentication state changes to navigate properly
  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === 'welcome' || activeTab === 'login' || activeTab === 'signup' || activeTab === 'dashboard') {
        setActiveTab('chatbot');
      }
    } else {
      if (activeTab !== 'login' && activeTab !== 'signup') {
        setActiveTab('welcome');
      }
    }
  }, [isAuthenticated]);

  // Shared Clinical Patient & Symptom State
  const [patient, setPatient] = useState({
    full_name: '',
    age: '',
    gender: 'Male',
    height: '',
    weight: '',
    blood_group: 'O+',
    medical_history: '',
    current_medication: '',
    severity: 'Moderate'
  });

  const [symptoms, setSymptoms] = useState('');

  // Zoom Modal State
  const [zoomImageSrc, setZoomImageSrc] = useState(null);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // User Profile Modal State
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Toast State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleOpenZoom = (src) => {
    setZoomImageSrc(src);
    setIsZoomOpen(true);
  };

  // --- UNAUTHENTICATED GATE PAGES (Welcome, Login, Signup) ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans relative overflow-x-hidden selection:bg-[#0066FF] selection:text-white">
        {activeTab === 'login' || activeTab === 'signup' ? (
          <AuthPage
            initialMode={activeTab}
            onNavigateDashboard={() => setActiveTab('welcome')}
            showToast={showToast}
          />
        ) : (
          <WelcomePage
            onNavigateLogin={() => setActiveTab('login')}
            onNavigateSignup={() => setActiveTab('signup')}
            onNavigateDashboard={() => setActiveTab('symptoms')}
          />
        )}

        <Toast toast={toast} onClose={() => setToast(null)} />
      </div>
    );
  }

  // --- AUTHENTICATED CLINICAL DASHBOARD LAYOUT ---
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans relative overflow-x-hidden selection:bg-[#0066FF] selection:text-white">
      
      {/* Top Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenProfile={() => setIsProfileModalOpen(true)}
      />

      <div className="flex-1 flex w-full relative z-10">
        
        {/* Left Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && (
            <LandingPage
              onStartAnalysis={() => setActiveTab('register')}
              onLearnMore={() => setActiveTab('about')}
            />
          )}

          {(activeTab === 'register' || activeTab === 'analysis') && (
            <PatientRegistrationPage
              patient={patient}
              showToast={showToast}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsPage
              onOpenZoom={handleOpenZoom}
              showToast={showToast}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsPage
              isDark={false}
              toggleTheme={() => {}}
              showToast={showToast}
            />
          )}

          {activeTab === 'image-analysis' && (
            <ImageAnalysisPage
              onNavigateChatbot={(context) => {
                setActiveImageContext(context);
                setActiveTab('chatbot');
              }}
              onOpenZoom={handleOpenZoom}
              showToast={showToast}
            />
          )}

          {activeTab === 'chatbot' && (
            <ChatbotPage
              showToast={showToast}
              onNavigateReports={() => setActiveTab('reports')}
              imageAnalysisContext={activeImageContext}
            />
          )}

          {activeTab === 'about' && (
            <AboutPage />
          )}
        </main>
      </div>

      {/* Logged In User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        showToast={showToast}
      />

      {/* Image Zoom Modal */}
      <ImageModal
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
        imageSrc={zoomImageSrc}
        title="High-Resolution Medical Image Inspection"
      />

      {/* Toast Notification Container */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
