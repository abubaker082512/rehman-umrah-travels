import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const About = () => {
  return (
    <div className="bg-surface text-on-surface antialiased">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[716px] flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0aZyzzS27YXvxLihAy6D5j3Gm2owPVXHsbfuUpmt_V9nkUVpDY4qBxeVk0N3qgMHMknGP--1SptyzErFVr4VdanNEpX9igHPZTTaRxc4i6rU2-6OgyJTAxPc6fJ7GSbrjpd56LYsKngpdgMDqyYKFklvQklParbfNbGHj_2fhhiKy5JDpsotHSwbH0n_3-EbdRPfyMiOQB2cX2lCALLrhziCkRKq31IJCnDT8pL3Ls5WYdZVk8IsNZeCsk3BtKiWAWkEkMyO4AAFZ" alt="Serene view of the Grand Mosque in Makkah during sunrise" />
            <div className="absolute inset-0 bg-gradient-to-bottom from-[#013334]/80 to-[#001c1d]/95"></div>
          </div>
          <div className="relative z-10 text-center px-6 max-w-4xl">
            <h1 className="font-notoSerif italic text-5xl md:text-7xl text-[#CD9933] mb-6 tracking-tight">Our Spiritual Journey</h1>
            <p className="font-manrope text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              A legacy of service, built on the foundation of faith and the honor of serving Allah's guests.
            </p>
          </div>
        </section>

        {/* Company Story (Editorial) */}
        <section className="py-24 px-8 md:px-24 bg-surface-container-low">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 border-l-2 border-t-2 border-[#CD9933]/30"></div>
              <img className="border-tl-[4rem] border-br-[4rem] rounded-tl-[4rem] rounded-br-[4rem] shadow-2xl relative z-10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCThNKNEuml8S1hYHoJAa_fd8Ffyv8O8Iq2j-NA9FVUP7zCGQsN6jN2tF8VCnGOyfdUyUuP8GP73d3gmmYIN83RqTi9W_OXwEWEIsE_m6GnsPRbR6B90ww72ul0XyG5UEhF_UfY8ScbMOKfUi-YSEqSKW1CpnnC-W7bGeRNSmRg1mpqX6LufEg0aToWCar_Qf3WCSgkUewTKsO0ShkTe_syFOt6l9fU1SeLP0mHdOvYo2UFQefcP7eabsZMkJI6nhYfae9VilxFq4hf" alt="Traditional Islamic architecture" />
              <div className="absolute -bottom-6 -right-6 bg-[#CD9933] p-8 hidden md:block z-20">
                <span className="font-notoSerif text-white text-3xl italic">Est. 1998</span>
              </div>
            </div>
            <div className="space-y-8">
              <span className="font-manrope tracking-[0.3em] uppercase text-xs text-secondary font-bold">Company Story</span>
              <h2 className="font-notoSerif text-4xl md:text-5xl text-primary leading-tight">Crafting Pathways to the Holy Lands</h2>
              <div className="space-y-6 text-on-surface-variant font-manrope leading-loose text-lg">
                <p>Rehman Umrah & Travels began as a humble aspiration: to transform the daunting logistics of pilgrimage into a seamless, contemplative experience. We understood that for many, this journey is the culmination of a lifetime's prayer.</p>
                <p>Over two decades, we have evolved from a small local agency into a premier travel concierge in Pakistan. Our growth has been guided not by numbers, but by the testimonials of pilgrims who found peace in our planning and comfort in our care.</p>
                <p>Every detail, from the proximity of the hotels to the expertise of our guides, is curated to ensure that your focus remains entirely on the spiritual essence of your visit.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision (Bento-style Layout) */}
        <section className="py-24 px-8 md:px-24 bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-7 bg-[#013334] p-12 flex flex-col justify-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#CD9933]/5 rounded-full -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110"></div>
                <span className="font-manrope tracking-widest uppercase text-xs text-[#CD9933] mb-4">Our Mission</span>
                <h3 className="font-notoSerif text-3xl md:text-4xl text-white mb-6 leading-snug">To provide affordable and comfortable Umrah journeys.</h3>
                <p className="text-white/70 text-lg font-manrope leading-relaxed">We dismantle the barriers of complexity and cost, ensuring every believer can answer the call to the Haramain with dignity and ease.</p>
              </div>
              <div className="md:col-span-5 bg-surface-container-high p-12 flex flex-col justify-center border-b-4 border-[#CD9933]">
                <span className="font-manrope tracking-widest uppercase text-xs text-secondary mb-4">Our Vision</span>
                <h3 className="font-notoSerif text-3xl text-primary mb-6">To become a trusted Umrah travel agency in Pakistan.</h3>
                <p className="text-on-surface-variant font-manrope">We aspire to set the gold standard in pilgrimage services, blending traditional values with modern logistical excellence.</p>
              </div>
            </div>
          </div>
        </section>

        {/* our values */}
        <section className="py-24 px-8 md:px-24 bg-surface-container-low relative">
          <div className="text-center mb-16">
            <h2 className="font-notoSerif text-4xl text-primary mb-4">Core Principles</h2>
            <div className="w-24 h-1 bg-[#CD9933] mx-auto opacity-50"></div>
          </div>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 shadow-[0_8px_40px_rgba(1,51,52,0.06)] hover:-translate-y-2 transition-transform duration-300">
              <span className="material-symbols-outlined text-[#CD9933] text-4xl mb-6">verified_user</span>
              <h4 className="font-notoSerif text-2xl text-primary mb-4">Honesty</h4>
              <p className="text-on-surface-variant font-manrope leading-relaxed">Transparancy in every transaction. No hidden costs, no unkept promises—just pure, honest service for your journey.</p>
            </div>
            <div className="bg-white p-10 shadow-[0_8px_40px_rgba(1,51,52,0.06)] hover:-translate-y-2 transition-transform duration-300">
              <span className="material-symbols-outlined text-[#CD9933] text-4xl mb-6">concierge</span>
              <h4 className="font-notoSerif text-2xl text-primary mb-4">Professional Service</h4>
              <p className="text-on-surface-variant font-manrope leading-relaxed">Our team brings decades of logistical expertise, ensuring that every leg of your travel is managed with precision.</p>
            </div>
            <div className="bg-white p-10 shadow-[0_8px_40px_rgba(1,51,52,0.06)] hover:-translate-y-2 transition-transform duration-300">
              <span className="material-symbols-outlined text-[#CD9933] text-4xl mb-6">sentiment_very_satisfied</span>
              <h4 className="font-notoSerif text-2xl text-primary mb-4">Customer Satisfaction</h4>
              <p className="text-on-surface-variant font-manrope leading-relaxed">The pilgrim's smile is our greatest reward. We go beyond service to provide a heartfelt hospitality experience.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default About
