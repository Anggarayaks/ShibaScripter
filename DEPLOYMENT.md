# Deployment Checklist

## Pre-Deployment

- [ ] All dependencies installed: `npm install`
- [ ] Build successful: `npm run build`
- [ ] No console errors in dev: `npm run dev`
- [ ] Environment variables configured (.env.local)
- [ ] Supabase project created and tables set up
- [ ] Admin user created in profiles table
- [ ] script-images bucket created in Supabase Storage

## Supabase Configuration

- [ ] Database schema imported (DATABASE_SCHEMA.sql)
- [ ] Authentication enabled
- [ ] Row Level Security policies applied
- [ ] Storage bucket (script-images) created and public
- [ ] Email provider configured (if needed)
- [ ] CORS headers configured

## Netlify Deployment

- [ ] GitHub repo created and pushed
- [ ] Netlify account created
- [ ] Site connected to GitHub
- [ ] Build command set: `npm run build`
- [ ] Publish directory set: `dist`
- [ ] Environment variables added:
  - [ ] VITE_SUPABASE_URL
  - [ ] VITE_SUPABASE_ANON_KEY
- [ ] Deploy preview working
- [ ] Production build working

## Testing on Production

- [ ] Home page loads
- [ ] Search page filters work
- [ ] Admin login works
- [ ] Script upload works (ADMIN only)
- [ ] Images upload to Supabase Storage
- [ ] Dashboard displays correctly
- [ ] Reports create successfully
- [ ] Monetag ads load
- [ ] Mobile responsive design works
- [ ] Dark theme displays correctly
- [ ] All links work
- [ ] Error handling works

## Post-Deployment

- [ ] Create first test script
- [ ] Test script delete
- [ ] Test category creation
- [ ] Test report submission
- [ ] Test suggestion submission
- [ ] Monitor Netlify analytics
- [ ] Check error logs in Supabase
- [ ] Verify Monetag tracking

## Monitoring

- [ ] Set up error tracking (optional)
- [ ] Monitor database usage
- [ ] Monitor storage usage
- [ ] Review user reports
- [ ] Check performance metrics

## Maintenance

- [ ] Regular database backups (Supabase auto-backup)
- [ ] Monitor error logs
- [ ] Update dependencies monthly
- [ ] Security updates promptly
- [ ] Review user data periodically
