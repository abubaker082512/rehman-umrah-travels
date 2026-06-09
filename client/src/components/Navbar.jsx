import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/Rehman Travel Logo.png'

const Navbar = ({ isVersion2 = false }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const links = [
    { to: '/', label: 'Home' },
    { to: '/home4', label: 'Home 4 (Box Hero)' },
    { to: '/packages', label: 'Umrah Packages' },
    { to: '/international-tours', label: 'International Tours' },
    { to: '/local-tours', label: 'Local Tours' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/blog', label: 'Blog' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contact', label: 'Contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = () => {
    setDrawerOpen(false)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-20 sm:h-24 transition-all duration-500 ease-in-out border-b ${
          isScrolled
            ? 'bg-[#013334]/75 backdrop-blur-md border-[#CD9933]/20 shadow-[0_15px_40px_rgba(0,28,29,0.35)] text-white'
            : 'bg-[#013334]/75 backdrop-blur-md border-transparent text-white'
        }`}
      >
        <div className="relative w-full h-full flex justify-between items-center px-4 sm:px-6 md:px-8 max-w-screen-2xl mx-auto">
          
          {/* LEFT: Burger Menu Button & Brand Logo */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Elegant Gold-Teal Burger Button */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center justify-center p-3 rounded-lg border transition-all duration-300 bg-[#CD9933]/15 border-[#CD9933]/25 text-[#CD9933] hover:bg-[#CD9933]/30"
              aria-label="Open side menu"
            >
              <span className="material-symbols-outlined font-bold">menu</span>
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src={logo}
                alt="Rehman Travel Logo"
                className={`transition-all duration-500 ${
                  isScrolled ? 'h-12 sm:h-16' : 'h-16 sm:h-20'
                } w-auto`}
              />
            </Link>
          </div>

          {/* MIDDLE / DYNAMIC GLIDING BUTTONS CONTAINER */}
          {/* 
            Desktop Animation Mechanic:
            - When unscrolled: centered absolute in the header.
            - When scrolled: glides smoothly to the far right.
            Mobile: Hidden, replaced by clean right-aligned flex buttons to prevent overlapping.
          */}
          <div
            className="absolute top-1/2 hidden md:flex items-center gap-3 sm:gap-4 transition-all duration-700 select-none z-10"
            style={{
              transform: 'translateY(-50%)',
              left: isScrolled
                ? 'calc(100% - 370px)' // desktop far-right position (leaving room for end margins)
                : '50%',
              marginLeft: isScrolled ? '0' : '-170px', // center offset compensation when not scrolled
              opacity: 1,
            }}
          >
            {/* Call Support Button */}
            <a
              href="tel:+923220725064"
              className="hidden sm:flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-lg border border-[#CD9933]/35 text-[#CD9933] hover:bg-[#CD9933] hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-300"
            >
              <span className="material-symbols-outlined text-sm font-bold">call</span>
              <span>0322 072 5064</span>
            </a>

            {/* WhatsApp Chat Button */}
            <a
              href="https://wa.me/923220725064?text=Hello%20Royal%20Umrah%20%26%20Travels,%20I%20would%20like%20to%20inquire%20about%20Umrah%20packages."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-lg bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:bg-[#20ba5a] hover:scale-[1.03] transition-all"
            >
              {/* WhatsApp custom inline SVG for maximum responsiveness */}
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.004 2C6.51 2 2.014 6.5 2.014 12c0 2.13.67 4.19 1.93 5.92L2 22l4.24-1.35c1.67.92 3.56 1.4 5.48 1.4h.003c5.494 0 9.99-4.5 9.99-10S17.498 2 12.004 2zm5.72 13.9c-.24.7-1.42 1.3-1.95 1.4-.48.1-.96.2-2.92-.6-2.51-1-4.08-3.5-4.2-3.7-.12-.15-1.02-1.37-1.02-2.61 0-1.24.65-1.85.88-2.1.24-.25.53-.3.7-.3h.5c.18 0 .42-.07.65.48.24.6 1.15 2.8 1.24 3 .09.18.09.39-.03.6-.12.21-.26.35-.38.5-.12.15-.26.3-.1.57.34.6.76 1.1 1.25 1.5.64.55 1.18.8 1.5.97.32.17.5.1.7-.1.2-.24.88-1.02 1.11-1.37.24-.35.48-.3.8-.18.33.12 2.1 1 2.46 1.18.36.18.6.27.69.42.09.15.09.84-.15 1.54z"/>
              </svg>
              <span>Chat With Us</span>
            </a>
          </div>

          {/* RIGHT container: Mobile Actions (Visible only on mobile/tablet < md) */}
          <div className="flex md:hidden items-center gap-3">
            {/* Call Support Button */}
            <a
              href="tel:+923220725064"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-[#CD9933]/35 text-[#CD9933] hover:bg-[#CD9933]/15 transition-colors active:scale-95"
              aria-label="Call Support"
            >
              <span className="material-symbols-outlined text-sm font-bold">call</span>
            </a>

            {/* WhatsApp Chat Button */}
            <a
              href="https://wa.me/923220725064?text=Hello%20Royal%20Umrah%20%26%20Travels,%20I%20would%20like%20to%20inquire%20about%20Umrah%20packages."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#25D366] text-white shadow-md hover:bg-[#20ba5a] active:scale-95 transition-all"
              aria-label="Chat with Us on WhatsApp"
            >
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.004 2C6.51 2 2.014 6.5 2.014 12c0 2.13.67 4.19 1.93 5.92L2 22l4.24-1.35c1.67.92 3.56 1.4 5.48 1.4h.003c5.494 0 9.99-4.5 9.99-10S17.498 2 12.004 2zm5.72 13.9c-.24.7-1.42 1.3-1.95 1.4-.48.1-.96.2-2.92-.6-2.51-1-4.08-3.5-4.2-3.7-.12-.15-1.02-1.37-1.02-2.61 0-1.24.65-1.85.88-2.1.24-.25.53-.3.7-.3h.5c.18 0 .42-.07.65.48.24.6 1.15 2.8 1.24 3 .09.18.09.39-.03.6-.12.21-.26.35-.38.5-.12.15-.26.3-.1.57.34.6.76 1.1 1.25 1.5.64.55 1.18.8 1.5.97.32.17.5.1.7-.1.2-.24.88-1.02 1.11-1.37.24-.35.48-.3.8-.18.33.12 2.1 1 2.46 1.18.36.18.6.27.69.42.09.15.09.84-.15 1.54z"/>
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* STUNNING GOLD-ACCENTED Burger Sidebar Menu Drawer */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-500 ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop blur overlay */}
        <div
          onClick={() => setDrawerOpen(false)}
          className="absolute inset-0 bg-[#001c1d]/65 backdrop-blur-md"
        />

        {/* Side menu content */}
        <div
          className={`absolute top-0 left-0 h-full w-[290px] sm:w-[320px] bg-[#001c1d] border-r border-[#CD9933]/15 shadow-2xl p-6 sm:p-8 flex flex-col justify-between transition-transform duration-500 ease-in-out ${
            drawerOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div>
            {/* Header in Drawer */}
            <div className="flex justify-between items-center mb-10">
              <img src={logo} alt="Rehman Travel Logo" className="h-12 w-auto" />
              <button
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-center w-8 h-8 rounded-full border border-[#CD9933]/20 text-[#CD9933] hover:bg-[#CD9933]/10 transition-colors"
              >
                <span className="material-symbols-outlined text-sm font-bold">close</span>
              </button>
            </div>

            {/* Menu Links */}
            <nav className="space-y-4">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `flex items-center gap-4 py-2.5 px-4 rounded-lg font-manrope font-semibold text-sm tracking-wide transition-all ${
                      isActive
                        ? 'text-white bg-[#CD9933]/15 border-l-4 border-[#CD9933]'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Footer in Drawer */}
          <div className="pt-6 border-t border-[#CD9933]/10">
            <Link
              to="/packages"
              onClick={handleLinkClick}
              className="block w-full py-3 bg-[#CD9933] text-white text-center rounded-lg font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Book Pilgrimage
            </Link>
            <p className="text-[10px] text-white/40 text-center mt-4">
              &copy; {new Date().getFullYear()} Royal Umrah & Travels
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
