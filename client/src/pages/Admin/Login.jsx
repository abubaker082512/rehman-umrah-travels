import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@rehmanumrah.com')
  const [password, setPassword] = useState('admin123')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      navigate('/admin/dashboard')
    } catch (err) {
      alert('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#013334]">
      <div className="bg-white p-12 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-notoSerif font-bold text-[#013334] mb-8 text-center">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2">Email</label>
            <input className="w-full border p-3 rounded" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Password</label>
            <input className="w-full border p-3 rounded" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="w-full bg-[#CD9933] text-white p-4 rounded-lg font-bold hover:opacity-90">Login</button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
