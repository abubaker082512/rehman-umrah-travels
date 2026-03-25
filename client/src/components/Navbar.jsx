import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#013334] dark:bg-[#001c1d] shadow-[0_8px_40px_rgba(1,51,52,0.06)]">
      <div className="flex justify-between items-center w-full px-8 py-4 max-w-screen-2xl mx-auto">
        <Link to="/" className="font-notoSerif text-2xl font-bold tracking-tighter text-[#CD9933]">REHMAN</Link>
        <div className="hidden md:flex items-center gap-8">
          <Link className="text-[#CD9933] border-b-2 border-[#CD9933] pb-1 font-semibold font-manrope text-sm tracking-wide" to="/">Home</Link>
          <Link className="text-white/80 font-medium hover:text-white transition-colors duration-300 font-manrope text-sm tracking-wide" to="/packages">Umrah Packages</Link>
          <a className="text-white/80 font-medium hover:text-white transition-colors duration-300 font-manrope text-sm tracking-wide" href="#">International Tours</a>
          <a className="text-white/80 font-medium hover:text-white transition-colors duration-300 font-manrope text-sm tracking-wide" href="#">Visa Services</a>
          <a className="text-white/80 font-medium hover:text-white transition-colors duration-300 font-manrope text-sm tracking-wide" href="#">Gallery</a>
          <a className="text-white/80 font-medium hover:text-white transition-colors duration-300 font-manrope text-sm tracking-wide" href="#">Blog</a>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-white/80 font-manrope text-sm cursor-pointer hover:text-[#CD9933] transition-colors">FAQ</span>
          <button className="bg-[#CD9933] text-white px-6 py-2 rounded-md font-manrope text-sm font-bold tracking-wide hover:opacity-90 transition-all">Contact</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
