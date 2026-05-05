import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: 'Umrah Packages', message: '' })
  const [pageMedia, setPageMedia] = useState({})

  useEffect(() => {
    const savedMedia = localStorage.getItem('pageMedia')
    if (savedMedia) {
      try {
        const parsed = JSON.parse(savedMedia)
        if (parsed && Object.keys(parsed).length > 0) {
          setPageMedia(parsed)
        }
      } catch (e) {}
    }
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    alert('Thank you for your message! Our team will contact you within 24 hours.')
  }

  return (
    <div className="bg-surface font-manrope text-on-surface min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" src={pageMedia.contact_hero_image || "https://images.unsplash.com/photo-1572949645079-6416a599c6ae?w=1600&q=80"} alt="Contact Us" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-24 w-full">
          <div className="max-w-3xl">
            <div className="w-12 h-1 bg-[#CD9933] mb-6 md:mb-8"></div>
            <h1 className="font-notoSerif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Get in <span className="text-[#CD9933]">Touch</span>
            </h1>
            <p className="font-manrope text-base md:text-lg text-white/80 max-w-xl">
              Have questions about our Umrah packages or international tours? Our travel consultants are ready to assist you with personalized guidance and support.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* Phone */}
            <div className="bg-surface-container-lowest p-4 md:p-6 lg:p-8 editorial-shadow hover:-translate-y-1 transition-transform">
              <div className="text-[#CD9933] bg-[#013334]/5 w-14 h-14 flex items-center justify-center rounded-lg mb-4">
                <span className="material-symbols-outlined text-2xl">call</span>
              </div>
              <h3 className="font-notoSerif text-xl font-bold text-primary mb-2">Call Us</h3>
              <p className="text-on-surface-variant text-sm mb-3">Available 24/7 for your inquiries</p>
              <a href="tel:+923001234567" className="text-[#CD9933] font-bold hover:underline">+92 300 123 4567</a>
              <br />
              <a href="tel:+924212345678" className="text-[#CD9933] font-bold hover:underline">+92 42 123 4567</a>
            </div>

            {/* WhatsApp */}
            <div className="bg-surface-container-lowest p-4 md:p-6 lg:p-8 editorial-shadow hover:-translate-y-1 transition-transform">
              <div className="text-[#CD9933] bg-[#013334]/5 w-14 h-14 flex items-center justify-center rounded-lg mb-4">
                <span className="material-symbols-outlined text-2xl">chat</span>
              </div>
              <h3 className="font-notoSerif text-xl font-bold text-primary mb-2">WhatsApp</h3>
              <p className="text-on-surface-variant text-sm mb-3">Quick responses on WhatsApp</p>
              <a href="https://wa.me/923001234567" className="text-[#CD9933] font-bold hover:underline">+92 300 123 4567</a>
            </div>

            {/* Email */}
            <div className="bg-surface-container-lowest p-4 md:p-6 lg:p-8 editorial-shadow hover:-translate-y-1 transition-transform">
              <div className="text-[#CD9933] bg-[#013334]/5 w-14 h-14 flex items-center justify-center rounded-lg mb-4">
                <span className="material-symbols-outlined text-2xl">mail</span>
              </div>
              <h3 className="font-notoSerif text-xl font-bold text-primary mb-2">Email</h3>
              <p className="text-on-surface-variant text-sm mb-3">We reply within 24 hours</p>
              <a href="mailto:info@rehmanumrah.com" className="text-[#CD9933] font-bold hover:underline">info@rehmanumrah.com</a>
            </div>

            {/* Office */}
            <div className="bg-surface-container-lowest p-4 md:p-6 lg:p-8 editorial-shadow hover:-translate-y-1 transition-transform">
              <div className="text-[#CD9933] bg-[#013334]/5 w-14 h-14 flex items-center justify-center rounded-lg mb-4">
                <span className="material-symbols-outlined text-2xl">location_on</span>
              </div>
              <h3 className="font-notoSerif text-xl font-bold text-primary mb-2">Office</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Main Boulevard, Gulberg III<br />
                Lahore, Pakistan
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-surface-container-lowest p-8 lg:p-12 editorial-shadow">
              <h2 className="font-notoSerif text-3xl font-bold text-primary mb-2">Send Us a Message</h2>
              <p className="text-on-surface-variant text-sm mb-8">Fill out the form below and our travel consultants will get back to you within 24 hours.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Full Name</label>
                    <input 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 transition-colors py-3 text-sm" 
                      placeholder="Enter your name" 
                      type="text" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Email Address</label>
                    <input 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 transition-colors py-3 text-sm" 
                      placeholder="Enter your email" 
                      type="email" 
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Phone Number</label>
                    <input 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 transition-colors py-3 text-sm" 
                      placeholder="+92 XXXXX XXXXX" 
                      type="tel" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Subject</label>
                    <select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 transition-colors py-3 text-sm appearance-none"
                    >
                      <option>Umrah Packages</option>
                      <option>International Tours</option>
                      <option>Visa Services</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Your Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 transition-colors py-3 text-sm resize-none" 
                    placeholder="Tell us about your travel plans or questions..." 
                    rows={5}
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="w-full bg-gradient-to-r from-[#7d5800] to-[#CD9933] text-white py-4 rounded-md font-bold text-sm tracking-widest uppercase shadow-lg shadow-[#7d5800]/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
                  Send Message
                  <span className="material-symbols-outlined text-sm">send</span>
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-center gap-4">
                <span className="text-sm text-outline">Or reach us directly via</span>
                <a href="https://wa.me/923001234567" className="flex items-center gap-2 text-[#CD9933] font-bold hover:underline">
                  <span className="material-symbols-outlined">chat</span>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-16 md:pb-24 px-4 sm:px-6 md:px-8 max-w-screen-2xl mx-auto">
        <div className="bg-surface-container-lowest editorial-shadow overflow-hidden">
          <div className="p-4 md:p-8 border-b border-outline-variant/10">
            <h3 className="font-notoSerif text-2xl font-bold text-primary mb-2">Our Location</h3>
            <p className="text-on-surface-variant text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[#CD9933]">location_on</span>
              Main Boulevard, Gulberg III, Lahore, Pakistan
            </p>
          </div>
          <div className="h-64 md:h-80 bg-surface-container flex items-center justify-center">
            <div className="text-center">
              <span className="material-symbols-outlined text-6xl text-outline-variant mb-4 block">map</span>
              <p className="text-on-surface-variant">Interactive map placeholder</p>
              <p className="text-sm text-outline mt-2">Google Maps integration available</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary-container relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 text-center">
          <h6 className="font-manrope text-[#CD9933] font-bold text-sm tracking-[0.2em] uppercase mb-4">Ready to Travel?</h6>
          <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Let Us Plan Your Journey</h2>
          <p className="text-white/60 mb-10 max-w-xl mx-auto">Whether it's a spiritual Umrah journey or an international adventure, our experts are here to make it happen.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/packages" className="bg-[#CD9933] text-white px-10 py-4 font-manrope font-bold tracking-widest uppercase text-sm hover:brightness-110 transition-all">View Packages</Link>
            <a href="tel:+923001234567" className="border border-white/30 text-white px-10 py-4 font-manrope font-bold tracking-widest uppercase text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2">
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

export default Contact
