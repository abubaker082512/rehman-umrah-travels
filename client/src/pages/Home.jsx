import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className="bg-surface font-manrope text-on-surface">
      <Navbar />
      
      {/* SideNavBar (WhatsApp FAB) */}
      <div className="fixed bottom-8 right-8 z-[9999] group">
        <div className="flex flex-col items-center gap-2">
          <span className="bg-white/80 backdrop-blur-md text-[#CD9933] font-manrope font-bold text-[10px] uppercase px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">WhatsApp Support</span>
          <div className="bg-white/80 dark:bg-black/80 backdrop-blur-md text-[#CD9933] rounded-full p-4 w-16 h-16 flex items-center justify-center shadow-2xl shadow-[#013334]/20 border border-[#CD9933]/15 animate-bounce duration-[2000ms] cursor-pointer hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">chat</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBubkTzEiGLq9ecV5_P_POI2om-XGLtBdG4UhZ6Z2FTNoko77ZP0hrzDRjD1aq1xPF-psQ32LnNFxg5sr3ZK0lrA7GhF4a595_Mgjp4euDQqJzGNNOMK2lPWFL6tklR8Q5zp3ootIYqJ-zH4z2AJTQgItEet4mbPUh2a-2NMMX7dqqaMpz4LVQkMc_2Mhd5Xlaw5dikwbzDN1ckBtHfsFsVohx7APcLJLU0OSBcS_E6dfIgQwo_aIUkSmIgk_cNCfeXZpd20jDUPAvp" alt="Makkah" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-8 lg:px-24 w-full">
          <div className="max-w-3xl">
            <div className="w-12 h-1 bg-[#CD9933] mb-8"></div>
            <h1 className="font-notoSerif text-5xl lg:text-7xl font-bold text-white leading-tight mb-8">
              Your Trusted Partner for <span className="text-[#CD9933]">Umrah</span> & International Tours
            </h1>
            <p className="font-manrope text-lg text-white/80 mb-12 max-w-xl">
              Embark on a spiritual journey of a lifetime with our premium, all-inclusive Umrah packages and bespoke international travel experiences.
            </p>
            <div className="flex flex-wrap gap-6">
              <button className="bg-[#CD9933] hover:bg-[#b88a2e] text-white px-8 py-4 rounded-md font-bold transition-all shadow-lg flex items-center gap-2">
                View Umrah Packages
              </button>
              <button className="bg-transparent border border-[#CD9933]/40 hover:bg-[#CD9933]/10 text-white px-8 py-4 rounded-md font-bold transition-all flex items-center gap-2 backdrop-blur-sm">
                <span className="material-symbols-outlined">chat</span>
                Contact on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Package Search */}
      <div className="relative z-20 max-w-6xl mx-auto -mt-24 px-4">
        <div className="bg-surface-container-lowest editorial-shadow p-8 rounded-xl flex flex-wrap lg:flex-nowrap gap-6 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block font-manrope text-xs font-bold uppercase text-outline mb-2">Departure City</label>
            <select className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-[#CD9933] font-manrope text-sm py-2 px-0">
              <option>Karachi</option>
              <option>Lahore</option>
              <option>Islamabad</option>
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block font-manrope text-xs font-bold uppercase text-outline mb-2">Month</label>
            <select className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-[#CD9933] font-manrope text-sm py-2 px-0">
              <option>September 2024</option>
              <option>October 2024</option>
              <option>Ramadan 2025</option>
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
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
      <section className="py-24 px-8 max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <h6 className="font-manrope text-[#CD9933] font-bold text-sm tracking-[0.2em] uppercase mb-4">Spiritual Journeys</h6>
            <h2 className="font-notoSerif text-4xl lg:text-5xl font-bold text-primary leading-tight">Curated Umrah Packages</h2>
          </div>
          <Link className="text-primary font-bold border-b-2 border-[#CD9933] pb-1 mt-6 md:mt-0 transition-all hover:pr-4" to="/packages">View All Packages</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Economy */}
          <div className="bg-surface-container-low group cursor-pointer">
            <div className="relative h-64 overflow-hidden rounded-t-xl lg:rounded-tr-none">
              <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4Q8F_FtsvuFZGVJy2M4mCNPoPdVIucrb-qLz9KMrRnHu2y4jEomHtxH3XbUIIyVb7fx_R8ZKzpO6JLW8a6r4u3ZLuupgq0zzie6njk5Tfw4CBH4smAeMF-b77uxEfjcwrfE0bWG20icpPBH2u6gYRsM9m3qcQKyoCWfFKdTlc4W1zTDVSW_X8tKo7HpcqPSaj9bPBqhdRYe8qu6UWesjRMAZC1_LwgtnBhuYiFBjcxkTV8czsNli9D9lT7GLzq0jlRAJJ2hm4V7JG" alt="Economy" />
              <div className="absolute top-4 left-4 bg-[#013334] text-white text-[10px] font-bold px-3 py-1 tracking-widest uppercase">Economy</div>
            </div>
            <div className="p-6">
              <h3 className="font-notoSerif text-xl font-bold text-primary mb-2">Economy Saver</h3>
              <p className="text-outline text-sm mb-4">Saraya Iman (Makkah) • 15 Days</p>
              <div className="flex items-center justify-between mt-6">
                <div>
                  <span className="block text-xs text-outline">Starting from</span>
                  <span className="text-xl font-extrabold text-[#CD9933]">PKR 185,000</span>
                </div>
                <span className="material-symbols-outlined text-[#CD9933] group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </div>
            </div>
          </div>
          {/* 3 Star */}
          {/* ... Add other package cards similarly ... */}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-primary-container relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7iqIMSWjJemycSurDzLS49I7vf1E_Ir_9JNdo7vnnjUs42efP_S1dgqe2xI0QDJaKbHo9ZRkqvdYo1bYcwBvEnTPhPclF1OSmgOVghrFtvqeq5b92V1yjUro0sxR_GnE1BNCqYps0QKr0yc_d2G0_23gzKUpiz3nt2gERaWgkbPWLcVYUd6z7noGPOWbDAz3zrOwnleugBBJWc52v2BSX_rOZLmuCn0bBOWhLLmTx7ip4AO3yKpRp0shQrdTuKpNfm0QTUA_N0WM8" alt="Pattern" />
        </div>
        <div className="max-w-screen-2xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="font-notoSerif text-4xl lg:text-5xl font-bold text-white mb-12">Setting a Sacred Standard for Travel</h2>
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
              </div>
            </div>
            <div className="relative">
              <img className="rounded-xl editorial-shadow w-full h-[600px] object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGJr-PkCTbw2r-UbQwF17jWJZejPxRPpHZrMMerpfj2Dedl3aNiEtLUIt6uy0_l0y7RuUJvb4hE6eh-EuaIDrmOJ58cgOtfefFncGbp5yTjtSGMTFIpVFqNI-60_TRcCnPdbR4YBcfePrjheIpBnC3JZtzkkK1AkzXgy0wmuJMEmoxERn8tO3VjO33bJ8urtkI_zoedo3s-FyyVTjBFcSmNV7CX2cajChEUrqwldzPNnYqUwq1UAaY7pN8n0d1cpNoWUWoN5IHD0kl" alt="Architecture" />
              <div className="absolute -bottom-10 -left-10 bg-[#CD9933] p-10 rounded-xl hidden xl:block">
                <span className="block text-5xl font-bold text-white mb-2">25+</span>
                <span className="text-white/80 font-bold tracking-widest uppercase text-xs">Years of Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
