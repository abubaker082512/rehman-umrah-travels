import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const galleryItems = [
  { id: 1, type: 'wide', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCO_IRY7jvBnnEtX8feErOYDc3DDZMVDuLQ1G_-Q1DoQQayK1NTWJyzzRXm2KsAFGn339aj0b-tuGncnjQ0V3K-XmiIiHg3AijaZnqIo4UsydMi9JV0-IjYu_s4tx3NoWWTd1W9KhPH9HtlEPzGHl8nYSQlk5f7NN0qw8_LI1MzvHh3zcU_lIcPDRNAuXmmI-rnDOOdgCbLLkSCPGQ0JgN5KrWAOqKuAd3rOXOU6R652ysKci4tHEynrqMAWTIfuMyWNbpXbl-5Ymxe', label: 'The Circle of Faith', category: 'Kaaba' },
  { id: 2, type: 'tall', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUGaehS0Bt67L1RAqyen3fOEt1z86N6uxfZ0K2PEErMKMiZV4drU-2JWd6VSfjLNoysYsUCnNjngX2KNQJ8UHjzTI8wzUjn0dRQVUGEDMcsW9XzECUjxiXzwmymgp7aad5U9C29USk8o4deQVGPRq1k072Ho2jWxW8gAE9YQAYgM5vJXNh1_6Jh9RwKfOtyza-f7F_spyjDq5voWUR5oiwwbAHKawNiEgAP4RCQeVEZjXK7hsbudBi4SZ6NEt10zy6az0ztNzmz7TT', label: 'Celestial Spires', category: 'Masjid Nabawi' },
  { id: 3, type: 'standard', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDK2_oTGnpwIr8lGrvHvbVteJFQ_LmysVmiqZ5CPGEjvBQGYjLYOxIKAbuLI3tMM2DniH-IFinQIS_Zl3CuQI6-v0_qPMi-ADy6G-HrKVrQFGb39jox7uMyXFr5IS0jd-xe7YOjNLxfISzbJJdypjwKvZ2h-FnT5TsPIKi-1Oqd4ncbi7bu0gmX_UqH-u-KdFmnn3KHOG_45iJ5tXaRIJA9XCO-_E6R9LERBfCgUqIAEgqNZOJvwAhHVbW4i2ve3nrfIKmny2BzaQaR', label: 'Sacred Architecture', category: 'Ziyarat' },
  { id: 4, type: 'standard', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzn1-JLxXAdX_feF-ubKekQz_wAt4HqUvvdPeuTKh3tfBk99cfsH9pHef7zWZCICJHNS70tFKGeQ-d2LsqZUyHehxW0ISwfuQU6gPsaP3m3pWaRkRyE970BTN7g8b8nZTMNxe5KaXgncRVyFMZPAfegI2yk1EvcZBAntULYnm2eqJHZUhrmp-vABbcygSSWynHygdTOcq6kqOpSS9UUEK-mZBp18OFxE9AORCbA595M3yMWzAcQuG8SeGuvBQpAFlHsw7ERHUc0A3T', label: 'Pilgrims Path', category: 'Umrah Groups' },
  { id: 5, type: 'tall', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNDTdnKX6NYAJ-QJo4iIhbwDoIli-XdCyKqFl3b1Dp3vRZecvJr_WhCIG7mPQD_IEnuARtnAo-nbJDE5GuYgGT6WwSIosL1A2xuXb7X5cWKhYsc-3UXkX1h1vaAvdIi-Gv0uK4DmICIgXY3dVhXhCd9gK8gkMQPvJAqgXVNdG8Nq1hgp1ru5E6Ssyynux0aFffU5qALnB-hVBp394WBESmgDJwh0Qbp1zmK7OHAZQqvLA1ygv7UctkbEAPc4GTatP-RkTuYPseLVXz', label: 'Light & Geometry', category: 'Kaaba' },
  { id: 6, type: 'wide', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcmggnP0CNRP5uiq7143MZmxCE8ru5VvAuKNkeovFm0A2rAgD1ZNRZ4knso4Qvk8LjeeXQGqmOBggt_NiMpvC9qu9ZSCVDImY6vXL9fpcQz8QlXwNOJWd32NvIBuUWQUI28JWgdG-4bo5639jTzgHwHmOqFUPM8uHHCktGtPR0LPJxIs7LSvKLv3JxvAFq0vDdodaABfSAdbQJLIW7QLfn50-XX7mbmQBL4Uk0sKmlYRy8hNQRJWeMDFx5R3ViWdiSNVdPYnVHKHkE', label: 'The Path of History', category: 'Ziyarat' },
  { id: 7, type: 'standard', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5y1PBgaoz7gr2OO5Anm-bHirxOS35chx9DgNuvh2l3gpzZnpSVkvtsklwE8kU2DvufQEFd9VmGtGRqXGufLBDzW2WKJXJBWwl-EhNn0nmK7_wehlFTH6LlZ4cljEHKUWKzEH_AlOrVia5-VUJVWke__Dgk-Psrzrs-e1QbYWd0Rjt_v2AtGGmXRGOuoEaMwI6TgiyBhhQuNveTCCGJi172qW3IGal75gfDU-0_1fqGlvdko-cBqFhMtfy3Z547fVcn3wElsNv2oZX', label: 'Lanterns of Devotion', category: 'Umrah Groups' },
]

const filters = ['All', 'Kaaba', 'Masjid Nabawi', 'Ziyarat', 'Umrah Groups', 'International Tours']

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All' ? galleryItems : galleryItems.filter(i => i.category === activeFilter)

  return (
    <div className="bg-background font-body text-on-surface antialiased">
      <Navbar />

      <main className="pt-24 min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[614px] flex items-center justify-center overflow-hidden mb-12">
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxMvKGaBzbI1spkgpMFmKdzOm4xCMawjMzIuAQhLFp1UUOqf1YTeL6uXQ9gPF8FrrGCdwtr-1OKdN_rZmKJ6fVc6EvrliZFd_0W8amMRlNyXK3tPSD1-PHcBaClpfsT4uytWjklgkPBDReyPm67SPC5tznRfQGqC0Qy7kQvOjMKvf2GP1C1srbNAdhL9V5sDjhuaGxgfVbtnwie5LZPTfLKGrk2Htqx15vojrzuf6zerg6AlywtCG5x8qf2h4EJH4NB0oN-xxXnpZN" alt="Gallery Hero" />
            <div className="absolute inset-0 bg-gradient-to-b from-primary-container/80 via-primary-container/40 to-background"></div>
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl">
            <h1 className="font-notoSerif italic text-5xl md:text-7xl text-white mb-6 drop-shadow-lg">Glimpses of the Divine</h1>
            <p className="font-manrope text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              A visual chronicle of spiritual journeys, sacred architecture, and the profound serenity of the Holy Cities.
            </p>
          </div>
        </section>

        {/* Gallery Filter */}
        <section className="max-w-7xl mx-auto px-8 mb-16">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 pb-4">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`font-manrope text-xs tracking-[0.2em] uppercase px-4 py-2 transition-colors ${activeFilter === f ? 'border-b-2 border-secondary text-primary font-bold' : 'text-on-surface-variant hover:text-secondary'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </section>

        {/* Gallery Grid (Bento Style) */}
        <section className="max-w-7xl mx-auto px-8 pb-32">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gridAutoRows: '200px', gridAutoFlow: 'dense', gap: '1rem' }}>
            {filtered.map(item => (
              <div
                key={item.id}
                className="group relative overflow-hidden cursor-pointer"
                style={{
                  gridRow: item.type === 'tall' ? 'span 2' : 'span 1',
                  gridColumn: item.type === 'wide' ? 'span 2' : 'span 1',
                }}
              >
                <img
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  style={{ filter: 'grayscale(20%)' }}
                  onMouseEnter={e => e.currentTarget.style.filter = 'grayscale(0%)'}
                  onMouseLeave={e => e.currentTarget.style.filter = 'grayscale(20%)'}
                  src={item.src}
                  alt={item.label}
                />
                <div className="absolute inset-0 bg-primary-container/0 group-hover:bg-primary-container/30 transition-all duration-500"></div>
                {item.label && (
                  <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <span className="font-manrope text-[10px] tracking-widest uppercase text-[#f6bd54] mb-1 block">{item.category}</span>
                    <h3 className="font-notoSerif text-white text-xl italic">{item.label}</h3>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Gallery
