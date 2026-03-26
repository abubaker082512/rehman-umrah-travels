import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AdminDashboard = () => {
  const [packages, setPackages] = useState([])
  const [newPackage, setNewPackage] = useState({
    title: '', description: '', price: '', category: 'Economy',
    duration: '', location: '', imageUrl: ''
  })

  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      const res = await axios.get('/api/packages')
      setPackages(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleAddPackage = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/packages', newPackage)
      setNewPackage({ title: '', description: '', price: '', category: 'Economy', duration: '', location: '', imageUrl: '' })
      fetchPackages()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/packages/${id}`)
      fetchPackages()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="p-8 bg-surface-container-low min-h-screen">
      <h1 className="text-3xl font-notoSerif font-bold mb-8">Admin Dashboard - Manage Packages</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-lg mb-12">
        <h2 className="text-xl font-bold mb-4">Add New Package</h2>
        <form onSubmit={handleAddPackage} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="border p-2 rounded" placeholder="Title" value={newPackage.title} onChange={e => setNewPackage({...newPackage, title: e.target.value})} required />
          <input className="border p-2 rounded" placeholder="Price (PKR)" type="number" value={newPackage.price} onChange={e => setNewPackage({...newPackage, price: e.target.value})} required />
          <input className="border p-2 rounded" placeholder="Location" value={newPackage.location} onChange={e => setNewPackage({...newPackage, location: e.target.value})} required />
          <input className="border p-2 rounded" placeholder="Duration" value={newPackage.duration} onChange={e => setNewPackage({...newPackage, duration: e.target.value})} required />
          <select className="border p-2 rounded" value={newPackage.category} onChange={e => setNewPackage({...newPackage, category: e.target.value})}>
            <option>Economy</option>
            <option>3 Star</option>
            <option>4 Star</option>
            <option>5 Star</option>
          </select>
          <input className="border p-2 rounded" placeholder="Image URL" value={newPackage.imageUrl} onChange={e => setNewPackage({...newPackage, imageUrl: e.target.value})} />
          <textarea className="border p-2 rounded md:col-span-2" placeholder="Description" value={newPackage.description} onChange={e => setNewPackage({...newPackage, description: e.target.value})} required />
          <button type="submit" className="bg-primary text-white p-3 rounded font-bold hover:bg-[#002c2e]">Add Package</button>
        </form>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {packages.map(pkg => (
          <div key={pkg.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
            <div>
              <h3 className="font-bold">{pkg.title}</h3>
              <p className="text-sm text-outline">{pkg.category} • PKR {pkg.price}</p>
            </div>
            <button onClick={() => handleDelete(pkg.id)} className="bg-red-500 text-white px-4 py-2 rounded text-sm">Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard
