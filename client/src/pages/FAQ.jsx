import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const FAQ = () => {
  const faqs = [
    { q: 'What is included in a typical Umrah package?', a: 'Accommodation, transportation, meals, and guided rituals where applicable.' },
    { q: 'How do I apply for a visa?', a: 'We provide guidance and support through the visa application process.' },
    { q: 'Can I customize my itinerary?', a: 'Yes, we offer tailored itineraries to fit your needs.' },
  ]
  return (
    <div className="bg-surface font-manrope text-on-surface min-h-screen">
      <Navbar />
      <section className="pt-24 pb-12 px-6 max-w-5xl mx-auto">
        <h1 className="font-notoSerif text-4xl md:text-5xl font-bold text-primary mb-6">FAQ</h1>
        <div className="space-y-6">
          {faqs.map((f, idx) => (
            <div key={idx} className="bg-surface-container-low p-5 rounded-xl editorial-shadow">
              <div className="font-bold">Q: {f.q}</div>
              <div className="text-sm text-on-surface-variant">A: {f.a}</div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default FAQ
