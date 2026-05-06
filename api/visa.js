const jwt = require('jsonwebtoken');
const supabase = require('./_utils/supabase');
const { supabaseAdmin } = require('./_utils/supabase');

const isAuthenticated = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
  try {
    jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET || 'secretkey');
    return true;
  } catch { return false; }
};

const setCors = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

module.exports = async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const url = new URL(req.url, `http://${req.headers.host}`);
  let id = url.searchParams.get('id');
  if (!id) {
    const match = req.url.match(/\/([a-f0-9-]{36})(?:\?|$)/i);
    if (match) id = match[1];
  }

  if (req.method === 'GET') {
    try {
      let query = supabase.from('visa_services').select('*').order('created_at', { ascending: false });
      if (id) query = query.eq('id', id).single();
      const { data, error } = await query;
      if (error) throw error;
      return res.json(id ? data : (data || []));
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  if (req.method === 'POST') {
    if (!isAuthenticated(req)) return res.status(401).json({ message: 'Authentication required' });
    try {
      const body = req.body || {};
      if (typeof body.documents === 'string') {
        body.documents = body.documents.split(',').map(d => d.trim()).filter(Boolean);
      }
      const { data, error } = await supabaseAdmin.from('visa_services').insert([body]).select();
      if (error) throw error;
      return res.status(201).json(data[0]);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  if (req.method === 'PUT') {
    if (!isAuthenticated(req)) return res.status(401).json({ message: 'Authentication required' });
    if (!id) return res.status(400).json({ message: 'ID is required' });
    try {
      const body = { ...req.body, updated_at: new Date().toISOString() };
      if (typeof body.documents === 'string') {
        body.documents = body.documents.split(',').map(d => d.trim()).filter(Boolean);
      }
      const { data, error } = await supabaseAdmin.from('visa_services').update(body).eq('id', id).select();
      if (error) throw error;
      return res.json(data[0]);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  if (req.method === 'DELETE') {
    if (!isAuthenticated(req)) return res.status(401).json({ message: 'Authentication required' });
    if (!id) return res.status(400).json({ message: 'ID is required' });
    try {
      const { error } = await supabaseAdmin.from('visa_services').delete().eq('id', id);
      if (error) throw error;
      return res.json({ message: 'Visa service deleted' });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
};
