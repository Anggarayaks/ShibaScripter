import { useState } from 'react';
import { Icon } from '../utils/icons';

export const LoginPage = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <main className="max-w-md mx-auto px-4 py-12 flex-grow">
      <button onClick={onBack} className="text-blue-500 mb-6 font-bold">
        ← Kembali
      </button>
      <div className="bg-[#161B22] border border-[#30363D] p-8 rounded-2xl">
        <h1 className="text-2xl font-black text-white mb-6 text-center">Login Admin</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#8B949E] mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email Anda"
              className="w-full bg-[#0D1117] border border-[#30363D] px-4 py-3 rounded-lg text-white focus:border-blue-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#8B949E] mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password Anda"
              className="w-full bg-[#0D1117] border border-[#30363D] px-4 py-3 rounded-lg text-white focus:border-blue-500 outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg"
          >
            Masuk
          </button>
        </form>
      </div>
    </main>
  );
};
