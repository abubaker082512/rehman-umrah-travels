const express = require('express');
const router = express.Router();

// GET all packages
router.get('/', async (req, res) => {
  const { data, error } = await req.supabase
    .from('packages')
    .select('*')
    .order('created_at', { ascending: false });
    
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

// POST seed 2 dummy packages (run once to bootstrap DB)
router.post('/seed', async (req, res) => {
  const dummyPackages = [
    {
      title: 'Premium 5-Star Executive Umrah',
      description: 'Experience the ultimate spiritual journey with our premium 5-star package. Stay at the iconic Pullman ZamZam hotel, just 150 meters from the Masjid Al-Haram, and enjoy unparalleled comfort throughout your pilgrimage.',
      price: 485000,
      category: '5 Star',
      duration: '15 Days',
      location: 'Makkah & Madinah',
      hotel_name: 'Pullman ZamZam Makkah',
      distance_from_haram: '150m from Haram',
      image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdBRKj372X3XEdAkE-8DFUWUG3imKQ3ac1b9USL1W0C7BBcveBszqF8mJwUnrjm_5pqskUDnrMUG5yx4QEV-eq5AZXw1KY6sy0X29rpzsJ0PgTNtzNIKD6UJk5_i92ULJFJC4ETiDGG5sBM3I5psHDr_G9s4mWI7IBISEwh_FOp8XWve3y6kl_TDJzu-I1o55kkiAvkMjUJOG_qFJqigRHzs8XXys3tPtXSAhE7XP1c17NsdmgiYoT9NlK4oiCiDUJZtS4VqPVr2_y',
      includes: ['E-Visa Processing', 'Return Flights (Qatar Airways)', 'VIP Ground Transfer', 'Guided Ziyarat Makkah & Madinah', 'Daily Buffet Breakfast & Dinner', '24/7 Tour Manager Support'],
      itinerary: [
        { day: 'Day 01', title: 'Arrival & Makkah Check-in', description: 'Arrival at Jeddah Airport, VIP GMC transfer to Makkah. Perform Umrah under scholar guidance.' },
        { day: 'Day 02 – 07', title: 'Makkah Devotion', description: 'Daily prayers in Masjid Al-Haram. Guided Ziyarat to Mina, Arafat & Muzdalifah on Day 3.' },
        { day: 'Day 08 – 13', title: 'Madinah Munawwarah', description: 'Transfer to Madinah. Stay at Anwar Al Madinah Movenpick. Daily Fajr at Masjid Nabawi.' },
        { day: 'Day 14 – 15', title: 'Departure', description: 'Final prayers at Masjid Nabawi. Farewell Tawaf in Makkah then transfer to airport.' }
      ],
      stars: 5,
      is_featured: true,
      badge: 'Best Seller',
      airline: 'Qatar Airways'
    },
    {
      title: 'Silver 4-Star Comfort Umrah',
      description: 'Our most popular family package offering the perfect balance of comfort and value. Stay at Al-Shohada Hotel, just 300 meters from the Haram, with experienced guides and seamless travel arrangements.',
      price: 325000,
      category: '4 Star',
      duration: '10 Days',
      location: 'Makkah & Madinah',
      hotel_name: 'Al-Shohada Hotel',
      distance_from_haram: '300m from Haram',
      image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3_91cdPdyWpCst8uVkcSEkdZVScCJV50Uz8dmehZ72dVc-AfHZbJoQzWGsgyEAxSfLd4WFy_TcxoatRlFL9pYi7TlRzV0SRDbRgWohXX1z0OTxHqAQTG9iS5gpGUB5Z_H6pitDxZUMKSXLEM0yFiSDg8vEdV9EQFTltpcz7I4kc00gPiHi3Ng2O0p0E9HLJPYcB4wTjtqGLQVhxvHDrhAIguL_9WFBZysggur9-whO305qAImVClX1qsUEVVKYQmL9mKjsOC2BAkA',
      includes: ['E-Visa Processing', 'Return Flights (Saudi Airlines)', 'Shared Ground Transfer', 'Guided Ziyarat Makkah', 'Breakfast Included', '24/7 Support Line'],
      itinerary: [
        { day: 'Day 01', title: 'Arrival & Umrah', description: 'Arrival at Jeddah, transfer to Makkah hotel. Perform Umrah with group guide.' },
        { day: 'Day 02 – 05', title: 'Makkah Prayers', description: 'All five prayers in Haram. Full-day Ziyarat of historical Makkah sites on Day 3.' },
        { day: 'Day 06 – 09', title: 'Madinah Stay', description: 'Transfer to Madinah. Prayers at Masjid Nabawi, Ziyarat of Uhud, Quba mosque & more.' },
        { day: 'Day 10', title: 'Departure', description: 'Check-out and transfer to airport. Farewell dua with group.' }
      ],
      stars: 4,
      is_featured: true,
      badge: 'Popular Choice',
      airline: 'Saudi Airlines'
    }
  ];

  const { data, error } = await req.supabase
    .from('packages')
    .insert(dummyPackages)
    .select();

  if (error) return res.status(400).json({ message: error.message, detail: 'Make sure the packages table exists in Supabase with columns matching the schema.' });
  res.status(201).json({ message: `Seeded ${data.length} packages successfully`, packages: data });
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
