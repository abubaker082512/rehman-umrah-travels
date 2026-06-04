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
        let { data, error } = await supabase.from('packages').select('*').order('created_at', { ascending: false });
        if (error) throw error;

        // Self-healing check: if any categories are missing or count of approved packages is not complete, re-seed!
        const countCategory = (catName, titlePattern) => {
          return data ? data.filter(p => p.category?.toLowerCase().includes(catName) && p.title?.toLowerCase().includes(titlePattern)).length : 0;
        };
        const economyCount = countCategory('economy', '21 nights');
        const star3Count = countCategory('3 star', 'nights');
        const star4Count = countCategory('4 star', 'nights');
        const star5Count = countCategory('5 star', 'nights');

        const needsSeeding = !data || data.length === 0 || economyCount < 4 || star3Count < 4 || star4Count < 4 || star5Count < 4;

        if (hasServiceRole && needsSeeding) {
          const seedList = [
            // ── Economy (4 Packages) ──
            {
              title: '21 Nights Saver Economy Umrah',
              description: 'Perform your holy pilgrimage with our affordable 21-day Economy package. Staying at Mayer Mayassar Mecca and Fursan Al Madinah, offering clean and peaceful accommodation.',
              price: 209500,
              category: 'Economy',
              duration: '21 Nights',
              location: 'Fundaq Mayer Mayassar & Fursan Al Madinah',
              hotel_name: 'Fundaq Mayer Mayassar & Fursan Al Madinah',
              distance_from_haram: '800m & 350m',
              hotel_makkah: 'Fundaq Mayer Mayassar',
              distance_makkah: '800m from Haram',
              hotel_madinah: 'Fursan Al Madinah',
              distance_madinah: '350m from Nabawi',
              image_url: 'https://images.unsplash.com/photo-1591604129909-2b4ce4e6e6d2?w=800&q=80',
              airline: 'Air Blue',
              stars: 3,
              badge: '21 Nights',
              includes: ['Return Flight', 'E-Visa Processing', 'Shared Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
              not_includes: ['Meals', 'Travel insurance', 'Laundry and room service charges'],
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
              duration: '21 Nights',
              location: 'Jedat Al Khalil & Karam Ajyad Hotel',
              hotel_name: 'Jedat Al Khalil & Karam Ajyad Hotel',
              distance_from_haram: '750m & 400m',
              hotel_makkah: 'Jedat Al Khalil',
              distance_makkah: '750m from Haram',
              hotel_madinah: 'Karam Ajyad Hotel',
              distance_madinah: '400m from Nabawi',
              image_url: 'https://images.unsplash.com/photo-1564769662533-3f5aae93cec2?w=800&q=80',
              airline: 'PIA',
              stars: 3,
              badge: '21 Nights',
              includes: ['Return Flight', 'E-Visa Processing', 'Shared Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
              not_includes: ['Meals', 'Travel insurance', 'Laundry and room service charges'],
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
              duration: '21 Nights',
              location: 'Al Juhani Ajyad Hotel & Al Ikram Palace',
              hotel_name: 'Al Juhani Ajyad Hotel & Al Ikram Palace',
              distance_from_haram: '650m & 450m',
              hotel_makkah: 'Al Juhani Ajyad Hotel',
              distance_makkah: '650m from Haram',
              hotel_madinah: 'Al Ikram Palace',
              distance_madinah: '450m from Nabawi',
              image_url: 'https://images.unsplash.com/photo-1596435688717-2d2f3b0fc47a?w=800&q=80',
              airline: 'Saudi Airlines',
              stars: 3,
              badge: '21 Nights',
              includes: ['Return Flight', 'E-Visa Processing', 'Shared Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
              not_includes: ['Meals', 'Travel insurance', 'Laundry and room service charges'],
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
              duration: '21 Nights',
              location: 'Maather Al Jiwaar Hotel & Orjawan Al Madinah',
              hotel_name: 'Maather Al Jiwaar Hotel & Orjawan Al Madinah',
              distance_from_haram: '600m & 450m',
              hotel_makkah: 'Maather Al Jiwaar Hotel',
              distance_makkah: '600m from Haram',
              hotel_madinah: 'Orjawan Al Madinah',
              distance_madinah: '450m from Nabawi',
              image_url: 'https://images.unsplash.com/photo-1518655044366-5c5abf0cf1f4?w=800&q=80',
              airline: 'Air Blue',
              stars: 3,
              badge: '21 Nights',
              includes: ['Return Flight', 'E-Visa Processing', 'Shared Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
              not_includes: ['Meals', 'Travel insurance', 'Laundry and room service charges'],
              itinerary: [
                {day: 'Day 01', title: 'Welcome to Makkah', description: 'Arrive in Makkah, check-in to Maather Al Jiwaar Hotel. Complete Umrah.'},
                {day: 'Day 02 - 12', title: 'Makkah Devotions', description: 'Spend peaceful days in Ibadah at Haram. Group Ziyarat.'},
                {day: 'Day 13 - 20', title: 'Madinah Stays', description: 'Transfer to Orjawan Al Madinah. Rest and Ibadah in Masjid Nabawi.'},
                {day: 'Day 21', title: 'Farewell', description: 'Departure transfer to Jeddah Airport.'}
              ]
            },
            // ── 3 Star (4 Packages) ──
            {
              title: '14 Nights 3 Star Comfort Umrah',
              description: 'Perform your Umrah with comfort in our 14-night 3-Star package. Staying in close proximity hotels: Al Aseel Ajyad Makkah and Al Shourfah Hotel Madinah.',
              price: 245500,
              category: '3 Star',
              duration: '14 Nights',
              location: 'Al Aseel Ajyad & Al Shourfah Hotel',
              hotel_name: 'Al Aseel Ajyad & Al Shourfah Hotel',
              distance_from_haram: '14 Min Walk & 7 Min Walk',
              hotel_makkah: 'Al Aseel Ajyad',
              distance_makkah: '14 Min Walk / 900m',
              hotel_madinah: 'Al Shourfah Hotel',
              distance_madinah: '7 Min Walk / 450m',
              image_url: 'https://images.unsplash.com/photo-1591604129909-2b4ce4e6e6d2?w=800&q=80',
              airline: 'PIA',
              stars: 3,
              badge: '3 STAR',
              includes: ['E-Visa Processing', 'Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
              not_includes: ['Return Flight', 'Meals', 'Travel insurance', 'Laundry and room service charges'],
              itinerary: [
                {day: 'Day 01', title: 'Arrival & Umrah', description: 'Arrive at Jeddah, transfer to Al Aseel Ajyad Makkah. Perform Umrah.'},
                {day: 'Day 02 - 07', title: 'Makkah Prayers', description: 'Pray daily in Masjid Al-Haram. Guided Ziyarat tour on Day 4.'},
                {day: 'Day 08 - 13', title: 'Madinah Stay', description: 'Transfer to Madinah, check-in Al Shourfah Hotel. Prayers at Masjid Nabawi.'},
                {day: 'Day 14', title: 'Departure', description: 'Final prayers and checkout. Transfer to airport for return flight.'}
              ]
            },
            {
              title: '12 Nights 3 Star Standard Package',
              description: 'Perfect 12-night standard package stay featuring Dar El Eiman Al Khalil in Mecca and Dar El Eiman Al Nour in Madinah.',
              price: 235500,
              category: '3 Star',
              duration: '12 Nights',
              location: 'Dar El Eiman Al Khalil & Dar El Eiman Al Nour',
              hotel_name: 'Dar El Eiman Al Khalil & Dar El Eiman Al Nour',
              distance_from_haram: '1000m & 200m',
              hotel_makkah: 'Dar El Eiman Al Khalil',
              distance_makkah: '1000m (Shuttle)',
              hotel_madinah: 'Dar El Eiman Al Nour',
              distance_madinah: '200m',
              image_url: 'https://images.unsplash.com/photo-1564769662533-3f5aae93cec2?w=800&q=80',
              airline: 'Saudi Airlines',
              stars: 3,
              badge: '3 STAR',
              includes: ['E-Visa Processing', 'Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
              not_includes: ['Return Flight', 'Meals', 'Travel insurance', 'Laundry and room service charges'],
              itinerary: [
                {day: 'Day 01', title: 'Arrival Makkah', description: 'Arrive Jeddah, transfer to Dar El Eiman Al Khalil Makkah.'},
                {day: 'Day 02 - 06', title: 'Makkah Devotions', description: 'Daily prayers at Haram. Guided cave Hira visits.'},
                {day: 'Day 07 - 11', title: 'Madinah Stays', description: 'Transfer to Dar El Eiman Al Nour Madinah. Prayers at Nabawi.'},
                {day: 'Day 12', title: 'Departure', description: 'Check-out, transfer to airport for return flight.'}
              ]
            },
            {
              title: '10 Nights 3 Star Comfort Deal',
              description: 'Highly requested 10-night comfort deal. Staying at Dorat Dar El Eiman in Mecca and Elaf Al Bustan in Madinah.',
              price: 225500,
              category: '3 Star',
              duration: '10 Nights',
              location: 'Dorat Dar El Eiman & Elaf Al Bustan',
              hotel_name: 'Dorat Dar El Eiman & Elaf Al Bustan',
              distance_from_haram: '750m & 13 Min Walk',
              hotel_makkah: 'Dorat Dar El Eiman',
              distance_makkah: '750m',
              hotel_madinah: 'Elaf Al Bustan',
              distance_madinah: '13 Min Walk / 800m',
              image_url: 'https://images.unsplash.com/photo-1580338834642-8a3acf79b1b8?w=800&q=80',
              airline: 'Gulf Air',
              stars: 3,
              badge: '3 STAR',
              includes: ['E-Visa Processing', 'Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
              not_includes: ['Return Flight', 'Meals', 'Travel insurance', 'Laundry and room service charges'],
              itinerary: [
                {day: 'Day 01', title: 'Arrival Makkah', description: 'Arrive Jeddah, transfer to Dorat Makkah. Perform Umrah.'},
                {day: 'Day 02 - 05', title: 'Makkah Prayers', description: 'Focus on daily prayers in Haram. Guided historical tours.'},
                {day: 'Day 06 - 09', title: 'Madinah Prayers', description: 'Transfer to Elaf Al Bustan Madinah. Daily prayers in Nabawi.'},
                {day: 'Day 10', title: 'Departure', description: 'Check-out and transfer to airport.'}
              ]
            },
            {
              title: '7 Nights 3 Star Express Package',
              description: 'An express 7-night package stay. Staying at Al Thuria Hotel in Mecca and Amjad Al Gharra in Madinah.',
              price: 215500,
              category: '3 Star',
              duration: '7 Nights',
              location: 'Al Thuria Hotel & Amjad Al Gharra',
              hotel_name: 'Al Thuria Hotel & Amjad Al Gharra',
              distance_from_haram: '5 Min Walk & 10 Min Walk',
              hotel_makkah: 'Al Thuria Hotel',
              distance_makkah: '5 Min Walk / 350m',
              hotel_madinah: 'Amjad Al Gharra',
              distance_madinah: '10 Min Walk / 700m',
              image_url: 'https://images.unsplash.com/photo-1596435688717-2d2f3b0fc47a?w=800&q=80',
              airline: 'PIA',
              stars: 3,
              badge: '3 STAR',
              includes: ['E-Visa Processing', 'Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
              not_includes: ['Return Flight', 'Meals', 'Travel insurance', 'Laundry and room service charges'],
              itinerary: [
                {day: 'Day 01', title: 'Arrival & Umrah', description: 'Check-in Al Thuria Hotel Makkah. Perform Umrah.'},
                {day: 'Day 02 - 04', title: 'Makkah prayers', description: 'Daily prayers at Haram. Guided cave Ziyarat.'},
                {day: 'Day 05 - 06', title: 'Madinah stays', description: 'Proceed to Amjad Al Gharra Madinah. Prayers at Nabawi.'},
                {day: 'Day 07', title: 'Departure', description: 'Return transfer to airport.'}
              ]
            },
            // ── 4 Star (4 Packages) ──
            {
              title: '14 Nights 4 Star Premium Umrah',
              description: 'Indulge in a premium 4-Star Umrah journey. Features Ramada Dar Al Faiyzeen in Mecca and Elaf Taibah in Madinah. Includes premium ground support and comfort travel.',
              price: 284000,
              category: '4 Star',
              duration: '14 Nights',
              location: 'Ramada Dar Al Faiyzeen & Elaf Taibah',
              hotel_name: 'Ramada Dar Al Faiyzeen & Elaf Taibah',
              distance_from_haram: '10 Min Walk & 12 Min Walk',
              hotel_makkah: 'Ramada Dar Al Faiyzeen',
              distance_makkah: '10 Min Walk / 600m',
              hotel_madinah: 'Elaf Taibah',
              distance_madinah: '12 Min Walk / 800m',
              image_url: 'https://images.unsplash.com/photo-1591604129909-2b4ce4e6e6d2?w=800&q=80',
              airline: 'Saudi Airlines',
              stars: 4,
              badge: '4 STAR',
              includes: ['E-Visa Processing', 'Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
              not_includes: ['Return Flight', 'Meals', 'Travel insurance', 'Laundry and room service charges'],
              itinerary: [
                {day: 'Day 01', title: 'Makkah Arrival', description: 'Arrive Jeddah, transfer to Ramada Makkah. Perform Umrah.'},
                {day: 'Day 02 - 07', title: 'Haram Devotions', description: 'Daily prayers at Haram. Guided group tours of historical sites.'},
                {day: 'Day 08 - 13', title: 'Madinah Serenity', description: 'Transfer to Elaf Taibah Madinah. Rest and Ibadah in Masjid Nabawi.'},
                {day: 'Day 14', title: 'Departure', description: 'Final prayers, check-out, transfer to airport.'}
              ]
            },
            {
              title: '12 Nights 4 Star Executive Umrah',
              description: 'Outstanding executive stay featuring Nawazi Watheer in Makkah and Al Mukhtara in Madinah. Comfort and quality guaranteed.',
              price: 278000,
              category: '4 Star',
              duration: '12 Nights',
              location: 'Nawazi Watheer & Al Mukhtara',
              hotel_name: 'Nawazi Watheer & Al Mukhtara',
              distance_from_haram: '700m & 5 Min Drive',
              hotel_makkah: 'Nawazi Watheer',
              distance_makkah: '700m',
              hotel_madinah: 'Al Mukhtara',
              distance_madinah: '5 Min Drive / 1.5 km (Shuttle)',
              image_url: 'https://images.unsplash.com/photo-1564769662533-3f5aae93cec2?w=800&q=80',
              airline: 'Gulf Air',
              stars: 4,
              badge: '4 STAR',
              includes: ['E-Visa Processing', 'Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
              not_includes: ['Return Flight', 'Meals', 'Travel insurance', 'Laundry and room service charges'],
              itinerary: [
                {day: 'Day 01', title: 'Arrival Makkah', description: 'Transfer to Nawazi Watheer Makkah. Perform Umrah.'},
                {day: 'Day 02 - 06', title: 'Makkah Stay', description: 'Daily prayers in Haram. Guided group Ziyarat.'},
                {day: 'Day 07 - 11', title: 'Madinah Stay', description: 'Transfer to Al Mukhtara Madinah. Prayers at Nabawi.'},
                {day: 'Day 12', title: 'Departure', description: 'Check-out and transfer to airport.'}
              ]
            },
            {
              title: '10 Nights 4 Star Comfort Deal',
              description: 'Our standard 10-night executive package. Stay at Dar El Eiman Grand Makkah and Al Eiman Al Manar Madinah.',
              price: 267500,
              category: '4 Star',
              duration: '10 Nights',
              location: 'Dar El Eiman Grand & Al Eiman Al Manar',
              hotel_name: 'Dar El Eiman Grand & Al Eiman Al Manar',
              distance_from_haram: '750m & 12 Min Walk',
              hotel_makkah: 'Dar El Eiman Grand',
              distance_makkah: '750m',
              hotel_madinah: 'Al Eiman Al Manar',
              distance_madinah: '12 Min Walk / 800m',
              image_url: 'https://images.unsplash.com/photo-1580338834642-8a3acf79b1b8?w=800&q=80',
              airline: 'PIA',
              stars: 4,
              badge: '4 STAR',
              includes: ['E-Visa Processing', 'Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
              not_includes: ['Return Flight', 'Meals', 'Travel insurance', 'Laundry and room service charges'],
              itinerary: [
                {day: 'Day 01', title: 'Welcome to Makkah', description: 'Arrive Jeddah, transfer to Dar El Eiman Grand. Perform Umrah.'},
                {day: 'Day 02 - 05', title: 'Makkah Prayers', description: 'Prayers in Haram. Group Ziyarat to Mina & Arafat.'},
                {day: 'Day 06 - 09', title: 'Madinah Nabawi', description: 'Transfer to Al Eiman Al Manar Madinah. Ibadah and Quba visits.'},
                {day: 'Day 10', title: 'Departure', description: 'Check-out, transfer to airport.'}
              ]
            },
            {
              title: '7 Nights 4 Star Express Package',
              description: 'Short and spiritually active executive package. Stay 4 Nights in Amjad Al Diyafah (Makkah) and 3 Nights in Elaf Meshal Al Salam (Madinah).',
              price: 255000,
              category: '4 Star',
              duration: '7 Nights',
              location: 'Amjad Al Diyafah & Elaf Meshal Al Salam',
              hotel_name: 'Amjad Al Diyafah & Elaf Meshal Al Salam',
              distance_from_haram: '800m & 13 Min Walk',
              hotel_makkah: 'Amjad Al Diyafah',
              distance_makkah: '800m',
              hotel_madinah: 'Elaf Meshal Al Salam',
              distance_madinah: '13 Min Walk / 850m',
              image_url: 'https://images.unsplash.com/photo-1596435688717-2d2f3b0fc47a?w=800&q=80',
              airline: 'Saudi Airlines',
              stars: 4,
              badge: '4 STAR',
              includes: ['E-Visa Processing', 'Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
              not_includes: ['Return Flight', 'Meals', 'Travel insurance', 'Laundry and room service charges'],
              itinerary: [
                {day: 'Day 01', title: 'Arrive & Umrah', description: 'Check-in Amjad Al Diyafah Makkah. Complete Umrah.'},
                {day: 'Day 02 - 04', title: 'Makkah Devotions', description: 'Daily prayers at Haram. Guided cave Ziyarat.'},
                {day: 'Day 05 - 06', title: 'Madinah Nabawi', description: 'Proceed to Elaf Meshal Al Salam. Prayers at Nabawi.'},
                {day: 'Day 07', title: 'Departure', description: 'Return transfer to airport.'}
              ]
            },
            // ── 5 Star (4 Packages) ──
            {
              title: '14 Nights 5 Star Cheap Umrah Package',
              description: 'All-inclusive 5-Star luxury package on a budget. Stay at Holiday Inn Makkah and Province Al Sham Hotel in Madinah. Includes premium ground support and breakfast.',
              price: 289500,
              category: '5 Star',
              duration: '14 Nights',
              location: 'Holiday Inn Makkah & Province Al Sham Hotel',
              hotel_name: 'Holiday Inn Makkah & Province Al Sham Hotel',
              distance_from_haram: '10 Min Shuttle & 2 Min Walk',
              hotel_makkah: 'Holiday Inn Makkah',
              distance_makkah: '5 km (Free Shuttle)',
              hotel_madinah: 'Province Al Sham Hotel',
              distance_madinah: '2 Min Walk / 150m',
              image_url: 'https://images.unsplash.com/photo-1591604129909-2b4ce4e6e6d2?w=800&q=80',
              airline: 'Emirates',
              stars: 5,
              badge: '5 STAR',
              includes: ['E-Visa Processing', 'Ground Transport', 'Accomodations', 'FREE Breakfast', '24/7 Pilgrims Support'],
              not_includes: ['Return Flight', 'Laundry and room service charges', 'Travel insurance'],
              itinerary: [
                {day: 'Day 01', title: 'VIP Arrival Makkah', description: 'Arrive Jeddah, private transfer to Holiday Inn Makkah. Complete Umrah.'},
                {day: 'Day 02 - 07', title: 'Makkah Devotions', description: 'Daily prayers in Masjid Al-Haram. Private Ziyarat of holy landmarks.'},
                {day: 'Day 08 - 13', title: 'Madinah Stay', description: 'GMC transfer to Province Al Sham Madinah. Ibadah at Nabawi and private historic tours.'},
                {day: 'Day 14', title: 'Departure', description: 'Final prayers, checkout, private transfer to Jeddah airport for return flight.'}
              ]
            },
            {
              title: '12 Nights 5 Star Umrah Package',
              description: '12-day premium stay featuring Hyatt Regency in Mecca and Majlis Grand Mercure in Madinah.',
              price: 279500,
              category: '5 Star',
              duration: '12 Nights',
              location: 'Hyatt Regency & Majlis Grand Mercure',
              hotel_name: 'Hyatt Regency & Majlis Grand Mercure',
              distance_from_haram: '1 Min Walk & 200m',
              hotel_makkah: 'Hyatt Regency',
              distance_makkah: '1 Min Walk / 100m',
              hotel_madinah: 'Majlis Grand Mercure',
              distance_madinah: '200m',
              image_url: 'https://images.unsplash.com/photo-1564769662533-3f5aae93cec2?w=800&q=80',
              airline: 'Saudi Airlines',
              stars: 5,
              badge: '5 STAR',
              includes: ['E-Visa Processing', 'Ground Transport', 'Accomodations', 'FREE Breakfast', '24/7 Pilgrims Support'],
              not_includes: ['Return Flight', 'Laundry and room service charges', 'Travel insurance'],
              itinerary: [
                {day: 'Day 01', title: 'Arrival Makkah', description: 'Arrive Jeddah, transfer to Hyatt Regency Makkah. Perform Umrah.'},
                {day: 'Day 02 - 06', title: 'Makkah Prayers', description: 'Pray daily in Masjid Al-Haram. Guided Ziyarat of holy sites.'},
                {day: 'Day 07 - 11', title: 'Madinah Nabawi', description: 'Transfer to Majlis Grand Mercure. Rest and prayers in Nabawi.'},
                {day: 'Day 12', title: 'Departure', description: 'Final prayers, check-out, transfer to airport.'}
              ]
            },
            {
              title: '10 Nights 5 Star Umrah Package',
              description: 'Maximize your spiritual comfort with our 10-night 5-star package. Stay at Anjum Hotel in Mecca and Al Haram Hotel in Madinah.',
              price: 269500,
              category: '5 Star',
              duration: '10 Nights',
              location: 'Anjum Hotel & Al Haram Hotel',
              hotel_name: 'Anjum Hotel & Al Haram Hotel',
              distance_from_haram: '3 Min Walk & 2 Min Walk',
              hotel_makkah: 'Anjum Hotel',
              distance_makkah: '3 Min Walk / 250m',
              hotel_madinah: 'Al Haram Hotel',
              distance_madinah: '2 Min Walk / 150m',
              image_url: 'https://images.unsplash.com/photo-1580338834642-8a3acf79b1b8?w=800&q=80',
              airline: 'Gulf Air',
              stars: 5,
              badge: '5 STAR',
              includes: ['E-Visa Processing', 'Ground Transport', 'Accomodations', 'FREE Breakfast', '24/7 Pilgrims Support'],
              not_includes: ['Return Flight', 'Laundry and room service charges', 'Travel insurance'],
              itinerary: [
                {day: 'Day 01', title: 'Makkah Check-in', description: 'Arrive Jeddah, transfer to Anjum Hotel Makkah. Perform Umrah.'},
                {day: 'Day 02 - 05', title: 'Makkah Prayers', description: 'Daily prayers at Haram. Historical Ziyarat tours.'},
                {day: 'Day 06 - 09', title: 'Madinah Stay', description: 'Transfer to Al Haram Madinah. Rest and Ibadah at Masjid Nabawi.'},
                {day: 'Day 10', title: 'Departure', description: 'Checkout and return transfer to airport.'}
              ]
            },
            {
              title: '7 Nights 5 Star Umrah Package',
              description: 'An elite 7-night spiritual stay. Staying at Al Shohada Hotel in Mecca and Al Emaan Royal in Madinah.',
              price: 235500,
              category: '5 Star',
              duration: '7 Nights',
              location: 'Al Shohada Makkah & Al Emaan Royal',
              hotel_name: 'Al Shohada Makkah & Al Emaan Royal',
              distance_from_haram: '6 Min Walk & 2 Min Walk',
              hotel_makkah: 'Al Shohada Makkah',
              distance_makkah: '6 Min Walk / 400m',
              hotel_madinah: 'Al Emaan Royal',
              distance_madinah: '2 Min Walk / 200m',
              image_url: 'https://images.unsplash.com/photo-1596435688717-2d2f3b0fc47a?w=800&q=80',
              airline: 'Saudi Airlines',
              stars: 5,
              badge: '5 STAR',
              includes: ['E-Visa Processing', 'Ground Transport', 'Accomodations', 'FREE Breakfast', '24/7 Pilgrims Support'],
              not_includes: ['Return Flight', 'Laundry and room service charges', 'Travel insurance'],
              itinerary: [
                {day: 'Day 01', title: 'Arrival Makkah', description: 'Check-in Al Shohada Hotel Makkah. Complete Umrah under scholar guidance.'},
                {day: 'Day 02 - 04', title: 'Makkah Stays', description: 'Prayers at Masjid Al-Haram. Focus on Ibadah.'},
                {day: 'Day 05 - 06', title: 'Madinah Nabawi', description: 'Proceed to Al Emaan Royal Madinah. Daily prayers in Nabawi.'},
                {day: 'Day 07', title: 'Departure', description: 'Transfer to Jeddah airport for flight home.'}
              ]
            }
          ];

          // Delete all current packages first to avoid duplicates or orphaned entries
          await supabaseAdmin.from('packages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
          await supabaseAdmin.from('packages').insert(seedList);
          const { data: refetched, error: refetchErr } = await supabase.from('packages').select('*').order('created_at', { ascending: false });
          if (!refetchErr && refetched) {
            data = refetched;
          }
        }

        // Perform self-cleaning delete in the background for any other packages
        if (hasServiceRole && data && data.length > 0) {
          const idsToDelete = data
            .filter(p => {
              const cat = (p.category || '').toLowerCase();
              const title = (p.title || '').toLowerCase();
              if (cat.includes('economy')) return !title.includes('21 nights');
              if (cat.includes('3 star') || cat.includes('3star') || cat.includes('4 star') || cat.includes('4star') || cat.includes('5 star') || cat.includes('5star')) {
                return !(title.includes('14 nights') || title.includes('12 nights') || title.includes('10 nights') || title.includes('7 nights'));
              }
              return false;
            })
            .map(p => p.id);
          
          if (idsToDelete.length > 0) {
            supabaseAdmin.from('packages').delete().in('id', idsToDelete)
              .then(({ error: delErr }) => {
                if (delErr) console.error('[Cleanup] Failed to delete old packages:', delErr.message);
                else console.log('[Cleanup] Successfully deleted old packages:', idsToDelete);
              })
              .catch(err => console.error('[Cleanup] Error during deletion:', err));
          }
        }

        // Return only the approved packages (filters out old packages immediately on response)
        const cleanData = (data || []).filter(p => {
          const cat = (p.category || '').toLowerCase();
          const title = (p.title || '').toLowerCase();
          if (cat.includes('economy')) return title.includes('21 nights');
          if (cat.includes('3 star') || cat.includes('3star') || cat.includes('4 star') || cat.includes('4star') || cat.includes('5 star') || cat.includes('5star')) {
            return title.includes('14 nights') || title.includes('12 nights') || title.includes('10 nights') || title.includes('7 nights');
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