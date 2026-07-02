import { useState, useEffect } from 'react';
import { Icon } from '../utils/icons';

export const HomePage = ({ onNavigate }) => {
  const [scripts, setScripts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mengambil data dari file JSON di folder public
  useEffect(() => {
    fetch('/scripts.json')
      .then((res) => res.json())
      .then((data) => {
        setScripts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal memuat script:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 flex-grow">
      {/* Hero Section */}
      <section className="text-center mb-16 bg-gradient-to-b from-blue-950/20 to-transparent p-8 md:p-12 rounded-3xl border border-[#30363D]">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
          Cari, Salin, dan Jalankan Script Premium
        </h1>
        <p className="text-sm md:text-base text-[#8B949E] max-w-2xl mx-auto">
          Platform sharing script terbaik dengan koleksi lengkap dan terupdate
        </p>
        <button
          onClick={() => onNavigate('search')}
          className="mt-6 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-bold flex gap-2 items-center mx-auto transition-all"
        >
          <Icon name="search" size={18} />
          Cari Script Sekarang
        </button>
      </section>

      {/* Script List Summary */}
      <section className="mb-12 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          {loading ? 'Memuat...' : `${scripts.length} Script Tersedia`}
        </h2>
        <p className="text-[#8B949E]">
          Jelajahi, pilih game, dan temukan script terbaik untuk kebutuhanmu.
        </p>
      </section>
    </main>
  );
};
