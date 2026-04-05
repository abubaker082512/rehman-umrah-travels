import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#013334] dark:bg-[#001c1d]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-12 py-16 w-full max-w-screen-2xl mx-auto">
        <div className="space-y-6">
          <div className="font-notoSerif text-xl text-[#CD9933]">ROYAL</div>
          <p className="text-white/60 text-sm leading-relaxed font-manrope">Royal Umrah & Travels specializes in crafting meaningful spiritual journeys and world-class international tours for the discerning traveler.</p>
        </div>
        <div>
          <h5 className="font-notoSerif text-lg text-[#CD9933] mb-6">Quick Links</h5>
          <ul className="space-y-4">
            <li><a className="text-white/60 hover:text-[#CD9933] transition-all text-sm font-manrope" href="#">About Us</a></li>
            <li><a className="text-white/60 hover:text-[#CD9933] transition-all text-sm font-manrope" href="#">Visa Services</a></li>
            <li><a className="text-white/60 hover:text-[#CD9933] transition-all text-sm font-manrope" href="#">Packages</a></li>
            <li><a className="text-white/60 hover:text-[#CD9933] transition-all text-sm font-manrope" href="#">Terms & Conditions</a></li>
            <li><a className="text-white/60 hover:text-[#CD9933] transition-all text-sm font-manrope" href="#">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-notoSerif text-lg text-[#CD9933] mb-6">Offices</h5>
          <ul className="space-y-4 text-white/60 text-sm font-manrope">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#CD9933] text-sm mt-1">location_on</span>
              <span>Main Boulevard, Gulberg III, Lahore, Pakistan</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#CD9933] text-sm mt-1">location_on</span>
              <span>DHA Phase II, Karachi, Pakistan</span>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-notoSerif text-lg text-[#CD9933] mb-6">Newsletter</h5>
          <p className="text-white/60 text-xs mb-4">Stay updated with the latest Umrah deals.</p>
          <div className="flex gap-2">
            <input className="bg-white/5 border-0 border-b border-white/20 text-white text-sm w-full focus:ring-0 focus:border-[#CD9933]" placeholder="Email Address" type="email" />
            <button className="text-[#CD9933]"><span className="material-symbols-outlined">send</span></button>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 px-12 py-8 text-center">
        <p className="text-white/40 text-xs font-manrope">© 2024 Royal Umrah & Travels. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
