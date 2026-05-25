import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollReveal from '../components/ScrollReveal'
import localToursImg from '../assets/local_tours.png'

const localToursData = [
  {
    id: 301,
    title: 'Hunza Valley Tour',
    subtitle: 'Karimabad, Attabad Lake, Altit & Baltit Forts, Khunjerab Border',
    duration: '7 Days / 6 Nights',
    price: 'PKR 65,000',
    highlights: ['Attabad Lake Boating', 'Khunjerab Pass (China Border)', 'Altit & Baltit Forts Tour', 'Karimabad Traditional Market'],
    description: 'Journey through the majestic Hunza Valley, featuring deep sapphire lakes, centuries-old heritage forts, and spectacular high mountain view points.'
  },
  {
    id: 302,
    title: 'Skardu & Deosai Plains Tour',
    subtitle: 'Shangrila Resort, Cold Desert, Satpara Lake, Deosai Plains',
    duration: '8 Days / 7 Nights',
    price: 'PKR 78,000',
    highlights: ['Shangrila Lake Resort', 'Deosai Plains Jeep Safari', 'Manthoka Waterfall visit', 'Katpana Cold Desert Sunset'],
    description: 'Explore the celestial highlands of Skardu, high-altitude alpine plains of Deosai, pristine waterfalls, and unique desert sand dunes under towering peaks.'
  },
  {
    id: 303,
    title: 'Swat Valley & Kalam Tour',
    subtitle: 'Malam Jabba, Kalam, Ushu Forest, Mahodand Lake',
    duration: '6 Days / 5 Nights',
    price: 'PKR 48,000',
    highlights: ['Malam Jabba Ski Resort', 'Ushu Forest Nature Walk', 'Mahodand Lake Boating', 'Kalam Valley Jeep Safari'],
    description: 'Discover the Switzerland of Pakistan: Swat Valley. Featuring pine-covered forests, ski chairlifts, rushing streams, and magnificent glacial lakes.'
  },
  {
    id: 304,
    title: 'Fairy Meadows & Nanga Parbat Base',
    subtitle: 'Raikot Bridge, Fairy Meadows, Nanga Parbat Base Camp',
    duration: '5 Days / 4 Nights',
    price: 'PKR 55,000',
    highlights: ['Thrilling Raikot Jeep Track', 'Fairy Meadows Trek & Camp', 'Reflection Lake Photography', 'Base Camp Trekking'],
    description: 'Embark on a dream adventure to the legendary Fairy Meadows, camping at the foot of the massive Nanga Parbat (the Killer Mountain).'
  }
]

const LocalTours = () => {
  return (
    <div className="bg-[#001c1d] font-manrope text-white min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover scale-105 animate-pulse duration-[10000ms]" 
            src={localToursImg} 
            alt="Beautiful Hunza and Skardu mountains in Pakistan" 
          />
          <div className="absolute inset-0 bg-[#001c1d]/85 backdrop-blur-sm"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full text-left">
          <ScrollReveal animation="fade-down" duration={700}>
            <div className="max-w-3xl space-y-6">
              <div className="w-16 h-[2px] bg-[#CD9933] mb-4"></div>
              <span className="text-[#CD9933] font-bold text-xs uppercase tracking-[0.3em] block">Proudly Displaying the Beauty of Pakistan</span>
              <h1 className="font-notoSerif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Explore the <span className="text-[#CD9933]">Heavenly</span> North
              </h1>
              <p className="font-manrope text-sm sm:text-base text-gray-300 max-w-xl">
                Experience Northern Pakistan with curated local tours. From towering peaks of Karakoram to peaceful high-altitude lakes and rich cultural valleys, we organize every detail.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="https://wa.me/923220725064?text=Hello%20Royal%20Umrah%20%26%20Travels,%20I%20want%20to%20book%20a%20Local%20Tour%20in%20Pakistan."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#CD9933] hover:bg-[#b08025] text-white px-8 py-3.5 font-bold tracking-widest text-xs uppercase transition-all shadow-lg active:scale-95"
                >
                  Book Adventure
                </a>
                <Link 
                  to="/contact" 
                  className="bg-white/5 border border-white/20 text-white px-8 py-3.5 font-bold tracking-widest text-xs uppercase backdrop-blur-md hover:bg-white/10 transition-all active:scale-95"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Tours Grid Section */}
      <section className="py-24 px-6 bg-[#002526] relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <ScrollReveal animation="fade-down" duration={600}>
            <div className="mb-16 text-center space-y-4">
              <span className="font-manrope text-[#CD9933] font-bold text-sm tracking-[0.2em] uppercase block">Focusing Pakistan</span>
              <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase tracking-wide">Featured Local Packages</h2>
              <div className="w-16 h-[2px] bg-[#CD9933] mx-auto mt-4"></div>
            </div>
          </ScrollReveal>

          {/* Staggered Cards Grid with Alternating Reveal Directions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {localToursData.map((tour, idx) => (
              <ScrollReveal 
                key={tour.id} 
                delay={(idx % 2) * 120} 
                animation={idx % 2 === 0 ? "fade-down" : "fade-up"} 
                duration={800}
              >
                <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl hover:border-[#CD9933]/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col overflow-hidden h-full group shadow-2xl">
                  {/* Top Image Banner */}
                  <div className="relative h-64 sm:h-72 overflow-hidden shrink-0">
                    <img 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      src={localToursImg} 
                      alt={tour.title} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#002526]/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <span className="bg-[#CD9933] text-white px-3 py-1 text-[9px] font-bold uppercase tracking-wider rounded-md shadow-md mb-3 inline-block">
                        {tour.duration}
                      </span>
                      <h3 className="font-notoSerif text-2xl font-bold tracking-wide uppercase line-clamp-1">{tour.title}</h3>
                      <p className="text-xs text-gray-300 font-light mt-1 line-clamp-1">{tour.subtitle}</p>
                    </div>
                  </div>

                  {/* Card Content details */}
                  <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <p className="text-gray-300 text-sm leading-relaxed font-light">
                        {tour.description}
                      </p>
                      
                      {/* Highlights */}
                      <div className="space-y-2 pt-2">
                        <span className="text-[#CD9933] font-bold text-xs uppercase tracking-wider block">Tour Highlights:</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {tour.highlights.map((hl, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                              <span className="material-symbols-outlined text-[#CD9933] text-xs font-bold">check_circle</span>
                              <span>{hl}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Pricing & Action */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
                      <div>
                        <span className="block text-[10px] text-gray-500 uppercase tracking-widest">Starting from</span>
                        <span className="text-2xl font-extrabold text-[#CD9933]">{tour.price}</span>
                      </div>
                      <a 
                        href={`https://wa.me/923220725064?text=Hello%20Royal%20Umrah%20%26%20Travels,%20I%20would%20like%20to%20book%20the%20${encodeURIComponent(tour.title)}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#CD9933] hover:bg-[#b08025] text-white text-center py-3.5 px-8 text-xs font-bold uppercase tracking-widest transition-all rounded-lg active:scale-95 shadow-md"
                      >
                        Book Now
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 패턴 CTA */}
      <section className="py-20 md:py-28 bg-[#013334] relative overflow-hidden z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#CD9933]/5 blur-[150px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-6">
          <span className="font-manrope text-[#CD9933] font-bold text-xs uppercase tracking-[0.3em] block">Have Custom Plans?</span>
          <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase tracking-wide">Plan a Custom Group Tour</h2>
          <p className="text-gray-300 text-sm leading-relaxed max-w-xl mx-auto font-light">
            We organize private corporate group packages, family retreats, and customized study tours to Northern areas according to your timeline and hotel budget.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/923220725064?text=Hello%20Royal%20Umrah%20%26%20Travels,%20I%20want%20to%20plan%20a%20custom%20group%20tour%20in%20Pakistan."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#CD9933] hover:bg-[#b08025] text-white px-10 py-4 font-bold tracking-widest text-xs uppercase transition-all shadow-lg active:scale-95"
            >
              Get Custom Quote
            </a>
            <Link 
              to="/contact" 
              className="border border-white/20 hover:bg-white/10 text-white px-10 py-4 font-bold tracking-widest text-xs uppercase transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span className="material-symbols-outlined text-sm font-bold">call</span>
              <span>Contact Agents</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default LocalTours
