const jwt = require('jsonwebtoken');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY;

let supabase = null;
if (supabaseUrl && supabaseKey) {
  const { createClient } = require('@supabase/supabase-js');
  supabase = createClient(supabaseUrl, supabaseKey);
}

const isAuthenticated = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
  
  try {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    return true;
  } catch {
    return false;
  }
};

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { method, query } = req;
  const id = query.id;

  if (!supabase) {
    return res.status(503).json({ message: 'Database not configured. Set SUPABASE_URL and SUPABASE_KEY in Vercel env vars.' });
  }

  if (method === 'GET') {
    try {
      if (id) {
        const { data, error } = await supabase
          .from('cms_content')
          .select('content')
          .eq('id', id)
          .single();
          
        if (error && error.code !== 'PGRST116') throw error;
        return res.json(data ? data.content : {});
      } else {
        const { data, error } = await supabase
          .from('cms_content')
          .select('*');
          
        if (error) throw error;
        const mapped = {};
        data.forEach(item => mapped[item.id] = item.content);
        return res.json(mapped);
      }
    } catch (error) {
      console.error('CMS GET error:', error);
      return res.status(500).json({ message: error.message });
    }
  }

  if (method === 'POST') {
    if (!isAuthenticated(req)) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    if (!id) {
      return res.status(400).json({ message: 'Content ID is required' });
    }

    try {
      const { data, error } = await supabase
        .from('cms_content')
        .upsert({ id, content: req.body, updated_at: new Date().toISOString() }, { onConflict: 'id' })
        .select();
        
      if (error) throw error;
      return res.json({ success: true, id });
    } catch (error) {
      console.error('CMS POST error:', error);
      return res.status(400).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
