import { useState } from 'react';
import { Header, Footer } from './components/Layout';
import { Notification } from './components/UI';
import { useNotification } from './hooks/useCustom';

// Pages
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { DetailPage } from './pages/DetailPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';

export default function App() {
  // Navigation & Auth State
  const [currentPage, setCurrentPage] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);
  const [notification, showToast] = useNotification();
  
  // Data State (Manual)
  const [scripts, setScripts] = useState([]);
  const [selectedScript, setSelectedScript] = useState(null);

  // Login Handler (Manual - Tanpa Supabase)
  const handleLogin = (email, password) => {
    // Ganti email/pass di bawah ini sesuai yang diinginkan
    if (email === 'admin@gmail.com' && password === 'admin123') {
      setCurrentUser({
        id: '1',
        email: email,
        username: 'Admin Shiba',
        role: 'ADMIN',
        avatar: 'https://ui-avatars.com/api/?name=Admin'
      });
      showToast('Login berhasil!', 'success');
      setCurrentPage('home');
    } else {
      showToast('Email atau Password salah!', 'error');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
    showToast('Logout berhasil', 'success');
  };

  const handleNavigate = (page) => setCurrentPage(page);

  // Render Page
  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage onNavigate={handleNavigate} currentUser={currentUser} scripts={scripts} />;
      case 'login': return <LoginPage onLogin={handleLogin} onBack={() => setCurrentPage('home')} />;
      case 'dashboard': return <DashboardPage currentUser={currentUser} scripts={scripts} onBack={() => setCurrentPage('home')} />;
      case 'search': return <SearchPage scripts={scripts} onSelectScript={(s) => { setSelectedScript(s); setCurrentPage('detail'); }} />;
      case 'detail': return <DetailPage script={selectedScript} onBack={() => setCurrentPage('search')} />;
      default: return <HomePage onNavigate={handleNavigate} currentUser={currentUser} scripts={scripts} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0D1117] text-[#E6EDF3]">
      <Notification notification={notification} />
      <Header currentUser={currentUser} onLogout={handleLogout} onNavigate={handleNavigate} />
      {renderPage()}
      <Footer />
    </div>
  );
}
