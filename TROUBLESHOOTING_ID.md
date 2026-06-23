# 🔧 Panduan Troubleshooting Lengkap - Bahasa Indonesia

## ⚠️ Masalah Umum & Solusi

---

## 🚨 SEBELUM SETUP

### ❌ "npm: command not found"

**Penyebab:** Node.js tidak terinstall

**Solusi:**
1. Download dari https://nodejs.org
2. Install versi **LTS**
3. Pilih default settings
4. **Restart komputer**
5. Buka terminal baru
6. Test: `node --version`

---

### ❌ "npx: command not found"

**Penyebab:** npm belum terinstall dengan benar

**Solusi:**
```bash
# Test npm
npm --version

# Jika tidak bisa, reinstall Node.js
# Download dari https://nodejs.org
```

---

## 🏗️ MASALAH INSTALL

### ❌ "npm ERR! code ERESOLVE"

**Penyebab:** Dependency conflict

**Solusi:**
```bash
# Clear cache
npm cache clean --force

# Install ulang dengan legacy flag
npm install --legacy-peer-deps
```

---

### ❌ "npm ERR! permission denied"

**Penyebab:** Permission issue

**Solusi (Windows):**
```bash
# Jalankan terminal sebagai Administrator
# Klik kanan Command Prompt → Run as Administrator
# Ketik: npm install
```

**Solusi (Mac/Linux):**
```bash
# Gunakan sudo (hati-hati)
sudo npm install

# Atau fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

---

### ❌ "npm WARN old peer dependency"

**Penyebab:** Version compatibility warning

**Solusi:** Abaikan, tidak masalah
```bash
# Tetap lanjut, gunakan:
npm install --legacy-peer-deps
```

---

## ⚙️ MASALAH ENVIRONMENT

### ❌ "VITE_SUPABASE_URL is undefined"

**Penyebab:** `.env.local` tidak ada atau salah

**Solusi:**

1. **Verifikasi file ada:**
   ```bash
   ls .env.local
   ```
   Jika error, file belum ada

2. **Buat file `.env.local`:**
   - Buka text editor (Notepad, VS Code)
   - Buat file baru
   - Isi dengan:
   ```
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```
   - Save as `.env.local` (jangan `.env.txt` atau `.env`)
   - Taruh di root folder `ShibaScripter-New`

3. **Verifikasi isi file:**
   - Tidak boleh ada spasi di awal/akhir baris
   - Tidak boleh ada quote
   - Format: `KEY=VALUE`

4. **Restart terminal & server:**
   ```bash
   # Berhenti server (Ctrl+C)
   # Mulai ulang:
   npm run dev
   ```

---

### ❌ "Cannot find .env.local"

**Penyebab:** File belum dibuat

**Solusi:**

**Cara 1: Via Terminal**
```bash
# Copy dari template
cp .env.example .env.local

# Edit filenya
nano .env.local
# (Isi nilai, Ctrl+O untuk save, Ctrl+X untuk exit)
```

**Cara 2: Via Text Editor**
1. Buka folder `ShibaScripter-New` di VS Code
2. Klik File → New File
3. Beri nama: `.env.local`
4. Isi dengan:
   ```
   VITE_SUPABASE_URL=your_url_here
   VITE_SUPABASE_ANON_KEY=your_key_here
   ```
5. Save (Ctrl+S)

---

### ❌ ".env.local is not recognized"

**Penyebab:** File extensions disembunyikan

**Solusi (Windows):**
1. Buka File Explorer
2. View → Uncheck "Hide extensions for known file types"
3. Pastikan file benar-benar bernama `.env.local` (bukan `.env.local.txt`)

---

## 🔌 MASALAH SUPABASE

### ❌ "Cannot connect to Supabase"

**Penyebab:** 
- URL/Key salah
- Supabase project belum ready
- Network error

**Solusi:**

1. **Verify API Keys:**
   - Buka https://supabase.com
   - Buka project Anda
   - Settings → API
   - Copy ulang values (pastikan tidak ada typo)
   - Update `.env.local`

2. **Test connection di SQL Editor:**
   - Di Supabase, buka SQL Editor
   - Buat query: `SELECT 1`
   - Run → kalau berhasil, connection OK

3. **Check network:**
   ```bash
   # Test bisa akses Supabase
   ping supabase.com
   # Jika bisa reply, network OK
   ```

---

### ❌ "Table tidak ada"

**Penyebab:** DATABASE_SCHEMA.sql belum di-run

**Solusi:**

1. Buka Supabase → SQL Editor
2. Buat New Query
3. Copy isi file `DATABASE_SCHEMA.sql`
4. Paste ke SQL Editor
5. Klik **Run**
6. Tunggu sampai "Success"

**Verify:**
- Buka **Table Editor** di Supabase
- Seharusnya ada tables: `profiles`, `scripts`, `categories`, `reports`, `suggestions`

---

### ❌ "RLS violation / Row Level Security policy error"

**Penyebab:** User bukan ADMIN atau policies error

**Solusi:**

1. **Verify user adalah ADMIN:**
   ```bash
   # Di Supabase SQL Editor:
   SELECT id, email, role FROM profiles LIMIT 10;
   ```
   - Pastikan role = `ADMIN` untuk user Anda

2. **Jika tidak, update:**
   ```sql
   UPDATE profiles 
   SET role = 'ADMIN' 
   WHERE email = 'admin@shibascripter.com';
   ```

3. **Verify RLS aktif:**
   - Di Supabase, buka table `scripts`
   - Tab **RLS** → Seharusnya ada Enable button

---

### ❌ "Bucket script-images not found"

**Penyebab:** Bucket belum dibuat atau private

**Solusi:**

1. **Verify bucket ada:**
   - Supabase → Storage
   - Seharusnya ada bucket `script-images`

2. **Jika tidak ada, create:**
   - Klik "New bucket"
   - Name: `script-images`
   - **UNCHECK** "Private bucket"
   - Create

3. **Jika private, set public:**
   - Klik bucket
   - Settings
   - Toggle "Make bucket public"

---

### ❌ "Upload image fails"

**Penyebab:**
- Bucket tidak public
- Storage limit exceeded
- File terlalu besar

**Solusi:**

1. **Check bucket public:**
   - Supabase → Storage → script-images
   - Settings → "Make bucket public"

2. **Check file size:**
   - Limit: 5MB
   - Compress jika perlu
   - Tool: https://tinypng.com

3. **Check storage usage:**
   - Settings → Billing
   - Lihat "Storage used"

---

### ❌ "Authentication user not found"

**Penyebab:** User belum ada di profiles table

**Solusi:**

1. **Verify user ada di Supabase:**
   - Authentication → Users
   - Seharusnya ada user `admin@shibascripter.com`

2. **Jika tidak ada, create:**
   - Add user
   - Email: `admin@shibascripter.com`
   - Password: (ingat passwordnya!)
   - Create

3. **Copy User ID:**
   - Lihat user di list
   - Copy bagian ID (panjang, belakang nama)

4. **Add ke profiles table:**
   ```sql
   INSERT INTO profiles (id, username, email, role)
   VALUES (
     'USER_ID_HERE',
     'ShibaScripter',
     'admin@shibascripter.com',
     'ADMIN'
   );
   ```

---

## 🖥️ MASALAH DEVELOPMENT SERVER

### ❌ "Port 5173 already in use"

**Penyebab:** Port sudah dipakai process lain

**Solusi:**

```bash
# Kill process di port 5173
# Windows:
netstat -ano | findstr :5173
taskkill /PID [PID_NUMBER] /F

# Mac/Linux:
lsof -ti:5173 | xargs kill -9

# Atau gunakan port berbeda:
npm run dev -- --port 3000
```

---

### ❌ "npm run dev tidak berjalan"

**Penyebab:** Dependency corrupt atau cache problem

**Solusi:**

```bash
# Clear semua cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules  # Mac/Linux
rmdir /s node_modules  # Windows

# Install ulang
npm install

# Try dev lagi
npm run dev
```

---

### ❌ "Module not found / Cannot find module"

**Penyebab:** 
- Dependency belum install
- Import path salah
- Typo di nama file

**Solusi:**

1. **Verify dependencies installed:**
   ```bash
   npm list --depth=0
   ```
   Seharusnya ada: react, react-dom, @supabase/supabase-js

2. **Reinstall:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Check import path:**
   - Verifikasi spelling
   - File harus ada di folder yang disebutkan
   - Case-sensitive (huruf besar/kecil penting!)

---

### ❌ "Localhost:5173 refused to connect"

**Penyebab:** Dev server tidak running

**Solusi:**

1. **Check terminal:**
   - Pastikan terminal menunjukkan:
     ```
     ➜  Local:   http://localhost:5173/
     ```

2. **Start server:**
   ```bash
   npm run dev
   ```

3. **Wait sampai melihat "ready"**

4. **Buka browser & refresh page**

---

### ❌ "Styles not applied / CSS tidak muncul"

**Penyebab:** Tailwind CSS tidak loaded

**Solusi:**

1. **Check Tailwind installed:**
   ```bash
   npm list tailwindcss
   ```

2. **Verify tailwind.config.js ada:**
   - Root folder `ShibaScripter-New`

3. **Check index.css imported:**
   - File `src/main.jsx` should import `./styles/index.css`

4. **Restart dev server:**
   ```bash
   # Ctrl+C untuk stop
   # npm run dev untuk start lagi
   ```

---

## 🧪 MASALAH TESTING

### ❌ "Login gagal"

**Penyebab:**
- Email/password salah
- User belum ada
- Database error

**Solusi:**

1. **Verify credentials:**
   - Email: `admin@shibascripter.com`
   - Password: (yang Anda set saat create user)

2. **Verify user ada:**
   - Supabase → Authentication → Users
   - Cari user dengan email Anda

3. **Check Supabase logs:**
   - SQL Editor → lihat error messages

---

### ❌ "Upload script error"

**Penyebab:**
- Validation gagal (form tidak lengkap)
- Database error
- Storage error

**Solusi:**

1. **Pastikan form lengkap:**
   - Judul ✅
   - Deskripsi ✅
   - Kategori ✅
   - Code ✅
   - Image (optional)

2. **Check browser console (F12):**
   - Buka Tab Console
   - Cari error message spesifik

3. **Check Supabase logs:**
   - SQL Editor
   - Run: `SELECT * FROM scripts ORDER BY created_at DESC LIMIT 1`

---

### ❌ "Database query error di browser"

**Penyebab:**
- RLS policy blocking
- Connection error
- Typo di query

**Solusi:**

1. **Check console (F12):**
   - Lihat exact error message
   - Screenshot atau catat error

2. **Check Supabase logs:**
   - Buka project
   - Check error logs di dashboard

3. **Verify RLS:**
   - SQL Editor: `SELECT * FROM pg_policies WHERE tablename = 'scripts'`

---

## 📦 MASALAH BUILD

### ❌ "npm run build gagal"

**Penyebab:**
- Syntax error di code
- Missing dependencies
- Configuration error

**Solusi:**

1. **Read error message carefully:**
   - Terminal menampilkan exact error
   - Scroll ke atas untuk melihat mulai

2. **Common fixes:**
   ```bash
   # Check syntax
   npm run build -- --debug

   # Clear cache
   npm cache clean --force

   # Rebuild
   npm run build
   ```

3. **Check code:**
   - Error message menunjuk file & line
   - Fix syntax error tersebut

---

### ❌ "dist folder tidak tercipta"

**Penyebab:** Build gagal sebelum create dist

**Solusi:**

1. **Run build dengan verbose:**
   ```bash
   npm run build
   ```

2. **Check terminal untuk error:**
   - Baca output carefully
   - Fix error terlebih dahulu

3. **Verify vite.config.js:**
   - Harus ada `build: { outDir: 'dist' }`

---

## 🚀 MASALAH DEPLOY

### ❌ "Netlify build fails"

**Penyebab:**
- Environment variables not set
- Build command wrong
- Publish directory wrong

**Solusi:**

1. **Check Netlify build settings:**
   - Build command: `npm run build`
   - Publish: `dist`

2. **Set environment variables:**
   - Settings → Environment → Add variable
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

3. **Check build logs:**
   - Netlify dashboard → Deploys
   - Klik build yang gagal
   - Lihat full logs

4. **Redeploy:**
   - Clear cache: Site settings → Clear cache
   - Retry deploy

---

### ❌ "GitHub push fails"

**Penyebab:**
- SSH key not configured
- Branch protection
- File conflicts

**Solusi:**

```bash
# Test GitHub connection
ssh -T git@github.com

# Setup SSH key (jika needed)
# https://docs.github.com/en/authentication/connecting-to-github-with-ssh

# Atau pakai HTTPS:
git remote set-url origin https://github.com/USERNAME/ShibaScripter.git

# Try push lagi
git push
```

---

### ❌ "Website shows 'Page not found'"

**Penyebab:**
- netlify.toml tidak ada
- SPA routing tidak configured
- Deploy belum selesai

**Solusi:**

1. **Check netlify.toml ada:**
   - Root folder `ShibaScripter-New`
   - Content:
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Check deploy selesai:**
   - Netlify → Deploys
   - Status harus "Published"

3. **Clear cache:**
   - Site settings → Clear cache
   - Hard refresh: Ctrl+Shift+R

---

### ❌ "Cannot read environment variables"

**Penyebab:**
- Variables tidak set di Netlify
- Variable names typo
- Cache lama

**Solusi:**

1. **Set variables di Netlify:**
   - Site settings → Environment
   - Add variable:
     ```
     Key: VITE_SUPABASE_URL
     Value: https://xxxxx.supabase.co
     ```
   - Add variable:
     ```
     Key: VITE_SUPABASE_ANON_KEY
     Value: eyJ...
     ```

2. **Redeploy:**
   - Force redeploy tanpa build cache
   - Site settings → Deploys → Trigger deploy

3. **Check di browser:**
   - F12 → Network tab
   - Lihat ada error tentang undefined variables

---

## 🌐 MASALAH WEBSITE ONLINE

### ❌ "Website lambat"

**Penyebab:**
- Bundle besar
- Slow database queries
- Network latency

**Solusi:**

1. **Check bundle size:**
   ```bash
   npm run build
   # Lihat ukuran di terminal
   ```

2. **Optimize:**
   - Compress images
   - Remove unused code
   - Check Netlify CDN region

3. **Check database:**
   - Supabase analytics
   - Add indexes ke frequently queried columns

---

### ❌ "Monetag ads tidak muncul"

**Penyebab:**
- Service worker tidak register
- Script belum load
- Adblock aktif

**Solusi:**

1. **Check service worker:**
   - F12 → Application → Service Workers
   - Seharusnya registered

2. **Check console:**
   - F12 → Console
   - Cari Monetag messages
   - Lihat ada error?

3. **Disable adblock:**
   - Disable di browser
   - Refresh page

4. **Wait:**
   - Monetag ambil waktu ~1-2 menit untuk load
   - Refresh ulang

---

### ❌ "Database error saat online"

**Penyebab:**
- RLS policy blocking
- Connection timeout
- Supabase down

**Solusi:**

1. **Check Supabase status:**
   - https://status.supabase.com
   - Lihat ada incident?

2. **Check logs:**
   - Supabase → Logs
   - Lihat error details

3. **Verify RLS:**
   - Table → RLS tab
   - Check policies aktif

4. **Retry:**
   - Refresh website
   - Wait 5 menit
   - Try again

---

## 📞 JIKA MASIH STUCK

### Cari bantuan:

1. **Read full documentation:**
   - [PANDUAN_INDONESIA.md](./PANDUAN_INDONESIA.md) - Full guide
   - [README.md](./README.md) - Technical docs
   - [SETUP.md](./SETUP.md) - Setup details

2. **Check browser console:**
   - F12 → Console tab
   - Screenshot error
   - Baca message carefully

3. **Check specific docs:**
   - Supabase error? → Check [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
   - Build error? → Check [README.md](./README.md)
   - Deployment error? → Check [DEPLOYMENT.md](./DEPLOYMENT.md)

4. **Search online:**
   - Copy error message
   - Paste di Google
   - Cari solusi yang relatable

---

## ✅ Checklist Debug

Sebelum give up, verify:

- [ ] Terminal error message dibaca carefully
- [ ] Browser console (F12) dicek
- [ ] .env.local sudah diisi correct
- [ ] Supabase project sudah ready
- [ ] Database schema sudah di-run
- [ ] npm install sudah selesai
- [ ] Dev server sudah running
- [ ] Port 5173 tidak conflict
- [ ] Internet connection stabil
- [ ] Tidak ada typo di code/config

---

**Good luck! You'll figure it out! 💪**

Jika masih ada masalah, documentation kami very comprehensive. Baca dengan sabar, biasanya solusi ada di sana.
