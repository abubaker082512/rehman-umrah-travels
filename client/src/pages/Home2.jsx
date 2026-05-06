import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || ''

const Home2 = () => {
    const [pageMedia, setPageMedia] = useState({})
    const [homeContent, setHomeContent] = useState({
      heroTitle: 'Your Trusted Partner for Umrah & International Tours',
      heroSubtitle: 'Embark on a spiritually enriching journey with premium hospitality and expert guidance tailored for your comfort.',
      heroCta: 'View Umrah Packages',
      heroWhatsApp: 'Contact on WhatsApp',
      featuredTitle: 'Featured Umrah Packages',
      featuredSubtitle: 'Spiritual Journeys',
      toursTitle: 'Discover the World',
      toursSubtitle: 'International Tours',
      ctaTitle: 'Ready to Embark on Your Journey?',
      ctaSubtitle: 'Contact our travel experts today for personalized packages.',
    })

    useEffect(() => {
        try {
            const savedMedia = localStorage.getItem('pageMedia')
            if (savedMedia) setPageMedia(JSON.parse(savedMedia))
            const savedHome = localStorage.getItem('cms_home')
            if (savedHome) setHomeContent(prev => ({...prev, ...JSON.parse(savedHome)}))
        } catch (e) {}

        axios.get(`${API_BASE}/api/cms`)
            .then(res => {
                const data = res.data
                if (data.page_media && Object.keys(data.page_media).length > 0) {
                    setPageMedia(data.page_media)
                    localStorage.setItem('pageMedia', JSON.stringify(data.page_media))
                }
                if (data.cms_home && Object.keys(data.cms_home).length > 0) {
                    setHomeContent(prev => ({...prev, ...data.cms_home}))
                    localStorage.setItem('cms_home', JSON.stringify(data.cms_home))
                }
            }).catch(err => console.error("CMS load error:", err))
    }, [])

    return (
        <div className="bg-surface font-body text-on-surface antialiased">
            <Navbar isVersion2={true} />
            
            <main className="pt-0">
                {/* Hero Section */}
                <section className="relative h-[921px] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        {pageMedia.home_hero_video ? (
                            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                                <source src={pageMedia.home_hero_video} type="video/mp4" />
                            </video>
                        ) : (
                            <img alt="The Holy Kaaba in Makkah" className="w-full h-full object-cover" src={pageMedia.home_hero_image || "https://images.unsplash.com/photo-1591604129909-2b4ce4e6e6d2?w=1600&q=80"}/>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#013334]/90 to-[#013334]/40"></div>
                    </div>
                    <div className="relative z-10 container mx-auto px-6 text-white text-center md:text-left">
                        <h1 className="font-headline text-5xl md:text-7xl mb-6 max-w-4xl italic leading-tight">
                            {homeContent.heroTitle}
                        </h1>
                        <p className="font-body text-xl mb-10 text-white/80 max-w-2xl font-light tracking-wide">
                            {homeContent.heroSubtitle}
                        </p>
                        <div className="flex flex-col md:flex-row gap-4">
                            <button className="bg-[#CD9933] hover:bg-[#b5882d] text-primary px-8 py-4 rounded-md font-bold tracking-widest uppercase text-sm transition-all shadow-lg">
                                {homeContent.heroCta}
                            </button>
                            <button className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-md font-bold tracking-widest uppercase text-sm transition-all flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-green-400">chat</span>
                                {homeContent.heroWhatsApp}
                            </button>
                        </div>
                    </div>
                    {/* Quick Search Bar */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-5xl px-4 z-20">
                        <div className="bg-surface-container-lowest rounded-xl shadow-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-end">
                            <div className="flex-1 w-full space-y-2">
                                <label className="font-label text-xs uppercase tracking-tighter text-outline font-bold">Departure City</label>
                                <select className="w-full border-b border-outline-variant bg-transparent py-2 focus:border-secondary outline-none font-body">
                                    <option>Lahore, Pakistan</option>
                                    <option>Karachi, Pakistan</option>
                                    <option>Islamabad, Pakistan</option>
                                </select>
                            </div>
                            <div className="flex-1 w-full space-y-2">
                                <label className="font-label text-xs uppercase tracking-tighter text-outline font-bold">Month</label>
                                <select className="w-full border-b border-outline-variant bg-transparent py-2 focus:border-secondary outline-none font-body">
                                    <option>October 2024</option>
                                    <option>November 2024</option>
                                    <option>Ramadan 2025</option>
                                </select>
                            </div>
                            <div className="flex-1 w-full space-y-2">
                                <label className="font-label text-xs uppercase tracking-tighter text-outline font-bold">Package Type</label>
                                <select className="w-full border-b border-outline-variant bg-transparent py-2 focus:border-secondary outline-none font-body">
                                    <option>Economy (3 Star)</option>
                                    <option>Executive (4 Star)</option>
                                    <option>Premium (5 Star)</option>
                                </select>
                            </div>
                            <button className="bg-primary text-white p-4 rounded-md hover:bg-primary-container transition-colors shrink-0">
                                <span className="material-symbols-outlined">search</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Featured Umrah Packages */}
                <section className="py-32 px-6 bg-surface">
                    <div className="container mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                            <div>
                                <span className="text-secondary font-label tracking-[0.3em] uppercase text-xs font-bold block mb-4">Spiritual Journeys</span>
                                <h2 className="font-headline text-4xl text-primary-container">Featured Umrah Packages</h2>
                            </div>
                            <div className="h-px flex-1 bg-outline-variant/30 mx-8 mb-4 hidden md:block"></div>
                            <a className="text-primary font-bold border-b-2 border-secondary/40 pb-1 hover:border-secondary transition-all" href="#">Explore All Packages</a>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Package Card 1 */}
                            <div className="group bg-surface-container-low rounded-none overflow-hidden editorial-shadow transition-transform hover:-translate-y-2">
                                <div className="relative h-64 overflow-hidden">
                                    <img alt="Luxury Hotel in Makkah" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://images.unsplash.com/photo-1596435688717-2d2f3b0fc47a?w=800&q=80" />
                                    <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 text-xs font-bold uppercase tracking-widest">Premium</div>
                                </div>
                                <div className="p-8">
                                    <h3 className="font-headline text-2xl mb-4 text-primary">15 Days Executive Umrah</h3>
                                    <div className="space-y-3 mb-8">
                                        <div className="flex items-center gap-3 text-on-surface-variant text-sm">
                                            <span className="material-symbols-outlined text-secondary text-sm">hotel</span>
                                            5★ Pullman ZamZam / Movenpick
                                        </div>
                                        <div className="flex items-center gap-3 text-on-surface-variant text-sm">
                                            <span className="material-symbols-outlined text-secondary text-sm">schedule</span>
                                            15 Days (7 Makkah / 8 Madinah)
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center border-t border-outline-variant/30 pt-6">
                                        <div>
                                            <p className="text-[10px] uppercase text-outline font-bold">Starting from</p>
                                            <p className="text-xl font-bold text-secondary">PKR 245,000</p>
                                        </div>
                                        <button className="text-primary font-bold text-sm uppercase tracking-widest flex items-center gap-1 group">
                                            Details <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* Package Card 2 */}
                            <div className="group bg-surface-container-low rounded-none overflow-hidden editorial-shadow transition-transform hover:-translate-y-2">
                                <div className="relative h-64 overflow-hidden">
                                    <img alt="Prophet's Mosque Madinah" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://images.unsplash.com/photo-1564769662533-3f5aae93cec2?w=800&q=80" />
                                    <div className="absolute top-4 right-4 bg-[#013334] text-white px-3 py-1 text-xs font-bold uppercase tracking-widest">Economy Plus</div>
                                </div>
                                <div className="p-8">
                                    <h3 className="font-headline text-2xl mb-4 text-primary">21 Days Spiritual Retreat</h3>
                                    <div className="space-y-3 mb-8">
                                        <div className="flex items-center gap-3 text-on-surface-variant text-sm">
                                            <span className="material-symbols-outlined text-secondary text-sm">hotel</span>
                                            3★ Swiss International / Similar
                                        </div>
                                        <div className="flex items-center gap-3 text-on-surface-variant text-sm">
                                            <span className="material-symbols-outlined text-secondary text-sm">schedule</span>
                                            21 Days (10 Makkah / 11 Madinah)
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center border-t border-outline-variant/30 pt-6">
                                        <div>
                                            <p className="text-[10px] uppercase text-outline font-bold">Starting from</p>
                                            <p className="text-xl font-bold text-secondary">PKR 185,000</p>
                                        </div>
                                        <button className="text-primary font-bold text-sm uppercase tracking-widest flex items-center gap-1 group">
                                            Details <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* Package Card 3 */}
                            <div className="group bg-surface-container-low rounded-none overflow-hidden editorial-shadow transition-transform hover:-translate-y-2">
                                <div className="relative h-64 overflow-hidden">
                                    <img alt="Makkah Clock Tower" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://images.unsplash.com/photo-1572949645079-6416a599c6ae?w=800&q=80" />
                                    <div className="absolute top-4 right-4 bg-[#CD9933] text-white px-3 py-1 text-xs font-bold uppercase tracking-widest">Custom</div>
                                </div>
                                <div className="p-8">
                                    <h3 className="font-headline text-2xl mb-4 text-primary">Tailored Family Package</h3>
                                    <div className="space-y-3 mb-8">
                                        <div className="flex items-center gap-3 text-on-surface-variant text-sm">
                                            <span className="material-symbols-outlined text-secondary text-sm">hotel</span>
                                            Your Choice of Hotels
                                        </div>
                                        <div className="flex items-center gap-3 text-on-surface-variant text-sm">
                                            <span className="material-symbols-outlined text-secondary text-sm">group</span>
                                            Flexible Duration
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center border-t border-outline-variant/30 pt-6">
                                        <div>
                                            <p className="text-[10px] uppercase text-outline font-bold">Contact for</p>
                                            <p className="text-xl font-bold text-secondary">Best Quote</p>
                                        </div>
                                        <button className="text-primary font-bold text-sm uppercase tracking-widest flex items-center gap-1 group">
                                            Inquire <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Travel with Rehman */}
                <section className="py-24 bg-primary text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 opacity-5 w-1/3">
                        <img alt="Islamic pattern background" src="https://images.unsplash.com/photo-1564507004663-b6dfb3c8924d?w=1200&q=80" />
                    </div>
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="text-center max-w-3xl mx-auto mb-20">
                            <h2 className="font-headline text-4xl mb-6 italic text-[#CD9933]">Why Travel with Royal Travels?</h2>
                            <p className="font-body text-white/70">Over two decades of excellence in crafting sacred journeys with dedication and spiritual integrity.</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
                            <div className="space-y-4 group">
                                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-[#CD9933] transition-all duration-300">
                                    <span className="material-symbols-outlined text-[#CD9933] text-3xl group-hover:text-primary">verified_user</span>
                                </div>
                                <p className="font-label text-xs uppercase tracking-widest font-bold">Approved Agency</p>
                            </div>
                            <div className="space-y-4 group">
                                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-[#CD9933] transition-all duration-300">
                                    <span className="material-symbols-outlined text-[#CD9933] text-3xl group-hover:text-primary">distance</span>
                                </div>
                                <p className="font-label text-xs uppercase tracking-widest font-bold">Haram Proximity</p>
                            </div>
                            <div className="space-y-4 group">
                                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-[#CD9933] transition-all duration-300">
                                    <span className="material-symbols-outlined text-[#CD9933] text-3xl group-hover:text-primary">payments</span>
                                </div>
                                <p className="font-label text-xs uppercase tracking-widest font-bold">Affordable Prices</p>
                            </div>
                            <div className="space-y-4 group">
                                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-[#CD9933] transition-all duration-300">
                                    <span className="material-symbols-outlined text-[#CD9933] text-3xl group-hover:text-primary">support_agent</span>
                                </div>
                                <p className="font-label text-xs uppercase tracking-widest font-bold">24/7 Support</p>
                            </div>
                            <div className="space-y-4 group">
                                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-[#CD9933] transition-all duration-300">
                                    <span className="material-symbols-outlined text-[#CD9933] text-3xl group-hover:text-primary">hiking</span>
                                </div>
                                <p className="font-label text-xs uppercase tracking-widest font-bold">Expert Guides</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* International Escapes */}
                <section className="py-24 bg-surface-container-low">
                    <div className="container mx-auto px-6">
                        <div className="flex items-center gap-6 mb-16">
                            <h2 className="font-headline text-4xl text-primary shrink-0">International Escapes</h2>
                            <div className="h-[2px] w-full bg-[#CD9933]/20"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {/* Turkey */}
                            <div className="group cursor-pointer">
                                <div className="relative aspect-[3/4] overflow-hidden rounded-none shadow-xl">
                                    <img alt="Turkey Tour" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-8">
                                        <span className="text-secondary-fixed text-xs font-bold uppercase tracking-widest mb-2">Starting PKR 190k</span>
                                        <h3 className="text-white font-headline text-3xl">Grand Turkey Tour</h3>
                                    </div>
                                </div>
                            </div>
                            {/* Dubai */}
                            <div className="group cursor-pointer">
                                <div className="relative aspect-[3/4] overflow-hidden rounded-none shadow-xl">
                                    <img alt="Dubai Tour" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-8">
                                        <span className="text-secondary-fixed text-xs font-bold uppercase tracking-widest mb-2">Starting PKR 120k</span>
                                        <h3 className="text-white font-headline text-3xl">Luxury Dubai</h3>
                                    </div>
                                </div>
                            </div>
                            {/* Thailand */}
                            <div className="group cursor-pointer">
                                <div className="relative aspect-[3/4] overflow-hidden rounded-none shadow-xl">
                                    <img alt="Thailand Tour" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src="https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=800&q=80" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-8">
                                        <span className="text-secondary-fixed text-xs font-bold uppercase tracking-widest mb-2">Starting PKR 145k</span>
                                        <h3 className="text-white font-headline text-3xl">Siam Treasures</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Facts & Stats */}
                <section className="py-20 bg-surface border-y border-outline-variant/10">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
                            <div className="space-y-2">
                                <h4 className="text-4xl font-headline text-primary font-bold">17+</h4>
                                <p className="text-outline uppercase text-[10px] tracking-widest font-black">Flight Partners</p>
                                <p className="text-sm text-on-surface-variant font-light">Global airlines for flexible routes.</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-4xl font-headline text-primary font-bold">500+</h4>
                                <p className="text-outline uppercase text-[10px] tracking-widest font-black">Happy Travelers</p>
                                <p className="text-sm text-on-surface-variant font-light">Join our growing community of voyagers.</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-4xl font-headline text-primary font-bold">120+</h4>
                                <p className="text-outline uppercase text-[10px] tracking-widest font-black">Hotel Network</p>
                                <p className="text-sm text-on-surface-variant font-light">Curated stays from 3★ to 5★ luxury.</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-4xl font-headline text-primary font-bold">25+</h4>
                                <p className="text-outline uppercase text-[10px] tracking-widest font-black">Years Expertise</p>
                                <p className="text-sm text-on-surface-variant font-light">Trusted heritage in travel planning.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Local Tours - Northern Pakistan */}
                <section className="py-24 bg-surface">
                    <div className="container mx-auto px-6">
                        <div className="mb-16 text-center">
                            <span className="text-secondary font-label tracking-[0.4em] uppercase text-xs font-bold block mb-4">Discover Home</span>
                            <h2 className="font-headline text-4xl text-primary">Discover Northern Pakistan</h2>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1 relative group overflow-hidden h-[400px]">
                                <img alt="Swat Valley" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://images.unsplash.com/photo-1589407715436-7d75b0f24f17?w=800&q=80" />
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h3 className="font-headline text-2xl mb-1 italic">Swat Valley</h3>
                                    <p className="text-xs uppercase tracking-widest text-white/80">The Switzerland of East</p>
                                </div>
                            </div>
                            <div className="flex-1 relative group overflow-hidden h-[400px]">
                                <img alt="Naran" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://images.unsplash.com/photo-1625516777156-74a8e15b4532?w=800&q=80" />
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h3 className="font-headline text-2xl mb-1 italic">Naran & Kaghan</h3>
                                    <p className="text-xs uppercase tracking-widest text-white/80">Celestial Landscapes</p>
                                </div>
                            </div>
                            <div className="flex-1 relative group overflow-hidden h-[400px]">
                                <img alt="Neelum Valley" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://images.unsplash.com/photo-1598017555949-31e1d6e9b6d5?w=800&q=80" />
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h3 className="font-headline text-2xl mb-1 italic">Neelum Valley</h3>
                                    <p className="text-xs uppercase tracking-widest text-white/80">Azad Kashmir Paradise</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-24 bg-surface-container-low border-t border-outline-variant/20">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
                            <div className="lg:col-span-1">
                                <h2 className="font-headline text-4xl text-primary-container mb-6 leading-tight italic">Voices of Our <br/>Beloved Travelers</h2>
                                <div className="flex gap-1 text-[#CD9933] mb-4">
                                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                </div>
                                <p className="text-on-surface-variant font-body">Rated 4.9/5 by our community for exceptional service and reliability.</p>
                            </div>
                            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-surface p-10 editorial-shadow relative">
                                    <span className="material-symbols-outlined absolute top-6 right-6 text-primary/10 text-5xl">format_quote</span>
                                    <p className="text-on-surface mb-8 italic leading-relaxed">"The Umrah journey was impeccably organized. From the visa process to the premium hotels in Makkah, everything was managed with extreme care. Highly recommended for families."</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full overflow-hidden">
                                            <img alt="Reviewer" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" />
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-primary text-sm">Ahmad Raza</h5>
                                            <p className="text-[10px] text-outline uppercase tracking-widest">Umrah Participant</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-surface p-10 editorial-shadow relative">
                                    <span className="material-symbols-outlined absolute top-6 right-6 text-primary/10 text-5xl">format_quote</span>
                                    <p className="text-on-surface mb-8 italic leading-relaxed">"Our Turkey trip was the highlight of our year. The local guides were knowledgeable and the itinerary was perfectly balanced between sightseeing and relaxation."</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full overflow-hidden">
                                            <img alt="Reviewer" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80" />
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-primary text-sm">Sara Khan</h5>
                                            <p className="text-[10px] text-outline uppercase tracking-widest">Turkey Tour</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="relative py-24 overflow-hidden">
                    <div className="absolute inset-0">
                        <img alt="Traveler" className="w-full h-full object-cover opacity-10" src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80" />
                        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/80 to-surface"></div>
                    </div>
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="max-w-4xl mx-auto bg-primary rounded-none editorial-shadow overflow-hidden flex flex-col md:flex-row">
                            <div className="p-12 md:w-1/2 text-white bg-[url('https://images.unsplash.com/photo-1473163928189-394b13469e19?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center relative">
                                <div className="absolute inset-0 bg-[#013334]/90"></div>
                                <div className="relative z-10">
                                    <h2 className="font-headline text-3xl mb-8 italic">Let's Plan Your Next Journey</h2>
                                    <p className="text-white/70 mb-12">Leave your details and our travel consultants will get back to you within 24 hours.</p>
                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <span className="material-symbols-outlined text-[#CD9933]">location_on</span>
                                            <div>
                                                <h6 className="font-bold text-sm">Visit Us</h6>
                                                <p className="text-white/60 text-xs leading-relaxed">Main Boulevard, Gulberg III,<br/>Lahore, Pakistan</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <span className="material-symbols-outlined text-[#CD9933]">phone_in_talk</span>
                                            <div>
                                                <h6 className="font-bold text-sm">Call Center</h6>
                                                <p className="text-white/60 text-xs">+92 300 1234567</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-12 md:w-1/2 bg-surface">
                                <form className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-outline mb-1">Full Name</label>
                                        <input className="w-full bg-transparent border-b border-outline-variant py-2 focus:border-secondary outline-none transition-colors" placeholder="e.g. Abdullah Khan" type="text"/>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-outline mb-1">Email Address</label>
                                        <input className="w-full bg-transparent border-b border-outline-variant py-2 focus:border-secondary outline-none transition-colors" placeholder="email@example.com" type="email"/>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-outline mb-1">I am interested in</label>
                                        <select className="w-full bg-transparent border-b border-outline-variant py-2 focus:border-secondary outline-none transition-colors">
                                            <option>Umrah Packages</option>
                                            <option>International Tours</option>
                                            <option>Local Tours</option>
                                            <option>Custom Itinerary</option>
                                        </select>
                                    </div>
                                    <button className="w-full bg-[#CD9933] text-primary font-bold uppercase tracking-widest text-xs py-4 hover:shadow-lg transition-all mt-4">
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default Home2
