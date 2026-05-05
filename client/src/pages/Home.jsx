import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || ''

const staticPackages = [
  {
    id: 1,
    title: 'Economy Saver',
    location: 'Saraya Iman (Makkah)',
    price: 185000,
    days: '15 Days',
    badge: 'Economy',
    badgeColor: 'bg-[#013334]',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4Q8F_FtsvuFZGVJy2M4mCNPoPdVIucrb-qLz9KMrRnHu2y4jEomHtxH3XbUIIyVb7fx_R8ZKzpO6JLW8a6r4u3ZLuupgq0zzie6njk5Tfw4CBH4smAeMF-b77uxEfjcwrfE0bWG20icpPBH2u6gYRsM9m3qcQKyoCWfFKdTlc4W1zTDVSW_X8tKo7HpcqPSaj9bPBqhdRYe8qu6UWesjRMAZC1_LwgtnBhuYiFBjcxkTV8czsNli9D9lT7GLzq0jlRAJJ2hm4V7JG'
  },
  {
    id: 2,
    title: '3 Star Comfort',
    location: 'Dar Al Eiman Grand',
    price: 245000,
    days: '15 Days',
    badge: '3 Star',
    badgeColor: 'bg-[#CD9933]',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgeIqrjd4iZZprHhl6dvsS6TlHxSPpsRmm2Q4eJ0zVcfSsCDiAzFs_uTdG6viogBc4vtlsa9ul1Nk18k6JBhkP-xeMEttf2BqJ1jOG8pQ7cnBf6Ao3WlNsQPFRlNK9j0rbGdGfbKOnG3rdjzGKSfNDY5wKpvPKQTepPxMwUq1cLbg-SxCK5TQ5rRrkARlzPWy_VGIQZQUGsTi_0CoUUzDbyZHY6No-V79Ao-q62kF8A-wSQe15IlpAbZe8_-0Ezat1qZmyvj1c8ZAL'
  },
  {
    id: 3,
    title: '4 Star Premium',
    location: 'Swissotel Makkah',
    price: 320000,
    days: '10 Days',
    badge: '4 Star',
    badgeColor: 'bg-primary',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeKAHUE-PrOvKyjvjA04CL1jr6-62S2Gq4OvwV7zH1lF0mlQjEH7m1ZghycTUjRSVtzOY5suj3gVo-PrLaXmzs2tiIW_cYJr-NSNa5pH_qsN7H7frVEt78dEk6MhB2J8Uj-Q6hheong-lQY2BU3RxegAaq6Na8Zwccq_7Zr1ZDRzOEpbEtIn9Q5EYOtLqjMcX5SNtiZrfZ4GWoCX7gId6_Df31VjHmy08Fi8IbzJqwShYHYNoTk4A1tdg-YSEzWH5ct9SdGFD2b2sQ'
  },
  {
    id: 4,
    title: '5 Star Executive',
    location: 'Fairmont Clock Tower',
    price: 450000,
    days: '7 Days',
    badge: 'Luxury',
    badgeColor: 'bg-[#CD9933]',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1TFYjcNCU1jatQI4D8YLqCDfuhWfk0cT0dMGoRBMfve9VV0lv0YzvCp9dIMEq-a05foGyu6nL0GphRF9kWJmOOUJoKETJpCojoqxl5XPI7FK5iE3wLkyS0ey_5yC3zsz96FsqZGofrd-XWR16bcukQBkRotmsfTZaX-xmFrjfUhi7Zazqb_BXhe8zYK74QxEmECK8vJaAXdzHQmhvAW-KyDZXPkR43tt1afbIF6YM7PBCOBBy-l6TuMWtejlRDSj5vmKIidlF72YJ'
  }
]

const Home = () => {
  const [packages, setPackages] = useState([])
  const [cmsContent, setCmsContent] = useState({
    heroTitle: 'Proudly serving the guest of Allah',
    heroSubtitle: 'We provide reliable, comfortable, and affordable Umrah services with complete guidance—so you can focus on your عبادت while we take care of the rest.',
    heroCta: 'View Umrah Packages',
    heroWhatsApp: 'Contact on WhatsApp'
  })

  useEffect(() => {
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

    // Fetch CMS content - try localStorage first, then API
    const savedCms = localStorage.getItem('cms_home')
    if (savedCms) {
      try {
        const parsed = JSON.parse(savedCms)
        if (parsed && Object.keys(parsed).length > 0) {
          setCmsContent(prev => ({ ...prev, ...parsed }))
          console.log('Loaded CMS from localStorage')
        }
      } catch (e) {}
    }
    
    axios.get(`${API_BASE}/api/cms?id=cms_home`)
      .then(res => {
        if (res.data && Object.keys(res.data).length > 0) {
          setCmsContent(prev => ({ ...prev, ...res.data }))
          // Also save to localStorage for offline
          localStorage.setItem('cms_home', JSON.stringify(res.data))
        }
      })
      .catch(err => console.error('Failed to fetch CMS content:', err))
  }, [])
  return (
    <div className="bg-surface font-manrope text-on-surface">
      <Navbar />
      
      {/* SideNavBar (WhatsApp FAB) */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[9999] group">
        <div className="flex flex-col items-center gap-2">
          <span className="bg-white/80 backdrop-blur-md text-[#CD9933] font-manrope font-bold text-[10px] uppercase px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">WhatsApp Support</span>
          <div className="bg-white/80 dark:bg-black/80 backdrop-blur-md text-[#CD9933] rounded-full p-3 md:p-4 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shadow-2xl shadow-[#013334]/20 border border-[#CD9933]/15 animate-bounce duration-[2000ms] cursor-pointer hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-2xl md:text-3xl">chat</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBubkTzEiGLq9ecV5_P_POI2om-XGLtBIrcBhG4Z6Z2FTNoko77ZP0hrzDRjD1aq1xPF-psQ32LnNFxg5sr3ZK0lrA7GhF4a595_Mgjp4euDQqJzGNNOMK2lPWFL6tklR8Q5zp3ootIYqJ-zH4z2AJTQgItEet4mbPUh2a-2NMMX7dqqaMpz4LVQkMc_2Mhd5Xlaw5dikwbzDN1ckBtHfsVsVohx7APcLJLU0OSBcS_E6dfIgQwo_aIUkSmIgk_cNCfeXZpd20jDUPAvp" alt="Makkah" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-24 w-full">
          <div className="max-w-3xl">
            <div className="w-12 h-1 bg-[#CD9933] mb-6 md:mb-8"></div>
            <h1 className="font-notoSerif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 md:mb-8">
              {cmsContent.heroTitle.includes('Umrah') ? (
                <>
                  {cmsContent.heroTitle.split('Umrah')[0]}
                  <span className="text-[#CD9933]">Umrah</span>
                  {cmsContent.heroTitle.split('Umrah')[1]}
                </>
              ) : cmsContent.heroTitle}
            </h1>
            <p className="font-manrope text-base md:text-lg text-white/80 mb-8 md:mb-12 max-w-xl">
              {cmsContent.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-3 md:gap-6">
              <Link to="/packages" className="bg-[#CD9933] hover:bg-[#b88a2e] text-white px-6 py-3 md:px-8 md:py-4 rounded-md font-bold transition-all shadow-lg flex items-center gap-2">
                {cmsContent.heroCta}
              </Link>
              <button className="bg-transparent border border-[#CD9933]/40 hover:bg-[#CD9933]/10 text-white px-6 py-3 md:px-8 md:py-4 rounded-md font-bold transition-all flex items-center gap-2 backdrop-blur-sm">
                <span className="material-symbols-outlined">chat</span>
                {cmsContent.heroWhatsApp}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Package Search */}
      <div className="relative z-20 max-w-6xl mx-auto -mt-12 sm:-mt-16 lg:-mt-24 px-4">
        <div className="bg-surface-container-lowest editorial-shadow p-4 sm:p-6 md:p-8 rounded-xl flex flex-col lg:flex-row gap-4 md:gap-6 items-stretch lg:items-end">
          <div className="flex-1 min-w-0">
            <label className="block font-manrope text-xs font-bold uppercase text-outline mb-2">Departure City</label>
            <select className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-[#CD9933] font-manrope text-sm py-2 px-0">
              <option>Karachi</option>
              <option>Lahore</option>
              <option>Islamabad</option>
            </select>
          </div>
          <div className="flex-1 min-w-0">
            <label className="block font-manrope text-xs font-bold uppercase text-outline mb-2">Month</label>
            <select className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-[#CD9933] font-manrope text-sm py-2 px-0">
              <option>September 2024</option>
              <option>October 2024</option>
              <option>Ramadan 2025</option>
            </select>
          </div>
          <div className="flex-1 min-w-0">
            <label className="block font-manrope text-xs font-bold uppercase text-outline mb-2">Package Type</label>
            <select className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-[#CD9933] font-manrope text-sm py-2 px-0">
              <option>Economy</option>
              <option>3 Star Comfort</option>
              <option>4 Star Premium</option>
              <option>5 Star Luxury</option>
            </select>
          </div>
          <button className="bg-primary text-white w-full lg:w-auto px-10 py-3 rounded-md font-bold flex items-center justify-center gap-2 hover:bg-[#002c2e] transition-all">
            <span className="material-symbols-outlined">search</span>
            Search
          </button>
        </div>
      </div>

      {/* Featured Umrah Packages */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16">
          <div className="max-w-2xl">
            <h6 className="font-manrope text-[#CD9933] font-bold text-sm tracking-[0.2em] uppercase mb-4">Spiritual Journeys</h6>
            <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight">Curated Umrah Packages</h2>
          </div>
          <Link className="text-primary font-bold border-b-2 border-[#CD9933] pb-1 mt-6 md:mt-0 transition-all hover:pr-4" to="/packages">View All Packages</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {packages.slice(0, 4).map((pkg, i) => {
            const staticPkg = staticPackages[i % staticPackages.length]
            const image = pkg.image_url || pkg.image || staticPkg.image
            const badge = pkg.category || pkg.badge || staticPkg.badge
            const badgeColor = pkg.badgeColor || staticPkg.badgeColor
            const duration = pkg.duration || pkg.days || staticPkg.days
            const location = pkg.hotel_name || pkg.location || staticPkg.location
            const price = typeof pkg.price === 'number' ? pkg.price : (parseFloat(String(pkg.price).replace(/[^0-9.]/g, '')) || staticPkg.price)
            
            return (
              <Link to={`/package/${pkg.id || pkg._id || staticPkg.id}`} key={pkg.id || i} className="bg-surface-container-low group cursor-pointer overflow-hidden editorial-shadow transition-transform hover:-translate-y-1 block">
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={image} alt={pkg.title} />
                  <div className={`absolute top-4 left-4 ${badgeColor} text-white text-[10px] font-bold px-3 py-1 tracking-widest uppercase`}>{badge}</div>
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="font-notoSerif text-xl font-bold text-primary mb-2 line-clamp-1">{pkg.title}</h3>
                  <p className="text-outline text-sm mb-4 line-clamp-1">{location} • {duration}</p>
                  <div className="flex items-center justify-between mt-6">
                    <div>
                      <span className="block text-xs text-outline">Starting from</span>
                      <span className="text-xl font-extrabold text-[#CD9933]">PKR {price.toLocaleString()}</span>
                    </div>
                    <span className="material-symbols-outlined text-[#CD9933] group-hover:translate-x-2 transition-transform">arrow_forward</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-primary-container relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7iqIMSWjJemycSurDzLS49I7vf1E_Ir_9JNdo7vnnjUs42efP_S1dgqe2xI0QDJaKbHo9ZRkqvdYo1bYcwBvEnTPhPclF1OSmgOVghrFtvqeq5b92V1yjUro0sxR_GnE1BNCqYps0QKr0yc_d2G0_23gzKUpiz3nt2gERaWgkbPWLcVYUd6z7noGPOWbDAz3zrOwnleugBBJWc52v2BSX_rOZLmuCn0bBOWhLLmTx7ip4AO3yKpRp0shQrdTuKpNfm0QTUA_N0WM8" alt="Pattern" />
        </div>
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 md:mb-12">Setting a Sacred Standard for Travel</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="text-[#CD9933] bg-white/5 w-14 h-14 flex items-center justify-center rounded-lg">
                    <span className="material-symbols-outlined text-3xl">verified_user</span>
                  </div>
                  <h4 className="font-bold text-white font-manrope">Approved Agency</h4>
                  <p className="text-white/60 text-sm leading-relaxed">Fully certified by Ministry of Hajj & Umrah for your peace of mind.</p>
                </div>
                <div className="space-y-4">
                  <div className="text-[#CD9933] bg-white/5 w-14 h-14 flex items-center justify-center rounded-lg">
                    <span className="material-symbols-outlined text-3xl">location_on</span>
                  </div>
                  <h4 className="font-bold text-white font-manrope">Haram Proximity</h4>
                  <p className="text-white/60 text-sm leading-relaxed">Specially selected hotels within walking distance of the holy sites.</p>
                </div>
                <div className="space-y-4">
                  <div className="text-[#CD9933] bg-white/5 w-14 h-14 flex items-center justify-center rounded-lg">
                    <span className="material-symbols-outlined text-3xl">support_agent</span>
                  </div>
                  <h4 className="font-bold text-white font-manrope">24/7 Support</h4>
                  <p className="text-white/60 text-sm leading-relaxed">Our dedicated ground staff in Makkah and Medina are always available.</p>
                </div>
                <div className="space-y-4">
                  <div className="text-[#CD9933] bg-white/5 w-14 h-14 flex items-center justify-center rounded-lg">
                    <span className="material-symbols-outlined text-3xl">groups</span>
                  </div>
                  <h4 className="font-bold text-white font-manrope">Experienced Guides</h4>
                  <p className="text-white/60 text-sm leading-relaxed">Scholarly guides to assist you with religious rituals and Ziarat.</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img className="rounded-xl editorial-shadow w-full h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGJr-PkCTbw2r-UbQwF17jWJZejPxRPpHZrMMerpfj2Dedl3aNiEtLUIt6uy0_l0y7RuUJvb4hE6eh-EuaIDrmOJ58cgOtfefFncGbp5yTjtSGMTFIpVFqNI-60_TRcCnPdbR4YBcfePrjheIpBnC3JZtzkkK1AkzXgy0wmuJMEmoxERn8tO3VjO33bJ8urtkI_zoedo3s-FyyVTjBFcSmNV7CX2cajChEUrqwldzPNnYqUwq1UAaY7pN8n0d1cpNoWUWoN5IHD0kl" alt="Architecture" />
              <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-[#CD9933] p-6 md:p-10 rounded-xl hidden lg:block">
                <span className="block text-3xl md:text-5xl font-bold text-white mb-2">25+</span>
                <span className="text-white/80 font-bold tracking-widest uppercase text-xs">Years of Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* International Tours */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 max-w-screen-2xl mx-auto overflow-hidden">
        <div className="mb-12 md:mb-16 text-center max-w-2xl mx-auto">
          <h6 className="font-manrope text-[#CD9933] font-bold text-sm tracking-[0.2em] uppercase mb-4">Beyond Borders</h6>
          <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">Discover the World</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Turkey */}
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[400px] xl:h-[500px] group cursor-pointer overflow-hidden rounded-lg">
            <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDo34TNKnDfPALrJLu5UciOIr7LARLN_xMd56yq9UtN280tkvjiEnxN3TtX2PclWHifVh-nu8QV_2cBRDHQyvPmPzZGIZNdK59dTjZS_Z7zyQnU3g6H9XtU6VzrOpldicf7vIybJnfw64PVqTVsjONncJK9U_xFuHg1W1wWMoj67jRKKTctsOdONWmyphd-lo0jqhdNTCIXpryZF3G0yfAhu2sIiRgcLLrXo2593SUcftSq5rTTctJCZOjzrrlvn1FRx-ijiWOD06Kn" alt="Turkey" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent"></div>
            <Link to="/international-tours" className="absolute bottom-8 left-8 right-8 text-white group cursor-pointer overflow-hidden rounded-lg block">
              <h3 className="font-notoSerif text-2xl font-bold mb-2">Turkey</h3>
              <p className="text-sm text-white/70 mb-4">Istanbul, Cappadocia, Antalya</p>
              <span className="inline-block border border-white/30 px-4 py-2 text-xs font-bold uppercase tracking-widest group-hover:bg-[#CD9933] group-hover:border-[#CD9933] transition-all">Explore Tour</span>
            </Link>
          </div>
          {/* Dubai */}
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[400px] xl:h-[500px] group cursor-pointer overflow-hidden rounded-lg">
            <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUQYOVnZnCAbJnFrX1nyML3VQoCv0DXi5Irz0Y73qxzjrCnv9Fjfew89pvxdv8ZCASmG7JXvm6ivVtlWSDgDNl6WD5Qkh9yA9ePoYhW5-2lqFxEm_UD-gdv3y855ixx1a4TNrQKs_YDGiCBrtJNtbyqSVu-OpnZy8NM7Q_OjK_9-EAJxvTxySJdH3PL-NHtQ5wCIWYnxE88P2f-rJ9uHs3kO3HDAd20k7SpB0jq8u4Sn1BDaHihQy3xKayJDzjSbhMkeSgMrymfb39" alt="Dubai" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent"></div>
            <Link to="/international-tours" className="absolute bottom-8 left-8 right-8 text-white">
              <h3 className="font-notoSerif text-2xl font-bold mb-2">Dubai</h3>
              <p className="text-sm text-white/70 mb-4">City Sights & Desert Safari</p>
              <span className="inline-block border border-white/30 px-4 py-2 text-xs font-bold uppercase tracking-widest">Explore Tour</span>
            </Link>
          </div>
          {/* Malaysia */}
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[400px] xl:h-[500px] group cursor-pointer overflow-hidden rounded-lg">
            <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3zaexyac9JYbgc7JJW579-lS9WPkAgTeUI7Z4f5Gl08eeqwiSxGeYnsEo-duQ9zPlj4ciIjAaAHQxZpJWRSzi7QTPiBvQTt5PnQL360TdVEtcUe8-A1xE2f5tRkgQevJB0FH9BEKMxS9GfArHkUk1mmMGLjWSTTIINCUnMLvlQIt-niCyleGQ6NoGhUF9wsVc4M84ENHV6AyrYG2HEoJD3DrsDsNwuv-5k4zPqoMOXRMxOHGoe_2H7qk6_JElzjsy7uAvRdhWRfDf" alt="Malaysia" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent"></div>
            <Link to="/international-tours" className="absolute bottom-8 left-8 right-8 text-white">
              <h3 className="font-notoSerif text-2xl font-bold mb-2">Malaysia</h3>
              <p className="text-sm text-white/70 mb-4">Kuala Lumpur & Genting</p>
              <span className="inline-block border border-white/30 px-4 py-2 text-xs font-bold uppercase tracking-widest">Explore Tour</span>
            </Link>
          </div>
          {/* Europe */}
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[400px] xl:h-[500px] group cursor-pointer overflow-hidden rounded-lg">
            <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBv-MVsZqKBwhFPBQ8VFiq3TU0N5EnqlsYH2DbJRB5qbT_Cq8D2o6SSJOfghgRCyIin6rAX9gA_gYojLbuUrx53KQNs5-IEFKUuQCSPDJADWJ4WR-wdlDFUu341hUW3bpPXn5i_22fhWnEfLqshrlO64tuM__-1f54SpwlxVe2bQGSh0jdBOS_x6jW2ttrKZoyb_W-fAUeq6l6DZazJ7KXpOFW-pVOA24jVsXFRRGsk7z2EjtSS0-inrhXqDyByLzKRQqLQX-m_UhJv" alt="Europe" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent"></div>
            <Link to="/international-tours" className="absolute bottom-8 left-8 right-8 text-white">
              <h3 className="font-notoSerif text-2xl font-bold mb-2">Europe</h3>
              <p className="text-sm text-white/70 mb-4">Paris, Swiss, Rome</p>
              <span className="inline-block border border-white/30 px-4 py-2 text-xs font-bold uppercase tracking-widest">Explore Tour</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-surface-container-high px-4 sm:px-6 md:px-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h6 className="font-manrope text-[#CD9933] font-bold text-sm tracking-[0.2em] uppercase mb-4">Client Feedback</h6>
            <h2 className="font-notoSerif text-3xl sm:text-4xl font-bold text-primary">Voices of Gratitude</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-surface-container-lowest p-4 md:p-8 rounded-xl editorial-shadow">
              <div className="flex gap-1 text-[#CD9933] mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="italic text-primary mb-8 leading-relaxed font-manrope">"Our Umrah journey with Royal Travels was flawless. From the visa process to the hotels being so close to the Haram, everything was perfectly managed. May Allah reward them."</p>
              <div className="flex items-center gap-4">
                <img className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFTFEGBCE5jXj6eM278TP2Ax109ogHPCfKt81ueziR3aYr7jMI04ENRCcJ4Vat5FMphSQMJq3NRdl6DUVSdm8nFooEXYlNGQI9_C-5B213ukaJ9Xj7hmEwYW6AVrwzbiywDR_z2CJefQ6hr6aFsVuYYVv5gR2huLiFxsi9Lb67BKod9sXjic742wH_Fn6ZYyp0h6ui-0gv-aNCzmnupdBLzGxeHzlxAg7MlFO_-ufV_NafC8G0jsnsNHvpAjTtcvlHuf-l48cgZVBe" alt="Customer" />
                <div>
                  <span className="block font-bold text-primary">Ahmed Raza</span>
                  <span className="text-xs text-outline uppercase">Karachi</span>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-4 md:p-8 rounded-xl editorial-shadow">
              <div className="flex gap-1 text-[#CD9933] mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="italic text-primary mb-8 leading-relaxed font-manrope">"I booked the Turkey tour for my family. The guide was incredibly knowledgeable and the itinerary wasn't rushed. A truly premium experience from start to finish."</p>
              <div className="flex items-center gap-4">
                <img className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYtBIK6gOk0mhtUl3IJw77r0t3KrPVBPzAB2jnlOFTw40N4dbTdNmMDE-o-U8B7NWRqYLJNQVU00R33NODc6-fQFpF_qS3HQ4Ns1jC3YE4UsVumzicObLswfujvAFvLEH0Y9sx8n-BgUJ3hw65lY6AVs22E27ixYB22eQgfF83wfON4Jmx6jrz8Mn1yAnrvpejNzMf0C5Hj_tA6fi78-r_1Q3QD5P1SQ7vY77p_Ao0y4L0T5GIOcS2hdFZFPs7IrUJSgzroNNbUpRq" alt="Customer" />
                <div>
                  <span className="block font-bold text-primary">Saba Khan</span>
                  <span className="text-xs text-outline uppercase">Lahore</span>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-4 md:p-8 rounded-xl editorial-shadow">
              <div className="flex gap-1 text-[#CD9933] mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="italic text-primary mb-8 leading-relaxed font-manrope">"The ground staff in Makkah were like family. They helped us with our elderly parents during Tawaaf. I highly recommend Royal Travels for their compassion."</p>
              <div className="flex items-center gap-4">
                <img className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCc5pUsNWCfg7tO9-yhbEhsmWLR3vQg8yhvrq9qB4GvnXb1unZaqrw0qOK-Hwi5u-JfvnYT0g1z0MtYppgRxP5iDR0XwPBCjXfWvQt0MPJwuIuJQPWqJLmAgYZYdnwi8iF415-FVPbgwE9pf8ASPKktSBaff--XmTPWezqEMdYXTyH94z6ov_Hillp9mm9rt9JPL-SAz8nvhrPKEMWuos3DBXCq-RAHeGlShRxei8Zj44aC41yTkVxlgBdbJTd6PS2-karlMjwZHSxh" alt="Customer" />
                <div>
                  <span className="block font-bold text-primary">Dr. Mohammad Ali</span>
                  <span className="text-xs text-outline uppercase">Islamabad</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto bg-[#013334] rounded-3xl p-8 md:p-12 lg:p-24 relative overflow-hidden text-center">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzZl7ucwK5x4LN8TYbepMGi6zw8pXI9uM1IenCObm9eIDWV8U9g4t27p9DX455ME3p-LHXGymUsXBQzH4U1TlrZ8H3YEz78O69LkPrLtNclC-XuXCxPrFm_2NDmixqQ3Cl3Bxbm2LMhvKoM-nAiokbr-I_0Q9k5656xbSpsNXu1kkcOytXqTSiaifP-ZQTWUzyKrIb9E5Zd3f5_x5_h2jVoVzylYIAIwKFlT_SETc8Sf3HujmmwyD5_vabrzwSEHSDJjxdxQHw5ns" alt="Silk Pattern" />
          </div>
          <div className="relative z-10">
            <h2 className="font-notoSerif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8">Book Your Umrah Journey Today</h2>
            <p className="text-white/70 text-base md:text-lg mb-8 md:mb-12 max-w-2xl mx-auto">Contact our travel consultants today to get a personalized quote for your spiritual or leisure travel needs.</p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/contact" className="bg-[#CD9933] text-white px-10 py-4 rounded-md font-bold text-lg hover:scale-105 transition-all">Get a Quote</Link>
              <Link to="/contact" className="bg-white/10 text-white border border-white/20 px-10 py-4 rounded-md font-bold text-lg backdrop-blur-md hover:bg-white/20 transition-all">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
