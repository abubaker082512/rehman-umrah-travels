import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const About = () => {
  return (
    <div className="bg-surface text-on-surface antialiased font-manrope">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[716px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0aZyzzS27YXvxLihAy6D5j3Gm2owPVXHsbfuUpmt_V9nkUVpDY4qBxeVk0N3qgMHMknGP--1SptyzErFVr4VdanNEpX9igHPZTTaRxc4i6rU2-6OgyJTAxPc6fJ7GSbrjpd56LYsKngpdgMDqyYKFklvQklParbfNbGHj_2fhhiKy5JDpsotHSwbH0n_3-EbdRPfyMiOQB2cX2lCALLrhziCkRKq31IJCnDT8pL3Ls5WYdZVk8IsNZeCsk3BtKiWAWkEkMyO4AAFZ" alt="Grand Mosque" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(1, 51, 52, 0.8), rgba(0, 28, 29, 0.95))' }}></div>
          </div>
          <div className="relative z-10 text-center px-6 max-w-4xl">
            <h1 className="font-notoSerif italic text-5xl md:text-7xl text-[#CD9933] mb-6 tracking-tight">Our Spiritual Journey</h1>
            <p className="font-manrope text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              A legacy of service, built on the foundation of faith and the honor of serving Allah's guests.
            </p>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-24 px-8 md:px-24 bg-surface-container-low">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 border-l-2 border-t-2 border-[#CD9933]/30"></div>
              <img className="shadow-2xl relative z-10 w-full object-cover" style={{ borderTopLeftRadius: '4rem', borderBottomRightRadius: '4rem' }} src="https://lh3.googleusercontent.com/aida-public/AB6AXuCThNKNEuml8S1hYHoJAa_fd8Ffyv8O8Iq2j-NA9FVUP7zCGQsN6jN2tF8VCnGOyfdUyUuP8GP73d3gmmYIN83RqTi9W_OXwEWEIsE_m6GnsPRbR6B90ww72ul0XyG5UEhF_UfY8ScbMOKfUi-YSEqSKW1CpnnC-W7bGeRNSmRg1mpqX6LufEg0aToWCar_Qf3WCSgkUewTKsO0ShkTe_syFOt6l9fU1SeLP0mHdOvYo2UFQefcP7eabsZMkJI6nhYfae9VilxFq4hf" alt="Architecture" />
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
          <div className="max-w-7xl mx-auto">
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
            <h2 className="font-notoSerif text-4xl text-primary mb-4">Core Principles</h2>
            <div className="w-24 h-1 bg-[#CD9933] mx-auto opacity-50"></div>
          </div>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface-container-lowest p-10 shadow-[0_8px_40px_rgba(1,51,52,0.06)] hover:-translate-y-2 transition-transform duration-300">
              <span className="material-symbols-outlined text-[#CD9933] text-4xl mb-6 block">verified_user</span>
              <h4 className="font-notoSerif text-2xl text-primary mb-4">Honesty</h4>
              <p className="text-on-surface-variant font-manrope leading-relaxed">Transparency in every transaction. No hidden costs, no unkept promises—just pure, honest service for your journey.</p>
            </div>
            <div className="bg-surface-container-lowest p-10 shadow-[0_8px_40px_rgba(1,51,52,0.06)] hover:-translate-y-2 transition-transform duration-300">
              <span className="material-symbols-outlined text-[#CD9933] text-4xl mb-6 block">concierge</span>
              <h4 className="font-notoSerif text-2xl text-primary mb-4">Professional Service</h4>
              <p className="text-on-surface-variant font-manrope leading-relaxed">Our team brings decades of logistical expertise, ensuring that every leg of your travel is managed with precision.</p>
            </div>
            <div className="bg-surface-container-lowest p-10 shadow-[0_8px_40px_rgba(1,51,52,0.06)] hover:-translate-y-2 transition-transform duration-300">
              <span className="material-symbols-outlined text-[#CD9933] text-4xl mb-6 block">sentiment_very_satisfied</span>
              <h4 className="font-notoSerif text-2xl text-primary mb-4">Customer Satisfaction</h4>
              <p className="text-on-surface-variant font-manrope leading-relaxed">The pilgrim's smile is our greatest reward. We go beyond service to provide a heartfelt hospitality experience.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-8">
          <div className="max-w-5xl mx-auto bg-primary text-center p-16 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuANH3Z2eas9Jc8ZKQubzAol89gYLhErdeT4vyywMjfC4HVWha_Bf5Sw0D6jaF4hFvvNFpSDhCQogVL3yj6qLYz9v9jXKYvVpbK1Im5HHwcxUfflaizB4KuVrdMXzFvLoNM0DXMWxlOeflnqsES-o7k_nTj-i5WWlYvsu08bFsvb-TeJGSUolBxV5taWtM5RsCrr2AcPnJA7l_rTkJN1Jdzy6zB76GcAsFuLUSG-bDrj9zGyyuaHyKCusiXfivE0fNQ0QBXK3LrGHBj8" alt="Pattern" />
            </div>
            <h2 className="font-notoSerif text-3xl md:text-4xl text-[#CD9933] mb-8 relative z-10">Ready to begin your pilgrimage?</h2>
            <p className="text-white/70 font-manrope mb-10 max-w-xl mx-auto relative z-10">Consult with our specialists today and let us tailor a journey that honors your devotion.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <button className="bg-[#CD9933] text-white px-10 py-4 font-manrope font-bold tracking-widest uppercase text-sm hover:brightness-110 transition-all">View Packages</button>
              <button className="border border-[#CD9933]/40 text-[#CD9933] px-10 py-4 font-manrope font-bold tracking-widest uppercase text-sm hover:bg-[#CD9933]/10 transition-all">Speak to an Agent</button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default About
