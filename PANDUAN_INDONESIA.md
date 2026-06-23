# 🚀 Panduan Lengkap ShibaScripter ke Online - Bahasa Indonesia

## 📋 Daftar Isi
1. [Persiapan Awal](#persiapan-awal)
2. [Setup Lokal](#setup-lokal)
3. [Setup Supabase](#setup-supabase)
4. [Test Lokal](#test-lokal)
5. [Deploy ke Netlify](#deploy-ke-netlify)
6. [Troubleshooting](#troubleshooting)

---

## 🎯 Persiapan Awal

Sebelum memulai, pastikan Anda sudah memiliki:

### Instalasi yang Diperlukan

#### 1. Node.js & NPM
- Download dari: https://nodejs.org
- Pilih **LTS** (versi stabil)
- Install dengan default settings

**Verifikasi instalasi:**
```bash
node --version
npm --version
```

Harusnya menampilkan versi (contoh: v18.16.0)

#### 2. Git (Opsional tapi Recommended)
- Download dari: https://git-scm.com
- Install dengan default settings

**Verifikasi:**
```bash
git --version
```

#### 3. Visual Studio Code (Opsional)
- Download dari: https://code.visualstudio.com
- Ini akan membuat coding lebih mudah

### Akun yang Diperlukan

#### 1. Supabase (Gratis)
- Buat akun di: https://supabase.com
- Gunakan email atau GitHub untuk login
- Catat email dan password Anda

#### 2. Netlify (Gratis)
- Buat akun di: https://netlify.com
- Bisa login dengan GitHub nanti
- Minimal login dengan email

#### 3. GitHub (Opsional tapi Recommended untuk Deploy)
- Buat akun di: https://github.com
- Sangat membantu untuk deployment otomatis

---

## 🏗️ Setup Lokal

### Step 1: Buka Terminal

**Windows:**
- Tekan `Windows + R`
- Ketik `cmd` atau `powershell`
- Enter

**Mac/Linux:**
- Buka Terminal aplikasi

### Step 2: Navigasi ke Folder Project

```bash
cd Documents\website\ShibaScripter-New
```

(Sesuaikan path dengan lokasi folder Anda)

**Verifikasi Anda di folder yang benar:**
```bash
ls
```

Harusnya melihat file: `package.json`, `vite.config.js`, dll.

### Step 3: Install Dependencies

```bash
npm install
```

⏳ **Ini akan mengunduh ~500MB, tunggu hingga selesai**

Seharusnya berakhir dengan:
```
added XXX packages
```

### Step 4: Verifikasi Install

```bash
npm list --depth=0
```

Seharusnya menampilkan:
- react
- react-dom
- @supabase/supabase-js

---

## 🗄️ Setup Supabase

### Step 1: Buat Project Supabase

1. Buka https://supabase.com
2. Klik **"New Project"** atau **"Create new project"**

![Supabase Dashboard](https://via.placeholder.com/400x300?text=Supabase+Dashboard)

3. Isi form:
   - **Name**: `ShibaScripter`
   - **Database Password**: (minimal 8 karakter, cukup kompleks)
   - **Region**: Pilih yang terdekat dengan Anda (contoh: `ap-southeast-1` untuk Indonesia)

4. Klik **"Create new project"**

⏳ **Tunggu ~2 menit sampai project siap**

Anda akan melihat dashboard dengan "Connected" status.

### Step 2: Buat Database Schema

1. Di sidebar kiri, klik **"SQL Editor"**
2. Klik **"New Query"**

![SQL Editor](https://via.placeholder.com/400x300?text=SQL+Editor)

3. **Copy semua kode** dari file `DATABASE_SCHEMA.sql` di project folder

4. **Paste ke dalam query editor** Supabase

5. Klik tombol **"Run"** (hijau, pojok kanan atas)

⏳ **Tunggu beberapa detik sampai muncul "Success"**

Sekarang Anda sudah punya semua database tables!

### Step 3: Buat Storage Bucket

1. Di sidebar, klik **"Storage"**
2. Klik **"New bucket"**

![Storage](https://via.placeholder.com/400x300?text=Storage+Bucket)

3. Isi form:
   - **Name**: `script-images`
   - **Uncheck** "Private bucket" (biarkan PUBLIC)

4. Klik **"Create bucket"**

Sekarang Anda punya folder untuk upload gambar!

### Step 4: Dapatkan API Keys

1. Di sidebar, klik **"Settings"** (gear icon)
2. Di submenu, klik **"API"**

![API Settings](https://via.placeholder.com/400x300?text=API+Keys)

3. Copy dua nilai ini:
   - **Project URL** (dibawah "Configuration")
   - **Anon Key** (public) - jangan yang "service_role"

**PENTING: Catat kedua nilai ini, Anda akan butuh segera!**

### Step 5: Buat Admin User

1. Di sidebar, klik **"Authentication"**
2. Klik **"Users"** di submenu
3. Klik **"Add user"** (biru, pojok kanan atas)

![Add User](https://via.placeholder.com/400x300?text=Add+User)

4. Isi form:
   - **Email**: `admin@shibascripter.com`
   - **Password**: (minimal 6 karakter, ingat passwordnya!)
   - **Uncheck** "Auto confirm user" (biarkan unchecked)

5. Klik **"Create user"**

Sekarang Anda akan lihat user di list. **Copy User ID** (panjang, seperti `abc123def456...`)

### Step 6: Set Role Admin di Database

1. Kembali ke **"SQL Editor"**
2. Klik **"New Query"**
3. Copy-paste code ini:

```sql
INSERT INTO profiles (id, username, email, role)
VALUES (
  'PASTE_USER_ID_HERE',
  'ShibaScripter',
  'admin@shibascripter.com',
  'ADMIN'
);
```

4. **Ganti `PASTE_USER_ID_HERE`** dengan User ID yang Anda copy tadi
5. Klik **"Run"**

✅ Admin user sudah siap login!

---

## ⚙️ Konfigurasi Environment

### Step 1: Buat File `.env.local`

1. Buka folder `ShibaScripter-New` di Text Editor atau VS Code
2. Buat file baru bernama `.env.local`

### Step 2: Isi File Environment

Isi file dengan:

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

**Ganti nilai dengan:**
- `VITE_SUPABASE_URL` = Project URL dari Step 4 Supabase
- `VITE_SUPABASE_ANON_KEY` = Anon Key dari Step 4 Supabase

**Contoh isi file yang benar:**
```
VITE_SUPABASE_URL=https://xyzsample.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**PENTING:** 
- Jangan ada spasi sebelum/sesudah `=`
- Jangan ada quote (`"` atau `'`) di sekitar nilai
- File ini JANGAN di-share ke orang lain!

### Step 3: Verifikasi File

Pastikan file `.env.local` sudah ada di folder `ShibaScripter-New`

```bash
ls .env*
```

Harusnya menampilkan:
```
.env.example
.env.local
```

✅ Setup environment selesai!

---

## 🧪 Test Lokal

### Step 1: Start Development Server

```bash
npm run dev
```

Harusnya melihat:
```
  VITE v5.0.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Press q to quit
```

### Step 2: Buka di Browser

Buka browser (Chrome, Firefox, dll) dan ketik:
```
http://localhost:5173
```

✅ Seharusnya melihat website ShibaScripter dengan tema gelap!

### Step 3: Test Login

1. Klik tombol **"Login"**
2. Masukkan:
   - Email: `admin@shibascripter.com`
   - Password: (password yang Anda set)
3. Klik **"Masuk"**

✅ Seharusnya masuk ke Dashboard!

### Step 4: Test Upload Script

1. Klik **"Upload"** di Dashboard
2. Isi form:
   - **Judul**: Test Script
   - **Deskripsi**: Ini adalah test
   - **Kategori**: Buat kategori baru → "Test"
   - **Kode**: `print("Hello World")`
3. Klik **"Unggah Script Sekarang"**

✅ Script seharusnya muncul di Dashboard!

### Step 5: Test Search

1. Klik **"Cari Script"** di menu
2. Seharusnya melihat script yang Anda upload
3. Klik script untuk lihat detail

✅ Semua berfungsi!

### Step 6: Stop Server

Untuk berhenti, di terminal tekan:
```
q
```

Atau `Ctrl+C`

---

## 🚀 Deploy ke Netlify

### Option A: Deploy via GitHub (Recommended - Otomatis)

#### Step 1: Setup GitHub

1. Buat akun di: https://github.com
2. Buat repository baru (nama: `ShibaScripter`)
3. Di komputer, terminal:

```bash
cd ShibaScripter-New
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/ShibaScripter.git
git push -u origin main
```

(Ganti `USERNAME` dengan username GitHub Anda)

#### Step 2: Connect Netlify dengan GitHub

1. Buka https://netlify.com
2. Klik **"New site from Git"** atau **"Connect a repository"**
3. Pilih **GitHub**
4. Authorize Netlify di GitHub
5. Select repository: `ShibaScripter`

#### Step 3: Configure Build Settings

1. Build command: `npm run build`
2. Publish directory: `dist`
3. Klik **"Deploy site"**

⏳ **Tunggu ~1-2 menit, Netlify akan build dan deploy otomatis**

#### Step 4: Set Environment Variables

1. Di Netlify, pergi ke **Settings** → **Environment variables**
2. Klik **"Add variable"** untuk setiap:

```
VITE_SUPABASE_URL = [nilai dari Supabase]
VITE_SUPABASE_ANON_KEY = [nilai dari Supabase]
```

3. Klik **"Deploy"** atau tunggu redeploy otomatis

✅ Website Anda sudah ONLINE!

#### Step 5: Update DNS (Opsional - Custom Domain)

Jika punya domain sendiri:
1. Di Netlify, pergi ke **Domain settings**
2. Ikuti instruksi untuk update DNS di registrar
3. Tunggu ~24 jam sampai live

---

### Option B: Deploy Manual via CLI

Jika tidak mau GitHub:

#### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

#### Step 2: Login ke Netlify

```bash
netlify login
```

Browser akan terbuka, login dengan akun Netlify Anda.

#### Step 3: Deploy

```bash
npm run build
netlify deploy --prod --dir=dist
```

#### Step 4: Ikuti Petunjuk

- Buat site baru atau select existing
- Confirm publish directory: `dist`
- Deploy!

✅ Website langsung online!

---

## 🌐 Verifikasi Website Online

### Test Website

1. Buka URL yang Netlify berikan
2. Test semua fitur:
   - ✅ Home page load
   - ✅ Search page berfungsi
   - ✅ Login berhasil
   - ✅ Upload script bekerja
   - ✅ Ads Monetag muncul

### Troubleshoot

**Error "Cannot find module"?**
- Build error, check console di Netlify
- Pastikan `.env` variables sudah set di Netlify

**Monetag ads tidak muncul?**
- Tunggu 1-2 menit untuk caching
- Clear cache browser (Ctrl+Shift+Delete)
- Check console browser (F12)

**Database query error?**
- Pastikan RLS policies aktif di Supabase
- Check Supabase logs

---

## 📊 Monitoring Website

### Check Website Status

1. Di Netlify dashboard, lihat "Site overview"
2. Green checkmark = Online dan sehat
3. Klik untuk melihat logs

### Monitor Database

1. Di Supabase dashboard
2. Lihat "Statistics" untuk usage
3. Check "Logs" jika ada error

### Monitor Performance

1. Di Netlify, buka **"Analytics"**
2. Lihat traffic dan performance
3. Check error logs jika ada

---

## 🔄 Update Website

### Jika Pakai GitHub (Recommended)

1. Edit code di lokal
2. Test dengan `npm run dev`
3. Commit dan push:
```bash
git add .
git commit -m "Describe changes"
git push
```

Netlify akan **otomatis rebuild dan redeploy!**

### Jika Deploy Manual

1. Edit code
2. Build: `npm run build`
3. Deploy: `netlify deploy --prod --dir=dist`

---

## 🎓 Next Steps

### Segera Setelah Online
- [ ] Test semua fitur di website online
- [ ] Verifikasi Monetag ads berfungsi
- [ ] Upload beberapa script test
- [ ] Share URL dengan teman

### Minggu Pertama
- [ ] Monitor traffic dan errors
- [ ] Optimize jika ada yang lambat
- [ ] Collect user feedback
- [ ] Fix bugs yang ditemukan

### Jangka Panjang
- [ ] Add custom domain
- [ ] Setup email notifications
- [ ] Integrate analytics
- [ ] Plan untuk fitur baru

---

## 🆘 Troubleshooting Guide

### Problem: "npm: command not found"
**Solusi:**
- Node.js tidak terinstall
- Download dan install dari https://nodejs.org

### Problem: ".env.local is not recognized"
**Solusi:**
- File harus bernama `.env.local` (tidak `.env` atau `.env.txt`)
- Restart terminal setelah create file
- Restart `npm run dev`

### Problem: "Cannot connect to Supabase"
**Solusi:**
- Check `.env.local` - pastikan URL dan KEY benar
- Test connection di Supabase → SQL Editor → Run `SELECT 1`
- Check Supabase API keys belum kedaluwarsa

### Problem: "Upload image fails"
**Solusi:**
- Check bucket `script-images` ada dan PUBLIC
- Check storage limit di Supabase
- Try image yang lebih kecil (<5MB)

### Problem: "Login fails"
**Solusi:**
- Check email dan password benar
- Verify user ada di Supabase → Authentication → Users
- Check profiles table punya entry untuk user

### Problem: "Netlify shows 'Page not found'"
**Solusi:**
- Check `netlify.toml` ada di root folder
- Publish directory harus `dist`
- Try clear Netlify cache → Site settings → Clear cache

### Problem: "Build fails di Netlify"
**Solusi:**
- Check build logs di Netlify Deploy tab
- Setup environment variables di Netlify Settings
- Try local build dengan `npm run build`

### Problem: "Website lambat"
**Solusi:**
- Check bundle size: `npm run build` → lihat console
- Optimize images (compress dulu)
- Check database queries - add indexes jika perlu
- Check Netlify location - mungkin pilih region berbeda

---

## ✅ Checklist Final

Sebelum launch resmi, pastikan:

- [ ] Website bisa diakses dari internet
- [ ] Semua fitur bekerja dengan baik
- [ ] Login dengan admin bekerja
- [ ] Upload script bekerja
- [ ] Monetag ads muncul
- [ ] Mobile responsive bekerja
- [ ] No console errors (F12)
- [ ] Database backup sudah aktif (Supabase default)
- [ ] Custom domain sudah set (optional)
- [ ] Tell people about your site!

---

## 📞 Need More Help?

- **Technical Docs**: Lihat [README.md](./README.md)
- **Code Issues**: Check [SETUP.md](./SETUP.md)
- **Database Help**: Check [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
- **Deployment Help**: Check [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🎉 Selesai!

Selamat! Website Anda sudah **ONLINE** dan siap digunakan!

```
✅ Code: GitHub
✅ Build: Netlify
✅ Database: Supabase
✅ Storage: Supabase Storage
✅ Ads: Monetag
✅ Domain: Netlify (atau custom)
```

**Share dengan komunitas dan nikmati platform Anda!** 🚀

---

**Created: 2026-06-22**  
**Language: Indonesian (Bahasa Indonesia)**  
**Target: Complete step-by-step guide to production**
