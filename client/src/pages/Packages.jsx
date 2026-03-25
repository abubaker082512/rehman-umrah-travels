import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

const Packages = () => {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/packages')
        setPackages(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchPackages()
  }, [])

  return (
    <div className="bg-surface text-on-surface font-manrope">
      <Navbar />
      
      {/* Header Section */}
      <header className="relative h-[400px] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover opacity-30 grayscale contrast-125" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4NMCBl-fs_JwXhpSNh5wZDRuY3kj1glPRuI6GUCnwgY7RgshXtejdsIA_OMo1kWkl4aLrgrdh3RGeFeomHwml6Ye_UHMR_724sEpA6Uulrf9_aQjmkT-ADo-9hF60KH3OfXm8aB-XPBWvJ6YWjPnW0I-USoLZnkH5_AIbbmLUOXhodKo4PqQTCml7ShpBQCDSBl4P42qgkAUDOZl_6dXB_2l_l6AMVS93vp-cCDVZhyq59UOO1xgHVExeGK0gKwAgxabAYk5MLAgJ" alt="Packages Header" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#013334] via-[#013334]/80 to-surface"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="font-notoSerif text-5xl md:text-7xl font-bold text-[#CD9933] mb-4 tracking-tight">Umrah Packages</h1>
          <p className="text-white/70 max-w-2xl mx-auto font-manrope text-lg">Embark on a spiritual journey of a lifetime with our meticulously curated pilgrimage experiences.</p>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filter Sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-surface-container-low p-8 rounded-xl sticky top-24">
              <h2 className="font-notoSerif text-xl text-primary mb-8 border-b border-outline-variant/30 pb-4">Categories</h2>
              <nav className="space-y-6">
                {['Economy', '3 Star', '4 Star', '5 Star'].map((cat) => (
                  <label key={cat} className="flex items-center group cursor-pointer">
                    <input className="rounded border-outline-variant text-secondary focus:ring-secondary w-5 h-5" type="checkbox" />
                    <span className="ml-4 font-manrope text-on-surface group-hover:text-secondary transition-colors">{cat}</span>
                  </label>
                ))}
              </nav>
            </div>
          </aside>

          {/* Package Grid */}
          <section className="flex-1">
            {loading ? (
              <div className="text-center py-20">Loading packages...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {packages.length > 0 ? packages.map((pkg) => (
                  <div key={pkg._id} className="bg-surface-container-lowest editorial-shadow rounded-xl overflow-hidden flex flex-col group">
                    <div className="relative h-72 overflow-hidden">
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 asymmetric-clip" src={pkg.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuAdBRKj372X3XEdAkE-8DFUWUG3imKQ3ac1b9USL1W0C7BBcveBszqF8mJwUnrjm_5pqskUDnrMUG5yx4QEV-eq5AZXw1KY6sy0X29rpzsJ0PgTNtzNIKD6UJk5_i92ULJFJC4ETiDGG5sBM3I5psHDr_G9s4mWI7IBISEwh_FOp8XWve3y6kl_TDJzu-I1o55kkiAvkMjUJOG_qFJqigRHzs8XXys3tPtXSAhE7XP1c17NsdmgiYoT9NlK4oiCiDUJZtS4VqPVr2_y"} alt={pkg.title} />
                      <div className="absolute top-4 left-4 bg-[#CD9933] text-white px-4 py-1 text-xs font-bold uppercase tracking-widest rounded">{pkg.category}</div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-notoSerif text-2xl text-primary font-bold">{pkg.title}</h3>
                          <div className="flex items-center mt-1 text-on-surface-variant text-sm">
                            <span className="material-symbols-outlined text-sm mr-1">location_on</span>
                            <span>{pkg.location}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-on-surface-variant uppercase font-bold tracking-tighter">Starting from</div>
                          <div className="text-2xl font-notoSerif font-bold text-secondary">PKR {pkg.price.toLocaleString()}</div>
                        </div>
                      </div>
                      <div className="flex gap-4 mb-8">
                        <div className="bg-surface-container flex items-center px-3 py-1 rounded text-xs font-medium">
                          <span className="material-symbols-outlined text-sm mr-2">calendar_today</span> {pkg.duration}
                        </div>
                      </div>
                      <div className="mt-auto grid grid-cols-2 gap-4">
                        <Link to={`/package/${pkg._id}`} className="py-3 bg-[#CD9933]/10 text-[#CD9933] text-center font-bold rounded-md hover:bg-[#CD9933]/20 transition-colors border border-[#CD9933]/20 text-sm">View Details</Link>
                        <button className="py-3 bg-[#013334] text-white font-bold rounded-md hover:bg-primary transition-colors text-sm">Book Now</button>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-2 text-center py-20 bg-white rounded-xl shadow">
                    <p className="text-outline text-lg mb-4">No packages available yet.</p>
                    <Link to="/admin/login" className="text-[#CD9933] font-bold underline">Go to Admin Dashboard to add some!</Link>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Packages
