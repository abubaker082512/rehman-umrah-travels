import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'

const staticPackages = [
  {
    id: 1,
    title: 'Premium 5-Star Executive',
    location: 'Pullman ZamZam (150m from Haram)',
    price: 485000,
    days: '15 Days',
    airline: 'Qatar Airways',
    badge: 'Best Seller',
    badgeColor: 'bg-[#CD9933]',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdBRKj372X3XEdAkE-8DFUWUG3imKQ3ac1b9USL1W0C7BBcveBszqF8mJwUnrjm_5pqskUDnrMUG5yx4QEV-eq5AZXw1KY6sy0X29rpzsJ0PgTNtzNIKD6UJk5_i92ULJFJC4ETiDGG5sBM3I5psHDr_G9s4mWI7IBISEwh_FOp8XWve3y6kl_TDJzu-I1o55kkiAvkMjUJOG_qFJqigRHzs8XXys3tPtXSAhE7XP1c17NsdmgiYoT9NlK4oiCiDUJZtS4VqPVr2_y',
  },
  {
    id: 2,
    title: 'Silver 4-Star Comfort',
    location: 'Al-Shohada Hotel (300m from Haram)',
    price: 325000,
    days: '10 Days',
    airline: 'Saudi Airlines',
    badge: 'Popular Choice',
    badgeColor: 'bg-primary-container',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3_91cdPdyWpCst8uVkcSEkdZVScCJV50Uz8dmehZ72dVc-AfHZbJoQzWGsgyEAxSfLd4WFy_TcxoatRlFL9pYi7TlRzV0SRDbRgWohXX1z0OTxHqAQTG9iS5gpGUB5Z_H6pitDxZUMKSXLEM0yFiSDg8vEdV9EQFTltpcz7I4kc00gPiHi3Ng2O0p0E9HLJPYcB4wTjtqGLQVhxvHDrhAIguL_9WFBZysggur9-whO305qAImVClX1qsUEVVKYQmL9mKjsOC2BAkA',
  },
  {
    id: 3,
    title: 'Spiritual Ramadan 2024',
    location: 'Full Ramadan in Makkah & Madinah',
    price: 750000,
    days: '30 Days',
    airline: 'Full Iftar/Suhur',
    badge: '',
    badgeColor: '',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0LUe8DBs6mr578_8-2rCv85B1fSGUnt1I0JeY6VCP13gvKcXOSuQN20B8yyCGUalnauFjp-7PXrQHfZc81fClbi4Y51FKF3AgmNo_WAvbPfWwlMksw02OxLGeliL9fXwIDQy6zi6mBt72o6pbuQfNejTb2P8-MsB_LzXSulKKW6JIrcuX_AVIxvZtOvVNTcRjpRsjWlgLthPSmBMS7LQni7NObK0Z2NVuXC1Fwpyo0DA1bzO5JkQdnTpwDyIBxSRfImfbwrXaNF59',
  },
  {
    id: 4,
    title: 'Royal Suites Collection',
    location: 'Raffles Makkah (Inside Clock Tower)',
    price: 980000,
    days: '07 Days',
    airline: 'Private GMC Transfer',
    badge: 'Gold Standard',
    badgeColor: 'bg-[#CD9933]',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUqhQvXdmXntutgQNw439DJ2g4eby54ExQ7ovVzpherZzYoDIMWSfjuoq-pLcHYRa26UOYkjpll3nqA_UaSv0631v_QxoE7eujuTlkIq-R18tW4l1cM6J25NQ_lnmK7WjpXsbtJ0hmNiYQrzvh-U5FoYMQ_0y6HpIyCg5MUWVAnZpkpOnz4djr09D6mLQFN1gg0pbjNEZDCaRh2w_baUqbwlml3jMs6ck_bKp5H8wQ_YZyoJPk7e_YZJXJMy5WkLJZkJ31ORsCy_rb',
  },
]

const Packages = () => {
  const [packages, setPackages] = useState(staticPackages)

  useEffect(() => {
    axios.get('/api/packages')
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : []
        if (data.length > 0) setPackages(data)
      })
      .catch(() => {})
  }, [])

  return (
    <div className="bg-surface text-on-surface font-manrope">
      <Navbar />

      {/* Hero Header */}
      <header className="relative h-[409px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover opacity-30 grayscale contrast-125" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4NMCBl-fs_JwXhpSNh5wZDRuY3kj1glPRuI6GUCnwgY7RgshXtejdsIA_OMo1kWkl4aLrgrdh3RGeFeomHwml6Ye_UHMR_724sEpA6Uulrf9_aQjmkT-ADo-9hF60KH3OfXm8aB-XPBWvJ6YWjPnW0I-USoLZnkH5_AIbbmLUOXhodKo4PqQTCml7ShpBQCDSBl4P42qgkAUDOZl_6dXB_2l_l6AMVS93vp-cCDVZhyq59UOO1xgHVExeGK0gKwAgxabAYk5MLAgJ" alt="Umrah Packages" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#013334] via-[#013334]/80 to-surface"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="font-notoSerif text-5xl md:text-7xl font-bold text-[#CD9933] mb-4 tracking-tight">Umrah Packages</h1>
          <p className="text-white/70 max-w-2xl mx-auto font-manrope text-lg">Embark on a spiritual journey of a lifetime with our meticulously curated pilgrimage experiences.</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-2xl mx-auto px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Filter Sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-surface-container-low p-8 rounded-xl sticky top-24">
              <h2 className="font-notoSerif text-xl text-primary mb-8 border-b border-outline-variant/30 pb-4">Categories</h2>
              <nav className="space-y-6">
                <label className="flex items-center group cursor-pointer">
                  <input className="rounded border-outline-variant text-secondary focus:ring-secondary w-5 h-5" type="checkbox" />
                  <span className="ml-4 font-manrope text-on-surface group-hover:text-secondary transition-colors">Economy</span>
                </label>
                <label className="flex items-center group cursor-pointer">
                  <input className="rounded border-outline-variant text-secondary focus:ring-secondary w-5 h-5" type="checkbox" />
                  <span className="ml-4 font-manrope text-on-surface group-hover:text-secondary transition-colors">3 Star Packages</span>
                </label>
                <label className="flex items-center group cursor-pointer">
                  <input className="rounded border-outline-variant text-secondary focus:ring-secondary w-5 h-5" type="checkbox" />
                  <span className="ml-4 font-manrope text-on-surface group-hover:text-secondary transition-colors">4 Star Luxury</span>
                </label>
                <label className="flex items-center group cursor-pointer">
                  <input defaultChecked className="rounded border-outline-variant text-secondary focus:ring-secondary w-5 h-5" type="checkbox" />
                  <span className="ml-4 font-manrope text-secondary font-bold">5 Star Premium</span>
                </label>
                <label className="flex items-center group cursor-pointer">
                  <input className="rounded border-outline-variant text-secondary focus:ring-secondary w-5 h-5" type="checkbox" />
                  <span className="ml-4 font-manrope text-on-surface group-hover:text-secondary transition-colors">Ramadan 2024</span>
                </label>
                <label className="flex items-center group cursor-pointer">
                  <input className="rounded border-outline-variant text-secondary focus:ring-secondary w-5 h-5" type="checkbox" />
                  <span className="ml-4 font-manrope text-on-surface group-hover:text-secondary transition-colors">December Specials</span>
                </label>
              </nav>
              <div className="mt-12">
                <div className="p-6 bg-[#013334] rounded-lg text-white">
                  <p className="font-notoSerif text-lg mb-2">Need Guidance?</p>
                  <p className="text-sm opacity-70 mb-4">Our travel experts are available 24/7 for consultation.</p>
                  <button className="w-full py-3 bg-[#CD9933] text-white font-bold rounded hover:opacity-90 transition-colors text-sm">Enquire Now</button>
                </div>
              </div>
            </div>
          </aside>

          {/* Package Grid */}
          <section className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {(packages.length > 0 ? packages : staticPackages).map((pkg, i) => {
                const staticPkg = staticPackages[i % staticPackages.length]
                const image = pkg.image || staticPkg?.image
                const badge = pkg.badge || staticPkg?.badge || ''
                const badgeColor = pkg.badgeColor || staticPkg?.badgeColor || 'bg-[#CD9933]'
                const days = pkg.days || staticPkg?.days || '15 Days'
                const airline = pkg.airline || staticPkg?.airline || 'Qatar Airways'
                const price = typeof pkg.price === 'number' ? pkg.price : (parseFloat(String(pkg.price).replace(/[^0-9.]/g, '')) || 0)

                return (
                  <div key={pkg.id || i} className="bg-surface-container-lowest editorial-shadow rounded-xl overflow-hidden flex flex-col group">
                    <div className="relative h-72 overflow-hidden">
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={image} alt={pkg.title || pkg.name} />
                      {badge && (
                        <div className={`absolute top-4 left-4 ${badgeColor} text-white px-4 py-1 text-xs font-bold uppercase tracking-widest rounded`}>{badge}</div>
                      )}
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-notoSerif text-2xl text-primary font-bold">{pkg.title || pkg.name}</h3>
                          <div className="flex items-center mt-1 text-on-surface-variant text-sm">
                            <span className="material-symbols-outlined text-sm mr-1">location_on</span>
                            <span>{pkg.location || pkg.hotel || 'Makkah & Madinah'}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-on-surface-variant uppercase font-bold tracking-tighter">Starting from</div>
                          <div className="text-2xl font-notoSerif font-bold text-secondary">PKR {price > 0 ? price.toLocaleString() : 'N/A'}</div>
                        </div>
                      </div>
                      <div className="flex gap-4 mb-8 flex-wrap">
                        <div className="bg-surface-container flex items-center px-3 py-1 rounded text-xs font-medium">
                          <span className="material-symbols-outlined text-sm mr-2">calendar_today</span>{days}
                        </div>
                        <div className="bg-surface-container flex items-center px-3 py-1 rounded text-xs font-medium">
                          <span className="material-symbols-outlined text-sm mr-2">flight</span>{airline}
                        </div>
                      </div>
                      <div className="mt-auto grid grid-cols-2 gap-4">
                        <Link to={`/package/${pkg.id || pkg._id || i + 1}`} className="py-3 bg-[#CD9933]/10 text-[#CD9933] font-bold rounded-md hover:bg-[#CD9933]/20 transition-colors border border-[#CD9933]/20 text-sm text-center">View Details</Link>
                        <button className="py-3 bg-[#013334] text-white font-bold rounded-md hover:bg-primary transition-colors text-sm">Book Now</button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      </main>

      {/* WhatsApp FAB */}
      <div className="fixed bottom-8 right-8 z-[9999] group">
        <div className="flex flex-col items-center gap-2">
          <span className="bg-white/80 backdrop-blur-md text-[#CD9933] font-manrope font-bold text-[10px] uppercase px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">WhatsApp Support</span>
          <div className="bg-white/80 backdrop-blur-md text-[#CD9933] rounded-full p-4 w-16 h-16 flex items-center justify-center shadow-2xl shadow-[#013334]/20 border border-[#CD9933]/15 animate-bounce cursor-pointer hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">chat</span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Packages
