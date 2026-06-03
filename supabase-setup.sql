-- =============================================
-- REHMAN UMRAH & TRAVELS - SUPABASE SETUP
-- Run this SQL in your Supabase SQL Editor
-- =============================================

-- CLEANUP (Ensures a clean setup with the correct schema)
DROP TABLE IF EXISTS packages CASCADE;
DROP TABLE IF EXISTS tours CASCADE;
DROP TABLE IF EXISTS visa_services CASCADE;
DROP TABLE IF EXISTS gallery CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS cms_content CASCADE;

-- 1. PACKAGES TABLE
CREATE TABLE IF NOT EXISTS packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC,
  category TEXT DEFAULT 'Economy',
  duration TEXT,
  location TEXT,
  hotel_name TEXT,
  distance_from_haram TEXT,
  hotel_makkah TEXT,
  distance_makkah TEXT,
  hotel_madinah TEXT,
  distance_madinah TEXT,
  image_url TEXT,
  airline TEXT,
  stars INTEGER DEFAULT 4,
  badge TEXT,
  includes TEXT[],
  not_includes TEXT[],
  itinerary JSONB,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. INTERNATIONAL TOURS TABLE
CREATE TABLE IF NOT EXISTS tours (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  price NUMERIC,
  duration TEXT,
  image_url TEXT,
  highlights TEXT[],
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. VISA SERVICES TABLE
CREATE TABLE IF NOT EXISTS visa_services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  processing_time TEXT,
  fee TEXT,
  icon TEXT DEFAULT 'description',
  documents TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. GALLERY TABLE
CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  src TEXT NOT NULL,
  label TEXT,
  category TEXT DEFAULT 'Kaaba',
  type TEXT DEFAULT 'standard',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. BLOG POSTS TABLE
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT,
  image_url TEXT,
  read_time TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. CMS CONTENT TABLE
CREATE TABLE IF NOT EXISTS cms_content (
  id TEXT PRIMARY KEY,
  content JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- =============================================

ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE visa_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_content ENABLE ROW LEVEL SECURITY;

-- =============================================
-- RLS POLICIES - PUBLIC READ, ADMIN WRITE
-- =============================================

-- Packages: Anyone can read, authenticated users can write
CREATE POLICY "Public can view packages" ON packages FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert packages" ON packages FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update packages" ON packages FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete packages" ON packages FOR DELETE USING (auth.role() = 'authenticated');

-- Tours: Anyone can read, authenticated users can write
CREATE POLICY "Public can view tours" ON tours FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert tours" ON tours FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update tours" ON tours FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete tours" ON tours FOR DELETE USING (auth.role() = 'authenticated');

-- Visa: Anyone can read, authenticated users can write
CREATE POLICY "Public can view visa services" ON visa_services FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert visa services" ON visa_services FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update visa services" ON visa_services FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete visa services" ON visa_services FOR DELETE USING (auth.role() = 'authenticated');

-- Gallery: Anyone can read, authenticated users can write
CREATE POLICY "Public can view gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert gallery" ON gallery FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update gallery" ON gallery FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete gallery" ON gallery FOR DELETE USING (auth.role() = 'authenticated');

-- Blog: Anyone can read, authenticated users can write
CREATE POLICY "Public can view blog posts" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert blog posts" ON blog_posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update blog posts" ON blog_posts FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete blog posts" ON blog_posts FOR DELETE USING (auth.role() = 'authenticated');

-- CMS Content: Public can read, authenticated users can write
CREATE POLICY "Public can view cms content" ON cms_content FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert cms content" ON cms_content FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update cms content" ON cms_content FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete cms content" ON cms_content FOR DELETE USING (auth.role() = 'authenticated');

-- =============================================
-- SEED DATA - PACKAGES
-- =============================================

-- ECONOMY PACKAGES (4 Packages)
INSERT INTO packages (title, description, price, category, duration, location, hotel_name, distance_from_haram, hotel_makkah, distance_makkah, hotel_madinah, distance_madinah, image_url, airline, stars, badge, includes, itinerary) VALUES
('21 Nights Saver Economy Umrah', 'Perform your holy pilgrimage with our affordable 21-day Economy package. Staying at Mayer Mayassar Mecca and Fursan Al Madinah, offering clean and peaceful accommodation.', 209500, 'Economy', '21 Days', 'Makkah & Madinah', 'Fundaq Mayer Mayassar', '800m from Haram', 'Fundaq Mayer Mayassar', '800m from Haram', 'Fursan Al Madinah', '350m from Nabawi', 'https://images.unsplash.com/photo-1591604129909-2b4ce4e6e6d2?w=800&q=80', 'Air Blue', 3, 'Best Price', 
 ARRAY['Return Flight', 'E-Visa Processing', 'Shared Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
 '[{"day":"Day 01","title":"Arrival & Makkah Check-in","description":"Arrive at Jeddah, transfer to Fundaq Mayer Mayassar Makkah. Perform Umrah."},{"day":"Day 02 - 12","title":"Makkah Prayers","description":"Daily prayers in Masjid Al-Haram. Guided Ziyarat of historical sites on Day 3."},{"day":"Day 13 - 20","title":"Madinah Stay","description":"Transfer to Madinah, check-in Fursan Al Madinah. Prayers at Masjid Nabawi."},{"day":"Day 21","title":"Departure","description":"Final prayers and check-out. Transfer to Jeddah Airport for return flight."}]'::jsonb),

('21 Nights Comfort Economy Saver', 'A high-value family-oriented economy saver package featuring Jedat Al Khalil Mecca hotel and Karam Ajyad in Madinah.', 224500, 'Economy', '21 Days', 'Makkah & Madinah', 'Jedat Al Khalil', '750m from Haram', 'Jedat Al Khalil', '750m from Haram', 'Karam Ajyad Hotel', '400m from Nabawi', 'https://images.unsplash.com/photo-1564769662533-3f5aae93cec2?w=800&q=80', 'PIA', 3, 'Popular Saver', 
 ARRAY['Return Flight', 'E-Visa Processing', 'Shared Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
 '[{"day":"Day 01","title":"Jeddah Arrival","description":"Arrive at Jeddah Airport, transfer to Jedat Al Khalil Makkah."},{"day":"Day 02 - 12","title":"Ibadah in Makkah","description":"Perform 5 daily prayers in Haram. Guided group Ziyarat."},{"day":"Day 13 - 20","title":"Madinah Serenity","description":"Transfer to Karam Ajyad Madinah. Daily prayers in Nabawi."},{"day":"Day 21","title":"Departure","description":"Transfer to Jeddah airport for return flight."}]'::jsonb),

('21 Nights Ajyad Standard Economy', 'Highly popular choice for pilgrims looking for excellent standard services at a reasonable budget in Ajyad, Makkah.', 235500, 'Economy', '21 Days', 'Makkah & Madinah', 'Al Juhani Ajyad Hotel', '650m from Haram', 'Al Juhani Ajyad Hotel', '650m from Haram', 'Al Ikram Palace', '450m from Nabawi', 'https://images.unsplash.com/photo-1596435688717-2d2f3b0fc47a?w=800&q=80', 'Saudi Airlines', 3, 'Ajyad Choice', 
 ARRAY['Return Flight', 'E-Visa Processing', 'Shared Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
 '[{"day":"Day 01","title":"Makkah Arrival","description":"Arrive at Jeddah, proceed to Al Juhani Ajyad Hotel Makkah."},{"day":"Day 02 - 12","title":"Makkah Stays","description":"Daily prayers at Haram. Historical Ziyarat tours."},{"day":"Day 13 - 20","title":"Madinah Stays","description":"Transfer to Al Ikram Madinah. Focus on prayers in Masjid Nabawi."},{"day":"Day 21","title":"Departure","description":"Return transfers to Jeddah Airport."}]'::jsonb),

('21 Nights Extended Special Economy', 'Maximize your time in the holy land with our 21-night package. Features Maather Al Jiwaar Makkah and Orjawan Al Madinah.', 251500, 'Economy', '21 Days', 'Makkah & Madinah', 'Maather Al Jiwaar Hotel', '600m from Haram', 'Maather Al Jiwaar Hotel', '600m from Haram', 'Orjawan Al Madinah', '450m from Nabawi', 'https://images.unsplash.com/photo-1518655044366-5c5abf0cf1f4?w=800&q=80', 'Air Blue', 3, 'Top Economy', 
 ARRAY['Return Flight', 'E-Visa Processing', 'Shared Ground Transport', 'Accomodations', '24/7 Pilgrims Support'],
 '[{"day":"Day 01","title":"Welcome to Makkah","description":"Arrive in Makkah, check-in to Maather Al Jiwaar Hotel. Complete Umrah."},{"day":"Day 02 - 12","title":"Makkah Devotions","description":"Spend peaceful days in Ibadah at Haram. Group Ziyarat."},{"day":"Day 13 - 20","title":"Madinah Stays","description":"Transfer to Orjawan Al Madinah. Rest and Ibadah in Masjid Nabawi."},{"day":"Day 21","title":"Farewell","description":"Departure transfer to Jeddah Airport."}]'::jsonb);

-- 3 STAR PACKAGES (12 Packages)
INSERT INTO packages (title, description, price, category, duration, location, hotel_name, distance_from_haram, image_url, airline, stars, badge, includes, itinerary) VALUES
('14 Nights 3 Star Comfort Umrah', 'All-inclusive 3-Star Umrah package. Staying at Al Aseel Ajyad Mecca (7 Nights) and Al Shourfah Hotel Madinah (7 Nights). Fully guided and all ground transfers included.', 245500, '3 Star', '14 Nights', 'Makkah & Madinah', 'Al Aseel Ajyad', '450m from Haram', 'https://images.unsplash.com/photo-1591604129909-2b4ce4e6e6d2?w=800&q=80', 'PIA', 3, 'Popular Choice', 
 ARRAY['E-Visa Processing', 'Return Flights (PIA)', 'Full Ground Transfer', 'Guided Ziyarat', 'Zamzam Water', 'Scholar Guidance'],
 '[{"day":"Day 01","title":"Arrival & Umrah","description":"Arrive Jeddah Airport, direct transfer to Al Aseel Ajyad Makkah. Perform Umrah."},{"day":"Day 02 - 07","title":"Makkah Devotion","description":"Spend daily prayers in Masjid Al-Haram. Guided Ziyarat of Makkah on Day 4."},{"day":"Day 08 - 13","title":"Madinah Munawwarah","description":"Transfer to Al Shourfah Madinah. Rest and Ibadah in Masjid Nabawi."},{"day":"Day 14","title":"Departure","description":"Farewell prayers at Nabawi, checkout, transfer to airport for return flight."}]'::jsonb),

('12 Nights 3 Star Standard Package', 'Highly demanded package featuring Dar El Eiman Al Khalil (Mecca) and Dar El Eiman Al Nour (Madinah). Double, triple, and quad sharing available.', 235500, '3 Star', '12 Nights', 'Makkah & Madinah', 'Dar El Eiman Al Khalil', '400m from Haram', 'https://images.unsplash.com/photo-1564769662533-3f5aae93cec2?w=800&q=80', 'Saudi Airlines', 3, 'Best Value', 
 ARRAY['E-Visa Processing', 'Return Flights (Saudia)', 'Shared transport', 'Guided tours Makkah & Madinah', 'Zamzam water'],
 '[{"day":"Day 01","title":"Arrival & Check-in","description":"Arrive Jeddah, transfer to Dar El Eiman Al Khalil Makkah."},{"day":"Day 02 - 06","title":"Makkah Devotions","description":"Daily prayers at Haram. Guided tours of cave Hira & Thawr."},{"day":"Day 07 - 11","title":"Madinah Devotions","description":"Transfer to Dar El Eiman Al Nour Madinah. 5 daily prayers in Nabawi."},{"day":"Day 12","title":"Departure","description":"Return transfer to airport."}]'::jsonb),

('10 Nights 3 Star Comfort Deal', 'Our standard 10-night package featuring Dorat Dar El Eiman (Mecca) and Elaf Al Bustan (Madinah). Centrally located comfort stay.', 225500, '3 Star', '10 Nights', 'Makkah & Madinah', 'Dorat Dar El Eiman', '350m from Haram', 'https://images.unsplash.com/photo-1580338834642-8a3acf79b1b8?w=800&q=80', 'Gulf Air', 3, 'Budget 3 Star', 
 ARRAY['E-Visa Processing', 'Return Flights (Gulf Air)', 'Full Ground Transfer', 'Holy Tours', ' Zamzam'],
 '[{"day":"Day 01","title":"Makkah Check-in","description":"Arrive Jeddah, transfer to Dorat Dar El Eiman Makkah. Perform Umrah."},{"day":"Day 02 - 05","title":"Makkah Ibadah","description":"Prayers in Haram. Group Ziyarat to Mina & Arafat."},{"day":"Day 06 - 09","title":"Madinah Nabawi","description":"Transfer to Elaf Al Bustan Madinah. Ibadah and Quba visits."},{"day":"Day 10","title":"Departure","description":"Check-out, transfer to airport."}]'::jsonb),

('7 Nights 3 Star Express Package', 'Short and spiritually active package. Stay 4 Nights in Al Thuria Hotel (Mecca) and 3 Nights in Amjad Al Gharra (Madinah). Perfect for business professionals.', 215500, '3 Star', '7 Nights', 'Makkah & Madinah', 'Al Thuria Hotel', '300m from Haram', 'https://images.unsplash.com/photo-1596435688717-2d2f3b0fc47a?w=800&q=80', 'PIA', 3, 'Quick 3-Star', 
 ARRAY['E-Visa Processing', 'Return Flights', 'Express Ground Transfer', 'Guided Ziyarat', 'Zamzam bottle'],
 '[{"day":"Day 01","title":"Arrive & Umrah","description":"Check-in Al Thuria Hotel Makkah. Complete Umrah."},{"day":"Day 02 - 04","title":"Makkah Devotions","description":"Daily prayers at Haram. Guided cave Ziyarat."},{"day":"Day 05 - 06","title":"Madinah Nabawi","description":"Proceed to Amjad Al Gharra Madinah. Prayers at Nabawi."},{"day":"Day 07","title":"Departure","description":"Return transfer to airport."}]'::jsonb),

('14 Nights 3 Star Premium Ground', 'Premium 3-Star package offering closer proximity to Al-Haram. Features Dar El Eiman Al Khalil Makkah and Al Shourfah Madinah.', 254000, '3 Star', '14 Nights', 'Makkah & Madinah', 'Dar El Eiman Al Khalil', '400m from Haram', 'https://images.unsplash.com/photo-1518655044366-5c5abf0cf1f4?w=800&q=80', 'Saudi Airlines', 3, 'Best Seller', 
 ARRAY['E-Visa Processing', 'VIP Ground Transfer', 'Full Guided Ziyarat', ' Zamzam water', '24/7 Scholar Support'],
 '[{"day":"Day 01","title":"Makkah Check-in","description":"Arrive Jeddah, transfer to Dar El Eiman Makkah. Perform Umrah."},{"day":"Day 02 - 07","title":"Makkah Stays","description":"Daily prayers in Haram. Guided historical tours."},{"day":"Day 08 - 13","title":"Madinah Stays","description":"Proceed to Al Shourfah Madinah. Rest and Ibadah in Masjid Nabawi."},{"day":"Day 14","title":"Return Flight","description":"Check-out, transfer to airport."}]'::jsonb),

('14 Nights 3 Star Comfort Saver', 'Slightly economical 3-Star option featuring Al Aseel Ajyad Makkah and Elaf Al Bustan Madinah.', 239500, '3 Star', '14 Nights', 'Makkah & Madinah', 'Al Aseel Ajyad', '450m from Haram', 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d8?w=800&q=80', 'Air Blue', 3, 'Value Saver', 
 ARRAY['E-Visa Processing', 'Ground Transport', 'Ziyarat in holy cities', 'Zamzam Included'],
 '[{"day":"Day 01","title":"Arrival & Umrah","description":"Check-in Al Aseel Ajyad Makkah. Complete Umrah."},{"day":"Day 02 - 07","title":"Makkah Ibadah","description":"Spend peaceful nights and pray in Haram."},{"day":"Day 08 - 13","title":"Madinah Stays","description":"Transfer to Elaf Al Bustan Madinah. Ibadah at Nabawi."},{"day":"Day 14","title":"Departure","description":"Transfer to airport."}]'::jsonb),

('12 Nights 3 Star Saver Choice', '12-day comfort stay featuring Dorat Dar El Eiman Makkah and Al Shourfah Madinah.', 229500, '3 Star', '12 Nights', 'Makkah & Madinah', 'Dorat Dar El Eiman', '350m from Haram', 'https://images.unsplash.com/photo-1591604129909-2b4ce4e6e6d2?w=800&q=80', 'PIA', 3, 'Comfort Saver', 
 ARRAY['E-Visa Processing', 'Coach Ground Transfer', 'Ziyarat Tours', 'Scholar Support'],
 '[{"day":"Day 01","title":"Arrival Makkah","description":"Arrive Jeddah, transfer to Dorat Makkah. Perform Umrah."},{"day":"Day 02 - 06","title":"Makkah Devotions","description":"Daily prayers at Haram. Cave Ziyarat."},{"day":"Day 07 - 11","title":"Madinah Stays","description":"Transfer to Al Shourfah Madinah. Pray at Nabawi."},{"day":"Day 12","title":"Departure","description":"Check-out, transfer to airport."}]'::jsonb),

('12 Nights 3 Star Comfort Plus', '3-Star standard package with upgraded transfers. Features Al Thuria Makkah and Elaf Al Bustan.', 242500, '3 Star', '12 Nights', 'Makkah & Madinah', 'Al Thuria Hotel', '300m from Haram', 'https://images.unsplash.com/photo-1564769662533-3f5aae93cec2?w=800&q=80', 'Saudi Airlines', 3, 'Highly Recommended', 
 ARRAY['E-Visa Processing', 'Upgraded Ground Transport', 'Makkah Ziyaraat', 'Zamzam water'],
 '[{"day":"Day 01","title":"Arrival Makkah","description":"Transfer to Al Thuria Makkah. Perform group Umrah."},{"day":"Day 02 - 06","title":"Makkah Ibadah","description":"Spend peaceful nights and pray in Haram."},{"day":"Day 07 - 11","title":"Madinah Stays","description":"Transfer to Elaf Al Bustan Madinah. Ibadah at Nabawi."},{"day":"Day 12","title":"Departure","description":"Return transfer to airport."}]'::jsonb),

('10 Nights 3 Star Premium Package', 'Upgraded 10-night package with close proximity hotels. Features Dar El Eiman Al Khalil Makkah and Al Shourfah Madinah.', 232500, '3 Star', '10 Nights', 'Makkah & Madinah', 'Dar El Eiman Al Khalil', '400m from Haram', 'https://images.unsplash.com/photo-1580338834642-8a3acf79b1b8?w=800&q=80', 'Gulf Air', 3, 'Premium Comfort', 
 ARRAY['E-Visa Processing', 'Full Ground Transport', 'Guided Tours', 'Zamzam bottle'],
 '[{"day":"Day 01","title":"Makkah Check-in","description":"Arrive Jeddah, transfer to Dar El Eiman Makkah. Perform Umrah."},{"day":"Day 02 - 05","title":"Makkah Prayers","description":"Pray in Al-Haram, perform guided Ziyarat."},{"day":"Day 06 - 09","title":"Madinah Stays","description":"Transfer to Al Shourfah Madinah. Pray in Nabawi."},{"day":"Day 10","title":"Return Flight","description":"Transfer to Jeddah airport."}]'::jsonb),

('10 Nights 3 Star Budget Standard', 'Slightly economical 10-night package. Features Al Aseel Ajyad Makkah and Amjad Al Gharra Madinah.', 219500, '3 Star', '10 Nights', 'Makkah & Madinah', 'Al Aseel Ajyad', '450m from Haram', 'https://images.unsplash.com/photo-1596435688717-2d2f3b0fc47a?w=800&q=80', 'PIA', 3, 'Best Price', 
 ARRAY['E-Visa Processing', 'Shared Transport', 'Ziyarat Pack', '24/7 Support'],
 '[{"day":"Day 01","title":"Arrival & Umrah","description":"Check-in Al Aseel Makkah. Perform Umrah."},{"day":"Day 02 - 05","title":"Makkah Ibadah","description":"Pray in Haram, perform group Ziyarat."},{"day":"Day 06 - 09","title":"Madinah Stays","description":"Transfer to Amjad Al Gharra Madinah. Pray in Nabawi."},{"day":"Day 10","title":"Departure","description":"Return transfer to airport."}]'::jsonb),

('7 Nights 3 Star Comfort Saver', 'Perfect 7-day option. Features Dorat Dar El Eiman Makkah (4 Nights) and Elaf Al Bustan Madinah (3 Nights).', 211500, '3 Star', '7 Nights', 'Makkah & Madinah', 'Dorat Dar El Eiman', '350m from Haram', 'https://images.unsplash.com/photo-1518655044366-5c5abf0cf1f4?w=800&q=80', 'PIA', 3, 'Quick Choice', 
 ARRAY['E-Visa Processing', 'Shared Bus Service', 'Zamzam water', 'Group support'],
 '[{"day":"Day 01","title":"Arrive Makkah","description":"Arrive Jeddah, transfer to Dorat Makkah. Complete Umrah."},{"day":"Day 02 - 04","title":"Haram Devotions","description":"Pray in Al-Haram. Focus on prayers and Qur''an."},{"day":"Day 05 - 06","title":"Madinah Devotions","description":"Transfer to Elaf Al Bustan Madinah. Daily Nabawi prayers."},{"day":"Day 07","title":"Return Flight","description":"Return transfer to airport."}]'::jsonb),

('7 Nights 3 Star Deluxe Ground', 'High-quality 7-day package featuring Al Thuria Makkah and Al Shourfah Madinah.', 222500, '3 Star', '7 Nights', 'Makkah & Madinah', 'Al Thuria Hotel', '300m from Haram', 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d8?w=800&q=80', 'Saudi Airlines', 3, 'Deluxe 3-Star', 
 ARRAY['E-Visa Processing', 'AC coach transport', 'Ziyarat in holy cities', 'Zamzam bottle'],
 '[{"day":"Day 01","title":"Welcome Makkah","description":"Check-in Al Thuria Makkah. Perform Umrah."},{"day":"Day 02 - 04","title":"Makkah Ibadah","description":"Spend peaceful nights and pray in Haram."},{"day":"Day 05 - 06","title":"Madinah Ibadah","description":"Transfer to Al Shourfah Madinah. Visit Uhud & Quba."},{"day":"Day 07","title":"Departure","description":"Check-out, transfer to airport."}]'::jsonb),

-- =============================================
-- 4 STAR PACKAGES (12 Packages)
-- =============================================
('14 Nights 4 Star Premium Umrah', 'Indulge in a premium 4-Star Umrah journey. Features Ramada Dar Al Faiyzeen in Mecca and Elaf Taibah in Madinah. Includes premium flights, VIP transfers, and daily buffet breakfast.', 284000, '4 Star', '14 Nights', 'Makkah & Madinah', 'Ramada Dar Al Faiyzeen', '250m from Haram', 'https://images.unsplash.com/photo-1591604129909-2b4ce4e6e6d2?w=800&q=80', 'Saudi Airlines', 4, 'Premium Choice', 
 ARRAY['E-Visa Processing', 'Return Flights (Saudia)', 'VIP GMC Ground Transfer', 'Daily Buffet Breakfast', 'Complete Guided Ziyarat Makkah & Madinah', '24/7 Customer Support'],
 '[{"day":"Day 01","title":"VIP Makkah Arrival","description":"Arrive Jeddah, VIP GMC transfer to Ramada Makkah. Special group scholar joins for Umrah."},{"day":"Day 02 - 07","title":"Spiritual Devotion Makkah","description":"Enjoy daily prayers at Haram. Special guided historical tours of Makkah sites on Day 3."},{"day":"Day 08 - 13","title":"Madinah Al Munawwarah","description":"VIP transport to Elaf Taibah Madinah. Focus on Masjid Nabawi prayers and Uhud tours."},{"day":"Day 14","title":"Departure","description":"Check-out, final prayers, and transfer to airport."}]'::jsonb),

('12 Nights 4 Star Executive Umrah', 'Outstanding executive stay featuring Nawazi Watheer Makkah (6 Nights) and Al Mukhtara Madinah (6 Nights). Centrally located executive comfort.', 278000, '4 Star', '12 Nights', 'Makkah & Madinah', 'Nawazi Watheer', '200m from Haram', 'https://images.unsplash.com/photo-1564769662533-3f5aae93cec2?w=800&q=80', 'Gulf Air', 4, 'Executive Choice', 
 ARRAY['E-Visa Processing', 'Return Flights (Gulf Air)', 'Executive private transport', 'Buffet Breakfast', 'Complete Holy Tours'],
 '[{"day":"Day 01","title":"Arrival & Umrah","description":"Transfer to Nawazi Watheer Makkah. Scholar-led Umrah."},{"day":"Day 02 - 06","title":"Makkah Devotions","description":"Daily prayers at Haram. Guided cave Hira tours."},{"day":"Day 07 - 11","title":"Madinah Devotions","description":"Transfer to Al Mukhtara Madinah. Daily prayers in Nabawi."},{"day":"Day 12","title":"Departure","description":"Return transfer to airport."}]'::jsonb),

('10 Nights 4 Star Comfort Deal', 'Our standard 10-night executive package. Stay at Dar El Eiman Grand (5 Nights) and Al Eiman Al Manar (5 Nights). Centrally located premium comfort stay.', 267500, '4 Star', '10 Nights', 'Makkah & Madinah', 'Dar El Eiman Grand', '180m from Haram', 'https://images.unsplash.com/photo-1580338834642-8a3acf79b1b8?w=800&q=80', 'PIA', 4, 'Best Value 4*', 
 ARRAY['E-Visa Processing', 'Return Flights (PIA)', 'Private Ground Transfer', 'Daily Breakfast', 'Guided Holy Tours'],
 '[{"day":"Day 01","title":"Makkah Check-in","description":"Arrive Jeddah, transfer to Dar El Eiman Grand. Perform Umrah."},{"day":"Day 02 - 05","title":"Makkah Ibadah","description":"Prayers in Haram. Group Ziyarat to Mina & Arafat."},{"day":"Day 06 - 09","title":"Madinah Nabawi","description":"Transfer to Al Eiman Al Manar Madinah. Ibadah and Quba visits."},{"day":"Day 10","title":"Departure","description":"Check-out, transfer to airport."}]'::jsonb),

('7 Nights 4 Star Express Package', 'Short and spiritually active executive package. Stay 4 Nights in Amjad Al Diyafah (Mecca) and 3 Nights in Elaf Meshal Al Salam (Madinah). Perfect for business professionals.', 255000, '4 Star', '7 Nights', 'Makkah & Madinah', 'Amjad Al Diyafah', '150m from Haram', 'https://images.unsplash.com/photo-1596435688717-2d2f3b0fc47a?w=800&q=80', 'Saudi Airlines', 4, 'Quick 4-Star', 
 ARRAY['E-Visa Processing', 'Return Flights (Saudia)', 'Executive Ground Transfer', 'Daily Buffet Breakfast', 'Guided Ziyarat'],
 '[{"day":"Day 01","title":"Arrive & Umrah","description":"Check-in Amjad Al Diyafah Makkah. Complete Umrah."},{"day":"Day 02 - 04","title":"Makkah Devotions","description":"Daily prayers at Haram. Guided cave Ziyarat."},{"day":"Day 05 - 06","title":"Madinah Nabawi","description":"Proceed to Elaf Meshal Madinah. Prayers at Nabawi."},{"day":"Day 07","title":"Departure","description":"Return transfer to airport."}]'::jsonb),

('14 Nights 4 Star Deluxe Ground', 'High-quality 4-Star package closer to Haram. Features Nawazi Watheer Makkah and Elaf Taibah Madinah.', 295000, '4 Star', '14 Nights', 'Makkah & Madinah', 'Nawazi Watheer', '200m from Haram', 'https://images.unsplash.com/photo-1518655044366-5c5abf0cf1f4?w=800&q=80', 'Saudi Airlines', 4, 'Executive Standard', 
 ARRAY['E-Visa Processing', 'VIP GMC Transfer', 'Full Buffet Breakfast', 'Full Ziyarat Makkah/Madinah', '24/7 Scholar Support'],
 '[{"day":"Day 01","title":"Makkah Check-in","description":"Arrive Jeddah, transfer to Nawazi Makkah. Perform Umrah."},{"day":"Day 02 - 07","title":"Makkah Stays","description":"Daily prayers in Haram. Guided historical tours."},{"day":"Day 08 - 13","title":"Madinah Stays","description":"Proceed to Elaf Taibah Madinah. Rest and Ibadah in Masjid Nabawi."},{"day":"Day 14","title":"Return Flight","description":"Check-out, transfer to airport."}]'::jsonb),

('14 Nights 4 Star Executive Saver', 'Saver 4-Star option featuring Ramada Dar Al Faiyzeen Makkah and Al Mukhtara Madinah.', 275000, '4 Star', '14 Nights', 'Makkah & Madinah', 'Ramada Dar Al Faiyzeen', '250m from Haram', 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d8?w=800&q=80', 'Air Blue', 4, '4-Star Saver', 
 ARRAY['E-Visa Processing', 'Ground Transport', 'Daily Breakfast', 'Ziyarat in holy cities', 'Zamzam Included'],
 '[{"day":"Day 01","title":"Arrival & Umrah","description":"Check-in Ramada Makkah. Complete Umrah."},{"day":"Day 02 - 07","title":"Makkah Ibadah","description":"Spend peaceful nights and pray in Haram."},{"day":"Day 08 - 13","title":"Madinah Stays","description":"Transfer to Al Mukhtara Madinah. Ibadah at Nabawi."},{"day":"Day 14","title":"Departure","description":"Transfer to airport."}]'::jsonb),

('12 Nights 4 Star Saver Choice', '12-day comfort stay featuring Dar El Eiman Grand Makkah and Al Eiman Al Manar Madinah.', 265000, '4 Star', '12 Nights', 'Makkah & Madinah', 'Dar El Eiman Grand', '180m from Haram', 'https://images.unsplash.com/photo-1591604129909-2b4ce4e6e6d2?w=800&q=80', 'PIA', 4, 'Best Seller 4*', 
 ARRAY['E-Visa Processing', 'Coach Ground Transfer', 'Buffet Breakfast', 'Ziyarat Tours', 'Scholar Support'],
 '[{"day":"Day 01","title":"Arrival Makkah","description":"Arrive Jeddah, transfer to Dar El Eiman Grand. Perform Umrah."},{"day":"Day 02 - 06","title":"Makkah Devotions","description":"Daily prayers at Haram. Cave Ziyarat."},{"day":"Day 07 - 11","title":"Madinah Stays","description":"Transfer to Al Eiman Madinah. Pray at Nabawi."},{"day":"Day 12","title":"Departure","description":"Check-out, transfer to airport."}]'::jsonb),

('12 Nights 4 Star Comfort Plus', '4-Star executive package with upgraded transfers. Features Amjad Al Diyafah Makkah and Elaf Taibah.', 272500, '4 Star', '12 Nights', 'Makkah & Madinah', 'Amjad Al Diyafah', '150m from Haram', 'https://images.unsplash.com/photo-1564769662533-3f5aae93cec2?w=800&q=80', 'Saudi Airlines', 4, 'Executive Choice', 
 ARRAY['E-Visa Processing', 'Upgraded Ground Transport', 'Daily Buffet Breakfast', 'Makkah Ziyaraat', 'Zamzam water'],
 '[{"day":"Day 01","title":"Arrival Makkah","description":"Transfer to Amjad Makkah. Perform group Umrah."},{"day":"Day 02 - 06","title":"Makkah Ibadah","description":"Spend peaceful nights and pray in Haram."},{"day":"Day 07 - 11","title":"Madinah Stays","description":"Transfer to Elaf Taibah Madinah. Ibadah at Nabawi."},{"day":"Day 12","title":"Departure","description":"Return transfer to airport."}]'::jsonb),

('10 Nights 4 Star Premium Package', 'Upgraded 10-night package with close proximity hotels. Features Nawazi Watheer Makkah and Elaf Taibah Madinah.', 259500, '4 Star', '10 Nights', 'Makkah & Madinah', 'Nawazi Watheer', '200m from Haram', 'https://images.unsplash.com/photo-1580338834642-8a3acf79b1b8?w=800&q=80', 'Gulf Air', 4, 'Executive Comfort', 
 ARRAY['E-Visa Processing', 'Full Ground Transfer', 'Daily Breakfast', 'Guided Tours', 'Zamzam bottle'],
 '[{"day":"Day 01","title":"Makkah Check-in","description":"Arrive Jeddah, transfer to Nawazi Makkah. Perform Umrah."},{"day":"Day 02 - 05","title":"Makkah Prayers","description":"Pray in Al-Haram, perform guided Ziyarat."},{"day":"Day 06 - 09","title":"Madinah Stays","description":"Transfer to Elaf Taibah Madinah. Pray in Nabawi."},{"day":"Day 10","title":"Return Flight","description":"Transfer to Jeddah airport."}]'::jsonb),

('10 Nights 4 Star Budget Standard', 'Slightly economical 10-night package. Features Ramada Makkah and Al Mukhtara Madinah.', 249500, '4 Star', '10 Nights', 'Makkah & Madinah', 'Ramada Dar Al Faiyzeen', '250m from Haram', 'https://images.unsplash.com/photo-1596435688717-2d2f3b0fc47a?w=800&q=80', 'PIA', 4, 'Executive Budget', 
 ARRAY['E-Visa Processing', 'Shared Transport', 'Daily Breakfast', 'Ziyarat Pack', '24/7 Support'],
 '[{"day":"Day 01","title":"Arrival & Umrah","description":"Check-in Ramada Makkah. Perform Umrah."},{"day":"Day 02 - 05","title":"Makkah Ibadah","description":"Pray in Haram, perform group Ziyarat."},{"day":"Day 06 - 09","title":"Madinah Stays","description":"Transfer to Al Mukhtara Madinah. Pray in Nabawi."},{"day":"Day 10","title":"Departure","description":"Return transfer to airport."}]'::jsonb),

('7 Nights 4 Star Comfort Saver', 'Perfect 7-day executive option. Features Dar El Eiman Grand Makkah (4 Nights) and Al Eiman Al Manar Madinah (3 Nights).', 241500, '4 Star', '7 Nights', 'Makkah & Madinah', 'Dar El Eiman Grand', '180m from Haram', 'https://images.unsplash.com/photo-1518655044366-5c5abf0cf1f4?w=800&q=80', 'PIA', 4, 'Executive Quick', 
 ARRAY['E-Visa Processing', 'Shared Bus Service', 'Daily Buffet Breakfast', 'Zamzam water', 'Group support'],
 '[{"day":"Day 01","title":"Arrive Makkah","description":"Arrive Jeddah, transfer to Dar El Eiman Grand. Complete Umrah."},{"day":"Day 02 - 04","title":"Haram Devotions","description":"Pray in Al-Haram. Focus on prayers and Qur''an."},{"day":"Day 05 - 06","title":"Madinah Devotions","description":"Transfer to Al Eiman Madinah. Daily Nabawi prayers."},{"day":"Day 07","title":"Return Flight","description":"Return transfer to airport."}]'::jsonb),

('7 Nights 4 Star Deluxe Ground', 'High-quality 7-day executive package featuring Nawazi Watheer Makkah and Elaf Taibah Madinah.', 248500, '4 Star', '7 Nights', 'Makkah & Madinah', 'Nawazi Watheer', '200m from Haram', 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d8?w=800&q=80', 'Saudi Airlines', 4, 'Executive Quick Plus', 
 ARRAY['E-Visa Processing', 'AC coach transport', 'Daily Buffet Breakfast', 'Ziyarat in holy cities', 'Zamzam bottle'],
 '[{"day":"Day 01","title":"Welcome Makkah","description":"Check-in Nawazi Makkah. Perform Umrah."},{"day":"Day 02 - 04","title":"Makkah Ibadah","description":"Spend peaceful nights and pray in Haram."},{"day":"Day 05 - 06","title":"Madinah Ibadah","description":"Transfer to Elaf Taibah Madinah. Visit Uhud & Quba."},{"day":"Day 07","title":"Departure","description":"Check-out, transfer to airport."}]'::jsonb),

-- =============================================
-- 5 STAR PACKAGES (12 Packages)
-- =============================================
('14 Nights 5 Star Cheap Luxury', 'All-inclusive 5-Star luxury package on a budget. Stay at Holiday Inn Makkah (7 Nights) and Province Al Sham Madinah (7 Nights). Premium flights, private VIP GMC transport, and gourmet breakfasts.', 289500, '5 Star', '14 Nights', 'Makkah & Madinah', 'Holiday Inn Makkah', '150m from Haram', 'https://images.unsplash.com/photo-1591604129909-2b4ce4e6e6d2?w=800&q=80', 'Emirates', 5, 'Luxury Cheap', 
 ARRAY['E-Visa Processing', 'Return Flights (Emirates)', 'VIP GMC Ground Transfer', 'Gourmet Buffet Breakfast', 'Guided Holy Ziyarat Makkah & Madinah', '24/7 VIP Tour Manager Support'],
 '[{"day":"Day 01","title":"VIP Arrival Makkah","description":"Arrive Jeddah, private VIP GMC transfer to Holiday Inn Makkah. Personal guide facilitates Umrah."},{"day":"Day 02 - 07","title":"Makkah Devotions","description":"Daily prayers in Masjid Al-Haram. Private VIP Ziyarat of holy landmarks on Day 3."},{"day":"Day 08 - 13","title":"Madinah Munawwarah","description":"GMC transfer to Province Al Sham Madinah. Ibadah at Nabawi and private historic tours."},{"day":"Day 14","title":"Departure","description":"Final prayers, checkout, private GMC transfer to Jeddah airport for return flight."}]'::jsonb),

('12 Nights 5 Star Royal Package', 'Experience world-class luxury at Hyatt Regency Makkah (6 Nights) and Majlis Grand Mercure Madinah (6 Nights). Executive transfers, VIP lounges, and full buffet breakfast included.', 279500, '5 Star', '12 Nights', 'Makkah & Madinah', 'Hyatt Regency', '100m from Haram', 'https://images.unsplash.com/photo-1564769662533-3f5aae93cec2?w=800&q=80', 'Qatar Airways', 5, 'Royal Luxury', 
 ARRAY['E-Visa Processing', 'Return Flights (Qatar Airways)', 'Private GMC Transfers', 'Gourmet Buffet Breakfast', 'Complete VIP Guided Ziyarat', 'Zamzam water'],
 '[{"day":"Day 01","title":"Royal Welcome Makkah","description":"Transfer to Hyatt Regency Makkah. Perform Umrah with private group scholar."},{"day":"Day 02 - 06","title":"Kaaba Devotion","description":"Prayers facing Kaaba in Haram. VIP private Ziyarat."},{"day":"Day 07 - 11","title":"Madinah Nabawi","description":"GMC transfer to Majlis Grand Mercure Madinah. Daily Fajr at Nabawi."},{"day":"Day 12","title":"Departure","description":"Private check-out and airport transfer."}]'::jsonb),

('10 Nights 5 Star Executive Stay', 'Centrally located luxury staying at Anjum Hotel Makkah (5 Nights) and AlHaram Hotel Madinah (5 Nights). Direct visual contact with Haram, VIP services, and gourmet meals.', 269500, '5 Star', '10 Nights', 'Makkah & Madinah', 'Anjum Hotel', '120m from Haram', 'https://images.unsplash.com/photo-1580338834642-8a3acf79b1b8?w=800&q=80', 'Saudi Airlines', 5, 'Haram View', 
 ARRAY['E-Visa Processing', 'Return Flights (Saudia)', 'Executive Ground Transfer', 'Gourmet Breakfast', 'Guided Holy Ziyarat Makkah/Madinah'],
 '[{"day":"Day 01","title":"Makkah VIP Arrival","description":"Arrive Jeddah, transfer to Anjum Hotel Makkah. Immediate Umrah perform."},{"day":"Day 02 - 05","title":"Haram Ibadah","description":"Pray in Al-Haram. Private VIP Ziyarat of cave Hira & Thawr."},{"day":"Day 06 - 09","title":"Madinah Nabawi","description":"Proceed to AlHaram Hotel Madinah. Daily prayers and VIP historical tours."},{"day":"Day 10","title":"Departure","description":"Return transfer to airport."}]'::jsonb),

('7 Nights 5 Star Express Luxury', 'Short and highly exclusive luxury package. Stay 4 Nights in Al Shohada Makkah and 3 Nights in El Eiman Royal Madinah. Absolute luxury for busy families.', 235500, '5 Star', '7 Nights', 'Makkah & Madinah', 'Al Shohada Makkah', '150m from Haram', 'https://images.unsplash.com/photo-1596435688717-2d2f3b0fc47a?w=800&q=80', 'Emirates', 5, 'Quick Luxury', 
 ARRAY['E-Visa Processing', 'Return Flights (Emirates)', 'Private GMC Ground Transfer', 'Daily Gourmet Breakfast', 'Guided Ziyarat'],
 '[{"day":"Day 01","title":"Arrive & Umrah","description":"Check-in Al Shohada Hotel Makkah. Complete Umrah under scholar guidance."},{"day":"Day 02 - 04","title":"Makkah Devotions","description":"Daily prayers at Haram. Guided cave Ziyarat."},{"day":"Day 05 - 06","title":"Madinah Nabawi","description":"Proceed to El Eiman Royal Madinah. Daily prayers at Nabawi."},{"day":"Day 07","title":"Departure","description":"Return transfer to airport."}]'::jsonb),

('14 Nights 5 Star VIP Splendor', 'High-end luxury package closer to Haram. Features Hyatt Regency Makkah and Province Al Sham Madinah.', 315000, '5 Star', '14 Nights', 'Makkah & Madinah', 'Hyatt Regency', '100m from Haram', 'https://images.unsplash.com/photo-1518655044366-5c5abf0cf1f4?w=800&q=80', 'Qatar Airways', 5, 'Best Seller 5*', 
 ARRAY['E-Visa Processing', 'VIP GMC Transfer', 'Full Buffet Breakfast', 'Full Ziyarat Makkah/Madinah', '24/7 Scholar Support'],
 '[{"day":"Day 01","title":"Makkah Check-in","description":"Arrive Jeddah, transfer to Hyatt Regency Makkah. Perform Umrah."},{"day":"Day 02 - 07","title":"Makkah Stays","description":"Daily prayers in Haram. Guided historical tours."},{"day":"Day 08 - 13","title":"Madinah Stays","description":"Proceed to Province Al Sham Madinah. Rest and Ibadah in Masjid Nabawi."},{"day":"Day 14","title":"Return Flight","description":"Check-out, transfer to airport."}]'::jsonb),

('14 Nights 5 Star Luxury Saver', 'Saver 5-Star option featuring Holiday Inn Makkah and Majlis Grand Mercure Madinah.', 295000, '5 Star', '14 Nights', 'Makkah & Madinah', 'Holiday Inn Makkah', '150m from Haram', 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d8?w=800&q=80', 'Air Blue', 5, '5-Star Saver', 
 ARRAY['E-Visa Processing', 'Ground Transport', 'Daily Breakfast', 'Ziyarat in holy cities', 'Zamzam Included'],
 '[{"day":"Day 01","title":"Arrival & Umrah","description":"Check-in Holiday Inn Makkah. Complete Umrah."},{"day":"Day 02 - 07","title":"Makkah Ibadah","description":"Spend peaceful nights and pray in Haram."},{"day":"Day 08 - 13","title":"Madinah Stays","description":"Transfer to Majlis Grand Mercure Madinah. Ibadah at Nabawi."},{"day":"Day 14","title":"Departure","description":"Transfer to airport."}]'::jsonb),

('12 Nights 5 Star Saver Choice', '12-day comfort stay featuring Anjum Hotel Makkah and Province Al Sham Madinah.', 285000, '5 Star', '12 Nights', 'Makkah & Madinah', 'Anjum Hotel', '120m from Haram', 'https://images.unsplash.com/photo-1591604129909-2b4ce4e6e6d2?w=800&q=80', 'PIA', 5, 'Saver Splendor', 
 ARRAY['E-Visa Processing', 'Coach Ground Transfer', 'Buffet Breakfast', 'Ziyarat Tours', 'Scholar Support'],
 '[{"day":"Day 01","title":"Arrival Makkah","description":"Arrive Jeddah, transfer to Anjum Hotel. Perform Umrah."},{"day":"Day 02 - 06","title":"Makkah Devotions","description":"Daily prayers at Haram. Cave Ziyarat."},{"day":"Day 07 - 11","title":"Madinah Stays","description":"Transfer to Province Al Sham Madinah. Pray at Nabawi."},{"day":"Day 12","title":"Departure","description":"Check-out, transfer to airport."}]'::jsonb),

('12 Nights 5 Star Royal Plus', '5-Star luxury package with upgraded transfers. Features Al Shohada Makkah and Majlis Grand Mercure.', 292500, '5 Star', '12 Nights', 'Makkah & Madinah', 'Al Shohada Makkah', '150m from Haram', 'https://images.unsplash.com/photo-1564769662533-3f5aae93cec2?w=800&q=80', 'Saudi Airlines', 5, 'Royal Choice', 
 ARRAY['E-Visa Processing', 'Upgraded Ground Transport', 'Daily Buffet Breakfast', 'Makkah Ziyaraat', 'Zamzam water'],
 '[{"day":"Day 01","title":"Arrival Makkah","description":"Transfer to Al Shohada Makkah. Perform group Umrah."},{"day":"Day 02 - 06","title":"Makkah Ibadah","description":"Spend peaceful nights and pray in Haram."},{"day":"Day 07 - 11","title":"Madinah Stays","description":"Transfer to Majlis Grand Mercure Madinah. Ibadah at Nabawi."},{"day":"Day 12","title":"Departure","description":"Return transfer to airport."}]'::jsonb),

('10 Nights 5 Star Premium Package', 'Upgraded 10-night package with close proximity hotels. Features Hyatt Regency Makkah and AlHaram Hotel Madinah.', 279500, '5 Star', '10 Nights', 'Makkah & Madinah', 'Hyatt Regency', '100m from Haram', 'https://images.unsplash.com/photo-1580338834642-8a3acf79b1b8?w=800&q=80', 'Gulf Air', 5, 'VIP Executive', 
 ARRAY['E-Visa Processing', 'Full Ground Transfer', 'Daily Breakfast', 'Guided Tours', 'Zamzam bottle'],
 '[{"day":"Day 01","title":"Makkah Check-in","description":"Arrive Jeddah, transfer to Hyatt Regency. Perform Umrah."},{"day":"Day 02 - 05","title":"Makkah Prayers","description":"Pray in Al-Haram, perform guided Ziyarat."},{"day":"Day 06 - 09","title":"Madinah Stays","description":"Transfer to AlHaram Hotel Madinah. Pray in Nabawi."},{"day":"Day 10","title":"Return Flight","description":"Transfer to Jeddah airport."}]'::jsonb),

('10 Nights 5 Star Budget Luxury', 'Slightly economical 5-Star 10-night package. Features Holiday Inn Makkah and El Eiman Royal Madinah.', 259500, '5 Star', '10 Nights', 'Makkah & Madinah', 'Holiday Inn Makkah', '150m from Haram', 'https://images.unsplash.com/photo-1596435688717-2d2f3b0fc47a?w=800&q=80', 'PIA', 5, 'Value Luxury', 
 ARRAY['E-Visa Processing', 'Shared Transport', 'Daily Breakfast', 'Ziyarat Pack', '24/7 Support'],
 '[{"day":"Day 01","title":"Arrival & Umrah","description":"Check-in Holiday Inn Makkah. Perform Umrah."},{"day":"Day 02 - 05","title":"Makkah Ibadah","description":"Pray in Haram, perform group Ziyarat."},{"day":"Day 06 - 09","title":"Madinah Stays","description":"Transfer to El Eiman Royal Madinah. Pray in Nabawi."},{"day":"Day 10","title":"Departure","description":"Return transfer to airport."}]'::jsonb),

('7 Nights 5 Star Comfort Saver', 'Perfect 7-day luxury option. Features Anjum Hotel Makkah (4 Nights) and Province Al Sham Madinah (3 Nights).', 249500, '5 Star', '7 Nights', 'Makkah & Madinah', 'Anjum Hotel', '120m from Haram', 'https://images.unsplash.com/photo-1518655044366-5c5abf0cf1f4?w=800&q=80', 'PIA', 5, 'Quick VIP', 
 ARRAY['E-Visa Processing', 'Shared Bus Service', 'Daily Buffet Breakfast', 'Zamzam water', 'Group support'],
 '[{"day":"Day 01","title":"Arrive Makkah","description":"Arrive Jeddah, transfer to Anjum Hotel. Complete Umrah."},{"day":"Day 02 - 04","title":"Haram Devotions","description":"Pray in Al-Haram. Focus on prayers and Qur''an."},{"day":"Day 05 - 06","title":"Madinah Devotions","description":"Transfer to Province Al Sham Madinah. Daily Nabawi prayers."},{"day":"Day 07","title":"Return Flight","description":"Return transfer to airport."}]'::jsonb),

('7 Nights 5 Star Royal Ground', 'High-quality 7-day luxury package featuring Hyatt Regency Makkah and Province Al Sham Madinah.', 257500, '5 Star', '7 Nights', 'Makkah & Madinah', 'Hyatt Regency', '100m from Haram', 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d8?w=800&q=80', 'Saudi Airlines', 5, 'Royal Quick Plus', 
 ARRAY['E-Visa Processing', 'AC coach transport', 'Daily Buffet Breakfast', 'Ziyarat in holy cities', 'Zamzam bottle'],
 '[{"day":"Day 01","title":"Welcome Makkah","description":"Check-in Hyatt Regency Makkah. Perform Umrah."},{"day":"Day 02 - 04","title":"Makkah Ibadah","description":"Spend peaceful nights and pray in Haram."},{"day":"Day 05 - 06","title":"Madinah Ibadah","description":"Transfer to Province Al Sham Madinah. Visit Uhud & Quba."},{"day":"Day 07","title":"Departure","description":"Check-out, transfer to airport."}]'::jsonb);

-- =============================================
-- SEED DATA - TOURS
-- =============================================

INSERT INTO tours (title, subtitle, description, price, duration, image_url, highlights) VALUES
('Turkey Tour', 'Istanbul, Cappadocia, Antalya', 'Discover the rich history and stunning landscapes of Turkey. From the Blue Mosque to hot air balloons in Cappadocia.', 285000, '10 Days / 9 Nights', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDo34TNKnDfPALrJLu5UciOIr7LARLN_xMd56yq9UtN280tkvjiEnxN3TtX2PclWHifVh-nu8QV_2cBRDHQyvPmPzZGIZNdK59dTjZS_Z7zyQnU3g6H9XtU6VzrOpldicf7vIybJnfw64PVqTVsjONncJK9U_xFuHg1W1wWMoj67jRKKTctsOdONWmyphd-lo0jqhdNTCIXpryZF3G0yfAhu2sIiRgcLLrXo2593SUcftSq5rTTctJCZOjzrrlvn1FRx-ijiWOD06Kn',
 ARRAY['Blue Mosque', 'Cappadocia Balloon Ride', 'Grand Bazaar', 'Pamukkale']),

('Dubai Tour', 'Dubai, Abu Dhabi, Sharjah', 'Experience the dazzling city of Dubai with desert safaris, Burj Khalifa, and luxury shopping.', 195000, '7 Days / 6 Nights', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUQYOVnZnCAbJnFrX1nyML3VQoCv0DXi5Irz0Y73qxzjrCnv9Fjfew89pvxdv8ZCASmG7JXvm6ivVtlWSDgDNl6WD5Qkh9yA9ePoYhW5-2lqFxEm_UD-gdv3y855ixx1a4TNrQKs_YDGiCBrtJNtbyqSVu-OpnZy8NM7Q_OjK_9-EAJxvTxySJdH3PL-NHtQ5wCIWYnxE88P2f-rJ9uHs3kO3HDAd20k7SpB0jq8u4Sn1BDaHihQy3xKayJDzjSbhMkeSgMrymfb39',
 ARRAY['Burj Khalifa', 'Desert Safari', 'Dubai Frame', 'Sheikh Zayed Mosque']),

('Malaysia Tour', 'Kuala Lumpur, Genting, Penang', 'Explore the vibrant culture and natural beauty of Malaysia from the Petronas Towers to Genting Highlands.', 175000, '8 Days / 7 Nights', 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3zaexyac9JYbgc7JJW579-lS9WPkAgTeUI7Z4f5Gl08eeqwiSxGeYnsEo-duQ9zPlj4ciIjAaAHQxZpJWRSzi7QTPiBvQTt5PnQL360TdVEtcUe8-A1xE2f5tRkgQevJB0FH9BEKMxS9GfArHkUk1mmMGLjWSTTIINCUnMLvlQIt-niCyleGQ6NoGhUF9wsVc4M84ENHV6AyrYG2HEoJD3DrsDsNwuv-5k4zPqoMOXRMxOHGoe_2H7qk6_JElzjsy7uAvRdhWRfDf',
 ARRAY['Petronas Towers', 'Genting Highlands', 'Batu Caves', 'Gurney Drive']),

('Europe Tour', 'Paris, Swiss, Rome', 'A grand European adventure covering the most iconic cities and landscapes of the continent.', 550000, '12 Days / 11 Nights', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBv-MVsZqKBwhFPBQ8VFiq3TU0N5EnqlsYH2DbJRB5qbT_Cq8D2o6SSJOfghgRCyIin6rAX9gA_gYojLbuUrx53KQNs5-IEFKUuQCSPDJADWJ4WR-wdlDFUu341hUW3bpPXn5i_22fhWnEfLqshrlO64tuM__-1f54SpwlxVe2bQGSh0jdBOS_x6jW2ttrKZoyb_W-fAUeq6l6DZazJ7KXpOFW-pVOA24jVsXFRRGsk7z2EjtSS0-inrhXqDyByLzKRQqLQX-m_UhJv',
 ARRAY['Eiffel Tower', 'Swiss Alps', 'Colosseum', 'Lucerne']);

-- =============================================
-- SEED DATA - VISA SERVICES
-- =============================================

INSERT INTO visa_services (title, description, processing_time, fee, icon, documents) VALUES
('Umrah Visa', 'Specialized visa processing for pilgrims traveling to Saudi Arabia for Umrah rituals.', '3-5 Business Days', 'PKR 15,000', 'mosque',
 ARRAY['Valid Passport', 'Passport Photos', 'Vaccination Certificate', 'Travel Itinerary']),

('Saudi Tourist Visa', 'Explore the Kingdom of Saudi Arabia with our tourist visa services.', '5-7 Business Days', 'PKR 12,000', 'flight',
 ARRAY['Valid Passport', 'Passport Photos', 'Hotel Booking', 'Return Ticket']),

('Dubai Visa', 'Visit the dazzling city of Dubai with our streamlined visa processing.', '3-5 Business Days', 'PKR 8,000', 'apartment',
 ARRAY['Valid Passport', 'Passport Photos', 'Bank Statement', 'Hotel Booking']),

('Turkey Visa', 'Discover the rich history and stunning landscapes of Turkey.', '7-10 Business Days', 'PKR 18,000', 'travel_explore',
 ARRAY['Valid Passport', 'Passport Photos', 'Travel Insurance', 'Proof of Accommodation']),

('Schengen Visa', 'Travel across 27 European countries with a single Schengen visa.', '10-15 Business Days', 'PKR 25,000', 'globe',
 ARRAY['Valid Passport', 'Passport Photos', 'Travel Insurance', 'Bank Statements', 'Cover Letter']);

-- =============================================
-- SEED DATA - GALLERY
-- =============================================

INSERT INTO gallery (src, label, category, type) VALUES
('https://lh3.googleusercontent.com/aida-public/AB6AXuCO_IRY7jvBnnEtX8feErOYDc3DDZMVDuLQ1G_-Q1DoQQayK1NTWJyzzRXm2KsAFGn339aj0b-tuGncnjQ0V3K-XmiIiHg3AijaZnqIo4UsydMi9JV0-IjYu_s4tx3NoWWTd1W9KhPH9HtlEPzGHl8nYSQlk5f7NN0qw8_LI1MzvHh3zcU_lIcPDRNAuXmmI-rnDOOdgCbLLkSCPGQ0JgN5KrWAOqKuAd3rOXOU6R652ysKci4tHEynrqMAWTIfuMyWNbpXbl-5Ymxe', 'The Circle of Faith', 'Kaaba', 'wide'),
('https://lh3.googleusercontent.com/aida-public/AB6AXuCUGaehS0Bt67L1RAqyen3fOEt1z86N6uxfZ0K2PEErMKMiZV4drU-2JWd6VSfjLNoysYsUCnNjngX2KNQJ8UHjzTI8wzUjn0dRQVUGEDMcsW9XzECUjxiXzwmymgp7aad5U9C29USk8o4deQVGPRq1k072Ho2jWxW8gAE9YQAYgM5vJXNh1_6Jh9RwKfOtyza-f7F_spyjDq5voWUR5oiwwbAHKawNiEgAP4RCQeVEZjXK7hsbudBi4SZ6NEt10zy6az0ztNzmz7TT', 'Celestial Spires', 'Masjid Nabawi', 'tall'),
('https://lh3.googleusercontent.com/aida-public/AB6AXuDK2_oTGnpwIr8lGrvHvbVteJFQ_LmysVmiqZ5CPGEjvBQGYjLYOxIKAbuLI3tMM2DniH-IFinQIS_Zl3CuQI6-v0_qPMi-ADy6G-HrKVrQFGb39jox7uMyXFr5IS0jd-xe7YOjNLxfISzbJJdypjwKvZ2h-FnT5TsPIKi-1Oqd4ncbi7bu0gmX_UqH-u-KdFmnn3KHOG_45iJ5tXaRIJA9XCO-_E6R9LERBfCgUqIAEgqNZOJvwAhHVbW4i2ve3nrfIKmny2BzaQaR', 'Sacred Architecture', 'Ziyarat', 'standard'),
('https://lh3.googleusercontent.com/aida-public/AB6AXuAzn1-JLxXAdX_feF-ubKekQz_wAt4HqUvvdPeuTKh3tfBk99cfsH9pHef7zWZCICJHNS70tFKGeQ-d2LsqZUyHehxW0ISwfuQU6gPsaP3m3pWaRkRyE970BTN7g8b8nZTMNxe5KaXgncRVyFMZPAfegI2yk1EvcZBAntULYnm2eqJHZUhrmp-vABbcygSSWynHygdTOcq6kqOpSS9UUEK-mZBp18OFxE9AORCbA595M3yMWzAcQuG8SeGuvBQpAFlHsw7ERHUc0A3T', 'Pilgrims Path', 'Umrah Groups', 'standard'),
('https://lh3.googleusercontent.com/aida-public/AB6AXuCNDTdnKX6NYAJ-QJo4iIhbwDoIli-XdCyKqFl3b1Dp3vRZecvJr_WhCIG7mPQD_IEnuARtnAo-nbJDE5GuYgGT6WwSIosL1A2xuXb7X5cWKhYsc-3UXkX1h1vaAvdIi-Gv0uK4DmICIgXY3dVhXhCd9gK8gkMQPvJAqgXVNdG8Nq1hgp1ru5E6Ssyynux0aFffU5qALnB-hVBp394WBESmgDJwh0Qbp1zmK7OHAZQqvLA1ygv7UctkbEAPc4GTatP-RkTuYPseLVXz', 'Light & Geometry', 'Kaaba', 'tall'),
('https://lh3.googleusercontent.com/aida-public/AB6AXuDcmggnP0CNRP5uiq7143MZmxCE8ru5VvAuKNkeovFm0A2rAgD1ZNRZ4knso4Qvk8LjeeXQGqmOBggt_NiMpvC9qu9ZSCVDImY6vXL9fpcQz8QlXwNOJWd32NvIBuUWQUI28JWgdG-4bo5639jTzgHwHmOqFUPM8uHHCktGtPR0LPJxIs7LSvKLv3JxvAFq0vDdodaABfSAdbQJLIW7QLfn50-XX7mbmQBL4Uk0sKmlYRy8hNQRJWeMDFx5R3ViWdiSNVdPYnVHKHkE', 'The Path of History', 'Ziyarat', 'wide'),
('https://lh3.googleusercontent.com/aida-public/AB6AXuC5y1PBgaoz7gr2OO5Anm-bHirxOS35chx9DgNuvh2l3gpzZnpSVkvtsklwE8kU2DvufQEFd9VmGtGRqXGufLBDzW2WKJXJBWwl-EhNn0nmK7_wehlFTH6LlZ4cljEHKUWKzEH_AlOrVia5-VUJVWke__Dgk-Psrzrs-e1QbYWd0Rjt_v2AtGGmXRGOuoEaMwI6TgiyBhhQuNveTCCGJi172qW3IGal75gfDU-0_1fqGlvdko-cBqFhMtfy3Z547fVcn3wElsNv2oZX', 'Lanterns of Devotion', 'Umrah Groups', 'standard');

-- =============================================
-- SEED DATA - BLOG POSTS
-- =============================================

INSERT INTO blog_posts (title, excerpt, content, category, image_url, read_time, featured) VALUES
('How to Perform Umrah Step by Step', 'A comprehensive guide for first-time pilgrims covering every ritual of Umrah, from Ihram to Tawaf and Sa''i.', 'Full content here...', 'Guides', 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_umMwNrlCdZQQHw-gkNmIlvZ1RKy4ljfjZeHztDWu0Wgt9uTVwcC8SCXvvdKqtiQ8v5oNtA7grwHPXPG15OXDFYiqHvhKUVG17-erSKGUK7O2pmJY9mWZ8iyijELGBy-NB61ei7aEg5jsvtpBXbL0ND3vwZ9Ne6f9J7_W6D_0YJrVDA7ESbokU67XJ37dAjbcdx3wsCdGyi4dHRNDLRtl1twWIlv-M0rr3r0kY69jtOec16g7y6ZNh513s3PPjOvnH00dJr_aRChe', '8 min read', true),

('Best Time for Umrah: A Complete Seasonal Guide', 'Discover the best months to visit Makkah and Madinah based on weather, crowd levels, and spiritual significance.', 'Full content here...', 'Planning', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoKHIP0C3QMaqa0Klr2dM78ntz2OMNGskdqZpgaSJ-t6CzhN9wtM0mVM_VfSXuA51y498oLIAKD-uoj3lEBnBE8WmcWNOLOSOq9dH9S0lGZIfFBT1ZhI-DDgNOWBLRTwE3G7J0rMP7EcoWJ320MQ5b4uQ8mPqH3otJS4kmYLSdyP7CkobPzxStF_dClqG1HjjpMwEyFmBv7FGdx4exw17NjJDYM-FTizn97bzsUtNLtNiN42PQQll7lzJbJk6og1ghe9D9P9QPzoGt', '6 min read', false),

('Top Ziyarat Places in Madinah You Must Visit', 'Explore the most significant historical and religious sites in Madinah, from Masjid Quba to Mount Uhud.', 'Full content here...', 'Destinations', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGAIsAHsj1aeHsF48svRjVUbf98DzT-X9LQhfvfa-q2PJlyI09AuEIY6srDte53YCFFWCd2EaqKD-uoj3lEBnBE8WmcWNOLOSOq9dH9S0lGZIfFBT1ZhI-DDgNOWBLRTwE3G7J0rMP7EcoWJ320MQ5b4uQ8mPqH3otJS4kmYLSdyP7CkobPzxStF_dClqG1HjjpMwEyFmBv7FGdx4exw17NjJDYM-FTizn97bzsUtNLtNiN42PQQll7lzJbJk6og1ghe9D9P9QPzoGt', '7 min read', false);

-- =============================================
-- SEED DATA - CMS CONTENT
-- =============================================

INSERT INTO cms_content (id, content) VALUES
('cms_home', '{
  "heroTitle": "Your Trusted Partner for Umrah & International Tours",
  "heroSubtitle": "Embark on a spiritual journey of a lifetime with our premium, all-inclusive Umrah packages and bespoke international travel experiences.",
  "heroCta": "View Umrah Packages",
  "heroWhatsApp": "Contact on WhatsApp"
}'),
('page_media', '{}');

-- =============================================
-- STORAGE BUCKETS (Run separately in Supabase Dashboard)
-- =============================================
-- Go to Storage > Create Bucket > Name: "uploads"
-- Set it to Public
-- Or run this via Supabase API:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('uploads', 'uploads', true);

-- =============================================
-- DONE - All tables created and seeded!
-- =============================================
