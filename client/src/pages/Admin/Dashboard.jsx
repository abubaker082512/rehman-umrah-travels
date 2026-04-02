import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const tabs = [
  { id: 'packages', label: 'Umrah Packages', icon: 'mosque' },
  { id: 'tours', label: 'International Tours', icon: 'flight' },
  { id: 'visa', label: 'Visa Services', icon: 'description' },
  { id: 'gallery', label: 'Gallery', icon: 'photo_library' },
  { id: 'blog', label: 'Blog', icon: 'article' },
]

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('packages')
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Package form
  const [packageForm, setPackageForm] = useState({
    title: '', description: '', price: '', category: 'Economy',
    duration: '', location: '', hotel_name: '', distance_from_haram: '',
    image_url: '', airline: '', stars: 4, badge: ''
  })

  // Tour form
  const [tourForm, setTourForm] = useState({
    title: '', subtitle: '', description: '', price: '', duration: '',
    image_url: '', highlights: ''
  })

  // Visa form
  const [visaForm, setVisaForm] = useState({
    title: '', description: '', processing_time: '', fee: '', documents: ''
  })

  // Blog form
  const [blogForm, setBlogForm] = useState({
    title: '', excerpt: '', content: '', category: '', image_url: ''
  })

  // Gallery form
  const [galleryForm, setGalleryForm] = useState({
    src: '', label: '', category: 'Kaaba'
  })

  // Check auth
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/admin/login')
    }
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await axios.get('/api/packages', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setPackages(Array.isArray(res.data) ? res.data : [])
    } catch (err) {
      console.error('Fetch error:', err)
    }
    setLoading(false)
  }

  const handleAddPackage = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/packages', packageForm, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setPackageForm({ title: '', description: '', price: '', category: 'Economy', duration: '', location: '', hotel_name: '', distance_from_haram: '', image_url: '', airline: '', stars: 4, badge: '' })
      fetchData()
      alert('Package added successfully!')
    } catch (err) {
      alert('Error adding package: ' + (err.response?.data?.message || err.message))
    }
  }

  const handleDeletePackage = async (id) => {
    if (!confirm('Are you sure you want to delete this package?')) return
    try {
      await axios.delete(`/api/packages/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      fetchData()
    } catch (err) {
      alert('Error deleting package')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Admin Header */}
      <header className="bg-[#013334] text-white px-8 py-4 flex justify-between items-center">
        <div>
          <h1 className="font-notoSerif text-2xl font-bold text-[#CD9933]">Admin Dashboard</h1>
          <p className="text-white/60 text-sm">Rehman Umrah & Travels</p>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" className="text-white/80 hover:text-[#CD9933] text-sm">View Site</a>
          <button onClick={handleLogout} className="bg-[#CD9933] text-white px-6 py-2 rounded text-sm font-bold hover:opacity-90">Logout</button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Tabs */}
        <aside className="w-64 bg-surface-container-lowest min-h-[calc(100vh-72px)] p-4">
          <nav className="space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${activeTab === tab.id ? 'bg-[#013334] text-white' : 'text-on-surface-variant hover:bg-surface-container'}`}
              >
                <span className="material-symbols-outlined">{tab.icon}</span>
                <span className="font-bold text-sm">{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Packages Tab */}
          {activeTab === 'packages' && (
            <div>
              <h2 className="font-notoSerif text-3xl font-bold text-primary mb-8">Manage Umrah Packages</h2>
              
              {/* Add Package Form */}
              <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow mb-8">
                <h3 className="font-notoSerif text-xl font-bold mb-6">Add New Package</h3>
                <form onSubmit={handleAddPackage} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm" placeholder="Package Title" value={packageForm.title} onChange={e => setPackageForm({...packageForm, title: e.target.value})} required />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm" placeholder="Price (PKR)" type="number" value={packageForm.price} onChange={e => setPackageForm({...packageForm, price: e.target.value})} required />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm" placeholder="Location" value={packageForm.location} onChange={e => setPackageForm({...packageForm, location: e.target.value})} />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm" placeholder="Duration (e.g., 10 Days)" value={packageForm.duration} onChange={e => setPackageForm({...packageForm, duration: e.target.value})} required />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm" placeholder="Hotel Name" value={packageForm.hotel_name} onChange={e => setPackageForm({...packageForm, hotel_name: e.target.value})} />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm" placeholder="Distance from Haram" value={packageForm.distance_from_haram} onChange={e => setPackageForm({...packageForm, distance_from_haram: e.target.value})} />
                  <select className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm" value={packageForm.category} onChange={e => setPackageForm({...packageForm, category: e.target.value})}>
                    <option>Economy</option>
                    <option>3 Star</option>
                    <option>4 Star</option>
                    <option>5 Star</option>
                    <option>Ramadan</option>
                    <option>December</option>
                  </select>
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm" placeholder="Airline" value={packageForm.airline} onChange={e => setPackageForm({...packageForm, airline: e.target.value})} />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm md:col-span-2" placeholder="Image URL" value={packageForm.image_url} onChange={e => setPackageForm({...packageForm, image_url: e.target.value})} />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm" placeholder="Badge (e.g., Best Seller)" value={packageForm.badge} onChange={e => setPackageForm({...packageForm, badge: e.target.value})} />
                  <textarea className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm md:col-span-2" placeholder="Description" rows={3} value={packageForm.description} onChange={e => setPackageForm({...packageForm, description: e.target.value})} required />
                  <button type="submit" className="bg-[#CD9933] text-white py-3 rounded font-bold text-sm md:col-span-2 hover:brightness-110 transition-all">Add Package</button>
                </form>
              </div>

              {/* Package List */}
              <div className="space-y-4">
                <h3 className="font-notoSerif text-xl font-bold">Existing Packages ({packages.length})</h3>
                {loading ? (
                  <p className="text-on-surface-variant">Loading...</p>
                ) : packages.length === 0 ? (
                  <div className="bg-surface-container-lowest p-8 rounded-xl text-center">
                    <span className="material-symbols-outlined text-6xl text-outline-variant mb-4 block">inventory_2</span>
                    <p className="text-on-surface-variant">No packages found. Add your first package above.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {packages.map(pkg => (
                      <div key={pkg.id} className="bg-surface-container-lowest p-4 rounded-lg editorial-shadow flex gap-4">
                        <img src={pkg.image_url || pkg.image} alt={pkg.title} className="w-24 h-24 object-cover rounded-lg" />
                        <div className="flex-1">
                          <h4 className="font-bold text-primary">{pkg.title}</h4>
                          <p className="text-sm text-on-surface-variant">{pkg.category} • {pkg.duration}</p>
                          <p className="text-[#CD9933] font-bold">PKR {(pkg.price || 0).toLocaleString()}</p>
                        </div>
                        <button onClick={() => handleDeletePackage(pkg.id)} className="self-start text-red-500 hover:text-red-700">
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tours Tab */}
          {activeTab === 'tours' && (
            <div>
              <h2 className="font-notoSerif text-3xl font-bold text-primary mb-8">Manage International Tours</h2>
              <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow mb-8">
                <h3 className="font-notoSerif text-xl font-bold mb-6">Add New Tour</h3>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm" placeholder="Tour Title (e.g., Turkey Tour)" />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm" placeholder="Subtitle (e.g., Istanbul, Cappadocia)" />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm" placeholder="Duration (e.g., 10 Days)" />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm" placeholder="Price (PKR)" />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm md:col-span-2" placeholder="Image URL" />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm md:col-span-2" placeholder="Highlights (comma separated)" />
                  <textarea className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm md:col-span-2" placeholder="Description" rows={3} />
                  <button type="button" className="bg-[#CD9933] text-white py-3 rounded font-bold text-sm md:col-span-2 hover:brightness-110 transition-all">Add Tour</button>
                </form>
              </div>
              <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow text-center">
                <span className="material-symbols-outlined text-6xl text-outline-variant mb-4 block">travel_explore</span>
                <p className="text-on-surface-variant">Tour management connected to database. Add tours using the form above.</p>
              </div>
            </div>
          )}

          {/* Visa Tab */}
          {activeTab === 'visa' && (
            <div>
              <h2 className="font-notoSerif text-3xl font-bold text-primary mb-8">Manage Visa Services</h2>
              <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow mb-8">
                <h3 className="font-notoSerif text-xl font-bold mb-6">Add New Visa Service</h3>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm" placeholder="Visa Title (e.g., Umrah Visa)" />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm" placeholder="Processing Time" />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm" placeholder="Fee (PKR)" />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm" placeholder="Required Documents (comma separated)" />
                  <textarea className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm md:col-span-2" placeholder="Description" rows={3} />
                  <button type="button" className="bg-[#CD9933] text-white py-3 rounded font-bold text-sm md:col-span-2 hover:brightness-110 transition-all">Add Visa Service</button>
                </form>
              </div>
              <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow text-center">
                <span className="material-symbols-outlined text-6xl text-outline-variant mb-4 block">description</span>
                <p className="text-on-surface-variant">Visa services management. Add and update visa types using the form above.</p>
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div>
              <h2 className="font-notoSerif text-3xl font-bold text-primary mb-8">Manage Gallery</h2>
              <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow mb-8">
                <h3 className="font-notoSerif text-xl font-bold mb-6">Add New Gallery Image</h3>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm" placeholder="Image URL" />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm" placeholder="Label / Title" />
                  <select className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm">
                    <option>Kaaba</option>
                    <option>Masjid Nabawi</option>
                    <option>Ziyarat</option>
                    <option>Umrah Groups</option>
                    <option>International Tours</option>
                  </select>
                  <button type="button" className="bg-[#CD9933] text-white py-3 rounded font-bold text-sm hover:brightness-110 transition-all">Add Image</button>
                </form>
              </div>
              <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow text-center">
                <span className="material-symbols-outlined text-6xl text-outline-variant mb-4 block">photo_library</span>
                <p className="text-on-surface-variant">Gallery management. Upload and categorize images for the gallery page.</p>
              </div>
            </div>
          )}

          {/* Blog Tab */}
          {activeTab === 'blog' && (
            <div>
              <h2 className="font-notoSerif text-3xl font-bold text-primary mb-8">Manage Blog Posts</h2>
              <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow mb-8">
                <h3 className="font-notoSerif text-xl font-bold mb-6">Add New Blog Post</h3>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm" placeholder="Post Title" />
                  <select className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm">
                    <option>Guides</option>
                    <option>Planning</option>
                    <option>Destinations</option>
                    <option>Packages</option>
                    <option>History</option>
                  </select>
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm" placeholder="Read Time (e.g., 5 min read)" />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm" placeholder="Image URL" />
                  <textarea className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm md:col-span-2" placeholder="Excerpt" rows={2} />
                  <textarea className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm md:col-span-2" placeholder="Full Content" rows={4} />
                  <button type="button" className="bg-[#CD9933] text-white py-3 rounded font-bold text-sm md:col-span-2 hover:brightness-110 transition-all">Publish Post</button>
                </form>
              </div>
              <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow text-center">
                <span className="material-symbols-outlined text-6xl text-outline-variant mb-4 block">article</span>
                <p className="text-on-surface-variant">Blog management. Create and publish articles for SEO and customer engagement.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard
