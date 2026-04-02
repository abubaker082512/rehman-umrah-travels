import React from 'react'
import { Link, NavLink } from 'react-router-dom'

// Inlined SVG logo using the project color tokens for a modern, dynamic logo.
const LogoSVG = () => (
  <svg width="150" height="40" viewBox="0 0 300 80" xmlns="http://www.w3.org/2000/svg" aria-label="Royal Umrah Travel Logo">
    <defs>
      <linearGradient id="gradGold" x1="0" x2="1" y1="0" y2="0">
        <stop stopColor="#CD9933" offset="0%"/>
        <stop stopColor="#E6B24A" offset="100%"/>
      </linearGradient>
      <linearGradient id="gradTeal" x1="0" x2="1" y1="0" y2="0">
        <stop stopColor="#013334" offset="0%"/>
        <stop stopColor="#006064" offset="100%"/>
      </linearGradient>
    </defs>
    <!-- decorative mark -->
    <path d="M20,60 C40,20 90,20 140,40" fill="none" stroke="url(#gradTeal)" strokeWidth="6" strokeLinecap="round"/>
    <circle cx="28" cy="60" r="6" fill="#CD9933"/>
    <circle cx="36" cy="60" r="6" fill="#CD9933"/>
    <circle cx="44" cy="60" r="6" fill="#CD9933"/>
    <!-- wordmark -->
    <text x="70" y="48" font-family="Georgia, serif" font-size="36" fill="#CD9933">ROYAL</text>
    <text x="70" y="75" font-family="Nunito, system-ui, sans-serif" font-size="32" fill="#013334">UMRAH TRAVEL</text>
  </svg>
)

const Navbar = ({ isVersion2 = false }) => {
  const links = [
    { to: '/', label: 'Home' },
    { to: '/home2', label: 'Home 2' },
    { to: '/packages', label: 'Umrah Packages' },
    { to: '/international-tours', label: 'International Tours' },
    { to: '/visa-services', label: 'Visa Services' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/blog', label: 'Blog' },
    { to: '/about', label: 'About Us' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contact', label: 'Contact' },
  ]
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${isVersion2 ? 'bg-[#013334]/80 backdrop-blur-md' : 'bg-[#013334] dark:bg-[#001c1d]'} shadow-[0_8px_40px_rgba(1,51,52,0.06)]`}>
      <div className="flex justify-between items-center w-full px-8 py-4 max-w-screen-2xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <LogoSVG />
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `font-manrope text-sm tracking-wide ${isActive ? 'text-[#CD9933] border-b-2 border-[#CD9933] pb-1' : 'text-white/80 hover:text-white'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <button className="bg-[#CD9933] text-white px-6 py-2 rounded-md font-manrope text-sm font-bold tracking-wide hover:opacity-90 transition-all">Book Now</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
