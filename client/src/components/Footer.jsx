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
    <footer className="bg-[#013334] text-white border-t border-white/5 relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12 px-6 sm:px-8 md:px-12 py-12 md:py-20 w-full max-w-screen-2xl mx-auto">
        
        {/* Column 1: Logo and Brand Description */}
        <div className="space-y-6 lg:col-span-1">
          <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
            <img src={logo} alt="Royal Umrah & Travels Logo" className="h-16 sm:h-20 w-auto" />
          </Link>
          <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-manrope font-light">
            {footerContent.description}
          </p>
        </div>

        {/* Column 2: Explore (Gold Heading) */}
        <div>
          <h5 className="font-notoSerif text-base sm:text-lg text-[#CD9933] font-bold mb-6 tracking-wide uppercase">Explore</h5>
          <ul className="space-y-3.5">
            {footerContent.quickLinks.map((link, idx) => (
              <li key={idx}>
                <Link to={linkMap[link] || '/'} className="text-white/60 hover:text-[#CD9933] transition-all text-xs sm:text-sm font-manrope font-medium">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Book Now & Top Deals (Gold Heading) */}
        <div>
          <h5 className="font-notoSerif text-base sm:text-lg text-[#CD9933] font-bold mb-6 tracking-wide uppercase">Book Now</h5>
          <ul className="space-y-3.5 text-white/60 text-xs sm:text-sm font-manrope font-medium">
            <li>
              <Link to="/packages" className="hover:text-[#CD9933] transition-all">
                Economy Umrah Packages
              </Link>
            </li>
            <li>
              <Link to="/packages" className="hover:text-[#CD9933] transition-all">
                3 Star Ground Packages
              </Link>
            </li>
            <li>
              <Link to="/packages" className="hover:text-[#CD9933] transition-all">
                4 Star Premium Packages
              </Link>
            </li>
            <li>
              <Link to="/packages" className="hover:text-[#CD9933] transition-all">
                5 Star Luxury Packages
              </Link>
            </li>
            <li>
              <Link to="/local-tours" className="hover:text-[#CD9933] transition-all text-[#CD9933]">
                Pakistan Northern Tours
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Us (Gold Heading) */}
        <div>
          <h5 className="font-notoSerif text-base sm:text-lg text-[#CD9933] font-bold mb-6 tracking-wide uppercase">Contact Us</h5>
          <ul className="space-y-4 text-white/60 text-xs sm:text-sm font-manrope font-light">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#CD9933] text-sm mt-1 font-bold">location_on</span>
              <span>{settings.address}</span>
            </li>
            {settings.address2 && (
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#CD9933] text-sm mt-1 font-bold">location_on</span>
                <span>{settings.address2}</span>
              </li>
            )}
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#CD9933] text-sm font-bold">call</span>
              <a href="tel:+923041115530" className="hover:text-[#CD9933] transition-colors">0304 111 5530</a>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#CD9933] text-sm font-bold">mail</span>
              <a href="mailto:info@royalumrahandtravel.com" className="hover:text-[#CD9933] transition-colors">info@royalumrahandtravel.com</a>
            </li>
          </ul>
        </div>

        {/* Column 5: Newsletter (Gold Heading) */}
        <div>
          <h5 className="font-notoSerif text-base sm:text-lg text-[#CD9933] font-bold mb-6 tracking-wide uppercase">Newsletter</h5>
          <p className="text-white/60 text-xs leading-relaxed font-manrope font-light mb-4">
            Stay updated with the latest Umrah deals and Northern Pakistan group tour announcements.
          </p>
          <div className="flex gap-2">
            <input 
              className="bg-white/5 border-0 border-b border-white/20 text-white text-xs sm:text-sm py-2 px-3 w-full focus:ring-0 focus:border-[#CD9933] outline-none" 
              placeholder="Email Address" 
              type="email" 
            />
            <button className="text-[#CD9933] hover:scale-105 active:scale-95 transition-all">
              <span className="material-symbols-outlined font-bold">send</span>
            </button>
          </div>
        </div>

      </div>
      <div className="border-t border-white/5 px-6 md:px-12 py-6 md:py-8 text-center bg-black/10">
        <p className="text-white/40 text-xs font-manrope font-light">{footerContent.copyright}</p>
      </div>
    </footer>
  )
}

export default Footer