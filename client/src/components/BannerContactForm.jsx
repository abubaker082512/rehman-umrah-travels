import React, { useState, useEffect } from 'react';

const AIRPORTS = [
  // Pakistan
  { code: 'LHE', name: 'Allama Iqbal Intl Airport', city: 'Lahore', country: 'Pakistan' },
  { code: 'KHI', name: 'Jinnah Intl Airport', city: 'Karachi', country: 'Pakistan' },
  { code: 'ISB', name: 'Islamabad Intl Airport', city: 'Islamabad', country: 'Pakistan' },
  { code: 'PEW', name: 'Bacha Khan Intl Airport', city: 'Peshawar', country: 'Pakistan' },
  { code: 'MUX', name: 'Multan Intl Airport', city: 'Multan', country: 'Pakistan' },
  { code: 'SKT', name: 'Sialkot Intl Airport', city: 'Sialkot', country: 'Pakistan' },
  { code: 'LYP', name: 'Faisalabad Intl Airport', city: 'Faisalabad', country: 'Pakistan' },
  { code: 'UET', name: 'Quetta Intl Airport', city: 'Quetta', country: 'Pakistan' },
  { code: 'HDD', name: 'Hyderabad Airport', city: 'Hyderabad', country: 'Pakistan' },
  { code: 'SUG', name: 'Sukkur Airport', city: 'Sukkur', country: 'Pakistan' },
  { code: 'GWD', name: 'Gwadar Intl Airport', city: 'Gwadar', country: 'Pakistan' },
  { code: 'GIL', name: 'Gilgit Airport', city: 'Gilgit', country: 'Pakistan' },
  { code: 'KDU', name: 'Skardu Airport', city: 'Skardu', country: 'Pakistan' },

  // Saudi Arabia
  { code: 'JED', name: 'King Abdulaziz Intl Airport', city: 'Jeddah', country: 'Saudi Arabia' },
  { code: 'MED', name: 'Prince Mohammad bin Abdulaziz Airport', city: 'Medina', country: 'Saudi Arabia' },
  { code: 'RUH', name: 'King Khalid Intl Airport', city: 'Riyadh', country: 'Saudi Arabia' },
  { code: 'DMM', name: 'King Fahd Intl Airport', city: 'Dammam', country: 'Saudi Arabia' },
  { code: 'AHB', name: 'Abha Regional Airport', city: 'Abha', country: 'Saudi Arabia' },
  { code: 'GAT', name: 'Gassim Regional Airport', city: 'Gassim', country: 'Saudi Arabia' },
  { code: 'TIF', name: 'Taif Regional Airport', city: 'Taif', country: 'Saudi Arabia' },

  // United Arab Emirates
  { code: 'DXB', name: 'Dubai Intl Airport', city: 'Dubai', country: 'UAE' },
  { code: 'AUH', name: 'Zayed Intl Airport', city: 'Abu Dhabi', country: 'UAE' },
  { code: 'SHJ', name: 'Sharjah Intl Airport', city: 'Sharjah', country: 'UAE' },
  { code: 'DWC', name: 'Al Maktoum Intl Airport', city: 'Dubai World Central', country: 'UAE' },

  // Middle East
  { code: 'DOH', name: 'Hamad Intl Airport', city: 'Doha', country: 'Qatar' },
  { code: 'MCT', name: 'Muscat Intl Airport', city: 'Muscat', country: 'Oman' },
  { code: 'KWI', name: 'Kuwait Intl Airport', city: 'Kuwait City', country: 'Kuwait' },
  { code: 'BAH', name: 'Bahrain Intl Airport', city: 'Manama', country: 'Bahrain' },
  { code: 'AMM', name: 'Queen Alia Intl Airport', city: 'Amman', country: 'Jordan' },
  { code: 'BEY', name: 'Beirut-Rafic Hariri Airport', city: 'Beirut', country: 'Lebanon' },

  // United Kingdom
  { code: 'LHR', name: 'Heathrow Airport', city: 'London', country: 'United Kingdom' },
  { code: 'LGW', name: 'Gatwick Airport', city: 'London', country: 'United Kingdom' },
  { code: 'MAN', name: 'Manchester Airport', city: 'Manchester', country: 'United Kingdom' },
  { code: 'BHX', name: 'Birmingham Airport', city: 'Birmingham', country: 'United Kingdom' },
  { code: 'LTN', name: 'Luton Airport', city: 'London', country: 'United Kingdom' },
  { code: 'STN', name: 'Stansted Airport', city: 'London', country: 'United Kingdom' },
  { code: 'EDI', name: 'Edinburgh Airport', city: 'Edinburgh', country: 'United Kingdom' },
  { code: 'GLA', name: 'Glasgow Airport', city: 'Glasgow', country: 'United Kingdom' },

  // Canada
  { code: 'YYZ', name: 'Toronto Pearson Intl Airport', city: 'Toronto', country: 'Canada' },
  { code: 'YVR', name: 'Vancouver Intl Airport', city: 'Vancouver', country: 'Canada' },
  { code: 'YUL', name: 'Montréal-Trudeau Intl Airport', city: 'Montreal', country: 'Canada' },
  { code: 'YYC', name: 'Calgary Intl Airport', city: 'Calgary', country: 'Canada' },
  { code: 'YEG', name: 'Edmonton Intl Airport', city: 'Edmonton', country: 'Canada' },
  { code: 'YOW', name: 'Ottawa Macdonald-Cartier Intl Airport', city: 'Ottawa', country: 'Canada' },

  // United States
  { code: 'JFK', name: 'John F. Kennedy Intl Airport', city: 'New York', country: 'USA' },
  { code: 'LGA', name: 'LaGuardia Airport', city: 'New York', country: 'USA' },
  { code: 'EWR', name: 'Newark Liberty Intl Airport', city: 'Newark/New York', country: 'USA' },
  { code: 'LAX', name: 'Los Angeles Intl Airport', city: 'Los Angeles', country: 'USA' },
  { code: 'ORD', name: 'O\'Hare Intl Airport', city: 'Chicago', country: 'USA' },
  { code: 'DFW', name: 'Dallas/Fort Worth Intl Airport', city: 'Dallas', country: 'USA' },
  { code: 'ATL', name: 'Hartsfield-Jackson Atlanta Airport', city: 'Atlanta', country: 'USA' },
  { code: 'SFO', name: 'San Francisco Intl Airport', city: 'San Francisco', country: 'USA' },
  { code: 'SEA', name: 'Seattle-Tacoma Intl Airport', city: 'Seattle', country: 'USA' },
  { code: 'IAD', name: 'Washington Dulles Intl Airport', city: 'Washington D.C.', country: 'USA' },
  { code: 'MIA', name: 'Miami Intl Airport', city: 'Miami', country: 'USA' },
  { code: 'BOS', name: 'Logan Intl Airport', city: 'Boston', country: 'USA' },
  { code: 'IAH', name: 'George Bush Intercontinental Airport', city: 'Houston', country: 'USA' },

  // Europe
  { code: 'IST', name: 'Istanbul Airport', city: 'Istanbul', country: 'Turkey' },
  { code: 'SAW', name: 'Sabiha Gökçen Intl Airport', city: 'Istanbul', country: 'Turkey' },
  { code: 'ESB', name: 'Esenboğa Airport', city: 'Ankara', country: 'Turkey' },
  { code: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France' },
  { code: 'ORY', name: 'Orly Airport', city: 'Paris', country: 'France' },
  { code: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany' },
  { code: 'MUC', name: 'Munich Airport', city: 'Munich', country: 'Germany' },
  { code: 'AMS', name: 'Schiphol Airport', city: 'Amsterdam', country: 'Netherlands' },
  { code: 'MAD', name: 'Adolfo Suárez Madrid-Barajas Airport', city: 'Madrid', country: 'Spain' },
  { code: 'BCN', name: 'Barcelona-El Prat Airport', city: 'Barcelona', country: 'Spain' },
  { code: 'FCO', name: 'Leonardo da Vinci-Fiumicino Airport', city: 'Rome', country: 'Italy' },
  { code: 'MXP', name: 'Malpensa Airport', city: 'Milan', country: 'Italy' },
  { code: 'ZRH', name: 'Zurich Airport', city: 'Zurich', country: 'Switzerland' },
  { code: 'VIE', name: 'Vienna Intl Airport', city: 'Vienna', country: 'Austria' },
  { code: 'BRU', name: 'Brussels Airport', city: 'Brussels', country: 'Belgium' },
  { code: 'ATH', name: 'Athens Intl Airport', city: 'Athens', country: 'Greece' },
  { code: 'LIS', name: 'Humberto Delgado Airport', city: 'Lisbon', country: 'Portugal' },

  // Asia & Oceania
  { code: 'SIN', name: 'Changi Airport', city: 'Singapore', country: 'Singapore' },
  { code: 'KUL', name: 'Kuala Lumpur Intl Airport', city: 'Kuala Lumpur', country: 'Malaysia' },
  { code: 'BKK', name: 'Suvarnabhumi Airport', city: 'Bangkok', country: 'Thailand' },
  { code: 'DEL', name: 'Indira Gandhi Intl Airport', city: 'Delhi', country: 'India' },
  { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj Intl Airport', city: 'Mumbai', country: 'India' },
  { code: 'DAC', name: 'Hazrat Shahjalal Intl Airport', city: 'Dhaka', country: 'Bangladesh' },
  { code: 'CMB', name: 'Bandaranaike Intl Airport', city: 'Colombo', country: 'Sri Lanka' },
  { code: 'SYD', name: 'Kingsford Smith Airport', city: 'Sydney', country: 'Australia' },
  { code: 'MEL', name: 'Melbourne Airport', city: 'Melbourne', country: 'Australia' },
  { code: 'HND', name: 'Haneda Airport', city: 'Tokyo', country: 'Japan' },
  { code: 'NRT', name: 'Narita Intl Airport', city: 'Tokyo', country: 'Japan' },
  { code: 'ICN', name: 'Incheon Intl Airport', city: 'Seoul', country: 'South Korea' },
  { code: 'HKG', name: 'Hong Kong Intl Airport', city: 'Hong Kong', country: 'Hong Kong' },
  { code: 'PEK', name: 'Beijing Capital Intl Airport', city: 'Beijing', country: 'China' },
  { code: 'PVG', name: 'Pudong Intl Airport', city: 'Shanghai', country: 'China' },
  { code: 'CAN', name: 'Baiyun Intl Airport', city: 'Guangzhou', country: 'China' },
  { code: 'CGK', name: 'Soekarno-Hatta Intl Airport', city: 'Jakarta', country: 'Indonesia' },
  { code: 'MNL', name: 'Ninoy Aquino Intl Airport', city: 'Manila', country: 'Philippines' },

  // Africa
  { code: 'CAI', name: 'Cairo Intl Airport', city: 'Cairo', country: 'Egypt' },
  { code: 'JNB', name: 'O.R. Tambo Intl Airport', city: 'Johannesburg', country: 'South Africa' },
  { code: 'CPT', name: 'Cape Town Intl Airport', city: 'Cape Town', country: 'South Africa' },
  { code: 'CMN', name: 'Mohammed V Intl Airport', city: 'Casablanca', country: 'Morocco' },
  { code: 'NBO', name: 'Jomo Kenyatta Intl Airport', city: 'Nairobi', country: 'Kenya' }
];

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

  const [searchQuery, setSearchQuery] = useState('Lahore (LHE)');
  const [selectedAirport, setSelectedAirport] = useState({
    code: 'LHE',
    name: 'Allama Iqbal Intl Airport',
    city: 'Lahore',
    country: 'Pakistan'
  });
  const [showAirportDropdown, setShowAirportDropdown] = useState(false);

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
      setSearchQuery('Lahore (LHE)');
      setSelectedAirport({
        code: 'LHE',
        name: 'Allama Iqbal Intl Airport',
        city: 'Lahore',
        country: 'Pakistan'
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

  // Filter airports matching searchQuery
  const filteredAirports = searchQuery.trim() === '' || searchQuery === `${selectedAirport?.city} (${selectedAirport?.code})`
    ? AIRPORTS
    : AIRPORTS.filter(ap => 
        ap.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ap.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ap.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ap.country.toLowerCase().includes(searchQuery.toLowerCase())
      );

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

          <div className="bg-[#0a4648] p-5 rounded-2xl border border-white/5 relative z-20 mt-12 shadow-inner text-left">
            <p className="text-white/80 text-[11px] mb-2 font-semibold">From</p>
            <div className="relative">
              <input
                type="text"
                className="bg-transparent text-white font-bold text-base w-full outline-none pr-8 cursor-text border-b border-white/10 focus:border-[#CD9933] pb-1 transition-all"
                placeholder="Search Airport..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowAirportDropdown(true);
                }}
                onFocus={() => setShowAirportDropdown(true)}
                onBlur={() => setTimeout(() => setShowAirportDropdown(false), 200)}
              />
              <span className="material-symbols-outlined text-[#CD9933] text-lg absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">flight_takeoff</span>
            </div>
            <div className="text-white/40 text-[10px] mt-1 font-manrope truncate">
              {selectedAirport ? `${selectedAirport.name}, ${selectedAirport.country}` : 'Select departure airport'}
            </div>

            {showAirportDropdown && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-[#013334] border border-white/15 rounded-lg max-h-48 overflow-y-auto z-[99] shadow-2xl scrollbar-none">
                {filteredAirports.slice(0, 20).map(ap => (
                  <div
                    key={ap.code}
                    className="p-3 hover:bg-[#0a4648] cursor-pointer text-white text-xs border-b border-white/5 transition-colors"
                    onMouseDown={() => {
                      setSelectedAirport(ap);
                      setSearchQuery(`${ap.city} (${ap.code})`);
                      setShowAirportDropdown(false);
                    }}
                  >
                    <div className="font-bold text-white">{ap.city} ({ap.code})</div>
                    <div className="text-white/60 text-[10px] truncate">{ap.name}, {ap.country}</div>
                  </div>
                ))}
                {filteredAirports.length === 0 && (
                  <div className="p-3 text-white/50 text-xs italic">No airports found</div>
                )}
              </div>
            )}
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
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1} className="bg-[#013334]">
                        {i + 1} {i + 1 === 1 ? 'Adult' : 'Adults'}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none text-sm">expand_more</span>
                </div>

                {/* Childs */}
                <div className="relative">
                  <select name="childs" value={formData.childs} onChange={handleChange} className={selectClass}>
                    {[...Array(11)].map((_, i) => (
                      <option key={i} value={i} className="bg-[#013334]">
                        {i} {i === 1 ? 'Child' : 'Childs'}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none text-sm">expand_more</span>
                </div>

                {/* Infants */}
                <div className="relative">
                  <select name="infants" value={formData.infants} onChange={handleChange} className={selectClass}>
                    {[...Array(11)].map((_, i) => (
                      <option key={i} value={i} className="bg-[#013334]">
                        {i} {i === 1 ? 'Infant' : 'Infants'}
                      </option>
                    ))}
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
