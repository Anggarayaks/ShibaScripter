import { useState } from 'react';
import { Icon } from '../utils/icons';

export const Header = ({ currentUser, onLogout, onNavigate, unreadReports = 0 }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0D1117]/95 backdrop-blur border-b border-[#30363D] px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => handleNavigate('home')}
        >
          <div className="bg-blue-600 p-2 rounded-lg">
            <Icon name="code" />
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white">
            Shiba<span className="text-blue-500">Scripter</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-4 items-center">
          <button
            onClick={() => handleNavigate('home')}
            className="text-sm text-[#8B949E] hover:text-white"
          >
            Beranda
          </button>
          <button
            onClick={() => handleNavigate('search')}
            className="text-sm text-[#8B949E] hover:text-white flex items-center gap-1"
          >
            <Icon name="search" size={16} />
            Cari Script
          </button>

          {currentUser ? (
            <div className="flex gap-3 items-center">
              <img
                src={currentUser.avatar}
                className="w-8 h-8 rounded-full border border-blue-500"
                alt="avatar"
              />
              <span className="text-sm font-bold text-white">{currentUser.username}</span>
              <button
                onClick={() => handleNavigate('dashboard')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm"
              >
                Dashboard
              </button>

              {currentUser.role === 'ADMIN' && (
                <>
                  <div className="relative">
                    <button
                      onClick={() => handleNavigate('reports')}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex gap-1 items-center"
                    >
                      <Icon name="bell" size={16} />
                      Laporan
                      {unreadReports > 0 && (
                        <span className="absolute top-0 right-0 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {unreadReports}
                        </span>
                      )}
                    </button>
                  </div>
                  <button
                    onClick={() => handleNavigate('upload')}
                    className="bg-amber-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex gap-1 items-center"
                  >
                    <Icon name="upload" size={16} />
                    Upload
                  </button>
                </>
              )}

              <button
                onClick={() => {
                  onLogout();
                  handleNavigate('home');
                }}
                className="text-red-500 text-sm font-bold hover:text-red-400"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleNavigate('login')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white"
        >
          <Icon name={mobileMenuOpen ? 'x' : 'menu'} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#161B22] border-t border-[#30363D] mt-3 p-4 space-y-3">
          <button
            onClick={() => handleNavigate('home')}
            className="block w-full text-left text-sm text-[#8B949E] hover:text-white py-2"
          >
            Beranda
          </button>
          <button
            onClick={() => handleNavigate('search')}
            className="block w-full text-left text-sm text-[#8B949E] hover:text-white py-2 flex items-center gap-1"
          >
            <Icon name="search" size={16} />
            Cari Script
          </button>

          {currentUser ? (
            <div className="space-y-2">
              <button
                onClick={() => handleNavigate('dashboard')}
                className="block w-full text-left bg-blue-600 text-white px-3 py-2 rounded-lg font-bold text-sm"
              >
                Dashboard
              </button>
              {currentUser.role === 'ADMIN' && (
                <>
                  <button
                    onClick={() => handleNavigate('reports')}
                    className="block w-full text-left bg-red-600 text-white px-3 py-2 rounded-lg font-bold text-sm flex gap-1 items-center"
                  >
                    <Icon name="bell" size={14} />
                    Laporan {unreadReports > 0 && `(${unreadReports})`}
                  </button>
                  <button
                    onClick={() => handleNavigate('upload')}
                    className="block w-full text-left bg-amber-600 text-white px-3 py-2 rounded-lg font-bold text-sm flex gap-1 items-center"
                  >
                    <Icon name="upload" size={14} />
                    Upload Script
                  </button>
                </>
              )}
              <button
                onClick={() => {
                  onLogout();
                  handleNavigate('home');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-red-500 py-2 text-sm font-bold"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleNavigate('login')}
              className="block w-full text-left bg-blue-600 text-white px-3 py-2 rounded-lg font-bold text-sm"
            >
              Login
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export const Footer = () => {
  return (
    <footer className="border-t border-[#30363D] bg-[#0D1117] py-8 text-center text-xs text-[#8B949E] mt-12">
      <p className="font-bold text-white text-sm">ShibaScripter</p>
      <p className="mt-2">Platform sharing script terbaik dari komunitas Indonesia</p>
    </footer>
  );
};
