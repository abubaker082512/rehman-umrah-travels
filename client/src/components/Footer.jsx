import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import logo from '../assets/Rehman Travel Logo.png'

const API_BASE = import.meta.env.VITE_API_URL || ''

const Footer = () => {
  const [footerContent, setFooterContent] = useState({
    description: 'Royal Umrah & Travels specializes in crafting meaningful spiritual journeys and world-class tours. We treat every travel plan as a customized masterclass of spiritual fulfillment.',
    quickLinks: ['Home', 'Umrah Packages', 'International Tours', 'Local Tours', 'Gallery', 'Blog', 'FAQ', 'Contact'],
    copyright: '© 2026 Royal Umrah & Travels. All Rights Reserved.',
    socialLinks: { facebook: '', instagram: '', twitter: '', youtube: '' }
  })
  
  const [settings, setSettings] = useState({
    siteName: 'Royal Umrah & Travels',
    address: 'Main Boulevard, Gulberg III, Lahore, Pakistan',
    address2: 'DHA Phase II, Karachi, Pakistan'
  })

  useEffect(() => {
    try {
      const savedFooter = localStorage.getItem('cms_footer')
      if (savedFooter) setFooterContent(prev => ({...prev, ...JSON.parse(savedFooter)}))
      const savedSettings = localStorage.getItem('site_settings')
      if (savedSettings) setSettings(prev => ({...prev, ...JSON.parse(savedSettings)}))
      const savedContact = localStorage.getItem('cms_contact')
      if (savedContact) setSettings(prev => ({...prev, address2: JSON.parse(savedContact).addressKarachi}))
    } catch(e) {}

    axios.get(`${API_BASE}/api/cms`)
      .then(res => {
        const data = res.data;
        if (data.cms_footer && Object.keys(data.cms_footer).length > 0) {
          // preserve custom rearranged menu links even if CMS returns old categories
          const merged = { ...data.cms_footer };
          delete merged.quickLinks; // keep local rearranged list
          setFooterContent(prev => ({...prev, ...merged}))
          localStorage.setItem('cms_footer', JSON.stringify(data.cms_footer))
        }
        if (data.site_settings && Object.keys(data.site_settings).length > 0) {
          setSettings(prev => ({...prev, ...data.site_settings}))
          localStorage.setItem('site_settings', JSON.stringify(data.site_settings))
        }
        if (data.cms_contact && Object.keys(data.cms_contact).length > 0) {
          setSettings(prev => ({...prev, address2: data.cms_contact.addressKarachi}))
        }
      })
      .catch(err => console.error('Footer fetch error:', err))
  }, [])

  const linkMap = {
    'Home': '/',
    'Umrah Packages': '/packages',
    'International Tours': '/international-tours',
    'Local Tours': '/local-tours',
    'Gallery': '/gallery',
    'Blog': '/blog',
    'FAQ': '/faq',
    'Contact': '/contact'
  }

  return (
    <footer className="bg-[#002526] text-white/70 py-16 px-4 sm:px-6 md:px-8 border-t border-white/5 relative z-10 font-manrope">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* TOP SECTION: LOGO + DESCRIPTION & NEWSLETTER */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="max-w-xl">
            <Link to="/" className="inline-block mb-6 select-none">
              <img src={logo} className="h-16 sm:h-20 w-auto" alt="Royal Umrah & Travels Logo" />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-lg">
              {footerContent.description}
            </p>
          </div>

          {/* Newsletter Subscription */}
          <div className="w-full lg:w-auto flex-shrink-0 max-w-md">
            <h5 className="text-[#CD9933] font-bold tracking-widest uppercase text-xs sm:text-sm mb-4">
              Subscribe Our Newsletter
            </h5>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-[450px]">
              <input
                className="bg-white text-gray-800 text-sm px-4 py-3 rounded-lg focus:outline-none flex-1 font-medium placeholder-gray-400 border border-white/15"
                placeholder="Enter Your Email"
                type="email"
              />
              <button className="bg-[#CD9933] hover:brightness-110 text-white font-bold px-6 py-3 rounded-lg transition-all text-sm uppercase tracking-wider cursor-pointer select-none">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: 4 COLUMNS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 py-4 text-left font-manrope">
          
          {/* Column 1: MENU */}
          <div className="space-y-4">
            <h5 className="text-[#CD9933] font-bold tracking-widest uppercase text-xs sm:text-sm border-b border-[#CD9933]/20 pb-2 inline-block">
              Menu
            </h5>
            <ul className="space-y-3">
              {footerContent.quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link to={linkMap[link] || '/'} className="text-white/60 hover:text-[#CD9933] transition-colors text-sm font-medium">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: BOOK NOW */}
          <div className="space-y-4">
            <h5 className="text-[#CD9933] font-bold tracking-widest uppercase text-xs sm:text-sm border-b border-[#CD9933]/20 pb-2 inline-block">
              Book Now
            </h5>
            <ul className="space-y-3 text-white/60 text-sm font-medium">
              <li><Link to="/packages" className="hover:text-[#CD9933] transition-colors">Economy Umrah Packages</Link></li>
              <li><Link to="/packages" className="hover:text-[#CD9933] transition-colors">3 Star Ground Packages</Link></li>
              <li><Link to="/packages" className="hover:text-[#CD9933] transition-colors">4 Star Premium Packages</Link></li>
              <li><Link to="/packages" className="hover:text-[#CD9933] transition-colors">5 Star Luxury Packages</Link></li>
            </ul>
          </div>

          {/* Column 3: FOLLOW US */}
          <div className="space-y-4">
            <h5 className="text-[#CD9933] font-bold tracking-widest uppercase text-xs sm:text-sm border-b border-[#CD9933]/20 pb-2 inline-block">
              Follow Us
            </h5>
            <ul className="space-y-3 text-white/60 text-sm font-medium">
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#CD9933] transition-colors">Facebook</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#CD9933] transition-colors">Twitter</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#CD9933] transition-colors">Instagram</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#CD9933] transition-colors">YouTube</a></li>
            </ul>
          </div>

          {/* Column 4: CONTACT US */}
          <div className="space-y-4">
            <h5 className="text-[#CD9933] font-bold tracking-widest uppercase text-xs sm:text-sm border-b border-[#CD9933]/20 pb-2 inline-block">
              Contact Us
            </h5>
            
            {/* Office Addresses */}
            <div className="space-y-3 text-white/50 text-xs sm:text-sm leading-relaxed mb-6 font-light">
              <p>
                <strong className="text-white/80 block mb-0.5">Lahore Office:</strong>
                {settings.address}
              </p>
              {settings.address2 && (
                <p>
                  <strong className="text-white/80 block mb-0.5">Karachi Office:</strong>
                  {settings.address2}
                </p>
              )}
            </div>

            {/* Email & Phone boxes */}
            <div className="space-y-3">
              {/* Email Box */}
              <a
                href="mailto:info@royalumrahandtravel.com"
                className="flex items-center gap-4 p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/5 transition-all text-left group w-full"
              >
                <div className="w-10 h-10 rounded-lg bg-[#CD9933] flex items-center justify-center text-white flex-shrink-0">
                  <span className="material-symbols-outlined text-xl">mail</span>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-[10px] font-bold text-white/40 uppercase tracking-wider">Email</span>
                  <span className="block text-white group-hover:text-[#CD9933] transition-colors text-xs font-semibold truncate leading-tight">
                    info@royalumrahandtravel.com
                  </span>
                </div>
              </a>

              {/* Phone Box */}
              <a
                href="tel:+923220725064"
                className="flex items-center gap-4 p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/5 transition-all text-left group w-full"
              >
                <div className="w-10 h-10 rounded-lg bg-[#CD9933] flex items-center justify-center text-white flex-shrink-0">
                  <span className="material-symbols-outlined text-xl">call</span>
                </div>
                <div className="flex-1">
                  <span className="block text-[10px] font-bold text-white/40 uppercase tracking-wider">Phone</span>
                  <span className="block text-white group-hover:text-[#CD9933] transition-colors text-sm font-bold leading-tight">
                    0322 072 5064
                  </span>
                </div>
              </a>
            </div>

          </div>

        </div>

        {/* BOTTOM SECTION: PAYMENT CARDS & COPYRIGHT */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10">
          {/* Payment Icons */}
          <div className="flex items-center gap-3">
            {/* Amex */}
            <svg className="w-10 h-6 rounded bg-[#0177B8] p-1 flex items-center justify-center" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.5">AMEX</text>
            </svg>
            {/* Visa */}
            <svg className="w-10 h-6 rounded bg-[#1A1F71] p-1.5 flex items-center justify-center" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 45L22 15H30L23 45H15Z" fill="#F7B600" />
              <path d="M47.7 15.6C44.7 14.5 40.5 14 36.8 14C27.5 14 20.8 18.7 20.6 25.4C20.4 30.4 25.1 33.2 28.7 34.9C32.3 36.6 33.6 37.7 33.5 39.2C33.4 41.5 30.6 42.5 28 42.5C24.4 42.5 22.3 41.6 20.6 40.8L19.4 46.2C21 46.9 24.3 47.5 27.6 47.5C37.5 47.5 44 42.8 44.2 35.6C44.4 30.9 41.5 28.1 36.8 25.9C33 24.1 31.8 23.2 31.8 21.8C31.8 20.2 33.7 18.7 37 18.7C39.9 18.7 42.3 19.3 43.8 20L44.5 20.3L47.7 15.6ZM63.4 15H56L44 45H51.5L53 41H62.5L63.4 45H71L63.4 15ZM54.8 36L57.8 28L60.8 36H54.8ZM87.8 15L80.8 35.8L77.6 19.4C77.2 17.5 75.8 15.6 74 15H66V16.6C68.4 17.5 70.8 19 72.2 20.4L79 45H86.8L99 15H87.8Z" fill="white" />
            </svg>
            {/* Mastercard */}
            <svg className="w-10 h-6 rounded bg-[#222222] p-1 flex items-center justify-center" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="30" r="18" fill="#EB001B" fillOpacity="0.9" />
              <circle cx="60" cy="30" r="18" fill="#F79E1B" fillOpacity="0.9" />
              <path d="M50 18.7C46.8 21.6 44.8 25.6 44.8 30C44.8 34.4 46.8 38.4 50 41.3C53.2 38.4 55.2 34.4 55.2 30C55.2 25.6 53.2 21.6 50 18.7Z" fill="#FF5F00" />
            </svg>
            {/* UnionPay */}
            <svg className="w-10 h-6 rounded bg-[#0C4E7E] p-1 flex items-center justify-center" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 15H50L40 45H5L15 15Z" fill="#C51A1B" />
              <path d="M45 15H80L90 45H55L45 15Z" fill="#007F7F" />
              <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="14" fontWeight="black" fontFamily="sans-serif">UP</text>
            </svg>
          </div>

          {/* Copyright text */}
          <p className="text-[11px] text-white/40 tracking-wider">
            {footerContent.copyright}
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer