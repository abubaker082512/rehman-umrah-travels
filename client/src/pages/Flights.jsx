import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || ''

const staticDestinations = [
  { id: 1, name: 'London', description: 'Experience the magic of the UK capital.', image_url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80', price_start: 125000 },
  { id: 2, name: 'Paris', description: 'The city of lights and romance.', image_url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80', price_start: 145000 },
  { id: 3, name: 'Dubai', description: 'Luxury and modern architecture in the desert.', image_url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80', price_start: 85000 },
  { id: 4, name: 'Istanbul', description: 'Where East meets West in style.', image_url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80', price_start: 95000 }
]

const Flights = () => {
  const [destinations, setDestinations] = useState([])
  const [cmsContent, setCmsContent] = useState({
    heroTitle: 'BOOK YOUR DREAM JOURNEY WITH REHMAN UMRAH & TRAVELS',
    heroSubtitle: 'DISCOVER THE BEST DEALS ON FLIGHTS AND TRAVEL PACKAGES WORLDWIDE',
    adventureTitle: 'YOUR NEXT ADVENTURE BEGINS HERE!',
    adventureSubtitle: 'Discover the best flight deals and travel packages tailored to your needs.',
    trustTitle: 'TIRED OF OVERPRICED FLIGHTS, VISA HASSLES, AND GENERIC TRAVEL PLANS?',
    trustSubtitle: 'We provide transparent pricing and expert guidance for all your travel needs.',
    destinationsTitle: 'YOUR DESTINATION AWAITS — WHERE WILL YOU GO?',
    destinationsSubtitle: 'Pick your destination and let us handle the rest.',
    popularTitle: 'Most Popular Places',
    feature1: 'Lowest Flight Booking with Best Services',
    feature2: 'Max Success Guarantee with Expert Guidance',
    feature3: '24/7 Customer Care — From Letters to Landing',
    feature4: 'Customized Packages — Umrah, HM, Management, Business',
    feature5: 'Price Match Promise: Find it cheaper? We\'ll beat it!'
  })
  const [pageMedia, setPageMedia] = useState({})

  useEffect(() => {
    // Fetch destinations
    axios.get(`${API_BASE}/api/flights`)
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setDestinations(res.data)
        } else {
          setDestinations(staticDestinations)
        }
      })
      .catch(() => setDestinations(staticDestinations))

    // Fetch CMS content
    const savedCms = localStorage.getItem('cms_flights')
    if (savedCms) setCmsContent(prev => ({ ...prev, ...JSON.parse(savedCms) }))

    axios.get(`${API_BASE}/api/cms?id=cms_flights`)
      .then(res => {
        if (res.data && Object.keys(res.data).length > 0) {
          setCmsContent(prev => ({ ...prev, ...res.data }))
          localStorage.setItem('cms_flights', JSON.stringify(res.data))
        }
      })

    // Fetch media
    axios.get(`${API_BASE}/api/cms?id=page_media`)
      .then(res => setPageMedia(res.data || {}))
  }, [])

  return (
    <div className="min-h-screen bg-surface font-inter">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={pageMedia.flightsHero || "https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?w=1600&q=80"} 
            className="w-full h-full object-cover brightness-[0.4]" 
            alt="Hero Background"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="font-notoSerif text-4xl md:text-5xl font-bold text-white mb-4 leading-tight max-w-4xl mx-auto drop-shadow-lg uppercase">
            {cmsContent.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto font-medium drop-shadow-md italic">
            {cmsContent.heroSubtitle}
          </p>

          {/* Search Widget */}
          <div className="relative max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-2xl border-b-4 border-[#0088CC]">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="text-left border-r border-outline-variant pr-4">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase mb-1 block">Origin City</label>
                  <input type="text" placeholder="From where?" className="w-full p-2 bg-transparent outline-none text-sm font-bold text-primary" />
                </div>
                <div className="text-left border-r border-outline-variant pr-4 pl-4">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase mb-1 block">Destination</label>
                  <input type="text" placeholder="To where?" className="w-full p-2 bg-transparent outline-none text-sm font-bold text-primary" />
                </div>
                <div className="text-left border-r border-outline-variant pr-4 pl-4">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase mb-1 block">Departure Date</label>
                  <input type="date" className="w-full p-2 bg-transparent outline-none text-sm font-bold text-primary" />
                </div>
                <div className="text-left border-r border-outline-variant pr-4 pl-4">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase mb-1 block">Return Date</label>
                  <input type="date" className="w-full p-2 bg-transparent outline-none text-sm font-bold text-primary" />
                </div>
                <div className="text-left pl-4">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase mb-1 block">Passengers count</label>
                  <input type="number" min="1" placeholder="1 Adult" className="w-full p-2 bg-transparent outline-none text-sm font-bold text-primary" />
                </div>
              </div>
            </div>
            {/* The Blue Arrow Button from Screenshot */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
              <button className="w-12 h-12 bg-[#0088CC] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all">
                <span className="material-symbols-outlined">expand_more</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section 1 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center max-w-5xl">
          <h2 className="font-notoSerif text-3xl md:text-4xl font-bold text-[#013334] mb-4">
            YOUR NEXT ADVENTURE <span className="text-[#0088CC] uppercase">BEGINS HERE!</span>
          </h2>
          <p className="text-base text-on-surface-variant leading-relaxed mb-8">
            {cmsContent.adventureSubtitle}
          </p>
          <button className="bg-[#0088CC] text-white px-8 py-3 rounded text-sm font-bold uppercase tracking-widest hover:brightness-110 transition-all">
            Get Started Your Trip Now - Book On Our Recommendation
          </button>
          
          <div className="mt-16 text-center">
            <h3 className="font-notoSerif text-2xl md:text-3xl font-bold text-primary mb-4 uppercase">
              TIRED OF OVERPRICED FLIGHTS, <span className="text-[#0088CC]">VISA HASSLES, AND GENERIC TRAVEL PLANS?</span>
            </h3>
            <p className="text-sm text-on-surface-variant max-w-2xl mx-auto italic">
              {cmsContent.trustSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-20 bg-[#F9FAFB]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-notoSerif text-3xl md:text-4xl font-bold text-[#0088CC] mb-2 uppercase">
              {cmsContent.destinationsTitle}
            </h2>
            <p className="text-sm text-on-surface-variant font-medium uppercase tracking-widest">{cmsContent.destinationsSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {destinations.map(dest => (
              <div key={dest.id} className="bg-white rounded overflow-hidden shadow-sm border border-outline-variant flex flex-col md:flex-row h-full">
                <div className="md:w-2/5 h-48 md:h-full relative">
                  <img src={dest.image_url} alt={dest.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-[#0088CC] text-white px-2 py-1 text-[10px] font-bold uppercase">
                    Available Today
                  </div>
                </div>
                <div className="md:w-3/5 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-[#0088CC]">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      <h3 className="font-notoSerif text-xl font-bold uppercase">{dest.name}</h3>
                    </div>
                    <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">{dest.description}</p>
                    <p className="text-[10px] font-bold text-[#0088CC] mb-4">from PKR {dest.price_start.toLocaleString()}</p>
                    <p className="text-[10px] text-primary font-bold uppercase underline mb-6 cursor-pointer">View On Map Details</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-[#0088CC] text-white py-2 rounded text-[10px] font-bold uppercase tracking-wider hover:brightness-110">Get Now</button>
                    <button className="flex-1 bg-[#0088CC] text-white py-2 rounded text-[10px] font-bold uppercase tracking-wider hover:brightness-110">Read More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[1, 3, 5].map(i => (
              <div key={i} className="bg-[#F9FAFB] p-6 rounded border border-outline-variant flex items-center gap-6 relative overflow-hidden group">
                <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-[#0088CC] flex items-center justify-center text-[#0088CC]">
                  <span className="material-symbols-outlined">arrow_forward</span>
                </div>
                <h4 className="text-sm font-bold text-primary z-10">{cmsContent[`feature${i}`]}</h4>
                <span className="absolute right-4 bottom-0 text-7xl font-bold text-black/5 select-none transition-all group-hover:text-black/10">
                  {i}
                </span>
              </div>
            ))}
            {[2, 4].map(i => (
              <div key={i} className="bg-[#F9FAFB] p-6 rounded border border-outline-variant flex items-center gap-6 relative overflow-hidden group">
                <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-[#0088CC] flex items-center justify-center text-[#0088CC]">
                  <span className="material-symbols-outlined">arrow_back</span>
                </div>
                <h4 className="text-sm font-bold text-primary z-10">{cmsContent[`feature${i}`]}</h4>
                <span className="absolute right-4 bottom-0 text-7xl font-bold text-black/5 select-none transition-all group-hover:text-black/10">
                  {i}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-[#0088CC] text-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl">
          <div className="text-center md:text-left">
            <h2 className="font-notoSerif text-2xl font-bold uppercase mb-2">DO YOU HAVE QUESTIONS?</h2>
            <p className="text-xs text-white/80">Feel free to contact us at any time!</p>
          </div>
          <button className="bg-white text-[#0088CC] px-8 py-3 rounded font-bold text-xs uppercase tracking-widest hover:bg-gray-100 transition-all">
            Inquire Now
          </button>
        </div>
      </section>

      {/* Most Popular Places Grid Matching Screenshot */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-[10px] text-[#0088CC] font-bold tracking-widest uppercase mb-2">Visit Now City</p>
            <h2 className="font-notoSerif text-3xl font-bold text-primary uppercase">{cmsContent.popularTitle}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[600px] max-w-6xl mx-auto">
            {/* Large Left Item (United States) */}
            <div className="md:col-span-1 md:row-span-2 relative group overflow-hidden rounded shadow-lg">
              <img src="https://images.unsplash.com/photo-1508433957232-310ae450c255?w=800&q=80" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" alt="United States" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="font-bold text-lg uppercase mb-1">United States</h3>
                <p className="text-[10px] text-white/70 uppercase">North America</p>
              </div>
            </div>

            {/* Small Top Right Item (France) */}
            <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded shadow-lg">
              <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" alt="France" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-sm uppercase mb-1">France</h3>
                <p className="text-[8px] text-white/70 uppercase">Europe</p>
              </div>
            </div>

            {/* Huge Vertical Right Item (Australia) */}
            <div className="md:col-span-2 md:row-span-3 relative group overflow-hidden rounded shadow-lg">
              <img src="https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&q=80" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" alt="Australia" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="font-bold text-2xl uppercase mb-2">Australia</h3>
                <p className="text-[12px] text-white/70 uppercase">Oceania</p>
              </div>
            </div>

            {/* Horizontal Middle Left (Hong Kong) */}
            <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded shadow-lg">
              <img src="https://images.unsplash.com/photo-1506230507474-686067da0073?w=800&q=80" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" alt="Hong Kong" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="font-bold text-lg uppercase mb-1">Hong Kong</h3>
                <p className="text-[10px] text-white/70 uppercase">East Asia</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  )
}

export default Flights
