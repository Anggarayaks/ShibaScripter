import { useState, useEffect } from 'react';
import { Icon } from '../utils/icons';

export const HomePage = ({ onNavigate }) => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-12 flex-grow">
      {/* Hero Section yang Disederhanakan */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
          Pusat Script & Executor <br/> <span className="text-blue-500">Terpercaya</span>
        </h1>
        <p className="text-[#8B949E] text-lg max-w-xl mx-auto mb-10">
          Temukan ribuan script premium dan executor terbaik yang sudah teruji keamanannya.
        </p>

        {/* Pemisah Menu */}
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => onNavigate('scripts')}
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-transform hover:scale-105"
          >
            <Icon name="code" /> Jelajahi Script
          </button>
          <button 
            onClick={() => onNavigate('executors')}
            className="bg-[#21262D] hover:bg-[#30363D] text-white px-8 py-4 rounded-xl font-bold border border-[#30363D] flex items-center gap-2"
          >
            <Icon name="download" /> Lihat Executor
          </button>
        </div>
      </section>

      {/* Grid Kategori Cepat */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="p-6 bg-[#0D1117] border border-[#30363D] rounded-2xl">
          <h3 className="text-white font-bold text-xl mb-2">🔥 Trending Script</h3>
          <p className="text-[#8B949E] text-sm">Update harian script paling banyak digunakan.</p>
        </div>
        <div className="p-6 bg-[#0D1117] border border-[#30363D] rounded-2xl">
          <h3 className="text-white font-bold text-xl mb-2">⚡ Executor Terbaru</h3>
          <p className="text-[#8B949E] text-sm">Versi terbaru executor untuk performa maksimal.</p>
        </div>
      </section>
    </main>
  );
};
