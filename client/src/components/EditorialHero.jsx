import React from 'react'

// A reusable editorial-style hero section
const EditorialHero = ({ bgImage, title, subtitle }) => {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})`, filter: 'saturate(1.05)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/60" />
      <div className="relative z-10 flex items-center h-full justify-center text-center px-4">
        <div className="max-w-2xl text-white">
          <h1 className="font-notoSerif text-4xl md:text-6xl font-bold mb-4" style={{ textShadow: '0 2px 6px rgba(0,0,0,.4)' }}>{title}</h1>
          {subtitle && (
            <p className="opacity-90 text-lg md:text-xl mx-auto max-w-2xl">{subtitle}</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default EditorialHero
