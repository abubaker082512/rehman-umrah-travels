const jwt = require('jsonwebtoken');

// Static packages data with full details
const staticPackages = [
  {
    id: 1,
    title: 'Premium 5-Star Executive Umrah',
    subtitle: 'The Ultimate Spiritual Experience',
    description: 'Experience the ultimate spiritual journey with our premium 5-star package. Stay at the iconic Pullman ZamZam hotel, just 150 meters from the Masjid Al-Haram. This exclusive package offers VIP treatment with private transfers, guided ziyarat, and all meals included.',
    price: 485000,
    category: '5 Star',
    duration: '15 Days',
    days: '15',
    location: 'Pullman ZamZam Makkah',
    hotel_name: 'Pullman ZamZam Makkah',
    distance_from_haram: '150m from Haram',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdBRKj372X3XEdAkE-8DFUWUG3imKQ3ac1b9USL1W0C7BBcveBszqF8mJwUnrjm_5pqskUDnrMUG5yx4QEV-eq5AZXw1KY6sy0X29rpzsJ0PgTNtzNIKD6UJk5_i92ULJFJC4ETiDGG5sBM3I5psHDr_G9s4mWI7IBISEwh_FOp8XWve3y6kl_TDJzu-I1o55kkiAvkMjUJOG_qFJqigRHzs8XXys3tPtXSAhE7XP1c17NsdmgiYoT9NlK4oiCiDUJZtS4VqPVr2_y',
    includes: 'E-Visa Processing,Return Flights (Qatar Airways),VIP Ground Transfer,Guided Ziyarat,Daily Buffet Breakfast & Dinner,24/7 Tour Manager Support',
    stars: 5,
    badge: 'Best Seller',
    airline: 'Qatar Airways',
    itinerary: [
      { day: 'Day 01', title: 'Arrival & Makkah Check-in', description: 'Arrival at Jeddah Airport, VIP GMC transfer to Makkah. Perform Umrah under scholar guidance.' },
      { day: 'Day 02 - 07', title: 'Makkah Devotion', description: 'Daily prayers in Masjid Al-Haram. Guided Ziyarat to Mina, Arafat & Muzdalifah on Day 3.' },
      { day: 'Day 08 - 13', title: 'Madinah Munawwarah', description: 'Transfer to Madinah. Stay at Anwar Al Madinah Movenpick. Daily Fajr at Masjid Nabawi.' },
      { day: 'Day 14 - 15', title: 'Departure', description: 'Final prayers at Masjid Nabawi. Farewell Tawaf in Makkah then transfer to airport.' }
    ]
  },
  {
    id: 2,
    title: 'Silver 4-Star Comfort Umrah',
    subtitle: 'Perfect Balance of Comfort & Value',
    description: 'Our most popular family package offering the perfect balance of comfort and value. Stay at Al-Shohada Hotel, just 300 meters from the Haram. This package is ideal for families looking for quality accommodation without breaking the bank.',
    price: 325000,
    category: '4 Star',
    duration: '10 Days',
    days: '10',
    location: 'Al-Shohada Hotel',
    hotel_name: 'Al-Shohada Hotel',
    distance_from_haram: '300m from Haram',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3_91cdPdyWpCst8uVkcSEkdZVScCJV50Uz8dmehZ72dVc-AfHZbJoQzWGsgyEAxSfLd4WFy_TcxoatRlFL9pYi7TlRzV0SRDbRgWohXX1z0OTxHqAQTG9iS5gpGUB5Z_H6pitDxZUMKSXLEM0yFiSDg8vEdV9EQFTltpcz7I4kc00gPiHi3Ng2O0p0E9HLJPYcB4wTjtqGLQVhxvHDrhAIguL_9WFBZysggur9-whO305qAImVClX1qsUEVVKYQmL9mKjsOC2BAkA',
    includes: 'E-Visa Processing,Return Flights (Saudi Airlines),Shared Ground Transfer,Guided Ziyarat Makkah,Breakfast Included,24/7 Support Line',
    stars: 4,
    badge: 'Popular Choice',
    airline: 'Saudi Airlines',
    itinerary: [
      { day: 'Day 01', title: 'Arrival & Umrah', description: 'Arrival at Jeddah, transfer to Makkah hotel. Perform Umrah with group guide.' },
      { day: 'Day 02 - 05', title: 'Makkah Prayers', description: 'All five prayers in Haram. Full-day Ziyarat of historical Makkah sites on Day 3.' },
      { day: 'Day 06 - 09', title: 'Madinah Stay', description: 'Transfer to Madinah. Prayers at Masjid Nabawi, Ziyarat of Uhud, Quba mosque & more.' },
      { day: 'Day 10', title: 'Departure', description: 'Check-out and transfer to airport. Farewell dua with group.' }
    ]
  },
  {
    id: 3,
    title: 'Spiritual Ramadan 2024',
    subtitle: 'Ramadan in the Holy Cities',
    description: 'Experience the blessed month of Ramadan in the holy cities. Full iftar and suhoor provided, with special Taraweeh prayers at Masjid Al-Haram. This spiritual journey will deepen your connection with Allah SWT.',
    price: 750000,
    category: 'Ramadan',
    duration: '30 Days',
    days: '30',
    location: 'Dar Al Eiman Grand',
    hotel_name: 'Dar Al Eiman Grand',
    distance_from_haram: '200m from Haram',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0LUe8DBs6mr578_8-2rCv85B1fSGUnt1I0JeY6VCP13gvKcXOSuQN20B8yyCGUalnauFjp-7PXrQHfZc81fClbi4Y51FKF3AgmNo_WAvbPfWwlMksw02OxLGeliL9fXwIDQy6zi6mBt72o6pbuQfNejTb2P8-MsB_LzXSulKKW6JIrcuX_AVIxvZtOvVNTcRjpRsjWlgLthPSmBMS7LQni7NObK0Z2NVuXC1Fwpyo0DA1bzO5JkQdnTpwDyIBxSRfImfbwrXaNF59',
    includes: 'E-Visa Processing,Return Flights,Hotel Accommodation,Full Iftar & Suhur,Guided Ziyarat,24/7 Support',
    stars: 4,
    badge: 'Limited',
    airline: 'Various Airlines',
    itinerary: [
      { day: 'Day 01', title: 'Arrival & Umrah', description: 'Arrival at Jeddah, transfer to Makkah. Perform Umrah upon arrival.' },
      { day: 'Day 02 - 15', title: 'Ramadan in Makkah', description: 'Fast in the holy month. Taraweeh at Haram. Ziyarat of historical sites.' },
      { day: 'Day 16 - 28', title: 'Madinah Stay', description: 'Transfer to Madinah for remaining Ramadan. Iftar at Masjid Nabawi.' },
      { day: 'Day 29 - 30', title: 'Eid & Departure', description: 'Celebrate Eid Al-Fitr in Madinah. Departure after Eid prayers.' }
    ]
  },
  {
    id: 4,
    title: 'Royal Suites Collection',
    subtitle: 'The Ultimate Luxury Experience',
    description: 'The ultimate luxury experience. Raffles Makkah offers world-class suites with panoramic views of the Holy Kaaba. Private transfers and butler service included. This is the most exclusive Umrah experience we offer.',
    price: 980000,
    category: '5 Star',
    duration: '07 Days',
    days: '7',
    location: 'Raffles Makkah',
    hotel_name: 'Raffles Makkah',
    distance_from_haram: 'Inside Clock Tower',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUqhQvXdmXntutgQNw439DJ2g4eby54ExQ7ovVzpherZzYoDIMWSfjuoq-pLcHYRa26UOYkjpll3nqA_UaSv0631v_QxoE7eujuTlkIq-R18tW4l1cM6J25NQ_lnmK7WjpXsbtJ0hmNiYQrzvh-U5FoYMQ_0y6HpIyCg5MUWVAnZpkpOnz4djr09D6mLQFN1gg0pbjNEZDCaRh2w_baUqbwlml3jMs6ck_bKp5H8wQ_YZyoJPk7e_YZJXJMy5WkLJZkJ31ORsCy_rb',
    includes: 'E-Visa Processing,Business Class Flights,Raffles Suite Accommodation,Private GMC Transfer,Personal Butler Service,All Meals Included,VIP Ziyarat',
    stars: 5,
    badge: 'Gold Standard',
    airline: 'Emirates Business',
    itinerary: [
      { day: 'Day 01', title: 'VIP Arrival', description: 'Business class arrival, private transfer to Raffles. Suite check-in with welcome amenities.' },
      { day: 'Day 02 - 04', title: 'Makkah in Luxury', description: 'Prayers with Kaaba view. Private Ziyarat with expert guide. Butler assists with all arrangements.' },
      { day: 'Day 05 - 06', title: 'Madinah Royal Treatment', description: 'Private car transfer. Stay at The Oberoi Madinah. Prayers at Masjid Nabawi.' },
      { day: 'Day 07', title: 'Farewell Departure', description: 'Final Tawaf, private transfer to airport. Business class departure.' }
    ]
  }
];

// In-memory storage
let packages = [...staticPackages];
let nextId = 5;

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

// Helper to normalize includes to string
const normalizeIncludes = (pkg) => {
  if (Array.isArray(pkg.includes)) {
    pkg.includes = pkg.includes.join(',');
  }
  return pkg;
};

module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { method, url } = req;
  
  // Extract ID from URL - handle both /api/packages/1 and /api/packages?id=1
  let id = null;
  const idMatch = url.match(/\/(\d+)$/);
  if (idMatch) {
    id = parseInt(idMatch[1]);
  }
  
  if (method === 'GET') {
    if (id) {
      const pkg = packages.find(p => p.id === id);
      if (pkg) {
        return res.json(normalizeIncludes({...pkg}));
      } else {
        return res.status(404).json({ message: 'Package not found' });
      }
    }
    // Return all packages with normalized includes
    return res.json(packages.map(pkg => normalizeIncludes({...pkg})));
  }

  if (method === 'POST') {
    if (!isAuthenticated(req)) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const newPackage = {
      id: nextId++,
      ...req.body,
      price: parseInt(req.body.price) || 0
    };
    
    // Normalize includes for new packages
    if (Array.isArray(req.body.includes)) {
      newPackage.includes = req.body.includes.join(',');
    }
    
    packages.push(newPackage);
    return res.status(201).json(newPackage);
  }

  if (method === 'DELETE' && id) {
    if (!isAuthenticated(req)) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const index = packages.findIndex(p => p.id === id);
    if (index !== -1) {
      packages.splice(index, 1);
      return res.json({ message: 'Package deleted' });
    }
    return res.status(404).json({ message: 'Package not found' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}