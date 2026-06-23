import { Icon } from '../utils/icons';

export const DashboardPage = ({ currentUser, scripts = [], onBack, onViewScript, onDeleteScript, onNavigate }) => {
  const totalDownloads = scripts.reduce((sum, s) => sum + (s.downloads || 0), 0);
  const totalLikes = scripts.reduce((sum, s) => sum + (s.likes || 0), 0);

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 flex-grow">
      <button onClick={onBack} className="text-blue-500 mb-6 font-bold">
        ← Kembali
      </button>

      {/* User Card */}
      <div className="bg-[#161B22] border border-[#30363D] p-6 rounded-2xl mb-8">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            className="w-16 h-16 rounded-full border border-blue-500"
            alt="avatar"
          />
          <div>
            <h1 className="text-2xl font-bold text-white">{currentUser.username}</h1>
            <p className="text-sm text-[#8B949E]">{currentUser.email}</p>
            <span
              className={`text-xs px-3 py-1 rounded font-bold ${
                currentUser.role === 'ADMIN'
                  ? 'bg-amber-500/20 text-amber-400'
                  : 'bg-blue-500/20 text-blue-400'
              }`}
            >
              {currentUser.role}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#161B22] border border-[#30363D] p-6 rounded-2xl text-center">
          <p className="text-3xl font-black text-blue-400">{scripts.length}</p>
          <p className="text-sm text-[#8B949E] mt-2">Total Script</p>
        </div>
        <div className="bg-[#161B22] border border-[#30363D] p-6 rounded-2xl text-center">
          <p className="text-3xl font-black text-emerald-400">{totalDownloads}</p>
          <p className="text-sm text-[#8B949E] mt-2">Total Download</p>
        </div>
        <div className="bg-[#161B22] border border-[#30363D] p-6 rounded-2xl text-center">
          <p className="text-3xl font-black text-rose-400">{totalLikes}</p>
          <p className="text-sm text-[#8B949E] mt-2">Total Like</p>
        </div>
      </div>

      {/* Admin Mode Banner */}
      {currentUser.role === 'ADMIN' && (
        <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-2xl mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-amber-400 mb-1">Mode Admin</h2>
              <p className="text-sm text-amber-300">
                Anda dapat mengunggah dan mengelola script baru di platform.
              </p>
            </div>
            <button
              onClick={() => onNavigate('upload')}
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-bold flex gap-2 items-center whitespace-nowrap ml-4"
            >
              <Icon name="upload" size={18} />
              Upload Script
            </button>
          </div>
        </div>
      )}

      {/* Recent Scripts */}
      {scripts.length > 0 && (
        <div className="bg-[#161B22] border border-[#30363D] p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-white mb-4">Script Terbaru</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scripts.slice(0, 4).map((s) => (
              <div key={s.id} className="bg-[#0D1117] border border-[#30363D] p-4 rounded-lg">
                <img src={s.image} className="w-full h-24 object-cover rounded-lg mb-2" alt={s.title} />
                <h3 className="font-bold text-white">{s.title}</h3>
                <p className="text-xs text-[#8B949E] mt-1">{s.description}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => onViewScript(s)}
                    className="flex-grow bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-blue-500"
                  >
                    Lihat
                  </button>
                  <button
                    onClick={() => onDeleteScript(s.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-red-500 flex gap-1 items-center justify-center"
                  >
                    <Icon name="trash" size={12} />
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};
