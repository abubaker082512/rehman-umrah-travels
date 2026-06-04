import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import ScrollReveal from '../components/ScrollReveal'
import packagesHeroImg from '../assets/home-3.jpg'
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
    location: 'Fundaq Mayer Mayassar (Makkah) & Fursan Al Madinah (Madinah)',
    price: 209500,
    days: '21 Nights',
    duration: '21 Nights',
    airline: 'Air Blue',
    badge: '21 Nights',
    badgeColor: 'bg-[#013334]',
    category: 'Economy',
    image: 'https://images.unsplash.com/photo-1591604129909-2b4ce4e6e6d2?w=800',
  },
  {
    id: 402,
    title: '21 Nights Comfort Economy Saver',
    location: 'Jedat Al Khalil (Makkah) & Karam Ajyad Hotel (Madinah)',
    price: 224500,
    days: '21 Nights',
    duration: '21 Nights',
    airline: 'PIA',
    badge: '21 Nights',
    badgeColor: 'bg-[#013334]',
    category: 'Economy',
    image: 'https://images.unsplash.com/photo-1564769662533-3f5aae93cec2?w=800',
  },
  {
    id: 403,
    title: '21 Nights Ajyad Standard Economy',
    location: 'Al Juhani Ajyad Hotel (Makkah) & Al Ikram Palace (Madinah)',
    price: 235500,
    days: '21 Nights',
    duration: '21 Nights',
    airline: 'Saudi Airlines',
    badge: '21 Nights',
    badgeColor: 'bg-[#013334]',
    category: 'Economy',
    image: 'https://images.unsplash.com/photo-1596435688717-2d2f3b0fc47a?w=800',
  },
  {
    id: 404,
    title: '21 Nights Extended Special Economy',
    location: 'Maather Al Jiwaar Hotel (Makkah) & Orjawan Al Madinah (Madinah)',
    price: 251500,
    days: '21 Nights',
    duration: '21 Nights',
    airline: 'Air Blue',
    badge: '21 Nights',
    badgeColor: 'bg-[#013334]',
    category: 'Economy',
    image: 'https://images.unsplash.com/photo-1518655044366-5c5abf0cf1f4?w=800',
  },
  {
    id: 501,
    title: '14 Nights 3 Star Comfort Umrah',
    location: 'Al Aseel Ajyad (Makkah)',
    price: 245500,
    days: '14 Nights',
    duration: '14 Nights',
    airline: 'PIA',
    badge: 'Best Seller',
    badgeColor: 'bg-[#CD9933]',
    category: '3 Star',
    image: 'https://images.unsplash.com/photo-1564769662533-3f5aae93cec2?w=800',
  },
  {
    id: 601,
    title: '14 Nights 4 Star Premium Umrah',
    location: 'Ramada Dar Al Faiyzeen (Makkah)',
    price: 284000,
    days: '14 Nights',
    duration: '14 Nights',
    airline: 'Saudi Airlines',
    badge: 'Premium Comfort',
    badgeColor: 'bg-[#013334]',
    category: '4 Star',
    image: 'https://images.unsplash.com/photo-1580338834642-8a3acf79b1b8?w=800',
  },
  {
    id: 701,
    title: '14 Nights 5 Star Cheap Luxury',
    location: 'Holiday Inn Makkah (Makkah)',
    price: 289500,
    days: '14 Nights',
    duration: '14 Nights',
    airline: 'Emirates',
    badge: 'Cheap Luxury',
    badgeColor: 'bg-[#CD9933]',
    category: '5 Star',
    image: 'https://images.unsplash.com/photo-1596435688717-2d2f3b0fc47a?w=800',
  }
]

const Packages = () => {
  const [packages, setPackages] = useState(staticPackages)
  const [pageMedia, setPageMedia] = useState({})
  const [searchParams] = useSearchParams()
  const [selectedCategories, setSelectedCategories] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0)
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      if (categoryParam === 'economy') {
        setSelectedCategories(['Economy Package'])
      } else if (categoryParam === '3star') {
        setSelectedCategories(['3 Star Packages'])
      } else if (categoryParam === '4star') {
        setSelectedCategories(['4 Star Packages'])
      } else if (categoryParam === '5star') {
        setSelectedCategories(['5 Star Packages'])
      }
    }
  }, [searchParams])

  const handleCategoryChange = (categoryName) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryName)) {
        return prev.filter(c => c !== categoryName)
      } else {
        return [...prev, categoryName]
      }
    })
  }

  const matchesCategory = (pkg) => {
    if (selectedCategories.length === 0) return true
    
    const categoryLower = (pkg.category || '').toLowerCase().trim()
    
    return selectedCategories.some(cat => {
      if (cat === 'Economy Package' || cat === 'Economy') {
        return categoryLower === 'economy'
      }
      if (cat === '3 Star Packages' || cat === '3 Star') {
        return categoryLower === '3 star'
      }
      if (cat === '4 Star Packages' || cat === '4 Star') {
        return categoryLower === '4 star'
      }
      if (cat === '5 Star Packages' || cat === '5 Star') {
        return categoryLower === '5 star'
      }
      return false
    })
  }

  useEffect(() => {
    axios.get(`${API_BASE}/api/packages`)
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setPackages(res.data)
        }
      })
      .catch((err) => {
        console.error('Failed to fetch packages:', err)
      })

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

  return (
    <div className="bg-surface font-manrope text-on-surface">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" src={packagesHeroImg} alt="Makkah" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-24 w-full">
          <div className="max-w-3xl">
            <div className="w-12 h-1 bg-[#CD9933] mb-6 md:mb-8"></div>
            <h1 className="font-notoSerif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Curated <span className="text-[#CD9933]">Umrah Packages</span>
            </h1>
            <p className="font-manrope text-base md:text-lg text-white/80 max-w-xl mb-8">
              Embark on a spiritual journey of a lifetime with our meticulously curated pilgrimage experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
          {/* Filter Sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-surface-container-lowest p-4 md:p-6 lg:p-8 editorial-shadow lg:sticky lg:top-24">
              <h2 className="font-notoSerif text-xl text-primary mb-8 border-b border-outline-variant/30 pb-4">Categories</h2>
              <nav className="space-y-6">
                {[
                  'Economy Package',
                  '3 Star Packages',
                  '4 Star Packages',
                  '5 Star Packages'
                ].map((cat, i) => {
                  const isChecked = selectedCategories.includes(cat);
                  return (
                    <label key={i} className="flex items-center group cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCategoryChange(cat)}
                        className="rounded border-outline-variant text-[#CD9933] focus:ring-[#CD9933] w-5 h-5 cursor-pointer"
                      />
                      <span className={`ml-4 font-manrope transition-colors ${isChecked ? 'text-[#CD9933] font-bold' : 'text-on-surface group-hover:text-[#CD9933]'}`}>
                        {cat}
                      </span>
                    </label>
                  );
                })}
              </nav>
              <div className="mt-12">
                <div className="p-6 bg-[#013334] rounded-lg text-white">
                  <p className="font-notoSerif text-lg mb-2">Need Guidance?</p>
                  <p className="text-sm opacity-70 mb-4">Our travel experts are available 24/7 for consultation.</p>
                  <Link to="/contact" className="block w-full py-3 bg-[#CD9933] text-white font-bold rounded hover:brightness-110 transition-colors text-sm text-center">Enquire Now</Link>
                </div>
              </div>
            </div>
          </aside>

          {/* Package Grid */}
          <section className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              {(() => {
                const filtered = (packages.length > 0 ? packages : staticPackages).filter(matchesCategory);
                if (filtered.length === 0) {
                  return (
                    <div className="col-span-full py-16 text-center text-white/50 bg-[#013334] rounded-xl border border-white/5 shadow-inner">
                      <span className="material-symbols-outlined text-4xl text-[#CD9933] mb-4">info</span>
                      <p className="font-notoSerif text-lg font-bold">No Packages Found</p>
                      <p className="text-sm text-white/45 mt-2">Try adjusting your category filters.</p>
                    </div>
                  );
                }
                return filtered.map((pkg, i) => {
                  const staticPkg = staticPackages.find(sp => String(sp.id) === String(pkg.id))
                  const category = (pkg.category || staticPkg?.category || '').toLowerCase().trim()
                  let cardImage = pkg.image_url || pkg.image || staticPkg?.image

                  // Use premium local Kaaba/Masjid Nabawi graphics for packages cards to prevent failure and match Home3 style
                  if (!cardImage || cardImage.includes('unsplash.com')) {
                    if (category.includes('economy')) cardImage = economyPackagesImg
                    else if (category.includes('3 star')) cardImage = star3PackagesImg
                    else if (category.includes('4 star')) cardImage = star4PackagesImg
                    else if (category.includes('5 star')) cardImage = star5PackagesImg
                    else cardImage = star3PackagesImg
                  }

                  const badge = pkg.badge || staticPkg?.badge || ''
                  const badgeColor = pkg.badgeColor || staticPkg?.badgeColor || 'bg-[#CD9933]'
                  const days = pkg.days || pkg.duration || staticPkg?.days || '15 Days'
                  const airline = pkg.airline || pkg.airline || staticPkg?.airline || 'Qatar Airways'
                  const price = typeof pkg.price === 'number' ? pkg.price : (parseFloat(String(pkg.price).replace(/[^0-9.]/g, '')) || 0)

                  return (
                    <ScrollReveal
                      key={pkg.id || i}
                      delay={(i % 2) * 150}
                      animation="fade-up"
                      duration={700}
                    >
                      <div className="bg-[#013334] border border-[#CD9933]/15 hover:border-[#CD9933]/40 rounded-xl overflow-hidden flex flex-col group cursor-pointer transition-transform hover:-translate-y-1 h-full shadow-lg hover:shadow-2xl text-white">
                        <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden">
                          <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 asymmetric-clip" src={getProxyUrl(cardImage)} alt={pkg.title || pkg.name} />
                          {badge && (
                            <div className={`absolute top-4 left-4 ${badgeColor} text-white px-4 py-1 text-xs font-bold uppercase tracking-widest rounded shadow-md`}>{badge}</div>
                          )}
                          {pkg.visa_included && (
                            <div className="absolute top-4 right-4 bg-[#CD9933] text-white px-4 py-1 text-xs font-bold uppercase tracking-widest rounded shadow-md">Visa Included</div>
                          )}
                        </div>
                        <div className="p-4 md:p-6 lg:p-8 flex-1 flex flex-col justify-between">
                          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-6">
                            <div>
                              <h3 className="font-notoSerif text-2xl text-[#CD9933] font-bold group-hover:text-white transition-colors">{pkg.title || pkg.name}</h3>
                              <div className="flex items-center mt-1 text-white/70 text-sm">
                                <span className="material-symbols-outlined text-sm mr-2 text-[#CD9933]">location_on</span>
                                <span>{pkg.location || pkg.hotel || 'Makkah & Madinah'}</span>
                              </div>
                            </div>
                            <div className="text-left sm:text-right">
                              <div className="text-xs text-white/50 uppercase font-bold tracking-tighter">Starting from</div>
                              <div className="text-2xl font-notoSerif font-bold text-[#CD9933]">PKR {price > 0 ? price.toLocaleString() : 'N/A'}</div>
                            </div>
                          </div>
                          <div className="flex gap-4 mb-8 flex-wrap">
                            <div className="bg-white/5 border border-white/10 text-white flex items-center px-3 py-1 rounded text-xs font-medium">
                              <span className="material-symbols-outlined text-sm mr-2 text-[#CD9933]">calendar_today</span>{days}
                            </div>
                            <div className="bg-white/5 border border-white/10 text-white flex items-center px-3 py-1 rounded text-xs font-medium">
                              <span className="material-symbols-outlined text-sm mr-2 text-[#CD9933]">flight</span>{airline}
                            </div>
                          </div>
                          <div className="mt-auto grid grid-cols-2 gap-4">
                            <Link to={`/package/${pkg.id || pkg._id || i + 1}`} className="py-3 bg-white/5 text-white font-bold rounded-md hover:bg-[#CD9933] hover:text-[#013334] border border-white/10 hover:border-[#CD9933] transition-all text-sm text-center">View Details</Link>
                            <Link to="/contact" className="py-3 bg-[#CD9933] text-white font-bold rounded-md hover:bg-[#b08025] transition-colors text-sm text-center">Book Now</Link>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                });
              })()}
            </div>
          </section>
        </div>
      </main>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary-container relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1465378977933-3f5aae93cec2?w=800" alt="Pattern" />
        </div>
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 text-center">
          <h6 className="font-manrope text-[#CD9933] font-bold text-sm tracking-[0.2em] uppercase mb-4">Ready to Begin?</h6>
          <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Book Your Umrah Journey Today</h2>
          <p className="text-white/60 mb-10 max-w-xl mx-auto">Contact our travel experts to get a personalized quote and start your spiritual journey.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-[#CD9933] text-white px-10 py-4 font-manrope font-bold tracking-widest uppercase text-sm hover:brightness-110 transition-all">Get a Quote</Link>
            <Link to="/international-tours" className="border border-white/30 text-white px-10 py-4 font-manrope font-bold tracking-widest uppercase text-sm hover:bg-white/10 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined">flight</span>
              Explore Tours
            </Link>
          </div>
        </div>
      </section>

      {/* WhatsApp FAB */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[9999] group">
        <div className="flex flex-col items-center gap-2">
          <span className="bg-white/80 backdrop-blur-md text-[#CD9933] font-manrope font-bold text-[10px] uppercase px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">WhatsApp Support</span>
          <div className="bg-white/80 backdrop-blur-md text-[#CD9933] rounded-full p-3 md:p-4 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shadow-2xl shadow-[#013334]/20 border border-[#CD9933]/15 animate-bounce cursor-pointer hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-2xl md:text-3xl">chat</span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Packages