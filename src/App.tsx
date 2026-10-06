import { useState, useEffect } from 'react';
import type { EmailRecord } from './types';
import { getStoredEmails } from './services/storageService';
import { getDemoMode } from './services/predictionService';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { SpamDetectorPage } from './pages/SpamDetectorPage';
import { EmailHistoryPage } from './pages/EmailHistoryPage';
import { EmailDetailsPage } from './pages/EmailDetailsPage';
import { ThreatIntelligencePage } from './pages/ThreatIntelligencePage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { PredictionsPage } from './pages/PredictionsPage';
import { BIPage } from './pages/BIPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { AboutPage } from './pages/AboutPage';

import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';

export function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('landing');
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [, setIsLoggedIn] = useState<boolean>(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  const [emails, setEmails] = useState<EmailRecord[]>([]);
  const [demoMode, setDemoModeState] = useState<boolean>(true);

  // Initial Data Sync
  useEffect(() => {
    setEmails(getStoredEmails());
    setDemoModeState(getDemoMode());
  }, []);

  const refreshEmails = () => {
    setEmails(getStoredEmails());
  };

  const navigateTo = (route: string, param?: string) => {
    if (param) {
      setSelectedEmailId(param);
    }
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEmailAnalyzed = () => {
    refreshEmails();
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentRoute('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentRoute('landing');
  };

  // Render Public / Auth pages if on landing, login, or register
  if (currentRoute === 'landing') {
    return <LandingPage onNavigate={navigateTo} />;
  }

  if (currentRoute === 'login') {
    return <LoginPage onLogin={handleLogin} onNavigate={navigateTo} />;
  }

  if (currentRoute === 'register') {
    return <RegisterPage onLogin={handleLogin} onNavigate={navigateTo} />;
  }

  // Selected Email Record for Email Details Page
  const selectedEmail = emails.find(e => e.id === selectedEmailId) || emails[0] || null;

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        onLogout={handleLogout}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <Navbar
          currentRoute={currentRoute}
          onNavigate={navigateTo}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          demoMode={demoMode}
          setDemoModeState={setDemoModeState}
        />

        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {currentRoute === 'dashboard' && (
            <DashboardPage emails={emails} onNavigate={navigateTo} />
          )}

          {currentRoute === 'spam-detector' && (
            <SpamDetectorPage
              onEmailAnalyzed={handleEmailAnalyzed}
              onNavigate={navigateTo}
              demoMode={demoMode}
            />
          )}

          {currentRoute === 'history' && (
            <EmailHistoryPage emails={emails} onNavigate={navigateTo} />
          )}

          {currentRoute === 'email-detail' && (
            <EmailDetailsPage
              email={selectedEmail}
              onNavigate={navigateTo}
              onEmailUpdated={refreshEmails}
            />
          )}

          {currentRoute === 'threat-intel' && (
            <ThreatIntelligencePage />
          )}

          {currentRoute === 'analytics' && (
            <AnalyticsPage />
          )}

          {currentRoute === 'predictions' && (
            <PredictionsPage />
          )}

          {currentRoute === 'bi' && (
            <BIPage />
          )}

          {currentRoute === 'reports' && (
            <ReportsPage emails={emails} />
          )}

          {currentRoute === 'settings' && (
            <SettingsPage demoMode={demoMode} setDemoModeState={setDemoModeState} />
          )}

          {currentRoute === 'about' && (
            <AboutPage />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
