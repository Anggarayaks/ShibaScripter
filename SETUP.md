# ShibaScripter Migration Guide

## Setup Instructions

### 1. Supabase Setup

1. Create a new Supabase project at https://supabase.com
2. In the SQL Editor, copy and paste the entire content from `DATABASE_SCHEMA.sql`
3. Execute the SQL to create all tables and policies
4. Go to Storage → Create bucket → Name it `script-images`
5. Set the bucket to public
6. Copy your project URL and anon key from Settings → API

### 2. Environment Configuration

1. Copy `.env.example` to `.env.local`
2. Fill in your Supabase URL and anon key:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Initial Admin User

1. Go to Supabase Authentication → Users
2. Create a new user with your admin email
3. Copy the user ID
4. Go to the SQL Editor and run:
```sql
INSERT INTO profiles (id, username, email, role)
VALUES ('PASTE_USER_ID_HERE', 'ShibaScripter', 'admin@shibascripter.com', 'ADMIN');
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Development

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### 6. Production Build

```bash
npm run build
```

### 7. Deploy to Netlify

#### Option A: Via Netlify CLI
```bash
npm install -g netlify-cli
netlify deploy
```

#### Option B: Via GitHub Integration
1. Push to GitHub
2. Connect your GitHub repo to Netlify
3. Set environment variables in Netlify settings
4. Deploy automatically

### 8. Important Notes

- **Monetag Integration**: All scripts and configurations are preserved from the original version
- **Visual Design**: The design is pixel-perfect identical to the original
- **Performance**: Vite provides much faster builds and better optimization
- **Database**: All data persists in Supabase across sessions
- **Authentication**: Uses Supabase Auth with role-based access control

### 9. Features

✅ Home Page
✅ Search Page with Categories
✅ Detail Script Page
✅ Upload Script (Admin only)
✅ Dashboard (User Profile)
✅ Login with Supabase Auth
✅ Report System
✅ Suggestion Form
✅ Category Management
✅ Monetag Ads (Banner & Sidebar)
✅ Notification Toast
✅ Mobile Responsive
✅ Dark Theme (GitHub Dark)

### 10. File Structure

```
ShibaScripter-New/
├── src/
│   ├── components/
│   │   ├── Layout.jsx (Header & Footer)
│   │   ├── Monetag.jsx (Ad components)
│   │   └── UI.jsx (Notification & Modals)
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── SearchPage.jsx
│   │   ├── DetailPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── UploadPage.jsx
│   │   ├── ReportsPage.jsx
│   │   └── DashboardPage.jsx
│   ├── utils/
│   │   ├── supabase.js (Supabase client & services)
│   │   └── icons.jsx (SVG icons)
│   ├── hooks/
│   │   └── useCustom.js (Custom hooks)
│   ├── styles/
│   │   └── index.css (Tailwind imports)
│   ├── App.jsx (Main app component)
│   └── main.jsx (Entry point)
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── netlify.toml
├── package.json
└── DATABASE_SCHEMA.sql

```

### 11. Authentication Flow

1. User clicks Login
2. Supabase Auth dialog appears
3. User enters email and password
4. System checks `profiles` table for role
5. If ADMIN, full access to upload & reports
6. If USER, limited access (view only)

### 12. Data Flow

**Scripts:**
- Created via Upload page (ADMIN only)
- Stored in Supabase `scripts` table
- Images stored in `script-images` bucket
- Displayed on Search & Home pages
- Updated views/downloads/likes via database

**Reports:**
- Created via Detail page (Anyone)
- Stored in `reports` table
- Visible on Reports page (ADMIN only)
- Status can be updated to 'resolved'

**Categories:**
- Created via Upload page (ADMIN only)
- Stored in `categories` table
- Displayed in dropdown on Upload page

**Suggestions:**
- Created via Detail page (Anyone)
- Stored in `suggestions` table
- Visible to admins via SQL query

## Troubleshooting

### 1. "Row Level Security (RLS) violation"
- Make sure you're logged in as ADMIN to create scripts
- Check that policies are correctly set up in Supabase

### 2. "Image upload fails"
- Verify the `script-images` bucket exists and is public
- Check bucket permissions in Supabase Storage settings

### 3. "Monetag ads not showing"
- Clear browser cache
- Verify Monetag meta tag is in index.html
- Check browser console for errors

### 4. "Tailwind styles not applied"
- Run `npm install` to ensure all dependencies are installed
- Restart dev server with `npm run dev`
- Clear node_modules and reinstall if needed

## Support

For issues or questions:
1. Check Supabase documentation: https://supabase.com/docs
2. Check Vite documentation: https://vitejs.dev
3. Check Tailwind documentation: https://tailwindcss.com
