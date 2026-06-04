const jwt = require('jsonwebtoken');
const { supabase, supabaseAdmin, hasServiceRole } = require('./_utils/supabase');

const isAuthenticated = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
  try {
    jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET || 'secretkey');
    return true;
  } catch { return false; }
};

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { url } = req;
  const urlObj = new URL(url, `http://${req.headers.host}`);
  let id = urlObj.searchParams.get('id');
  if (!id) {
    const match = url.match(/\/([a-f0-9-]{36})(?:\?|$)/i);
    if (match) id = match[1];
  }

  // ─── GET ───────────────────────────────────────────────────
  if (req.method === 'GET') {
    try {
      if (id) {
        const { data, error } = await supabase.from('packages').select('*').eq('id', id).single();
        if (error) throw error;
        if (!data) return res.status(404).json({ message: 'Package not found' });
        return res.json(data);
      } else {
        const { data, error } = await supabase.from('packages').select('*').order('created_at', { ascending: false });
        if (error) throw error;

        // Self-healing: if no economy packages containing "21 nights" are found in the DB, re-seed them!
        const has21Nights = data && data.some(p => p.title?.toLowerCase().includes('21 nights'));
        if (hasServiceRole && (!data || data.length === 0 || !has21Nights)) {
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
          await supabaseAdmin.from('packages').insert(seedEcon);
          const { data: refetched, error: refetchErr } = await supabase.from('packages').select('*').order('created_at', { ascending: false });
          if (!refetchErr && refetched) {
            data = refetched;
          }
        }

        // Perform self-cleaning delete in the background of other Economy packages
        if (hasServiceRole && data && data.length > 0) {
          const idsToDelete = data
            .filter(p => p.category?.toLowerCase().includes('economy') && !p.title?.toLowerCase().includes('21 nights'))
            .map(p => p.id);
          
          if (idsToDelete.length > 0) {
            supabaseAdmin.from('packages').delete().in('id', idsToDelete)
              .then(({ error: delErr }) => {
                if (delErr) console.error('[Cleanup] Failed to delete old economy packages:', delErr.message);
                else console.log('[Cleanup] Successfully deleted old economy packages:', idsToDelete);
              })
              .catch(err => console.error('[Cleanup] Error during deletion:', err));
          }
        }

        // Return only the approved packages (filters out old economy packages immediately on response)
        const cleanData = (data || []).filter(p => {
          if (p.category?.toLowerCase().includes('economy')) {
            return p.title?.toLowerCase().includes('21 nights');
          }
          return true;
        });

        return res.json(cleanData);
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  // Write operations require auth + service role
  if (!isAuthenticated(req)) return res.status(401).json({ message: 'Authentication required' });
  if (!hasServiceRole) return res.status(503).json({ message: 'SUPABASE_SERVICE_ROLE_KEY is not configured on the server.' });

  // ─── POST ──────────────────────────────────────────────────
  if (req.method === 'POST') {
    try {
      const body = { ...req.body };
      if (body.price) body.price = parseFloat(body.price);
      const { data, error } = await supabaseAdmin.from('packages').insert([body]).select();
      if (error) throw error;
      return res.status(201).json(data[0]);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  // ─── PUT ───────────────────────────────────────────────────
  if (req.method === 'PUT') {
    if (!id) return res.status(400).json({ message: 'ID is required' });
    try {
      const body = { ...req.body, updated_at: new Date().toISOString() };
      if (body.price) body.price = parseFloat(body.price);
      const { data, error } = await supabaseAdmin.from('packages').update(body).eq('id', id).select();
      if (error) throw error;
      return res.json(data[0]);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  // ─── DELETE ────────────────────────────────────────────────
  if (req.method === 'DELETE') {
    if (!id) return res.status(400).json({ message: 'ID is required' });
    try {
      const { error } = await supabaseAdmin.from('packages').delete().eq('id', id);
      if (error) throw error;
      return res.json({ message: 'Package deleted' });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
};