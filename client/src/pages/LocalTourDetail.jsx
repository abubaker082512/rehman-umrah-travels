import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const LOCAL_TOURS = [
  {
    id: 201,
    slug: 'swat-valley-spirit',
    title: 'Swat Valley Spirit – The East Switzerland',
    destinations: 'Mingaora, Malam Jabba, Kalam, Ushu Forest',
    duration: '3 Days 2 Nights',
    price: 'PKR 45,000',
    priceNote: 'Per Person (For 1 Person - $250)',
    badge: 'POPULAR',
    heroImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80',
    cardImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
    description: 'Discover the Switzerland of the East — Swat Valley. Unwind alongside pristine streams, visit historical Buddhist sites, and enjoy the snow-capped views and chairlift at Malam Jabba, followed by a journey into the scenic Kalam valley.',
    highlights: ['Malam Jabba Ski Resort & Chairlift', 'White Palace Marghazar', 'Ushu Forest Walk', 'Kalam Valley & Swat River views', 'Swat Museum & Ghalegay Buddha'],
    included: ['Private Transport (Saloon Car)', '2 Nights Hotel Accommodation', 'Fuel & Driver Expenses', 'Jeep Ride to Ushu Forest', 'Daily Breakfast', 'Health Insurance'],
    notIncluded: ['Lunch & Dinner', 'Entry Tickets for Chairlift/Museums', 'Personal Porter/Expenses', 'Tips for Guide & Driver'],
    itinerary: [
      { day: 'Day 1', title: 'Islamabad to Swat via Motorway', desc: 'Drive from Islamabad to Mingora/Fizagat via Swat Motorway. Check-in at hotel and visit White Palace Marghazar. Overnight stay in Mingora.' },
      { day: 'Day 2', title: 'Malam Jabba Excursion & Kalam Valley', desc: 'Morning visit to Malam Jabba Ski Resort. Enjoy activities, chairlift ride, and scenic valley views. Afternoon drive along Swat River to Kalam valley. Overnight stay in Kalam.' },
      { day: 'Day 3', title: 'Ushu Forest Exploration & Return', desc: 'Morning Jeep excursion to the pristine Ushu Pine Forest and scenic tourist spots. Return to Kalam, then drive back to Islamabad. Final drop-off.' }
    ]
  },
  {
    id: 202,
    slug: 'naran-kaghan-summer-escape',
    title: 'Naran & Kaghan Valley Summer Escape',
    destinations: 'Kaghan, Naran, Lake Saif-ul-Muluk, Babusar Top',
    duration: '4 Days 3 Nights',
    price: 'PKR 55,000',
    priceNote: 'Per Person (For 2 Persons - $400)',
    badge: 'BEST SELLER',
    heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80',
    cardImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    description: 'Journey to the breathtaking Lake Saif-ul-Muluk, cross the high-altitude Babusar Pass, and rest by the sparkling Kunhar River. Naran & Kaghan valleys offer the ultimate summer retreat with towering peaks and lush green landscapes.',
    highlights: ['Lake Saif-ul-Muluk (Jeep ride)', 'Babusar Top (13,700 ft)', 'Lulusar Lake', 'Kunhar River Rafting', 'Kiwai Waterfall'],
    included: ['Dedicated Tour Vehicle', '3 Nights Hotel Stay (Naran)', 'Jeep Hire for Saif-ul-Muluk', 'Driver & Fuel Charges', 'Daily Breakfast', 'Health Insurance'],
    notIncluded: ['Lunch & Dinner', 'Activity tickets (Rafting, Zip-line)', 'Personal Expenses/Porter', 'Tips for Driver'],
    itinerary: [
      { day: 'Day 1', title: 'Islamabad to Naran', desc: 'Drive through Abbottabad and Mansehra. Rest stop at Kiwai Waterfall. Continue along Kunhar River to Naran. Evening walk in Naran Bazar.' },
      { day: 'Day 2', title: 'Lake Saif-ul-Muluk Excursion', desc: 'Morning jeep ride to the legendary and mystical Lake Saif-ul-Muluk. Spend time boating and enjoying the snow-clad peaks. Afternoon free for river rafting or shopping.' },
      { day: 'Day 3', title: 'Babusar Pass & Lulusar Lake Day Trip', desc: 'Drive to the majestic Babusar Top (13,700 ft) for a panoramic view of the mountains. On the return journey, visit Lulusar Lake and the scenic Pyala Lake. Overnight in Naran.' },
      { day: 'Day 4', title: 'Return Journey to Islamabad', desc: 'Check out and drive back to Islamabad. Brief stop at Balakot by the river. Evening arrival in Islamabad.' }
    ]
  },
  {
    id: 203,
    slug: 'neelum-valley-kashmir',
    title: 'Neelum Valley Kashmir Heavenly Serenity',
    destinations: 'Muzaffarabad, Keran, Sharda, Kel, Arang Kel',
    duration: '4 Days 3 Nights',
    price: 'PKR 50,000',
    priceNote: 'Per Person',
    badge: 'TRENDING',
    heroImage: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1600&q=80',
    cardImage: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&q=80',
    description: 'Explore lush green meadows, crystalline blue streams, and historical ruins in the heart of Azad Jammu & Kashmir. Neelum Valley is a paradise on earth, stretching along the roaring Neelum River with scenic wooden villages.',
    highlights: ['Kutton Waterfall', 'Keran (Line of Control view)', 'Sharda Peeth ancient ruins', 'Kel & Arang Kel trek', 'Dhani Waterfall'],
    included: ['4x4 SUV or Saloon Car Transport', '3 Nights Premium Hotel Stay', 'Arang Kel Chairlift Tickets', 'Local Guide Assistance', 'Daily Breakfast', 'Health Insurance'],
    notIncluded: ['Lunch & Dinner', 'Personal Porters/Horses', 'Entry fees/Activity charges', 'Tips'],
    itinerary: [
      { day: 'Day 1', title: 'Islamabad to Keran', desc: 'Drive to Muzaffarabad, Azad Kashmir. Stop at the massive Dhani Waterfall and Kutton Waterfall. Check-in at Keran, situated right opposite the Line of Control on Neelum River.' },
      { day: 'Day 2', title: 'Sharda Peeth Ruins & Kel', desc: 'Drive deeper into the valley along the river to Sharda. Tour the ancient archaeological site of Sharda Peeth university. Overnight in Sharda/Kel.' },
      { day: 'Day 3', title: 'Arang Kel Meadow Trek', desc: 'Take a short drive to Kel. Hop on the chairlift or hike up to the picturesque Arang Kel lush green village. Explore the pine forest. Return to Sharda for overnight stay.' },
      { day: 'Day 4', title: 'Return Journey to Islamabad', desc: 'Drive back to Islamabad via Muzaffarabad. Sightseeing stops on the way. Late evening drop-off in Islamabad.' }
    ]
  },
  {
    id: 204,
    slug: 'skardu-roof-of-world',
    title: 'Skardu – The Roof of the World',
    destinations: 'Shangrila Resort, Cold Desert, Satpara Lake, Shigar Fort',
    duration: '5 Days 4 Nights',
    price: 'PKR 65,000',
    priceNote: 'Per Person',
    badge: 'ADVENTURE',
    heroImage: 'https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?w=1600&q=80',
    cardImage: 'https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?w=800&q=80',
    description: 'Stand at the foot of K2 and Karakoram giant peaks. Explore the serene Shangrila Resort, pristine Satpara Lake, Katpana Cold Desert, and the ancient Skardu Fort in the heart of Gilgit-Baltistan.',
    highlights: ['Shangrila Resort & Upper Kachura Lake', 'Katpana Cold Desert dunes', 'Satpara Lake boating', 'Kharpocho Fort (Skardu Fort)', 'Manthoka Waterfall'],
    included: ['Airport Transfers / Jeep Transport', '4 Nights Hotel Stay (Skardu)', 'Upper Kachura Lake boat ride', 'Fuel & Professional Driver', 'Daily Breakfast', 'Health Insurance'],
    notIncluded: ['Flights to/from Skardu', 'Lunch & Dinner', 'Jeep to Deosai (optional)', 'Tips'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Skardu & Shangrila', desc: 'Arrive at Skardu Airport. Transfer to hotel. Afternoon visit to Shangrila Lake Resort and Upper Kachura Lake for a scenic boat ride.' },
      { day: 'Day 2', title: 'Cold Desert & Skardu Fort hike', desc: 'Visit Katpana Cold Desert (one of the highest cold deserts in the world). Afternoon hike up to Kharpocho Fort (Skardu Fort) for a bird\'s-eye view of the Indus River.' },
      { day: 'Day 3', title: 'Excursion to Manthoka Waterfall', desc: 'Take a scenic day trip to the spectacular 180-foot Manthoka Waterfall in the Kharmang Valley. Enjoy the local trout fish lunch nearby.' },
      { day: 'Day 4', title: 'Satpara Lake & Shigar Valley', desc: 'Visit the pristine turquoise Satpara Lake. Later, drive to Shigar Valley to explore the ancient Shigar Fort, a restored heritage residence.' },
      { day: 'Day 5', title: 'Departure', desc: 'Transfer to Skardu Airport for your return flight or start the return road trip. End of services.' }
    ]
  }
]

export { LOCAL_TOURS }

const LocalTourDetail = () => {
  const { id } = useParams()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const tour = LOCAL_TOURS.find(t => String(t.id) === String(id) || t.slug === id)

  if (!tour) {
    return (
      <div className="min-h-screen flex flex-col bg-[#002526] font-manrope">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-white gap-6 px-4">
          <span className="material-symbols-outlined text-7xl text-[#CD9933]">travel_explore</span>
          <h1 className="font-notoSerif text-4xl font-bold">Tour Not Found</h1>
          <p className="text-white/60 text-center max-w-sm">The tour you're looking for doesn't exist or may have been updated.</p>
          <Link to="/local-tours" className="bg-[#CD9933] text-white px-8 py-3 font-bold tracking-widest text-sm uppercase hover:brightness-110 transition-all rounded-lg">
            View All Local Tours
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
          alt={tour.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#002526] via-[#002526]/50 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pb-12">
          <Link
            to="/local-tours"
            className="inline-flex items-center gap-2 text-white/70 hover:text-[#CD9933] transition-colors text-sm font-semibold mb-6 group"
          >
            <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
            All Local Tours
          </Link>
          <div className="flex flex-wrap items-end gap-4 justify-between">
            <div>
              <span className="inline-block bg-[#CD9933] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">{tour.badge}</span>
              <h1 className="font-notoSerif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight max-w-3xl">{tour.title}</h1>
              <p className="text-white/70 mt-2 text-sm font-medium">{tour.destinations}</p>
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
                <span className="material-symbols-outlined text-[#CD9933]">location_on</span>
                <div>
                  <p className="text-[10px] text-[#013334]/50 uppercase tracking-wider font-bold">Region</p>
                  <p className="font-bold text-sm text-[#013334]">Pakistan</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-[#013334]/5 rounded-xl px-4 py-3">
                <span className="material-symbols-outlined text-[#CD9933]">pin_drop</span>
                <div>
                  <p className="text-[10px] text-[#013334]/50 uppercase tracking-wider font-bold">Destinations</p>
                  <p className="font-bold text-sm text-[#013334] line-clamp-1">{tour.destinations}</p>
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
            <p className="text-white/50 text-sm mb-6">{tour.destinations} · {tour.duration}</p>

            <div className="flex justify-between items-center mb-6 pb-6 border-b border-white/10">
              <span className="text-white/60 text-sm">Starting From</span>
              <span className="text-[#CD9933] font-notoSerif text-2xl font-bold">{tour.price}</span>
            </div>

            <a
              href={`https://wa.me/923220725064?text=Hello%20Royal%20Umrah%20%26%20Travels,%20I%20would%20like%20to%20book%20the%20${encodeURIComponent(tour.title)}.`}
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
                Free cancellation up to 15 days before
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#CD9933] text-base">health_and_safety</span>
                Health Insurance included
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#CD9933] text-base">support_agent</span>
                24/7 Local ground support
              </div>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}

export default LocalTourDetail
