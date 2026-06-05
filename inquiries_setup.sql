-- =============================================
-- INQUIRIES TABLE SETUP FOR REHMAN UMRAH & TRAVELS
-- Run this in your Supabase SQL Editor
-- =============================================

CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  subject TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (so anyone can submit from website contact form)
CREATE POLICY "Public can insert inquiries" ON inquiries FOR INSERT WITH CHECK (true);

-- Allow authenticated users to view/delete (so only logged-in admin sees them)
CREATE POLICY "Authenticated users can select inquiries" ON inquiries FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete inquiries" ON inquiries FOR DELETE USING (auth.role() = 'authenticated');
