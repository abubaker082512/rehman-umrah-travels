const jwt = require('jsonwebtoken');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY;
const jwtSecret = process.env.JWT_SECRET || 'secretkey';

let supabase = null;
if (supabaseUrl && supabaseKey) {
  const { createClient } = require('@supabase/supabase-js');
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log('CMS: Supabase connected');
} else {
  console.log('CMS: No Supabase credentials');
}

const isAuthenticated = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('CMS: No auth header');
    return false;
  }
  
  try {
    const token = authHeader.split(' ')[1];
    const verified = jwt.verify(token, jwtSecret);
    console.log('CMS: Token verified:', verified);
    return true;
  } catch (err) {
    console.log('CMS: Token verify failed:', err.message);
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
  console.log('CMS:', method, 'id:', id);

  if (!supabase) {
    return res.status(503).json({ message: 'Database not configured' });
  }

  if (method === 'GET') {
    try {
      if (id) {
        console.log('CMS GET: Fetching id:', id);
        const { data, error } = await supabase
          .from('cms_content')
          .select('content')
          .eq('id', id)
          .maybeSingle();
          
        if (error) {
          console.log('CMS GET error:', error);
          throw error;
        }
        console.log('CMS GET data:', data);
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
    const authOk = isAuthenticated(req);
    console.log('CMS POST auth:', authOk, 'body:', JSON.stringify(req.body).substring(0, 100));
    
    if (!authOk) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    if (!id) {
      return res.status(400).json({ message: 'Content ID is required' });
    }

    try {
      console.log('CMS POST: Saving id:', id, 'content keys:', Object.keys(req.body || {}));
      
      // Upsert using the id as the primary key
      const { data, error } = await supabase
        .from('cms_content')
        .upsert({ 
          id: id, 
          content: req.body,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' })
        .select();
      
      if (error) {
        console.log('CMS POST error:', error);
        throw error;
      }
      
      console.log('CMS POST success, data:', data);
      return res.json({ success: true, id, saved: req.body });
    } catch (error) {
      console.error('CMS POST error:', error);
      return res.status(400).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
