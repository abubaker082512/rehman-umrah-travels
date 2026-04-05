import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const blogPosts = [
  {
    id: 1,
    title: 'How to Perform Umrah Step by Step',
    excerpt: 'A comprehensive guide for first-time pilgrims covering every ritual of Umrah, from Ihram to Tawaf and Sa\'i.',
    category: 'Guides',
    date: 'March 15, 2024',
    readTime: '8 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_umMwNrlCdZQQHw-gkNmIlvZ1RKy4ljfjZeHztDWu0Wgt9uTVwcC8SCXvvdKqtiQ8v5oNtA7grwHPXPG15OXDFYiqHvhKUVG17-erSKGUK7O2pmJY9mWZ8iyijELGBy-NB61ei7aEg5jsvtpBXbL0ND3vwZ9Ne6f9J7_W6D_0YJrVDA7ESbokU67XJ37dAjbcdx3wsCdGyi4dHRNDLRtl1twWIlv-M0rr3r0kY69jtOec16g7y6ZNh513s3PPjOvnH00dJr_aRChe',
    featured: true
  },
  {
    id: 2,
    title: 'Best Time for Umrah: A Complete Seasonal Guide',
    excerpt: 'Discover the best months to visit Makkah and Madinah based on weather, crowd levels, and spiritual significance.',
    category: 'Planning',
    date: 'March 10, 2024',
    readTime: '6 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoKHIP0C3QMaqa0Klr2dM78ntz2OMNGskdqZpgaSJ-t6CzhN9wtM0mVM_VfSXuA51y498oLIAKD-uoj3lEBnBE8WmcWNOLOSOq9dH9S0lGZIfFBT1ZhI-DDgNOWBLRTwE3G7J0rMP7EcoWJ320MQ5b4uQ8mPqH3otJS4kmYLSdyP7CkobPzxStF_dClqG1HjjpMwEyFmBv7FGdx4exw17NjJDYM-FTizn97bzsUtNLtNiN42PQQll7lzJbJk6og1ghe9D9P9QPzoGt',
    featured: false
  },
  {
    id: 3,
    title: 'Top Ziyarat Places in Madinah You Must Visit',
    excerpt: 'Explore the most significant historical and religious sites in Madinah, from Masjid Quba to Mount Uhud.',
    category: 'Destinations',
    date: 'February 28, 2024',
    readTime: '7 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGAIsAHsj1aeHsF48svRjVUbf98DzT-X9LQhfvfa-q2PJlyI09AuEIY6srDte53YCFFWCd2EaqKDYaWjc7R1oD8Oy0UQZonZ4QmyQHfAPWRL1m5sQGS9dtdQLq8f2bLzqIOWQmNgNi9ljBiW5R4LPKlvDDMzjwtdiHpg6rvvZMcZomzBGJjvB9xOfnjvbugZr1ychDGq06fIZDh06Dz9ZZUQa-GIE-lRKaUC8cnXzsPqkzMMPpZHTcCzgU4BenPNn8U-Z6Uv-gDbmW',
    featured: false
  },
  {
    id: 4,
    title: 'Cheapest Umrah Packages from Pakistan 2024',
    excerpt: 'Compare our budget-friendly Umrah packages and find the best deals for your spiritual journey from Pakistan.',
    category: 'Packages',
    date: 'February 20, 2024',
    readTime: '5 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgeIqrjd4iZZprHhl6dvsS6TlHxSPpsRmm2Q4eJ0zVcfSsCDiAzFs_uTdG6viogBc4vtlsa9ul1Nk18k6JBhkP-xeMEttf2BqJ1jOG8pQ7cnBf6Ao3WlNsQPFRlNK9j0rbGdGfbKOnG3rdjzGKSfNDY5wKpvPKQTepPxMwUq1cLbg-SxCK5TQ5rRrkARlzPWy_VGIQZQUGsTi_0CoUUzDbyZHY6No-V79Ao-q62kF8A-wSQe15IlpAbZe8_-0Ezat1qZmyvj1c8ZAL',
    featured: false
  },
  {
    id: 5,
    title: 'Packing List for Umrah: What to Bring',
    excerpt: 'A complete packing checklist to ensure you have everything you need for a comfortable and hassle-free Umrah journey.',
    category: 'Planning',
    date: 'February 15, 2024',
    readTime: '4 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeKAHUE-PrOvKyjvjA04CL1jr6-62S2Gq4OvwV7zH1lF0mlQjEH7m1ZghycTUjRSVtzOY5suj3gVo-PrLaXmzs2tiIW_cYJr-NSNa5pH_qsN7H7frVEt78dEk6MhB2J8Uj-Q6hheong-lQY2BU3RxegAaq6Na8Zwccq_7Zr1ZDRzOEpbEtIn9Q5EYOtLqjMcX5SNtiZrfZ4GWoCX7gId6_Df31VjHmy08Fi8IbzJqwShYHYNoTk4A1tdg-YSEzWH5ct9SdGFD2b2sQ',
    featured: false
  },
  {
    id: 6,
    title: 'Understanding the History of the Holy Kaaba',
    excerpt: 'Dive deep into the fascinating history of the Kaaba, from its construction by Prophet Ibrahim to its present-day significance.',
    category: 'History',
    date: 'February 10, 2024',
    readTime: '10 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1TFYjcNCU1jatQI4D8YLqCDfuhWfk0cT0dMGoRBMfve9VV0lv0YzvCp9dIMEq-a05foGyu6nL0GphRF9kWJmOOUJoKETJpCojoqxl5XPI7FK5iE3wLkyS0ey_5yC3zsz96FsqZGofrd-XWR16bcukQBkRotmsfTZaX-xmFrjfUhi7Zazqb_BXhe8zYK74QxEmECK8vJaAXdzHQmhvAW-KyDZXPkR43tt1afbIF6YM7PBCOBBy-l6TuMWtejlRDSj5vmKIidlF72YJ',
    featured: false
  }
]

const categories = ['All', 'Guides', 'Planning', 'Destinations', 'Packages', 'History']

const Blog = () => {
  const featuredPost = blogPosts.find(p => p.featured)
  const regularPosts = blogPosts.filter(p => !p.featured)

  return (
    <div className="bg-surface font-manrope text-on-surface min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxMvKGaBzbI1spkgpMFmKdzOm4xCMawjMzIuAQhLFp1UUOqf1YTeL6uXQ9gPF8FrrGCdwtr-1OKdN_rZmKJ6fVc6EvrliZFd_0W8amMRlNyXK3tPSD1-PHcBaClpfsT4uytWjklgkPBDReyPm67SPC5tznRfQGqC0Qy7kQvOjMKvf2GP1C1srbNAdhL9V5sDjhuaGxgfVbtnwie5LZPTfLKGrk2Htqx15vojrzuf6zerg6AlywtCG5x8qf2h4EJH4NB0oN-xxXnpZN" alt="Blog" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-8 lg:px-24 w-full">
          <div className="max-w-3xl">
            <div className="w-12 h-1 bg-[#CD9933] mb-8"></div>
            <h1 className="font-notoSerif text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Travel <span className="text-[#CD9933]">Blog</span>
            </h1>
            <p className="font-manrope text-lg text-white/80 max-w-xl">
              Insights, guides, and spiritual wisdom to help you prepare for your journey. Stay informed with our latest articles on Umrah, travel tips, and religious guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-24 px-8 max-w-screen-2xl mx-auto -mt-16 relative z-20">
        <div className="bg-surface-container-lowest editorial-shadow overflow-hidden asymmetric-clip group cursor-pointer">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-72 lg:h-auto overflow-hidden">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={featuredPost.image} alt={featuredPost.title} />
              <div className="absolute top-4 left-4 bg-[#CD9933] text-white px-4 py-1 text-xs font-bold uppercase tracking-widest rounded">{featuredPost.category}</div>
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-4 text-sm text-outline mb-4">
                <span>{featuredPost.date}</span>
                <span>•</span>
                <span>{featuredPost.readTime}</span>
              </div>
              <h2 className="font-notoSerif text-3xl lg:text-4xl font-bold text-primary mb-4 group-hover:text-[#CD9933] transition-colors">{featuredPost.title}</h2>
              <p className="text-on-surface-variant leading-relaxed mb-6">{featuredPost.excerpt}</p>
              <button className="text-[#CD9933] font-bold flex items-center gap-2 hover:gap-4 transition-all">
                Read Article
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-screen-2xl mx-auto px-8 mb-8">
        <div className="flex flex-wrap items-center gap-4">
          {categories.map(cat => (
            <button key={cat} className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${cat === 'All' ? 'bg-[#013334] text-white' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-24 px-8 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <div key={post.id} className="bg-surface-container-lowest group cursor-pointer overflow-hidden editorial-shadow transition-transform hover:-translate-y-1">
              <div className="relative h-56 overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 asymmetric-clip" src={post.image} alt={post.title} />
                <div className="absolute top-4 left-4 bg-[#013334] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded">{post.category}</div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-outline mb-3">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-notoSerif text-xl font-bold text-primary mb-3 group-hover:text-[#CD9933] transition-colors line-clamp-2">{post.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                <button className="text-[#CD9933] font-bold text-sm flex items-center gap-2 hover:gap-4 transition-all">
                  Read More
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-primary-container relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7iqIMSWjJemycSurDzLS49I7vf1E_Ir_9JNdo7vnnjUs42efP_S1dgqe2xI0QDJaKbHo9ZRkqvdYo1bYcwBvEnTPhPclF1OSmgOVghrFtvqeq5b92V1yjUro0sxR_GnE1BNCqYps0QKr0yc_d2G0_23gzKUpiz3nt2gERaWgkbPWLcVYUd6z7noGPOWbDAz3zrOwnleugBBJWc52v2BSX_rOZLmuCn0bBOWhLLmTx7ip4AO3yKpRp0shQrdTuKpNfm0QTUA_N0WM8" alt="Pattern" />
        </div>
        <div className="max-w-2xl mx-auto px-8 relative z-10 text-center">
          <h6 className="font-manrope text-[#CD9933] font-bold text-sm tracking-[0.2em] uppercase mb-4">Stay Updated</h6>
          <h2 className="font-notoSerif text-4xl font-bold text-white mb-6">Subscribe to Our Newsletter</h2>
          <p className="text-white/60 mb-8">Get the latest travel tips, package deals, and spiritual guides delivered to your inbox.</p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/40 px-6 py-4 rounded-md focus:ring-2 focus:ring-[#CD9933] focus:outline-none" placeholder="Enter your email" type="email" />
            <button className="bg-[#CD9933] text-white px-8 py-4 rounded-md font-bold hover:brightness-110 transition-all">Subscribe</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Blog
