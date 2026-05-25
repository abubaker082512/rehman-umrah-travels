import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import ReCAPTCHA from 'react-google-recaptcha'

const API_BASE = import.meta.env.VITE_API_URL || ''

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: 'Umrah Packages', message: '' })
  const [captchaValue, setCaptchaValue] = useState(null)
  const [pageMedia, setPageMedia] = useState({})
  const [cmsContent, setCmsContent] = useState({
    heroTitle: 'Get in Touch', heroSubtitle: 'Have questions about our Umrah packages or international tours? Our travel consultants are ready to assist you.',
    phone1: '0304 111 5530', phone2: '+92 322 072 5064', email: 'info@royalumrahandtravel.com', whatsapp: '+92 322 072 5064',
    addressLahore: 'Main Boulevard, Gulberg III, Lahore, Pakistan', addressKarachi: 'DHA Phase II, Karachi, Pakistan',
  })

  useEffect(() => {
    try {
      const savedMedia = localStorage.getItem('pageMedia')
      if (savedMedia) setPageMedia(JSON.parse(savedMedia))
      const savedContact = localStorage.getItem('cms_contact')
      if (savedContact) setCmsContent(prev => ({...prev, ...JSON.parse(savedContact)}))
    } catch (e) {}

    axios.get(`${API_BASE}/api/cms`)
      .then(res => {
        const data = res.data;
        if (data.page_media && Object.keys(data.page_media).length > 0) {
          setPageMedia(data.page_media)
          localStorage.setItem('pageMedia', JSON.stringify(data.page_media))
        }
        if (data.cms_contact && Object.keys(data.cms_contact).length > 0) {
          setCmsContent(prev => ({...prev, ...data.cms_contact}))
          localStorage.setItem('cms_contact', JSON.stringify(data.cms_contact))
        }
      })
      .catch(err => console.error('Failed to fetch CMS content:', err))
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!captchaValue) {
      alert('Please complete the Captcha validation.')
      return
    }
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
              {cmsContent.heroTitle.includes('Touch') ? (
                <>
                  {cmsContent.heroTitle.split('Touch')[0]}
                  <span className="text-[#CD9933]">Touch</span>
                  {cmsContent.heroTitle.split('Touch')[1]}
                </>
              ) : cmsContent.heroTitle}
            </h1>
            <p className="font-manrope text-base md:text-lg text-white/80 max-w-xl">
              {cmsContent.heroSubtitle}
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
              <a href={`tel:${cmsContent.phone1}`} className="text-[#CD9933] font-bold hover:underline">{cmsContent.phone1}</a>
              <br />
              <a href={`tel:${cmsContent.phone2}`} className="text-[#CD9933] font-bold hover:underline">{cmsContent.phone2}</a>
            </div>

            {/* WhatsApp */}
            <div className="bg-surface-container-lowest p-4 md:p-6 lg:p-8 editorial-shadow hover:-translate-y-1 transition-transform">
              <div className="text-[#CD9933] bg-[#013334]/5 w-14 h-14 flex items-center justify-center rounded-lg mb-4">
                <span className="material-symbols-outlined text-2xl">chat</span>
              </div>
              <h3 className="font-notoSerif text-xl font-bold text-primary mb-2">WhatsApp</h3>
              <p className="text-on-surface-variant text-sm mb-3">Quick responses on WhatsApp</p>
              <a href={`https://wa.me/${cmsContent.whatsapp.replace(/\D/g,'')}`} className="text-[#CD9933] font-bold hover:underline">{cmsContent.whatsapp}</a>
            </div>

            {/* Email */}
            <div className="bg-surface-container-lowest p-4 md:p-6 lg:p-8 editorial-shadow hover:-translate-y-1 transition-transform">
              <div className="text-[#CD9933] bg-[#013334]/5 w-14 h-14 flex items-center justify-center rounded-lg mb-4">
                <span className="material-symbols-outlined text-2xl">mail</span>
              </div>
              <h3 className="font-notoSerif text-xl font-bold text-primary mb-2">Email</h3>
              <p className="text-on-surface-variant text-sm mb-3">We reply within 24 hours</p>
              <a href={`mailto:${cmsContent.email}`} className="text-[#CD9933] font-bold hover:underline">{cmsContent.email}</a>
            </div>

            {/* Office */}
            <div className="bg-surface-container-lowest p-4 md:p-6 lg:p-8 editorial-shadow hover:-translate-y-1 transition-transform">
              <div className="text-[#CD9933] bg-[#013334]/5 w-14 h-14 flex items-center justify-center rounded-lg mb-4">
                <span className="material-symbols-outlined text-2xl">location_on</span>
              </div>
              <h3 className="font-notoSerif text-xl font-bold text-primary mb-2">Office</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                {cmsContent.addressLahore}
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-surface-container-lowest p-8 lg:p-12 editorial-shadow">
              <h2 className="font-notoSerif text-3xl font-bold text-primary mb-2">Send Us a Message</h2>
              <p className="text-on-surface-variant text-sm mb-8">Fill out the form below and our travel consultants will get back to you within 24 hours.</p>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <input 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="peer w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-[#CD9933] focus:ring-0 transition-colors py-3 text-sm text-[#013334] placeholder-transparent outline-none" 
                      placeholder="Full Name" 
                      type="text" 
                      required
                    />
                    <label className="absolute left-0 -top-3.5 text-xs font-bold uppercase tracking-widest text-[#CD9933] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-outline peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#CD9933]">Full Name</label>
                  </div>
                  <div className="relative group">
                    <input 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="peer w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-[#CD9933] focus:ring-0 transition-colors py-3 text-sm text-[#013334] placeholder-transparent outline-none" 
                      placeholder="Email Address" 
                      type="email" 
                      required
                    />
                    <label className="absolute left-0 -top-3.5 text-xs font-bold uppercase tracking-widest text-[#CD9933] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-outline peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#CD9933]">Email Address</label>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <input 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="peer w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-[#CD9933] focus:ring-0 transition-colors py-3 text-sm text-[#013334] placeholder-transparent outline-none" 
                      placeholder="Phone Number" 
                      type="tel" 
                    />
                    <label className="absolute left-0 -top-3.5 text-xs font-bold uppercase tracking-widest text-[#CD9933] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-outline peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#CD9933]">Phone Number</label>
                  </div>
                  <div className="relative group">
                    <select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="peer w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-[#CD9933] focus:ring-0 transition-colors py-3 text-sm text-[#013334] outline-none appearance-none"
                    >
                      <option>Umrah Packages</option>
                      <option>International Tours</option>
                      <option>Visa Services</option>
                      <option>General Inquiry</option>
                    </select>
                    <label className="absolute left-0 -top-3.5 text-xs font-bold uppercase tracking-widest text-[#CD9933]">Subject</label>
                    <div className="absolute right-0 top-3 pointer-events-none text-[#CD9933]">
                      <span className="material-symbols-outlined text-sm">expand_more</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative group">
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="peer w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-[#CD9933] focus:ring-0 transition-colors py-3 text-sm text-[#013334] placeholder-transparent resize-none outline-none" 
                    placeholder="Your Message" 
                    rows={5}
                    required
                  ></textarea>
                  <label className="absolute left-0 -top-3.5 text-xs font-bold uppercase tracking-widest text-[#CD9933] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-outline peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#CD9933]">Your Message</label>
                </div>

                <div className="flex justify-center md:justify-start">
                  <ReCAPTCHA
                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
                    onChange={(val) => setCaptchaValue(val)}
                  />
                </div>
                
                <button type="submit" className="w-full bg-[#013334] text-white py-4 rounded-md font-bold text-sm tracking-widest uppercase shadow-xl hover:bg-[#CD9933] hover:shadow-[#CD9933]/30 transition-all duration-300 flex items-center justify-center gap-2 group">
                  Send Message
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">send</span>
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-center gap-4">
                <span className="text-sm text-outline">Or reach us directly via</span>
                <a href={`https://wa.me/${cmsContent.whatsapp.replace(/\D/g,'')}`} className="flex items-center gap-2 text-[#CD9933] font-bold hover:underline">
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
              {cmsContent.addressLahore}
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
            <a href={`tel:${cmsContent.phone1}`} className="border border-white/30 text-white px-10 py-4 font-manrope font-bold tracking-widest uppercase text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2">
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
