import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { createClient } from '@supabase/supabase-js'

const API_BASE = import.meta.env.VITE_API_URL || ''

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null

const tabs = [
  { id: 'packages', label: 'Umrah Packages', icon: 'mosque' },
  { id: 'tours', label: 'International Tours', icon: 'flight' },
  { id: 'visa', label: 'Visa Services', icon: 'description' },
  { id: 'gallery', label: 'Gallery', icon: 'photo_library' },
  { id: 'blog', label: 'Blog', icon: 'article' },
  { id: 'page-media', label: 'Page Media', icon: 'image' },
  { id: 'cms', label: 'Content CMS', icon: 'edit_note' },
  { id: 'settings', label: 'Site Settings', icon: 'settings' },
]

// Media Upload Component (Photo or Video)
const MediaUpload = ({ value, onChange, label = 'Media', type = 'image' }) => {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(value)
  const [mediaType, setMediaType] = useState(type)

  const acceptTypes = mediaType === 'video' ? 'video/*' : 'image/*'

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (supabase) {
      setUploading(true)
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const { data, error } = await supabase.storage
        .from('uploads')
        .upload(fileName, file)

      if (error) {
        alert('Upload failed: ' + error.message)
        setUploading(false)
        return
      }

      const { data: { publicUrl } } = supabase.storage
        .from('uploads')
        .getPublicUrl(data.path)

      onChange(publicUrl)
      setPreview(publicUrl)
      setUploading(false)
    } else {
      const reader = new FileReader()
      reader.onloadend = () => {
        const dataUrl = reader.result
        onChange(dataUrl)
        setPreview(dataUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-widest text-outline">{label}</label>
        <select 
          value={mediaType} 
          onChange={(e) => setMediaType(e.target.value)}
          className="text-xs bg-surface border border-outline-variant px-2 py-1 rounded"
        >
          <option value="image">Photo</option>
          <option value="video">Video</option>
        </select>
      </div>
      <div className="flex items-center gap-4">
        <label className="flex-1 flex items-center gap-2 bg-surface border border-outline-variant hover:border-[#CD9933] py-3 px-3 rounded-lg cursor-pointer transition-colors">
          <span className="material-symbols-outlined text-outline">{mediaType === 'video' ? 'videocam' : 'add_photo_alternate'}</span>
          <span className="text-sm text-on-surface-variant truncate flex-1">
            {uploading ? 'Uploading...' : 'Click to upload ' + (mediaType === 'video' ? 'video' : 'image')}
          </span>
          <input type="file" accept={acceptTypes} onChange={handleFileChange} disabled={uploading} className="hidden" />
        </label>
        {preview && (
          <button onClick={() => { onChange(''); setPreview('') }} className="text-red-500 hover:text-red-700">
            <span className="material-symbols-outlined">delete</span>
          </button>
        )}
      </div>
      {preview && (
        <div className="mt-2">
          {mediaType === 'video' || preview.includes('video') || preview.includes('.mp4') ? (
            <video src={preview} controls className="w-full max-h-48 rounded-lg border border-outline-variant" />
          ) : (
            <img src={preview} alt="Preview" className="w-full max-h-48 object-cover rounded-lg border border-outline-variant" />
          )}
        </div>
      )}
      {value && !value.startsWith('data:') && (
        <input 
          className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 px-3 text-xs text-on-surface-variant rounded-lg" 
          value={value} 
          onChange={e => { onChange(e.target.value); setPreview(e.target.value) }} 
          placeholder="Or paste URL here" 
        />
      )}
    </div>
  )
}

// Image Upload Component
const ImageUpload = ({ value, onChange, label = 'Image' }) => {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(value)

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (supabase) {
      setUploading(true)
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const { data, error } = await supabase.storage
        .from('uploads')
        .upload(fileName, file)

      if (error) {
        alert('Upload failed: ' + error.message)
        setUploading(false)
        return
      }

      const { data: { publicUrl } } = supabase.storage
        .from('uploads')
        .getPublicUrl(data.path)

      onChange(publicUrl)
      setPreview(publicUrl)
      setUploading(false)
    } else {
      const reader = new FileReader()
      reader.onloadend = () => {
        const dataUrl = reader.result
        onChange(dataUrl)
        setPreview(dataUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold uppercase tracking-widest text-outline">{label}</label>
      <div className="flex items-center gap-4">
        <label className="flex-1 flex items-center gap-2 bg-surface border-0 border-b border-outline-variant focus-within:border-[#CD9933] py-2 px-1 cursor-pointer">
          <span className="material-symbols-outlined text-outline text-sm">cloud_upload</span>
          <span className="text-sm text-on-surface-variant truncate flex-1">
            {uploading ? 'Uploading...' : 'Choose file'}
          </span>
          <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} className="hidden" />
        </label>
        {preview && (
          <img src={preview} alt="Preview" className="w-12 h-12 object-cover rounded-lg border border-outline-variant" />
        )}
      </div>
      {value && !value.startsWith('data:') && (
        <input className="w-full bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-xs text-on-surface-variant" value={value} onChange={e => onChange(e.target.value)} placeholder="Or paste image URL" />
      )}
    </div>
  )
}

// Page Media Configuration
const pageMediaConfig = [
  {
    page: 'Homepage',
    section: 'Hero Section',
    items: [
      { key: 'home_hero_image', label: 'Hero Background Image', type: 'image', description: 'Main hero section background image' },
      { key: 'home_hero_video', label: 'Hero Background Video', type: 'video', description: 'Optional video background (replaces image)' },
    ]
  },
  {
    page: 'Homepage',
    section: 'Backgrounds',
    items: [
      { key: 'home_about_bg', label: 'About Section Background', type: 'image', description: 'Background for About Us section' },
      { key: 'home_packages_bg', label: 'Packages Section Background', type: 'image', description: 'Background for Packages section' },
      { key: 'home_gallery_bg', label: 'Gallery Section Background', type: 'image', description: 'Background for Gallery section' },
      { key: 'home_testimonials_bg', label: 'Testimonials Section Background', type: 'image', description: 'Background for Testimonials section' },
    ]
  },
  {
    page: 'About Page',
    section: 'About Page Media',
    items: [
      { key: 'about_hero_image', label: 'Hero Image', type: 'image', description: 'About page hero image' },
      { key: 'about_section_image', label: 'Main Content Image', type: 'image', description: 'Image in main content area' },
      { key: 'about_video', label: 'Promotional Video', type: 'video', description: 'Optional company video' },
    ]
  },
  {
    page: 'Contact Page',
    section: 'Contact Page Media',
    items: [
      { key: 'contact_hero_image', label: 'Hero Image', type: 'image', description: 'Contact page hero image' },
      { key: 'contact_map_image', label: 'Map Placeholder Image', type: 'image', description: 'Map or location image' },
    ]
  },
  {
    page: 'Gallery Page',
    section: 'Gallery Page Media',
    items: [
      { key: 'gallery_hero_image', label: 'Hero Image', type: 'image', description: 'Gallery page hero image' },
      { key: 'gallery_banner', label: 'Banner Image', type: 'image', description: 'Additional banner for gallery' },
    ]
  },
  {
    page: 'Visa Services',
    section: 'Visa Page Media',
    items: [
      { key: 'visa_hero_image', label: 'Hero Image', type: 'image', description: 'Visa services hero image' },
      { key: 'visa_banner', label: 'Banner/Background', type: 'image', description: 'Banner or background image' },
    ]
  },
  {
    page: 'International Tours',
    section: 'Tours Page Media',
    items: [
      { key: 'tours_hero_image', label: 'Hero Image', type: 'image', description: 'Tours page hero image' },
      { key: 'tours_video', label: 'Promotional Video', type: 'video', description: 'Tours promotional video' },
    ]
  },
  {
    page: 'FAQ Page',
    section: 'FAQ Page Media',
    items: [
      { key: 'faq_hero_image', label: 'Hero Image', type: 'image', description: 'FAQ page hero image' },
    ]
  },
  {
    page: 'Blog Page',
    section: 'Blog Page Media',
    items: [
      { key: 'blog_hero_image', label: 'Hero Image', type: 'image', description: 'Blog page hero image' },
    ]
  },
  {
    page: 'Umrah Packages',
    section: 'Packages Page Media',
    items: [
      { key: 'packages_hero_image', label: 'Hero Image', type: 'image', description: 'Packages page hero image' },
      { key: 'packages_video', label: 'Umrah Video', type: 'video', description: 'Promotional Umrah video' },
    ]
  },
]

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('packages')
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Page Media State
  const [pageMedia, setPageMedia] = useState({})
  const [mediaSaving, setMediaSaving] = useState(false)

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

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/admin/login')
    }
    fetchData()
    loadPageMedia()
  }, [])

  const loadPageMedia = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/cms?id=page_media`)
      if (res.data) {
        setPageMedia(res.data)
      }
    } catch (err) {
      console.error('Error loading page media:', err)
    }
  }

  const savePageMedia = async () => {
    localStorage.setItem('pageMedia', JSON.stringify(pageMedia))
    try {
      await axios.post(`${API_BASE}/api/cms?id=page_media`, pageMedia, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
    } catch (err) {
      console.log('Saved locally')
    }
    setMediaSaving(false)
    alert('Page media saved successfully!')
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${API_BASE}/api/packages`, {
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
      await axios.post(`${API_BASE}/api/packages`, {
        ...packageForm,
        price: parseFloat(packageForm.price) || 0
      }, {
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
      await axios.delete(`${API_BASE}/api/packages/${id}`, {
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
          <p className="text-white/60 text-sm">Royal Umrah & Travels</p>
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

          {/* Supabase Status */}
          <div className="mt-8 p-4 bg-surface-container-low rounded-lg">
            <p className="text-xs font-bold text-outline uppercase tracking-widest mb-2">Storage</p>
            {supabase ? (
              <p className="text-xs text-green-600 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">cloud_done</span>
                Supabase Connected
              </p>
            ) : (
              <p className="text-xs text-orange-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">warning</span>
                Base64 Mode
              </p>
            )}
          </div>
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
                  
                  {/* Image Upload */}
                  <div className="md:col-span-2">
                    <ImageUpload 
                      value={packageForm.image_url} 
                      onChange={(val) => setPackageForm({...packageForm, image_url: val})}
                      label="Package Image"
                    />
                  </div>

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
                        <img src={(pkg.image_url || pkg.image) || 'https://via.placeholder.com/96'} alt={pkg.title} className="w-24 h-24 object-cover rounded-lg" />
                        <div className="flex-1">
                          <h4 className="font-bold text-primary">{pkg.title}</h4>
                          <p className="text-sm text-on-surface-variant font-medium">{pkg.category} • {pkg.duration}</p>
                          <p className="text-[#CD9933] font-bold">PKR {(pkg.price || 0).toLocaleString()}</p>
                          <p className="text-[10px] text-outline mt-1 font-mono uppercase truncate max-w-[150px]">{pkg.id}</p>
                        </div>
                        <button onClick={() => handleDeletePackage(pkg.id)} className="self-start text-red-500 hover:text-red-700 transition-colors">
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
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm" placeholder="Tour Title (e.g., Turkey Tour)" value={tourForm.title} onChange={e => setTourForm({...tourForm, title: e.target.value})} />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm" placeholder="Subtitle (e.g., Istanbul, Cappadocia)" value={tourForm.subtitle} onChange={e => setTourForm({...tourForm, subtitle: e.target.value})} />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm" placeholder="Duration (e.g., 10 Days)" value={tourForm.duration} onChange={e => setTourForm({...tourForm, duration: e.target.value})} />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm" placeholder="Price (PKR)" value={tourForm.price} onChange={e => setTourForm({...tourForm, price: e.target.value})} />
                  
                  {/* Image Upload */}
                  <div className="md:col-span-2">
                    <ImageUpload 
                      value={tourForm.image_url} 
                      onChange={(val) => setTourForm({...tourForm, image_url: val})}
                      label="Tour Image"
                    />
                  </div>

                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm md:col-span-2" placeholder="Highlights (comma separated)" value={tourForm.highlights} onChange={e => setTourForm({...tourForm, highlights: e.target.value})} />
                  <textarea className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm md:col-span-2" placeholder="Description" rows={3} value={tourForm.description} onChange={e => setTourForm({...tourForm, description: e.target.value})} />
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
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm" placeholder="Visa Title (e.g., Umrah Visa)" value={visaForm.title} onChange={e => setVisaForm({...visaForm, title: e.target.value})} />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm" placeholder="Processing Time" value={visaForm.processing_time} onChange={e => setVisaForm({...visaForm, processing_time: e.target.value})} />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm" placeholder="Fee (PKR)" value={visaForm.fee} onChange={e => setVisaForm({...visaForm, fee: e.target.value})} />
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm" placeholder="Required Documents (comma separated)" value={visaForm.documents} onChange={e => setVisaForm({...visaForm, documents: e.target.value})} />
                  <textarea className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm md:col-span-2" placeholder="Description" rows={3} value={visaForm.description} onChange={e => setVisaForm({...visaForm, description: e.target.value})} />
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
                  {/* Image Upload */}
                  <div className="md:col-span-2">
                    <ImageUpload 
                      value={galleryForm.src} 
                      onChange={(val) => setGalleryForm({...galleryForm, src: val})}
                      label="Gallery Image"
                    />
                  </div>
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm" placeholder="Label / Title" value={galleryForm.label} onChange={e => setGalleryForm({...galleryForm, label: e.target.value})} />
                  <select className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm" value={galleryForm.category} onChange={e => setGalleryForm({...galleryForm, category: e.target.value})}>
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
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm" placeholder="Post Title" value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} />
                  <select className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm" value={blogForm.category} onChange={e => setBlogForm({...blogForm, category: e.target.value})}>
                    <option>Guides</option>
                    <option>Planning</option>
                    <option>Destinations</option>
                    <option>Packages</option>
                    <option>History</option>
                  </select>
                  <input className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm" placeholder="Read Time (e.g., 5 min read)" value={blogForm.read_time} onChange={e => setBlogForm({...blogForm, read_time: e.target.value})} />
                  
                  {/* Image Upload */}
                  <div className="md:col-span-2">
                    <ImageUpload 
                      value={blogForm.image_url} 
                      onChange={(val) => setBlogForm({...blogForm, image_url: val})}
                      label="Featured Image"
                    />
                  </div>

                  <textarea className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm md:col-span-2" placeholder="Excerpt" rows={2} value={blogForm.excerpt} onChange={e => setBlogForm({...blogForm, excerpt: e.target.value})} />
                  <textarea className="bg-surface border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 text-sm md:col-span-2" placeholder="Full Content" rows={4} value={blogForm.content} onChange={e => setBlogForm({...blogForm, content: e.target.value})} />
                  <button type="button" className="bg-[#CD9933] text-white py-3 rounded font-bold text-sm md:col-span-2 hover:brightness-110 transition-all">Publish Post</button>
                </form>
              </div>
              <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow text-center">
                <span className="material-symbols-outlined text-6xl text-outline-variant mb-4 block">article</span>
                <p className="text-on-surface-variant">Blog management. Create and publish articles for SEO and customer engagement.</p>
              </div>
            </div>
          )}

          {/* Page Media Tab */}
          {activeTab === 'page-media' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-notoSerif text-3xl font-bold text-primary">Page Media Manager</h2>
                <button 
                  onClick={savePageMedia}
                  disabled={mediaSaving}
                  className="bg-[#CD9933] text-white px-8 py-3 rounded font-bold hover:brightness-110 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined">{mediaSaving ? 'hourglass_empty' : 'save'}</span>
                  {mediaSaving ? 'Saving...' : 'Save All Changes'}
                </button>
              </div>
              
              <p className="text-on-surface-variant mb-8">Upload images and videos for different pages and sections of your website. Select Photo or Video option for each media item.</p>

              {/* Media Sections by Page */}
              {pageMediaConfig.map((section) => (
                <div key={section.page + section.section} className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow mb-8">
                  <div className="mb-6">
                    <span className="inline-block bg-[#013334] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">{section.page}</span>
                    <h3 className="font-notoSerif text-xl font-bold text-primary">{section.section}</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {section.items.map((item) => (
                      <div key={item.key} className="bg-surface p-6 rounded-xl border border-outline-variant">
                        <div className="mb-3">
                          <h4 className="font-bold text-sm">{item.label}</h4>
                          <p className="text-xs text-on-surface-variant">{item.description}</p>
                        </div>
                        <MediaUpload
                          value={pageMedia[item.key] || ''}
                          onChange={(val) => setPageMedia({...pageMedia, [item.key]: val})}
                          label={item.label}
                          type={item.type}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Info Box */}
              <div className="bg-[#CD9933]/10 border border-[#CD9933]/30 p-6 rounded-xl">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#CD9933]">info</span>
                  <div>
                    <h4 className="font-bold text-sm mb-1">How Page Media Works</h4>
                    <p className="text-xs text-on-surface-variant">
                      Upload images and videos for specific sections of your website. 
                      Media is saved locally in your browser and will persist across sessions. 
                      For production use with Supabase, media URLs can be configured to point to your storage bucket.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content CMS Tab */}
          {activeTab === 'cms' && <ContentCMS />}

          {/* Settings Tab */}
          {activeTab === 'settings' && <SiteSettings />}
        </main>
      </div>
    </div>
  )
}

// Content CMS Component
const ContentCMS = () => {
  const [activeContentTab, setActiveContentTab] = useState('home')
  const [saving, setSaving] = useState(false)
  
  // Content state
  const [homeContent, setHomeContent] = useState({
    heroTitle: 'Your Trusted Partner for Umrah & International Tours',
      heroSubtitle: 'Embark on a spiritual journey of a lifetime with our premium, all-inclusive Umrah packages and bespoke international travel experiences.',
      heroCta: 'View Umrah Packages',
      heroWhatsApp: 'Contact on WhatsApp',
      heroImage: '',
      heroVideo: '',
      featuredTitle: 'Curated Umrah Packages',
      featuredSubtitle: 'Spiritual Journeys',
      featuredImage: '',
      whyChooseTitle: 'Setting a Sacred Standard for Travel',
      whyChooseImage: '',
      toursTitle: 'Discover the World',
      toursSubtitle: 'Beyond Borders',
      toursImage: '',
      testimonialsTitle: 'Voices of Gratitude',
      testimonialsSubtitle: 'Client Feedback',
      testimonialsImage: '',
      ctaTitle: 'Book Your Umrah Journey Today',
      ctaSubtitle: 'Contact our travel consultants today to get a personalized quote for your spiritual or leisure travel needs.',
      ctaPrimary: 'Get a Quote',
      ctaSecondary: 'Contact Us',
      ctaImage: '',
  })

  const [aboutContent, setAboutContent] = useState({
    heroTitle: 'About Us',
      heroSubtitle: 'A legacy of service, built on the foundation of faith and the honor of serving Allah\'s guests.',
      heroImage: '',
      heroVideo: '',
      storyTitle: 'Crafting Pathways to the Holy Lands',
      storyText1: 'Royal Umrah & Travels began as a humble aspiration: to transform the daunting logistics of pilgrimage into a seamless, contemplative experience.',
      storyText2: 'Over two decades, we have evolved from a small local agency into a premier travel concierge in Pakistan.',
      storyText3: 'Every detail, from the proximity of the hotels to the expertise of our guides, is curated to ensure that your focus remains entirely on the spiritual essence of your visit.',
      storyImage: '',
      missionTitle: 'To provide affordable and comfortable Umrah journeys.',
      missionText: 'We dismantle the barriers of complexity and cost, ensuring every believer can answer the call to the Haramain with dignity and ease.',
      visionTitle: 'To become a trusted Umrah travel agency in Pakistan.',
      visionText: 'We aspire to set the gold standard in pilgrimage services, blending traditional values with modern logistical excellence.',
      statsYears: '25+',
      statsPilgrims: '50K+',
      statsDestinations: '100+',
      statsRating: '4.9',
      statsImage: '',
      ctaTitle: 'Ready to begin your pilgrimage?',
      ctaSubtitle: 'Consult with our specialists today and let us tailor a journey that honors your devotion.',
  })

  const [contactContent, setContactContent] = useState({
    heroTitle: 'Get in Touch',
      heroSubtitle: 'Have questions about our Umrah packages or international tours? Our travel consultants are ready to assist you.',
      heroImage: '',
      phone1: '+92 300 123 4567',
      phone2: '+92 42 123 4567',
      email: 'info@royalumrahandtravel.com',
      whatsapp: '+92 300 123 4567',
      addressLahore: 'Main Boulevard, Gulberg III, Lahore, Pakistan',
      addressKarachi: 'DHA Phase II, Karachi, Pakistan',
      mapImage: '',
      formTitle: 'Send Us a Message',
      formSubtitle: 'Fill out the form below and our travel consultants will get back to you within 24 hours.',
      ctaTitle: 'Let Us Plan Your Journey',
      ctaSubtitle: 'Whether it\'s a spiritual Umrah journey or an international adventure, our experts are here to make it happen.',
  })

  const [faqContent, setFaqContent] = useState([
    { id: 1, question: 'What documents do I need for Umrah?', answer: 'For Umrah, you need a valid passport with at least 6 months validity, passport-sized photos, and a completed visa application. We handle the visa process for you.', category: 'Visa' },
      { id: 2, question: 'How far in advance should I book?', answer: 'We recommend booking at least 2-3 months in advance, especially during Ramadan and Hajj season, to ensure availability and better rates.', category: 'Booking' },
      { id: 3, question: 'Is travel insurance included?', answer: 'Travel insurance is not included in our packages but can be added at an additional cost. We recommend it for international travel.', category: 'Services' },
      { id: 4, question: 'What is the difference between Economy and VIP packages?', answer: 'Economy packages offer standard 3-star hotels with shared transportation, while VIP packages include 5-star hotels, private transfers, and premium services.', category: 'Packages' },
      { id: 5, question: 'Can I customize my Umrah package?', answer: 'Yes! We offer fully customizable packages. Contact our team to discuss your specific requirements and we will create a tailored itinerary.', category: 'Customization' },
  ])

  const [footerContent, setFooterContent] = useState({
    description: 'Royal Umrah & Travels specializes in crafting meaningful spiritual journeys and world-class international tours for the discerning traveler.',
      quickLinks: ['About Us', 'Visa Services', 'Packages', 'Terms & Conditions', 'Privacy Policy'],
      copyright: '© 2024 Royal Umrah & Travels. All Rights Reserved.',
      socialLinks: { facebook: '', instagram: '', twitter: '', youtube: '' },
      logo: '',
      bgImage: ''
  })

  const [mediaContent, setMediaContent] = useState({
    homeHeroImage: '',
      homeHeroVideo: '',
      homeWhyChooseBg: '',
      homeFeaturedBg: '',
      homeTestimonialsBg: '',
      homeCtaBg: '',
      aboutHeroImage: '',
      aboutStoryImage: '',
      aboutVideo: '',
      aboutStatsBg: '',
      contactHeroImage: '',
      contactMapImage: '',
      contactCtaBg: '',
      packagesHeroImage: '',
      packagesVideo: '',
      toursHeroImage: '',
      toursVideo: '',
      visaHeroImage: '',
      visaBgImage: '',
      galleryHeroImage: '',
      galleryBanner: '',
      faqHeroImage: '',
      blogHeroImage: '',
      navbarLogo: '',
      favicon: '',
      whatsappIcon: ''
  })

  useEffect(() => {
    fetchCmsContent()
  }, [])

  const saveContent = (key, content) => {
    setSaving(true)
    localStorage.setItem(`cms_${key}`, JSON.stringify(content))
    console.log('Saved locally:', key)
    setSaving(false)
    alert('Content saved successfully!')
  }
  
  const addFaq = () => {
    const newFaq = {
      id: Date.now(),
      question: 'New Question',
      answer: 'Your answer here...',
      category: 'General'
    }
    setFaqContent([...faqContent, newFaq])
  }

  const updateFaq = (id, field, value) => {
    setFaqContent(faqContent.map(faq => 
      faq.id === id ? { ...faq, [field]: value } : faq
    ))
  }

  const deleteFaq = (id) => {
    if (confirm('Delete this FAQ?')) {
      setFaqContent(faqContent.filter(faq => faq.id !== id))
    }
  }

  const contentTabs = [
    { id: 'home', label: 'Home Page' },
    { id: 'about', label: 'About Page' },
    { id: 'contact', label: 'Contact Page' },
    { id: 'faq', label: 'FAQ' },
    { id: 'footer', label: 'Footer' },
    { id: 'media', label: 'Images & Videos' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-notoSerif text-3xl font-bold text-primary">Content Management</h2>
      </div>
      
      <p className="text-on-surface-variant mb-8">Manage all website content including text, FAQs, and footer information.</p>

      {/* Content Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {contentTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveContentTab(tab.id)}
            className={`px-6 py-3 rounded-lg font-bold text-sm whitespace-nowrap transition-all ${
              activeContentTab === tab.id 
                ? 'bg-[#013334] text-white' 
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Home Page Content */}
      {activeContentTab === 'home' && (
        <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow">
          <h3 className="font-notoSerif text-xl font-bold mb-6">Home Page Content</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Hero Section Title</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                value={homeContent.heroTitle}
                onChange={(e) => setHomeContent({...homeContent, heroTitle: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Hero Section Subtitle</label>
              <textarea 
                className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                rows={3}
                value={homeContent.heroSubtitle}
                onChange={(e) => setHomeContent({...homeContent, heroSubtitle: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Featured Section Title</label>
                <input 
                  className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                  value={homeContent.featuredTitle}
                  onChange={(e) => setHomeContent({...homeContent, featuredTitle: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Tours Section Title</label>
                <input 
                  className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                  value={homeContent.toursTitle}
                  onChange={(e) => setHomeContent({...homeContent, toursTitle: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">CTA Section Title</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                value={homeContent.ctaTitle}
                onChange={(e) => setHomeContent({...homeContent, ctaTitle: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">CTA Section Subtitle</label>
              <textarea 
                className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                rows={2}
                value={homeContent.ctaSubtitle}
                onChange={(e) => setHomeContent({...homeContent, ctaSubtitle: e.target.value})}
              />
            </div>
            <button 
              onClick={() => saveContent('home', homeContent)}
              className="bg-[#CD9933] text-white px-8 py-3 rounded-lg font-bold text-sm hover:brightness-110 transition-all"
            >
              {saving ? 'Saving...' : 'Save Home Page Content'}
            </button>
          </div>
        </div>
      )}

      {/* About Page Content */}
      {activeContentTab === 'about' && (
        <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow">
          <h3 className="font-notoSerif text-xl font-bold mb-6">About Page Content</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Hero Title</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                value={aboutContent.heroTitle}
                onChange={(e) => setAboutContent({...aboutContent, heroTitle: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Hero Subtitle</label>
              <textarea 
                className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                rows={2}
                value={aboutContent.heroSubtitle}
                onChange={(e) => setAboutContent({...aboutContent, heroSubtitle: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Story Title</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                value={aboutContent.storyTitle}
                onChange={(e) => setAboutContent({...aboutContent, storyTitle: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Story Paragraph 1</label>
              <textarea 
                className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                rows={3}
                value={aboutContent.storyText1}
                onChange={(e) => setAboutContent({...aboutContent, storyText1: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Story Paragraph 2</label>
              <textarea 
                className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                rows={3}
                value={aboutContent.storyText2}
                onChange={(e) => setAboutContent({...aboutContent, storyText2: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Mission Statement</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                value={aboutContent.missionTitle}
                onChange={(e) => setAboutContent({...aboutContent, missionTitle: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Vision Statement</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                value={aboutContent.visionTitle}
                onChange={(e) => setAboutContent({...aboutContent, visionTitle: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Years (e.g. 25+)</label>
                <input 
                  className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                  value={aboutContent.statsYears}
                  onChange={(e) => setAboutContent({...aboutContent, statsYears: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Pilgrims (e.g. 50K+)</label>
                <input 
                  className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                  value={aboutContent.statsPilgrims}
                  onChange={(e) => setAboutContent({...aboutContent, statsPilgrims: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Destinations</label>
                <input 
                  className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                  value={aboutContent.statsDestinations}
                  onChange={(e) => setAboutContent({...aboutContent, statsDestinations: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Rating</label>
                <input 
                  className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                  value={aboutContent.statsRating}
                  onChange={(e) => setAboutContent({...aboutContent, statsRating: e.target.value})}
                />
              </div>
            </div>
            <button 
              onClick={() => saveContent('about', aboutContent)}
              className="bg-[#CD9933] text-white px-8 py-3 rounded-lg font-bold text-sm hover:brightness-110 transition-all"
            >
              {saving ? 'Saving...' : 'Save About Page Content'}
            </button>
          </div>
        </div>
      )}

      {/* Contact Page Content */}
      {activeContentTab === 'contact' && (
        <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow">
          <h3 className="font-notoSerif text-xl font-bold mb-6">Contact Page Content</h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Phone Number 1</label>
                <input 
                  className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                  value={contactContent.phone1}
                  onChange={(e) => setContactContent({...contactContent, phone1: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Phone Number 2</label>
                <input 
                  className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                  value={contactContent.phone2}
                  onChange={(e) => setContactContent({...contactContent, phone2: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Email Address</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                value={contactContent.email}
                onChange={(e) => setContactContent({...contactContent, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">WhatsApp Number</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                value={contactContent.whatsapp}
                onChange={(e) => setContactContent({...contactContent, whatsapp: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Lahore Address</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                value={contactContent.addressLahore}
                onChange={(e) => setContactContent({...contactContent, addressLahore: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Karachi Address</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                value={contactContent.addressKarachi}
                onChange={(e) => setContactContent({...contactContent, addressKarachi: e.target.value})}
              />
            </div>
            <button 
              onClick={() => saveContent('contact', contactContent)}
              className="bg-[#CD9933] text-white px-8 py-3 rounded-lg font-bold text-sm hover:brightness-110 transition-all"
            >
              {saving ? 'Saving...' : 'Save Contact Content'}
            </button>
          </div>
        </div>
      )}

      {/* FAQ Management */}
      {activeContentTab === 'faq' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-notoSerif text-xl font-bold">Frequently Asked Questions</h3>
            <button 
              onClick={addFaq}
              className="bg-[#013334] text-white px-6 py-2 rounded-lg font-bold text-sm hover:brightness-110 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Add FAQ
            </button>
          </div>
          <div className="space-y-4">
            {faqContent.map((faq, index) => (
              <div key={faq.id} className="bg-surface-container-lowest p-6 rounded-xl editorial-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-[#CD9933] uppercase">FAQ #{index + 1}</span>
                  <div className="flex items-center gap-2">
                    <select 
                      value={faq.category}
                      onChange={(e) => updateFaq(faq.id, 'category', e.target.value)}
                      className="text-xs bg-surface border border-outline-variant px-3 py-1 rounded"
                    >
                      <option>General</option>
                      <option>Visa</option>
                      <option>Booking</option>
                      <option>Packages</option>
                      <option>Customization</option>
                      <option>Services</option>
                    </select>
                    <button 
                      onClick={() => deleteFaq(faq.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Question</label>
                    <input 
                      className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 px-3 rounded-lg text-sm"
                      value={faq.question}
                      onChange={(e) => updateFaq(faq.id, 'question', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Answer</label>
                    <textarea 
                      className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-2 px-3 rounded-lg text-sm"
                      rows={3}
                      value={faq.answer}
                      onChange={(e) => updateFaq(faq.id, 'answer', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => saveContent('faq', faqContent)}
            className="bg-[#CD9933] text-white px-8 py-3 rounded-lg font-bold text-sm hover:brightness-110 transition-all mt-6"
          >
            {saving ? 'Saving...' : 'Save All FAQs'}
          </button>
        </div>
      )}

      {/* Footer Content */}
      {activeContentTab === 'footer' && (
        <div className="space-y-6">
          {/* Footer Media */}
          <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow">
            <h3 className="font-notoSerif text-xl font-bold mb-6">Footer Media</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Footer Logo</label>
                <MediaUpload
                  value={footerContent.logo || ''}
                  onChange={(val) => setFooterContent({...footerContent, logo: val})}
                  label="Logo"
                  type="image"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Background Image</label>
                <MediaUpload
                  value={footerContent.bgImage || ''}
                  onChange={(val) => setFooterContent({...footerContent, bgImage: val})}
                  label="Background"
                  type="image"
                />
              </div>
            </div>
          </div>

          {/* Footer Text Content */}
          <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow">
            <h3 className="font-notoSerif text-xl font-bold mb-6">Footer Text Content</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Company Description</label>
                <textarea 
                  className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                  rows={3}
                  value={footerContent.description}
                  onChange={(e) => setFooterContent({...footerContent, description: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Copyright Text</label>
                <input 
                  className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                  value={footerContent.copyright}
                  onChange={(e) => setFooterContent({...footerContent, copyright: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Quick Links (comma separated)</label>
                <input 
                  className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                  value={footerContent.quickLinks.join(', ')}
                  onChange={(e) => setFooterContent({...footerContent, quickLinks: e.target.value.split(',').map(s => s.trim())})}
                />
              </div>
              <h4 className="font-bold text-sm mt-6">Social Media Links</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Facebook URL</label>
                  <input 
                    className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                    value={footerContent.socialLinks.facebook}
                    onChange={(e) => setFooterContent({...footerContent, socialLinks: {...footerContent.socialLinks, facebook: e.target.value}})}
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Instagram URL</label>
                  <input 
                    className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                    value={footerContent.socialLinks.instagram}
                    onChange={(e) => setFooterContent({...footerContent, socialLinks: {...footerContent.socialLinks, instagram: e.target.value}})}
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Twitter/X URL</label>
                  <input 
                    className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                    value={footerContent.socialLinks.twitter}
                    onChange={(e) => setFooterContent({...footerContent, socialLinks: {...footerContent.socialLinks, twitter: e.target.value}})}
                    placeholder="https://twitter.com/..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">YouTube URL</label>
                  <input 
                    className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                    value={footerContent.socialLinks.youtube}
                    onChange={(e) => setFooterContent({...footerContent, socialLinks: {...footerContent.socialLinks, youtube: e.target.value}})}
                    placeholder="https://youtube.com/..."
                  />
                </div>
              </div>
              <button 
                onClick={() => saveContent('footer', footerContent)}
                className="bg-[#CD9933] text-white px-8 py-3 rounded-lg font-bold text-sm hover:brightness-110 transition-all"
              >
                {saving ? 'Saving...' : 'Save Footer Content'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Images & Videos Media Manager */}
      {activeContentTab === 'media' && (
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-notoSerif text-3xl font-bold text-primary">Images & Videos Manager</h2>
            <button 
              onClick={() => saveContent('media', mediaContent)}
              disabled={saving}
              className="bg-[#CD9933] text-white px-8 py-3 rounded-lg font-bold text-sm hover:brightness-110 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined">{saving ? 'hourglass_empty' : 'save'}</span>
              {saving ? 'Saving...' : 'Save All Media'}
            </button>
          </div>
          
          <p className="text-on-surface-variant mb-8">Upload and manage images and videos for all pages. Choose between Photo or Video for each item.</p>

          {/* Homepage Media */}
          <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow mb-8">
            <h3 className="font-notoSerif text-xl font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#CD9933]">home</span>
              Homepage Media
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Hero Background Image</label>
                <MediaUpload
                  value={mediaContent.homeHeroImage || ''}
                  onChange={(val) => setMediaContent({...mediaContent, homeHeroImage: val})}
                  label="Hero Image"
                  type="image"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Hero Background Video (Optional)</label>
                <MediaUpload
                  value={mediaContent.homeHeroVideo || ''}
                  onChange={(val) => setMediaContent({...mediaContent, homeHeroVideo: val})}
                  label="Hero Video"
                  type="video"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Why Choose Us Background</label>
                <MediaUpload
                  value={mediaContent.homeWhyChooseBg || ''}
                  onChange={(val) => setMediaContent({...mediaContent, homeWhyChooseBg: val})}
                  label="Background"
                  type="image"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Featured Section Background</label>
                <MediaUpload
                  value={mediaContent.homeFeaturedBg || ''}
                  onChange={(val) => setMediaContent({...mediaContent, homeFeaturedBg: val})}
                  label="Background"
                  type="image"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Testimonials Background</label>
                <MediaUpload
                  value={mediaContent.homeTestimonialsBg || ''}
                  onChange={(val) => setMediaContent({...mediaContent, homeTestimonialsBg: val})}
                  label="Background"
                  type="image"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">CTA Section Background</label>
                <MediaUpload
                  value={mediaContent.homeCtaBg || ''}
                  onChange={(val) => setMediaContent({...mediaContent, homeCtaBg: val})}
                  label="Background"
                  type="image"
                />
              </div>
            </div>
          </div>

          {/* About Page Media */}
          <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow mb-8">
            <h3 className="font-notoSerif text-xl font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#CD9933]">info</span>
              About Page Media
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Hero Image</label>
                <MediaUpload
                  value={mediaContent.aboutHeroImage || ''}
                  onChange={(val) => setMediaContent({...mediaContent, aboutHeroImage: val})}
                  label="Hero Image"
                  type="image"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Story Section Image</label>
                <MediaUpload
                  value={mediaContent.aboutStoryImage || ''}
                  onChange={(val) => setMediaContent({...mediaContent, aboutStoryImage: val})}
                  label="Story Image"
                  type="image"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Promotional Video</label>
                <MediaUpload
                  value={mediaContent.aboutVideo || ''}
                  onChange={(val) => setMediaContent({...mediaContent, aboutVideo: val})}
                  label="Video"
                  type="video"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Stats Section Background</label>
                <MediaUpload
                  value={mediaContent.aboutStatsBg || ''}
                  onChange={(val) => setMediaContent({...mediaContent, aboutStatsBg: val})}
                  label="Background"
                  type="image"
                />
              </div>
            </div>
          </div>

          {/* Contact Page Media */}
          <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow mb-8">
            <h3 className="font-notoSerif text-xl font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#CD9933]">contact_phone</span>
              Contact Page Media
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Hero Image</label>
                <MediaUpload
                  value={mediaContent.contactHeroImage || ''}
                  onChange={(val) => setMediaContent({...mediaContent, contactHeroImage: val})}
                  label="Hero Image"
                  type="image"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Map/Location Image</label>
                <MediaUpload
                  value={mediaContent.contactMapImage || ''}
                  onChange={(val) => setMediaContent({...mediaContent, contactMapImage: val})}
                  label="Map Image"
                  type="image"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">CTA Background</label>
                <MediaUpload
                  value={mediaContent.contactCtaBg || ''}
                  onChange={(val) => setMediaContent({...mediaContent, contactCtaBg: val})}
                  label="Background"
                  type="image"
                />
              </div>
            </div>
          </div>

          {/* Umrah Packages Page Media */}
          <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow mb-8">
            <h3 className="font-notoSerif text-xl font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#CD9933]">mosque</span>
              Umrah Packages Page Media
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Hero Image</label>
                <MediaUpload
                  value={mediaContent.packagesHeroImage || ''}
                  onChange={(val) => setMediaContent({...mediaContent, packagesHeroImage: val})}
                  label="Hero Image"
                  type="image"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Umrah Promotional Video</label>
                <MediaUpload
                  value={mediaContent.packagesVideo || ''}
                  onChange={(val) => setMediaContent({...mediaContent, packagesVideo: val})}
                  label="Video"
                  type="video"
                />
              </div>
            </div>
          </div>

          {/* International Tours Page Media */}
          <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow mb-8">
            <h3 className="font-notoSerif text-xl font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#CD9933]">flight</span>
              International Tours Page Media
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Hero Image</label>
                <MediaUpload
                  value={mediaContent.toursHeroImage || ''}
                  onChange={(val) => setMediaContent({...mediaContent, toursHeroImage: val})}
                  label="Hero Image"
                  type="image"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Promotional Video</label>
                <MediaUpload
                  value={mediaContent.toursVideo || ''}
                  onChange={(val) => setMediaContent({...mediaContent, toursVideo: val})}
                  label="Video"
                  type="video"
                />
              </div>
            </div>
          </div>

          {/* Visa Services Page Media */}
          <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow mb-8">
            <h3 className="font-notoSerif text-xl font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#CD9933]">description</span>
              Visa Services Page Media
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Hero Image</label>
                <MediaUpload
                  value={mediaContent.visaHeroImage || ''}
                  onChange={(val) => setMediaContent({...mediaContent, visaHeroImage: val})}
                  label="Hero Image"
                  type="image"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Background Image</label>
                <MediaUpload
                  value={mediaContent.visaBgImage || ''}
                  onChange={(val) => setMediaContent({...mediaContent, visaBgImage: val})}
                  label="Background"
                  type="image"
                />
              </div>
            </div>
          </div>

          {/* Gallery Page Media */}
          <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow mb-8">
            <h3 className="font-notoSerif text-xl font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#CD9933]">photo_library</span>
              Gallery Page Media
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Hero Image</label>
                <MediaUpload
                  value={mediaContent.galleryHeroImage || ''}
                  onChange={(val) => setMediaContent({...mediaContent, galleryHeroImage: val})}
                  label="Hero Image"
                  type="image"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Banner Image</label>
                <MediaUpload
                  value={mediaContent.galleryBanner || ''}
                  onChange={(val) => setMediaContent({...mediaContent, galleryBanner: val})}
                  label="Banner"
                  type="image"
                />
              </div>
            </div>
          </div>

          {/* FAQ Page Media */}
          <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow mb-8">
            <h3 className="font-notoSerif text-xl font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#CD9933]">quiz</span>
              FAQ Page Media
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Hero Image</label>
                <MediaUpload
                  value={mediaContent.faqHeroImage || ''}
                  onChange={(val) => setMediaContent({...mediaContent, faqHeroImage: val})}
                  label="Hero Image"
                  type="image"
                />
              </div>
            </div>
          </div>

          {/* Blog Page Media */}
          <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow mb-8">
            <h3 className="font-notoSerif text-xl font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#CD9933]">article</span>
              Blog Page Media
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Hero Image</label>
                <MediaUpload
                  value={mediaContent.blogHeroImage || ''}
                  onChange={(val) => setMediaContent({...mediaContent, blogHeroImage: val})}
                  label="Hero Image"
                  type="image"
                />
              </div>
            </div>
          </div>

          {/* Navbar & Misc Media */}
          <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow">
            <h3 className="font-notoSerif text-xl font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#CD9933]">settings</span>
              Navigation & Misc Media
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Navbar Logo</label>
                <MediaUpload
                  value={mediaContent.navbarLogo || ''}
                  onChange={(val) => setMediaContent({...mediaContent, navbarLogo: val})}
                  label="Logo"
                  type="image"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Favicon/Icon</label>
                <MediaUpload
                  value={mediaContent.favicon || ''}
                  onChange={(val) => setMediaContent({...mediaContent, favicon: val})}
                  label="Favicon"
                  type="image"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">WhatsApp FAB Icon</label>
                <MediaUpload
                  value={mediaContent.whatsappIcon || ''}
                  onChange={(val) => setMediaContent({...mediaContent, whatsappIcon: val})}
                  label="Icon"
                  type="image"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Site Settings Component
const SiteSettings = () => {
  const [saving, setSaving] = useState(false)
  
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('site_settings')
    return saved ? JSON.parse(saved) : {
      siteName: 'Royal Umrah & Travels',
      tagline: 'Your Trusted Partner for Umrah & International Tours',
      email: 'info@royalumrahandtravel.com',
      phone: '+92 300 123 4567',
      whatsapp: '+92 300 123 4567',
      address: 'Main Boulevard, Gulberg III, Lahore, Pakistan',
      workingHours: 'Mon - Sat: 9:00 AM - 8:00 PM',
      metaTitle: 'Royal Umrah & Travels - Your Trusted Partner for Umrah & International Tours',
      metaDescription: 'Experience premium Umrah packages and international tours with Royal Umrah & Travels. Approved by Ministry of Hajj & Umrah.',
      metaKeywords: 'umrah, packages, makkah, madinah, hajj, travel, tours, pakistan',
    }
  })

  const saveSettings = () => {
    setSaving(true)
    localStorage.setItem('site_settings', JSON.stringify(settings))
    setTimeout(() => {
      setSaving(false)
      alert('Settings saved successfully!')
    }, 500)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-notoSerif text-3xl font-bold text-primary">Site Settings</h2>
        <button 
          onClick={saveSettings}
          disabled={saving}
          className="bg-[#CD9933] text-white px-8 py-3 rounded-lg font-bold text-sm hover:brightness-110 transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined">{saving ? 'hourglass_empty' : 'save'}</span>
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
      
      <div className="space-y-8">
        {/* General Settings */}
        <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow">
          <h3 className="font-notoSerif text-xl font-bold mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-[#CD9933]">settings</span>
            General Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Site Name</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                value={settings.siteName}
                onChange={(e) => setSettings({...settings, siteName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Tagline</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                value={settings.tagline}
                onChange={(e) => setSettings({...settings, tagline: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow">
          <h3 className="font-notoSerif text-xl font-bold mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-[#CD9933]">contact_phone</span>
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Primary Email</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({...settings, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Phone Number</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                value={settings.phone}
                onChange={(e) => setSettings({...settings, phone: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">WhatsApp Number</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                value={settings.whatsapp}
                onChange={(e) => setSettings({...settings, whatsapp: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Working Hours</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                value={settings.workingHours}
                onChange={(e) => setSettings({...settings, workingHours: e.target.value})}
              />
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Address</label>
            <input 
              className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
              value={settings.address}
              onChange={(e) => setSettings({...settings, address: e.target.value})}
            />
          </div>
        </div>

        {/* SEO Settings */}
        <div className="bg-surface-container-lowest p-8 rounded-xl editorial-shadow">
          <h3 className="font-notoSerif text-xl font-bold mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-[#CD9933]">search</span>
            SEO Settings
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Meta Title</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                value={settings.metaTitle}
                onChange={(e) => setSettings({...settings, metaTitle: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Meta Description</label>
              <textarea 
                className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                rows={3}
                value={settings.metaDescription}
                onChange={(e) => setSettings({...settings, metaDescription: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-2">Meta Keywords</label>
              <input 
                className="w-full bg-surface border border-outline-variant focus:border-[#CD9933] focus:ring-0 py-3 px-4 rounded-lg text-sm"
                value={settings.metaKeywords}
                onChange={(e) => setSettings({...settings, metaKeywords: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-[#CD9933]/10 border border-[#CD9933]/30 p-6 rounded-xl">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[#CD9933]">info</span>
            <div>
              <h4 className="font-bold text-sm mb-1">About Settings</h4>
              <p className="text-xs text-on-surface-variant">
                Settings are saved locally in your browser. For production use with a database, 
                these values can be connected to Supabase or another backend service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard