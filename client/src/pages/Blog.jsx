import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Blog = () => {
  return (
    <div className="bg-surface font-manrope text-on-surface min-h-screen">
      <Navbar />
      <section className="pt-24 pb-12 px-6 max-w-5xl mx-auto">
        <h1 className="font-notoSerif text-4xl md:text-5xl font-bold text-primary mb-6">Blog</h1>
        <p className="text-sm text-on-surface-variant mb-8">Latest travel insights, guides, and updates from Royal Umrah Travel.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3].map((i) => (
            <div key={i} className="bg-surface-container-low p-6 rounded-xl editorial-shadow">
              <h3 className="font-headline text-xl mb-2">Travel Tips #{i}</h3>
              <p className="text-sm text-on-surface-variant">A short blurb about travel planning and destination insights.</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Blog
