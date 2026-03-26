import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Gallery = () => {
  return (
    <div className="bg-background font-manrope text-on-surface antialiased">
      <Navbar />
      <main className="pt-24 min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[614px] flex items-center justify-center overflow-hidden mb-12">
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxMvKGaBzbI1spkgpMFmKdzOm4xCMawjMzIuAQhLFp1UUOqf1YTeL6uXQ9gPF8FrrGCdwtr-1OKdN_rZmKJ6fVc6EvrliZFd_0W8amMRlNyXK3tPSD1-PHcBaClpfsT4uytWjklgkPBDReyPm67SPC5tznRfQGqC0Qy7kQvOjMKvf2GP1C1srbNAdhL9V5sDjhuaGxgfVbtnwie5LZPTfLKGrk2Htqx15vojrzuf6zerg6AlywtCG5x8qf2h4EJH4NB0oN-xxXnpZN" alt="Kaaba at dusk" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#013334]/80 via-[#013334]/40 to-background"></div>
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl">
            <h1 className="font-notoSerif italic text-5xl md:text-7xl text-white mb-6 drop-shadow-lg text-center">Glimpses of the Divine</h1>
            <p className="font-manrope text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-center">
              A visual chronicle of spiritual journeys, sacred architecture, and the profound serenity of the Holy Cities.
            </p>
          </div>
        </section>

        {/* Gallery Filter */}
        <section className="max-w-7xl mx-auto px-8 mb-16">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 pb-4">
            <button className="font-manrope text-xs tracking-[0.2em] uppercase px-4 py-2 border-b-2 border-[#CD9933] text-primary font-bold">All</button>
            <button className="font-manrope text-xs tracking-[0.2em] uppercase px-4 py-2 text-on-surface-variant hover:text-[#CD9933] transition-colors">Kaaba</button>
            <button className="font-manrope text-xs tracking-[0.2em] uppercase px-4 py-2 text-on-surface-variant hover:text-[#CD9933] transition-colors">Masjid Nabawi</button>
            <button className="font-manrope text-xs tracking-[0.2em] uppercase px-4 py-2 text-on-surface-variant hover:text-[#CD9933] transition-colors">Ziyarat</button>
            <button className="font-manrope text-xs tracking-[0.2em] uppercase px-4 py-2 text-on-surface-variant hover:text-[#CD9933] transition-colors">Umrah Groups</button>
            <button className="font-manrope text-xs tracking-[0.2em] uppercase px-4 py-2 text-on-surface-variant hover:text-[#CD9933] transition-colors">International Tours</button>
          </div>
        </section>

        {/* Gallery Grid (Bento Style) */}
        <section className="max-w-7xl mx-auto px-8 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px] grid-flow-dense">
            {/* Item 1: Wide */}
            <div className="lg:col-span-2 lg:row-span-2 group relative overflow-hidden cursor-pointer">
              <img className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCO_IRY7jvBnnEtX8feErOYDc3DDZMVDuLQ1G_-Q1DoQQayK1NTWJyzzRXm2KsAFGn339aj0b-tuGncnjQ0V3K-XmiIiHg3AijaZnqIo4UsydMi9JV0-IjYu_s4tx3NoWWTd1W9KhPH9HtlEPzGHl8nYSQlk5f7NN0qw8_LI1MzvHh3zcU_lIcPDRNAuXmmI-rnDOOdgCbLLkSCPGQ0JgN5KrWAOqKuAd3rOXOU6R652ysKci4tHEynrqMAWTIfuMyWNbpXbl-5Ymxe" alt="Kaaba" />
              <div className="absolute inset-0 bg-[#013334]/0 group-hover:bg-[#013334]/30 transition-all duration-500"></div>
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 text-left">
                <span className="font-manrope text-[10px] tracking-widest uppercase text-white mb-1 block text-left">Category</span>
                <h3 className="font-notoSerif text-white text-xl italic text-left">The Circle of Faith</h3>
              </div>
            </div>
            {/* Item 2: Tall */}
            <div className="lg:row-span-2 group relative overflow-hidden cursor-pointer">
              <img className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUGaehS0Bt67L1RAqyen3fOEt1z86N6uxfZ0K2PEErMKMiZV4drU-2JWd6VSfjLNoysYsUCnNjngX2KNQJ8UHjzTI8wzUjn0dRQVUGEDMcsW9XzECUjxiXzwmymgp7aad5U9C29USk8o4deQVGPRq1k072Ho2jWxW8gAE9YQAYgM5vJXNh1_6Jh9RwKfOtyza-f7F_spyjDq5voWUR5oiwwbAHKawNiEgAP4RCQeVEZjXK7hsbudBi4SZ6NEt10zy6az0ztNzmz7TT" alt="Minaret" />
              <div className="absolute inset-0 bg-[#013334]/0 group-hover:bg-[#013334]/30 transition-all duration-500"></div>
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-500 text-left">
                <h3 className="font-notoSerif text-white text-md italic text-left">Celestial Spires</h3>
              </div>
            </div>
            {/* Item 3 */}
            <div className="group relative overflow-hidden cursor-pointer">
              <img className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDK2_oTGnpwIr8lGrvHvbVteJFQ_LmysVmiqZ5CPGEjvBQGYjLYOxIKAbuLI3tMM2DniH-IFinQIS_Zl3CuQI6-v0_qPMi-ADy6G-HrKVrQFGb39jox7uMyXFr5IS0jd-xe7YOjNLxfISzbJJdypjwKvZ2h-FnT5TsPIKi-1Oqd4ncbi7bu0gmX_UqH-u-KdFmnn3KHOG_45iJ5tXaRIJA9XCO-_E6R9LERBfCgUqIAEgqNZOJvwAhHVbW4i2ve3nrfIKmny2BzaQaR" alt="Architecture" />
              <div className="absolute inset-0 bg-[#013334]/0 group-hover:bg-[#013334]/30 transition-all duration-500"></div>
            </div>
            {/* Item 4 */}
            <div className="group relative overflow-hidden cursor-pointer">
              <img className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzn1-JLxXAdX_feF-ubKekQz_wAt4HqUvvdPeuTKh3tfBk99cfsH9pHef7zWZCICJHNS70tFKGeQ-d2LsqZUyHehxW0ISwfuQU6gPsaP3m3pWaRkRyE970BTN7g8b8nZTMNxe5KaXgncRVyFMZPAfegI2yk1EvcZBAntULYnm2eqJHZUhrmp-vABbcygSSWynHygdTOcq6kqOpSS9UUEK-mZBp18OFxE9AORCbA595M3yMWzAcQuG8SeGuvBQpAFlHsw7ERHUc0A3T" alt="Pilgrims" />
              <div className="absolute inset-0 bg-[#013334]/0 group-hover:bg-[#013334]/30 transition-all duration-500"></div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Gallery
