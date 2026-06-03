import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import background3 from '../assets/home-3.jpg'
import economyPackagesImg from '../assets/economy_packages.png'
import star3PackagesImg from '../assets/star3_packages.png'
import star4PackagesImg from '../assets/star4_packages.png'
import star5PackagesImg from '../assets/star5_packages.png'

const API_BASE = import.meta.env.VITE_API_URL || ''

const getProxyUrl = (url) => {
  return url || '';
};

const staticPackages = [
  {
    id: 401,
    title: '21 Nights Saver Economy Umrah',
    location: 'Fundaq Mayer Mayassar & Fursan Al Madinah',
    hotel_name: 'Fundaq Mayer Mayassar & Fursan Al Madinah',
    distance_from_haram: '800m & 350m',
    hotel_makkah: 'Fundaq Mayer Mayassar',
    distance_makkah: '800m from Haram',
    nights_makkah: 12,
    hotel_madinah: 'Fursan Al Madinah',
    distance_madinah: '350m from Nabawi',
    nights_madinah: 8,
    price: 209500,
    days: '21 Nights',
    duration: '21 Nights',
    airline: 'Air Blue',
    category: 'Economy',
    stars: 3,
    badge: '21 Nights',
    image: economyPackagesImg,
    image_url: economyPackagesImg,
    description: 'Perform your holy pilgrimage with our affordable 21-day Economy package. Staying at Mayer Mayassar Mecca and Fursan Al Madinah, offering clean and peaceful accommodation.',
    includes: ['Return Flight', 'E-Visa Processing', 'Shared Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
    itinerary: [
      { day: 'Day 01', title: 'Arrival & Makkah Check-in', description: 'Arrive at Jeddah, transfer to Fundaq Mayer Mayassar Makkah. Perform Umrah.' },
      { day: 'Day 02 - 12', title: 'Makkah Prayers', description: 'Daily prayers in Masjid Al-Haram. Guided Ziyarat of historical sites on Day 3.' },
      { day: 'Day 13 - 20', title: 'Madinah Stay', description: 'Transfer to Madinah, check-in Fursan Al Madinah. Prayers at Masjid Nabawi.' },
      { day: 'Day 21', title: 'Departure', description: 'Final prayers and check-out. Transfer to Jeddah Airport for return flight.' }
    ]
  },
  {
    id: 402,
    title: '21 Nights Comfort Economy Saver',
    location: 'Jedat Al Khalil & Karam Ajyad Hotel',
    hotel_name: 'Jedat Al Khalil & Karam Ajyad Hotel',
    distance_from_haram: '750m & 400m',
    hotel_makkah: 'Jedat Al Khalil',
    distance_makkah: '750m from Haram',
    nights_makkah: 12,
    hotel_madinah: 'Karam Ajyad Hotel',
    distance_madinah: '400m from Nabawi',
    nights_madinah: 8,
    price: 224500,
    days: '21 Nights',
    duration: '21 Nights',
    airline: 'PIA',
    category: 'Economy',
    stars: 3,
    badge: '21 Nights',
    image: economyPackagesImg,
    image_url: economyPackagesImg,
    description: 'A high-value family-oriented economy saver package featuring Jedat Al Khalil Mecca hotel and Karam Ajyad in Madinah.',
    includes: ['Return Flight', 'E-Visa Processing', 'Shared Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
    itinerary: [
      { day: 'Day 01', title: 'Jeddah Arrival', description: 'Arrive at Jeddah Airport, transfer to Jedat Al Khalil Makkah.' },
      { day: 'Day 02 - 12', title: 'Ibadah in Makkah', description: 'Perform 5 daily prayers in Haram. Guided group Ziyarat.' },
      { day: 'Day 13 - 20', title: 'Madinah Serenity', description: 'Transfer to Karam Ajyad Madinah. Daily prayers in Nabawi.' },
      { day: 'Day 21', title: 'Departure', description: 'Transfer to Jeddah airport for return flight.' }
    ]
  },
  {
    id: 403,
    title: '21 Nights Ajyad Standard Economy',
    location: 'Al Juhani Ajyad Hotel & Al Ikram Palace',
    hotel_name: 'Al Juhani Ajyad Hotel & Al Ikram Palace',
    distance_from_haram: '650m & 450m',
    hotel_makkah: 'Al Juhani Ajyad Hotel',
    distance_makkah: '650m from Haram',
    nights_makkah: 12,
    hotel_madinah: 'Al Ikram Palace',
    distance_madinah: '450m from Nabawi',
    nights_madinah: 8,
    price: 235500,
    days: '21 Nights',
    duration: '21 Nights',
    airline: 'Saudi Airlines',
    category: 'Economy',
    stars: 3,
    badge: '21 Nights',
    image: economyPackagesImg,
    image_url: economyPackagesImg,
    description: 'Highly popular choice for pilgrims looking for excellent standard services at a reasonable budget in Ajyad, Makkah.',
    includes: ['Return Flight', 'E-Visa Processing', 'Shared Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
    itinerary: [
      { day: 'Day 01', title: 'Makkah Arrival', description: 'Arrive at Jeddah, proceed to Al Juhani Ajyad Hotel Makkah.' },
      { day: 'Day 02 - 12', title: 'Makkah Stays', description: 'Daily prayers at Haram. Historical Ziyarat tours.' },
      { day: 'Day 13 - 20', title: 'Madinah Stays', description: 'Transfer to Al Ikram Madinah. Focus on prayers in Masjid Nabawi.' },
      { day: 'Day 21', title: 'Departure', description: 'Return transfers to Jeddah Airport.' }
    ]
  },
  {
    id: 404,
    title: '21 Nights Extended Special Economy',
    location: 'Maather Al Jiwaar Hotel & Orjawan Al Madinah',
    hotel_name: 'Maather Al Jiwaar Hotel & Orjawan Al Madinah',
    distance_from_haram: '600m & 450m',
    hotel_makkah: 'Maather Al Jiwaar Hotel',
    distance_makkah: '600m from Haram',
    nights_makkah: 12,
    hotel_madinah: 'Orjawan Al Madinah',
    distance_madinah: '450m from Nabawi',
    nights_madinah: 8,
    price: 251500,
    days: '21 Nights',
    duration: '21 Nights',
    airline: 'Air Blue',
    category: 'Economy',
    stars: 3,
    badge: '21 Nights',
    image: economyPackagesImg,
    image_url: economyPackagesImg,
    description: 'Maximize your time in the holy land with our 21-night package. Features Maather Al Jiwaar Makkah and Orjawan Al Madinah.',
    includes: ['Return Flight', 'E-Visa Processing', 'Shared Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
    itinerary: [
      { day: 'Day 01', title: 'Welcome to Makkah', description: 'Arrive in Makkah, check-in to Maather Al Jiwaar Hotel. Complete Umrah.' },
      { day: 'Day 02 - 12', title: 'Makkah Devotions', description: 'Spend peaceful days in Ibadah at Haram. Group Ziyarat.' },
      { day: 'Day 13 - 20', title: 'Madinah Stays', description: 'Transfer to Orjawan Al Madinah. Rest and Ibadah in Masjid Nabawi.' },
      { day: 'Day 21', title: 'Farewell', description: 'Departure transfer to Jeddah Airport.' }
    ]
  },
  {
    id: 501,
    title: '14 Nights 3 Star Comfort Umrah',
    location: 'Al Aseel Ajyad (Makkah) & Al Shourfah Hotel (Madinah)',
    hotel_name: 'Al Aseel Ajyad & Al Shourfah Hotel',
    distance_from_haram: '450m & 300m',
    hotel_makkah: 'Al Aseel Ajyad',
    distance_makkah: '450m from Haram',
    nights_makkah: 7,
    hotel_madinah: 'Al Shourfah Hotel',
    distance_madinah: '300m from Nabawi',
    nights_madinah: 7,
    price: 245500,
    days: '14 Nights',
    duration: '14 Nights',
    airline: 'PIA',
    category: '3 Star',
    stars: 3,
    badge: 'Best Seller',
    image: star3PackagesImg,
    image_url: star3PackagesImg,
    description: 'All-inclusive 3-Star Umrah package. Staying at Al Aseel Ajyad Mecca (7 Nights) and Al Shourfah Hotel Madinah (7 Nights). Fully guided and all ground transfers included.',
    includes: ['E-Visa Processing', 'Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
    itinerary: [
      { day: 'Day 01', title: 'Arrival & Umrah', description: 'Arrive Jeddah Airport, direct transfer to Al Aseel Ajyad Makkah. Perform Umrah.' },
      { day: 'Day 02 - 07', title: 'Makkah Devotion', description: 'Spend daily prayers in Masjid Al-Haram. Guided Ziyarat of Makkah on Day 4.' },
      { day: 'Day 08 - 13', title: 'Madinah Munawwarah', description: 'Transfer to Al Shourfah Madinah. Rest and Ibadah in Masjid Nabawi.' },
      { day: 'Day 14', title: 'Departure', description: 'Farewell prayers at Nabawi, checkout, transfer to airport for return flight.' }
    ]
  },
  {
    id: 601,
    title: '14 Nights 4 Star Premium Umrah',
    location: 'Ramada Dar Al Faiyzeen (Makkah) & Elaf Taibah (Madinah)',
    hotel_name: 'Ramada Dar Al Faiyzeen & Elaf Taibah',
    distance_from_haram: '250m & 150m',
    hotel_makkah: 'Ramada Dar Al Faiyzeen',
    distance_makkah: '250m from Haram',
    nights_makkah: 7,
    hotel_madinah: 'Elaf Taibah',
    distance_madinah: '150m from Nabawi',
    nights_madinah: 7,
    price: 284000,
    days: '14 Nights',
    duration: '14 Nights',
    airline: 'Saudi Airlines',
    category: '4 Star',
    stars: 4,
    badge: 'Premium Comfort',
    image: star4PackagesImg,
    image_url: star4PackagesImg,
    description: 'Indulge in a premium 4-Star Umrah journey. Features Ramada Dar Al Faiyzeen in Mecca and Elaf Taibah in Madinah. Includes premium flights, VIP transfers, and daily buffet breakfast.',
    includes: ['E-Visa Processing', 'Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
    itinerary: [
      { day: 'Day 01', title: 'VIP Makkah Arrival', description: 'Arrive Jeddah, VIP GMC transfer to Ramada Makkah. Special group scholar joins for Umrah.' },
      { day: 'Day 02 - 07', title: 'Spiritual Devotion Makkah', description: 'Enjoy daily prayers at Haram. Special guided historical tours of Makkah sites on Day 3.' },
      { day: 'Day 08 - 13', title: 'Madinah Al Munawwarah', description: 'VIP transport to Elaf Taibah Madinah. Focus on Masjid Nabawi prayers and Uhud tours.' },
      { day: 'Day 14', title: 'Departure', description: 'Check-out, final prayers, and transfer to airport.' }
    ]
  },
  {
    id: 701,
    title: '14 Nights 5 Star Cheap Luxury',
    location: 'Holiday Inn Makkah (Makkah) & Province Al Sham (Madinah)',
    hotel_name: 'Holiday Inn Makkah & Province Al Sham',
    distance_from_haram: '150m & 100m',
    hotel_makkah: 'Holiday Inn Makkah',
    distance_makkah: '150m from Haram',
    nights_makkah: 7,
    hotel_madinah: 'Province Al Sham',
    distance_madinah: '100m from Nabawi',
    nights_madinah: 7,
    price: 289500,
    days: '14 Nights',
    duration: '14 Nights',
    airline: 'Emirates',
    category: '5 Star',
    stars: 5,
    badge: 'Cheap Luxury',
    image: star5PackagesImg,
    image_url: star5PackagesImg,
    description: 'All-inclusive 5-Star luxury package on a budget. Stay at Holiday Inn Makkah (7 Nights) and Province Al Sham Madinah (7 Nights). Premium flights, private VIP GMC transport, and gourmet breakfasts.',
    includes: ['E-Visa Processing', 'Ground Transport', 'Accomodations', 'FREE Breakfast', '24/7 Pilgrims Support'],
    itinerary: [
      { day: 'Day 01', title: 'VIP Arrival Makkah', description: 'Arrive Jeddah, private VIP GMC transfer to Holiday Inn Makkah. Personal guide facilitates Umrah.' },
      { day: 'Day 02 - 07', title: 'Makkah Devotions', description: 'Daily prayers in Masjid Al-Haram. Private VIP Ziyarat of holy landmarks on Day 3.' },
      { day: 'Day 08 - 13', title: 'Madinah Munawwarah', description: 'GMC transfer to Province Al Sham Madinah. Ibadah at Nabawi and private historic tours.' },
      { day: 'Day 14', title: 'Departure', description: 'Final prayers, checkout, private GMC transfer to Jeddah airport for return flight.' }
    ]
  }
]

const getCategoryPresets = (categoryName, title) => {
  const cat = (categoryName || '').toLowerCase()
  const tit = (title || '').toLowerCase()
  
  if (cat.includes('economy') || tit.includes('economy')) {
    return {
      includes: [
        'Return Flight',
        'E-Visa Processing',
        'Shared Ground Transport',
        'Accomodations',
        '24/7 Pilgrims Support'
      ],
      not_includes: [
        'Meals',
        'Travel and health insurance',
        'Laundry and room service charges'
      ]
    }
  } else if (
    cat.includes('classic') || cat.includes('premium') || cat.includes('3 star') || cat.includes('3star') || cat.includes('4 star') || cat.includes('4star') ||
    tit.includes('classic') || tit.includes('premium') || tit.includes('3 star') || tit.includes('3star') || tit.includes('4 star') || tit.includes('4star')
  ) {
    return {
      includes: [
        'E-Visa Processing',
        'Ground Transport',
        'Accomodations',
        '24/7 Pilgrims Support'
      ],
      not_includes: [
        'Return Flight',
        'Meals',
        'Travel and health insurance',
        'Laundry and room service charges'
      ]
    }
  } else if (
    cat.includes('luxury') || cat.includes('5 star') || cat.includes('5star') ||
    tit.includes('luxury') || tit.includes('5 star') || tit.includes('5star')
  ) {
    return {
      includes: [
        'E-Visa Processing',
        'Ground Transport',
        'Accomodations',
        'FREE Breakfast',
        '24/7 Pilgrims Support'
      ],
      not_includes: [
        'Return Flight',
        'Laundry and room service charges',
        'Travel and health insurance'
      ]
    }
  }
  return null
}

const getNightsCount = (pkg) => {
  if (!pkg) return { makkah: 0, madinah: 0 };
  
  if (pkg.nights_makkah !== undefined && pkg.nights_madinah !== undefined) {
    return { makkah: pkg.nights_makkah, madinah: pkg.nights_madinah };
  }
  if (pkg.makkah_nights !== undefined && pkg.madinah_nights !== undefined) {
    return { makkah: pkg.makkah_nights, madinah: pkg.madinah_nights };
  }
  
  const title = (pkg.title || '').toLowerCase();
  const desc = (pkg.description || '').toLowerCase();
  
  if (title.includes('21 nights') || desc.includes('21 nights') || title.includes('21 days') || desc.includes('21 days') || (pkg.duration && pkg.duration.includes('21'))) {
    return { makkah: 12, madinah: 8 };
  }
  if (title.includes('15 nights') || title.includes('15 days') || (pkg.duration && pkg.duration.includes('15'))) {
    return { makkah: 8, madinah: 7 };
  }
  if (title.includes('14 nights') || title.includes('14 days') || (pkg.duration && pkg.duration.includes('14'))) {
    return { makkah: 7, madinah: 7 };
  }
  if (title.includes('12 nights') || title.includes('12 days') || (pkg.duration && pkg.duration.includes('12'))) {
    return { makkah: 7, madinah: 5 };
  }
  if (title.includes('10 nights') || title.includes('10 days') || (pkg.duration && pkg.duration.includes('10'))) {
    return { makkah: 5, madinah: 5 };
  }
  if (title.includes('7 nights') || title.includes('7 days') || (pkg.duration && pkg.duration.includes('7'))) {
    return { makkah: 4, madinah: 3 };
  }

  const durationStr = (pkg.duration || pkg.days || '');
  const match = durationStr.match(/(\d+)\s*(?:night|day)/i);
  if (match) {
    const total = parseInt(match[1]);
    const makkah = Math.ceil(total * 0.6);
    const madinah = total - makkah;
    return { makkah, madinah };
  }
  
  return { makkah: 7, madinah: 7 };
}

const PackageDetail = () => {
  const { id } = useParams()
  const [pkg, setPkg] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios.get(`${API_BASE}/api/packages/${id}`)
      .then(res => {
        // Ensure includes and not_includes are always arrays
        const data = res.data
        if (data.includes && typeof data.includes === 'string') {
          data.includes = data.includes.split(',').map(s => s.trim())
        }
        if (data.not_includes && typeof data.not_includes === 'string') {
          data.not_includes = data.not_includes.split(',').map(s => s.trim())
        }
        setPkg(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching package:', err)
        const staticPkg = staticPackages.find(p => p.id === parseInt(id))
        if (staticPkg) {
          setPkg(staticPkg)
        }
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <div className="bg-surface font-manrope text-on-surface min-h-screen flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#CD9933] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-notoSerif text-xl text-primary">Loading Package Details...</p>
        </div>
      </div>
    )
  }

  if (!pkg) {
    return (
      <div className="bg-surface font-manrope text-on-surface min-h-screen flex flex-col items-center justify-center">
        <Navbar />
        <div className="text-center mt-24">
          <span className="material-symbols-outlined text-6xl text-error mb-4 block">error</span>
          <h2 className="font-notoSerif text-3xl text-primary mb-4">Package Not Found</h2>
          <Link to="/packages" className="bg-[#CD9933] text-white px-8 py-3 rounded font-bold uppercase tracking-widest text-sm inline-block mt-4">Browse All Packages</Link>
        </div>
      </div>
    )
  }

  const price = typeof pkg.price === 'number' ? pkg.price : (parseFloat(String(pkg.price).replace(/[^0-9.]/g, '')) || 0)
  const hotelName = pkg.hotel_name || pkg.hotelName || pkg.location || 'Premium Hotel'
  const distance = pkg.distance_from_haram || pkg.distanceFromHaram || 'Steps to Haram'
  const { makkah: makkahNights, madinah: madinahNights } = getNightsCount(pkg)

  return (
    <div className="bg-surface font-manrope text-on-surface">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" src={background3} alt={pkg.title} />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-4">
                {pkg.badge && <span className="bg-[#CD9933] text-white font-bold text-xs tracking-widest uppercase px-3 py-1 rounded">{pkg.badge}</span>}
                <div className="flex text-[#CD9933]">
                  {Array.from({ length: pkg.stars || 5 }).map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  ))}
                </div>
              </div>
              <h1 className="font-notoSerif text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white leading-tight tracking-tight">{pkg.title || 'Umrah Journey'}</h1>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <p className="text-white/70 font-medium mb-2">Starting from</p>
              <div className="font-notoSerif text-2xl md:text-3xl lg:text-4xl text-[#CD9933]">PKR {price.toLocaleString()} <span className="text-sm md:text-lg font-manrope text-white/70 font-normal">/ person</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 md:py-16 px-4 sm:px-6 md:px-8 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left Column: Details */}
          <div className="lg:col-span-8 space-y-12 md:space-y-16">
            {/* Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-surface-container-lowest p-4 md:p-6 lg:p-8 rounded-xl editorial-shadow">
                <span className="material-symbols-outlined text-[#CD9933] text-3xl mb-4 block">calendar_today</span>
                <h3 className="font-notoSerif text-lg mb-1">Duration</h3>
                <p className="text-on-surface-variant text-sm">{pkg.duration || pkg.days || 'Custom'}</p>
              </div>
              <div className="bg-surface-container-lowest p-4 md:p-6 lg:p-8 rounded-xl editorial-shadow">
                <span className="material-symbols-outlined text-[#CD9933] text-3xl mb-4 block">hotel</span>
                <h3 className="font-notoSerif text-lg mb-1">Accommodation</h3>
                <p className="text-on-surface-variant text-sm truncate">
                  {pkg.hotel_makkah && pkg.hotel_madinah ? (
                    `Makkah & Madinah Hotels`
                  ) : (
                    hotelName
                  )}
                </p>
              </div>
              <div className="bg-surface-container-lowest p-4 md:p-6 lg:p-8 rounded-xl editorial-shadow">
                <span className="material-symbols-outlined text-[#CD9933] text-3xl mb-4 block">flight</span>
                <h3 className="font-notoSerif text-lg mb-1">Flight</h3>
                <p className="text-on-surface-variant text-sm">{pkg.airline || 'Included'}</p>
              </div>
            </div>

            {/* Nights & Accommodations Section with Bigger View */}
            <div>
              <h2 className="font-notoSerif text-3xl mb-8 flex items-center gap-4">
                Nights & Accommodations
                <span className="h-px flex-grow bg-outline-variant/30"></span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Makkah Card */}
                <div className="relative overflow-hidden bg-[#013334] text-white p-8 rounded-2xl border border-[#CD9933]/20 shadow-xl group hover:border-[#CD9933]/50 transition-all duration-300">
                  <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-[#CD9933]/5 rounded-full blur-2xl group-hover:bg-[#CD9933]/10 transition-all duration-500"></div>
                  
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <span className="bg-[#CD9933] text-white text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded">Makkah Al-Mukarramah</span>
                        {(pkg.distance_makkah || distance) && (
                          <span className="text-white/60 text-xs font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm text-[#CD9933]">location_on</span> 
                            {pkg.distance_makkah || distance}
                          </span>
                        )}
                      </div>
                      
                      {/* Big Nights View */}
                      <div className="mb-6">
                        <span className="block font-notoSerif text-5xl md:text-6xl font-extrabold text-[#CD9933] tracking-tight">
                          {makkahNights} <span className="text-xl font-manrope font-light text-white/80">Nights</span>
                        </span>
                      </div>
                      
                      <h4 className="font-notoSerif text-2xl font-bold text-white mb-2">{pkg.hotel_makkah || hotelName}</h4>
                      <p className="text-white/70 text-xs leading-relaxed mb-6 font-light">
                        Experience deep spiritual devotion with clean, peaceful lodging located near the Holy Kaaba.
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10 text-white/80">
                      <span className="flex items-center gap-1.5 text-xs font-bold"><span className="material-symbols-outlined text-sm text-[#CD9933]">wifi</span> Free WiFi</span>
                      <span className="flex items-center gap-1.5 text-xs font-bold"><span className="material-symbols-outlined text-sm text-[#CD9933]">ac_unit</span> Central AC</span>
                      <span className="flex items-center gap-1.5 text-xs font-bold"><span className="material-symbols-outlined text-sm text-[#CD9933]">support_agent</span> Support</span>
                    </div>
                  </div>
                </div>

                {/* Madinah Card */}
                <div className="relative overflow-hidden bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 shadow-xl group hover:border-[#CD9933]/30 transition-all duration-300">
                  <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-[#CD9933]/5 rounded-full blur-2xl group-hover:bg-[#CD9933]/10 transition-all duration-500"></div>
                  
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <span className="bg-[#013334] text-white text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded">Madinah Al-Munawwarah</span>
                        {(pkg.distance_madinah || (pkg.hotel_madinah ? '350m from Nabawi' : '')) && (
                          <span className="text-on-surface-variant text-xs font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm text-[#CD9933]">location_on</span> 
                            {pkg.distance_madinah || '350m from Nabawi'}
                          </span>
                        )}
                      </div>
                      
                      {/* Big Nights View */}
                      <div className="mb-6">
                        <span className="block font-notoSerif text-5xl md:text-6xl font-extrabold text-[#CD9933] tracking-tight">
                          {madinahNights} <span className="text-xl font-manrope font-light text-on-surface-variant">Nights</span>
                        </span>
                      </div>
                      
                      <h4 className="font-notoSerif text-2xl font-bold text-primary mb-2">{pkg.hotel_madinah || 'Fursan Al Madinah'}</h4>
                      <p className="text-on-surface-variant text-xs leading-relaxed mb-6 font-light">
                        Perform your prayers at Masjid An-Nabawi in comfort with tranquil stays prepared for your journey.
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 pt-4 border-t border-outline-variant/20 text-on-surface-variant">
                      <span className="flex items-center gap-1.5 text-xs font-bold"><span className="material-symbols-outlined text-sm text-[#CD9933]">wifi</span> Free WiFi</span>
                      <span className="flex items-center gap-1.5 text-xs font-bold"><span className="material-symbols-outlined text-sm text-[#CD9933]">ac_unit</span> Central AC</span>
                      <span className="flex items-center gap-1.5 text-xs font-bold"><span className="material-symbols-outlined text-sm text-[#CD9933]">support_agent</span> Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
              <div>
                <h3 className="font-notoSerif text-xl mb-6">What's Included</h3>
                <ul className="space-y-4">
                  {(() => {
                    const presets = getCategoryPresets(pkg.category, pkg.title);
                    const includesList = presets ? presets.includes : (Array.isArray(pkg.includes) ? pkg.includes : String(pkg.includes || 'Visa Processing,Flights,Ground Transport,Guided Tours').split(',').map(s => s.trim()).filter(Boolean));
                    return includesList.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm">
                        <span className="material-symbols-outlined text-[#CD9933] text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        {item}
                      </li>
                    ));
                  })()}
                </ul>
              </div>
              <div>
                <h3 className="font-notoSerif text-xl mb-6">Not Included</h3>
                <ul className="space-y-4">
                  {(() => {
                    const presets = getCategoryPresets(pkg.category, pkg.title);
                    const notIncludesList = presets ? presets.not_includes : (pkg.not_includes && pkg.not_includes.length > 0 ? (Array.isArray(pkg.not_includes) ? pkg.not_includes : String(pkg.not_includes).split(',').map(s => s.trim()).filter(Boolean)) : []);
                    const defaultNotIncludes = [
                      'Personal shopping & extra meals',
                      'Travel and health insurance',
                      'Laundry and room service charges'
                    ];
                    const finalNotIncludes = notIncludesList.length > 0 ? notIncludesList : defaultNotIncludes;
                    return finalNotIncludes.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-error/40 text-lg">cancel</span>
                        {item}
                      </li>
                    ));
                  })()}
                </ul>
              </div>
            </div>

            {/* Itinerary Timeline - HIDDEN FOR NOW */}
            {/* 
            {pkg.itinerary && pkg.itinerary.length > 0 && (
              <div>
                <h2 className="font-notoSerif text-3xl mb-8">Journey Itinerary</h2>
                <div className="relative pl-6 md:pl-8 border-l-2 border-dashed border-[#CD9933]/30 ml-2 md:ml-4 space-y-8 md:space-y-10">
                  {pkg.itinerary.map((step, idx) => {
                    const isLast = idx === pkg.itinerary.length - 1
                    return (
                      <div key={idx} className="relative">
                        <div className={`absolute -left-[41px] top-0 w-4 h-4 rounded-full ring-4 ${isLast ? 'bg-[#CD9933] ring-[#CD9933]/20' : 'bg-[#7d5800] ring-[#7d5800]/20'}`}></div>
                        <p className="text-[#CD9933] font-bold text-xs uppercase mb-1">{step.day}</p>
                        <h4 className="font-notoSerif text-lg mb-2">{step.title}</h4>
                        <p className="text-on-surface-variant text-sm leading-relaxed">{step.description}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
            */}
          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 bg-surface-container-lowest p-4 md:p-6 lg:p-8 rounded-xl editorial-shadow border border-outline-variant/10">
              <div className="text-center mb-8">
                <h3 className="font-notoSerif text-2xl mb-2">Plan Your Journey</h3>
                <p className="text-on-surface-variant text-xs">Fill the form below, and our consultant will contact you within 24 hours.</p>
              </div>
              <form className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-1">Full Name</label>
                  <input className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 transition-colors py-2 text-sm" placeholder="Enter your name" type="text" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-1">Phone Number</label>
                  <input className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 transition-colors py-2 text-sm" placeholder="+92 XXXXX XXXXX" type="tel" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-1">City</label>
                    <input className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 transition-colors py-2 text-sm" placeholder="e.g. Lahore" type="text" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-1">Travelers</label>
                    <select className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 transition-colors py-2 text-sm appearance-none">
                      <option>01 Person</option>
                      <option>02 Persons</option>
                      <option>04+ Persons</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-1">Estimated Date</label>
                  <input className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 transition-colors py-2 text-sm" type="date" />
                </div>
                <button className="w-full bg-gradient-to-r from-[#7d5800] to-[#CD9933] text-white py-4 rounded-md font-bold text-sm tracking-widest uppercase shadow-lg shadow-[#7d5800]/20 hover:scale-[1.02] transition-transform" type="submit">Send Inquiry</button>
              </form>
              <div className="mt-8 pt-8 border-t border-outline-variant/20 text-center">
                <p className="text-xs text-on-surface-variant mb-4">Or connect instantly via</p>
                <a className="inline-flex items-center gap-2 text-[#013334] font-bold hover:text-[#CD9933] transition-colors" href="#">
                  <span className="material-symbols-outlined">chat</span>
                  WhatsApp Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Packages */}
      <section className="py-12 md:py-16 bg-surface-container-low px-4 sm:px-6 md:px-8">
        <div className="max-w-screen-2xl mx-auto">
          <h2 className="font-notoSerif text-3xl mb-8">More Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {staticPackages.filter(p => p.id !== parseInt(id)).slice(0, 3).map(p => (
              <Link to={`/package/${p.id}`} key={p.id} className="bg-surface-container-lowest editorial-shadow overflow-hidden group cursor-pointer transition-transform hover:-translate-y-1 block">
                <div className="relative h-48 overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={getProxyUrl(p.image)} alt={p.title} />
                  <div className="absolute top-4 left-4 bg-[#CD9933] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded">{p.badge}</div>
                </div>
                <div className="p-6">
                  <h3 className="font-notoSerif text-lg font-bold text-primary mb-1">{p.title}</h3>
                  <p className="text-on-surface-variant text-sm mb-3">{p.days}</p>
                  <span className="text-xl font-extrabold text-[#CD9933]">PKR {p.price.toLocaleString()}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default PackageDetail
