import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import logo from '../assets/Rehman Travel Logo.png'

const API_BASE = import.meta.env.VITE_API_URL || ''

// High-fidelity fallback package data matching screen_user.png layout in Royal color scheme
const staticInternationalTours = [
  {
    id: 101,
    title: 'DUBAI TOUR - NEW YEAR CELEBRATION 2025',
    price: 145000,
    duration: '5 Days 4 Nights',
    badge: 'FOR 2 PERSONS - $1500',
    description: 'Ring in the New Year with stunning fireworks at Burj Khalifa, desert safaris, and premium city cruises in luxury.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80'
  },
  {
    id: 102,
    title: 'TURKEY ELEGANCE - CAPPADOCIA & ISTANBUL',
    price: 210000,
    duration: '7 Days 6 Nights',
    badge: 'FOR 1 PERSON - $1100',
    description: 'Witness hot air balloons over fairy chimneys, explore Hagia Sophia, and cruise the majestic Bosphorus Strait.',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80'
  },
  {
    id: 103,
    title: 'EXPLORE MALAYSIA - KUALA LUMPUR & LANGKAWI',
    price: 135000,
    duration: '6 Days 5 Nights',
    badge: 'FOR 2 PERSONS - $1300',
    description: 'Ascend the Petronas Twin Towers, relax on sandy beaches in Langkawi, and experience rich cultural heritage.',
    image: 'https://images.unsplash.com/photo-1596422748573-cbb5bf090104?w=800&q=80'
  }
]

const staticLocalTours = [
  {
    id: 201,
    title: 'SWAT VALLEY SPIRIT - THE EAST SWITZERLAND',
    price: 45000,
    duration: '3 Days 2 Nights',
    badge: 'FOR 1 PERSON - $250',
    description: 'Unwind alongside pristine streams, visit historical Buddhist sites, and enjoy the snow-capped views of Malam Jabba.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80'
  },
  {
    id: 202,
    title: 'NARAN & KAGHAN VALLEY SUMMER ESCAPE',
    price: 55000,
    duration: '4 Days 3 Nights',
    badge: 'FOR 2 PERSONS - $400',
    description: 'Journey to the breathtaking Lake Saif-ul-Muluk, cross Babusar Top, and rest by the sparkling Kunhar River.',
    image: 'https://images.unsplash.com/photo-1502602892935-72c3ac7c352?w=800&q=80'
  },
  {
    id: 203,
    title: 'NEELUM VALLEY KASHMIR HEAVENLY SERENITY',
    price: 50000,
    duration: '4 Days 3 Nights',
    badge: 'FOR 1 PERSON - $300',
    description: 'Explore lush green meadows, crystalline blue lakes, and historical forts in the heart of Azad Jammu & Kashmir.',
    image: 'https://images.unsplash.com/photo-1473163928189-394b13469e19?w=800&q=80'
  }
]

const GoldLogoIcon = () => (
  <svg className="w-12 h-12 text-[#CD9933]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" stroke="#CD9933" strokeWidth="1.5" />
    <circle cx="50" cy="50" r="41" stroke="#CD9933" strokeWidth="0.5" strokeDasharray="3 3" />
    {/* Crescent Moon */}
    <path d="M50 14C59.9412 14 68 22.0588 68 32C68 40.5 61.5 47.5 53 49.5C60.5 48.5 65 42 65 35C65 26.7157 58.2843 20 50 20C46.5 20 43 21 40.5 22.5C43.5 17 46.5 14 50 14Z" fill="#CD9933" />
    {/* Mosque Minarets and Dome */}
    <path d="M35 68H65V48L50 36L35 48V68Z" fill="#CD9933" fillOpacity="0.2" stroke="#CD9933" strokeWidth="1.5" />
    <path d="M42 68V54H58V68" stroke="#CD9933" strokeWidth="1.5" />
    {/* Minarets */}
    <path d="M31 68V42M69 68V42" stroke="#CD9933" strokeWidth="2" strokeLinecap="round" />
    <path d="M29 42H33M67 42H71" stroke="#CD9933" strokeWidth="1.5" />
    {/* Domes on Minarets */}
    <path d="M31 42C31 38 32 36 32 36C32 36 30 38 30 42H31ZM69 42C69 38 70 36 70 36C70 36 68 38 68 42H69Z" fill="#CD9933" />
  </svg>
)

const Home3 = () => {
  const [packages, setPackages] = useState([])
  const [internationalTours, setInternationalTours] = useState(staticInternationalTours)
  const [localTours, setLocalTours] = useState(staticLocalTours)
  
  // Form State
  const [contactName, setContactName] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactMsg, setContactMsg] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)

    // Fetch packages from backend and categorize
    axios.get(`${API_BASE}/api/packages`)
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setPackages(res.data)
          // Filter international
          const fetchedInt = res.data.filter(p => p.category?.toLowerCase() === 'international')
          if (fetchedInt.length > 0) {
            setInternationalTours(fetchedInt.slice(0, 3))
          }
          // Filter domestic/local
          const fetchedLocal = res.data.filter(p => p.category?.toLowerCase() === 'domestic' || p.category?.toLowerCase() === 'local' || p.category?.toLowerCase() === 'umrah')
          if (fetchedLocal.length > 0) {
            setLocalTours(fetchedLocal.slice(0, 3))
          }
        }
      })
      .catch(err => {
        console.error('API Packages fetch error (using high-fidelity fallbacks):', err)
      })
  }, [])

  const handleContactSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setContactName('')
      setContactPhone('')
      setContactEmail('')
      setContactMsg('')
    }, 4000)
  }

  return (
    <div className="bg-white font-manrope antialiased text-gray-700 min-h-screen">
      
      {/* 1. Hero Section matching screenshot layout precisely */}
      <section className="relative min-h-[960px] flex flex-col justify-between overflow-hidden bg-[#001c1d]">
        {/* Background Image: Holy Kaaba at Makkah Sunset */}
        <div className="absolute inset-0 z-0">
          <img 
            alt="Scenic view of the Holy Kaaba sunset background" 
            className="w-full h-full object-cover object-right md:object-center" 
            src="https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1600&q=80" 
          />
          {/* Sophisticated dark teal horizontal gradient matching screenshot side-split */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#001c1d] via-[#001c1d]/95 via-45% md:via-55% to-transparent"></div>
        </div>

        {/* Custom Header Overlay inside Hero Section */}
        <header className="relative z-20 w-full px-6 md:px-12 py-6 flex justify-between items-center bg-transparent">
          {/* Logo Brand matching screenshot: Gold crescent mosque badge and elegant serif wordmark */}
          <Link to="/" className="flex items-center gap-3 select-none">
            <GoldLogoIcon />
            <div className="text-left leading-none">
              <span className="text-white text-xl font-bold tracking-[0.25em] font-headline block">
                ROYAL UMRAH
              </span>
              <span className="text-[#CD9933] text-[9px] font-bold tracking-[0.38em] uppercase mt-1 pl-[2px] block">
                — AND TRAVELS —
              </span>
            </div>
          </Link>

          {/* Navigation Links (Home3 Premium Overlay style) */}
          <div className="hidden lg:flex items-center gap-8 text-[11px] font-extrabold tracking-[0.25em] text-white">
            <Link to="/" className="hover:text-[#CD9933] transition-colors uppercase">HOME</Link>
            <Link to="/flights" className="hover:text-[#CD9933] transition-colors uppercase">AIRLINE TICKETING</Link>
            <Link to="/visa-services" className="hover:text-[#CD9933] transition-colors uppercase">VISA INQUIRY</Link>
            <Link to="/about" className="hover:text-[#CD9933] transition-colors uppercase">PARTNERS</Link>
            <Link to="/contact" className="hover:text-[#CD9933] transition-colors uppercase text-[#CD9933] border-b border-[#CD9933] pb-1">CONTACT</Link>
          </div>

          {/* Top Right 24/7 Support Badge Pill */}
          <div className="bg-black/35 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full flex items-center gap-3 shadow-lg select-none">
            <div className="w-8 h-8 rounded-full bg-[#CD9933]/25 flex items-center justify-center text-[#CD9933]">
              <span className="material-symbols-outlined text-base">phone_in_talk</span>
            </div>
            <div className="text-left leading-tight">
              <p className="text-white text-[11px] font-black tracking-wide font-manrope">24/7 Support</p>
              <p className="text-white/60 text-[9px]">We're Here to Help</p>
            </div>
          </div>
        </header>

        {/* Hero Main Content (Split left layout) */}
        <div className="relative z-10 container mx-auto px-6 md:px-12 pt-28 pb-12 flex-1 flex flex-col justify-center items-start text-left">
          {/* Label matching screenshot */}
          <div className="flex items-center gap-3 text-[#CD9933] font-bold text-xs uppercase tracking-[0.4em] mb-5">
            <span>BEGIN YOUR</span>
            <div className="h-[1px] w-20 bg-[#CD9933]/70"></div>
          </div>

          {/* Headline matching screenshot */}
          <h1 className="font-notoSerif text-5xl md:text-7xl font-bold text-white mb-6 leading-tight max-w-2xl drop-shadow-md">
            Sacred Journey <br />
            <span className="text-[#CD9933]">With Comfort & Trust</span>
          </h1>

          {/* Description copy */}
          <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-xl mb-10 font-light font-manrope">
            We provide complete Umrah and international travel services with trusted guidance, premium comfort, and seamless support so you can focus fully on your worship and spiritual journey.
          </p>

          {/* Elegant Custom Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-20">
            <Link 
              to="/packages" 
              className="bg-[#CD9933] hover:bg-white hover:text-[#001c1d] text-white font-bold text-xs uppercase tracking-widest py-4 px-8 rounded-lg flex items-center gap-2.5 shadow-xl transition-all"
            >
              <span className="material-symbols-outlined text-base">calendar_month</span>
              <span>Explore Packages</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
            <Link 
              to="/contact" 
              className="border border-[#CD9933]/70 hover:border-[#CD9933] text-white hover:bg-white/5 font-bold text-xs uppercase tracking-widest py-4 px-8 rounded-lg flex items-center gap-2.5 transition-all"
            >
              <span className="material-symbols-outlined text-base">call</span>
              <span>Contact Us</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Floating Bottom Card Strip Overlay & Crescent Banner */}
        <div className="relative z-10 w-full px-6 md:px-12 pb-10 mt-auto">
          {/* Transparent Floating Features Strip Container */}
          <div className="bg-black/35 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mx-auto shadow-2xl">
            
            {/* Card 1: Happy Pilgrims */}
            <div className="flex gap-4 items-start text-left">
              <div className="w-12 h-12 rounded-full bg-[#CD9933]/15 border border-[#CD9933]/30 flex items-center justify-center text-[#CD9933] shrink-0">
                <span className="material-symbols-outlined text-xl">groups</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-white text-base font-bold tracking-wide">
                  1000+ <span className="font-light text-white/90">Happy Pilgrims</span>
                </h3>
                <p className="text-white/60 text-xs leading-relaxed font-light font-manrope">
                  Trusted by thousands of pilgrims worldwide.
                </p>
              </div>
            </div>

            {/* Card 2: IATA Certified */}
            <div className="flex gap-4 items-start text-left">
              <div className="w-12 h-12 rounded-full bg-[#CD9933]/15 border border-[#CD9933]/30 flex items-center justify-center text-[#CD9933] shrink-0">
                <span className="material-symbols-outlined text-xl">verified_user</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-white text-base font-bold tracking-wide">
                  IATA <span className="font-light text-white/90">Certified</span>
                </h3>
                <p className="text-white/60 text-xs leading-relaxed font-light font-manrope">
                  Fully licensed and industry approved.
                </p>
              </div>
            </div>

            {/* Card 3: Visa Assistance */}
            <div className="flex gap-4 items-start text-left">
              <div className="w-12 h-12 rounded-full bg-[#CD9933]/15 border border-[#CD9933]/30 flex items-center justify-center text-[#CD9933] shrink-0">
                <span className="material-symbols-outlined text-xl">assignment</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-white text-base font-bold tracking-wide">
                  Visa Assistance <span className="font-light text-white/90">Included</span>
                </h3>
                <p className="text-white/60 text-xs leading-relaxed font-light font-manrope">
                  Hassle-free visa processing support.
                </p>
              </div>
            </div>

            {/* Card 4: 24/7 Support */}
            <div className="flex gap-4 items-start text-left">
              <div className="w-12 h-12 rounded-full bg-[#CD9933]/15 border border-[#CD9933]/30 flex items-center justify-center text-[#CD9933] shrink-0">
                <span className="material-symbols-outlined text-xl">support_agent</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-white text-base font-bold tracking-wide">
                  24/7 Support <span className="font-light text-white/90">Always Available</span>
                </h3>
                <p className="text-white/60 text-xs leading-relaxed font-light font-manrope">
                  Dedicated support whenever you need us.
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Gold Crescent Star Signature Banner */}
          <div className="flex items-center justify-center gap-2 text-[#CD9933] font-bold text-xs tracking-[0.4em] uppercase mt-8 select-none">
            <span className="material-symbols-outlined text-base">star_rate</span>
            <span>YOUR JOURNEY. OUR RESPONSIBILITY.</span>
          </div>
        </div>
      </section>

      {/* 2. Partner Logo Strip */}
      <div className="bg-[#111111] py-8 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-70">
          <span className="text-white font-extrabold tracking-widest text-sm uppercase">TURKISH AIRLINES</span>
          <span className="text-white font-extrabold tracking-widest text-sm uppercase">EMIRATES</span>
          <span className="text-white font-extrabold tracking-widest text-sm uppercase">ETIHAD</span>
          <span className="text-white font-extrabold tracking-widest text-sm uppercase">THAI</span>
          <span className="text-white font-extrabold tracking-widest text-sm uppercase">OMAN AIR</span>
          <span className="text-white font-extrabold tracking-widest text-sm uppercase">AIR ASIA</span>
        </div>
      </div>

      {/* 3. About Us Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column Text Details */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-[#CD9933] font-bold text-xs uppercase tracking-widest">WHO WE ARE</span>
              <div className="h-[1px] w-12 bg-[#CD9933]"></div>
            </div>
            <h2 className="text-[#013334] text-3xl md:text-4xl font-bold tracking-wide uppercase font-headline">
              BEST TRAVEL AGENCY IN RAWALPINDI & LAHORE
            </h2>
            <p className="text-gray-500 leading-relaxed text-sm">
              At Royal Umrah & Travels, we treat every travel plan as a customized masterclass of spiritual fulfillment, logistics comfort, and exploration freedom. Over the years, we have built key flight alignments and hotel partnerships worldwide to deliver high-fidelity journeys that stay with you forever.
            </p>
            
            {/* Elegant 8-Item Double-Column List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3.5 text-xs text-gray-600 font-bold uppercase tracking-wider">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#CD9933]"></span>
                <span>Economy Class Flights</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#CD9933]"></span>
                <span>3-Star Accommodations</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#CD9933]"></span>
                <span>Business Class Flights</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#CD9933]"></span>
                <span>4-Star Accommodations</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#CD9933]"></span>
                <span>First Class Flight Booking</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#CD9933]"></span>
                <span>5-Star Accommodations</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#CD9933]"></span>
                <span>Local Tour Packages</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#CD9933]"></span>
                <span>International Tour Packages</span>
              </div>
            </div>
            
            <Link 
              to="/about" 
              className="inline-block bg-[#013334] hover:bg-[#CD9933] text-white px-8 py-3.5 text-xs font-bold tracking-widest uppercase transition-colors"
            >
              READ MORE
            </Link>
          </div>

          {/* Right Column Graphic Collage */}
          <div className="relative group">
            <div className="absolute inset-0 bg-[#CD9933] translate-x-3 translate-y-3 -z-10 group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-300"></div>
            <img 
              alt="Luxury traveler collage illustration mockup landscape" 
              className="w-full h-auto object-cover shadow-xl border border-gray-100" 
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80" 
            />
          </div>
        </div>
      </section>

      {/* 4. International Tours Grid */}
      <section className="py-24 px-6 bg-[#f5f7fa]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-3">
            <div className="flex items-center justify-center gap-2 text-[#CD9933]">
              <span className="material-symbols-outlined text-sm">rocket_launch</span>
              <span className="font-bold text-xs uppercase tracking-widest">PACKAGES AND GO</span>
            </div>
            <h2 className="text-[#013334] text-3xl md:text-4xl font-bold tracking-wide uppercase font-headline">
              INTERNATIONAL TOURS
            </h2>
            <div className="h-[2px] w-16 bg-[#CD9933] mx-auto mt-4"></div>
          </div>

          {/* 3-Column Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {internationalTours.map((pkg, idx) => {
              const isStatic = !pkg.hasOwnProperty('image_url')
              const img = isStatic ? pkg.image : (pkg.image_url || staticInternationalTours[idx % 3].image)
              const badge = isStatic ? pkg.badge : (pkg.category || 'FOR 2 PERSONS')
              const duration = isStatic ? pkg.duration : (pkg.duration || '5 Days 4 Nights')
              const price = pkg.price

              return (
                <div key={pkg.id || idx} className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col">
                  {/* Top Image with Gold overlay Badge */}
                  <div className="relative h-64 overflow-hidden shrink-0">
                    <img 
                      alt={pkg.title} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                      src={img} 
                    />
                    <div className="absolute top-4 left-4 bg-[#CD9933] text-white px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider">
                      {badge}
                    </div>
                  </div>

                  {/* Card Content details */}
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      <h3 className="text-[#013334] font-bold text-lg tracking-wide uppercase font-headline line-clamp-2">
                        {pkg.title}
                      </h3>
                      <p className="text-[#CD9933] font-bold text-sm uppercase tracking-wider">
                        PKR {price.toLocaleString()} | {duration}
                      </p>
                      <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">
                        {pkg.description || 'Experience highly curated schedules, flight alignments, and premier accommodations organized with travel security and luxury.'}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100">
                      <Link 
                        to={`/package/${pkg.id || idx + 1}`} 
                        className="flex-1 bg-gray-900 hover:bg-[#CD9933] text-white text-center py-3 text-[10px] font-bold uppercase tracking-wider transition-colors"
                      >
                        READ MORE
                      </Link>
                      <a 
                        href="https://wa.me/923001234567" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex-1 bg-[#013334] hover:bg-[#CD9933] text-white text-center py-3 text-[10px] font-bold uppercase tracking-wider transition-colors"
                      >
                        BOOK NOW
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Centered Outline Button */}
          <div className="text-center mt-16">
            <Link 
              to="/packages" 
              className="inline-block border-2 border-gray-300 hover:border-[#CD9933] text-gray-700 hover:text-[#CD9933] px-10 py-3.5 text-xs font-bold tracking-widest uppercase transition-colors"
            >
              MORE TOURS
            </Link>
          </div>
        </div>
      </section>

      {/* 5. "Go Explore" CTA Banner */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            alt="Massive panoramic dark mountains wilderness" 
            className="w-full h-full object-cover" 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80" 
          />
          <div className="absolute inset-0 bg-[#013334]/85"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center text-white space-y-6">
          <span className="text-[#f6bd54] font-bold text-xs uppercase tracking-[0.3em] block">IT'S A BIG WORLD OUT THERE</span>
          <h2 className="text-white text-5xl md:text-7xl font-bold tracking-widest uppercase font-headline">
            GO EXPLORE
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-sm leading-relaxed font-light">
            We plan the logistics, align standard flights, secure accommodations, and details down to every tourist guide so that you can simply enjoy, relax, and discover.
          </p>
          <div className="pt-4">
            <Link 
              to="/packages" 
              className="inline-block bg-[#CD9933] hover:bg-white hover:text-[#013334] text-white px-10 py-4 text-xs font-bold tracking-widest uppercase transition-all shadow-lg"
            >
              READ MORE
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Local Tours Grid */}
      <section className="py-24 px-6 bg-[#f5f7fa]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-3">
            <div className="flex items-center justify-center gap-2 text-[#CD9933]">
              <span className="material-symbols-outlined text-sm">terrain</span>
              <span className="font-bold text-xs uppercase tracking-widest">PACKAGES AND GO</span>
            </div>
            <h2 className="text-[#013334] text-3xl md:text-4xl font-bold tracking-wide uppercase font-headline">
              LOCAL TOURS
            </h2>
            <div className="h-[2px] w-16 bg-[#CD9933] mx-auto mt-4"></div>
          </div>

          {/* 3-Column Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {localTours.map((pkg, idx) => {
              const isStatic = !pkg.hasOwnProperty('image_url')
              const img = isStatic ? pkg.image : (pkg.image_url || staticLocalTours[idx % 3].image)
              const badge = isStatic ? pkg.badge : (pkg.category || 'FOR 1 PERSON')
              const duration = isStatic ? pkg.duration : (pkg.duration || '3 Days 2 Nights')
              const price = pkg.price

              return (
                <div key={pkg.id || idx} className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col">
                  {/* Top Image with Gold Badge */}
                  <div className="relative h-64 overflow-hidden shrink-0">
                    <img 
                      alt={pkg.title} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                      src={img} 
                    />
                    <div className="absolute top-4 left-4 bg-[#CD9933] text-white px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider">
                      {badge}
                    </div>
                  </div>

                  {/* Card Content details */}
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      <h3 className="text-[#013334] font-bold text-lg tracking-wide uppercase font-headline line-clamp-2">
                        {pkg.title}
                      </h3>
                      <p className="text-[#CD9933] font-bold text-sm uppercase tracking-wider">
                        PKR {price.toLocaleString()} | {duration}
                      </p>
                      <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">
                        {pkg.description || 'Explore the magnificent mountain views, fresh stream walks, and celestial landscapes of Northern Pakistan.'}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100">
                      <Link 
                        to={`/package/${pkg.id || idx + 1}`} 
                        className="flex-1 bg-gray-900 hover:bg-[#CD9933] text-white text-center py-3 text-[10px] font-bold uppercase tracking-wider transition-colors"
                      >
                        READ MORE
                      </Link>
                      <a 
                        href="https://wa.me/923001234567" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex-1 bg-[#013334] hover:bg-[#CD9933] text-white text-center py-3 text-[10px] font-bold uppercase tracking-wider transition-colors"
                      >
                        BOOK NOW
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Centered Outline Button */}
          <div className="text-center mt-16">
            <Link 
              to="/packages" 
              className="inline-block border-2 border-gray-300 hover:border-[#CD9933] text-gray-700 hover:text-[#CD9933] px-10 py-3.5 text-xs font-bold tracking-widest uppercase transition-colors"
            >
              MORE TOURS
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Happy Travelers (Testimonials) */}
      <section className="relative py-24 px-6 overflow-hidden bg-[#013334]">
        {/* Shadow Overlay */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <img 
            alt="Mountains silhouette travel landscape" 
            className="w-full h-full object-cover" 
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80" 
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center text-white mb-16 space-y-3">
            <span className="material-symbols-outlined text-[#f6bd54] text-3xl">sentiment_satisfied</span>
            <p className="text-[#f6bd54] font-bold text-xs uppercase tracking-widest">RELAX AND ENJOY</p>
            <h2 className="text-white text-3xl md:text-4xl font-bold tracking-wide uppercase font-headline">
              HAPPY TRAVELERS
            </h2>
            <div className="h-[2px] w-12 bg-[#CD9933] mx-auto mt-3"></div>
          </div>

          {/* Testimonial Cards Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Card 1 */}
            <div className="bg-white p-10 shadow-lg text-center relative border border-gray-100 flex flex-col items-center">
              <span className="material-symbols-outlined text-gray-200 text-5xl absolute top-6 right-6">format_quote</span>
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#f5f7fa] mb-6">
                <img 
                  alt="Tehmina Hassan portrait" 
                  className="w-full h-full object-cover" 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80" 
                />
              </div>
              <h5 className="text-[#013334] font-bold text-sm uppercase tracking-wider font-headline">Tehmina Hassan</h5>
              <p className="text-[#CD9933] text-[9px] font-bold tracking-widest uppercase mb-4">Rawalpindi, Pakistan</p>
              <p className="text-gray-500 italic text-xs leading-relaxed max-w-sm">
                "Our Turkey package was outstanding. Flight scheduling, domestic connections in Cappadocia, hotel stays, and local historical guides were perfectly taken care of. I didn't have to worry about a single detail."
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-10 shadow-lg text-center relative border border-gray-100 flex flex-col items-center">
              <span className="material-symbols-outlined text-gray-200 text-5xl absolute top-6 right-6">format_quote</span>
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#f5f7fa] mb-6">
                <img 
                  alt="Zubair Malik portrait" 
                  className="w-full h-full object-cover" 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80" 
                />
              </div>
              <h5 className="text-[#013334] font-bold text-sm uppercase tracking-wider font-headline">Zubair Malik</h5>
              <p className="text-[#CD9933] text-[9px] font-bold tracking-widest uppercase mb-4">Islamabad, Pakistan</p>
              <p className="text-gray-500 italic text-xs leading-relaxed max-w-sm">
                "Booking airline tickets and private domestic tours in Swat and Naran Valley was incredibly fast and smooth. Royal Travels operates with absolute elite professionalism. Will definitely travel with them again."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Contact Us Section */}
      <section className="relative bg-[#f5f7fa] overflow-hidden">
        {/* Snowy Mountain Backdrop */}
        <div className="absolute inset-0 z-0">
          <img 
            alt="Alpine snowcapped mountains panorama peak" 
            className="w-full h-full object-cover opacity-15" 
            src="https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?w=1600&q=80" 
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-[600px]">
          {/* Left Column: Happy traveler photo cutout */}
          <div className="relative hidden lg:block overflow-hidden min-h-[500px]">
            <img 
              alt="Happy smiling traveler holding camera passport boarding pass layout cutout" 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[95%] w-auto object-contain" 
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80" 
            />
          </div>

          {/* Right Column: Dark Teal Contact Box */}
          <div className="bg-[#013334] text-white p-12 md:p-16 flex flex-col justify-center space-y-8 shadow-2xl">
            <div>
              <h2 className="text-white text-3xl font-bold tracking-widest uppercase font-headline">
                CONTACT US
              </h2>
              <p className="text-[#f6bd54] text-xs font-bold uppercase tracking-wider mt-2 font-manrope">
                Just fill out the form and let's make your travel plan in minutes!
              </p>
            </div>

            {submitted ? (
              <div className="bg-white/5 border border-white/10 p-8 text-center space-y-4">
                <span className="material-symbols-outlined text-[#CD9933] text-5xl">mark_email_read</span>
                <h4 className="text-white text-lg font-bold uppercase tracking-wider">Plan Request Submitted!</h4>
                <p className="text-white/60 text-xs">
                  Your customized details are sent to a Royal Travels coordinator. We will reach back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <input 
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#CD9933] py-3 text-sm text-white placeholder-white/40 outline-none transition-colors" 
                    placeholder="Your Name" 
                    type="text" 
                  />
                </div>
                <div>
                  <input 
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#CD9933] py-3 text-sm text-white placeholder-white/40 outline-none transition-colors" 
                    placeholder="Your Contact Number" 
                    type="tel" 
                  />
                </div>
                <div>
                  <input 
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#CD9933] py-3 text-sm text-white placeholder-white/40 outline-none transition-colors" 
                    placeholder="Your Email Address" 
                    type="email" 
                  />
                </div>
                <div>
                  <textarea 
                    required
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#CD9933] py-3 text-sm text-white placeholder-white/40 outline-none transition-colors resize-none h-24" 
                    placeholder="Your Message" 
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-[#CD9933] hover:bg-white hover:text-[#013334] text-primary font-bold text-xs uppercase tracking-widest py-4 px-8 transition-colors flex items-center justify-center gap-2 select-none"
                >
                  <span>SEND MESSAGE</span>
                  <span className="material-symbols-outlined text-sm">send</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 9. Corporate Charcoal Footer */}
      <footer className="bg-[#111111] text-white/50 py-16 px-6 border-t border-white/5 text-xs">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Centered Logo at the top */}
          <div className="flex flex-col items-center text-center select-none">
            <span className="text-white text-3xl font-bold tracking-widest uppercase font-headline">
              ROYAL
              <span className="text-[#CD9933]">/</span>
            </span>
            <span className="text-white/60 text-[9px] font-bold tracking-[0.38em] uppercase -mt-1 pl-[2px] font-manrope">
              UMRAH & TRAVELS
            </span>
          </div>

          <hr className="border-white/5" />

          {/* 5 Clean Columns Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 text-left font-manrope">
            {/* Col 1 */}
            <div className="space-y-4">
              <h5 className="text-white font-bold tracking-widest uppercase">Contact Us</h5>
              <div className="space-y-2.5 leading-relaxed">
                <p>Main Boulevard, Gulberg III, Lahore, Pakistan</p>
                <p>Tel: +92 300 1234567</p>
                <p>Email: info@royalumrahandtravel.com</p>
              </div>
            </div>

            {/* Col 2 */}
            <div className="space-y-4">
              <h5 className="text-white font-bold tracking-widest uppercase">Book Now</h5>
              <ul className="space-y-2.5">
                <li><Link to="/flights" className="hover:text-[#CD9933] transition-colors">Airline Tickets</Link></li>
                <li><Link to="/packages" className="hover:text-[#CD9933] transition-colors">Domestic Tours</Link></li>
                <li><Link to="/packages" className="hover:text-[#CD9933] transition-colors">International Tours</Link></li>
                <li><Link to="/packages" className="hover:text-[#CD9933] transition-colors">Umrah Services</Link></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="space-y-4">
              <h5 className="text-white font-bold tracking-widest uppercase">Explore</h5>
              <ul className="space-y-2.5">
                <li><Link to="/visa-services" className="hover:text-[#CD9933] transition-colors">Visa Services</Link></li>
                <li><Link to="/about" className="hover:text-[#CD9933] transition-colors">Group Tours</Link></li>
                <li><Link to="/blog" className="hover:text-[#CD9933] transition-colors">Travel Blog</Link></li>
                <li><Link to="/contact" className="hover:text-[#CD9933] transition-colors">Careers</Link></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div className="space-y-4">
              <h5 className="text-white font-bold tracking-widest uppercase">Top Deals</h5>
              <ul className="space-y-2.5">
                <li><Link to="/packages" className="hover:text-[#CD9933] transition-colors">Dubai New Year Special</Link></li>
                <li><Link to="/packages" className="hover:text-[#CD9933] transition-colors">Kashmir Autumn Retreat</Link></li>
                <li><Link to="/packages" className="hover:text-[#CD9933] transition-colors">Turkey Spring Deal</Link></li>
                <li><Link to="/packages" className="hover:text-[#CD9933] transition-colors">Custom Group Quotes</Link></li>
              </ul>
            </div>

            {/* Col 5 */}
            <div className="space-y-4">
              <h5 className="text-white font-bold tracking-widest uppercase">Newsletter</h5>
              <p className="leading-relaxed">Subscribe to get alerts on flash flight bookings and destination price cuts.</p>
              <div className="flex gap-2">
                <input 
                  className="bg-white/5 border border-white/10 text-white text-xs px-3.5 py-2.5 focus:border-[#CD9933] outline-none flex-1" 
                  placeholder="Your Email Address" 
                  type="email" 
                />
                <button className="bg-[#CD9933] hover:bg-white hover:text-[#013334] text-primary px-4 py-2.5 transition-colors font-bold">
                  GO
                </button>
              </div>
            </div>
          </div>

          <hr className="border-white/5" />

          {/* Bottom copyright row */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] tracking-wider uppercase font-medium">
            <p>© 2026 ROYAL UMRAH & TRAVELS. ALL RIGHTS RESERVED.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default Home3
