import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Contact = () => {
  return (
    <div className="bg-surface font-manrope text-on-surface min-h-screen">
      <Navbar />
      <section className="pt-24 pb-12 px-6 max-w-5xl mx-auto">
        <h1 className="font-notoSerif text-4xl md:text-5xl font-bold text-primary mb-6">Contact</h1>
        <p className="text-sm text-on-surface-variant mb-6">Reach out to our travel consultants for quotes, itineraries, and guidance.</p>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          <input className="col-span-2 bg-transparent border-b border-outline-variant py-2 px-1" placeholder="Your Name" />
          <input className="bg-transparent border-b border-outline-variant py-2 px-1" placeholder="Email" />
          <input className="bg-transparent border-b border-outline-variant py-2 px-1" placeholder="Phone" />
          <select className="bg-transparent border-b border-outline-variant py-2 px-1">
            <option>Umrah Packages</option>
            <option>International Tours</option>
          </select>
          <textarea className="col-span-2 bg-transparent border-b border-outline-variant py-2 px-1" placeholder="Your Message" rows={4}></textarea>
          <button className="col-span-2 bg-[#CD9933] text-primary w-full py-3 font-bold rounded-md">Send Message</button>
        </form>
      </section>
      <Footer />
    </div>
  )
}

export default Contact
