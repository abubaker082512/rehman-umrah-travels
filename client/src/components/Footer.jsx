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
    <footer className="bg-[#013334] text-white/50 py-16 px-6 border-t border-white/5 text-xs relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Centered Logo at the top */}
        <div className="flex flex-col items-center text-center select-none">
          <span className="text-white text-3xl font-bold tracking-widest uppercase font-headline">
            ROYAL
            <span className="text-[#CD9933]">/</span>
          </span>
          <span className="text-white/60 text-[9px] font-bold tracking-[0.38em] uppercase -mt-1 pl-[2px] font-manrope">
            UMRAH & TRAVELS
          </span>
        </div>

        <hr className="border-white/5" />

        {/* 5 Clean Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 text-left font-manrope">
          {/* Col 1: Contact Us */}
          <div className="space-y-4">
            <h5 className="text-[#CD9933] font-bold tracking-widest uppercase text-sm sm:text-base font-headline">Contact Us</h5>
            <div className="space-y-2.5 leading-relaxed text-white/60 text-xs sm:text-sm font-manrope font-light">
              <p>{settings.address}</p>
              {settings.address2 && <p>{settings.address2}</p>}
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#CD9933] text-xs">call</span>
                <a href="tel:+923041115530" className="hover:text-[#CD9933] transition-colors">0304 111 5530</a>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#CD9933] text-xs">call</span>
                <a href="tel:+923220725064" className="hover:text-[#CD9933] transition-colors">+92 322 072 5064</a>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#CD9933] text-xs">mail</span>
                <a href="mailto:info@royalumrahandtravel.com" className="hover:text-[#CD9933] transition-colors">info@royalumrahandtravel.com</a>
              </p>
            </div>
          </div>

          {/* Col 2: Book Now */}
          <div className="space-y-4">
            <h5 className="text-[#CD9933] font-bold tracking-widest uppercase text-sm sm:text-base font-headline">Book Now</h5>
            <ul className="space-y-2.5 text-white/60 text-xs sm:text-sm font-manrope font-medium">
              <li><Link to="/packages" className="hover:text-[#CD9933] transition-colors">Economy Umrah Packages</Link></li>
              <li><Link to="/packages" className="hover:text-[#CD9933] transition-colors">3 Star Ground Packages</Link></li>
              <li><Link to="/packages" className="hover:text-[#CD9933] transition-colors">4 Star Premium Packages</Link></li>
              <li><Link to="/packages" className="hover:text-[#CD9933] transition-colors">5 Star Luxury Packages</Link></li>
            </ul>
          </div>

          {/* Col 3: Explore */}
          <div className="space-y-4">
            <h5 className="text-[#CD9933] font-bold tracking-widest uppercase text-sm sm:text-base font-headline">Explore</h5>
            <ul className="space-y-2.5">
              {footerContent.quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link to={linkMap[link] || '/'} className="text-white/60 hover:text-[#CD9933] transition-colors text-xs sm:text-sm font-manrope font-medium">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Top Deals */}
          <div className="space-y-4">
            <h5 className="text-[#CD9933] font-bold tracking-widest uppercase text-sm sm:text-base font-headline">Top Deals</h5>
            <ul className="space-y-2.5 text-white/60 text-xs sm:text-sm font-manrope font-medium">
              <li><Link to="/packages" className="hover:text-[#CD9933] transition-colors">Dubai New Year Special</Link></li>
              <li><Link to="/packages" className="hover:text-[#CD9933] transition-colors">Kashmir Autumn Retreat</Link></li>
              <li><Link to="/packages" className="hover:text-[#CD9933] transition-colors">Turkey Spring Deal</Link></li>
              <li><Link to="/local-tours" className="hover:text-[#CD9933] transition-colors">Pakistan Northern Tours</Link></li>
            </ul>
          </div>

          {/* Col 5: Newsletter */}
          <div className="space-y-4">
            <h5 className="text-[#CD9933] font-bold tracking-widest uppercase text-sm sm:text-base font-headline">Newsletter</h5>
            <p className="leading-relaxed text-white/60 text-xs font-manrope font-light">Subscribe to get alerts on flash flight bookings and destination price cuts.</p>
            <div className="flex gap-2">
              <input
                className="bg-white/5 border border-white/10 text-white text-xs px-3.5 py-2.5 focus:border-[#CD9933] outline-none flex-1"
                placeholder="Your Email Address"
                type="email"
              />
              <button className="bg-[#CD9933] hover:bg-white hover:text-[#013334] text-primary px-4 py-2.5 transition-colors font-bold text-xs uppercase tracking-widest cursor-pointer">
                GO
              </button>
            </div>
          </div>
        </div>

        <hr className="border-white/5" />

        {/* Bottom copyright row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] tracking-wider uppercase font-medium text-white/40">
          <p>{footerContent.copyright}</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer