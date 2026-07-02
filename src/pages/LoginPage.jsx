import { useState } from 'react';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Data User Manual (Pengganti Supabase)
  const handleLogin = (email, password) => {
    if (email === 'admin@gmail.com' && password === 'admin123') {
      setCurrentUser({
        username: 'Admin Shiba',
        email: 'admin@gmail.com',
        role: 'ADMIN',
        avatar: 'https://ui-avatars.com/api/?name=Admin'
      });
      setIsLoggedIn(true);
    } else {
      alert('Email atau Password salah!');
    }
  };

  // Jika belum login, tampilkan halaman login
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} onBack={() => window.location.href = '/'} />;
  }

  // Jika sudah login, tampilkan Dashboard
  return (
    <DashboardPage 
      currentUser={currentUser}
      scripts={[]} // Anda bisa isi dengan array data script di sini
      onBack={() => setIsLoggedIn(false)}
      onViewScript={(s) => console.log('Lihat:', s)}
      onDeleteScript={(id) => console.log('Hapus:', id)}
      onNavigate={(path) => console.log('Navigasi ke:', path)}
    />
  );
}
