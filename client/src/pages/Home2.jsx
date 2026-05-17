import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || ''

const staticPackages = [
  {
    id: 1,
    title: '15 Days Executive Umrah',
    location: '5★ Pullman ZamZam / Movenpick',
    price: 245000,
    days: '15 Days (7 Makkah / 8 Madinah)',
    badge: 'Premium',
    badgeColor: 'bg-secondary',
    image: 'https://images.unsplash.com/photo-1591604129909-2b4ce4e6e6d2?w=800&q=80'
  },
  {
    id: 2,
    title: '21 Days Spiritual Retreat',
    location: '3★ Swiss International / Similar',
    price: 185000,
    days: '21 Days (10 Makkah / 11 Madinah)',
    badge: 'Economy Plus',
    badgeColor: 'bg-primary-container',
    image: 'https://images.unsplash.com/photo-1564769662533-3f5aae93cec2?w=800&q=80'
  },
  {
    id: 3,
    title: 'Tailored Family Package',
    location: 'Your Choice of Hotels',
    price: 0,
    priceText: 'Best Quote',
    days: 'Flexible Duration',
    badge: 'Custom',
    badgeColor: 'bg-[#CD9933]',
    image: 'https://images.unsplash.com/photo-1580338834642-8a3acf79b1b8?w=800&q=80'
  }
]

const Home2 = () => {
  const [packages, setPackages] = useState([])
  const [cmsContent, setCmsContent] = useState({
    heroTitle: 'Your Trusted Partner for Umrah & International Tours',
    heroSubtitle: 'Embark on a spiritually enriching journey with premium hospitality and expert guidance tailored for your comfort.',
    heroCta: 'View Umrah Packages',
    heroWhatsApp: 'Contact on WhatsApp'
  })
  const [pageMedia, setPageMedia] = useState({})
  
  // Search Form State
  const [departureCity, setDepartureCity] = useState('Lahore, Pakistan')
  const [travelMonth, setTravelMonth] = useState('October 2024')
  const [packageType, setPackageType] = useState('Economy (3 Star)')

  // Contact Form State
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [interest, setInterest] = useState('Umrah Packages')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0)

    // Fetch packages from backend
    axios.get(`${API_BASE}/api/packages`)
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setPackages(res.data)
        } else {
          setPackages(staticPackages)
        }
      })
      .catch((err) => {
        console.error('Failed to fetch packages:', err)
        setPackages(staticPackages)
      })

    // Fetch CMS content from API with localStorage fallback
    const savedCms = localStorage.getItem('cms_home2') || localStorage.getItem('cms_home')
    if (savedCms) {
      try {
        const parsed = JSON.parse(savedCms)
        if (parsed && Object.keys(parsed).length > 0) {
          setCmsContent(prev => ({ ...prev, ...parsed }))
        }
      } catch (e) {}
    }

    axios.get(`${API_BASE}/api/cms?id=cms_home`)
      .then(res => {
        if (res.data && Object.keys(res.data).length > 0) {
          setCmsContent(prev => ({ ...prev, ...res.data }))
          localStorage.setItem('cms_home2', JSON.stringify(res.data))
        }
      })
      .catch(err => console.error('Failed to fetch CMS content:', err))

    // Fetch page_media from API with localStorage fallback
    const savedMedia = localStorage.getItem('pageMedia')
    if (savedMedia) {
      try {
        const parsed = JSON.parse(savedMedia)
        if (parsed && Object.keys(parsed).length > 0) {
          setPageMedia(parsed)
        }
      } catch (e) {}
    }

    axios.get(`${API_BASE}/api/cms?id=page_media`)
      .then(res => {
        if (res.data && Object.keys(res.data).length > 0) {
          setPageMedia(res.data)
          localStorage.setItem('pageMedia', JSON.stringify(res.data))
        }
      })
      .catch(err => console.error('Failed to fetch page media:', err))
  }, [])

  const handleContactSubmit = (e) => {
    e.preventDefault()
    // Simulated form submission
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setContactName('')
      setContactEmail('')
    }, 4000)
  }

  return (
    <div className="bg-surface font-manrope text-on-surface antialiased min-h-screen">
      {/* Navbar with transparent glass blur v2 styling */}
      <Navbar isVersion2={true} />

      {/* WhatsApp Floating Action Button */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[9999] group">
        <div className="flex flex-col items-center gap-2">
          <span className="bg-white/90 backdrop-blur-md text-[#CD9933] font-manrope font-bold text-[10px] uppercase px-3 py-1.5 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">WhatsApp Support</span>
          <a 
            href="https://wa.me/923001234567" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-white/80 dark:bg-black/80 backdrop-blur-md text-[#CD9933] rounded-full p-4 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shadow-2xl shadow-[#013334]/20 border border-[#CD9933]/15 animate-bounce duration-[2000ms] cursor-pointer hover:scale-110 transition-all"
          >
            <span className="material-symbols-outlined text-2xl md:text-3xl">chat</span>
          </a>
        </div>
      </div>

      <main className="pt-0">
        {/* Redesigned Hero Section */}
        <section className="relative h-[921px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              alt="Grand Mosque Makkah with Kaaba centerpiece at dusk" 
              className="w-full h-full object-cover" 
              src={pageMedia.home_hero_image || "https://lh3.googleusercontent.com/aida-public/AB6AXuCB9jFYv-6zH25opjeQu3ruFk6JGDGpms3BOA83kZpAOxjsKQZQgNitLSz-KVZWeeDC_gZXT8BJz11t1DknRhSd9pTBuiQoBvxnaMIAp35Q7SB9iIt2XaQDKM86xIf3ZRcIwEb4IBt-nxvUewqFJcSaxFhnzidmBmS-8LhDnZ_xCmzD2tOFW8HiYBJOBLG-flKcFrn-JXUMbIIX6y1VMN65cfIK0VIKM4N11EkvET7hA-VVrgFrZOtcl3EV0mH8nleBrVQpe8G6hWS0"} 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-container/95 to-primary-container/40"></div>
          </div>
          <div className="relative z-10 container mx-auto px-6 sm:px-8 md:px-12 lg:px-24 text-white text-center md:text-left w-full">
            <h1 className="font-headline text-5xl md:text-7xl mb-6 max-w-4xl italic leading-tight">
              {cmsContent.heroTitle.includes('Umrah') ? (
                <>
                  {cmsContent.heroTitle.split('Umrah')[0]}
                  <span className="text-[#f6bd54] font-semibold">{`Umrah`}</span>
                  {cmsContent.heroTitle.split('Umrah')[1]}
                </>
              ) : (
                cmsContent.heroTitle
              )}
            </h1>
            <p className="font-body text-lg md:text-xl mb-10 text-white/80 max-w-2xl font-light tracking-wide leading-relaxed">
              {cmsContent.heroSubtitle}
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
              <Link 
                to="/packages" 
                className="bg-[#CD9933] hover:bg-[#b5882d] text-primary px-8 py-4 rounded-md font-bold tracking-widest uppercase text-sm transition-all shadow-lg text-center"
              >
                {cmsContent.heroCta}
              </Link>
              <a 
                href="https://wa.me/923001234567" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-md font-bold tracking-widest uppercase text-sm transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-green-400">chat</span>
                {cmsContent.heroWhatsApp}
              </a>
            </div>
          </div>

          {/* Quick Search Bar (Absolutely positioned at the bottom, overlapping next section) */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-5xl px-4 z-20">
            <div className="bg-surface-container-lowest rounded-xl shadow-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-end border border-outline-variant/10">
              <div className="flex-1 w-full space-y-2">
                <label className="font-label text-xs uppercase tracking-tighter text-outline font-bold">Departure City</label>
                <select 
                  value={departureCity}
                  onChange={(e) => setDepartureCity(e.target.value)}
                  className="w-full border-b border-outline-variant bg-transparent py-2 focus:border-secondary outline-none font-body text-on-surface"
                >
                  <option value="Lahore, Pakistan">Lahore, Pakistan</option>
                  <option value="Karachi, Pakistan">Karachi, Pakistan</option>
                  <option value="Islamabad, Pakistan">Islamabad, Pakistan</option>
                </select>
              </div>
              <div className="flex-1 w-full space-y-2">
                <label className="font-label text-xs uppercase tracking-tighter text-outline font-bold">Month</label>
                <select 
                  value={travelMonth}
                  onChange={(e) => setTravelMonth(e.target.value)}
                  className="w-full border-b border-outline-variant bg-transparent py-2 focus:border-secondary outline-none font-body text-on-surface"
                >
                  <option value="October 2024">October 2024</option>
                  <option value="November 2024">November 2024</option>
                  <option value="Ramadan 2025">Ramadan 2025</option>
                </select>
              </div>
              <div className="flex-1 w-full space-y-2">
                <label className="font-label text-xs uppercase tracking-tighter text-outline font-bold">Package Type</label>
                <select 
                  value={packageType}
                  onChange={(e) => setPackageType(e.target.value)}
                  className="w-full border-b border-outline-variant bg-transparent py-2 focus:border-secondary outline-none font-body text-on-surface"
                >
                  <option value="Economy (3 Star)">Economy (3 Star)</option>
                  <option value="Executive (4 Star)">Executive (4 Star)</option>
                  <option value="Premium (5 Star)">Premium (5 Star)</option>
                </select>
              </div>
              <Link 
                to={`/packages?departure=${departureCity.split(',')[0]}&month=${travelMonth}&type=${packageType.split(' ')[0]}`}
                className="bg-primary text-white p-4 rounded-md hover:bg-primary-container transition-colors shrink-0 flex items-center justify-center w-full md:w-auto"
              >
                <span className="material-symbols-outlined">search</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Umrah Packages Section */}
        <section className="py-32 px-6 bg-surface">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
              <div>
                <span className="text-secondary font-label tracking-[0.3em] uppercase text-xs font-bold block mb-4">Spiritual Journeys</span>
                <h2 className="font-headline text-4xl md:text-5xl text-primary font-bold">Featured Umrah Packages</h2>
              </div>
              <div className="h-px flex-1 bg-outline-variant/30 mx-8 mb-4 hidden md:block"></div>
              <Link 
                className="text-primary font-bold border-b-2 border-secondary/40 pb-1 hover:border-secondary transition-all shrink-0" 
                to="/packages"
              >
                Explore All Packages
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(packages.length > 0 ? packages.slice(0, 3) : staticPackages).map((pkg, i) => {
                const isStatic = !pkg.hasOwnProperty('image_url')
                const img = isStatic ? pkg.image : (pkg.image_url || staticPackages[i % 3].image)
                const badge = isStatic ? pkg.badge : (pkg.category || 'Featured')
                const duration = isStatic ? pkg.days : (pkg.duration || staticPackages[i % 3].days)
                const location = isStatic ? pkg.location : (pkg.hotel_name || staticPackages[i % 3].location)
                const price = isStatic ? pkg.price : pkg.price
                const priceText = isStatic && pkg.priceText ? pkg.priceText : null

                return (
                  <div 
                    key={pkg.id || i} 
                    className="group bg-surface-container-low rounded-none overflow-hidden editorial-shadow transition-transform hover:-translate-y-2 border border-outline-variant/5"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        alt={pkg.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        src={img} 
                      />
                      <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest">
                        {badge}
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="font-headline text-2xl mb-4 text-primary line-clamp-1">{pkg.title}</h3>
                      <div className="space-y-3 mb-8">
                        <div className="flex items-center gap-3 text-on-surface-variant text-sm">
                          <span className="material-symbols-outlined text-secondary text-sm">hotel</span>
                          {location}
                        </div>
                        <div className="flex items-center gap-3 text-on-surface-variant text-sm">
                          <span className="material-symbols-outlined text-secondary text-sm">schedule</span>
                          {duration}
                        </div>
                      </div>
                      <div className="flex justify-between items-center border-t border-outline-variant/30 pt-6">
                        <div>
                          <p className="text-[10px] uppercase text-outline font-bold">
                            {priceText ? 'Contact for' : 'Starting from'}
                          </p>
                          <p className="text-xl font-bold text-secondary">
                            {priceText ? priceText : `PKR ${price.toLocaleString()}`}
                          </p>
                        </div>
                        <Link 
                          to={`/package/${pkg.id || i + 1}`} 
                          className="text-primary font-bold text-sm uppercase tracking-widest flex items-center gap-1 group/btn"
                        >
                          Details 
                          <span className="material-symbols-outlined transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-24 bg-primary text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-5 w-1/3 h-full pointer-events-none">
            <img 
              alt="Islamic pattern background" 
              className="w-full h-full object-cover" 
              src="https://images.unsplash.com/photo-1564507004663-b6dfb3c8924d?w=1200&q=80" 
            />
          </div>
          <div className="container mx-auto px-6 relative z-10 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="font-headline text-4xl mb-6 italic text-[#CD9933]">Why Travel with Rehman Travels?</h2>
              <p className="font-body text-white/70 text-base md:text-lg">
                Over two decades of excellence in crafting sacred journeys with dedication and spiritual integrity.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
              <div className="space-y-4 group">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-[#CD9933] transition-all duration-300">
                  <span className="material-symbols-outlined text-[#CD9933] text-3xl group-hover:text-primary">verified_user</span>
                </div>
                <p className="font-label text-xs uppercase tracking-widest font-bold">Approved Agency</p>
              </div>
              <div className="space-y-4 group">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-[#CD9933] transition-all duration-300">
                  <span className="material-symbols-outlined text-[#CD9933] text-3xl group-hover:text-primary">distance</span>
                </div>
                <p className="font-label text-xs uppercase tracking-widest font-bold">Haram Proximity</p>
              </div>
              <div className="space-y-4 group">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-[#CD9933] transition-all duration-300">
                  <span className="material-symbols-outlined text-[#CD9933] text-3xl group-hover:text-primary">payments</span>
                </div>
                <p className="font-label text-xs uppercase tracking-widest font-bold">Affordable Prices</p>
              </div>
              <div className="space-y-4 group">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-[#CD9933] transition-all duration-300">
                  <span className="material-symbols-outlined text-[#CD9933] text-3xl group-hover:text-primary">support_agent</span>
                </div>
                <p className="font-label text-xs uppercase tracking-widest font-bold">24/7 Support</p>
              </div>
              <div className="space-y-4 group">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-[#CD9933] transition-all duration-300">
                  <span className="material-symbols-outlined text-[#CD9933] text-3xl group-hover:text-primary">hiking</span>
                </div>
                <p className="font-label text-xs uppercase tracking-widest font-bold">Expert Guides</p>
              </div>
            </div>
          </div>
        </section>

        {/* International Tours Section */}
        <section className="py-24 bg-surface-container-low">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex items-center gap-6 mb-16">
              <h2 className="font-headline text-4xl text-primary font-bold shrink-0">International Escapes</h2>
              <div className="h-[2px] w-full bg-[#CD9933]/20"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Turkey */}
              <div className="group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden rounded-none shadow-xl">
                  <img 
                    alt="The Blue Mosque in Istanbul at sunrise" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/85 to-transparent flex flex-col justify-end p-8">
                    <span className="text-secondary-fixed text-xs font-bold uppercase tracking-widest mb-2">Starting PKR 190k</span>
                    <h3 className="text-white font-headline text-3xl mb-2">Grand Turkey Tour</h3>
                    <Link to="/international-tours" className="text-white/80 group-hover:text-[#CD9933] text-xs font-bold uppercase tracking-widest transition-all">Explore Tour →</Link>
                  </div>
                </div>
              </div>
              
              {/* Dubai */}
              <div className="group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden rounded-none shadow-xl">
                  <img 
                    alt="Dubai skyline with Burj Khalifa reflecting in water" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/85 to-transparent flex flex-col justify-end p-8">
                    <span className="text-secondary-fixed text-xs font-bold uppercase tracking-widest mb-2">Starting PKR 120k</span>
                    <h3 className="text-white font-headline text-3xl mb-2">Luxury Dubai</h3>
                    <Link to="/international-tours" className="text-white/80 group-hover:text-[#CD9933] text-xs font-bold uppercase tracking-widest transition-all">Explore Tour →</Link>
                  </div>
                </div>
              </div>
              
              {/* Thailand */}
              <div className="group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden rounded-none shadow-xl">
                  <img 
                    alt="Tropical beach scene in Thailand with longtail boat" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    src="https://images.unsplash.com/photo-1596422748573-cbb5bf090104?w=800&q=80" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/85 to-transparent flex flex-col justify-end p-8">
                    <span className="text-secondary-fixed text-xs font-bold uppercase tracking-widest mb-2">Starting PKR 145k</span>
                    <h3 className="text-white font-headline text-3xl mb-2">Siam Treasures</h3>
                    <Link to="/international-tours" className="text-white/80 group-hover:text-[#CD9933] text-xs font-bold uppercase tracking-widest transition-all">Explore Tour →</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Facts & Stats Section */}
        <section className="py-20 bg-surface border-y border-outline-variant/10">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
              <div className="space-y-2">
                <h4 className="text-4xl font-headline text-primary font-bold">17+</h4>
                <p className="text-outline uppercase text-[10px] tracking-widest font-black">Flight Partners</p>
                <p className="text-sm text-on-surface-variant font-light">Global airlines for flexible routes.</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-4xl font-headline text-primary font-bold">500+</h4>
                <p className="text-outline uppercase text-[10px] tracking-widest font-black">Happy Travelers</p>
                <p className="text-sm text-on-surface-variant font-light">Join our growing community of voyagers.</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-4xl font-headline text-primary font-bold">120+</h4>
                <p className="text-outline uppercase text-[10px] tracking-widest font-black">Hotel Network</p>
                <p className="text-sm text-on-surface-variant font-light">Curated stays from 3★ to 5★ luxury.</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-4xl font-headline text-primary font-bold">25+</h4>
                <p className="text-outline uppercase text-[10px] tracking-widest font-black">Years Expertise</p>
                <p className="text-sm text-on-surface-variant font-light">Trusted heritage in travel planning.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Local Tours (Northern Pakistan) Section */}
        <section className="py-24 bg-surface">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="mb-16 text-center">
              <span className="text-secondary font-label tracking-[0.4em] uppercase text-xs font-bold block mb-4">Discover Home</span>
              <h2 className="font-headline text-4xl text-primary font-bold">Discover Northern Pakistan</h2>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              {/* Swat */}
              <div className="flex-1 relative group overflow-hidden h-[400px] shadow-lg rounded-none">
                <img 
                  alt="Swat Valley" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80" 
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors"></div>
                <div className="absolute bottom-6 left-6 text-white z-10">
                  <h3 className="font-headline text-2xl mb-1 italic">Swat Valley</h3>
                  <p className="text-xs uppercase tracking-widest text-white/80">The Switzerland of East</p>
                </div>
              </div>
              
              {/* Naran */}
              <div className="flex-1 relative group overflow-hidden h-[400px] shadow-lg rounded-none">
                <img 
                  alt="Naran & Kaghan" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  src="https://images.unsplash.com/photo-1502602892935-72c3ac7c352?w=800&q=80" 
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors"></div>
                <div className="absolute bottom-6 left-6 text-white z-10">
                  <h3 className="font-headline text-2xl mb-1 italic">Naran &amp; Kaghan</h3>
                  <p className="text-xs uppercase tracking-widest text-white/80">Celestial Landscapes</p>
                </div>
              </div>
              
              {/* Neelum */}
              <div className="flex-1 relative group overflow-hidden h-[400px] shadow-lg rounded-none">
                <img 
                  alt="Neelum Valley" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  src="https://images.unsplash.com/photo-1473163928189-394b13469e19?w=800&q=80" 
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors"></div>
                <div className="absolute bottom-6 left-6 text-white z-10">
                  <h3 className="font-headline text-2xl mb-1 italic">Neelum Valley</h3>
                  <p className="text-xs uppercase tracking-widest text-white/80">Azad Kashmir Paradise</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-surface-container-low border-t border-outline-variant/20">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
              <div className="lg:col-span-1">
                <h2 className="font-headline text-4xl text-primary mb-6 leading-tight italic">Voices of Our <br/>Beloved Travelers</h2>
                <div className="flex gap-1 text-[#CD9933] mb-4">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
                <p className="text-on-surface-variant font-body">
                  Rated 4.9/5 by our community for exceptional service and reliability.
                </p>
              </div>
              
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Testimonial 1 */}
                <div className="bg-surface p-10 editorial-shadow relative border border-outline-variant/5">
                  <span className="material-symbols-outlined absolute top-6 right-6 text-primary/10 text-5xl">format_quote</span>
                  <p className="text-on-surface mb-8 italic leading-relaxed font-manrope">
                    "The Umrah journey was impeccably organized. From the visa process to the premium hotels in Makkah, everything was managed with extreme care. Highly recommended for families."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img 
                        alt="Ahmad Raza" 
                        className="w-full h-full object-cover" 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" 
                      />
                    </div>
                    <div>
                      <h5 className="font-bold text-primary text-sm">Ahmad Raza</h5>
                      <p className="text-[10px] text-outline uppercase tracking-widest">Umrah Participant</p>
                    </div>
                  </div>
                </div>

                {/* Testimonial 2 */}
                <div className="bg-surface p-10 editorial-shadow relative border border-outline-variant/5">
                  <span className="material-symbols-outlined absolute top-6 right-6 text-primary/10 text-5xl">format_quote</span>
                  <p className="text-on-surface mb-8 italic leading-relaxed font-manrope">
                    "Our Turkey trip was the highlight of our year. The local guides were knowledgeable and the itinerary was perfectly balanced between sightseeing and relaxation."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img 
                        alt="Sara Khan" 
                        className="w-full h-full object-cover" 
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" 
                      />
                    </div>
                    <div>
                      <h5 className="font-bold text-primary text-sm">Sara Khan</h5>
                      <p className="text-[10px] text-outline uppercase tracking-widest">Turkey Tour</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="relative py-24 overflow-hidden bg-surface">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/85 to-surface"></div>
          </div>
          <div className="container mx-auto px-6 relative z-10 max-w-5xl">
            <div className="bg-primary rounded-none editorial-shadow overflow-hidden flex flex-col md:flex-row border border-white/5">
              <div className="p-12 md:w-1/2 text-white bg-primary-container relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#013334]/90 to-primary/95"></div>
                <div className="relative z-10">
                  <h2 className="font-headline text-3xl mb-8 italic text-[#CD9933]">Let's Plan Your Next Journey</h2>
                  <p className="text-white/70 mb-12 font-manrope text-sm leading-relaxed">
                    Leave your details and our experienced travel consultants will get back to you within 24 hours.
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-[#CD9933]">location_on</span>
                      <div>
                        <h6 className="font-bold text-sm">Visit Us</h6>
                        <p className="text-white/60 text-xs leading-relaxed mt-1">
                          Main Boulevard, Gulberg III,<br/>Lahore, Pakistan
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-[#CD9933]">phone_in_talk</span>
                      <div>
                        <h6 className="font-bold text-sm">Call Center</h6>
                        <p className="text-white/60 text-xs mt-1">+92 300 1234567</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-12 md:w-1/2 bg-surface">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-10">
                    <span className="material-symbols-outlined text-green-500 text-6xl mb-4">check_circle</span>
                    <h4 className="font-headline text-2xl text-primary font-bold mb-2">Message Sent Successfully!</h4>
                    <p className="text-on-surface-variant text-sm font-manrope">
                      Thank you for contacting Rehman Travels. Our travel expert will reach out to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-outline mb-1">Full Name</label>
                      <input 
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full bg-transparent border-b border-outline-variant py-2 focus:border-secondary outline-none transition-colors text-on-surface text-sm" 
                        placeholder="e.g. Abdullah Khan" 
                        type="text"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-outline mb-1">Email Address</label>
                      <input 
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full bg-transparent border-b border-outline-variant py-2 focus:border-secondary outline-none transition-colors text-on-surface text-sm" 
                        placeholder="email@example.com" 
                        type="email"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-outline mb-1">I am interested in</label>
                      <select 
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        className="w-full bg-transparent border-b border-outline-variant py-2 focus:border-secondary outline-none transition-colors text-on-surface text-sm"
                      >
                        <option value="Umrah Packages">Umrah Packages</option>
                        <option value="International Tours">International Tours</option>
                        <option value="Local Tours">Local Tours</option>
                        <option value="Custom Itinerary">Custom Itinerary</option>
                      </select>
                    </div>
                    <button 
                      type="submit" 
                      className="w-full bg-[#CD9933] text-primary font-bold uppercase tracking-widest text-xs py-4 hover:shadow-lg transition-all mt-4"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Standard premium footer */}
      <Footer />
    </div>
  )
}

export default Home2
