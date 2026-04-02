import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const VisaServices = () => {
  return (
    <div className="bg-surface font-manrope text-on-surface min-h-screen">
      <Navbar />
      <section className="pt-24 pb-12 px-6 max-w-5xl mx-auto">
        <h1 className="font-notoSerif text-4xl md:text-5xl font-bold text-primary mb-4">Visa Services</h1>
        <p className="text-sm text-on-surface-variant mb-6">We provide guidance on visa eligibility, documentation, and processing timelines. This page outlines general information and is intended as a starting point. For precise requirements, refer to your local consulate or contact our travel consultants.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-surface-container-low p-6 rounded-xl editorial-shadow">
            <h3 className="font-headline text-xl text-primary mb-2">Umrah Visa</h3>
            <p className="text-sm text-on-surface-variant">Guidance on Saudi Arabia visa for Umrah pilgrims, including application steps and timelines.</p>
          </div>
          <div className="bg-surface-container-low p-6 rounded-xl editorial-shadow">
            <h3 className="font-headline text-xl text-primary mb-2">Tourist Visa</h3>
            <p className="text-sm text-on-surface-variant">Overview of tourist visa options, eligibility, and required documentation for international travelers.</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default VisaServices
