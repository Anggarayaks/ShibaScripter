# 🚀 Quick Start Guide - 5 Minutes to Running ShibaScripter

## Step 1: Install Dependencies (2 minutes)

```bash
cd ShibaScripter-New
npm install
```

## Step 2: Create Supabase Project (1 minute)

1. Go to https://supabase.com
2. Sign up (free)
3. Click "New Project"
4. Name: `ShibaScripter`
5. Set password, choose region
6. Wait for project ready

## Step 3: Set Up Database (1 minute)

1. In Supabase, go to **SQL Editor**
2. Click "New Query"
3. Copy all content from `DATABASE_SCHEMA.sql`
4. Paste into editor
5. Click "Run"

## Step 4: Create Storage Bucket (30 seconds)

1. Go to **Storage** in sidebar
2. Click "New bucket"
3. Name: `script-images`
4. Uncheck "Private bucket"
5. Click "Create bucket"

## Step 5: Get Your API Keys (30 seconds)

1. Go to **Settings** → **API**
2. Copy **Project URL**
3. Copy **Anon Key** (public)

## Step 6: Configure Environment

1. In `ShibaScripter-New` folder, create `.env.local`:

```
VITE_SUPABASE_URL=paste_your_url_here
VITE_SUPABASE_ANON_KEY=paste_your_key_here
```

2. Paste the values you copied in Step 5

## Step 7: Start Development Server

```bash
npm run dev
```

Open http://localhost:5173 in your browser

## Step 8: Create Admin User

1. In Supabase, go to **Authentication** → **Users**
2. Click "Add user"
3. Email: `admin@shibascripter.com`
4. Password: anything you want
5. Click "Create user"
6. Copy the User ID

Then go back to **SQL Editor** and run:

```sql
INSERT INTO profiles (id, username, email, role)
VALUES ('PASTE_USER_ID_HERE', 'ShibaScripter', 'admin@shibascripter.com', 'ADMIN');
```

(Replace PASTE_USER_ID_HERE with actual user ID)

## Step 9: Test Login

1. Click "Login" button on website
2. Enter: `admin@shibascripter.com`
3. Enter the password you set
4. Should see Dashboard
5. Try uploading a test script!

## Done! 🎉

Your ShibaScripter is now running locally!

### What's Next?

- **Upload Scripts** - Click Dashboard → Upload Script
- **Browse Scripts** - Click "Cari Script"
- **Deploy** - When ready, see [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Documentation** - Read [README.md](./README.md)

### Useful Commands

```bash
# Stop server
Press Ctrl+C

# Restart server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Need Help?

1. Check [README.md](./README.md) - Full documentation
2. Check [SETUP.md](./SETUP.md) - Detailed setup guide
3. Check [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Supabase help
4. Check browser console for errors (F12)
5. Check Supabase logs in dashboard

### Common Issues

**Issue:** "Cannot find module" error
- **Fix:** Run `npm install` again

**Issue:** Supabase connection error
- **Fix:** Check `.env.local` has correct values, restart server

**Issue:** Image upload fails
- **Fix:** Make sure script-images bucket is PUBLIC (not private)

**Issue:** Login fails
- **Fix:** Make sure admin user is created and role is 'ADMIN' in profiles table

**Issue:** Page shows "Loading..." forever
- **Fix:** Check browser console for errors, check Supabase is connected

---

**Happy scripting! 🎉**

For full documentation, see:
- [README.md](./README.md) - Project overview
- [SETUP.md](./SETUP.md) - Complete setup guide
- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Database setup
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deploy to production
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - Code structure
