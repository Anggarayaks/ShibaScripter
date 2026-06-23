import { useState } from 'react';
import { Icon } from '../utils/icons';

export const UploadPage = ({
  categories = [],
  onUpload,
  onAddCategory,
  onDeleteCategory,
  onBack,
}) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    content: '',
    image: null,
    imagePreview: null,
  });

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setForm((prev) => ({
          ...prev,
          image: file,
          imagePreview: event.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      onAddCategory(newCategory);
      setForm((prev) => ({ ...prev, category: newCategory }));
      setNewCategory('');
      setShowCategoryModal(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpload(form);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 flex-grow">
      <button onClick={onBack} className="text-blue-500 mb-6 font-bold flex gap-1 items-center">
        ← Kembali
      </button>

      <div className="bg-[#161B22] border border-[#30363D] p-8 rounded-2xl">
        <h1 className="text-3xl font-black text-white mb-2 flex gap-2 items-center">
          <Icon name="upload" size={24} />
          Upload Script Baru
        </h1>
        <p className="text-[#8B949E] mb-8">
          Bagikan script Anda dengan komunitas ShibaScripter
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="bg-[#0D1117] border-2 border-dashed border-[#30363D] rounded-2xl p-8 text-center">
            {form.imagePreview ? (
              <div className="space-y-4">
                <img
                  src={form.imagePreview}
                  className="w-full h-64 object-cover rounded-lg mx-auto"
                  alt="preview"
                />
                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, image: null, imagePreview: null }))
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm"
                >
                  Ganti Foto
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-6xl mb-2">📸</div>
                <p className="text-[#8B949E] font-bold">Klik atau drag foto script di sini</p>
                <p className="text-xs text-[#8B949E]">PNG, JPG, WebP (Max 5MB)</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full cursor-pointer"
                  style={{ display: 'none' }}
                  id="imageInput"
                />
                <button
                  type="button"
                  onClick={() => document.getElementById('imageInput').click()}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-bold"
                >
                  Pilih Foto
                </button>
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#8B949E] mb-2">
                Judul Script *
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Ex: Blox Fruits Auto Farm V5"
                className="w-full bg-[#0D1117] border border-[#30363D] px-4 py-3 rounded-lg text-white focus:border-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#8B949E] mb-2 flex justify-between items-center">
                Kategori *
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(true)}
                  className="text-blue-400 hover:text-blue-300 text-xs"
                >
                  + Buat Kategori
                </button>
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                className="w-full bg-[#0D1117] border border-[#30363D] px-4 py-3 rounded-lg text-white focus:border-blue-500 outline-none"
                required
              >
                <option value="">Pilih atau Buat Kategori</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#8B949E] mb-2">
              Deskripsi *
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Jelaskan apa yang dilakukan script ini..."
              rows="3"
              className="w-full bg-[#0D1117] border border-[#30363D] px-4 py-3 rounded-lg text-white focus:border-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#8B949E] mb-2">
              Tags (pisahkan dengan koma)
            </label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
              placeholder="Roblox, Blox Fruits, Anti-cheat"
              className="w-full bg-[#0D1117] border border-[#30363D] px-4 py-3 rounded-lg text-white focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#8B949E] mb-2">
              Kode Script *
            </label>
            <textarea
              value={form.content}
              onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
              placeholder="--[[ Script Content ]]"
              rows="10"
              className="w-full bg-[#0D1117] border border-[#30363D] px-4 py-3 rounded-lg text-white font-mono focus:border-blue-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-lg text-lg flex gap-2 items-center justify-center"
          >
            <Icon name="upload" size={20} />
            Unggah Script Sekarang
          </button>
        </form>
      </div>

      {/* Categories List */}
      {categories.length > 0 && (
        <div className="bg-[#0D1117] border border-[#30363D] p-6 rounded-2xl mt-8">
          <h3 className="text-lg font-bold text-white mb-4">
            Kategori Tersedia ({categories.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <div
                key={cat}
                className="bg-[#161B22] border border-[#30363D] px-3 py-2 rounded-lg flex gap-2 items-center"
              >
                <span className="text-sm text-white">{cat}</span>
                <button
                  type="button"
                  onClick={() => onDeleteCategory(cat)}
                  className="text-red-500 hover:text-red-400 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#161B22] border border-[#30363D] p-6 rounded-2xl max-w-md w-full">
            <h2 className="text-xl font-bold text-white mb-4">Buat Kategori Baru</h2>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Ex: Roblox, Utility, Security"
              className="w-full bg-[#0D1117] border border-[#30363D] px-4 py-3 rounded-lg text-white focus:border-blue-500 outline-none mb-4"
              onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
            />
            <div className="flex gap-3">
              <button
                onClick={handleAddCategory}
                className="flex-grow bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-lg"
              >
                Tambah
              </button>
              <button
                onClick={() => {
                  setShowCategoryModal(false);
                  setNewCategory('');
                }}
                className="flex-grow bg-[#0D1117] border border-[#30363D] text-[#8B949E] hover:text-white font-bold py-2 rounded-lg"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
