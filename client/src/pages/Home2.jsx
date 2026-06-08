import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import logo from '../assets/Rehman Travel Logo.png'
import background1 from '../assets/background1.webp'
import aboutImage from '../assets/about-us.png'
import BannerContactForm from '../components/BannerContactForm'
import travelCollage from '../assets/hajj_umrah_travel_collage.png'
import sabaKhanImg from '../assets/testimonials/saba_khan.png'
import ahmedRazaImg from '../assets/testimonials/ahmed_raza.png'
import zubairMalikImg from '../assets/testimonials/zubair_malik.png'
import tehminaHassanImg from '../assets/testimonials/tehmina_hassan.png'
import mohammadAliImg from '../assets/testimonials/mohammad_ali.png'
import ayeshaSiddiquiImg from '../assets/testimonials/ayesha_siddiqui.png'

const staticTestimonials = [
  {
    name: 'Saba Khan',
    city: 'Lahore, Pakistan',
    text: 'I booked the Turkey tour for my family. The guide was incredibly knowledgeable and the itinerary wasn\'t rushed. A truly premium experience from start to finish.',
    image: sabaKhanImg
  },
  {
    name: 'Ahmed Raza',
    city: 'Karachi, Pakistan',
    text: 'Our Umrah journey with Royal Travels was flawless. From the visa process to the hotels being so close to the Haram, everything was perfectly managed. May Allah reward them.',
    image: ahmedRazaImg
  },
  {
    name: 'Zubair Malik',
    city: 'Lahore, Pakistan',
    text: 'Booking airline tickets and private domestic tours in Swat and Naran Valley was incredibly fast and smooth. Royal Travels operates with absolute elite professionalism. Will definitely travel with them again.',
    image: zubairMalikImg
  },
  {
    name: 'Tehmina Hassan',
    city: 'Rawalpindi, Pakistan',
    text: 'Our Turkey package was outstanding. Flight scheduling, domestic connections in Cappadocia, hotel stays, and local historical guides were perfectly taken care of. I didn\'t have to worry about a single detail.',
    image: tehminaHassanImg
  },
  {
    name: 'Dr. Mohammad Ali',
    city: 'Islamabad, Pakistan',
    text: 'The ground staff in Makkah were like family. They helped us with our elderly parents during Tawaaf. I highly recommend Royal Travels for their compassion.',
    image: mohammadAliImg
  },
  {
    name: 'Ayesha Siddiqui',
    city: 'Lahore, Pakistan',
    text: 'Alhamdulillah, performed Umrah using their premium package. Extremely smooth transport from Jeddah to Makkah and Madinah. Vetted hotels with delicious breakfast included!',
    image: ayeshaSiddiquiImg
  }
]

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
  },
  {
    id: 104,
    title: 'THAILAND SPLENDOR - BANGKOK & PHUKET',
    price: 155000,
    duration: '6 Days 5 Nights',
    badge: 'FOR 2 PERSONS - $1400',
    description: 'Explore vibrant street life and ornate shrines in Bangkok, then relax on the sandy beaches of Phuket.',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80'
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

const Home2 = () => {
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

      {/* 1. Header & Navigation (Transparent Overlay Style - Teal & Gold Theme) */}
      <header className="absolute top-0 left-0 right-0 z-50 w-full">
        {/* Top Teal Info Bar */}
        <div className="bg-[#013334] text-white/80 py-2.5 px-6 md:px-12 flex justify-between items-center text-xs font-semibold tracking-wide">
          <div className="flex items-center gap-6">
            <a href="tel:+923001234567" className="flex items-center gap-2 hover:text-[#CD9933] transition-colors">
              <span className="material-symbols-outlined text-[14px]">phone_in_talk</span>
              <span>+92 300 1234567</span>
            </a>
            <a href="mailto:info@royalumrahandtravel.com" className="flex items-center gap-2 hover:text-[#CD9933] transition-colors">
              <span className="material-symbols-outlined text-[14px]">mail</span>
              <span>info@royalumrahandtravel.com</span>
            </a>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <a href="#" className="hover:text-[#CD9933] transition-colors"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-[#CD9933] transition-colors"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-[#CD9933] transition-colors"><i className="fab fa-instagram"></i></a>
            <a href="#" className="hover:text-[#CD9933] transition-colors"><i className="fab fa-linkedin-in"></i></a>
            <a href="#" className="hover:text-[#CD9933] transition-colors"><i className="fab fa-youtube"></i></a>
          </div>
        </div>

        {/* Main Navbar Overlay */}
        <nav className="px-6 md:px-12 py-5 flex justify-between items-center bg-transparent">
          {/* Logo (Rehman Travel Logo image - alt updated to Royal) - Doubled Size */}
          <Link to="/" className="flex items-center gap-2 select-none">
            <img src={logo} alt="Royal Umrah & Travels Logo" className="h-16 sm:h-20 w-auto" />
          </Link>

          {/* Navigation Links & Book Now Button */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6 text-xs font-bold tracking-[0.15em] text-white font-manrope">
              <Link to="/" className="hover:text-[#CD9933] transition-colors uppercase">HOME</Link>
              <Link to="/home2" className="hover:text-[#CD9933] transition-colors uppercase text-[#CD9933]">HOME 2</Link>
              <Link to="/home3" className="hover:text-[#CD9933] transition-colors uppercase">HOME 3</Link>
              <Link to="/flights" className="hover:text-[#CD9933] transition-colors uppercase">AIRLINE TICKETING</Link>
              <Link to="/visa-services" className="hover:text-[#CD9933] transition-colors uppercase">VISA INQUIRY</Link>
              <Link to="/about" className="hover:text-[#CD9933] transition-colors uppercase">PARTNERS</Link>
              <Link to="/contact" className="hover:text-[#CD9933] transition-colors uppercase">CONTACT</Link>
            </div>
            <Link to="/packages" className="bg-[#CD9933] text-white px-5 py-2.5 rounded-md font-manrope text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-[#013334] transition-all duration-300">Book Now</Link>
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            <Link to="/packages" className="bg-[#CD9933] text-white px-3 py-1.5 rounded-md font-manrope text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-[#013334] transition-all duration-300">Book Now</Link>
            {/* Mobile Menu Icon */}
            <Link to="/contact" className="text-white hover:text-[#CD9933] transition-colors">
              <span className="material-symbols-outlined text-2xl">menu</span>
            </Link>
          </div>
        </nav>
      </header>

      {/* 2. Brand-Focused Hero Section */}
      <section className="relative h-[921px] flex items-center justify-center">
        {/* Background Image: Spectacular Kaaba photograph */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            alt="Majestic Holy Kaaba in Makkah spiritual scenery"
            className="w-full h-full object-cover"
            src={background1}
          />
          {/* Dynamic Gradient Overlay for better contrast and premium feel */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#013334]/90 via-[#013334]/40 to-[#013334]/90"></div>
        </div>

        {/* Minimalist Centered Brand Logo Overlay (Teal & Gold) */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 mb-32 max-w-6xl mx-auto flex flex-col items-center">
          <span className="font-manrope text-[#CD9933] font-bold text-[10px] md:text-xs tracking-[0.4em] uppercase mb-6 drop-shadow-md">Proudly Serving</span>
          <h1 className="text-white text-5xl sm:text-7xl md:text-[6.5rem] font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase font-notoSerif drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] leading-tight">
            THE GUESTS<br className="md:hidden" /> OF ALLAH
          </h1>
          <div className="h-[3px] w-32 bg-gradient-to-r from-transparent via-[#CD9933] to-transparent mx-auto my-8 sm:my-10 opacity-90"></div>
          <p className="font-manrope text-white/90 text-xs sm:text-sm md:text-base font-semibold tracking-[0.2em] md:tracking-[0.3em] uppercase leading-relaxed max-w-4xl text-center drop-shadow-md">
            We provide complete Umrah & International Travel Services with trusted guidance, premium comfort, and seamless support — so you can focus fully on your worship and sacred spiritual journey.
          </p>
        </div>

        {/* Floating Banner Contact Form */}
        <div className="absolute bottom-0 left-0 w-full translate-y-1/2 px-4 md:px-8 z-20">
          <BannerContactForm />
        </div>
      </section>

      {/* 5. Umrah Packages Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-3xl font-bold text-[#013334] tracking-wider uppercase">Umrah Packages</h2>
            <p className="text-gray-600 text-sm">Explore our curated Umrah experiences.</p>
          </div>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {packages.filter(p => p.category?.toLowerCase() === 'umrah').map(pkg => (
              <div key={pkg.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
                <img src={pkg.image_url || ''} alt={pkg.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#013334] mb-2">{pkg.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{pkg.description}</p>
                  <p className="text-lg font-bold text-[#CD9933] mb-2">PKR {pkg.price?.toLocaleString()}</p>
                  <button className="mt-2 w-full bg-[#CD9933] text-white py-2 rounded hover:bg-[#013334] transition-colors">Book Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Partner Logo Strip */}
      <div className="bg-[#111111] pt-36 pb-8 px-6 overflow-hidden mt-24 md:mt-0 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-70">
          <span className="text-white font-extrabold tracking-widest text-sm uppercase">TURKISH AIRLINES</span>
          <span className="text-white font-extrabold tracking-widest text-sm uppercase">EMIRATES</span>
          <span className="text-white font-extrabold tracking-widest text-sm uppercase">ETIHAD</span>
          <span className="text-white font-extrabold tracking-widest text-sm uppercase">THAI</span>
          <span className="text-white font-extrabold tracking-widest text-sm uppercase">OMAN AIR</span>
          <span className="text-white font-extrabold tracking-widest text-sm uppercase">AIR ASIA</span>
        </div>
      </div>

      {/* 4. "Best Travel Agency" (About Us) Section */}
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
          <div className="relative group isolate">
            <div className="absolute inset-0 bg-[#CD9933] translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300 rounded-xl"></div>
            <img
              alt="Luxury traveler collage illustration mockup landscape"
              className="w-full h-auto object-cover shadow-2xl border border-white/20 rounded-xl"
              src={aboutImage}
            />
          </div>
        </div>
      </section>

      {/* 5. International Tours Grid */}
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

          {/* 4-Column Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {internationalTours.map((pkg, idx) => {
              const isStatic = !pkg.hasOwnProperty('image_url')
              const img = isStatic ? pkg.image : (pkg.image_url || staticInternationalTours[idx % 4].image)
              const duration = isStatic ? pkg.duration : (pkg.duration || '5 Days 4 Nights')
              const price = pkg.price

              return (
                <div key={pkg.id || idx} className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col">
                  {/* Top Image */}
                  <div className="relative h-64 overflow-hidden shrink-0">
                    <img
                      alt={pkg.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      src={img}
                    />
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

      {/* 6. "Go Explore" CTA Banner */}
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

      {/* 7. Local Tours Grid */}
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
                  {/* Top Image */}
                  <div className="relative h-64 overflow-hidden shrink-0">
                    <img
                      alt={pkg.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      src={img}
                    />
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

      {/* 8. "Explore Dream Discover" Split Section */}
      <section className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Column typography block (Teal & Gold transition) */}
          <div className="bg-[#f5f7fa] py-28 px-12 md:px-24 flex flex-col justify-center space-y-4">
            <h3 className="text-gray-300 text-7xl md:text-8xl font-bold tracking-widest uppercase select-none leading-none font-headline font-black">
              EXPLORE
            </h3>
            <h3 className="text-[#CD9933] text-7xl md:text-8xl font-bold tracking-widest uppercase select-none leading-none font-headline font-black">
              DREAM
            </h3>
            <h3 className="text-[#013334] text-7xl md:text-8xl font-bold tracking-widest uppercase select-none leading-none font-headline font-black">
              DISCOVER
            </h3>
          </div>

          {/* Right Column details card overlaying mountain image */}
          <div className="relative py-28 px-8 md:px-16 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                alt="Green pine mountain peak trees background"
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80"
              />
              <div className="absolute inset-0 bg-[#013334]/50"></div>
            </div>

            <div className="relative z-10 bg-white p-8 md:p-12 shadow-2xl max-w-md w-full space-y-6">
              <h4 className="text-[#013334] font-bold text-2xl tracking-wide uppercase font-headline">
                Epic Journeys From Royal Travels
              </h4>
              <p className="text-gray-500 text-xs leading-relaxed">
                Royal Travels' refining capacities and travel logistics are built for people who wish to travel with absolute peace of mind. We ensure that every schedule is aligned, transport is fully private, and stays are vetted.
              </p>
              <div className="flex gap-4 pt-2">
                <a
                  href="https://wa.me/923001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#CD9933] hover:bg-[#013334] text-white text-center px-6 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors"
                >
                  BOOK NOW
                </a>
                <Link
                  to="/about"
                  className="border border-gray-300 hover:border-[#CD9933] text-gray-700 hover:text-[#CD9933] text-center px-6 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors"
                >
                  READ MORE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Happy Travelers (Testimonials) */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {staticTestimonials.map((t, idx) => (
              <div key={idx} className="bg-white p-10 shadow-lg text-center relative border border-gray-100 flex flex-col items-center">
                <span className="material-symbols-outlined text-gray-200 text-5xl absolute top-6 right-6">format_quote</span>
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#f5f7fa] mb-6">
                  <img
                    alt={`${t.name} portrait`}
                    className="w-full h-full object-cover"
                    src={t.image}
                  />
                </div>
                <h5 className="text-[#013334] font-bold text-sm uppercase tracking-wider font-headline">{t.name}</h5>
                <p className="text-[#CD9933] text-[9px] font-bold tracking-widest uppercase mb-4">{t.city}</p>
                <p className="text-gray-500 italic text-xs leading-relaxed max-w-sm">
                  "{t.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Stats Section ("A Fact of Royal Travels") */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side Stats */}
          <div className="space-y-6">
            <span className="text-[#CD9933] font-bold text-xs uppercase tracking-widest block">PROUD NUMBERS</span>
            <h2 className="text-[#013334] text-3xl md:text-4xl font-bold tracking-wide uppercase font-headline">
              THE ROYAL LEGACY
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              We focus on expanding our partner relationships and logistics integrations every single day. Here are key markers of our historical service footprints:
            </p>

            {/* 5 Statistics List */}
            <div className="space-y-4 pt-4 text-xs font-bold text-gray-700 uppercase tracking-wider">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#CD9933] text-base">check_circle</span>
                <span>25+ years experience in the travel & Umrah field.</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#CD9933] text-base">check_circle</span>
                <span>500+ happy customers enjoy traveling with Royal Travels.</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#CD9933] text-base">check_circle</span>
                <span>15+ best local tourist destinations we explore.</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#CD9933] text-base">check_circle</span>
                <span>10+ international packages we offer.</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#CD9933] text-base">check_circle</span>
                <span>8+ premium all-inclusive umrah packages.</span>
              </div>
            </div>
          </div>

          {/* Right Side Map */}
          <div className="flex justify-center items-center">
            {/* Styled Tan Minimalist World Map Outline */}
            <img
              alt="Tan minimal global world map outline graphic travel network"
              className="w-full max-w-xl h-auto opacity-85"
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
            />
          </div>
        </div>
      </section>

      {/* 11. Contact Us Section (Snowy Mountain Split Backdrop) */}
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
              alt="Hajj Umrah and international travels collage illustration"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[95%] w-auto object-contain"
              src={travelCollage}
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

      {/* 12. Corporate Charcoal Footer */}
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

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/923001234567" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-[#128C7E] transition-all duration-300 group"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.028L2 22l5.147-1.346a9.926 9.926 0 004.859 1.262h.005c5.505 0 9.99-4.478 9.99-9.985 0-2.667-1.037-5.176-2.923-7.062A9.919 9.919 0 0012.012 2zm5.757 14.072c-.25.705-1.458 1.34-2.008 1.425-.503.078-1.157.144-3.328-.755-2.777-1.149-4.57-3.978-4.71-4.164-.139-.185-1.127-1.499-1.127-2.862 0-1.363.708-2.03.96-2.302.251-.271.554-.34.739-.34h.53c.172 0 .402.003.582.414.195.446.666 1.635.726 1.758.06.124.1.268.017.433-.082.165-.124.268-.247.412-.124.145-.262.32-.375.43-.124.12-.254.25-.11.498.145.247.643 1.058 1.38 1.714.948.844 1.748 1.106 1.996 1.229.248.123.392.103.536-.062.145-.165.62-.722.785-.97.166-.247.33-.206.558-.124.23.083 1.45.682 1.7 1.805.02.103.015.207-.005.31z"/>
        </svg>
        <span className="absolute right-16 bg-[#013334] text-white text-xs font-bold px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-md border border-white/10">
          Chat with Us
        </span>
      </a>

    </div>
  )
}

export default Home2
