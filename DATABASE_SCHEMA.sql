-- Profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'USER' CHECK (role IN ('ADMIN', 'USER')),
  avatar TEXT DEFAULT 'https://api.dicebear.com/7.x/avataaars/svg?seed=default',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view public profiles" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Scripts table
CREATE TABLE scripts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  image TEXT DEFAULT 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80',
  views INTEGER DEFAULT 0,
  downloads INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  created_by UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS for scripts
ALTER TABLE scripts ENABLE ROW LEVEL SECURITY;

-- Create policies for scripts
CREATE POLICY "Anyone can view scripts" ON scripts
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert scripts" ON scripts
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'ADMIN'
    )
  );

CREATE POLICY "Only admins can update scripts" ON scripts
  FOR UPDATE USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'ADMIN'
    )
  );

CREATE POLICY "Only admins can delete scripts" ON scripts
  FOR DELETE USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'ADMIN'
    )
  );

-- Categories table
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS for categories
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Create policies for categories
CREATE POLICY "Anyone can view categories" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Only admins can create categories" ON categories
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'ADMIN'
    )
  );

CREATE POLICY "Only admins can delete categories" ON categories
  FOR DELETE USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'ADMIN'
    )
  );

-- Reports table
CREATE TABLE reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  script_id UUID REFERENCES scripts(id) ON DELETE CASCADE,
  script_title TEXT NOT NULL,
  reason TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'resolved')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS for reports
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Create policies for reports
CREATE POLICY "Anyone can create reports" ON reports
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all reports" ON reports
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'ADMIN'
    )
  );

CREATE POLICY "Only admins can update reports" ON reports
  FOR UPDATE USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'ADMIN'
    )
  );

-- Suggestions table
CREATE TABLE suggestions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  suggestion TEXT NOT NULL,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS for suggestions
ALTER TABLE suggestions ENABLE ROW LEVEL SECURITY;

-- Create policies for suggestions
CREATE POLICY "Anyone can create suggestions" ON suggestions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all suggestions" ON suggestions
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'ADMIN'
    )
  );

-- Create indexes for performance
CREATE INDEX idx_scripts_category ON scripts(category);
CREATE INDEX idx_scripts_created_at ON scripts(created_at);
CREATE INDEX idx_scripts_created_by ON scripts(created_by);
CREATE INDEX idx_reports_script_id ON reports(script_id);
CREATE INDEX idx_reports_status ON reports(status);

-- Create storage bucket for script images
-- This should be created via Supabase dashboard or API, not SQL
