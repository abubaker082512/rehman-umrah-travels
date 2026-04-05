const jwt = require('jsonwebtoken');

// Static packages data (fallback when Supabase is not configured)
const staticPackages = [
  {
    id: 1,
    title: 'Premium 5-Star Executive Umrah',
    description: 'Experience the ultimate spiritual journey with our premium 5-star package.',
    price: 485000,
    category: '5 Star',
    duration: '15 Days',
    location: 'Makkah & Madinah',
    hotel_name: 'Pullman ZamZam Makkah',
    distance_from_haram: '150m from Haram',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdBRKj372X3XEdAkE-8DFUWUG3imKQ3ac1b9USL1W0C7BBcveBszqF8mJwUnrjm_5pqskUDnrMUG5yx4QEV-eq5AZXw1KY6sy0X29rpzsJ0PgTNtzNIKD6UJk5_i92ULJFJC4ETiDGG5sBM3I5psHDr_G9s4mWI7IBISEwh_FOp8XWve3y6kl_TDJzu-I1o55kkiAvkMjUJOG_qFJqigRHzs8XXys3tPtXSAhE7XP1c17NsdmgiYoT9NlK4oiCiDUJZtS4VqPVr2_y',
    includes: ['E-Visa Processing', 'Return Flights', 'VIP Transfer', 'Guided Tours', 'Daily Meals'],
    stars: 5,
    badge: 'Best Seller',
    airline: 'Qatar Airways'
  },
  {
    id: 2,
    title: 'Silver 4-Star Comfort Umrah',
    description: 'Our most popular family package offering comfort and value.',
    price: 325000,
    category: '4 Star',
    duration: '10 Days',
    location: 'Makkah & Madinah',
    hotel_name: 'Al-Shohada Hotel',
    distance_from_haram: '300m from Haram',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3_91cdPdyWpCst8uVkcSEkdZVScCJV50Uz8dmehZ72dVc-AfHZbJoQzWGsgyEAxSfLd4WFy_TcxoatRlFL9pYi7TlRzV0SRDbRgWohXX1z0OTxHqAQTG9iS5gpGUB5Z_H6pitDxZUMKSXLEM0yFiSDg8vEdV9EQFTltpcz7I4kc00gPiHi3Ng2O0p0E9HLJPYcB4wTjtqGLQVhxvHDrhAIguL_9WFBZysggur9-whO305qAImVClX1qsUEVVKYQmL9mKjsOC2BAkA',
    includes: ['E-Visa Processing', 'Return Flights', 'Shared Transfer', 'Guided Tours', 'Breakfast'],
    stars: 4,
    badge: 'Popular Choice',
    airline: 'Saudi Airlines'
  },
  {
    id: 3,
    title: 'Spiritual Ramadan 2024',
    description: 'Experience the blessed month of Ramadan in the holy cities.',
    price: 750000,
    category: 'Ramadan',
    duration: '30 Days',
    location: 'Makkah & Madinah',
    hotel_name: 'Dar Al Eiman Grand',
    distance_from_haram: '200m from Haram',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0LUe8DBs6mr578_8-2rCv85B1fSGUnt1I0JeY6VCP13gvKcXOSuQN20B8yyCGUalnauFjp-7PXrQHfZc81fClbi4Y51FKF3AgmNo_WAvbPfWwlMksw02OxLGeliL9fXwIDQy6zi6mBt72o6pbuQfNejTb2P8-MsB_LzXSulKKW6JIrcuX_AVIxvZtOvVNTcRjpRsjWlgLthPSmBMS7LQni7NObK0Z2NVuXC1Fwpyo0DA1bzO5JkQdnTpwDyIBxSRfImfbwrXaNF59',
    includes: ['Visa', 'Flights', 'Hotel', 'Full Iftar & Suhur', 'Ziyarat'],
    stars: 4,
    badge: 'Limited',
    airline: 'Various'
  },
  {
    id: 4,
    title: 'Royal Suites Collection',
    description: 'The ultimate luxury experience in the holy cities.',
    price: 980000,
    category: '5 Star',
    duration: '07 Days',
    location: 'Makkah & Madinah',
    hotel_name: 'Raffles Makkah',
    distance_from_haram: 'Inside Clock Tower',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUqhQvXdmXntutgQNw439DJ2g4eby54ExQ7ovVzpherZzYoDIMWSfjuoq-pLcHYRa26UOYkjpll3nqA_UaSv0631v_QxoE7eujuTlkIq-R18tW4l1cM6J25NQ_lnmK7WjpXsbtJ0hmNiYQrzvh-U5FoYMQ_0y6HpIyCg5MUWVAnZpkpOnz4djr09D6mLQFN1gg0pbjNEZDCaRh2w_baUqbwlml3jMs6ck_bKp5H8wQ_YZyoJPk7e_YZJXJMy5WkLJZkJ31ORsCy_rb',
    includes: ['Visa', 'Business Class', 'Raffles Suite', 'Private Transfer', 'Butler Service'],
    stars: 5,
    badge: 'Gold Standard',
    airline: 'Emirates'
  }
];

// Simple in-memory storage for demo (resets on serverless cold start)
let packages = [...staticPackages];
let nextId = 5;

// Check if user is authenticated
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

module.exports = function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { method, url } = req;
  
  // Extract ID from URL if present
  const idMatch = url.match(/\/(\d+)$/);
  const id = idMatch ? parseInt(idMatch[1]) : null;

  // GET /api/packages or /api/packages/:id
  if (method === 'GET') {
    if (id) {
      const pkg = packages.find(p => p.id === id);
      if (pkg) {
        return res.json(pkg);
      } else {
        return res.status(404).json({ message: 'Package not found' });
      }
    }
    return res.json(packages);
  }

  // POST /api/packages (protected)
  if (method === 'POST') {
    if (!isAuthenticated(req)) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const newPackage = {
      id: nextId++,
      ...req.body,
      price: parseInt(req.body.price) || 0
    };
    packages.push(newPackage);
    return res.status(201).json(newPackage);
  }

  // DELETE /api/packages/:id (protected)
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
