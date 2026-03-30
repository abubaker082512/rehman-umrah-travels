import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'

const PackageDetail = () => {
  const { id } = useParams()
  const [pkg, setPkg] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    axios.get(`/api/packages/${id}`)
      .then(res => {
        setPkg(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching package details:', err)
        setError('Failed to load package details. It may have been removed.')
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

  if (error || !pkg) {
    return (
      <div className="bg-surface font-manrope text-on-surface min-h-screen flex flex-col items-center justify-center">
        <Navbar />
        <div className="text-center mt-24">
          <span className="material-symbols-outlined text-6xl text-error mb-4 block">error</span>
          <h2 className="font-notoSerif text-3xl text-primary mb-4">{error || 'Package Not Found'}</h2>
          <Link to="/packages" className="bg-[#CD9933] text-white px-8 py-3 rounded font-bold uppercase tracking-widest text-sm inline-block mt-4">Browse All Packages</Link>
        </div>
      </div>
    )
  }

  const price = typeof pkg.price === 'number' ? pkg.price : (parseFloat(String(pkg.price).replace(/[^0-9.]/g, '')) || 0)
  const hotelName = pkg.hotel_name || pkg.hotelName || pkg.location || 'Premium Hotel'
  const distance = pkg.distance_from_haram || pkg.distanceFromHaram || 'Steps to Haram'

  return (
    <div className="bg-surface font-manrope text-on-surface">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section & Gallery */}
        <section className="max-w-screen-2xl mx-auto px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-secondary-container/20 text-secondary font-bold text-xs tracking-widest uppercase px-3 py-1 rounded">{pkg.category || 'Premium Collection'}</span>
                <div className="flex text-[#CD9933]">
                  {Array.from({ length: pkg.stars || 5 }).map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  ))}
                </div>
              </div>
              <h1 className="font-notoSerif text-5xl md:text-7xl text-primary leading-tight tracking-tight">{pkg.title || 'Umrah Journey'}</h1>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <p className="text-outline font-medium mb-2">Starting from</p>
              <div className="font-notoSerif text-4xl text-primary">PKR {price.toLocaleString()} <span className="text-lg font-manrope text-outline font-normal">/ person</span></div>
            </div>
          </div>

          {/* Asymmetric Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-10 gap-4 h-[600px]">
            <div className="md:col-span-2 lg:col-span-5 rounded-xl overflow-hidden relative group">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={pkg.image_url || pkg.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuC_umMwNrlCdZQQHw-gkNmIlvZ1RKy4ljfjZeHztDWu0Wgt9uTVwcC8SCXvvdKqtiQ8v5oNtA7grwHPXPG15OXDFYiqHvhKUVG17-erSKGUK7O2pmJY9mWZ8iyijELGBy-NB61ei7aEg5jsvtpBXbL0ND3vwZ9Ne6f9J7_W6D_0YJrVDA7ESbokU67XJ37dAjbcdx3wsCdGyi4dHRNDLRtl1twWIlv-M0rr3r0kY69jtOec16g7y6ZNh513s3PPjOvnH00dJr_aRChe"} alt={pkg.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white text-left">
                <p className="font-notoSerif text-2xl text-left">{pkg.location || 'Makkah Al-Mukarramah'}</p>
                <p className="text-sm text-white/80 text-left">{pkg.duration || 'Full Stay'}</p>
              </div>
            </div>
            <div className="md:col-span-2 lg:col-span-3 rounded-xl overflow-hidden relative group">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoKHIP0C3QMaqa0Klr2dM78ntz2OMNGskdqZpgaSJ-t6CzhN9wtM0mVM_VfSXuA51y498oLIAKD-uoj3lEBnBE8WmcWNOLOSOq9dH9S0lGZIfFBT1ZhI-DDgNOWBLRTwE3G7J0rMP7EcoWJ320MQ5b4uQ8mPqH3otJS4kmYLSdyP7CkobPzxStF_dClqG1HjjpMwEyFmBv7FGdx4exw17NjJDYM-FTizn97bzsUtNLtNiN42PQQll7lzJbJk6og1ghe9D9P9QPzoGt" alt="Madinah" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white text-left">
                <p className="font-notoSerif text-xl text-left">Al-Madinah Al-Munawwarah</p>
                <p className="text-sm text-white/80 text-left">4 Nights Stay</p>
              </div>
            </div>
            <div className="hidden lg:flex lg:col-span-2 flex-col gap-4">
              <div className="h-1/2 rounded-xl overflow-hidden">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs-3qmKoW98IM_J_X3Q_aTrfuMrpa0_3OEjthRGCUB3jHEcoo3_pKG4Oc4qprPrX2t2bV2igc5DhVOvihYbZ1LHhdYartl4G_OfY20PW3BKvQQzMU_4vrcW6KOEn9ZAp5JZ95sXIPWOxpX3I5QnoN_i0EJxbTSJCDLTBRNYvi6ADIWgJTYv5Dzkguq6ZwJF9kECE-NIvWKZ9-IAtiVhkP6mgVUlUExzGaqXYVzzApG0yi7rZPIjwTYX7m1d4SFtXN5dKyEBTdqNaO7" alt="Hotel" />
              </div>
              <div className="h-1/2 rounded-xl bg-[#CD9933] flex items-center justify-center p-8 text-center text-white">
                <div>
                  <span className="material-symbols-outlined text-4xl mb-2">photo_library</span>
                  <p className="font-bold text-sm uppercase tracking-widest">View 24+ Photos</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="bg-surface-container-low py-24 relative overflow-hidden">
          <div className="max-w-screen-2xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
            {/* Left Column: Details */}
            <div className="lg:col-span-8 space-y-24">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow">
                  <span className="material-symbols-outlined text-secondary text-3xl mb-4 text-left block">calendar_today</span>
                  <h3 className="font-notoSerif text-lg mb-1 text-left">Duration</h3>
                  <p className="text-outline text-sm text-left">{pkg.duration || 'Custom'}</p>
                </div>
                <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow">
                  <span className="material-symbols-outlined text-secondary text-3xl mb-4 text-left block">hotel</span>
                  <h3 className="font-notoSerif text-lg mb-1 text-left">Accommodation</h3>
                  <p className="text-outline text-sm text-left">{pkg.category || 'Premium'}</p>
                </div>
                <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow">
                  <span className="material-symbols-outlined text-secondary text-3xl mb-4 text-left block">flight</span>
                  <h3 className="font-notoSerif text-lg mb-1 text-left">Flight</h3>
                  <p className="text-outline text-sm text-left">{pkg.airline || 'Included'}</p>
                </div>
              </div>
              
              {/* Hotel Info */}
              <div>
                <h2 className="font-notoSerif text-3xl mb-12 flex items-center gap-4 text-left">
                  {pkg.category === '5 Star' ? 'Premium Accommodations' : 'Comfortable Stays'}
                  <span className="h-px flex-grow bg-outline-variant/30"></span>
                </h2>
                <div className="space-y-12">
                  <div className="flex flex-col md:flex-row gap-8 items-center bg-surface-container-lowest p-6 rounded-xl editorial-shadow">
                    <img className="w-full md:w-64 h-48 object-cover rounded-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1OLKkdBZ3EeqXXVHssUEB0VLG6ldeYaU6CeQKf32v7DhdxLPfXHwZgFw0L0SIfFbEW-E2ZPeCmWolwPc_H4eGwMY6AGBIlc9iE6QtlnAwClvChfGJ2WFxpHV3Wvl4-O5pzXpJrEqFrrNvdGX4YZ42rTQZtp6Xxg4XGSNpu0rjTO_ml8iusR25IJ7SzuoYoHsJIsXadQR82HujxI-MAn7l2lmossX-0yHiTzCwnz0O3PnvewQ-Oj4I7NFvdXM_ctpezHicx3LxQx4c" alt="Hotel" />
                    <div className="flex-grow text-left">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-1 text-left">Makkah & Madinah</p>
                          <h4 className="font-notoSerif text-2xl mb-2 text-left">{hotelName}</h4>
                        </div>
                        <div className="bg-surface-container text-xs px-2 py-1 rounded font-bold">{distance}</div>
                      </div>
                      <p className="text-outline text-sm leading-relaxed mb-4 text-left">{pkg.description || 'Centrally located accommodations for your spiritual journey.'}</p>
                      <div className="flex gap-4">
                        <span className="flex items-center gap-1 text-xs font-bold"><span className="material-symbols-outlined text-sm">ac_unit</span> Central AC</span>
                        <span className="flex items-center gap-1 text-xs font-bold"><span className="material-symbols-outlined text-sm">room_service</span> 24/7 Support</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services Checklist */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                <div>
                  <h3 className="font-notoSerif text-xl mb-6 text-left">What's Included</h3>
                  <ul className="space-y-4">
                    {(pkg.includes || ['Visa Processing', 'Flights', 'Ground Transport', 'Guided Tours']).map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-left">
                        <span className="material-symbols-outlined text-secondary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-notoSerif text-xl mb-6 text-left">Not Included</h3>
                  <ul className="space-y-4 text-left">
                    <li className="flex items-center gap-3 text-sm text-outline text-left">
                      <span className="material-symbols-outlined text-error/40 text-lg">cancel</span>
                      Personal shopping & extra meals
                    </li>
                    <li className="flex items-center gap-3 text-sm text-outline text-left">
                      <span className="material-symbols-outlined text-error/40 text-lg">cancel</span>
                      Travel and health insurance
                    </li>
                    <li className="flex items-center gap-3 text-sm text-outline text-left">
                      <span className="material-symbols-outlined text-error/40 text-lg">cancel</span>
                      Excess baggage fees
                    </li>
                  </ul>
                </div>
              </div>

              {/* Itinerary Timeline */}
              {pkg.itinerary && pkg.itinerary.length > 0 && (
                <div className="text-left">
                  <h2 className="font-notoSerif text-3xl mb-12 text-left">Journey Itinerary</h2>
                  <div className="relative pl-8 border-l-2 border-dashed border-secondary/30 ml-4 space-y-12">
                    {pkg.itinerary.map((step, idx) => {
                      const isLast = idx === pkg.itinerary.length - 1;
                      return (
                        <div key={idx} className="relative text-left">
                          <div className={`absolute -left-[41px] top-0 w-4 h-4 rounded-full ring-4 ${isLast ? 'bg-[#CD9933] ring-[#CD9933]/20' : 'bg-secondary ring-secondary/20'}`}></div>
                          <p className="text-secondary font-bold text-xs uppercase mb-1 text-left">{step.day}</p>
                          <h4 className="font-notoSerif text-lg mb-2 text-left">{step.title}</h4>
                          <p className="text-outline text-sm leading-relaxed text-left">{step.description}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Booking Form */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 bg-surface-container-lowest p-8 rounded-xl editorial-shadow border border-outline-variant/10 text-left">
                <div className="text-center mb-8">
                  <h3 className="font-notoSerif text-2xl mb-2">Plan Your Journey</h3>
                  <p className="text-outline text-xs">Fill the form below, and our spiritual consultant will contact you within 24 hours.</p>
                </div>
                <form className="space-y-6 text-left">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-1 text-left">Full Name</label>
                    <input className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-secondary focus:ring-0 transition-colors py-2 text-sm text-left" placeholder="Enter your name" type="text" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-1 text-left">Phone Number</label>
                    <input className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-secondary focus:ring-0 transition-colors py-2 text-sm text-left" placeholder="+92 XXXXX XXXXX" type="tel" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-left">
                      <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-1 text-left">City</label>
                      <input className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-secondary focus:ring-0 transition-colors py-2 text-sm text-left" placeholder="e.g. Lahore" type="text" />
                    </div>
                    <div className="text-left">
                      <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-1 text-left">Travelers</label>
                      <select className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-secondary focus:ring-0 transition-colors py-2 text-sm appearance-none text-left">
                        <option>01 Person</option>
                        <option selected>02 Persons</option>
                        <option>04+ Persons</option>
                      </select>
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-secondary to-[#f6bd54] text-white py-4 rounded-md font-bold text-sm tracking-widest uppercase shadow-lg shadow-secondary/20 hover:scale-[1.02] transition-transform" type="submit">Send Inquiry</button>
                </form>
                <div className="mt-8 pt-8 border-t border-outline-variant/20 text-center">
                  <p className="text-xs text-outline mb-4">Or connect instantly via</p>
                  <a className="inline-flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors" href="#">
                    <span className="material-symbols-outlined">chat</span>
                    WhatsApp Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default PackageDetail
