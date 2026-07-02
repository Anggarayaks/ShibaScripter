import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase configuration. Please check your .env file.')
}

// Menginisialisasi objek client Supabase di tempat yang benar (di luar objek service)
const supabase = createClient(supabaseUrl, supabaseKey)

// Auth methods (Hanya tertulis satu kali dengan benar)
export const authService = {
  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  async logout() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  async onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  },

  async getSession() {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  },
}

// Script methods
export const scriptService = {
  async getScripts() {
    const { data, error } = await supabase
      .from('scripts')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async getScriptById(id) {
    const { data, error } = await supabase
      .from('scripts')
      .select('*')
      .eq('id', id)
      .single()
    return { data, error }
  },

  async createScript(script) {
    const { data, error } = await supabase
      .from('scripts')
      .insert([script])
      .select()
    return { data, error }
  },

  async updateScript(id, updates) {
    const { data, error } = await supabase
      .from('scripts')
      .update(updates)
      .eq('id', id)
      .select()
    return { data, error }
  },

  async deleteScript(id) {
    const { error } = await supabase
      .from('scripts')
      .delete()
      .eq('id', id)
    return { error }
  },

  async uploadImage(file, bucket = 'script-images') {
    const filename = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${file.name.split('.').pop()}`
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filename, file)
    
    if (error) return { error }
    
    const { data: publicUrl } = supabase.storage
      .from(bucket)
      .getPublicUrl(filename)
    
    return { data: publicUrl.publicUrl, error: null }
  },

  async incrementViews(id) {
    const { data: script } = await this.getScriptById(id)
    if (script) {
      await this.updateScript(id, { views: (script.views || 0) + 1 })
    }
  },

  async incrementDownloads(id) {
    const { data: script } = await this.getScriptById(id)
    if (script) {
      await this.updateScript(id, { downloads: (script.downloads || 0) + 1 })
    }
  },

  async addLike(id) {
    const { data: script } = await this.getScriptById(id)
    if (script) {
      await this.updateScript(id, { likes: (script.likes || 0) + 1 })
    }
  },
}

// Category methods
export const categoryService = {
  async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true })
    return { data, error }
  },

  async createCategory(name) {
    const { data, error } = await supabase
      .from('categories')
      .insert([{ name }])
      .select()
    return { data, error }
  },

  async deleteCategory(id) {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)
    return { error }
  },
}

// Report methods
export const reportService = {
  async getReports() {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async createReport(report) {
    const { data, error } = await supabase
      .from('reports')
      .insert([report])
      .select()
    return { data, error }
  },

  async updateReport(id, updates) {
    const { data, error } = await supabase
      .from('reports')
      .update(updates)
      .eq('id', id)
      .select()
    return { data, error }
  },
}

// Suggestion methods
export const suggestionService = {
  async createSuggestion(suggestion) {
    const { data, error } = await supabase
      .from('suggestions')
      .insert([suggestion])
      .select()
    return { data, error }
  },

  async getSuggestions() {
    const { data, error } = await supabase
      .from('suggestions')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },
}

// Profile methods
export const profileService = {
  async getProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    return { data, error }
  },

  async updateProfile(userId, updates) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
    return { data, error }
  },

  async createProfile(profile) {
    const { data, error } = await supabase
      .from('profiles')
      .insert([profile])
      .select()
    return { data, error }
  },
}
