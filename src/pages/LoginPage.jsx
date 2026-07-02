import { useState } from 'react';
import { LoginPage } from './pages/LoginPage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Logika Login Manual (Tanpa Supabase)
  const handleLogin = (email, password) => {
    // Ganti email dan password di bawah sesuai keinginan Anda
    if (email === 'admin@gmail.com' && password === 'admin123') {
      setIsLoggedIn(true);
      alert('Login Berhasil!');
    } else {
      alert('Email atau Password salah!');
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} onBack={() => window.location.href = '/'} />;
  }

  return (
    <div>
      <h1>Selamat Datang Admin</h1>
      {/* Di sini tempat Anda menaruh form input script */}
      <p>Silakan tambah script baru melalui API.</p>
    </div>
  );
}
