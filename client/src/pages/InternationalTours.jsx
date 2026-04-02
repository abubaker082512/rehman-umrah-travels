import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const InternationalTours = () => {
  return (
    <div className="bg-surface font-manrope text-on-surface min-h-screen">
      <Navbar />
      <section className="pt-24 pb-12 px-6 max-w-5xl mx-auto">
        <h1 className="font-notoSerif text-4xl md:text-5xl font-bold text-primary mb-6">International Tours</h1>
        <p className="text-sm text-on-surface-variant mb-6">Explore curated international itineraries beyond Umrah, with premium experiences.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map((n) => (
            <div key={n} className="bg-surface-container-low p-6 rounded-xl editorial-shadow">
              <h3 className="font-headline text-lg text-primary mb-2">Destination #{n}</h3>
              <p className="text-sm text-on-surface-variant">Discover unique cultures, cuisines and landscapes.</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default InternationalTours
