import React, { useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const TOURS = [
  {
    id: 101,
    slug: 'dubai-new-year-2025',
    title: 'Dubai Tour – New Year Celebration 2025',
    country: 'United Arab Emirates',
    subtitle: 'Dubai, Abu Dhabi, Sharjah',
    duration: '5 Days 4 Nights',
    price: 'PKR 145,000',
    priceNote: 'Per Person (For 2 Persons)',
    badge: 'POPULAR',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80',
    cardImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    description: 'Ring in the New Year with stunning fireworks at Burj Khalifa, desert safaris, and premium city cruises in luxury. Dubai is a city that blends futuristic architecture with rich Emirati culture, offering an unforgettable celebration experience.',
    highlights: ['Burj Khalifa & Dubai Fountain', 'Desert Safari & BBQ Dinner', 'Dubai Frame', 'Sheikh Zayed Grand Mosque (Abu Dhabi)', 'Dubai Mall & Gold Souk'],
    included: ['Return Airfare (Economy)', 'E-Visa Processing', '4-Star Hotel Accommodation', 'Airport Transfers', 'City Tour by Luxury Coach', 'Desert Safari with Dinner', 'Health Insurance'],
    notIncluded: ['Personal expenses', 'Tips & gratuities', 'Optional excursions', 'Meals not mentioned'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Dubai', desc: 'Arrive at Dubai International Airport. Transfer to hotel. Evening free to explore.' },
      { day: 'Day 2', title: 'Dubai City Tour', desc: 'Visit Burj Khalifa, Dubai Mall, Dubai Fountain Show, and Gold Souk.' },
      { day: 'Day 3', title: 'Desert Safari', desc: 'Morning free. Evening Desert Safari with dune bashing, camel riding, and BBQ dinner under the stars.' },
      { day: 'Day 4', title: 'Abu Dhabi Day Trip', desc: 'Full-day excursion to Abu Dhabi — visit Sheikh Zayed Grand Mosque and Corniche.' },
      { day: 'Day 5', title: 'Departure', desc: 'Morning leisure, last-minute shopping, then transfer to airport for return flight.' },
    ]
  },
  {
    id: 102,
    slug: 'turkey-elegance',
    title: 'Turkey Elegance – Cappadocia & Istanbul',
    country: 'Turkey',
    subtitle: 'Istanbul, Cappadocia, Antalya',
    duration: '7 Days 6 Nights',
    price: 'PKR 210,000',
    priceNote: 'Per Person',
    badge: 'FEATURED',
    heroImage: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1600&q=80',
    cardImage: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80',
    description: 'Witness hot air balloons over fairy chimneys, explore Hagia Sophia, and cruise the majestic Bosphorus Strait. Turkey offers a seamless blend of East and West — a land of emperors, mosques, spas, and breathtaking volcanic landscapes.',
    highlights: ['Hagia Sophia & Blue Mosque', 'Cappadocia Hot Air Balloon Ride', 'Grand Bazaar', 'Bosphorus Cruise', 'Pamukkale Cotton Castle'],
    included: ['Return Airfare (Economy)', 'E-Visa Processing', '4-Star Hotel (Istanbul) & Cave Hotel (Cappadocia)', 'Airport Transfers', 'Guided City Tours', 'Hot Air Balloon Ride', 'Health Insurance'],
    notIncluded: ['Personal expenses', 'Tips & gratuities', 'Optional excursions', 'Meals (breakfast included only)'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Istanbul', desc: 'Arrive at Istanbul Airport. Check in to hotel. Evening walk along Taksim Square.' },
      { day: 'Day 2', title: 'Istanbul Historic Tour', desc: 'Visit Hagia Sophia, Blue Mosque, Topkapi Palace, and Grand Bazaar.' },
      { day: 'Day 3', title: 'Bosphorus & Princes Islands', desc: 'Morning Bosphorus cruise, afternoon visit to Spice Bazaar, evening ferry to Princes Islands.' },
      { day: 'Day 4', title: 'Fly to Cappadocia', desc: 'Morning flight to Nevsehir. Explore Goreme Open Air Museum and fairy chimneys.' },
      { day: 'Day 5', title: 'Hot Air Balloon Sunrise', desc: 'Magical sunrise hot air balloon ride over the valleys of Cappadocia.' },
      { day: 'Day 6', title: 'Pamukkale Day Trip', desc: 'Full-day excursion to Pamukkale thermal pools and Hierapolis ruins.' },
      { day: 'Day 7', title: 'Departure', desc: 'Transfer to airport for return flight home.' },
    ]
  },
  {
    id: 103,
    slug: 'malaysia-kuala-lumpur',
    title: 'Explore Malaysia – Kuala Lumpur & Langkawi',
    country: 'Malaysia',
    subtitle: 'Kuala Lumpur, Langkawi, Penang',
    duration: '6 Days 5 Nights',
    price: 'PKR 135,000',
    priceNote: 'Per Person (For 2 Persons)',
    badge: 'BEST VALUE',
    heroImage: 'https://images.unsplash.com/photo-1619546952812-520e98064a52?w=1600&q=80',
    cardImage: 'https://images.unsplash.com/photo-1619546952812-520e98064a52?w=800&q=80',
    description: 'Ascend the iconic Petronas Twin Towers, relax on sandy beaches in Langkawi, and experience rich cultural heritage. Malaysia is a melting pot of Malay, Chinese, and Indian cultures, offering a vibrant mix of food, nature, and architecture.',
    highlights: ['Petronas Twin Towers', 'Batu Caves', 'Langkawi Island Beach', 'Penang Street Food Trail', 'KL Bird Park'],
    included: ['Return Airfare (Economy)', 'E-Visa on Arrival Assistance', '3-Star Hotel Accommodation', 'Airport Transfers', 'City Tour by Coach', 'Langkawi Ferry & Day Trip', 'Health Insurance'],
    notIncluded: ['Personal expenses', 'Tips & gratuities', 'Optional excursions', 'Meals not mentioned'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Kuala Lumpur', desc: 'Arrive at KLIA. Check in to hotel. Evening visit to KLCC Park and fountain show.' },
      { day: 'Day 2', title: 'KL City Tour', desc: 'Visit Petronas Towers, Batu Caves, KL Tower, and Chinatown Petaling Street.' },
      { day: 'Day 3', title: 'Langkawi Island', desc: 'Morning ferry to Langkawi. Beach relaxation, island hopping, and seafood dinner.' },
      { day: 'Day 4', title: 'Langkawi Exploration', desc: 'Visit Langkawi Sky Cab cable car, Dataran Lang Eagle Square, and duty-free shopping.' },
      { day: 'Day 5', title: 'Penang Heritage', desc: 'Drive to Penang. Explore Georgetown, street art, and famous hawker food trail.' },
      { day: 'Day 6', title: 'Departure', desc: 'Return to KL, last-minute shopping at Bukit Bintang, then airport departure.' },
    ]
  },
  {
    id: 104,
    slug: 'thailand-bangkok-phuket',
    title: 'Thailand Splendor – Bangkok & Phuket',
    country: 'Thailand',
    subtitle: 'Bangkok, Phuket, Phi Phi Islands',
    duration: '6 Days 5 Nights',
    price: 'PKR 155,000',
    priceNote: 'Per Person (For 2 Persons)',
    badge: 'NEW',
    heroImage: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=1600&q=80',
    cardImage: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=800&q=80',
    description: 'Explore vibrant street life and ornate shrines in Bangkok, then relax on the sandy beaches of Phuket. Thailand is the land of smiles — where ancient temples meet turquoise waters, and vibrant markets burst with energy and colour.',
    highlights: ['Grand Palace & Wat Pho', 'Phi Phi Islands Boat Tour', 'Patong Beach Phuket', 'Floating Market', 'Muay Thai Show'],
    included: ['Return Airfare (Economy)', 'Visa on Arrival Assistance', '4-Star Hotel Accommodation', 'Airport Transfers', 'City Tour by Coach', 'Phi Phi Islands Day Trip', 'Health Insurance'],
    notIncluded: ['Personal expenses', 'Tips & gratuities', 'Optional excursions', 'Meals not mentioned'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Bangkok', desc: 'Arrive at Suvarnabhumi Airport. Transfer to hotel in Bangkok city centre.' },
      { day: 'Day 2', title: 'Bangkok Temples & Markets', desc: 'Visit Grand Palace, Wat Pho (Reclining Buddha), Wat Arun, and Damnoen Saduak Floating Market.' },
      { day: 'Day 3', title: 'Bangkok to Phuket', desc: 'Morning flight to Phuket. Afternoon beach time at Patong Beach.' },
      { day: 'Day 4', title: 'Phi Phi Islands Boat Trip', desc: 'Full-day speedboat tour to Maya Bay, Phi Phi Don, and snorkelling in crystal waters.' },
      { day: 'Day 5', title: 'Phuket Leisure Day', desc: 'Optional ATV ride, elephant sanctuary visit, or Tiger Kingdom. Evening night market.' },
      { day: 'Day 6', title: 'Departure', desc: 'Morning leisure, transfer to Phuket airport for return flight.' },
    ]
  },
]

export { TOURS }

const InternationalTourDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const tour = TOURS.find(t => String(t.id) === String(id) || t.slug === id)

  if (!tour) {
    return (
      <div className="min-h-screen flex flex-col bg-[#002526] font-manrope">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-white gap-6 px-4">
          <span className="material-symbols-outlined text-7xl text-[#CD9933]">travel_explore</span>
          <h1 className="font-notoSerif text-4xl font-bold">Tour Not Found</h1>
          <p className="text-white/60 text-center max-w-sm">The tour you're looking for doesn't exist or may have been updated.</p>
          <Link to="/international-tours" className="bg-[#CD9933] text-white px-8 py-3 font-bold tracking-widest text-sm uppercase hover:brightness-110 transition-all rounded-lg">
            View All Tours
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f7f5f0] font-manrope text-[#013334]">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <img
          src={tour.heroImage}
          alt={tour.country}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#002526] via-[#002526]/50 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pb-12">
          <Link
            to="/international-tours"
            className="inline-flex items-center gap-2 text-white/70 hover:text-[#CD9933] transition-colors text-sm font-semibold mb-6 group"
          >
            <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
            All International Tours
          </Link>
          <div className="flex flex-wrap items-end gap-4 justify-between">
            <div>
              <span className="inline-block bg-[#CD9933] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">{tour.badge}</span>
              <h1 className="font-notoSerif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight max-w-3xl">{tour.title}</h1>
              <p className="text-white/70 mt-2 text-sm font-medium">{tour.subtitle}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-white/50 text-xs uppercase tracking-wider">Starting From</p>
              <p className="text-[#CD9933] font-notoSerif text-3xl font-bold">{tour.price}</p>
              <p className="text-white/50 text-xs mt-1">{tour.priceNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Left: Details */}
        <div className="lg:col-span-2 space-y-10">

          {/* Overview */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#013334]/10">
            <h2 className="font-notoSerif text-2xl font-bold mb-4 text-[#013334]">Tour Overview</h2>
            <p className="text-[#013334]/70 leading-relaxed">{tour.description}</p>
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="flex items-center gap-2 bg-[#013334]/5 rounded-xl px-4 py-3">
                <span className="material-symbols-outlined text-[#CD9933]">schedule</span>
                <div>
                  <p className="text-[10px] text-[#013334]/50 uppercase tracking-wider font-bold">Duration</p>
                  <p className="font-bold text-sm text-[#013334]">{tour.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-[#013334]/5 rounded-xl px-4 py-3">
                <span className="material-symbols-outlined text-[#CD9933]">flag</span>
                <div>
                  <p className="text-[10px] text-[#013334]/50 uppercase tracking-wider font-bold">Country</p>
                  <p className="font-bold text-sm text-[#013334]">{tour.country}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-[#013334]/5 rounded-xl px-4 py-3">
                <span className="material-symbols-outlined text-[#CD9933]">pin_drop</span>
                <div>
                  <p className="text-[10px] text-[#013334]/50 uppercase tracking-wider font-bold">Destinations</p>
                  <p className="font-bold text-sm text-[#013334]">{tour.subtitle}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#013334]/10">
            <h2 className="font-notoSerif text-2xl font-bold mb-6 text-[#013334]">Tour Highlights</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tour.highlights.map((h, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-[#013334]/80">
                  <span className="material-symbols-outlined text-[#CD9933] text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Included / Not Included */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#013334]/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-notoSerif text-xl font-bold mb-5 text-[#013334]">What's Included</h3>
                <ul className="space-y-3">
                  {tour.included.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-[#013334]/80">
                      <span className="material-symbols-outlined text-[#CD9933] text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-notoSerif text-xl font-bold mb-5 text-[#013334]">Not Included</h3>
                <ul className="space-y-3">
                  {tour.notIncluded.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-[#013334]/50">
                      <span className="material-symbols-outlined text-red-400 text-lg">cancel</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Itinerary */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#013334]/10">
            <h2 className="font-notoSerif text-2xl font-bold mb-8 text-[#013334]">Day-by-Day Itinerary</h2>
            <div className="relative pl-6 border-l-2 border-dashed border-[#CD9933]/40 space-y-8">
              {tour.itinerary.map((step, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[29px] top-0 w-3.5 h-3.5 rounded-full bg-[#CD9933] ring-4 ring-[#CD9933]/20" />
                  <p className="text-[#CD9933] font-bold text-xs uppercase tracking-widest mb-1">{step.day}</p>
                  <h4 className="font-notoSerif text-lg font-bold text-[#013334] mb-1">{step.title}</h4>
                  <p className="text-[#013334]/60 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Booking Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-[#013334] text-white rounded-2xl p-8 shadow-xl">
            <h3 className="font-notoSerif text-2xl font-bold mb-2">{tour.title}</h3>
            <p className="text-white/50 text-sm mb-6">{tour.subtitle} · {tour.duration}</p>

            <div className="flex justify-between items-center mb-6 pb-6 border-b border-white/10">
              <span className="text-white/60 text-sm">Starting From</span>
              <span className="text-[#CD9933] font-notoSerif text-2xl font-bold">{tour.price}</span>
            </div>

            <a
              href="https://wa.me/923220725064"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 bg-[#CD9933] hover:brightness-110 text-white text-center font-bold uppercase tracking-widest text-sm rounded-xl transition-all mb-3"
            >
              Book Now via WhatsApp
            </a>
            <Link
              to="/contact"
              className="block w-full py-4 border border-white/20 hover:bg-white/10 text-white text-center font-bold uppercase tracking-widest text-sm rounded-xl transition-all"
            >
              Get a Custom Quote
            </Link>

            <div className="mt-8 space-y-3 text-white/60 text-xs">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#CD9933] text-base">verified</span>
                Free cancellation up to 30 days before
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#CD9933] text-base">health_and_safety</span>
                Health Insurance included
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#CD9933] text-base">support_agent</span>
                24/7 on-ground support
              </div>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}

export default InternationalTourDetail
