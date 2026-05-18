import React, { useState, useEffect } from 'react';

const BannerContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNo: '',
    adults: '1',
    childs: '0',
    infants: '0',
    captchaAns: '',
  });

  const [captchaMath, setCaptchaMath] = useState({ num1: 6, num2: 1 });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Generate simple math captcha on load
    setCaptchaMath({
      num1: Math.floor(Math.random() * 5) + 5, // 5 to 9
      num2: Math.floor(Math.random() * 5) + 1, // 1 to 5
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const expectedAns = captchaMath.num1 + captchaMath.num2;
    if (parseInt(formData.captchaAns) !== expectedAns) {
      alert(`Incorrect Captcha! ${captchaMath.num1} + ${captchaMath.num2} = ${expectedAns}`);
      return;
    }
    
    // Simulate submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        contactNo: '',
        adults: '1',
        childs: '0',
        infants: '0',
        captchaAns: '',
      });
      // Regen captcha
      setCaptchaMath({
        num1: Math.floor(Math.random() * 5) + 5,
        num2: Math.floor(Math.random() * 5) + 1,
      });
    }, 3000);
  };

  const inputClass = "bg-[#054143] text-white placeholder-white/60 text-xs px-4 py-3 rounded-md outline-none focus:ring-1 focus:ring-[#CD9933] border border-transparent transition-all w-full";
  const selectClass = "bg-[#054143] text-white text-xs px-4 py-3 rounded-md outline-none focus:ring-1 focus:ring-[#CD9933] border border-transparent transition-all w-full appearance-none cursor-pointer";

  return (
    <div className="w-full max-w-6xl mx-auto drop-shadow-2xl font-manrope">
      <div className="flex flex-col md:flex-row items-end">
        {/* Left Tall Section */}
        <div className="bg-[#013334] w-full md:w-[320px] pt-12 pb-6 px-6 rounded-t-[3rem] md:rounded-bl-[3rem] md:rounded-tr-none relative z-10">
          {/* Mosque Illustration Outline */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-40 opacity-40 pointer-events-none">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 10 C50 10, 45 30, 30 40 C30 40, 20 60, 20 80 L80 80 C80 60, 70 40, 70 40 C55 30, 50 10, 50 10 Z" stroke="#CD9933" strokeWidth="1" />
              <path d="M30 40 L30 80 M70 40 L70 80" stroke="#CD9933" strokeWidth="1" />
              <circle cx="50" cy="50" r="10" stroke="#CD9933" strokeWidth="1" />
              <path d="M10 80 L90 80" stroke="#CD9933" strokeWidth="2" />
            </svg>
          </div>

          <div className="bg-[#0a4648] p-5 rounded-2xl border border-white/5 relative z-10 mt-12 shadow-inner">
            <p className="text-white/80 text-[11px] mb-2 font-semibold">From</p>
            <h4 className="text-white font-bold text-lg leading-tight flex items-center justify-between">
              Toronto Pearson (YYZ)
              <span className="material-symbols-outlined text-[#CD9933] text-lg">flight_takeoff</span>
            </h4>
          </div>
        </div>

        {/* Right Wide Section */}
        <div className="bg-[#013334] flex-1 w-full p-6 md:p-8 rounded-b-[3rem] md:rounded-bl-none md:rounded-r-[3rem] md:rounded-tl-[3rem] relative -mt-6 md:mt-0 md:-ml-8 z-0">
          {submitted ? (
            <div className="h-full flex items-center justify-center p-8">
              <div className="text-center space-y-2">
                <span className="material-symbols-outlined text-[#CD9933] text-4xl">check_circle</span>
                <p className="text-white font-bold tracking-widest uppercase">Request Sent Successfully</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:pl-10">
              {/* Top Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className={inputClass}
                  required
                />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className={inputClass}
                  required
                />
                <input
                  name="contactNo"
                  type="tel"
                  value={formData.contactNo}
                  onChange={handleChange}
                  placeholder="Contact No"
                  className={inputClass}
                  required
                />
              </div>

              {/* Bottom Row */}
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 items-center">
                {/* Adults */}
                <div className="relative">
                  <select name="adults" value={formData.adults} onChange={handleChange} className={selectClass}>
                    <option value="1">1 Adult</option>
                    <option value="2">2 Adults</option>
                    <option value="3">3 Adults</option>
                    <option value="4">4 Adults</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none text-sm">expand_more</span>
                </div>

                {/* Childs */}
                <div className="relative">
                  <select name="childs" value={formData.childs} onChange={handleChange} className={selectClass}>
                    <option value="0">0 Childs</option>
                    <option value="1">1 Child</option>
                    <option value="2">2 Childs</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none text-sm">expand_more</span>
                </div>

                {/* Infants */}
                <div className="relative">
                  <select name="infants" value={formData.infants} onChange={handleChange} className={selectClass}>
                    <option value="0">0 Infants</option>
                    <option value="1">1 Infant</option>
                    <option value="2">2 Infants</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none text-sm">expand_more</span>
                </div>

                {/* Captcha Input */}
                <div className="sm:col-span-1 relative flex items-center bg-[#054143] rounded-md overflow-hidden">
                  <input
                    name="captchaAns"
                    type="number"
                    value={formData.captchaAns}
                    onChange={handleChange}
                    placeholder="Ans*"
                    className="bg-transparent text-white placeholder-white/60 text-xs px-4 py-3 outline-none w-full border-r border-white/10"
                    required
                  />
                  <div className="bg-[#0a4648] px-3 py-3 text-white text-xs font-bold whitespace-nowrap min-w-[50px] text-center">
                    {captchaMath.num1}+{captchaMath.num2}
                  </div>
                </div>

                {/* Send Button */}
                <div className="sm:col-span-2">
                  <button type="submit" className="w-full bg-white text-[#013334] hover:bg-[#CD9933] hover:text-white font-bold text-xs uppercase tracking-widest py-3 px-6 rounded-md transition-all shadow-md flex items-center justify-center gap-2">
                    SEND
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BannerContactForm;
