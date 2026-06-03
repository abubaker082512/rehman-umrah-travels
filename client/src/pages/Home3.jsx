import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import logo from '../assets/Rehman Travel Logo.png'
import background3 from '../assets/home-3.jpg'
import kaabaPackages from '../assets/kaaba_packages.png'
import toursScenic from '../assets/tours_scenic.png'
import travelCollage from '../assets/hajj_umrah_travel_collage.png'
import aboutImage from '../assets/about-us.jpg'
import sabaKhanImg from '../assets/testimonials/saba_khan.png'
import ahmedRazaImg from '../assets/testimonials/ahmed_raza.png'
import zubairMalikImg from '../assets/testimonials/zubair_malik.png'
import tehminaHassanImg from '../assets/testimonials/tehmina_hassan.png'
import mohammadAliImg from '../assets/testimonials/mohammad_ali.png'
import ayeshaSiddiquiImg from '../assets/testimonials/ayesha_siddiqui.png'
import economyPackagesImg from '../assets/economy_packages.png'
import star3PackagesImg from '../assets/star3_packages.png'
import star4PackagesImg from '../assets/star4_packages.png'
import star5PackagesImg from '../assets/star5_packages.png'
import internationalToursImg from '../assets/international_tours.png'
import localToursImg from '../assets/local_tours.png'
import BannerContactForm from '../components/BannerContactForm'
import ScrollReveal from '../components/ScrollReveal'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const API_BASE = import.meta.env.VITE_API_URL || ''

// High-fidelity fallback package data matching screen_user.png layout in Royal color scheme
const staticInternationalTours = [
  {
    id: 101,
    title: 'DUBAI TOUR - NEW YEAR CELEBRATION 2025',
    price: 145000,
    duration: '5 Days 4 Nights',
    badge: 'FOR 2 PERSONS - $1500',
    description: 'Ring in the New Year with stunning fireworks at Burj Khalifa, desert safaris, and premium city cruises in luxury.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80'
  },
  {
    id: 102,
    title: 'TURKEY ELEGANCE - CAPPADOCIA & ISTANBUL',
    price: 210000,
    duration: '7 Days 6 Nights',
    badge: 'FOR 1 PERSON - $1100',
    description: 'Witness hot air balloons over fairy chimneys, explore Hagia Sophia, and cruise the majestic Bosphorus Strait.',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80'
  },
  {
    id: 103,
    title: 'EXPLORE MALAYSIA - KUALA LUMPUR & LANGKAWI',
    price: 135000,
    duration: '6 Days 5 Nights',
    badge: 'FOR 2 PERSONS - $1300',
    description: 'Ascend the Petronas Twin Towers, relax on sandy beaches in Langkawi, and experience rich cultural heritage.',
    image: 'https://images.unsplash.com/photo-1596422748573-cbb5bf090104?w=800&q=80'
  },
  {
    id: 104,
    title: 'THAILAND SPLENDOR - BANGKOK & PHUKET',
    price: 155000,
    duration: '6 Days 5 Nights',
    badge: 'FOR 2 PERSONS - $1400',
    description: 'Explore vibrant street life and ornate shrines in Bangkok, then relax on the sandy beaches of Phuket.',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80'
  }
]

const staticLocalTours = [
  {
    id: 201,
    title: 'SWAT VALLEY SPIRIT - THE EAST SWITZERLAND',
    price: 45000,
    duration: '3 Days 2 Nights',
    badge: 'FOR 1 PERSON - $250',
    description: 'Unwind alongside pristine streams, visit historical Buddhist sites, and enjoy the snow-capped views of Malam Jabba.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80'
  },
  {
    id: 202,
    title: 'NARAN & KAGHAN VALLEY SUMMER ESCAPE',
    price: 55000,
    duration: '4 Days 3 Nights',
    badge: 'FOR 2 PERSONS - $400',
    description: 'Journey to the breathtaking Lake Saif-ul-Muluk, cross Babusar Top, and rest by the sparkling Kunhar River.',
    image: 'https://images.unsplash.com/photo-1502602892935-72c3ac7c352?w=800&q=80'
  },
  {
    id: 203,
    title: 'NEELUM VALLEY KASHMIR HEAVENLY SERENITY',
    price: 50000,
    duration: '4 Days 3 Nights',
    badge: 'FOR 1 PERSON - $300',
    description: 'Explore lush green meadows, crystalline blue lakes, and historical forts in the heart of Azad Jammu & Kashmir.',
    image: 'https://images.unsplash.com/photo-1473163928189-394b13469e19?w=800&q=80'
  }
]

// ── Low Budget / Economy Umrah Packages ──────────────────────────────────────
const staticEconomyPackages = [
  { id: 401, title: '21 Nights Saver Economy Umrah', location: 'Fundaq Mayer Mayassar', price: 209500, duration: '21 Days', badge: 'ECONOMY', badgeColor: 'bg-[#013334]', image: 'https://images.unsplash.com/photo-1591604129909-2b4ce4e6e6d2?w=800&q=80' },
  { id: 402, title: '21 Nights Comfort Economy Saver', location: 'Jedat Al Khalil', price: 224500, duration: '21 Days', badge: 'ECONOMY', badgeColor: 'bg-[#013334]', image: 'https://images.unsplash.com/photo-1564769662533-3f5aae93cec2?w=800&q=80' },
  { id: 403, title: '21 Nights Johra Special Economy', location: 'Johra Majad Hotel', price: 229500, duration: '21 Days', badge: 'ECONOMY', badgeColor: 'bg-[#013334]', image: 'https://images.unsplash.com/photo-1580338834642-8a3acf79b1b8?w=800&q=80' },
  { id: 404, title: '21 Nights Ajyad Standard Economy', location: 'Al Juhani Ajyad Hotel', price: 235500, duration: '21 Days', badge: 'ECONOMY', badgeColor: 'bg-[#013334]', image: 'https://images.unsplash.com/photo-1596435688717-2d2f3b0fc47a?w=800&q=80' },
  { id: 405, title: '21 Nights Extended Special Economy', location: 'Mather Al Jewar', price: 251500, duration: '21 Days', badge: 'ECONOMY', badgeColor: 'bg-[#013334]', image: 'https://images.unsplash.com/photo-1518655044366-5c5abf0cf1f4?w=800&q=80' },
  { id: 406, title: '15 Nights Economy Saver Deal', location: 'Fundaq Mayer Mayassar', price: 189500, duration: '15 Days', badge: 'ECONOMY', badgeColor: 'bg-[#013334]', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d8?w=800&q=80' },
  { id: 407, title: '15 Nights Comfort Economy Package', location: 'Jedat Al Khalil', price: 199500, duration: '15 Days', badge: 'ECONOMY', badgeColor: 'bg-[#013334]', image: 'https://images.unsplash.com/photo-1591604129909-2b4ce4e6e6d2?w=800&q=80' },
  { id: 408, title: '15 Nights Johra Standard Deal', location: 'Johra Majad Hotel', price: 204500, duration: '15 Days', badge: 'ECONOMY', badgeColor: 'bg-[#013334]', image: 'https://images.unsplash.com/photo-1564769662533-3f5aae93cec2?w=800&q=80' },
  { id: 409, title: '15 Nights Ajyad Budget Choice', location: 'Al Juhani Ajyad Hotel', price: 209500, duration: '15 Days', badge: 'ECONOMY', badgeColor: 'bg-[#013334]', image: 'https://images.unsplash.com/photo-1580338834642-8a3acf79b1b8?w=800&q=80' },
  { id: 410, title: '10 Nights Economy Quick Saver', location: 'Fundaq Mayer Mayassar', price: 159500, duration: '10 Days', badge: 'ECONOMY', badgeColor: 'bg-[#013334]', image: 'https://images.unsplash.com/photo-1596435688717-2d2f3b0fc47a?w=800&q=80' },
  { id: 411, title: '10 Nights Comfort Economy Quick', location: 'Jedat Al Khalil', price: 169500, duration: '10 Days', badge: 'ECONOMY', badgeColor: 'bg-[#013334]', image: 'https://images.unsplash.com/photo-1518655044366-5c5abf0cf1f4?w=800&q=80' },
  { id: 412, title: '10 Nights Budget Extended Choice', location: 'Johra Majad Hotel', price: 174500, duration: '10 Days', badge: 'ECONOMY', badgeColor: 'bg-[#013334]', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d8?w=800&q=80' },
]

// ── Ground Umrah Packages — 3 Star ───────────────────────────────────────────
const staticStar3Packages = [
  { id: 501, title: '14 Nights 3 Star Comfort Umrah', location: 'Al Aseel Ajyad', price: 245500, duration: '14 Nights', badge: '3 STAR', badgeColor: 'bg-[#CD9933]', image: 'https://images.unsplash.com/photo-1591604129909-2b4ce4e6e6d2?w=800&q=80' },
  { id: 502, title: '12 Nights 3 Star Standard Package', location: 'Dar El Eiman Al Khalil', price: 235500, duration: '12 Nights', badge: '3 STAR', badgeColor: 'bg-[#CD9933]', image: 'https://images.unsplash.com/photo-1564769662533-3f5aae93cec2?w=800&q=80' },
  { id: 503, title: '10 Nights 3 Star Comfort Deal', location: 'Dorat Dar El Eiman', price: 225500, duration: '10 Nights', badge: '3 STAR', badgeColor: 'bg-[#CD9933]', image: 'https://images.unsplash.com/photo-1580338834642-8a3acf79b1b8?w=800&q=80' },
  { id: 504, title: '7 Nights 3 Star Express Package', location: 'Al Thuria Hotel', price: 215500, duration: '7 Nights', badge: '3 STAR', badgeColor: 'bg-[#CD9933]', image: 'https://images.unsplash.com/photo-1596435688717-2d2f3b0fc47a?w=800&q=80' },
  { id: 505, title: '14 Nights 3 Star Premium Ground', location: 'Dar El Eiman Al Khalil', price: 254000, duration: '14 Nights', badge: '3 STAR', badgeColor: 'bg-[#CD9933]', image: 'https://images.unsplash.com/photo-1518655044366-5c5abf0cf1f4?w=800&q=80' },
  { id: 506, title: '14 Nights 3 Star Comfort Saver', location: 'Al Aseel Ajyad', price: 239500, duration: '14 Nights', badge: '3 STAR', badgeColor: 'bg-[#CD9933]', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d8?w=800&q=80' },
  { id: 507, title: '12 Nights 3 Star Saver Choice', location: 'Dorat Dar El Eiman', price: 229500, duration: '12 Nights', badge: '3 STAR', badgeColor: 'bg-[#CD9933]', image: 'https://images.unsplash.com/photo-1591604129909-2b4ce4e6e6d2?w=800&q=80' },
  { id: 508, title: '12 Nights 3 Star Comfort Plus', location: 'Al Thuria Hotel', price: 242500, duration: '12 Nights', badge: '3 STAR', badgeColor: 'bg-[#CD9933]', image: 'https://images.unsplash.com/photo-1564769662533-3f5aae93cec2?w=800&q=80' },
  { id: 509, title: '10 Nights 3 Star Premium Package', location: 'Dar El Eiman Al Khalil', price: 232500, duration: '10 Nights', badge: '3 STAR', badgeColor: 'bg-[#CD9933]', image: 'https://images.unsplash.com/photo-1580338834642-8a3acf79b1b8?w=800&q=80' },
  { id: 510, title: '10 Nights 3 Star Budget Standard', location: 'Al Aseel Ajyad', price: 219500, duration: '10 Nights', badge: '3 STAR', badgeColor: 'bg-[#CD9933]', image: 'https://images.unsplash.com/photo-1596435688717-2d2f3b0fc47a?w=800&q=80' },
  { id: 511, title: '7 Nights 3 Star Comfort Saver', location: 'Dorat Dar El Eiman', price: 211500, duration: '7 Nights', badge: '3 STAR', badgeColor: 'bg-[#CD9933]', image: 'https://images.unsplash.com/photo-1518655044366-5c5abf0cf1f4?w=800&q=80' },
  { id: 512, title: '7 Nights 3 Star Deluxe Ground', location: 'Al Thuria Hotel', price: 222500, duration: '7 Nights', badge: '3 STAR', badgeColor: 'bg-[#CD9933]', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d8?w=800&q=80' },
]

// ── Ground Umrah Packages — 4 Star ───────────────────────────────────────────
const staticStar4Packages = [
  { id: 601, title: '14 Nights 4 Star Premium Umrah', location: 'Ramada Dar Al Faiyzeen', price: 284000, duration: '14 Nights', badge: '4 STAR', badgeColor: 'bg-[#013334]', image: 'https://images.unsplash.com/photo-1591604129909-2b4ce4e6e6d2?w=800&q=80' },
  { id: 602, title: '12 Nights 4 Star Executive Umrah', location: 'Nawazi Watheer', price: 278000, duration: '12 Nights', badge: '4 STAR', badgeColor: 'bg-[#013334]', image: 'https://images.unsplash.com/photo-1564769662533-3f5aae93cec2?w=800&q=80' },
  { id: 603, title: '10 Nights 4 Star Comfort Deal', location: 'Dar El Eiman Grand', price: 267500, duration: '10 Nights', badge: '4 STAR', badgeColor: 'bg-[#013334]', image: 'https://images.unsplash.com/photo-1580338834642-8a3acf79b1b8?w=800&q=80' },
  { id: 604, title: '7 Nights 4 Star Express Package', location: 'Amjad Al Diyafah', price: 255000, duration: '7 Nights', badge: '4 STAR', badgeColor: 'bg-[#013334]', image: 'https://images.unsplash.com/photo-1596435688717-2d2f3b0fc47a?w=800&q=80' },
  { id: 605, title: '14 Nights 4 Star Deluxe Ground', location: 'Nawazi Watheer', price: 295000, duration: '14 Nights', badge: '4 STAR', badgeColor: 'bg-[#013334]', image: 'https://images.unsplash.com/photo-1518655044366-5c5abf0cf1f4?w=800&q=80' },
  { id: 606, title: '14 Nights 4 Star Executive Saver', location: 'Ramada Dar Al Faiyzeen', price: 275000, duration: '14 Nights', badge: '4 STAR', badgeColor: 'bg-[#013334]', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d8?w=800&q=80' },
  { id: 607, title: '12 Nights 4 Star Saver Choice', location: 'Dar El Eiman Grand', price: 265000, duration: '12 Nights', badge: '4 STAR', badgeColor: 'bg-[#013334]', image: 'https://images.unsplash.com/photo-1591604129909-2b4ce4e6e6d2?w=800&q=80' },
  { id: 608, title: '12 Nights 4 Star Comfort Plus', location: 'Amjad Al Diyafah', price: 272500, duration: '12 Nights', badge: '4 STAR', badgeColor: 'bg-[#013334]', image: 'https://images.unsplash.com/photo-1564769662533-3f5aae93cec2?w=800&q=80' },
  { id: 609, title: '10 Nights 4 Star Premium Package', location: 'Nawazi Watheer', price: 259500, duration: '10 Nights', badge: '4 STAR', badgeColor: 'bg-[#013334]', image: 'https://images.unsplash.com/photo-1580338834642-8a3acf79b1b8?w=800&q=80' },
  { id: 610, title: '10 Nights 4 Star Budget Standard', location: 'Ramada Dar Al Faiyzeen', price: 249500, duration: '10 Nights', badge: '4 STAR', badgeColor: 'bg-[#013334]', image: 'https://images.unsplash.com/photo-1596435688717-2d2f3b0fc47a?w=800&q=80' },
  { id: 611, title: '7 Nights 4 Star Comfort Saver', location: 'Dar El Eiman Grand', price: 241500, duration: '7 Nights', badge: '4 STAR', badgeColor: 'bg-[#013334]', image: 'https://images.unsplash.com/photo-1518655044366-5c5abf0cf1f4?w=800&q=80' },
  { id: 612, title: '7 Nights 4 Star Deluxe Ground', location: 'Nawazi Watheer', price: 248500, duration: '7 Nights', badge: '4 STAR', badgeColor: 'bg-[#013334]', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d8?w=800&q=80' },
]

// ── Ground Umrah Packages — 5 Star ───────────────────────────────────────────
const staticStar5Packages = [
  { id: 701, title: '14 Nights 5 Star Cheap Luxury', location: 'Holiday Inn Makkah', price: 289500, duration: '14 Nights', badge: '5 STAR', badgeColor: 'bg-[#CD9933]', image: 'https://images.unsplash.com/photo-1591604129909-2b4ce4e6e6d2?w=800&q=80' },
  { id: 702, title: '12 Nights 5 Star Royal Package', location: 'Hyatt Regency', price: 279500, duration: '12 Nights', badge: '5 STAR', badgeColor: 'bg-[#CD9933]', image: 'https://images.unsplash.com/photo-1564769662533-3f5aae93cec2?w=800&q=80' },
  { id: 703, title: '10 Nights 5 Star Executive Stay', location: 'Anjum Hotel', price: 269500, duration: '10 Nights', badge: '5 STAR', badgeColor: 'bg-[#CD9933]', image: 'https://images.unsplash.com/photo-1580338834642-8a3acf79b1b8?w=800&q=80' },
  { id: 704, title: '7 Nights 5 Star Express Luxury', location: 'Al Shohada Makkah', price: 235500, duration: '7 Nights', badge: '5 STAR', badgeColor: 'bg-[#CD9933]', image: 'https://images.unsplash.com/photo-1596435688717-2d2f3b0fc47a?w=800&q=80' },
  { id: 705, title: '14 Nights 5 Star VIP Splendor', location: 'Hyatt Regency', price: 315000, duration: '14 Nights', badge: '5 STAR', badgeColor: 'bg-[#CD9933]', image: 'https://images.unsplash.com/photo-1518655044366-5c5abf0cf1f4?w=800&q=80' },
  { id: 706, title: '14 Nights 5 Star Luxury Saver', location: 'Holiday Inn Makkah', price: 295000, duration: '14 Nights', badge: '5 STAR', badgeColor: 'bg-[#CD9933]', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d8?w=800&q=80' },
  { id: 707, title: '12 Nights 5 Star Saver Choice', location: 'Anjum Hotel', price: 285000, duration: '12 Nights', badge: '5 STAR', badgeColor: 'bg-[#CD9933]', image: 'https://images.unsplash.com/photo-1591604129909-2b4ce4e6e6d2?w=800&q=80' },
  { id: 708, title: '12 Nights 5 Star Royal Plus', location: 'Al Shohada Makkah', price: 292500, duration: '12 Nights', badge: '5 STAR', badgeColor: 'bg-[#CD9933]', image: 'https://images.unsplash.com/photo-1564769662533-3f5aae93cec2?w=800&q=80' },
  { id: 709, title: '10 Nights 5 Star Premium Package', location: 'Hyatt Regency', price: 279500, duration: '10 Nights', badge: '5 STAR', badgeColor: 'bg-[#CD9933]', image: 'https://images.unsplash.com/photo-1580338834642-8a3acf79b1b8?w=800&q=80' },
  { id: 710, title: '10 Nights 5 Star Budget Luxury', location: 'Holiday Inn Makkah', price: 259500, duration: '10 Nights', badge: '5 STAR', badgeColor: 'bg-[#CD9933]', image: 'https://images.unsplash.com/photo-1596435688717-2d2f3b0fc47a?w=800&q=80' },
  { id: 711, title: '7 Nights 5 Star Comfort Saver', location: 'Anjum Hotel', price: 249500, duration: '7 Nights', badge: '5 STAR', badgeColor: 'bg-[#CD9933]', image: 'https://images.unsplash.com/photo-1518655044366-5c5abf0cf1f4?w=800&q=80' },
  { id: 712, title: '7 Nights 5 Star Royal Ground', location: 'Hyatt Regency', price: 257500, duration: '7 Nights', badge: '5 STAR', badgeColor: 'bg-[#CD9933]', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d8?w=800&q=80' },
]

const GoldLogoIcon = () => (
  <svg className="w-12 h-12 text-[#CD9933]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" stroke="#CD9933" strokeWidth="1.5" />
    <circle cx="50" cy="50" r="41" stroke="#CD9933" strokeWidth="0.5" strokeDasharray="3 3" />
    {/* Crescent Moon */}
    <path d="M50 14C59.9412 14 68 22.0588 68 32C68 40.5 61.5 47.5 53 49.5C60.5 48.5 65 42 65 35C65 26.7157 58.2843 20 50 20C46.5 20 43 21 40.5 22.5C43.5 17 46.5 14 50 14Z" fill="#CD9933" />
    {/* Mosque Minarets and Dome */}
    <path d="M35 68H65V48L50 36L35 48V68Z" fill="#CD9933" fillOpacity="0.2" stroke="#CD9933" strokeWidth="1.5" />
    <path d="M42 68V54H58V68" stroke="#CD9933" strokeWidth="1.5" />
    {/* Minarets */}
    <path d="M31 68V42M69 68V42" stroke="#CD9933" strokeWidth="2" strokeLinecap="round" />
    <path d="M29 42H33M67 42H71" stroke="#CD9933" strokeWidth="1.5" />
    {/* Domes on Minarets */}
    <path d="M31 42C31 38 32 36 32 36C32 36 30 38 30 42H31ZM69 42C69 38 70 36 70 36C70 36 68 38 68 42H69Z" fill="#CD9933" />
  </svg>
)

const getProxyUrl = (url) => {
  return url || '';
};

const staticTestimonials = [
  {
    name: 'Saba Khan',
    city: 'Lahore, Pakistan',
    text: 'I booked the Turkey tour for my family. The guide was incredibly knowledgeable and the itinerary wasn\'t rushed. A truly premium experience from start to finish.',
    image: sabaKhanImg
  },
  {
    name: 'Ahmed Raza',
    city: 'Karachi, Pakistan',
    text: 'Our Umrah journey with Royal Travels was flawless. From the visa process to the hotels being so close to the Haram, everything was perfectly managed. May Allah reward them.',
    image: ahmedRazaImg
  },
  {
    name: 'Zubair Malik',
    city: 'Lahore, Pakistan',
    text: 'Booking airline tickets and private domestic tours in Swat and Naran Valley was incredibly fast and smooth. Royal Travels operates with absolute elite professionalism. Will definitely travel with them again.',
    image: zubairMalikImg
  },
  {
    name: 'Tehmina Hassan',
    city: 'Rawalpindi, Pakistan',
    text: 'Our Turkey package was outstanding. Flight scheduling, domestic connections in Cappadocia, hotel stays, and local historical guides were perfectly taken care of. I didn\'t have to worry about a single detail.',
    image: tehminaHassanImg
  },
  {
    name: 'Dr. Mohammad Ali',
    city: 'Islamabad, Pakistan',
    text: 'The ground staff in Makkah were like family. They helped us with our elderly parents during Tawaaf. I highly recommend Royal Travels for their compassion.',
    image: mohammadAliImg
  },
  {
    name: 'Ayesha Siddiqui',
    city: 'Lahore, Pakistan',
    text: 'Alhamdulillah, performed Umrah using their premium package. Extremely smooth transport from Jeddah to Makkah and Madinah. Vetted hotels with delicious breakfast included!',
    image: ayeshaSiddiquiImg
  }
]

const Home3 = () => {
  const [packages, setPackages] = useState([])
  const [internationalTours, setInternationalTours] = useState(staticInternationalTours)
  const [localTours, setLocalTours] = useState(staticLocalTours)
  const [economyPackages, setEconomyPackages] = useState(staticEconomyPackages)
  const [star3Packages, setStar3Packages] = useState(staticStar3Packages)
  const [star4Packages, setStar4Packages] = useState(staticStar4Packages)
  const [star5Packages, setStar5Packages] = useState(staticStar5Packages)

  const economyRef = useRef(null)
  const star3Ref = useRef(null)
  const star4Ref = useRef(null)
  const star5Ref = useRef(null)

  const scrollCarousel = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -ref.current.offsetWidth : ref.current.offsetWidth
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  // Form State
  const [contactName, setContactName] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactMsg, setContactMsg] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)

    // Fetch packages from backend and categorize
    axios.get(`${API_BASE}/api/packages`)
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setPackages(res.data)
          // Filter international
          const fetchedInt = res.data.filter(p => p.category?.toLowerCase() === 'international')
          if (fetchedInt.length > 0) {
            setInternationalTours(fetchedInt.slice(0, 3))
          }
          // Filter domestic/local
          const fetchedLocal = res.data.filter(p => p.category?.toLowerCase() === 'domestic' || p.category?.toLowerCase() === 'local')
          if (fetchedLocal.length > 0) {
            setLocalTours(fetchedLocal.slice(0, 3))
          }
          // Filter umrah by sub-category
          const fetchedEconomy = res.data.filter(p => ['economy', 'low budget', 'budget', 'economy package'].includes(p.category?.toLowerCase()) || p.category?.toLowerCase().includes('economy'))
          if (fetchedEconomy.length > 0) setEconomyPackages(fetchedEconomy)
          const fetched3Star = res.data.filter(p => p.category?.toLowerCase().includes('3 star') || p.category?.toLowerCase().includes('3star'))
          if (fetched3Star.length > 0) setStar3Packages(fetched3Star)
          const fetched4Star = res.data.filter(p => p.category?.toLowerCase().includes('4 star') || p.category?.toLowerCase().includes('4star'))
          if (fetched4Star.length > 0) setStar4Packages(fetched4Star)
          const fetched5Star = res.data.filter(p => p.category?.toLowerCase().includes('5 star') || p.category?.toLowerCase().includes('5star'))
          if (fetched5Star.length > 0) setStar5Packages(fetched5Star)
        }
      })
      .catch(err => {
        console.error('API Packages fetch error (using high-fidelity fallbacks):', err)
      })
  }, [])

  const handleContactSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setContactName('')
      setContactPhone('')
      setContactEmail('')
      setContactMsg('')
    }, 4000)
  }

  return (
    <div className="bg-white font-manrope antialiased text-gray-700 min-h-screen">
      <Navbar isVersion2={true} />

      {/* 1. Hero Section matching screenshot layout precisely */}
      <section className="relative z-20 min-h-[960px] flex flex-col justify-between overflow-visible bg-[#001c1d]">
        {/* Background Image: Holy Kaaba at Makkah Sunset */}
        <div className="absolute inset-0 z-0">
          <img
            alt="Scenic view of the Holy Kaaba sunset background"
            className="w-full h-full object-cover object-right md:object-center"
            src={background3}
          />
          {/* Sophisticated dark teal horizontal gradient matching screenshot side-split */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#001c1d] via-[#001c1d]/95 via-45% md:via-55% to-transparent"></div>
        </div>

        {/* Hero Main Content (Split left layout) */}
        <div className="relative z-10 container mx-auto px-6 md:px-12 pt-28 pb-12 flex-1 flex flex-col justify-center items-start text-left">
          {/* Label matching screenshot */}
          <div className="flex items-center gap-3 text-[#CD9933] font-bold text-xs uppercase tracking-[0.4em] mb-5">
            <span>Proudly Serving</span>
            <div className="h-[1px] w-20 bg-[#CD9933]/70"></div>
          </div>

          {/* Headline matching screenshot */}
          <h1 className="font-notoSerif text-5xl md:text-7xl font-bold text-white mb-6 leading-tight max-w-2xl drop-shadow-md">
            The <br />
            <span className="text-[#CD9933]">Guests</span> Of <span className="text-[#CD9933]">Allah</span>
          </h1>

          {/* Description copy */}
          <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-xl mb-10 font-light font-manrope">
            We provide complete Umrah & International Travel Services with trusted guidance, premium comfort, and seamless support — so you can focus fully on your worship and sacred spiritual journey.
          </p>

          {/* Elegant Custom Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-20">
            <Link
              to="/packages"
              className="bg-[#CD9933] hover:bg-white hover:text-[#001c1d] text-white font-bold text-xs uppercase tracking-widest py-4 px-8 rounded-lg flex items-center gap-2.5 shadow-xl transition-all"
            >
              <span className="material-symbols-outlined text-base">calendar_month</span>
              <span>Explore Packages</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
            <Link
              to="/contact"
              className="border border-[#CD9933]/70 hover:border-[#CD9933] text-white hover:bg-white/5 font-bold text-xs uppercase tracking-widest py-4 px-8 rounded-lg flex items-center gap-2.5 transition-all"
            >
              <span className="material-symbols-outlined text-base">call</span>
              <span>Contact Us</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Banner Contact Form placed below hero content */}
        <BannerContactForm />
      </section>

      {/* 1.5 Features & Crescent Star Banner (Moved below Form) */}
      <section className="bg-[#001c1d] pt-36 pb-12 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Transparent Floating Features Strip Container */}
          <div className="bg-black/35 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 shadow-2xl">

            {/* Card 1: Happy Pilgrims */}
            <div className="flex gap-4 items-start text-left">
              <div className="w-12 h-12 rounded-full bg-[#CD9933]/15 border border-[#CD9933]/30 flex items-center justify-center text-[#CD9933] shrink-0">
                <span className="material-symbols-outlined text-xl">groups</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-white text-base font-bold tracking-wide">
                  5000+ <span className="font-light text-white/90">Happy Pilgrims</span>
                </h3>
                <p className="text-white/60 text-xs leading-relaxed font-light font-manrope">
                  Trusted by thousands of pilgrims worldwide.
                </p>
              </div>
            </div>

            {/* Card 2: IATA Certified */}
            <div className="flex gap-4 items-start text-left">
              <div className="w-12 h-12 rounded-full bg-[#CD9933]/15 border border-[#CD9933]/30 flex items-center justify-center text-[#CD9933] shrink-0">
                <span className="material-symbols-outlined text-xl">verified_user</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-white text-base font-bold tracking-wide">
                  IATA <span className="font-light text-white/90">Certified</span>
                </h3>
                <p className="text-white/60 text-xs leading-relaxed font-light font-manrope">
                  Fully licensed and industry approved.
                </p>
              </div>
            </div>

            {/* Card 3: Visa Assistance */}
            <div className="flex gap-4 items-start text-left">
              <div className="w-12 h-12 rounded-full bg-[#CD9933]/15 border border-[#CD9933]/30 flex items-center justify-center text-[#CD9933] shrink-0">
                <span className="material-symbols-outlined text-xl">assignment</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-white text-base font-bold tracking-wide">
                  Visa Assistance <span className="font-light text-white/90">Included</span>
                </h3>
                <p className="text-white/60 text-xs leading-relaxed font-light font-manrope">
                  Hassle-free visa processing support.
                </p>
              </div>
            </div>

            {/* Card 4: 24/7 Support */}
            <div className="flex gap-4 items-start text-left">
              <div className="w-12 h-12 rounded-full bg-[#CD9933]/15 border border-[#CD9933]/30 flex items-center justify-center text-[#CD9933] shrink-0">
                <span className="material-symbols-outlined text-xl">support_agent</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-white text-base font-bold tracking-wide">
                  24/7 Support <span className="font-light text-white/90">Always Available</span>
                </h3>
                <p className="text-white/60 text-xs leading-relaxed font-light font-manrope">
                  Dedicated support whenever you need us.
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Gold Crescent Star Signature Banner */}
          <div className="flex items-center justify-center gap-2 text-[#CD9933] font-bold text-xs tracking-[0.4em] uppercase mt-8 select-none">
            <span className="material-symbols-outlined text-base">star_rate</span>
            <span>YOUR JOURNEY. OUR RESPONSIBILITY.</span>
          </div>
        </div>
      </section>

      {/* 2. Partner Logo Strip */}
      <div className="bg-[#111111] py-8 px-6 overflow-hidden relative z-10">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-70">
          <span className="text-white font-extrabold tracking-widest text-sm uppercase">TURKISH AIRLINES</span>
          <span className="text-white font-extrabold tracking-widest text-sm uppercase">EMIRATES</span>
          <span className="text-white font-extrabold tracking-widest text-sm uppercase">ETIHAD</span>
          <span className="text-white font-extrabold tracking-widest text-sm uppercase">THAI</span>
          <span className="text-white font-extrabold tracking-widest text-sm uppercase">OMAN AIR</span>
          <span className="text-white font-extrabold tracking-widest text-sm uppercase">AIR ASIA</span>
        </div>
      </div>

      {/* ── WHY CHOOSE ROYAL UMRAH & TRAVELS ── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 md:px-8 bg-[#f5f7fa] relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Graphic Grid Collage */}
            <ScrollReveal animation="fade-down" duration={800}>
              <div className="relative group">
                <div className="absolute inset-0 bg-[#CD9933] translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300 rounded-xl"></div>
                <img 
                  alt="Beautiful sunset view of Holy Kaaba in Makkah" 
                  className="w-full h-auto object-cover shadow-2xl border border-white/20 rounded-xl"
                  src={kaabaPackages}
                />
                
                {/* Visual badge highlight */}
                <div className="absolute -bottom-8 -right-4 bg-[#013334] text-white p-6 rounded-lg shadow-xl border border-[#CD9933]/30 hidden sm:block">
                  <p className="text-xl font-extrabold text-[#CD9933]">20+</p>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-white/85">Years Combined Experience</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Right details content */}
            <ScrollReveal animation="fade-down" duration={800}>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="text-[#CD9933] font-bold text-xs uppercase tracking-[0.3em] font-manrope">Best Travel Agency in Pakistan</span>
                  <div className="h-[1px] w-12 bg-[#CD9933]"></div>
                </div>
                <h2 className="text-[#013334] text-3xl md:text-5xl font-bold tracking-wide uppercase font-notoSerif leading-tight">
                  Why Choose <br />
                  <span className="text-[#CD9933]">Royal Umrah</span> & Travels?
                </h2>
                <p className="text-gray-500 leading-relaxed text-sm">
                  We specialize in crafting seamless spiritual itineraries for families across Pakistan. From direct flight alignments to booking hand-selected hotels mere steps from the gates of Haram, we take care of the details so you can focus entirely on worship.
                </p>

                {/* 4 Premium Value Grid Items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  {/* Item 1 */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#013334]/10 flex items-center justify-center text-[#CD9933]">
                        <span className="material-symbols-outlined text-sm font-bold">hotel</span>
                      </div>
                      <h4 className="font-bold text-[#013334] text-sm uppercase">Proximity Stays</h4>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      Hotels hand-picked to be within 100m to 250m from Makkah and Madinah mosque entrances.
                    </p>
                  </div>

                  {/* Item 2 */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#013334]/10 flex items-center justify-center text-[#CD9933]">
                        <span className="material-symbols-outlined text-sm font-bold">verified</span>
                      </div>
                      <h4 className="font-bold text-[#013334] text-sm uppercase">100% Certified</h4>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      Approved by Ministry of Hajj & Umrah for hassle-free e-visa and group clearance.
                    </p>
                  </div>

                  {/* Item 3 */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#013334]/10 flex items-center justify-center text-[#CD9933]">
                        <span className="material-symbols-outlined text-sm font-bold">flight_takeoff</span>
                      </div>
                      <h4 className="font-bold text-[#013334] text-sm uppercase">Elite Flights</h4>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      Direct bookings with top airlines like Saudi Airlines, Emirates, and Qatar Airways.
                    </p>
                  </div>

                  {/* Item 4 */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#013334]/10 flex items-center justify-center text-[#CD9933]">
                        <span className="material-symbols-outlined text-sm font-bold">support_agent</span>
                      </div>
                      <h4 className="font-bold text-[#013334] text-sm uppercase">On-Ground Support</h4>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      Experienced tour managers staying on-site in Makkah & Madinah for direct coordination.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ── LOW BUDGET / ECONOMY UMRAH PACKAGES ── */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-[#002526] text-white relative z-10">
        <div className="max-w-screen-2xl mx-auto">
          <ScrollReveal animation="fade-down" duration={600}>
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16">
              <div className="max-w-2xl">
                <h6 className="font-manrope text-[#CD9933] font-bold text-sm tracking-[0.2em] uppercase mb-4">Spiritual Journeys</h6>
                <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">Low Budget / Economy Umrah Packages</h2>
              </div>
              <div className="flex items-center gap-4 mt-6 md:mt-0">
                <Link className="text-white hover:text-[#CD9933] font-bold border-b-2 border-[#CD9933] pb-1 transition-all hover:pr-4" to="/packages?category=economy">View All</Link>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => scrollCarousel(economyRef, 'left')} 
                    className="w-10 h-10 rounded-full border border-[#CD9933]/20 hover:border-[#CD9933] text-white hover:text-[#CD9933] hover:bg-[#CD9933]/10 flex items-center justify-center transition-all bg-[#013334]/45 backdrop-blur-md shadow-sm cursor-pointer select-none active:scale-95"
                    aria-label="Previous"
                  >
                    <span className="material-symbols-outlined text-base font-bold">arrow_back_ios_new</span>
                  </button>
                  <button 
                    onClick={() => scrollCarousel(economyRef, 'right')} 
                    className="w-10 h-10 rounded-full border border-[#CD9933]/20 hover:border-[#CD9933] text-white hover:text-[#CD9933] hover:bg-[#CD9933]/10 flex items-center justify-center transition-all bg-[#013334]/45 backdrop-blur-md shadow-sm cursor-pointer select-none active:scale-95"
                    aria-label="Next"
                  >
                    <span className="material-symbols-outlined text-base font-bold">arrow_forward_ios</span>
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
          
          <div 
            ref={economyRef}
            className="flex gap-6 md:gap-8 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth py-4 scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {economyPackages.slice(0, 12).map((pkg, idx) => (
              <div 
                key={pkg.id} 
                className="snap-start flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
              >
                <ScrollReveal 
                  key={pkg.id} 
                  delay={(idx % 4) * 80} 
                  animation={idx % 2 === 0 ? "fade-down" : "fade-up"}
                  duration={700}
                >
                  <Link to={`/package/${pkg.id}`} className="bg-[#013334] border border-[#CD9933]/15 hover:border-[#CD9933]/40 rounded-xl group cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 block h-full text-white">
                    <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                      <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={economyPackagesImg} alt={pkg.title} />
                      <div className="absolute top-4 left-4 bg-[#CD9933] text-white text-[10px] font-bold px-3 py-1 tracking-widest uppercase rounded-md shadow-md">{pkg.badge}</div>
                    </div>
                    <div className="p-4 md:p-6 text-left">
                      <h3 className="font-notoSerif text-lg font-bold text-[#CD9933] mb-2 line-clamp-1 group-hover:text-white transition-colors">{pkg.title}</h3>
                      <p className="text-white/70 text-sm mb-4 line-clamp-1">{pkg.location} • {pkg.duration}</p>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                        <div>
                          <span className="block text-xs text-white/50 uppercase tracking-wider">Starting from</span>
                          <span className="text-xl font-extrabold text-[#CD9933]">PKR {pkg.price.toLocaleString()}</span>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-[#CD9933] group-hover:bg-[#CD9933] group-hover:text-[#013334] group-hover:border-[#CD9933] transition-all">
                          <span className="material-symbols-outlined text-sm font-bold group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              </div>
            ))}
          </div>

          <ScrollReveal animation="fade-down" delay={200} duration={600}>
            <div className="text-center mt-12">
              <Link to="/packages?category=economy" className="inline-block border-2 border-[#CD9933] text-white hover:bg-[#CD9933] hover:text-[#013334] px-10 py-3.5 text-xs font-bold tracking-widest uppercase transition-colors">VIEW ALL ECONOMY PACKAGES</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── GROUND UMRAH PACKAGES | 3 STAR ── */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-white text-gray-800 relative z-10">
        <div className="max-w-screen-2xl mx-auto">
          <ScrollReveal animation="fade-down" duration={600}>
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16">
              <div className="max-w-2xl">
                <h6 className="font-manrope text-[#CD9933] font-bold text-sm tracking-[0.2em] uppercase mb-4">Ground Packages</h6>
                <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#013334] leading-tight">Classic Umrah Packages | 3 Star</h2>
              </div>
              <div className="flex items-center gap-4 mt-6 md:mt-0">
                <Link className="text-[#013334] hover:text-[#CD9933] font-bold border-b-2 border-[#CD9933] pb-1 transition-all hover:pr-4" to="/packages?category=3star">View All</Link>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => scrollCarousel(star3Ref, 'left')} 
                    className="w-10 h-10 rounded-full border border-[#013334] bg-[#013334] text-white hover:bg-[#CD9933] hover:text-[#013334] hover:border-[#CD9933] flex items-center justify-center transition-all shadow-sm cursor-pointer select-none active:scale-95"
                    aria-label="Previous"
                  >
                    <span className="material-symbols-outlined text-base font-bold">arrow_back_ios_new</span>
                  </button>
                  <button 
                    onClick={() => scrollCarousel(star3Ref, 'right')} 
                    className="w-10 h-10 rounded-full border border-[#013334] bg-[#013334] text-white hover:bg-[#CD9933] hover:text-[#013334] hover:border-[#CD9933] flex items-center justify-center transition-all shadow-sm cursor-pointer select-none active:scale-95"
                    aria-label="Next"
                  >
                    <span className="material-symbols-outlined text-base font-bold">arrow_forward_ios</span>
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
          
          <div 
            ref={star3Ref}
            className="flex gap-6 md:gap-8 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth py-4 scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {star3Packages.slice(0, 12).map((pkg, idx) => (
              <div 
                key={pkg.id} 
                className="snap-start flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
              >
                <ScrollReveal 
                  key={pkg.id} 
                  delay={(idx % 4) * 80} 
                  animation={idx % 2 === 0 ? "fade-down" : "fade-up"}
                  duration={700}
                >
                  <Link to={`/package/${pkg.id}`} className="bg-[#013334] border border-[#CD9933]/15 hover:border-[#CD9933]/40 rounded-xl group cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 block h-full text-white">
                    <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                      <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={star3PackagesImg} alt={pkg.title} />
                      <div className="absolute top-4 left-4 bg-[#CD9933] text-white text-[10px] font-bold px-3 py-1 tracking-widest uppercase rounded-md shadow-md">{pkg.badge}</div>
                    </div>
                    <div className="p-4 md:p-6 text-left">
                      <h3 className="font-notoSerif text-lg font-bold text-[#CD9933] mb-2 line-clamp-1 group-hover:text-white transition-colors">{pkg.title}</h3>
                      <p className="text-white/70 text-sm mb-4 line-clamp-1">{pkg.location} • {pkg.duration}</p>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                        <div>
                          <span className="block text-xs text-white/50 uppercase tracking-wider">Starting from</span>
                          <span className="text-xl font-extrabold text-[#CD9933]">PKR {pkg.price.toLocaleString()}</span>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-[#CD9933] group-hover:bg-[#CD9933] group-hover:text-[#013334] group-hover:border-[#CD9933] transition-all">
                          <span className="material-symbols-outlined text-sm font-bold group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              </div>
            ))}
          </div>

          <ScrollReveal animation="fade-down" delay={200} duration={600}>
            <div className="text-center mt-12">
              <Link to="/packages?category=3star" className="inline-block border-2 border-[#013334] bg-[#013334] text-white hover:bg-[#CD9933] hover:text-[#013334] hover:border-[#CD9933] px-10 py-3.5 text-xs font-bold tracking-widest uppercase transition-colors">VIEW ALL 3 STAR PACKAGES</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── GROUND UMRAH PACKAGES | 4 STAR ── */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-[#002526] text-white relative z-10">
        <div className="max-w-screen-2xl mx-auto">
          <ScrollReveal animation="fade-down" duration={600}>
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16">
              <div className="max-w-2xl">
                <h6 className="font-manrope text-[#CD9933] font-bold text-sm tracking-[0.2em] uppercase mb-4">Ground Packages</h6>
                <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">Premium Umrah Packages | 4 Star</h2>
              </div>
              <div className="flex items-center gap-4 mt-6 md:mt-0">
                <Link className="text-white hover:text-[#CD9933] font-bold border-b-2 border-[#CD9933] pb-1 transition-all hover:pr-4" to="/packages?category=4star">View All</Link>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => scrollCarousel(star4Ref, 'left')} 
                    className="w-10 h-10 rounded-full border border-[#CD9933]/20 hover:border-[#CD9933] text-white hover:text-[#CD9933] hover:bg-[#CD9933]/10 flex items-center justify-center transition-all bg-[#013334]/45 backdrop-blur-md shadow-sm cursor-pointer select-none active:scale-95"
                    aria-label="Previous"
                  >
                    <span className="material-symbols-outlined text-base font-bold">arrow_back_ios_new</span>
                  </button>
                  <button 
                    onClick={() => scrollCarousel(star4Ref, 'right')} 
                    className="w-10 h-10 rounded-full border border-[#CD9933]/20 hover:border-[#CD9933] text-white hover:text-[#CD9933] hover:bg-[#CD9933]/10 flex items-center justify-center transition-all bg-[#013334]/45 backdrop-blur-md shadow-sm cursor-pointer select-none active:scale-95"
                    aria-label="Next"
                  >
                    <span className="material-symbols-outlined text-base font-bold">arrow_forward_ios</span>
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
          
          <div 
            ref={star4Ref}
            className="flex gap-6 md:gap-8 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth py-4 scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {star4Packages.slice(0, 12).map((pkg, idx) => (
              <div 
                key={pkg.id} 
                className="snap-start flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
              >
                <ScrollReveal 
                  key={pkg.id} 
                  delay={(idx % 4) * 80} 
                  animation={idx % 2 === 0 ? "fade-down" : "fade-up"}
                  duration={700}
                >
                  <Link to={`/package/${pkg.id}`} className="bg-[#013334] border border-[#CD9933]/15 hover:border-[#CD9933]/40 rounded-xl group cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 block h-full text-white">
                    <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                      <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={star4PackagesImg} alt={pkg.title} />
                      <div className="absolute top-4 left-4 bg-[#CD9933] text-white text-[10px] font-bold px-3 py-1 tracking-widest uppercase rounded-md shadow-md">{pkg.badge}</div>
                    </div>
                    <div className="p-4 md:p-6 text-left">
                      <h3 className="font-notoSerif text-lg font-bold text-[#CD9933] mb-2 line-clamp-1 group-hover:text-white transition-colors">{pkg.title}</h3>
                      <p className="text-white/70 text-sm mb-4 line-clamp-1">{pkg.location} • {pkg.duration}</p>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                        <div>
                          <span className="block text-xs text-white/50 uppercase tracking-wider">Starting from</span>
                          <span className="text-xl font-extrabold text-[#CD9933]">PKR {pkg.price.toLocaleString()}</span>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-[#CD9933] group-hover:bg-[#CD9933] group-hover:text-[#013334] group-hover:border-[#CD9933] transition-all">
                          <span className="material-symbols-outlined text-sm font-bold group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              </div>
            ))}
          </div>

          <ScrollReveal animation="fade-down" delay={200} duration={600}>
            <div className="text-center mt-12">
              <Link to="/packages?category=4star" className="inline-block border-2 border-[#CD9933] text-white hover:bg-[#CD9933] hover:text-[#013334] px-10 py-3.5 text-xs font-bold tracking-widest uppercase transition-colors">VIEW ALL 4 STAR PACKAGES</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── GROUND UMRAH PACKAGES | 5 STAR ── */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-white text-gray-800 relative z-10">
        <div className="max-w-screen-2xl mx-auto">
          <ScrollReveal animation="fade-down" duration={600}>
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16">
              <div className="max-w-2xl">
                <h6 className="font-manrope text-[#CD9933] font-bold text-sm tracking-[0.2em] uppercase mb-4">Ground Packages</h6>
                <h2 className="font-notoSerif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#013334] leading-tight">Luxury Umrah Packages 5 Star</h2>
              </div>
              <div className="flex items-center gap-4 mt-6 md:mt-0">
                <Link className="text-[#013334] hover:text-[#CD9933] font-bold border-b-2 border-[#CD9933] pb-1 transition-all hover:pr-4" to="/packages?category=5star">View All</Link>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => scrollCarousel(star5Ref, 'left')} 
                    className="w-10 h-10 rounded-full border border-[#013334] bg-[#013334] text-white hover:bg-[#CD9933] hover:text-[#013334] hover:border-[#CD9933] flex items-center justify-center transition-all shadow-sm cursor-pointer select-none active:scale-95"
                    aria-label="Previous"
                  >
                    <span className="material-symbols-outlined text-base font-bold">arrow_back_ios_new</span>
                  </button>
                  <button 
                    onClick={() => scrollCarousel(star5Ref, 'right')} 
                    className="w-10 h-10 rounded-full border border-[#013334] bg-[#013334] text-white hover:bg-[#CD9933] hover:text-[#013334] hover:border-[#CD9933] flex items-center justify-center transition-all shadow-sm cursor-pointer select-none active:scale-95"
                    aria-label="Next"
                  >
                    <span className="material-symbols-outlined text-base font-bold">arrow_forward_ios</span>
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
          
          <div 
            ref={star5Ref}
            className="flex gap-6 md:gap-8 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth py-4 scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {star5Packages.slice(0, 12).map((pkg, idx) => (
              <div 
                key={pkg.id} 
                className="snap-start flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
              >
                <ScrollReveal 
                  key={pkg.id} 
                  delay={(idx % 4) * 80} 
                  animation={idx % 2 === 0 ? "fade-down" : "fade-up"}
                  duration={700}
                >
                  <Link to={`/package/${pkg.id}`} className="bg-[#013334] border border-[#CD9933]/15 hover:border-[#CD9933]/40 rounded-xl group cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 block h-full text-white">
                    <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                      <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={star5PackagesImg} alt={pkg.title} />
                      <div className="absolute top-4 left-4 bg-[#CD9933] text-white text-[10px] font-bold px-3 py-1 tracking-widest uppercase rounded-md shadow-md">{pkg.badge}</div>
                    </div>
                    <div className="p-4 md:p-6 text-left">
                      <h3 className="font-notoSerif text-lg font-bold text-[#CD9933] mb-2 line-clamp-1 group-hover:text-white transition-colors">{pkg.title}</h3>
                      <p className="text-white/70 text-sm mb-4 line-clamp-1">{pkg.location} • {pkg.duration}</p>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                        <div>
                          <span className="block text-xs text-white/50 uppercase tracking-wider">Starting from</span>
                          <span className="text-xl font-extrabold text-[#CD9933]">PKR {pkg.price.toLocaleString()}</span>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-[#CD9933] group-hover:bg-[#CD9933] group-hover:text-[#013334] group-hover:border-[#CD9933] transition-all">
                          <span className="material-symbols-outlined text-sm font-bold group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              </div>
            ))}
          </div>

          <ScrollReveal animation="fade-down" delay={200} duration={600}>
            <div className="text-center mt-12">
              <Link to="/packages?category=5star" className="inline-block border-2 border-[#013334] bg-[#013334] text-white hover:bg-[#CD9933] hover:text-[#013334] hover:border-[#CD9933] px-10 py-3.5 text-xs font-bold tracking-widest uppercase transition-colors">VIEW ALL 5 STAR PACKAGES</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>



      {/* ── VISUAL 4-STEP UMRAH GUIDE ── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 md:px-8 bg-[#013334] text-white relative z-10 overflow-hidden">
        {/* Subtle geometric gold background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#CD9933]/5 blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Header */}
          <ScrollReveal animation="fade-down" duration={600}>
            <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20 space-y-4">
              <span className="text-[#CD9933] font-bold text-xs uppercase tracking-[0.3em] font-manrope">Performing the Pilgrimage</span>
              <h2 className="text-white text-3xl md:text-5xl font-bold tracking-wide uppercase font-notoSerif leading-tight">
                Step-by-Step <br />
                <span className="text-[#CD9933]">Umrah Guide</span>
              </h2>
              <div className="h-[2px] w-12 bg-[#CD9933] mx-auto mt-4"></div>
              <p className="text-white/60 text-xs leading-relaxed max-w-md mx-auto">
                A simple and complete visual overview of the major rituals required to perform your holy pilgrimage correctly.
              </p>
            </div>
          </ScrollReveal>

          {/* 4 Steps Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            
            {/* Step 1 */}
            <ScrollReveal animation="fade-down" delay={0} duration={700}>
              <div className="bg-white/5 border border-white/10 hover:border-[#CD9933]/40 p-8 rounded-xl relative group transition-all duration-300 hover:-translate-y-1 h-full text-left">
                <div className="absolute -top-6 left-8 w-12 h-12 bg-[#CD9933] text-[#013334] font-black text-xl flex items-center justify-center rounded-xl shadow-lg border-2 border-[#013334]">
                  01
                </div>
                <div className="pt-4 space-y-4">
                  <div className="w-10 h-10 rounded-full bg-[#CD9933]/10 flex items-center justify-center text-[#CD9933] group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-base">styler</span>
                  </div>
                  <h3 className="text-white font-bold text-lg uppercase tracking-wide">Ihram</h3>
                  <p className="text-white/60 text-xs leading-relaxed font-light">
                    Enter the state of spiritual purity by wearing the white garments at the designated Miqat boundary and declaring your Niyyah (intention) with the Talbiyah prayer.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Step 2 */}
            <ScrollReveal animation="fade-down" delay={150} duration={700}>
              <div className="bg-white/5 border border-white/10 hover:border-[#CD9933]/40 p-8 rounded-xl relative group transition-all duration-300 hover:-translate-y-1 h-full text-left">
                <div className="absolute -top-6 left-8 w-12 h-12 bg-[#CD9933] text-[#013334] font-black text-xl flex items-center justify-center rounded-xl shadow-lg border-2 border-[#013334]">
                  02
                </div>
                <div className="pt-4 space-y-4">
                  <div className="w-10 h-10 rounded-full bg-[#CD9933]/10 flex items-center justify-center text-[#CD9933] group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-base">all_inclusive</span>
                  </div>
                  <h3 className="text-white font-bold text-lg uppercase tracking-wide">Tawaf</h3>
                  <p className="text-white/60 text-xs leading-relaxed font-light">
                    Circumambulate the Holy Kaaba seven times counter-clockwise, starting from the Black Stone (Hajar al-Aswad) with dhikr, du'as, and prayers of humility.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Step 3 */}
            <ScrollReveal animation="fade-down" delay={300} duration={700}>
              <div className="bg-white/5 border border-white/10 hover:border-[#CD9933]/40 p-8 rounded-xl relative group transition-all duration-300 hover:-translate-y-1 h-full text-left">
                <div className="absolute -top-6 left-8 w-12 h-12 bg-[#CD9933] text-[#013334] font-black text-xl flex items-center justify-center rounded-xl shadow-lg border-2 border-[#013334]">
                  03
                </div>
                <div className="pt-4 space-y-4">
                  <div className="w-10 h-10 rounded-full bg-[#CD9933]/10 flex items-center justify-center text-[#CD9933] group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-base">directions_walk</span>
                  </div>
                  <h3 className="text-white font-bold text-lg uppercase tracking-wide">Sa'i</h3>
                  <p className="text-white/60 text-xs leading-relaxed font-light">
                    Walk seven times between the historic hills of Safa and Marwa, commemorating the devotional search for water by Hajra (A.S) for her infant Ismail (A.S).
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Step 4 */}
            <ScrollReveal animation="fade-down" delay={450} duration={700}>
              <div className="bg-white/5 border border-white/10 hover:border-[#CD9933]/40 p-8 rounded-xl relative group transition-all duration-300 hover:-translate-y-1 h-full text-left">
                <div className="absolute -top-6 left-8 w-12 h-12 bg-[#CD9933] text-[#013334] font-black text-xl flex items-center justify-center rounded-xl shadow-lg border-2 border-[#013334]">
                  04
                </div>
                <div className="pt-4 space-y-4">
                  <div className="w-10 h-10 rounded-full bg-[#CD9933]/10 flex items-center justify-center text-[#CD9933] group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-base">content_cut</span>
                  </div>
                  <h3 className="text-white font-bold text-lg uppercase tracking-wide">Halq / Taqsir</h3>
                  <p className="text-white/60 text-xs leading-relaxed font-light">
                    Formally complete your pilgrimage by shaving the head (Halq) or clipping a small lock of hair (Taqsir) to exit the sacred state of Ihram.
                  </p>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 3. About Us Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column Text Details */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-[#CD9933] font-bold text-xs uppercase tracking-widest">WHO WE ARE</span>
              <div className="h-[1px] w-12 bg-[#CD9933]"></div>
            </div>
            <h2 className="text-[#013334] text-3xl md:text-4xl font-bold tracking-wide uppercase font-headline">
              BEST TRAVEL AGENCY IN PAKISTAN
            </h2>
            <p className="text-gray-500 leading-relaxed text-sm">
              At Royal Umrah & Travels, we treat every travel plan as a customized masterclass of spiritual fulfillment, logistics comfort, and exploration freedom. Over the years, we have built key flight alignments and hotel partnerships worldwide to deliver high-fidelity journeys that stay with you forever.
            </p>

            {/* Elegant 8-Item Double-Column List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3.5 text-xs text-gray-600 font-bold uppercase tracking-wider">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#CD9933]"></span>
                <span>Economy Class Flights</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#CD9933]"></span>
                <span>3-Star Accommodations</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#CD9933]"></span>
                <span>Business Class Flights</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#CD9933]"></span>
                <span>4-Star Accommodations</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#CD9933]"></span>
                <span>First Class Flight Booking</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#CD9933]"></span>
                <span>5-Star Accommodations</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#CD9933]"></span>
                <span>Local Tour Packages</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#CD9933]"></span>
                <span>International Tour Packages</span>
              </div>
            </div>

            <Link
              to="/about"
              className="inline-block bg-[#013334] hover:bg-[#CD9933] text-white px-8 py-3.5 text-xs font-bold tracking-widest uppercase transition-colors"
            >
              READ MORE
            </Link>
          </div>

          {/* Right Column Graphic Collage */}
          <div className="relative group">
            <div className="absolute inset-0 bg-[#CD9933] translate-x-3 translate-y-3 -z-10 group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-300"></div>
            <img
              alt="Luxury traveler collage illustration mockup landscape"
              className="w-full h-auto object-cover shadow-xl border border-gray-100"
              src={aboutImage}
            />
          </div>
        </div>
      </section>

      {/* 4. International Tours Grid */}
      <section className="py-24 px-6 bg-[#013334] text-white relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <ScrollReveal animation="fade-down" duration={600}>
            <div className="text-center mb-16 space-y-3">
              <div className="flex items-center justify-center gap-2 text-[#CD9933]">
                <span className="material-symbols-outlined text-sm">rocket_launch</span>
                <span className="font-bold text-xs uppercase tracking-widest">PACKAGES AND GO</span>
              </div>
              <h2 className="text-white text-3xl md:text-4xl font-bold tracking-wide uppercase font-headline">
                INTERNATIONAL TOURS
              </h2>
              <div className="h-[2px] w-16 bg-[#CD9933] mx-auto mt-4"></div>
            </div>
          </ScrollReveal>

          {/* 4-Column Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {internationalTours.map((pkg, idx) => {
              const isStatic = !pkg.hasOwnProperty('image_url')
              const img = internationalToursImg
              const duration = isStatic ? pkg.duration : (pkg.duration || '5 Days 4 Nights')
              const price = pkg.price

              return (
                <ScrollReveal 
                  key={pkg.id || idx} 
                  delay={(idx % 4) * 100} 
                  animation={idx % 2 === 0 ? "fade-down" : "fade-up"} 
                  duration={700}
                >
                  <div className="bg-[#013334] border border-[#CD9933]/15 rounded-xl hover:border-[#CD9933]/40 transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden h-full group shadow-md hover:shadow-xl text-white">
                    {/* Top Image */}
                    <div className="relative h-64 overflow-hidden shrink-0">
                      <img
                        alt={pkg.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        src={img}
                      />
                    </div>

                    {/* Card Content details */}
                    <div className="p-8 flex-1 flex flex-col justify-between">
                      <div className="space-y-4">
                        <h3 className="text-white group-hover:text-[#CD9933] font-bold text-lg tracking-wide uppercase font-headline line-clamp-2 transition-colors">
                          {pkg.title}
                        </h3>
                        <p className="text-[#CD9933] font-bold text-sm uppercase tracking-wider">
                          PKR {price.toLocaleString()} | {duration}
                        </p>
                        <p className="text-white/70 text-xs leading-relaxed line-clamp-3">
                          {pkg.description || 'Experience highly curated schedules, flight alignments, and premier accommodations organized with travel security and luxury.'}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4 mt-8 pt-6 border-t border-white/10">
                        <Link
                          to={`/package/${pkg.id || idx + 1}`}
                          className="flex-1 bg-white/5 border border-white/10 hover:bg-[#CD9933] hover:border-[#CD9933] text-white hover:text-[#013334] text-center py-3 text-[10px] font-bold uppercase tracking-wider transition-all rounded-lg"
                        >
                          READ MORE
                        </Link>
                        <a
                          href="https://wa.me/923220725064"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-[#CD9933] hover:bg-[#b08025] text-white text-center py-3 text-[10px] font-bold uppercase tracking-wider transition-all rounded-lg"
                        >
                          BOOK NOW
                        </a>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>

          {/* Centered Outline Button */}
          <ScrollReveal animation="fade-down" delay={150} duration={600}>
            <div className="text-center mt-16">
              <Link
                to="/packages"
                className="inline-block border-2 border-[#CD9933] text-white hover:bg-[#CD9933] hover:text-[#002526] px-10 py-3.5 text-xs font-bold tracking-widest uppercase transition-colors"
              >
                MORE TOURS
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. "Go Explore" CTA Banner */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            alt="Massive panoramic dark mountains wilderness"
            className="w-full h-full object-cover"
            src={toursScenic}
          />
          <div className="absolute inset-0 bg-[#013334]/85"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center text-white space-y-6">
          <span className="text-[#f6bd54] font-bold text-xs uppercase tracking-[0.3em] block">IT'S A BIG WORLD OUT THERE</span>
          <h2 className="text-white text-5xl md:text-7xl font-bold tracking-widest uppercase font-headline">
            GO EXPLORE
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-sm leading-relaxed font-light">
            We plan the logistics, align standard flights, secure accommodations, and details down to every tourist guide so that you can simply enjoy, relax, and discover.
          </p>
          <div className="pt-4">
            <Link
              to="/packages"
              className="inline-block bg-[#CD9933] hover:bg-white hover:text-[#013334] text-white px-10 py-4 text-xs font-bold tracking-widest uppercase transition-all shadow-lg"
            >
              READ MORE
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Local Tours Grid */}
      <section className="py-24 px-6 bg-white text-gray-800 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <ScrollReveal animation="fade-down" duration={600}>
            <div className="text-center mb-16 space-y-3">
              <div className="flex items-center justify-center gap-2 text-[#CD9933]">
                <span className="material-symbols-outlined text-sm">terrain</span>
                <span className="font-bold text-xs uppercase tracking-widest">PACKAGES AND GO</span>
              </div>
              <h2 className="text-[#013334] text-3xl md:text-4xl font-bold tracking-wide uppercase font-headline">
                LOCAL TOURS
              </h2>
              <div className="h-[2px] w-16 bg-[#CD9933] mx-auto mt-4"></div>
            </div>
          </ScrollReveal>

          {/* 3-Column Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {localTours.map((pkg, idx) => {
              const isStatic = !pkg.hasOwnProperty('image_url')
              const img = localToursImg
              const badge = isStatic ? pkg.badge : (pkg.category || 'FOR 1 PERSON')
              const duration = isStatic ? pkg.duration : (pkg.duration || '3 Days 2 Nights')
              const price = pkg.price

              return (
                <ScrollReveal 
                  key={pkg.id || idx} 
                  delay={(idx % 3) * 100} 
                  animation={idx % 2 === 0 ? "fade-down" : "fade-up"} 
                  duration={700}
                >
                  <div className="bg-[#013334] border border-[#CD9933]/15 rounded-xl hover:border-[#CD9933]/40 transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden h-full group shadow-md hover:shadow-xl text-white">
                    {/* Top Image */}
                    <div className="relative h-64 overflow-hidden shrink-0">
                      <img
                        alt={pkg.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        src={img}
                      />
                    </div>

                    {/* Card Content details */}
                    <div className="p-8 flex-1 flex flex-col justify-between">
                      <div className="space-y-4">
                        <h3 className="text-white group-hover:text-[#CD9933] font-bold text-lg tracking-wide uppercase font-headline line-clamp-2 transition-colors">
                          {pkg.title}
                        </h3>
                        <p className="text-[#CD9933] font-bold text-sm uppercase tracking-wider">
                          PKR {price.toLocaleString()} | {duration}
                        </p>
                        <p className="text-white/70 text-xs leading-relaxed line-clamp-3">
                          {pkg.description || 'Explore the magnificent mountain views, fresh stream walks, and celestial landscapes of Northern Pakistan.'}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4 mt-8 pt-6 border-t border-white/10">
                        <Link
                          to={`/package/${pkg.id || idx + 1}`}
                          className="flex-1 bg-white/5 border border-white/10 hover:bg-[#CD9933] hover:border-[#CD9933] text-white hover:text-[#013334] text-center py-3 text-[10px] font-bold uppercase tracking-wider transition-all rounded-lg"
                        >
                          READ MORE
                        </Link>
                        <a
                          href="https://wa.me/923220725064"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-[#CD9933] hover:bg-[#b08025] text-white text-center py-3 text-[10px] font-bold uppercase tracking-wider transition-all rounded-lg"
                        >
                          BOOK NOW
                        </a>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>

          {/* Centered Outline Button */}
          <ScrollReveal animation="fade-down" delay={150} duration={600}>
            <div className="text-center mt-16">
              <Link
                to="/packages"
                className="inline-block border-2 border-[#013334] bg-[#013334] text-white hover:bg-[#CD9933] hover:text-[#013334] hover:border-[#CD9933] px-10 py-3.5 text-xs font-bold tracking-widest uppercase transition-colors"
              >
                MORE TOURS
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 7. Happy Travelers (Testimonials) */}
      <section className="relative py-24 px-6 overflow-hidden bg-[#013334]">
        {/* Shadow Overlay */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <img
            alt="Mountains silhouette travel landscape"
            className="w-full h-full object-cover"
            src={toursScenic}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center text-white mb-16 space-y-3">
            <span className="material-symbols-outlined text-[#f6bd54] text-3xl">sentiment_satisfied</span>
            <p className="text-[#f6bd54] font-bold text-xs uppercase tracking-widest">RELAX AND ENJOY</p>
            <h2 className="text-white text-3xl md:text-4xl font-bold tracking-wide uppercase font-headline">
              HAPPY TRAVELERS
            </h2>
            <div className="h-[2px] w-12 bg-[#CD9933] mx-auto mt-3"></div>
          </div>

          {/* Testimonial Cards Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {staticTestimonials.map((t, idx) => (
              <div key={idx} className="bg-white p-10 shadow-lg text-center relative border border-gray-100 flex flex-col items-center">
                <span className="material-symbols-outlined text-gray-200 text-5xl absolute top-6 right-6">format_quote</span>
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#f5f7fa] mb-6">
                  <img
                    alt={`${t.name} portrait`}
                    className="w-full h-full object-cover"
                    src={t.image}
                  />
                </div>
                <h5 className="text-[#013334] font-bold text-sm uppercase tracking-wider font-headline">{t.name}</h5>
                <p className="text-[#CD9933] text-[9px] font-bold tracking-widest uppercase mb-4">{t.city}</p>
                <p className="text-gray-500 italic text-xs leading-relaxed max-w-sm">
                  "{t.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Contact Us Section */}
      <section className="relative bg-[#f5f7fa] overflow-hidden">
        {/* Snowy Mountain Backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            alt="Alpine snowcapped mountains panorama peak"
            className="w-full h-full object-cover opacity-15"
            src={toursScenic}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-[600px]">
          {/* Left Column: Happy traveler photo cutout */}
          <div className="relative hidden lg:block overflow-hidden min-h-[500px]">
            <img
              alt="Hajj Umrah and international travels collage illustration"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[95%] w-auto object-contain"
              src={travelCollage}
            />
          </div>

          {/* Right Column: Dark Teal Contact Box */}
          <div className="bg-[#013334] text-white p-12 md:p-16 flex flex-col justify-center space-y-8 shadow-2xl">
            <div>
              <h2 className="text-white text-3xl font-bold tracking-widest uppercase font-headline">
                CONTACT US
              </h2>
              <p className="text-[#f6bd54] text-xs font-bold uppercase tracking-wider mt-2 font-manrope">
                Just fill out the form and let's make your travel plan in minutes!
              </p>
            </div>

            {submitted ? (
              <div className="bg-white/5 border border-white/10 p-8 text-center space-y-4">
                <span className="material-symbols-outlined text-[#CD9933] text-5xl">mark_email_read</span>
                <h4 className="text-white text-lg font-bold uppercase tracking-wider">Plan Request Submitted!</h4>
                <p className="text-white/60 text-xs">
                  Your customized details are sent to a Royal Travels coordinator. We will reach back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <input
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#CD9933] py-3 text-sm text-white placeholder-white/40 outline-none transition-colors"
                    placeholder="Your Name"
                    type="text"
                  />
                </div>
                <div>
                  <input
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#CD9933] py-3 text-sm text-white placeholder-white/40 outline-none transition-colors"
                    placeholder="Your Contact Number"
                    type="tel"
                  />
                </div>
                <div>
                  <input
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#CD9933] py-3 text-sm text-white placeholder-white/40 outline-none transition-colors"
                    placeholder="Your Email Address"
                    type="email"
                  />
                </div>
                <div>
                  <textarea
                    required
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#CD9933] py-3 text-sm text-white placeholder-white/40 outline-none transition-colors resize-none h-24"
                    placeholder="Your Message"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#CD9933] hover:bg-white hover:text-[#013334] text-primary font-bold text-xs uppercase tracking-widest py-4 px-8 transition-colors flex items-center justify-center gap-2 select-none"
                >
                  <span>SEND MESSAGE</span>
                  <span className="material-symbols-outlined text-sm">send</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home3
