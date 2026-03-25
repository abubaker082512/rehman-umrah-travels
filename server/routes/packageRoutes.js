const express = require('express');
const router = express.Router();

// GET all packages
router.get('/', async (req, res) => {
  const { data, error } = await req.supabase
    .from('packages')
    .select('*');
    
  if (error) return res.status(500).json({ message: error.message });
  res.json(data);
});

// GET single package
router.get('/:id', async (req, res) => {
  const { data, error } = await req.supabase
    .from('packages')
    .select('*')
    .eq('id', req.params.id)
    .single();
    
  if (error) return res.status(500).json({ message: error.message });
  if (!data) return res.status(404).json({ message: 'Package not found' });
  res.json(data);
});

// POST create package
router.post('/', async (req, res) => {
  const { data, error } = await req.supabase
    .from('packages')
    .insert([req.body])
    .select();
    
  if (error) return res.status(400).json({ message: error.message });
  res.status(201).json(data[0]);
});

// DELETE package
router.delete('/:id', async (req, res) => {
  const { error } = await req.supabase
    .from('packages')
    .delete()
    .eq('id', req.params.id);
    
  if (error) return res.status(500).json({ message: error.message });
  res.json({ message: 'Package deleted' });
});

module.exports = router;
