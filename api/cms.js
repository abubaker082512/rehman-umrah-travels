const jwt = require('jsonwebtoken');

// Simple Supabase client initialization
const getSupabase = () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.log('[CMS] Missing Supabase credentials');
    return null;
  }
  
  const { createClient } = require('@supabase/supabase-js');
  return createClient(supabaseUrl, supabaseKey);
};

const supabase = getSupabase();

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  console.log('[CMS] Request:', req.method, 'URL:', req.url);
  
  // Parse the id from query string manually
  const url = new URL(req.url, `http://${req.headers.host}`);
  const id = url.searchParams.get('id');
  
  console.log('[CMS] Query id:', id);

  if (!supabase) {
    console.log('[CMS] No Supabase connection');
    return res.status(503).json({ error: 'Database not configured' });
  }

  // GET - Fetch CMS content
  if (req.method === 'GET') {
    try {
      console.log('[CMS] GET fetching:', id || 'all');
      
      let query = supabase.from('cms_content').select('*');
      
      if (id) {
        query = query.eq('id', id);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.log('[CMS] GET error:', error);
        return res.status(400).json({ error: error.message });
      }
      
      if (id) {
        console.log('[CMS] GET found:', data ? data.length : 0);
        return res.json(data && data[0] ? data[0].content : {});
      } else {
        const mapped = {};
        data.forEach(item => { mapped[item.id] = item.content; });
        return res.json(mapped);
      }
    } catch (err) {
      console.log('[CMS] GET catch:', err);
      return res.status(500).json({ error: err.message });
    }
  }

  // POST - Save CMS content
  if (req.method === 'POST') {
    // Check auth token
    const authHeader = req.headers.authorization;
    let isAuth = false;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const token = authHeader.replace('Bearer ', '');
        jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
        isAuth = true;
      } catch (e) {
        console.log('[CMS] Auth failed:', e.message);
      }
    }
    
    if (!isAuth) {
      console.log('[CMS] Not authenticated');
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!id) {
      return res.status(400).json({ error: 'Content ID is required' });
    }

    try {
      // Parse body - Vercel uses req.body differently
      let body = req.body;
      if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (e) {}
      }
      
      console.log('[CMS] POST body:', typeof body, body ? 'has data' : 'empty');
      
      // Use INSERT with upsert behavior
      const { data, error } = await supabase
        .from('cms_content')
        .upsert({
          id: id,
          content: body || {},
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' })
        .select();

      if (error) {
        console.log('[CMS] POST error:', error);
        return res.status(400).json({ error: error.message });
      }

      console.log('[CMS] POST success:', id);
      return res.json({ success: true, id });
    } catch (err) {
      console.log('[CMS] POST catch:', err);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};