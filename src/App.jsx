import { useState, useEffect } from 'react';
import { Header, Footer } from './components/Layout';
import { Notification } from './components/UI';
import { useNotification } from './hooks/useCustom';

// Pages
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { DetailPage } from './pages/DetailPage';
import { LoginPage } from './pages/LoginPage';
import { UploadPage } from './pages/UploadPage';
import { ReportsPage } from './pages/ReportsPage';
import { DashboardPage } from './pages/DashboardPage';

// Supabase & Utils
import { authService, scriptService, categoryService, reportService, suggestionService, profileService } from './utils/supabase';

export default function App() {
  // Navigation
  const [currentPage, setCurrentPage] = useState('home');

  // Auth
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Data
  const [scripts, setScripts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [reports, setReports] = useState([]);
  const [selectedScript, setSelectedScript] = useState(null);

  // UI State
  const [notification, showToast] = useNotification();
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportForm, setReportForm] = useState({ reason: '', description: '' });
  const [deleteScriptId, setDeleteScriptId] = useState(null);

  // Initialize Auth on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          const { data: profile } = await profileService.getProfile(user.id);
          setCurrentUser({
            id: user.id,
            email: user.email,
            username: profile?.username || user.email?.split('@')[0] || 'User',
            role: profile?.role || 'USER',
            avatar: profile?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`,
          });
        }
      } catch (error) {
        console.error('Auth init error:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Listen for auth changes
    const unsubscribe = authService.onAuthStateChange((event, session) => {
      if (session?.user) {
        setCurrentUser((prev) => ({
          ...prev,
          id: session.user.id,
          email: session.user.email,
        }));
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe?.data?.subscription?.unsubscribe();
  }, []);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [scriptsRes, categoriesRes, reportsRes] = await Promise.all([
          scriptService.getScripts(),
          categoryService.getCategories(),
          reportService.getReports(),
        ]);

        if (scriptsRes.data) setScripts(scriptsRes.data);
        if (categoriesRes.data) setCategories(categoriesRes.data.map(c => c.name));
        if (reportsRes.data) setReports(reportsRes.data);
      } catch (error) {
        console.error('Load data error:', error);
      }
    };

    if (!loading) {
      loadData();
    }
  }, [loading]);

  // Refresh Monetag ads when page changes
  useEffect(() => {
    if (window.monetagLoaded) {
      window.monetagLoaded.showAds?.();
    }
  }, [currentPage]);

  // Auth handlers
  const handleLogin = async (email, password) => {
    try {
      const { data, error } = await authService.login(email, password);
      if (error) throw error;

      if (data?.user) {
        setCurrentUser({
          id: data.user.id,
          email: data.user.email,
          username: data.user.user_metadata?.username || email.split('@')[0],
          role: data.user.user_metadata?.role || 'USER',
          avatar: data.user.user_metadata?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.user.id}`,
        });
        showToast('Login berhasil!', 'success');
        setLoginForm({ email: '', password: '' });
        setCurrentPage('home');
      }
    } catch (error) {
      showToast(error.message || 'Login gagal', 'error');
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await authService.logout();
      if (error) throw error;
      setCurrentUser(null);
      showToast('Logout berhasil', 'success');
      setCurrentPage('home');
    } catch (error) {
      showToast(error.message || 'Logout gagal', 'error');
    }
  };

  // Utility function to generate slug
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .slice(0, 100); // Limit length
  };

  // Script handlers
  const handleUploadScript = async (form) => {
    if (!currentUser || currentUser.role !== 'ADMIN') {
      showToast('Hanya Admin yang dapat upload script', 'error');
      return;
    }

    if (!form.title || !form.description || !form.content || !form.category) {
      showToast('Semua field harus diisi!', 'error');
      return;
    }

    try {
      let imageUrl = form.imagePreview || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80';

      if (form.image && !form.imagePreview?.startsWith('data:')) {
        const { data: uploadedUrl, error: uploadError } = await scriptService.uploadImage(form.image);
        if (uploadError) throw uploadError;
        imageUrl = uploadedUrl;
      }

      const newScript = {
        title: form.title,
        slug: generateSlug(form.title),
        description: form.description,
        content: form.content,
        category: form.category,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        image: imageUrl,
        views: 0,
        downloads: 0,
        likes: 0,
        created_at: new Date().toISOString(),
        created_by: currentUser.id,
      };

      const { data, error } = await scriptService.createScript(newScript);
      if (error) throw error;

      setScripts((prev) => [data[0] || newScript, ...prev]);
      showToast('Script berhasil diunggah!', 'success');
      setCurrentPage('dashboard');
    } catch (error) {
      showToast(error.message || 'Upload gagal', 'error');
    }
  };

  const handleDeleteScript = async (scriptId) => {
    try {
      const { error } = await scriptService.deleteScript(scriptId);
      if (error) throw error;

      setScripts((prev) => prev.filter((s) => s.id !== scriptId));
      showToast('Script berhasil dihapus!', 'success');

      if (selectedScript?.id === scriptId) {
        setSelectedScript(null);
        setCurrentPage('search');
      }
    } catch (error) {
      showToast(error.message || 'Hapus gagal', 'error');
    }
  };

  const handleReportScript = async () => {
    if (!reportForm.reason || !reportForm.description.trim()) {
      showToast('Silakan isi semua field laporan!', 'error');
      return;
    }

    try {
      const newReport = {
        script_id: selectedScript.id,
        script_title: selectedScript.title,
        reason: reportForm.reason,
        description: reportForm.description,
        status: 'pending',
        created_at: new Date().toISOString(),
      };

      const { data, error } = await reportService.createReport(newReport);
      if (error) throw error;

      setReports((prev) => [data[0] || newReport, ...prev]);
      showToast('Laporan berhasil dikirim!', 'success');
      setShowReportModal(false);
      setReportForm({ reason: '', description: '' });
    } catch (error) {
      showToast(error.message || 'Laporan gagal', 'error');
    }
  };

  const handleSuggestScript = async (suggestion) => {
    try {
      const newSuggestion = {
        suggestion: suggestion,
        created_at: new Date().toISOString(),
        created_by: currentUser?.id,
      };

      const { data, error } = await suggestionService.createSuggestion(newSuggestion);
      if (error) throw error;

      showToast('Saran berhasil dikirim!', 'success');
    } catch (error) {
      showToast(error.message || 'Saran gagal', 'error');
    }
  };

  const handleAddCategory = async (name) => {
    if (categories.includes(name)) {
      showToast('Kategori sudah ada!', 'error');
      return;
    }

    try {
      const { data, error } = await categoryService.createCategory(name);
      if (error) throw error;

      setCategories((prev) => [...prev, name]);
      showToast(`Kategori "${name}" berhasil ditambahkan!`, 'success');
    } catch (error) {
      showToast(error.message || 'Tambah kategori gagal', 'error');
    }
  };

  const handleDeleteCategory = async (name) => {
    try {
      const { error } = await categoryService.deleteCategory(name);
      if (error) throw error;

      setCategories((prev) => prev.filter((c) => c !== name));
      showToast(`Kategori "${name}" berhasil dihapus!`, 'success');
    } catch (error) {
      showToast(error.message || 'Hapus kategori gagal', 'error');
    }
  };

  // Navigation handler
  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  // Render page based on current page
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} currentUser={currentUser} scripts={scripts} />;
      case 'search':
        return (
          <SearchPage
            scripts={scripts}
            categories={categories}
            onSelectScript={(script) => {
              setSelectedScript(script);
              setCurrentPage('detail');
            }}
            currentUser={currentUser}
            onDeleteScript={handleDeleteScript}
          />
        );
      case 'detail':
        return selectedScript ? (
          <DetailPage
            script={selectedScript}
            onBack={() => setCurrentPage('search')}
            onDelete={() => handleDeleteScript(selectedScript.id)}
            onReport={() => setShowReportModal(true)}
            onSuggest={handleSuggestScript}
            currentUser={currentUser}
          />
        ) : null;
      case 'login':
        return (
          <LoginPage
            onLogin={handleLogin}
            onBack={() => setCurrentPage('home')}
          />
        );
      case 'upload':
        return currentUser?.role === 'ADMIN' ? (
          <UploadPage
            categories={categories}
            onUpload={handleUploadScript}
            onAddCategory={handleAddCategory}
            onDeleteCategory={handleDeleteCategory}
            onBack={() => setCurrentPage('home')}
          />
        ) : null;
      case 'reports':
        return currentUser?.role === 'ADMIN' ? (
          <ReportsPage reports={reports} onBack={() => setCurrentPage('home')} />
        ) : null;
      case 'dashboard':
        return currentUser ? (
          <DashboardPage
            currentUser={currentUser}
            scripts={scripts}
            onBack={() => setCurrentPage('home')}
            onViewScript={(script) => {
              setSelectedScript(script);
              setCurrentPage('detail');
            }}
            onDeleteScript={handleDeleteScript}
            onNavigate={handleNavigate}
          />
        ) : null;
      default:
        return <HomePage onNavigate={handleNavigate} currentUser={currentUser} scripts={scripts} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const unreadReports = reports.filter((r) => r.status === 'pending').length;

  return (
    <div className="min-h-screen flex flex-col bg-[#0D1117] text-[#E6EDF3]">
      <Notification notification={notification} />

      <Header
        currentUser={currentUser}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
        unreadReports={unreadReports}
      />

      {renderPage()}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#161B22] border border-[#30363D] p-6 rounded-2xl max-w-md w-full">
            <h2 className="text-xl font-bold text-white mb-4">🚩 Lapor Script Bermasalah</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#8B949E] mb-2">
                  Alasan Laporan *
                </label>
                <select
                  value={reportForm.reason}
                  onChange={(e) => setReportForm((prev) => ({ ...prev, reason: e.target.value }))}
                  className="w-full bg-[#0D1117] border border-[#30363D] px-4 py-3 rounded-lg text-white focus:border-blue-500 outline-none"
                  required
                >
                  <option value="">Pilih alasan</option>
                  <option value="not-working">Script Tidak Berfungsi</option>
                  <option value="malware">Mengandung Malware</option>
                  <option value="spam">Konten Spam</option>
                  <option value="inappropriate">Konten Tidak Pantas</option>
                  <option value="other">Lainnya</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#8B949E] mb-2">
                  Deskripsi *
                </label>
                <textarea
                  value={reportForm.description}
                  onChange={(e) => setReportForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Jelaskan masalah dengan detail..."
                  rows="3"
                  className="w-full bg-[#0D1117] border border-[#30363D] px-4 py-3 rounded-lg text-white focus:border-blue-500 outline-none"
                  required
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleReportScript}
                className="flex-grow bg-red-600 hover:bg-red-500 text-white font-bold py-2 rounded-lg"
              >
                Kirim Laporan
              </button>
              <button
                onClick={() => {
                  setShowReportModal(false);
                  setReportForm({ reason: '', description: '' });
                }}
                className="flex-grow bg-[#0D1117] border border-[#30363D] text-[#8B949E] hover:text-white font-bold py-2 rounded-lg"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
