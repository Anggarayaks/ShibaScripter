import { useState } from 'react';
import { Icon } from '../utils/icons';
import { MonetagBanner } from '../components/Monetag';

export const DetailPage = ({
  script,
  onBack,
  onDelete,
  onReport,
  onSuggest,
  currentUser,
}) => {
  const [suggestion, setSuggestion] = useState('');

  const handleSuggest = (e) => {
    e.preventDefault();
    onSuggest(suggestion);
    setSuggestion('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(script.content);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 flex-grow">
      <button onClick={onBack} className="text-blue-500 mb-6 font-bold flex gap-1 items-center">
        ← Kembali
      </button>

      {/* Script Header */}
      <div className="bg-[#161B22] border border-[#30363D] rounded-2xl overflow-hidden mb-6">
        <img src={script.image} className="w-full h-64 object-cover" alt={script.title} />
        <div className="p-6 md:p-8">
          <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded font-bold">
            {script.category}
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white mt-3">{script.title}</h1>
          <p className="text-[#8B949E] mt-2">{script.description}</p>
          <div className="flex gap-4 mt-4 text-sm">
            <span className="text-[#8B949E]">👁 {script.views || 0} views</span>
            <span className="text-[#8B949E]">⬇ {script.downloads || 0} downloads</span>
            <span className="text-emerald-400">❤ {script.likes || 0} likes</span>
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {currentUser?.role === 'ADMIN' && (
              <button
                onClick={onDelete}
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-sm flex gap-2 items-center"
              >
                <Icon name="trash" size={16} />
                Hapus Script
              </button>
            )}
            <button
              onClick={onReport}
              className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg font-bold text-sm flex gap-2 items-center"
            >
              <Icon name="flag" size={16} />
              Lapor Script
            </button>
          </div>
        </div>
      </div>

      <MonetagBanner placement="middle-detail" />

      {/* Code Block */}
      <div className="bg-[#0D1117] border border-[#30363D] rounded-2xl overflow-hidden mb-6">
        <div className="bg-[#161B22] px-4 py-3 flex justify-between items-center border-b border-[#30363D]">
          <span className="text-xs font-mono text-[#8B949E]">{script.slug || script.id}</span>
          <button
            onClick={handleCopy}
            className="flex gap-2 items-center bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-blue-500"
          >
            <Icon name="copy" size={14} />
            Copy
          </button>
        </div>
        <pre className="p-4 overflow-x-auto text-xs text-emerald-400 font-mono max-h-96 bg-[#0D1117]">
          {script.content}
        </pre>
      </div>

      {/* Suggestion Box */}
      <div className="bg-[#161B22] border border-[#30363D] p-6 rounded-2xl">
        <h2 className="text-lg font-bold text-white mb-4">💡 Sarankan Script Berikutnya</h2>
        <form onSubmit={handleSuggest} className="space-y-3">
          <textarea
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            placeholder="Tuliskan script apa yang ingin Anda lihat di platform ini..."
            rows="3"
            className="w-full bg-[#0D1117] border border-[#30363D] px-4 py-3 rounded-lg text-white focus:border-blue-500 outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 rounded-lg text-sm"
          >
            Kirim Saran
          </button>
        </form>
      </div>
    </main>
  );
};
