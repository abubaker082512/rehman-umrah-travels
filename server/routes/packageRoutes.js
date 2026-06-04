const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// GET all packages (public)
router.get('/', async (req, res) => {
  const { data, error } = await req.supabase
    .from('packages')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) return res.status(500).json({ message: error.message });

  // Self-healing: if no economy packages containing "21 nights" are found in the DB, re-seed them!
  const has21Nights = data && data.some(p => p.title?.toLowerCase().includes('21 nights'));
  if (!data || data.length === 0 || !has21Nights) {
    const seedEcon = [
      {
        title: '21 Nights Saver Economy Umrah',
        description: 'Perform your holy pilgrimage with our affordable 21-day Economy package. Staying at Mayer Mayassar Mecca and Fursan Al Madinah, offering clean and peaceful accommodation.',
        price: 209500,
        category: 'Economy',
        duration: '21 Days',
        location: 'Makkah & Madinah',
        hotel_name: 'Fundaq Mayer Mayassar',
        distance_from_haram: '800m from Haram',
        hotel_makkah: 'Fundaq Mayer Mayassar',
        distance_makkah: '800m from Haram',
        hotel_madinah: 'Fursan Al Madinah',
        distance_madinah: '350m from Nabawi',
        image_url: 'https://images.unsplash.com/photo-1591604129909-2b4ce4e6e6d2?w=800&q=80',
        airline: 'Air Blue',
        stars: 3,
        badge: 'Best Price',
        includes: ['Return Flight', 'E-Visa Processing', 'Shared Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
        itinerary: [
          {day: 'Day 01', title: 'Arrival & Makkah Check-in', description: 'Arrive at Jeddah, transfer to Fundaq Mayer Mayassar Makkah. Perform Umrah.'},
          {day: 'Day 02 - 12', title: 'Makkah Prayers', description: 'Daily prayers in Masjid Al-Haram. Guided Ziyarat of historical sites on Day 3.'},
          {day: 'Day 13 - 20', title: 'Madinah Stay', description: 'Transfer to Madinah, check-in Fursan Al Madinah. Prayers at Masjid Nabawi.'},
          {day: 'Day 21', title: 'Departure', description: 'Final prayers and check-out. Transfer to Jeddah Airport for return flight.'}
        ]
      },
      {
        title: '21 Nights Comfort Economy Saver',
        description: 'A high-value family-oriented economy saver package featuring Jedat Al Khalil Mecca hotel and Karam Ajyad in Madinah.',
        price: 224500,
        category: 'Economy',
        duration: '21 Days',
        location: 'Makkah & Madinah',
        hotel_name: 'Jedat Al Khalil',
        distance_from_haram: '750m from Haram',
        hotel_makkah: 'Jedat Al Khalil',
        distance_makkah: '750m from Haram',
        hotel_madinah: 'Karam Ajyad Hotel',
        distance_madinah: '400m from Nabawi',
        image_url: 'https://images.unsplash.com/photo-1564769662533-3f5aae93cec2?w=800&q=80',
        airline: 'PIA',
        stars: 3,
        badge: 'Popular Saver',
        includes: ['Return Flight', 'E-Visa Processing', 'Shared Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
        itinerary: [
          {day: 'Day 01', title: 'Jeddah Arrival', description: 'Arrive at Jeddah Airport, transfer to Jedat Al Khalil Makkah.'},
          {day: 'Day 02 - 12', title: 'Ibadah in Makkah', description: 'Perform 5 daily prayers in Haram. Guided group Ziyarat.'},
          {day: 'Day 13 - 20', title: 'Madinah Serenity', description: 'Transfer to Karam Ajyad Madinah. Daily prayers in Nabawi.'},
          {day: 'Day 21', title: 'Departure', description: 'Transfer to Jeddah airport for return flight.'}
        ]
      },
      {
        title: '21 Nights Ajyad Standard Economy',
        description: 'Highly popular choice for pilgrims looking for excellent standard services at a reasonable budget in Ajyad, Makkah.',
        price: 235500,
        category: 'Economy',
        duration: '21 Days',
        location: 'Makkah & Madinah',
        hotel_name: 'Al Juhani Ajyad Hotel',
        distance_from_haram: '650m from Haram',
        hotel_makkah: 'Al Juhani Ajyad Hotel',
        distance_makkah: '650m from Haram',
        hotel_madinah: 'Al Ikram Palace',
        distance_madinah: '450m from Nabawi',
        image_url: 'https://images.unsplash.com/photo-1596435688717-2d2f3b0fc47a?w=800&q=80',
        airline: 'Saudi Airlines',
        stars: 3,
        badge: 'Ajyad Choice',
        includes: ['Return Flight', 'E-Visa Processing', 'Shared Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
        itinerary: [
          {day: 'Day 01', title: 'Makkah Arrival', description: 'Arrive at Jeddah, proceed to Al Juhani Ajyad Hotel Makkah.'},
          {day: 'Day 02 - 12', title: 'Makkah Stays', description: 'Daily prayers at Haram. Guided historical Ziyarat tours.'},
          {day: 'Day 13 - 20', title: 'Madinah Stays', description: 'Transfer to Al Ikram Madinah. Focus on prayers in Masjid Nabawi.'},
          {day: 'Day 21', title: 'Departure', description: 'Return transfers to Jeddah Airport.'}
        ]
      },
      {
        title: '21 Nights Extended Special Economy',
        description: 'Maximize your time in the holy land with our 21-night package. Features Maather Al Jiwaar Makkah and Orjawan Al Madinah.',
        price: 251500,
        category: 'Economy',
        duration: '21 Days',
        location: 'Makkah & Madinah',
        hotel_name: 'Maather Al Jiwaar Hotel',
        distance_from_haram: '600m from Haram',
        hotel_makkah: 'Maather Al Jiwaar Hotel',
        distance_makkah: '600m from Haram',
        hotel_madinah: 'Orjawan Al Madinah',
        distance_madinah: '450m from Nabawi',
        image_url: 'https://images.unsplash.com/photo-1518655044366-5c5abf0cf1f4?w=800&q=80',
        airline: 'Air Blue',
        stars: 3,
        badge: 'Top Economy',
        includes: ['Return Flight', 'E-Visa Processing', 'Shared Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
        itinerary: [
          {day: 'Day 01', title: 'Welcome to Makkah', description: 'Arrive in Makkah, check-in to Maather Al Jiwaar Hotel. Complete Umrah.'},
          {day: 'Day 02 - 12', title: 'Makkah Devotions', description: 'Spend peaceful days in Ibadah at Haram. Group Ziyarat.'},
          {day: 'Day 13 - 20', title: 'Madinah Stays', description: 'Transfer to Orjawan Al Madinah. Rest and Ibadah in Masjid Nabawi.'},
          {day: 'Day 21', title: 'Farewell', description: 'Departure transfer to Jeddah Airport.'}
        ]
      }
    ];
    await req.supabase.from('packages').insert(seedEcon);
    const { data: refetched, error: refetchErr } = await req.supabase.from('packages').select('*').order('created_at', { ascending: false });
    if (!refetchErr && refetched) {
      data = refetched;
    }
  }

  // Self-cleaning deletion for local database (non-21 nights packages)
  if (data && data.length > 0) {
    const idsToDelete = data
      .filter(p => p.category?.toLowerCase().includes('economy') && !p.title?.toLowerCase().includes('21 nights'))
      .map(p => p.id);
    
    if (idsToDelete.length > 0) {
      req.supabase.from('packages').delete().in('id', idsToDelete)
        .then(({ error: delErr }) => {
          if (delErr) console.error('[Cleanup] Failed to delete local old economy packages:', delErr.message);
        })
        .catch(err => console.error('[Cleanup] Error during local deletion:', err));
    }
  }

  // Filter returned list
  const cleanData = (data || []).filter(p => {
    if (p.category?.toLowerCase().includes('economy')) {
      return p.title?.toLowerCase().includes('21 nights');
    }
    return true;
  });

  res.json(cleanData);
});

// GET single package (public)
router.get('/:id', async (req, res) => {
  const { data, error } = await req.supabase
    .from('packages')
    .select('*')
    .eq('id', req.params.id)
    .single();
    
  if (error) return res.status(404).json({ message: 'Package not found' });
  if (!data) return res.status(404).json({ message: 'Package not found' });
  res.json(data);
});

// POST create package (protected)
router.post('/', authMiddleware, async (req, res) => {
  const { data, error } = await req.supabase
    .from('packages')
    .insert([req.body])
    .select();
    
  if (error) return res.status(400).json({ message: error.message });
  res.status(201).json(data[0]);
});

// POST seed 2 dummy packages (protected)
router.post('/seed', authMiddleware, async (req, res) => {
  const dummyPackages = [
    {
      title: 'Premium 5-Star Executive Umrah',
      description: 'Experience the ultimate spiritual journey with our premium 5-star package. Stay at the iconic Pullman ZamZam hotel, just 150 meters from the Masjid Al-Haram.',
      price: 485000,
      category: '5 Star',
      duration: '15 Days',
      location: 'Makkah & Madinah',
      hotel_name: 'Pullman ZamZam Makkah',
      distance_from_haram: '150m from Haram',
      image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdBRKj372X3XEdAkE-8DFUWUG3imKQ3ac1b9USL1W0C7BBcveBszqF8mJwUnrjm_5pqskUDnrMUG5yx4QEV-eq5AZXw1KY6sy0X29rpzsJ0PgTNtzNIKD6UJk5_i92ULJFJC4ETiDGG5sBM3I5psHDr_G9s4mWI7IBISEwh_FOp8XWve3y6kl_TDJzu-I1o55kkiAvkMjUJOG_qFJqigRHzs8XXys3tPtXSAhE7XP1c17NsdmgiYoT9NlK4oiCiDUJZtS4VqPVr2_y',
      includes: ['E-Visa Processing', 'Return Flights (Qatar Airways)', 'VIP Ground Transfer', 'Guided Ziyarat', 'Daily Buffet Breakfast & Dinner', '24/7 Tour Manager Support'],
      stars: 5,
      badge: 'Best Seller',
      airline: 'Qatar Airways'
    },
    {
      title: 'Silver 4-Star Comfort Umrah',
      description: 'Our most popular family package offering the perfect balance of comfort and value.',
      price: 325000,
      category: '4 Star',
      duration: '10 Days',
      location: 'Makkah & Madinah',
      hotel_name: 'Al-Shohada Hotel',
      distance_from_haram: '300m from Haram',
      image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3_91cdPdyWpCst8uVkcSEkdZVScCJV50Uz8dmehZ72dVc-AfHZbJoQzWGsgyEAxSfLd4WFy_TcxoatRlFL9pYi7TlRzV0SRDbRgWohXX1z0OTxHqAQTG9iS5gpGUB5Z_H6pitDxZUMKSXLEM0yFiSDg8vEdV9EQFTltpcz7I4kc00gPiHi3Ng2O0p0E9HLJPYcB4wTjtqGLQVhxvHDrhAIguL_9WFBZysggur9-whO305qAImVClX1qsUEVVKYQmL9mKjsOC2BAkA',
      includes: ['E-Visa Processing', 'Return Flights (Saudi Airlines)', 'Shared Ground Transfer', 'Guided Ziyarat', 'Breakfast Included', '24/7 Support'],
      stars: 4,
      badge: 'Popular Choice',
      airline: 'Saudi Airlines'
    }
  ];

  const { data, error } = await req.supabase
    .from('packages')
    .insert(dummyPackages)
    .select();

  if (error) return res.status(400).json({ message: error.message });
  res.status(201).json({ message: `Seeded ${data.length} packages`, packages: data });
});

// DELETE package (protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  const { error } = await req.supabase
    .from('packages')
    .delete()
    .eq('id', req.params.id);
    
  if (error) return res.status(500).json({ message: error.message });
  res.json({ message: 'Package deleted' });
});

module.exports = router;
