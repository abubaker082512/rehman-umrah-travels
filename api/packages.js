const jwt = require('jsonwebtoken');
const supabase = require('./_utils/supabase');

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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { method, url, query } = req;
  
  // Extract ID from URL or query
  let id = query.id;
  if (!id) {
    const idMatch = url.match(/\/([a-f0-9-]{36})$/i); // Match UUID
    if (idMatch) id = idMatch[1];
  }
  
  if (method === 'GET') {
    try {
      if (id) {
        const { data, error } = await supabase
          .from('packages')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        if (!data) return res.status(404).json({ message: 'Package not found' });
        return res.json(data);
      } else {
        const { data, error } = await supabase
          .from('packages')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        return res.json(data || []);
      }
    } catch (error) {
      console.error('Packages GET error:', error);
      return res.status(500).json({ message: error.message });
    }
  }

  if (method === 'POST') {
    if (!isAuthenticated(req)) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    try {
      const packageData = { ...req.body };
      
      // Ensure price is a number
      if (packageData.price) {
        packageData.price = parseFloat(packageData.price);
      }

      // Handle includes if it's a string/array mismatch
      // Supabase table expects TEXT[]
      if (typeof packageData.includes === 'string') {
        packageData.includes = packageData.includes.split(',').map(item => item.trim());
      }

      const { data, error } = await supabase
        .from('packages')
        .insert([packageData])
        .select();
        
      if (error) throw error;
      return res.status(201).json(data[0]);
    } catch (error) {
      console.error('Packages POST error:', error);
      return res.status(400).json({ message: error.message });
    }
  }

  if (method === 'DELETE') {
    if (!isAuthenticated(req)) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    if (!id) {
      return res.status(400).json({ message: 'Package ID is required' });
    }

    try {
      const { error } = await supabase
        .from('packages')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      return res.json({ message: 'Package deleted' });
    } catch (error) {
      console.error('Packages DELETE error:', error);
      return res.status(500).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}