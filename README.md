# ShibaScripter - Production Ready 🚀

Modern, scalable script sharing platform built with React 18, Vite, and Supabase.

## Features

- ✅ **React 18 + Vite** - Lightning-fast development and production builds
- ✅ **Supabase Backend** - Real-time database with authentication
- ✅ **Tailwind CSS** - Production-optimized styling (no CDN)
- ✅ **Monetag Integration** - Ads banner and sidebar (fully preserved)
- ✅ **Role-Based Access Control** - Admin and User roles
- ✅ **Image Storage** - Scripts images in Supabase Storage
- ✅ **Mobile Responsive** - Works perfectly on all devices
- ✅ **Dark Theme** - GitHub Dark themed UI
- ✅ **Pixel-Perfect Design** - 100% identical to original version

## Pages & Features

1. **Home Page** - Landing page with featured scripts
2. **Search Page** - Browse scripts by category with filtering
3. **Detail Page** - View script details, copy code, report, suggest
4. **Upload Page** - Admin-only script upload with image support
5. **Dashboard** - User profile and statistics
6. **Login Page** - Supabase authentication
7. **Reports Page** - Admin reporting system
8. **Mobile Menu** - Touch-friendly navigation
9. **Notification Toast** - User feedback system
10. **Category Management** - Admin can create/delete categories

## Tech Stack

### Frontend
- **React 18** - Latest React with hooks
- **Vite** - Next-gen build tool (5x faster)
- **Tailwind CSS** - Utility-first CSS
- **React Router** - Client-side routing (ready for SPA routing)

### Backend
- **Supabase** - PostgreSQL + Auth + Storage
- **Row-Level Security** - Data protection policies
- **Real-time Subscriptions** - Live data updates

### Hosting
- **Netlify** - Fast, reliable deployment
- **Auto Redirects** - SPA-friendly routing

## Quick Start

### 1. Prerequisites
- Node.js 16+ installed
- Supabase account (free at supabase.com)

### 2. Clone & Setup
```bash
cd ShibaScripter-New
npm install
```

### 3. Configure Supabase
See [SETUP.md](./SETUP.md) for detailed instructions

### 4. Run Development Server
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Layout.jsx     # Header and Footer
│   ├── Monetag.jsx    # Ad components
│   └── UI.jsx         # Modals and Notifications
├── pages/             # Page components
│   ├── HomePage.jsx
│   ├── SearchPage.jsx
│   ├── DetailPage.jsx
│   ├── LoginPage.jsx
│   ├── UploadPage.jsx
│   ├── ReportsPage.jsx
│   └── DashboardPage.jsx
├── utils/             # Utility functions
│   ├── supabase.js   # Supabase client & API
│   └── icons.jsx     # SVG icon component
├── hooks/             # Custom React hooks
│   └── useCustom.js
├── styles/            # CSS files
│   └── index.css     # Tailwind imports
├── App.jsx            # Main app logic
└── main.jsx           # Entry point
```

## Environment Variables

Create `.env.local`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Database Schema

Tables:
- `profiles` - User profiles with roles
- `scripts` - Script data with metadata
- `categories` - Script categories
- `reports` - User reports of issues
- `suggestions` - Script suggestions

See [DATABASE_SCHEMA.sql](./DATABASE_SCHEMA.sql) for full schema.

## Deployment

### Deploy to Netlify

#### Option 1: CLI
```bash
npm install -g netlify-cli
netlify deploy
```

#### Option 2: GitHub Integration
1. Push to GitHub
2. Connect repo to Netlify
3. Set environment variables
4. Auto-deploy on push

**Important:** Set these env vars in Netlify:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Key Features Explained

### Monetag Ads
- Banner ad on Home page
- Sidebar ad on Search page
- Detail page middle ad
- All positions preserved from original
- Service worker still active

### Authentication
- Sign up/login with email
- Password reset via Supabase
- Role-based access (ADMIN/USER)
- Persistent sessions

### Script Management
- Upload with image (stored in Supabase)
- Auto-slug generation
- View/download/like tracking
- Category filtering
- Search by title/description

### Reporting System
- Report problematic scripts
- Reasons: not-working, malware, spam, inappropriate
- Admin dashboard to review
- Mark as resolved

## Performance Optimizations

- ✅ Code splitting with Vite
- ✅ Lazy component loading
- ✅ Image optimization (stored in Cloud)
- ✅ Minified CSS with Tailwind
- ✅ Database indexing on frequent queries
- ✅ RLS policies for data security

## Visual Design

- **Theme**: Dark GitHub-inspired
- **Colors**: `#0D1117` (dark), `#161B22` (secondary), `#30363D` (borders)
- **Font**: Inter (Google Fonts)
- **Responsive**: Mobile-first design
- **Animations**: Smooth transitions and hovers

## API Endpoints (Supabase)

All managed through Supabase client SDK:
- `authService` - Authentication
- `scriptService` - Scripts CRUD
- `categoryService` - Categories CRUD
- `reportService` - Reports management
- `suggestionService` - Script suggestions
- `profileService` - User profiles

## Security

- Row-Level Security (RLS) on all tables
- Admin-only operations protected
- Public read access for scripts
- Auth required for sensitive operations
- No hardcoded credentials

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## What's Changed from Original

### ✅ Preserved (100% identical)
- Visual design and layout
- All colors and spacing
- Font sizes and weights
- Monetag ad positions
- Mobile responsiveness
- All UI interactions
- Component behavior

### 🔄 Improved
- Build performance (Vite is 5x faster)
- Production optimization
- Code organization
- Database persistence
- Security (Supabase RLS)
- Scalability
- Maintenance (modular components)

## Troubleshooting

### Build Issues
```bash
rm -rf node_modules
npm install
npm run build
```

### Environment Variables Not Loading
- Check `.env.local` exists
- Variables must start with `VITE_`
- Restart dev server after changes

### Supabase Connection Error
- Verify URL and anon key
- Check Supabase project is active
- Network connectivity

## Support & Documentation

- Vite: https://vitejs.dev
- React: https://react.dev
- Supabase: https://supabase.com/docs
- Tailwind: https://tailwindcss.com/docs
- Netlify: https://docs.netlify.com

## License

ShibaScripter © 2024

---

**Built with ❤️ for the Indonesian developer community**
