# ⚡ Quick Reference - Panduan Cepat Indonesia

## 🚀 3 Langkah Main ke Online (10 Menit)

### 1️⃣ Setup Lokal (2 menit)
```bash
cd ShibaScripter-New
npm install
```

### 2️⃣ Setup Supabase & Environment (5 menit)
- Buat project di https://supabase.com
- Paste file `DATABASE_SCHEMA.sql` ke SQL Editor → Run
- Buat bucket `script-images` (PUBLIC)
- Copy API Keys ke `.env.local`:
```
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

### 3️⃣ Deploy (3 menit)
```bash
npm run build
netlify deploy --prod --dir=dist
```

---

## 🎯 Checklist Setup Cepat

```
✅ Node.js & NPM installed
✅ npm install selesai
✅ Supabase project dibuat
✅ DATABASE_SCHEMA.sql sudah di-run
✅ Bucket script-images dibuat
✅ .env.local sudah diisi
✅ Admin user sudah dibuat
✅ npm run dev berjalan
✅ Login berhasil
✅ Deploy ke Netlify
```

---

## 📝 Command Penting

| Perintah | Kegunaan |
|----------|----------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build untuk production |
| `npm run preview` | Preview production build |
| `netlify deploy --prod --dir=dist` | Deploy ke Netlify |
| `git push` | Push ke GitHub (auto-deploy) |

---

## 🔑 Konfigurasi `.env.local`

```bash
# Wajib di isi
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...

# Catatan: Jangan di-share, jangan di-commit ke GitHub!
```

---

## 📋 Supabase Setup Checklist

```
✅ Project dibuat
✅ DATABASE_SCHEMA.sql di-run
✅ Tables tercipta (profiles, scripts, dll)
✅ RLS policies aktif
✅ Bucket script-images dibuat & PUBLIC
✅ Admin user dibuat (admin@shibascripter.com)
✅ User diset role ADMIN di profiles table
✅ API keys dicopy
```

---

## 🧪 Test Checklist

```
✅ npm run dev berjalan tanpa error
✅ Localhost:5173 bisa dibuka
✅ Logo ShibaScripter muncul
✅ Menu berfungsi
✅ Login dengan admin email
✅ Dashboard muncul
✅ Upload script berhasil
✅ Script muncul di Search
✅ Click script untuk lihat detail
✅ Copy code button bekerja
```

---

## 🚀 Deploy Checklist

### Via GitHub (Recommended)
```
✅ GitHub account buat
✅ Repository dibuat (ShibaScripter)
✅ Local: git init, add, commit, push
✅ Netlify: Connect GitHub repo
✅ Build command: npm run build
✅ Publish: dist
✅ Environment variables di-set (2 var)
✅ Deploy site
✅ Website online! ✨
```

### Via Manual CLI
```
✅ npm run build (create dist folder)
✅ npm install -g netlify-cli
✅ netlify login
✅ netlify deploy --prod --dir=dist
✅ Website online! ✨
```

---

## 🌐 URL Penting

| Layanan | URL |
|---------|-----|
| Node.js | https://nodejs.org |
| Supabase | https://supabase.com |
| Netlify | https://netlify.com |
| GitHub | https://github.com |

---

## 🔥 Error & Solusi Cepat

| Error | Solusi |
|-------|--------|
| `npm: command not found` | Install Node.js |
| `Cannot find module` | Run `npm install` |
| `VITE_SUPABASE_URL undefined` | Check `.env.local` |
| `Connection refused` | Check Supabase URL/Key |
| `RLS violation` | Check user role = ADMIN |
| `Upload fails` | Check bucket PUBLIC |
| `Build fails Netlify` | Set env vars di Netlify |

---

## 📁 Struktur Folder Penting

```
ShibaScripter-New/
├── src/
│   ├── App.jsx ← Main logic
│   ├── components/ ← UI components
│   ├── pages/ ← Page components
│   └── utils/supabase.js ← Database API
├── .env.local ← WAJIB create & isi!
├── package.json ← Dependencies
├── vite.config.js ← Build config
└── netlify.toml ← Deploy config
```

---

## 🔐 Keamanan

⚠️ **JANGAN:**
- Share `.env.local` ke orang lain
- Commit `.env.local` ke GitHub
- Publish API keys di public

✅ **HARUS:**
- Keep `.env.local` secure
- Gunakan `.gitignore` (sudah ada)
- Rotate keys jika compromised

---

## 📊 Folder + File Count

- 📁 Source files: **14 files**
- 📁 Components: **3 files**
- 📁 Pages: **7 files**
- 📁 Utils: **2 files**
- 📄 Config: **7 files**
- 📚 Docs: **10 files**

**Total: 43+ files, production-ready!**

---

## 💡 Tips & Tricks

### Development
- `npm run dev` untuk test lokal
- Press `r` untuk refresh halaman
- F12 untuk debug console
- Check `.env.local` jika ada error

### Database
- SQL Editor di Supabase untuk debug
- Check "Logs" untuk error database
- Monitor "Statistics" untuk usage

### Deployment
- GitHub + Netlify = auto-deploy!
- Jangan lupa environment variables
- Clear cache Netlify jika stuck

### Maintenance
- Regular check logs
- Monitor Supabase storage usage
- Update npm packages monthly
- Backup database (Supabase auto-backup)

---

## 🎓 Langkah Demi Langkah (Ringkas)

```
1. cd ShibaScripter-New
2. npm install
3. Create .env.local dengan Supabase keys
4. Setup Supabase (database schema + bucket)
5. npm run dev → test di localhost:5173
6. npm run build
7. netlify deploy --prod --dir=dist
8. Website online! 🎉
```

---

## ✅ Setelah Online

```
Weekly:
- Check website works
- Monitor Netlify logs
- Check Supabase stats

Monthly:
- Update npm packages
- Review user feedback
- Check security logs

Quarterly:
- Scale planning
- Feature roadmap
- Performance review
```

---

## 🆘 Need Help?

1. **Baca PANDUAN_INDONESIA.md** ← Full guide
2. **Check browser F12** ← Console errors
3. **Check Supabase logs** ← Database errors
4. **Check Netlify logs** ← Build errors

---

## 🎯 Success = ✅

Kalau Anda bisa lihat:
- ✅ Website di URL Netlify
- ✅ Logo ShibaScripter muncul
- ✅ Dark theme bekerja
- ✅ Login berhasil
- ✅ Upload script bekerja

**= SELAMAT, SUKSES! 🚀**

---

**Panduan Quick Reference v1.0 - Bahasa Indonesia**
