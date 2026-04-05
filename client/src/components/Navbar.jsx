import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/Rehman Travel Logo.png'

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
          <img src={logo} alt="Rehman Travel & Tours Logo" className="h-10 w-auto" />
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
