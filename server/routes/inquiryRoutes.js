const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// GET all inquiries (authenticated admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { data, error } = await req.supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new inquiry (public)
router.post('/', async (req, res) => {
  try {
    const body = req.body || {};
    const { data, error } = await req.supabase
      .from('inquiries')
      .insert([{
        name: body.name,
        phone: body.phone,
        email: body.email,
        subject: body.subject,
        message: body.message,
        created_at: new Date().toISOString()
      }])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an inquiry (authenticated admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const { error } = await req.supabase
      .from('inquiries')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ message: 'Inquiry deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
