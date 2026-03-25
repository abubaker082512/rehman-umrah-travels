import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const PackageDetail = () => {
  return (
    <div className="bg-surface font-manrope text-on-surface">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section & Gallery */}
        <section className="max-w-screen-2xl mx-auto px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-secondary-container/20 text-secondary font-bold text-xs tracking-widest uppercase px-3 py-1 rounded">Premium Collection</span>
                <div className="flex text-[#CD9933]">
                  {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  ))}
                </div>
              </div>
              <h1 className="font-notoSerif text-5xl md:text-7xl text-primary leading-tight tracking-tight">10 Days Premium<br/><span className="text-[#CD9933]">Umrah Journey</span></h1>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <p className="text-outline font-medium mb-2">Starting from</p>
              <div className="font-notoSerif text-4xl text-primary">PKR 485,000 <span className="text-lg font-manrope text-outline font-normal">/ person</span></div>
            </div>
          </div>

          {/* Asymmetric Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-10 gap-4 h-[600px]">
            <div className="md:col-span-2 lg:col-span-5 rounded-xl overflow-hidden relative group">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_umMwNrlCdZQQHw-gkNmIlvZ1RKy4ljfjZeHztDWu0Wgt9uTVwcC8SCXvvdKqtiQ8v5oNtA7grwHPXPG15OXDFYiqHvhKUVG17-erSKGUK7O2pmJY9mWZ8iyijELGBy-NB61ei7aEg5jsvtpBXbL0ND3vwZ9Ne6f9J7_W6D_0YJrVDA7ESbokU67XJ37dAjbcdx3wsCdGyi4dHRNDLRtl1twWIlv-M0rr3r0kY69jtOec16g7y6ZNh513s3PPjOvnH00dJr_aRChe" alt="Makkah" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white text-left">
                <p className="font-notoSerif text-2xl text-left">Makkah Al-Mukarramah</p>
                <p className="text-sm text-white/80 text-left">5 Nights Stay</p>
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
                  <span className="material-symbols-outlined text-secondary text-3xl mb-4 text-left">calendar_today</span>
                  <h3 className="font-notoSerif text-lg mb-1 text-left">Duration</h3>
                  <p className="text-outline text-sm text-left">10 Days / 9 Nights</p>
                </div>
                {/* ... other detail boxes ... */}
              </div>
              
              {/* Hotel Info */}
              <div>
                <h2 className="font-notoSerif text-3xl mb-12 flex items-center gap-4 text-left">
                  Premium Accommodations
                  <span className="h-px flex-grow bg-outline-variant/30"></span>
                </h2>
                <div className="space-y-12">
                  <div className="flex flex-col md:flex-row gap-8 items-center bg-surface-container-lowest p-6 rounded-xl editorial-shadow">
                    <img className="w-full md:w-64 h-48 object-cover rounded-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1OLKkdBZ3EeqXXVHssUEB0VLG6ldeYaU6CeQKf32v7DhdxLPfXHwZgFw0L0SIfFbEW-E2ZPeCmWolwPc_H4eGwMY6AGBIlc9iE6QtlnAwClvChfGJ2WFxpHV3Wvl4-O5pzXpJrEqFrrNvdGX4YZ42rTQZtp6Xxg4XGSNpu0rjTO_ml8iusR25IJ7SzuoYoHsJIsXadQR82HujxI-MAn7l2lmossX-0yHiTzCwnz0O3PnvewQ-Oj4I7NFvdXM_ctpezHicx3LxQx4c" alt="Hotel" />
                    <div className="flex-grow text-left">
                      <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-1 text-left">Makkah Mukarramah</p>
                      <h4 className="font-notoSerif text-2xl mb-2 text-left">Pullman Zamzam Makkah</h4>
                      <p className="text-outline text-sm leading-relaxed mb-4 text-left">Experience unrivaled proximity and luxury.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Booking Form */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 bg-surface-container-lowest p-8 rounded-xl editorial-shadow border border-outline-variant/10">
                <h3 className="font-notoSerif text-2xl mb-2 text-center">Plan Your Journey</h3>
                <form className="space-y-6">
                  {/* Form fields here */}
                  <button className="w-full bg-gradient-to-r from-secondary to-[#f6bd54] text-white py-4 rounded-md font-bold text-sm tracking-widest uppercase shadow-lg shadow-secondary/20 hover:scale-[1.02] transition-transform" type="submit">Send Inquiry</button>
                </form>
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
