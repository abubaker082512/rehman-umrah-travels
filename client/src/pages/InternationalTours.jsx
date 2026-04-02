import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const tours = [
  {
    id: 1,
    title: 'Turkey Tour',
    subtitle: 'Istanbul, Cappadocia, Antalya',
    duration: '10 Days / 9 Nights',
    price: 'PKR 285,000',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDo34TNKnDfPALrJLu5UciOIr7LARLN_xMd56yq9UtN280tkvjiEnxN3TtX2PclWHifVh-nu8QV_2cBRDHQyvPmPzZGIZNdK59dTjZS_Z7zyQnU3g6H9XtU6VzrOpldicf7vIybJnfw64PVqTVsjONncJK9U_xFuHg1W1wWMoj67jRKKTctsOdONWmyphd-lo0jqhdNTCIXpryZF3G0yfAhu2sIiRgcLLrXo2593SUcftSq5rTTctJCZOjzrrlvn1FRx-ijiWOD06Kn',
    highlights: ['Blue Mosque', 'Cappadocia Balloon Ride', 'Grand Bazaar', 'Pamukkale'],
    icon: 'place'
  },
  {
    id: 2,
    title: 'Dubai Tour',
    subtitle: 'Dubai, Abu Dhabi, Sharjah',
    duration: '7 Days / 6 Nights',
    price: 'PKR 195,000',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUQYOVnZnCAbJnFrX1nyML3VQoCv0DXi5Irz0Y73qxzjrCnv9Fjfew89pvxdv8ZCASmG7JXvm6ivVtlWSDgDNl6WD5Qkh9yA9ePoYhW5-2lqFxEm_UD-gdv3y855ixx1a4TNrQKs_YDGiCBrtJNtbyqSVu-OpnZy8NM7Q_OjK_9-EAJxvTxySJdH3PL-NHtQ5wCIWYnxE88P2f-rJ9uHs3kO3HDAd20k7SpB0jq8u4Sn1BDaHihQy3xKayJDzjSbhMkeSgMrymfb39',
    highlights: ['Burj Khalifa', 'Desert Safari', 'Dubai Frame', 'Sheikh Zayed Mosque'],
    icon: 'place'
  },
  {
    id: 3,
    title: 'Malaysia Tour',
    subtitle: 'Kuala Lumpur, Genting, Penang',
    duration: '8 Days / 7 Nights',
    price: 'PKR 175,000',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3zaexyac9JYbgc7JJW579-lS9WPkAgTeUI7Z4f5Gl08eeqwiSxGeYnsEo-duQ9zPlj4ciIjAaAHQxZpJWRSzi7QTPiBvQTt5PnQL360TdVEtcUe8-A1xE2f5tRkgQevJB0FH9BEKMxS9GfArHkUk1mmMGLjWSTTIINCUnMLvlQIt-niCyleGQ6NoGhUF9wsVc4M84ENHV6AyrYG2HEoJD3DrsDsNwuv-5k4zPqoMOXRMxOHGoe_2H7qk6_JElzjsy7uAvRdhWRfDf',
    highlights: ['Petronas Towers', 'Genting Highlands', 'Batu Caves', 'Gurney Drive'],
    icon: 'place'
  },
  {
    id: 4,
    title: 'Europe Tour',
    subtitle: 'Paris, Swiss, Rome',
    duration: '12 Days / 11 Nights',
    price: 'PKR 550,000',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBv-MVsZqKBwhFPBQ8VFiq3TU0N5EnqlsYH2DbJRB5qbT_Cq8D2o6SSJOfghgRCyIin6rAX9gA_gYojLbuUrx53KQNs5-IEFKUuQCSPDJADWJ4WR-wdlDFUu341hUW3bpPXn5i_22fhWnEfLqshrlO64tuM__-1f54SpwlxVe2bQGSh0jdBOS_x6jW2ttrKZoyb_W-fAUeq6l6DZazJ7KXpOFW-pVOA24jVsXFRRGsk7z2EjtSS0-inrhXqDyByLzKRQqLQX-m_UhJv',
    highlights: ['Eiffel Tower', 'Swiss Alps', 'Colosseum', 'Lucerne'],
    icon: 'place'
  }
]

const InternationalTours = () => {
  return (
    <div className="bg-surface font-manrope text-on-surface min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDo34TNKnDfPALrJLu5UciOIr7LARLN_xMd56yq9UtN280tkvjiEnxN3TtX2PclWHifVh-nu8QV_2cBRDHQyvPmPzZGIZNdK59dTjZS_Z7zyQnU3g6H9XtU6VzrOpldicf7vIybJnfw64PVqTVsjONncJK9U_xFuHg1W1wWMoj67jRKKTctsOdONWmyphd-lo0jqhdNTCIXpryZF3G0yfAhu2sIiRgcLLrXo2593SUcftSq5rTTctJCZOjzrrlvn1FRx-ijiWOD06Kn" alt="International Tours" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-8 lg:px-24 w-full">
          <div className="max-w-3xl">
            <div className="w-12 h-1 bg-[#CD9933] mb-8"></div>
            <h1 className="font-notoSerif text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Discover the <span className="text-[#CD9933]">World</span>
            </h1>
            <p className="font-manrope text-lg text-white/80 max-w-xl">
              Explore breathtaking destinations beyond Umrah. From the ancient wonders of Turkey to the modern marvels of Dubai, embark on unforgettable journeys with expert guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-24 px-8 max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <h6 className="font-manrope text-[#CD9933] font-bold text-sm tracking-[0.2em] uppercase mb-4">Beyond Borders</h6>
            <h2 className="font-notoSerif text-4xl lg:text-5xl font-bold text-primary leading-tight">Curated International Tours</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tours.map((tour) => (
            <div key={tour.id} className="bg-surface-container-lowest group cursor-pointer overflow-hidden editorial-shadow transition-transform hover:-translate-y-1">
              <div className="relative h-72 overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 asymmetric-clip" src={tour.image} alt={tour.title} />
                <div className="absolute top-4 left-4 bg-[#CD9933] text-white px-4 py-1 text-xs font-bold uppercase tracking-widest rounded">{tour.duration}</div>
              </div>
              <div className="p-8">
                <h3 className="font-notoSerif text-2xl font-bold text-primary mb-1">{tour.title}</h3>
                <p className="text-outline text-sm mb-4 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  {tour.subtitle}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {tour.highlights.map((h, i) => (
                    <span key={i} className="bg-surface-container text-xs px-3 py-1 rounded font-bold text-on-surface">{h}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="block text-xs text-outline">Starting from</span>
                    <span className="text-xl font-extrabold text-[#CD9933]">{tour.price}</span>
                  </div>
                  <button className="bg-[#013334] text-white px-6 py-3 rounded-md font-bold text-sm hover:bg-[#002c2e] transition-all flex items-center gap-2">
                    View Details
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Travel With Us */}
      <section className="py-24 bg-primary-container relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7iqIMSWjJemycSurDzLS49I7vf1E_Ir_9JNdo7vnnjUs42efP_S1dgqe2xI0QDJaKbHo9ZRkqvdYo1bYcwBvEnTPhPclF1OSmgOVghrFtvqeq5b92V1yjUro0sxR_GnE1BNCqYps0QKr0yc_d2G0_23gzKUpiz3nt2gERaWgkbPWLcVYUd6z7noGPOWbDAz3zrOwnleugBBJWc52v2BSX_rOZLmuCn0bBOWhLLmTx7ip4AO3yKpRp0shQrdTuKpNfm0QTUA_N0WM8" alt="Pattern" />
        </div>
        <div className="max-w-screen-2xl mx-auto px-8 relative z-10">
          <div className="text-center mb-16">
            <h6 className="font-manrope text-[#CD9933] font-bold text-sm tracking-[0.2em] uppercase mb-4">Why Choose Us</h6>
            <h2 className="font-notoSerif text-4xl lg:text-5xl font-bold text-white">Travel With Confidence</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4 text-center">
              <div className="text-[#CD9933] bg-white/5 w-16 h-16 flex items-center justify-center rounded-lg mx-auto">
                <span className="material-symbols-outlined text-3xl">verified_user</span>
              </div>
              <h4 className="font-bold text-white font-manrope">Licensed Agency</h4>
              <p className="text-white/60 text-sm leading-relaxed">Fully licensed and certified travel operations for your peace of mind.</p>
            </div>
            <div className="space-y-4 text-center">
              <div className="text-[#CD9933] bg-white/5 w-16 h-16 flex items-center justify-center rounded-lg mx-auto">
                <span className="material-symbols-outlined text-3xl">hotel</span>
              </div>
              <h4 className="font-bold text-white font-manrope">Premium Hotels</h4>
              <p className="text-white/60 text-sm leading-relaxed">Handpicked 4 and 5-star accommodations for a comfortable stay.</p>
            </div>
            <div className="space-y-4 text-center">
              <div className="text-[#CD9933] bg-white/5 w-16 h-16 flex items-center justify-center rounded-lg mx-auto">
                <span className="material-symbols-outlined text-3xl">support_agent</span>
              </div>
              <h4 className="font-bold text-white font-manrope">24/7 Support</h4>
              <p className="text-white/60 text-sm leading-relaxed">Our dedicated team is available around the clock during your trip.</p>
            </div>
            <div className="space-y-4 text-center">
              <div className="text-[#CD9933] bg-white/5 w-16 h-16 flex items-center justify-center rounded-lg mx-auto">
                <span className="material-symbols-outlined text-3xl">group</span>
              </div>
              <h4 className="font-bold text-white font-manrope">Expert Guides</h4>
              <p className="text-white/60 text-sm leading-relaxed">Knowledgeable local guides to enhance your travel experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8">
        <div className="max-w-5xl mx-auto bg-surface-container-lowest text-center p-16 relative overflow-hidden editorial-shadow">
          <div className="relative z-10">
            <h6 className="font-manrope text-[#CD9933] font-bold text-sm tracking-[0.2em] uppercase mb-4">Start Your Adventure</h6>
            <h2 className="font-notoSerif text-3xl md:text-4xl text-primary mb-6">Ready to Explore the World?</h2>
            <p className="text-on-surface-variant font-manrope mb-10 max-w-xl mx-auto">Contact our travel experts today and let us craft your perfect international tour package.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="bg-[#CD9933] text-white px-10 py-4 font-manrope font-bold tracking-widest uppercase text-sm hover:brightness-110 transition-all">Get a Quote</Link>
              <Link to="/contact" className="border-2 border-outline-variant text-primary px-10 py-4 font-manrope font-bold tracking-widest uppercase text-sm hover:bg-surface-container transition-all">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default InternationalTours
