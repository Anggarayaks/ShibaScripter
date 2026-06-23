import { Icon } from '../utils/icons';
import { MonetagBanner } from '../components/Monetag';

export const HomePage = ({ onNavigate, currentUser, scripts }) => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-12 flex-grow">
      <section className="text-center mb-16 bg-gradient-to-b from-blue-950/20 to-transparent p-8 md:p-12 rounded-3xl border border-[#30363D]">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
          Cari, Salin, dan Jalankan Script Premium
        </h1>
        <p className="text-sm md:text-base text-[#8B949E] max-w-2xl mx-auto">
          Platform sharing script terbaik dengan koleksi lengkap
        </p>
        <button
          onClick={() => onNavigate('search')}
          className="mt-6 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-bold flex gap-2 items-center mx-auto"
        >
          <Icon name="search" size={18} />
          Cari Script Sekarang
        </button>
      </section>

      <MonetagBanner placement="top-banner" />

      <section className="mb-12 text-center">
        <h2 className="text-2xl font-bold text-white mb-6">
          {scripts && scripts.length > 0 ? `${scripts.length} Script Tersedia` : 'Belum Ada Script'}
        </h2>
        <p className="text-[#8B949E]">
          {scripts && scripts.length > 0
            ? 'Jelajahi dan temukan script yang Anda cari'
            : 'Login dan upload script Anda sekarang untuk memulai!'}
        </p>
        {!currentUser && (
          <button
            onClick={() => onNavigate('login')}
            className="mt-4 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-bold"
          >
            Login Sekarang
          </button>
        )}
      </section>
    </main>
  );
};
