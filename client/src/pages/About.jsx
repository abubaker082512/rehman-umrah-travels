import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const About = () => {
  return (
    <div className="bg-surface text-on-surface antialiased font-manrope">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center pt-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0aZyzzS27YXvxLihAy6D5j3Gm2owPVXHsbfuUpmt_V9nkUVpDY4qBxeVk0N3qgMHMknGP--1SptyzErFVr4VdanNEpX9igHPZTTaRxc4i6rU2-6OgyJTAxPc6fJ7GSbrjpd56LYsKngpdgMDqyYKFklvQklParbfNbGHj_2fhhiKy5JDpsotHSwbH0n_3-EbdRPfyMiOQB2cX2lCALLrhziCkRKq31IJCnDT8pL3Ls5WYdZVk8IsNZeCsk3BtKiWAWkEkMyO4AAFZ" alt="Grand Mosque" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/80 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-screen-2xl mx-auto px-8 lg:px-24 w-full">
            <div className="max-w-3xl">
              <div className="w-12 h-1 bg-[#CD9933] mb-8"></div>
              <h1 className="font-notoSerif text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
                About <span className="text-[#CD9933]">Us</span>
              </h1>
              <p className="font-manrope text-lg text-white/80 max-w-xl">
                A legacy of service, built on the foundation of faith and the honor of serving Allah's guests.
              </p>
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-24 px-8 md:px-24 bg-surface-container-low">
          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 border-l-2 border-t-2 border-[#CD9933]/30"></div>
              <img className="shadow-2xl relative z-10 w-full object-cover asymmetric-clip" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCThNKNEuml8S1hYHoJAa_fd8Ffyv8O8Iq2j-NA9FVUP7zCGQsN6jN2tF8VCnGOyfdUyUuP8GP73d3gmmYIN83RqTi9W_OXwEWEIsE_m6GnsPRbR6B90ww72ul0XyG5UEhF_UfY8ScbMOKfUi-YSEqSKW1CpnnC-W7bGeRNSmRg1mpqX6LufEg0aToWCar_Qf3WCSgkUewTKsO0ShkTe_syFOt6l9fU1SeLP0mHdOvYo2UFQefcP7eabsZMkJI6nhYfae9VilxFq4hf" alt="Architecture" />
              <div className="absolute -bottom-6 -right-6 bg-[#CD9933] p-8 hidden md:block z-20">
                <span className="font-notoSerif text-white text-3xl italic">Est. 1998</span>
              </div>
            </div>
            <div className="space-y-8">
              <span className="font-manrope tracking-[0.3em] uppercase text-xs text-secondary font-bold">Company Story</span>
              <h2 className="font-notoSerif text-4xl md:text-5xl text-primary leading-tight">Crafting Pathways to the Holy Lands</h2>
              <div className="space-y-6 text-on-surface-variant font-manrope leading-loose text-lg">
                <p>Rehman Umrah &amp; Travels began as a humble aspiration: to transform the daunting logistics of pilgrimage into a seamless, contemplative experience. We understood that for many, this journey is the culmination of a lifetime's prayer.</p>
                <p>Over two decades, we have evolved from a small local agency into a premier travel concierge in Pakistan. Our growth has been guided not by numbers, but by the testimonials of pilgrims who found peace in our planning and comfort in our care.</p>
                <p>Every detail, from the proximity of the hotels to the expertise of our guides, is curated to ensure that your focus remains entirely on the spiritual essence of your visit.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-24 px-8 md:px-24 bg-surface">
          <div className="max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Mission */}
              <div className="md:col-span-7 bg-primary-container p-12 flex flex-col justify-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#CD9933]/5 rounded-full -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110"></div>
                <span className="font-manrope tracking-widest uppercase text-xs text-[#CD9933] mb-4">Our Mission</span>
                <h3 className="font-notoSerif text-3xl md:text-4xl text-white mb-6 leading-snug">To provide affordable and comfortable Umrah journeys.</h3>
                <p className="text-on-primary-container text-lg font-manrope leading-relaxed">We dismantle the barriers of complexity and cost, ensuring every believer can answer the call to the Haramain with dignity and ease.</p>
              </div>
              {/* Vision */}
              <div className="md:col-span-5 bg-surface-container-high p-12 flex flex-col justify-center border-b-4 border-[#CD9933]">
                <span className="font-manrope tracking-widest uppercase text-xs text-secondary mb-4">Our Vision</span>
                <h3 className="font-notoSerif text-3xl text-primary mb-6">To become a trusted Umrah travel agency in Pakistan.</h3>
                <p className="text-on-surface-variant font-manrope">We aspire to set the gold standard in pilgrimage services, blending traditional values with modern logistical excellence.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-24 px-8 md:px-24 bg-surface-container-low relative">
          <div className="text-center mb-16">
            <h6 className="font-manrope text-[#CD9933] font-bold text-sm tracking-[0.2em] uppercase mb-4">What We Stand For</h6>
            <h2 className="font-notoSerif text-4xl lg:text-5xl text-primary mb-4">Core Principles</h2>
            <div className="w-24 h-1 bg-[#CD9933] mx-auto opacity-50"></div>
          </div>
          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface-container-lowest p-10 editorial-shadow hover:-translate-y-2 transition-transform duration-300">
              <div className="text-[#CD9933] bg-[#013334]/5 w-16 h-16 flex items-center justify-center rounded-lg mb-6">
                <span className="material-symbols-outlined text-3xl">verified_user</span>
              </div>
              <h4 className="font-notoSerif text-2xl text-primary mb-4">Honesty</h4>
              <p className="text-on-surface-variant font-manrope leading-relaxed">Transparency in every transaction. No hidden costs, no unkept promises—just pure, honest service for your journey.</p>
            </div>
            <div className="bg-surface-container-lowest p-10 editorial-shadow hover:-translate-y-2 transition-transform duration-300">
              <div className="text-[#CD9933] bg-[#013334]/5 w-16 h-16 flex items-center justify-center rounded-lg mb-6">
                <span className="material-symbols-outlined text-3xl">concierge</span>
              </div>
              <h4 className="font-notoSerif text-2xl text-primary mb-4">Professional Service</h4>
              <p className="text-on-surface-variant font-manrope leading-relaxed">Our team brings decades of logistical expertise, ensuring that every leg of your travel is managed with precision.</p>
            </div>
            <div className="bg-surface-container-lowest p-10 editorial-shadow hover:-translate-y-2 transition-transform duration-300">
              <div className="text-[#CD9933] bg-[#013334]/5 w-16 h-16 flex items-center justify-center rounded-lg mb-6">
                <span className="material-symbols-outlined text-3xl">sentiment_very_satisfied</span>
              </div>
              <h4 className="font-notoSerif text-2xl text-primary mb-4">Customer Satisfaction</h4>
              <p className="text-on-surface-variant font-manrope leading-relaxed">The pilgrim's smile is our greatest reward. We go beyond service to provide a heartfelt hospitality experience.</p>
            </div>
          </div>
        </section>

        {/* Team Stats */}
        <section className="py-24 bg-primary-container relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7iqIMSWjJemycSurDzLS49I7vf1E_Ir_9JNdo7vnnjUs42efP_S1dgqe2xI0QDJaKbHo9ZRkqvdYo1bYcwBvEnTPhPclF1OSmgOVghrFtvqeq5b92V1yjUro0sxR_GnE1BNCqYps0QKr0yc_d2G0_23gzKUpiz3nt2gERaWgkbPWLcVYUd6z7noGPOWbDAz3zrOwnleugBBJWc52v2BSX_rOZLmuCn0bBOWhLLmTx7ip4AO3yKpRp0shQrdTuKpNfm0QTUA_N0WM8" alt="Pattern" />
          </div>
          <div className="max-w-screen-2xl mx-auto px-8 relative z-10">
            <div className="text-center mb-16">
              <h6 className="font-manrope text-[#CD9933] font-bold text-sm tracking-[0.2em] uppercase mb-4">Our Journey</h6>
              <h2 className="font-notoSerif text-4xl lg:text-5xl font-bold text-white">Two Decades of Excellence</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '25+', label: 'Years of Service' },
                { number: '50K+', label: 'Pilgrims Served' },
                { number: '100+', label: 'Tour Destinations' },
                { number: '4.9', label: 'Average Rating' }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-notoSerif text-4xl lg:text-5xl font-bold text-[#CD9933] mb-2">{stat.number}</div>
                  <div className="text-white/70 font-manrope text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-8">
          <div className="max-w-5xl mx-auto bg-surface-container-lowest text-center p-16 relative overflow-hidden editorial-shadow">
            <div className="relative z-10">
              <h6 className="font-manrope text-[#CD9933] font-bold text-sm tracking-[0.2em] uppercase mb-4">Ready to Begin?</h6>
              <h2 className="font-notoSerif text-3xl md:text-4xl text-primary mb-6">Ready to begin your pilgrimage?</h2>
              <p className="text-on-surface-variant font-manrope mb-10 max-w-xl mx-auto">Consult with our specialists today and let us tailor a journey that honors your devotion.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/packages" className="bg-[#CD9933] text-white px-10 py-4 font-manrope font-bold tracking-widest uppercase text-sm hover:brightness-110 transition-all">View Packages</Link>
                <Link to="/contact" className="border-2 border-outline-variant text-primary px-10 py-4 font-manrope font-bold tracking-widest uppercase text-sm hover:bg-surface-container transition-all">Speak to an Agent</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default About
