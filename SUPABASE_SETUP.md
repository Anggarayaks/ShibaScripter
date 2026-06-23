# Supabase Initial Setup Guide

## Step 1: Create Supabase Project

1. Go to https://supabase.com and sign up/login
2. Click "New Project"
3. Name it: `ShibaScripter`
4. Choose region closest to your users
5. Set password (save it!)
6. Click "Create new project"
7. Wait for project to be ready (~2 minutes)

## Step 2: Set Up Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy entire content from [DATABASE_SCHEMA.sql](./DATABASE_SCHEMA.sql)
4. Paste into the query editor
5. Click "Run"
6. Wait for success message
7. Close the query

## Step 3: Create Storage Bucket

1. Go to **Storage** in sidebar
2. Click "New bucket"
3. Name: `script-images`
4. Uncheck "Private bucket" (make it public)
5. Click "Create bucket"
6. Verify it appears in the list

## Step 4: Configure Authentication

1. Go to **Authentication** → **Providers**
2. Click "Email" to expand
3. Ensure it's enabled (toggle ON)
4. Go to **Email Templates** (optional)
5. Customize templates if desired
6. Go back to **Settings** → **General**
7. Copy your Project URL and Anon Key (you'll need these!)

## Step 5: Create Admin User

### Option A: Via Supabase Dashboard

1. Go to **Authentication** → **Users**
2. Click "Add user"
3. Email: `admin@shibascripter.com`
4. Password: (any strong password)
5. Click "Create user"
6. Note the User ID (copy it)

### Option B: Via SQL

1. Go to **SQL Editor** → New Query
2. Run this:
```sql
INSERT INTO profiles (id, username, email, role)
VALUES (
  'PASTE_USER_ID_HERE', 
  'ShibaScripter', 
  'admin@shibascripter.com', 
  'ADMIN'
);
```
(Replace PASTE_USER_ID_HERE with actual user ID)

## Step 6: Get API Keys

1. Go to **Settings** → **API**
2. Copy:
   - **Project URL** - your VITE_SUPABASE_URL
   - **Anon Key** (public) - your VITE_SUPABASE_ANON_KEY
3. Paste into `.env.local`:
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

## Step 7: Test Connection

1. In terminal: `npm run dev`
2. Open http://localhost:5173
3. Try to login with admin email
4. Should see dashboard
5. Check browser console for errors

## Step 8: Verify RLS Policies

1. Go to **Authentication** → **Policies**
2. You should see policies for:
   - profiles
   - scripts
   - categories
   - reports
   - suggestions
3. All should show green checkmarks

## Common Issues & Solutions

### Issue: "Row Level Security violation" when uploading
**Solution:** Check you're logged in as ADMIN. Go to profiles table and verify role is 'ADMIN'.

### Issue: Image upload fails
**Solution:** 
1. Check script-images bucket exists in Storage
2. Bucket must be public (not private)
3. Check bucket permissions

### Issue: "Connection refused"
**Solution:**
1. Check VITE_SUPABASE_URL is correct
2. Check VITE_SUPABASE_ANON_KEY is correct
3. Make sure .env.local exists
4. Restart dev server with `npm run dev`

### Issue: Tables not created
**Solution:**
1. Go back to SQL Editor
2. Paste entire DATABASE_SCHEMA.sql again
3. Click Run
4. Check for error messages

## Verify Everything Works

1. **Check Tables:**
   - Go to **Table Editor**
   - Should see: profiles, scripts, categories, reports, suggestions
   - Each should have columns matching the schema

2. **Check RLS is Enabled:**
   - Click on `scripts` table
   - Go to **RLS** tab
   - Should show "Enable RLS" is checked

3. **Check Bucket:**
   - Go to **Storage** → **script-images**
   - Should show "Public bucket"

4. **Check Auth:**
   - Go to **Authentication** → **Users**
   - Should see your admin user listed

## Next Steps

Once verified:
1. Create `.env.local` with credentials
2. Run `npm install`
3. Run `npm run dev`
4. Test login and basic features
5. Deploy to Netlify when ready

## Useful Supabase Links

- Documentation: https://supabase.com/docs
- Console: https://app.supabase.com
- Pricing: https://supabase.com/pricing
- Status: https://status.supabase.com
