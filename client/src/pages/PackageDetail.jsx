import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import background3 from '../assets/home-3.jpg'
import kaabaPackages from '../assets/kaaba_packages.png'
const economyPackagesImg = 'https://alkhidmat.org/backend/images/umrah/intro/177313446569afe2818d15e.png'
const star3PackagesImg = kaabaPackages
const star4PackagesImg = 'https://zamzam.com/blog/wp-content/uploads/2021/05/history-of-Umrah.jpg'
const star5PackagesImg = 'https://newindoha.com/wp-content/uploads/2023/09/20230901_170048-1050x591.jpg'

const API_BASE = import.meta.env.VITE_API_URL || ''

const getProxyUrl = (url) => {
  return url || '';
};

const staticPackages = [
  {
    id: 401,
    title: '21 Nights Saver Economy Umrah',
    location: 'Fundaq Mayer Mayassar & Fursan Al Madinah',
    hotel_name: 'Fundaq Mayer Mayassar & Fursan Al Madinah',
    distance_from_haram: '800m & 350m',
    hotel_makkah: 'Fundaq Mayer Mayassar',
    distance_makkah: '800m from Haram',
    nights_makkah: 12,
    hotel_madinah: 'Fursan Al Madinah',
    distance_madinah: '350m from Nabawi',
    nights_madinah: 8,
    price: 209500,
    days: '21 Nights',
    duration: '21 Nights',
    airline: 'Air Blue',
    category: 'Economy',
    stars: 3,
    badge: '21 Nights',
    image: economyPackagesImg,
    image_url: economyPackagesImg,
    description: 'Perform your holy pilgrimage with our affordable 21-day Economy package. Staying at Mayer Mayassar Mecca and Fursan Al Madinah, offering clean and peaceful accommodation.',
    includes: ['Return Flight', 'E-Visa Processing', 'Shared Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
    itinerary: [
      { day: 'Day 01', title: 'Arrival & Makkah Check-in', description: 'Arrive at Jeddah, transfer to Fundaq Mayer Mayassar Makkah. Perform Umrah.' },
      { day: 'Day 02 - 12', title: 'Makkah Prayers', description: 'Daily prayers in Masjid Al-Haram. Guided Ziyarat of historical sites on Day 3.' },
      { day: 'Day 13 - 20', title: 'Madinah Stay', description: 'Transfer to Madinah, check-in Fursan Al Madinah. Prayers at Masjid Nabawi.' },
      { day: 'Day 21', title: 'Departure', description: 'Final prayers and check-out. Transfer to Jeddah Airport for return flight.' }
    ]
  },
  {
    id: 402,
    title: '21 Nights Comfort Economy Saver',
    location: 'Jedat Al Khalil & Karam Ajyad Hotel',
    hotel_name: 'Jedat Al Khalil & Karam Ajyad Hotel',
    distance_from_haram: '750m & 400m',
    hotel_makkah: 'Jedat Al Khalil',
    distance_makkah: '750m from Haram',
    nights_makkah: 12,
    hotel_madinah: 'Karam Ajyad Hotel',
    distance_madinah: '400m from Nabawi',
    nights_madinah: 8,
    price: 224500,
    days: '21 Nights',
    duration: '21 Nights',
    airline: 'PIA',
    category: 'Economy',
    stars: 3,
    badge: '21 Nights',
    image: economyPackagesImg,
    image_url: economyPackagesImg,
    description: 'A high-value family-oriented economy saver package featuring Jedat Al Khalil Mecca hotel and Karam Ajyad in Madinah.',
    includes: ['Return Flight', 'E-Visa Processing', 'Shared Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
    itinerary: [
      { day: 'Day 01', title: 'Jeddah Arrival', description: 'Arrive at Jeddah Airport, transfer to Jedat Al Khalil Makkah.' },
      { day: 'Day 02 - 12', title: 'Ibadah in Makkah', description: 'Perform 5 daily prayers in Haram. Guided group Ziyarat.' },
      { day: 'Day 13 - 20', title: 'Madinah Serenity', description: 'Transfer to Karam Ajyad Madinah. Daily prayers in Nabawi.' },
      { day: 'Day 21', title: 'Departure', description: 'Transfer to Jeddah airport for return flight.' }
    ]
  },
  {
    id: 403,
    title: '21 Nights Ajyad Standard Economy',
    location: 'Al Juhani Ajyad Hotel & Al Ikram Palace',
    hotel_name: 'Al Juhani Ajyad Hotel & Al Ikram Palace',
    distance_from_haram: '650m & 450m',
    hotel_makkah: 'Al Juhani Ajyad Hotel',
    distance_makkah: '650m from Haram',
    nights_makkah: 12,
    hotel_madinah: 'Al Ikram Palace',
    distance_madinah: '450m from Nabawi',
    nights_madinah: 8,
    price: 235500,
    days: '21 Nights',
    duration: '21 Nights',
    airline: 'Saudi Airlines',
    category: 'Economy',
    stars: 3,
    badge: '21 Nights',
    image: economyPackagesImg,
    image_url: economyPackagesImg,
    description: 'Highly popular choice for pilgrims looking for excellent standard services at a reasonable budget in Ajyad, Makkah.',
    includes: ['Return Flight', 'E-Visa Processing', 'Shared Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
    itinerary: [
      { day: 'Day 01', title: 'Makkah Arrival', description: 'Arrive at Jeddah, proceed to Al Juhani Ajyad Hotel Makkah.' },
      { day: 'Day 02 - 12', title: 'Makkah Stays', description: 'Daily prayers at Haram. Guided historical Ziyarat tours.' },
      { day: 'Day 13 - 20', title: 'Madinah Stays', description: 'Transfer to Al Ikram Madinah. Focus on prayers in Masjid Nabawi.' },
      { day: 'Day 21', title: 'Departure', description: 'Return transfers to Jeddah Airport.' }
    ]
  },
  {
    id: 404,
    title: '21 Nights Extended Special Economy',
    location: 'Maather Al Jiwaar Hotel & Orjawan Al Madinah',
    hotel_name: 'Maather Al Jiwaar Hotel & Orjawan Al Madinah',
    distance_from_haram: '600m & 450m',
    hotel_makkah: 'Maather Al Jiwaar Hotel',
    distance_makkah: '600m from Haram',
    nights_makkah: 12,
    hotel_madinah: 'Orjawan Al Madinah',
    distance_madinah: '450m from Nabawi',
    nights_madinah: 8,
    price: 251500,
    days: '21 Nights',
    duration: '21 Nights',
    airline: 'Air Blue',
    category: 'Economy',
    stars: 3,
    badge: '21 Nights',
    image: economyPackagesImg,
    image_url: economyPackagesImg,
    description: 'Maximize your time in the holy land with our 21-night package. Features Maather Al Jiwaar Makkah and Orjawan Al Madinah.',
    includes: ['Return Flight', 'E-Visa Processing', 'Shared Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
    itinerary: [
      { day: 'Day 01', title: 'Welcome to Makkah', description: 'Arrive in Makkah, check-in to Maather Al Jiwaar Hotel. Complete Umrah.' },
      { day: 'Day 02 - 12', title: 'Makkah Devotions', description: 'Spend peaceful days in Ibadah at Haram. Group Ziyarat.' },
      { day: 'Day 13 - 20', title: 'Madinah Stays', description: 'Transfer to Orjawan Al Madinah. Rest and Ibadah in Masjid Nabawi.' },
      { day: 'Day 21', title: 'Farewell', description: 'Departure transfer to Jeddah Airport.' }
    ]
  },
  {
    id: 501,
    title: '14 Nights 3 Star Comfort Umrah',
    location: 'Al Aseel Ajyad & Al Shourfah Hotel',
    hotel_name: 'Al Aseel Ajyad & Al Shourfah Hotel',
    distance_from_haram: '14 Min Walk & 7 Min Walk',
    hotel_makkah: 'Al Aseel Ajyad',
    distance_makkah: '14 Min Walk / 900m',
    nights_makkah: 7,
    hotel_madinah: 'Al Shourfah Hotel',
    distance_madinah: '7 Min Walk / 450m',
    nights_madinah: 7,
    price: 245500,
    days: '14 Nights',
    duration: '14 Nights',
    airline: 'PIA',
    category: '3 Star',
    stars: 3,
    badge: '3 STAR',
    image: star3PackagesImg,
    image_url: star3PackagesImg,
    description: 'Perform your Umrah with comfort in our 14-night 3-Star package. Staying in close proximity hotels: Al Aseel Ajyad Makkah and Al Shourfah Hotel Madinah.',
    includes: ['E-Visa Processing', 'Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
    itinerary: [
      { day: 'Day 01', title: 'Arrival & Umrah', description: 'Arrive at Jeddah, transfer to Al Aseel Ajyad Makkah. Perform Umrah.' },
      { day: 'Day 02 - 07', title: 'Makkah Prayers', description: 'Pray daily in Masjid Al-Haram. Guided Ziyarat tour on Day 4.' },
      { day: 'Day 08 - 13', title: 'Madinah Stay', description: 'Transfer to Madinah, check-in Al Shourfah Hotel. Prayers at Masjid Nabawi.' },
      { day: 'Day 14', title: 'Departure', description: 'Final prayers and checkout. Transfer to airport for return flight.' }
    ]
  },
  {
    id: 502,
    title: '12 Nights 3 Star Standard Package',
    location: 'Dar El Eiman Al Khalil & Dar El Eiman Al Nour',
    hotel_name: 'Dar El Eiman Al Khalil & Dar El Eiman Al Nour',
    distance_from_haram: '1000m & 200m',
    hotel_makkah: 'Dar El Eiman Al Khalil',
    distance_makkah: '1000m (Shuttle)',
    nights_makkah: 6,
    hotel_madinah: 'Dar El Eiman Al Nour',
    distance_madinah: '200m',
    nights_madinah: 6,
    price: 235500,
    days: '12 Nights',
    duration: '12 Nights',
    airline: 'Saudi Airlines',
    category: '3 Star',
    stars: 3,
    badge: '3 STAR',
    image: star3PackagesImg,
    image_url: star3PackagesImg,
    description: 'Perfect 12-night standard package stay featuring Dar El Eiman Al Khalil in Mecca and Dar El Eiman Al Nour in Madinah.',
    includes: ['E-Visa Processing', 'Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
    itinerary: [
      { day: 'Day 01', title: 'Arrival Makkah', description: 'Arrive Jeddah, transfer to Dar El Eiman Al Khalil Makkah.' },
      { day: 'Day 02 - 06', title: 'Makkah Devotions', description: 'Daily prayers at Haram. Guided cave Hira visits.' },
      { day: 'Day 07 - 11', title: 'Madinah Stays', description: 'Transfer to Dar El Eiman Al Nour Madinah. Prayers at Nabawi.' },
      { day: 'Day 12', title: 'Departure', description: 'Check-out, transfer to airport for return flight.' }
    ]
  },
  {
    id: 503,
    title: '10 Nights 3 Star Comfort Deal',
    location: 'Dorat Dar El Eiman & Elaf Al Bustan',
    hotel_name: 'Dorat Dar El Eiman & Elaf Al Bustan',
    distance_from_haram: '750m & 13 Min Walk',
    hotel_makkah: 'Dorat Dar El Eiman',
    distance_makkah: '750m',
    nights_makkah: 5,
    hotel_madinah: 'Elaf Al Bustan',
    distance_madinah: '13 Min Walk / 800m',
    nights_madinah: 5,
    price: 225500,
    days: '10 Nights',
    duration: '10 Nights',
    airline: 'Gulf Air',
    category: '3 Star',
    stars: 3,
    badge: '3 STAR',
    image: star3PackagesImg,
    image_url: star3PackagesImg,
    description: 'Highly requested 10-night comfort deal. Staying at Dorat Dar El Eiman in Mecca and Elaf Al Bustan in Madinah.',
    includes: ['E-Visa Processing', 'Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
    itinerary: [
      { day: 'Day 01', title: 'Arrival Makkah', description: 'Arrive Jeddah, transfer to Dorat Makkah. Perform Umrah.' },
      { day: 'Day 02 - 05', title: 'Makkah Prayers', description: 'Focus on daily prayers in Haram. Guided historical tours.' },
      { day: 'Day 06 - 09', title: 'Madinah Prayers', description: 'Transfer to Elaf Al Bustan Madinah. Daily prayers in Nabawi.' },
      { day: 'Day 10', title: 'Departure', description: 'Check-out and transfer to airport.' }
    ]
  },
  {
    id: 504,
    title: '7 Nights 3 Star Express Package',
    location: 'Al Thuria Hotel & Amjad Al Gharra',
    hotel_name: 'Al Thuria Hotel & Amjad Al Gharra',
    distance_from_haram: '5 Min Walk & 10 Min Walk',
    hotel_makkah: 'Al Thuria Hotel',
    distance_makkah: '5 Min Walk / 350m',
    nights_makkah: 4,
    hotel_madinah: 'Amjad Al Gharra',
    distance_madinah: '10 Min Walk / 700m',
    nights_madinah: 3,
    price: 215500,
    days: '7 Nights',
    duration: '7 Nights',
    airline: 'PIA',
    category: '3 Star',
    stars: 3,
    badge: '3 STAR',
    image: star3PackagesImg,
    image_url: star3PackagesImg,
    description: 'An express 7-night package stay. Staying at Al Thuria Hotel in Mecca and Amjad Al Gharra in Madinah.',
    includes: ['E-Visa Processing', 'Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
    itinerary: [
      { day: 'Day 01', title: 'Arrival & Umrah', description: 'Check-in Al Thuria Hotel Makkah. Perform Umrah.' },
      { day: 'Day 02 - 04', title: 'Makkah prayers', description: 'Daily prayers at Haram. Guided cave Ziyarat.' },
      { day: 'Day 05 - 06', title: 'Madinah stays', description: 'Proceed to Amjad Al Gharra Madinah. Prayers at Nabawi.' },
      { day: 'Day 07', title: 'Departure', description: 'Return transfer to airport.' }
    ]
  },
  {
    id: 601,
    title: '14 Nights 4 Star Premium Umrah',
    location: 'Ramada Dar Al Faiyzeen & Elaf Taibah',
    hotel_name: 'Ramada Dar Al Faiyzeen & Elaf Taibah',
    distance_from_haram: '10 Min Walk & 12 Min Walk',
    hotel_makkah: 'Ramada Dar Al Faiyzeen',
    distance_makkah: '10 Min Walk / 600m',
    nights_makkah: 7,
    hotel_madinah: 'Elaf Taibah',
    distance_madinah: '12 Min Walk / 800m',
    nights_madinah: 7,
    price: 284000,
    days: '14 Nights',
    duration: '14 Nights',
    airline: 'Saudi Airlines',
    category: '4 Star',
    stars: 4,
    badge: '4 STAR',
    image: star4PackagesImg,
    image_url: star4PackagesImg,
    description: 'Indulge in a premium 4-Star Umrah journey. Features Ramada Dar Al Faiyzeen in Mecca and Elaf Taibah in Madinah. Includes premium ground support and comfort travel.',
    includes: ['E-Visa Processing', 'Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
    itinerary: [
      { day: 'Day 01', title: 'Makkah Arrival', description: 'Arrive Jeddah, transfer to Ramada Makkah. Perform Umrah.' },
      { day: 'Day 02 - 07', title: 'Haram Devotions', description: 'Daily prayers at Haram. Guided group tours of historical sites.' },
      { day: 'Day 08 - 13', title: 'Madinah Serenity', description: 'Transfer to Elaf Taibah Madinah. Rest and Ibadah in Masjid Nabawi.' },
      { day: 'Day 14', title: 'Departure', description: 'Final prayers, check-out, transfer to airport.' }
    ]
  },
  {
    id: 602,
    title: '12 Nights 4 Star Executive Umrah',
    location: 'Nawazi Watheer & Al Mukhtara',
    hotel_name: 'Nawazi Watheer & Al Mukhtara',
    distance_from_haram: '700m & 5 Min Drive',
    hotel_makkah: 'Nawazi Watheer',
    distance_makkah: '700m',
    nights_makkah: 6,
    hotel_madinah: 'Al Mukhtara',
    distance_madinah: '5 Min Drive / 1.5 km (Shuttle)',
    nights_madinah: 6,
    price: 278000,
    days: '12 Nights',
    duration: '12 Nights',
    airline: 'Gulf Air',
    category: '4 Star',
    stars: 4,
    badge: '4 STAR',
    image: star4PackagesImg,
    image_url: star4PackagesImg,
    description: 'Outstanding executive stay featuring Nawazi Watheer in Makkah and Al Mukhtara in Madinah. Comfort and quality guaranteed.',
    includes: ['E-Visa Processing', 'Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
    itinerary: [
      { day: 'Day 01', title: 'Arrival Makkah', description: 'Transfer to Nawazi Watheer Makkah. Perform Umrah.' },
      { day: 'Day 02 - 06', title: 'Makkah Stay', description: 'Daily prayers in Haram. Guided group Ziyarat.' },
      { day: 'Day 07 - 11', title: 'Madinah Stay', description: 'Transfer to Al Mukhtara Madinah. Prayers at Nabawi.' },
      { day: 'Day 12', title: 'Departure', description: 'Check-out and transfer to airport.' }
    ]
  },
  {
    id: 603,
    title: '10 Nights 4 Star Comfort Deal',
    location: 'Dar El Eiman Grand & Al Eiman Al Manar',
    hotel_name: 'Dar El Eiman Grand & Al Eiman Al Manar',
    distance_from_haram: '750m & 12 Min Walk',
    hotel_makkah: 'Dar El Eiman Grand',
    distance_makkah: '750m',
    nights_makkah: 5,
    hotel_madinah: 'Al Eiman Al Manar',
    distance_madinah: '12 Min Walk / 800m',
    nights_madinah: 5,
    price: 267500,
    days: '10 Nights',
    duration: '10 Nights',
    airline: 'PIA',
    category: '4 Star',
    stars: 4,
    badge: '4 STAR',
    image: star4PackagesImg,
    image_url: star4PackagesImg,
    description: 'Our standard 10-night executive package. Stay at Dar El Eiman Grand Makkah and Al Eiman Al Manar Madinah.',
    includes: ['E-Visa Processing', 'Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
    itinerary: [
      { day: 'Day 01', title: 'Welcome to Makkah', description: 'Arrive Jeddah, transfer to Dar El Eiman Grand. Perform Umrah.' },
      { day: 'Day 02 - 05', title: 'Makkah Prayers', description: 'Prayers in Haram. Group Ziyarat to Mina & Arafat.' },
      { day: 'Day 06 - 09', title: 'Madinah Nabawi', description: 'Transfer to Al Eiman Al Manar Madinah. Ibadah and Quba visits.' },
      { day: 'Day 10', title: 'Departure', description: 'Check-out, transfer to airport.' }
    ]
  },
  {
    id: 604,
    title: '7 Nights 4 Star Express Package',
    location: 'Amjad Al Diyafah & Elaf Meshal Al Salam',
    hotel_name: 'Amjad Al Diyafah & Elaf Meshal Al Salam',
    distance_from_haram: '800m & 13 Min Walk',
    hotel_makkah: 'Amjad Al Diyafah',
    distance_makkah: '800m',
    nights_makkah: 4,
    hotel_madinah: 'Elaf Meshal Al Salam',
    distance_madinah: '13 Min Walk / 850m',
    nights_madinah: 3,
    price: 255000,
    days: '7 Nights',
    duration: '7 Nights',
    airline: 'Saudi Airlines',
    category: '4 Star',
    stars: 4,
    badge: '4 STAR',
    image: star4PackagesImg,
    image_url: star4PackagesImg,
    description: 'Short and spiritually active executive package. Stay 4 Nights in Amjad Al Diyafah (Makkah) and 3 Nights in Elaf Meshal Al Salam (Madinah).',
    includes: ['E-Visa Processing', 'Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
    itinerary: [
      { day: 'Day 01', title: 'Arrive & Umrah', description: 'Check-in Amjad Al Diyafah Makkah. Complete Umrah.' },
      { day: 'Day 02 - 04', title: 'Makkah Devotions', description: 'Daily prayers at Haram. Guided cave Ziyarat.' },
      { day: 'Day 05 - 06', title: 'Madinah Nabawi', description: 'Proceed to Elaf Meshal Al Salam. Prayers at Nabawi.' },
      { day: 'Day 07', title: 'Departure', description: 'Return transfer to airport.' }
    ]
  },
  {
    id: 701,
    title: '14 Nights 5 Star Cheap Umrah Package',
    location: 'Holiday Inn Makkah & Province Al Sham Hotel',
    hotel_name: 'Holiday Inn Makkah & Province Al Sham Hotel',
    distance_from_haram: '10 Min Shuttle & 2 Min Walk',
    hotel_makkah: 'Holiday Inn Makkah',
    distance_makkah: '5 km (Free Shuttle)',
    nights_makkah: 7,
    hotel_madinah: 'Province Al Sham Hotel',
    distance_madinah: '2 Min Walk / 150m',
    nights_madinah: 7,
    price: 289500,
    days: '14 Nights',
    duration: '14 Nights',
    airline: 'Emirates',
    category: '5 Star',
    stars: 5,
    badge: '5 STAR',
    image: star5PackagesImg,
    image_url: star5PackagesImg,
    description: 'All-inclusive 5-Star luxury package on a budget. Stay at Holiday Inn Makkah and Province Al Sham Hotel in Madinah. Includes premium ground support and breakfast.',
    includes: ['E-Visa Processing', 'Ground Transport', 'Accomodations', 'FREE Breakfast', '24/7 Pilgrims Support'],
    itinerary: [
      { day: 'Day 01', title: 'VIP Arrival Makkah', description: 'Arrive Jeddah, private transfer to Holiday Inn Makkah. Complete Umrah.' },
      { day: 'Day 02 - 07', title: 'Makkah Devotions', description: 'Daily prayers in Masjid Al-Haram. Private Ziyarat of holy landmarks.' },
      { day: 'Day 08 - 13', title: 'Madinah Stay', description: 'GMC transfer to Province Al Sham Madinah. Ibadah at Nabawi and private historic tours.' },
      { day: 'Day 14', title: 'Departure', description: 'Final prayers, checkout, private transfer to Jeddah airport for return flight.' }
    ]
  },
  {
    id: 702,
    title: '12 Nights 5 Star Umrah Package',
    location: 'Hyatt Regency & Majlis Grand Mercure',
    hotel_name: 'Hyatt Regency & Majlis Grand Mercure',
    distance_from_haram: '1 Min Walk & 200m',
    hotel_makkah: 'Hyatt Regency',
    distance_makkah: '1 Min Walk / 100m',
    nights_makkah: 6,
    hotel_madinah: 'Majlis Grand Mercure',
    distance_madinah: '200m',
    nights_madinah: 6,
    price: 279500,
    days: '12 Nights',
    duration: '12 Nights',
    airline: 'Saudi Airlines',
    category: '5 Star',
    stars: 5,
    badge: '5 STAR',
    image: star5PackagesImg,
    image_url: star5PackagesImg,
    description: '12-day premium stay featuring Hyatt Regency in Mecca and Majlis Grand Mercure in Madinah.',
    includes: ['E-Visa Processing', 'Ground Transport', 'Accomodations', 'FREE Breakfast', '24/7 Pilgrims Support'],
    itinerary: [
      { day: 'Day 01', title: 'Arrival Makkah', description: 'Arrive Jeddah, transfer to Hyatt Regency Makkah. Perform Umrah.' },
      { day: 'Day 02 - 06', title: 'Makkah Prayers', description: 'Pray daily in Masjid Al-Haram. Guided Ziyarat of holy sites.' },
      { day: 'Day 07 - 11', title: 'Madinah Nabawi', description: 'Transfer to Majlis Grand Mercure. Rest and prayers in Nabawi.' },
      { day: 'Day 12', title: 'Departure', description: 'Final prayers, check-out, transfer to airport.' }
    ]
  },
  {
    id: 703,
    title: '10 Nights 5 Star Umrah Package',
    location: 'Anjum Hotel & Al Haram Hotel',
    hotel_name: 'Anjum Hotel & Al Haram Hotel',
    distance_from_haram: '3 Min Walk & 2 Min Walk',
    hotel_makkah: 'Anjum Hotel',
    distance_makkah: '3 Min Walk / 250m',
    nights_makkah: 5,
    hotel_madinah: 'Al Haram Hotel',
    distance_madinah: '2 Min Walk / 150m',
    nights_madinah: 5,
    price: 269500,
    days: '10 Nights',
    duration: '10 Nights',
    airline: 'Gulf Air',
    category: '5 Star',
    stars: 5,
    badge: '5 STAR',
    image: star5PackagesImg,
    image_url: star5PackagesImg,
    description: 'Maximize your spiritual comfort with our 10-night 5-star package. Stay at Anjum Hotel in Mecca and Al Haram Hotel in Madinah.',
    includes: ['E-Visa Processing', 'Ground Transport', 'Accomodations', 'FREE Breakfast', '24/7 Pilgrims Support'],
    itinerary: [
      { day: 'Day 01', title: 'Makkah Check-in', description: 'Arrive Jeddah, transfer to Anjum Hotel Makkah. Perform Umrah.' },
      { day: 'Day 02 - 05', title: 'Makkah Prayers', description: 'Daily prayers at Haram. Historical Ziyarat tours.' },
      { day: 'Day 06 - 09', title: 'Madinah Stay', description: 'Transfer to Al Haram Madinah. Rest and Ibadah at Masjid Nabawi.' },
      { day: 'Day 10', title: 'Departure', description: 'Checkout and return transfer to airport.' }
    ]
  },
  {
    id: 704,
    title: '7 Nights 5 Star Umrah Package',
    location: 'Al Shohada Makkah & Al Emaan Royal',
    hotel_name: 'Al Shohada Makkah & Al Emaan Royal',
    distance_from_haram: '6 Min Walk & 2 Min Walk',
    hotel_makkah: 'Al Shohada Makkah',
    distance_makkah: '6 Min Walk / 400m',
    nights_makkah: 4,
    hotel_madinah: 'Al Emaan Royal',
    distance_madinah: '2 Min Walk / 200m',
    nights_madinah: 3,
    price: 235500,
    days: '7 Nights',
    duration: '7 Nights',
    airline: 'Saudi Airlines',
    category: '5 Star',
    stars: 5,
    badge: '5 STAR',
    image: star5PackagesImg,
    image_url: star5PackagesImg,
    description: 'An elite 7-night spiritual stay. Staying at Al Shohada Hotel in Mecca and Al Emaan Royal in Madinah.',
    includes: ['E-Visa Processing', 'Ground Transport', 'Accomodations', 'FREE Breakfast', '24/7 Pilgrims Support'],
    itinerary: [
      { day: 'Day 01', title: 'Arrival Makkah', description: 'Check-in Al Shohada Hotel Makkah. Complete Umrah under scholar guidance.' },
      { day: 'Day 02 - 04', title: 'Makkah Stays', description: 'Prayers at Masjid Al-Haram. Focus on Ibadah.' },
      { day: 'Day 05 - 06', title: 'Madinah Nabawi', description: 'Proceed to Al Emaan Royal Madinah. Daily prayers in Nabawi.' },
      { day: 'Day 07', title: 'Departure', description: 'Transfer to Jeddah airport for flight home.' }
    ]
  }
]

const getCategoryPresets = (categoryName, title) => {
  const cat = (categoryName || '').toLowerCase()
  const tit = (title || '').toLowerCase()
  
  if (cat.includes('economy') || tit.includes('economy')) {
    return {
      includes: [
        'Return Flight',
        'E-Visa Processing',
        'Shared Ground Transport',
        'Accomodations',
        'Health Insurance',
        '24/7 Pilgrims Support'
      ],
      not_includes: [
        'Meals',
        'Travel insurance',
        'Laundry and room service charges'
      ]
    }
  } else if (
    cat.includes('classic') || cat.includes('premium') || cat.includes('3 star') || cat.includes('3star') || cat.includes('4 star') || cat.includes('4star') ||
    tit.includes('classic') || tit.includes('premium') || tit.includes('3 star') || tit.includes('3star') || tit.includes('4 star') || tit.includes('4star')
  ) {
    return {
      includes: [
        'E-Visa Processing',
        'Ground Transport',
        'Accomodations',
        'Health Insurance',
        '24/7 Pilgrims Support'
      ],
      not_includes: [
        'Return Flight',
        'Meals',
        'Travel insurance',
        'Laundry and room service charges'
      ]
    }
  } else if (
    cat.includes('luxury') || cat.includes('5 star') || cat.includes('5star') ||
    tit.includes('luxury') || tit.includes('5 star') || tit.includes('5star')
  ) {
    return {
      includes: [
        'E-Visa Processing',
        'Ground Transport',
        'Accomodations',
        'FREE Breakfast',
        'Health Insurance',
        '24/7 Pilgrims Support'
      ],
      not_includes: [
        'Return Flight',
        'Laundry and room service charges',
        'Travel insurance'
      ]
    }
  }
  return null
}

const getNightsCount = (pkg) => {
  if (!pkg) return { makkah: 0, madinah: 0 };
  
  if (pkg.nights_makkah !== undefined && pkg.nights_madinah !== undefined) {
    return { makkah: pkg.nights_makkah, madinah: pkg.nights_madinah };
  }
  if (pkg.makkah_nights !== undefined && pkg.madinah_nights !== undefined) {
    return { makkah: pkg.makkah_nights, madinah: pkg.madinah_nights };
  }
  
  const title = (pkg.title || '').toLowerCase();
  const desc = (pkg.description || '').toLowerCase();
  
  if (title.includes('21 nights') || desc.includes('21 nights') || title.includes('21 days') || desc.includes('21 days') || (pkg.duration && pkg.duration.includes('21'))) {
    return { makkah: 12, madinah: 8 };
  }
  if (title.includes('15 nights') || title.includes('15 days') || (pkg.duration && pkg.duration.includes('15'))) {
    return { makkah: 8, madinah: 7 };
  }
  if (title.includes('14 nights') || title.includes('14 days') || (pkg.duration && pkg.duration.includes('14'))) {
    return { makkah: 7, madinah: 7 };
  }
  if (title.includes('12 nights') || title.includes('12 days') || (pkg.duration && pkg.duration.includes('12'))) {
    return { makkah: 6, madinah: 6 };
  }
  if (title.includes('10 nights') || title.includes('10 days') || (pkg.duration && pkg.duration.includes('10'))) {
    return { makkah: 5, madinah: 5 };
  }
  if (title.includes('7 nights') || title.includes('7 days') || (pkg.duration && pkg.duration.includes('7'))) {
    return { makkah: 4, madinah: 3 };
  }

  const durationStr = (pkg.duration || pkg.days || '');
  const match = durationStr.match(/(\d+)\s*(?:night|day)/i);
  if (match) {
    const total = parseInt(match[1]);
    const makkah = Math.ceil(total * 0.6);
    const madinah = total - makkah;
    return { makkah, madinah };
  }
  
  return { makkah: 7, madinah: 7 };
}

const PackageDetail = () => {
  const { id } = useParams()
  const [pkg, setPkg] = useState(null)
  const [loading, setLoading] = useState(true)
  const [morePackages, setMorePackages] = useState([])

  useEffect(() => {
    setLoading(true)
    axios.get(`${API_BASE}/api/packages/${id}`)
      .then(res => {
        // Ensure includes and not_includes are always arrays
        const data = res.data
        if (data.includes && typeof data.includes === 'string') {
          data.includes = data.includes.split(',').map(s => s.trim())
        }
        if (data.not_includes && typeof data.not_includes === 'string') {
          data.not_includes = data.not_includes.split(',').map(s => s.trim())
        }
        setPkg(data)
        setLoading(false)

        // Fetch all packages to populate "More Packages" dynamically
        return axios.get(`${API_BASE}/api/packages`)
      })
      .then(res => {
        if (res && Array.isArray(res.data) && res.data.length > 0) {
          const currentCategory = res.data.find(p => String(p.id) === String(id))?.category || ''
          const filtered = res.data.filter(p => String(p.id) !== String(id))
          const matching = filtered.filter(p => p.category?.toLowerCase().trim() === currentCategory.toLowerCase().trim())
          if (matching.length >= 3) {
            setMorePackages(matching.slice(0, 3))
          } else {
            const merged = [...matching, ...filtered.filter(p => p.category?.toLowerCase().trim() !== currentCategory.toLowerCase().trim())]
            setMorePackages(merged.slice(0, 3))
          }
        } else {
          const staticPkg = staticPackages.find(p => String(p.id) === String(id))
          const currentCategory = staticPkg?.category || ''
          const filtered = staticPackages.filter(p => String(p.id) !== String(id))
          const matching = filtered.filter(p => p.category?.toLowerCase().trim() === currentCategory.toLowerCase().trim())
          const merged = [...matching, ...filtered.filter(p => p.category?.toLowerCase().trim() !== currentCategory.toLowerCase().trim())]
          setMorePackages(merged.slice(0, 3))
        }
      })
      .catch(err => {
        console.error('Error fetching package details or list:', err)
        const staticPkg = staticPackages.find(p => String(p.id) === String(id))
        if (staticPkg) {
          setPkg(staticPkg)
        }
        setLoading(false)

        // Fallback for more packages using static fallback array
        const currentCategory = staticPkg?.category || ''
        const filtered = staticPackages.filter(p => String(p.id) !== String(id))
        const matching = filtered.filter(p => p.category?.toLowerCase().trim() === currentCategory.toLowerCase().trim())
        const merged = [...matching, ...filtered.filter(p => p.category?.toLowerCase().trim() !== currentCategory.toLowerCase().trim())]
        setMorePackages(merged.slice(0, 3))
      })
  }, [id])

  if (loading) {
    return (
      <div className="bg-surface font-manrope text-on-surface min-h-screen flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#CD9933] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-notoSerif text-xl text-primary">Loading Package Details...</p>
        </div>
      </div>
    )
  }

  if (!pkg) {
    return (
      <div className="bg-surface font-manrope text-on-surface min-h-screen flex flex-col items-center justify-center">
        <Navbar />
        <div className="text-center mt-24">
          <span className="material-symbols-outlined text-6xl text-error mb-4 block">error</span>
          <h2 className="font-notoSerif text-3xl text-primary mb-4">Package Not Found</h2>
          <Link to="/packages" className="bg-[#CD9933] text-white px-8 py-3 rounded font-bold uppercase tracking-widest text-sm inline-block mt-4">Browse All Packages</Link>
        </div>
      </div>
    )
  }

  const price = typeof pkg.price === 'number' ? pkg.price : (parseFloat(String(pkg.price).replace(/[^0-9.]/g, '')) || 0)
  const hotelName = pkg.hotel_name || pkg.hotelName || pkg.location || 'Premium Hotel'
  const distance = pkg.distance_from_haram || pkg.distanceFromHaram || 'Steps to Haram'
  const { makkah: makkahNights, madinah: madinahNights } = getNightsCount(pkg)

  return (
    <div className="bg-surface font-manrope text-on-surface">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" src={background3} alt={pkg.title} />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-4">
                {pkg.badge && <span className="bg-[#CD9933] text-white font-bold text-xs tracking-widest uppercase px-3 py-1 rounded">{pkg.badge}</span>}
                <div className="flex text-[#CD9933]">
                  {Array.from({ length: pkg.stars || 5 }).map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  ))}
                </div>
              </div>
              <h1 className="font-notoSerif text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white leading-tight tracking-tight">{pkg.title || 'Umrah Journey'}</h1>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <p className="text-white/70 font-medium mb-2">Starting from</p>
              <div className="font-notoSerif text-2xl md:text-3xl lg:text-4xl text-[#CD9933]">PKR {price.toLocaleString()} <span className="text-sm md:text-lg font-manrope text-white/70 font-normal">/ person</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 md:py-16 px-4 sm:px-6 md:px-8 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left Column: Details */}
          <div className="lg:col-span-8 space-y-12 md:space-y-16">


            {/* Nights & Accommodations Section with Bigger View */}
            <div>
              <h2 className="font-notoSerif text-3xl mb-8 flex items-center gap-4">
                Nights & Accommodations
                <span className="h-px flex-grow bg-outline-variant/30"></span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Makkah Card */}
                <div className="relative overflow-hidden bg-[#013334] text-white p-8 rounded-2xl border border-[#CD9933]/20 shadow-xl group hover:border-[#CD9933]/50 transition-all duration-300">
                  <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-[#CD9933]/5 rounded-full blur-2xl group-hover:bg-[#CD9933]/10 transition-all duration-500"></div>
                  
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <span className="bg-[#CD9933] text-white text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded">Makkah Al-Mukarramah</span>
                        {(pkg.distance_makkah || distance) && (
                          <span className="text-white/60 text-xs font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm text-[#CD9933]">location_on</span> 
                            {pkg.distance_makkah || distance}
                          </span>
                        )}
                      </div>
                      
                      {/* Big Nights View */}
                      <div className="mb-6">
                        <span className="block font-notoSerif text-5xl md:text-6xl font-extrabold text-[#CD9933] tracking-tight">
                          {makkahNights} <span className="text-xl font-manrope font-light text-white/80">Nights</span>
                        </span>
                      </div>
                      
                      <h4 className="font-notoSerif text-2xl font-bold text-white mb-2">{pkg.hotel_makkah || hotelName}</h4>
                      <p className="text-white/70 text-xs leading-relaxed mb-6 font-light">
                        Experience deep spiritual devotion with clean, peaceful lodging located near the Holy Kaaba.
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10 text-white/80">
                      <span className="flex items-center gap-1.5 text-xs font-bold"><span className="material-symbols-outlined text-sm text-[#CD9933]">wifi</span> Free WiFi</span>
                      <span className="flex items-center gap-1.5 text-xs font-bold"><span className="material-symbols-outlined text-sm text-[#CD9933]">ac_unit</span> Central AC</span>
                      <span className="flex items-center gap-1.5 text-xs font-bold"><span className="material-symbols-outlined text-sm text-[#CD9933]">support_agent</span> Support</span>
                    </div>
                  </div>
                </div>

                {/* Madinah Card */}
                <div className="relative overflow-hidden bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 shadow-xl group hover:border-[#CD9933]/30 transition-all duration-300">
                  <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-[#CD9933]/5 rounded-full blur-2xl group-hover:bg-[#CD9933]/10 transition-all duration-500"></div>
                  
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <span className="bg-[#013334] text-white text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded">Madinah Al-Munawwarah</span>
                        {(pkg.distance_madinah || (pkg.hotel_madinah ? '350m from Nabawi' : '')) && (
                          <span className="text-on-surface-variant text-xs font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm text-[#CD9933]">location_on</span> 
                            {pkg.distance_madinah || '350m from Nabawi'}
                          </span>
                        )}
                      </div>
                      
                      {/* Big Nights View */}
                      <div className="mb-6">
                        <span className="block font-notoSerif text-5xl md:text-6xl font-extrabold text-[#CD9933] tracking-tight">
                          {madinahNights} <span className="text-xl font-manrope font-light text-on-surface-variant">Nights</span>
                        </span>
                      </div>
                      
                      <h4 className="font-notoSerif text-2xl font-bold text-primary mb-2">{pkg.hotel_madinah || 'Fursan Al Madinah'}</h4>
                      <p className="text-on-surface-variant text-xs leading-relaxed mb-6 font-light">
                        Perform your prayers at Masjid An-Nabawi in comfort with tranquil stays prepared for your journey.
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 pt-4 border-t border-outline-variant/20 text-on-surface-variant">
                      <span className="flex items-center gap-1.5 text-xs font-bold"><span className="material-symbols-outlined text-sm text-[#CD9933]">wifi</span> Free WiFi</span>
                      <span className="flex items-center gap-1.5 text-xs font-bold"><span className="material-symbols-outlined text-sm text-[#CD9933]">ac_unit</span> Central AC</span>
                      <span className="flex items-center gap-1.5 text-xs font-bold"><span className="material-symbols-outlined text-sm text-[#CD9933]">support_agent</span> Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
              <div>
                <h3 className="font-notoSerif text-xl mb-6">What's Included</h3>
                <ul className="space-y-4">
                  {(() => {
                    const presets = getCategoryPresets(pkg.category, pkg.title);
                    const includesList = presets ? presets.includes : (Array.isArray(pkg.includes) ? pkg.includes : String(pkg.includes || 'Visa Processing,Flights,Ground Transport,Guided Tours').split(',').map(s => s.trim()).filter(Boolean));
                    return includesList.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm">
                        <span className="material-symbols-outlined text-[#CD9933] text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        {item}
                      </li>
                    ));
                  })()}
                </ul>
              </div>
              <div>
                <h3 className="font-notoSerif text-xl mb-6">Not Included</h3>
                <ul className="space-y-4">
                  {(() => {
                    const presets = getCategoryPresets(pkg.category, pkg.title);
                    const notIncludesList = presets ? presets.not_includes : (pkg.not_includes && pkg.not_includes.length > 0 ? (Array.isArray(pkg.not_includes) ? pkg.not_includes : String(pkg.not_includes).split(',').map(s => s.trim()).filter(Boolean)) : []);
                    const defaultNotIncludes = [
                      'Personal shopping & extra meals',
                      'Travel insurance',
                      'Laundry and room service charges'
                    ];
                    const finalNotIncludes = notIncludesList.length > 0 ? notIncludesList : defaultNotIncludes;
                    return finalNotIncludes.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-error/40 text-lg">cancel</span>
                        {item}
                      </li>
                    ));
                  })()}
                </ul>
              </div>
            </div>

            {/* Itinerary Timeline - HIDDEN FOR NOW */}
            {/* 
            {pkg.itinerary && pkg.itinerary.length > 0 && (
              <div>
                <h2 className="font-notoSerif text-3xl mb-8">Journey Itinerary</h2>
                <div className="relative pl-6 md:pl-8 border-l-2 border-dashed border-[#CD9933]/30 ml-2 md:ml-4 space-y-8 md:space-y-10">
                  {pkg.itinerary.map((step, idx) => {
                    const isLast = idx === pkg.itinerary.length - 1
                    return (
                      <div key={idx} className="relative">
                        <div className={`absolute -left-[41px] top-0 w-4 h-4 rounded-full ring-4 ${isLast ? 'bg-[#CD9933] ring-[#CD9933]/20' : 'bg-[#7d5800] ring-[#7d5800]/20'}`}></div>
                        <p className="text-[#CD9933] font-bold text-xs uppercase mb-1">{step.day}</p>
                        <h4 className="font-notoSerif text-lg mb-2">{step.title}</h4>
                        <p className="text-on-surface-variant text-sm leading-relaxed">{step.description}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
            */}
          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 bg-surface-container-lowest p-4 md:p-6 lg:p-8 rounded-xl editorial-shadow border border-outline-variant/10">
              <div className="text-center mb-8">
                <h3 className="font-notoSerif text-2xl mb-2">Plan Your Journey</h3>
                <p className="text-on-surface-variant text-xs">Fill the form below, and our consultant will contact you within 24 hours.</p>
              </div>
              <form className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-1">Full Name</label>
                  <input className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 transition-colors py-2 text-sm" placeholder="Enter your name" type="text" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-1">Phone Number</label>
                  <input className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 transition-colors py-2 text-sm" placeholder="+92 XXXXX XXXXX" type="tel" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-1">City</label>
                    <input className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 transition-colors py-2 text-sm" placeholder="e.g. Lahore" type="text" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-1">Travelers</label>
                    <select className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 transition-colors py-2 text-sm appearance-none">
                      <option>01 Person</option>
                      <option>02 Persons</option>
                      <option>04+ Persons</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-1">Estimated Date</label>
                  <input className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-[#CD9933] focus:ring-0 transition-colors py-2 text-sm" type="date" />
                </div>
                <button className="w-full bg-gradient-to-r from-[#7d5800] to-[#CD9933] text-white py-4 rounded-md font-bold text-sm tracking-widest uppercase shadow-lg shadow-[#7d5800]/20 hover:scale-[1.02] transition-transform" type="submit">Send Inquiry</button>
              </form>
              <div className="mt-8 pt-8 border-t border-outline-variant/20 text-center">
                <p className="text-xs text-on-surface-variant mb-4">Or connect instantly via</p>
                <a className="inline-flex items-center gap-2 text-[#013334] font-bold hover:text-[#CD9933] transition-colors" href="#">
                  <span className="material-symbols-outlined">chat</span>
                  WhatsApp Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Packages */}
      <section className="py-12 md:py-16 bg-surface-container-low px-4 sm:px-6 md:px-8">
        <div className="max-w-screen-2xl mx-auto">
          <h2 className="font-notoSerif text-3xl mb-8">More Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {morePackages.map(p => {
              const staticPkg = staticPackages.find(sp => String(sp.id) === String(p.id))
              const image = p.image_url || p.image || staticPkg?.image || economyPackagesImg
              const badge = p.badge || staticPkg?.badge || ''
              const duration = p.duration || p.days || staticPkg?.days || '15 Days'
              const price = typeof p.price === 'number' ? p.price : (parseFloat(String(p.price).replace(/[^0-9.]/g, '')) || 0)

              return (
                <Link to={`/package/${p.id}`} key={p.id} className="bg-surface-container-lowest editorial-shadow overflow-hidden group cursor-pointer transition-transform hover:-translate-y-1 block">
                  <div className="relative h-48 overflow-hidden">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={getProxyUrl(image)} alt={p.title} />
                    {badge && (
                      <div className="absolute top-4 left-4 bg-[#CD9933] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded">{badge}</div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-notoSerif text-lg font-bold text-primary mb-1 line-clamp-1">{p.title}</h3>
                    <p className="text-on-surface-variant text-sm mb-3">{duration}</p>
                    <span className="text-xl font-extrabold text-[#CD9933]">PKR {price.toLocaleString()}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default PackageDetail
