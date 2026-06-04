import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { TOURS } from './InternationalTourDetail'

const InternationalTours = () => {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="bg-[#f7f5f0] font-manrope text-[#013334] min-h-screen">
      <Navbar />

      {/* ── Hero Section ─────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1800&q=85"
            alt="International travel destinations"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002526]/95 via-[#002526]/70 to-[#002526]/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <div className="max-w-2xl">
            <div className="w-12 h-1 bg-[#CD9933] mb-6" />
            <h1 className="font-notoSerif text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Discover the <span className="text-[#CD9933]">World</span>
            </h1>
            <p className="font-manrope text-base md:text-lg text-white/80 max-w-xl mb-8 leading-relaxed">
              Explore the most beautiful destinations with our curated international tour packages. Every journey is crafted for comfort, culture, and unforgettable memories.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="bg-[#CD9933] text-white px-8 py-4 font-manrope font-bold tracking-widest text-sm hover:brightness-110 transition-all"
              >
                Get a Quote
              </Link>
              <a
                href="https://wa.me/923220725064"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 text-white border border-white/20 px-8 py-4 font-manrope font-bold tracking-widest text-sm backdrop-blur-md hover:bg-white/20 transition-all"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tours Grid ───────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-14">
          <span className="font-manrope text-[#CD9933] font-bold text-sm tracking-[0.2em] uppercase mb-4 block">
            Beyond Borders
          </span>
          <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#013334]">
            Discover Our Tours
          </h2>
          <div className="w-24 h-1 bg-[#CD9933] mt-4 opacity-60" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {TOURS.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Image — no text overlay, pure country photo */}
              <div className="relative h-60 sm:h-72 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src={tour.cardImage}
                  alt={tour.country}
                />
                {/* Only badge, no large text */}
                <span className="absolute top-4 right-4 bg-[#CD9933] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
                  {tour.badge}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-notoSerif text-xl font-bold text-[#013334] leading-snug mb-1">
                      {tour.title}
                    </h3>
                    <p className="text-[#013334]/50 text-sm">{tour.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 mb-5 text-sm text-[#013334]/60">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-[#CD9933]">calendar_today</span>
                    {tour.duration}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-[#CD9933]">flag</span>
                    {tour.country}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {tour.highlights.slice(0, 3).map((h, i) => (
                    <span key={i} className="bg-[#013334]/5 text-[#013334]/70 px-3 py-1 rounded-full text-xs font-medium">
                      {h}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#013334]/10">
                  <div>
                    <p className="text-[10px] text-[#013334]/40 uppercase font-bold tracking-wider">Starting From</p>
                    <p className="text-[#CD9933] font-notoSerif text-2xl font-bold">{tour.price}</p>
                  </div>
                  <div className="flex gap-3">
                    <Link
                      to={`/international-tour/${tour.id}`}
                      className="px-5 py-2.5 border-2 border-[#013334] text-[#013334] hover:bg-[#013334] hover:text-white font-bold text-xs uppercase tracking-widest transition-all rounded-lg"
                    >
                      Read More
                    </Link>
                    <a
                      href="https://wa.me/923220725064"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-[#CD9933] text-white hover:brightness-110 font-bold text-xs uppercase tracking-widest transition-all rounded-lg"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Section ──────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#013334] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800"
            alt=""
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="font-manrope text-[#CD9933] font-bold text-sm tracking-[0.2em] uppercase mb-4 block">
            Ready to Explore?
          </span>
          <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Book Your Dream Destination
          </h2>
          <p className="text-white/60 mb-10 max-w-xl mx-auto leading-relaxed">
            Whether it's a spiritual Umrah journey or an international adventure, our experts are here to make it happen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/packages"
              className="bg-[#CD9933] text-white px-10 py-4 font-manrope font-bold tracking-widest text-sm hover:brightness-110 transition-all"
            >
              View Umrah Packages
            </Link>
            <a
              href="tel:+923220725064"
              className="border border-white/30 text-white px-10 py-4 font-manrope font-bold tracking-widest text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">call</span>
              Call Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default InternationalTours