import { useState, useMemo } from 'react';
import { Icon } from '../utils/icons';
import { MonetagBanner, MonetagSidebar } from '../components/Monetag';

export const SearchPage = ({
  scripts = [],
  categories = [],
  onSelectScript,
  currentUser,
  onDeleteScript,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const allCategories = ['Semua', ...(categories || [])];

  const filteredScripts = useMemo(() => {
    if (!scripts) return [];
    return scripts.filter((s) => {
      const matchSearch =
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory =
        selectedCategory === 'Semua' || s.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [scripts, searchQuery, selectedCategory]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 flex-grow">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Cari Script</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Cari judul atau deskripsi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow bg-[#161B22] border border-[#30363D] px-4 py-3 rounded-lg text-white focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Ads */}
        <div className="lg:col-span-1 hidden lg:block">
          <MonetagSidebar />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {!scripts || scripts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#8B949E] mb-4">Belum ada script yang diunggah</p>
            </div>
          ) : (
            <>
              {/* Categories */}
              <div className="mb-8 overflow-x-auto">
                <div className="flex gap-2 pb-2">
                  {allCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap ${
                        selectedCategory === cat
                          ? 'bg-blue-600 text-white'
                          : 'bg-[#161B22] text-[#8B949E] border border-[#30363D]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scripts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredScripts.length > 0 ? (
                  filteredScripts.map((s) => (
                    <ScriptCard
                      key={s.id}
                      script={s}
                      onView={() => onSelectScript(s)}
                      onDelete={() => onDeleteScript(s.id)}
                      isAdmin={currentUser?.role === 'ADMIN'}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 text-[#8B949E]">
                    Tidak ada script yang cocok
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

const ScriptCard = ({ script, onView, onDelete, isAdmin }) => {
  return (
    <div className="bg-[#161B22] border border-[#30363D] p-0 rounded-xl hover:border-blue-500/50 transition-all overflow-hidden">
      <img
        src={script.image}
        className="w-full h-40 object-cover cursor-pointer hover:opacity-90"
        onClick={onView}
        alt={script.title}
      />
      <div className="p-4">
        <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded font-bold">
          {script.category}
        </span>
        <h3
          className="text-lg font-bold text-white mt-3 cursor-pointer hover:text-blue-400"
          onClick={onView}
        >
          {script.title}
        </h3>
        <p className="text-sm text-[#8B949E] mt-2">{script.description}</p>
        <div className="flex flex-wrap gap-1 mt-3">
          {script.tags &&
            script.tags.map((tag) => (
              <span key={tag} className="text-xs bg-blue-500/10 text-blue-300 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
        </div>
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#30363D] text-sm">
          <div className="flex gap-3 text-[#8B949E]">
            <span>👁 {script.views || 0}</span>
            <span>⬇ {script.downloads || 0}</span>
            <span>❤ {script.likes || 0}</span>
          </div>
          <div className="flex gap-1">
            <button
              onClick={onView}
              className="bg-blue-600 text-white px-2 py-1 rounded font-bold text-xs hover:bg-blue-500"
            >
              Buka
            </button>
            {isAdmin && (
              <button
                onClick={onDelete}
                className="bg-red-600 text-white px-2 py-1 rounded font-bold text-xs hover:bg-red-500 flex gap-1 items-center"
              >
                <Icon name="trash" size={12} />
                Hapus
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
