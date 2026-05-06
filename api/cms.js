const jwt = require('jsonwebtoken');
const supabase = require('./_utils/supabase');
const { supabaseAdmin, isConfigured } = require('./_utils/supabase');

const isAuthenticated = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
  try {
    jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET || 'secretkey');
    return true;
  } catch (e) {
    console.log('[CMS] Auth failed:', e.message);
    return false;
  }
};

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const url = new URL(req.url, `http://${req.headers.host}`);
  const id = url.searchParams.get('id');

  // ─── GET ───────────────────────────────────────────────────────────────────
  if (req.method === 'GET') {
    // Return empty if not configured
    if (!isConfigured) {
      console.log('[CMS] Not configured, returning empty');
      return res.json(id ? {} : {});
    }

    try {
      let query = supabase.from('cms_content').select('*');
      if (id) query = query.eq('id', id);

      const { data, error } = await query;
      if (error) {
        console.log('[CMS] Supabase error:', error.message);
        return res.json(id ? {} : {});
      }

      if (id) {
        return res.json(data && data[0] ? data[0].content : {});
      } else {
        const mapped = {};
        (data || []).forEach(item => { mapped[item.id] = item.content; });
        return res.json(mapped);
      }
    } catch (err) {
      console.error('[CMS] GET error:', err.message);
      return res.json(id ? {} : {});
    }
  }

  // ─── POST (upsert) ───────────────────────────────────────────────────────
  if (req.method === 'POST') {
    if (!isAuthenticated(req)) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!id) {
      return res.status(400).json({ error: 'Content ID is required as ?id=... query param' });
    }

    // Check if Supabase is configured
    if (!isConfigured) {
      console.log('[CMS] Supabase not configured');
      return res.status(503).json({ error: 'Database not configured' });
    }

    try {
      let body = req.body;
      if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (e) { body = {}; }
      }

      const { data, error } = await supabaseAdmin
        .from('cms_content')
        .upsert(
          { id, content: body || {}, updated_at: new Date().toISOString() },
          { onConflict: 'id' }
        )
        .select();

      if (error) throw error;

      console.log('[CMS] Saved:', id);
      return res.json({ success: true, id, data: data?.[0] });
    } catch (err) {
      console.error('[CMS] POST error:', err.message);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};