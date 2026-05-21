# 🗄 Supabase Database & Security Guide

The database layer of **Rehman Umrah & Travels** is managed via **Supabase (PostgreSQL)**. This document acts as an interactive data directory defining the structure, columns, safety checks, and data models in use.

---

## 📊 Entity Relationship & Schema Breakdown

The schema comprises 6 primary data tables configured inside the Supabase instance:

### 1. `packages` (Umrah & Hajj Packages)
Stores detailed listings of devotional packages, categories, hotels, distances, and itineraries.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY`, `DEFAULT gen_random_uuid()` | Unique package identifier |
| `title` | `TEXT` | `NOT NULL` | Name of the Umrah/Hajj package |
| `description` | `TEXT` | - | Overview of hotels and inclusions |
| `price` | `NUMERIC` | - | Cost in PKR |
| `category` | `TEXT` | `DEFAULT 'Economy'` | Tier (e.g., 5 Star, 4 Star, Economy, Ramadan) |
| `duration` | `TEXT` | - | Duration (e.g., "15 Days", "10 Days") |
| `location` | `TEXT` | - | Cities visited (e.g., "Makkah & Madinah") |
| `hotel_name` | `TEXT` | - | Selected primary hotel name |
| `distance_from_haram` | `TEXT` | - | Distance description (e.g., "150m from Haram") |
| `image_url` | `TEXT` | - | Fully qualified URL path to the package banner image |
| `airline` | `TEXT` | - | Flight operator (e.g., "Qatar Airways") |
| `stars` | `INTEGER` | `DEFAULT 4` | Hotel star rating (1 to 5) |
| `badge` | `TEXT` | - | Accent UI tag (e.g., "Best Seller", "Popular") |
| `includes` | `TEXT[]` | - | Array of service inclusions |
| `itinerary` | `JSONB` | - | Structured day-by-day JSON format |
| `is_featured` | `BOOLEAN` | `DEFAULT false` | Highlights package on the primary homepage |
| `created_at` | `TIMESTAMPTZ` | `DEFAULT NOW()` | Date of creation |
| `updated_at` | `TIMESTAMPTZ` | `DEFAULT NOW()` | Date of last modification |

---

### 2. `tours` (International Holiday Packages)
Stores holiday schedules and pricing details for destinations like Turkey, Dubai, Malaysia, and Europe.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY`, `DEFAULT gen_random_uuid()` | Unique tour identifier |
| `title` | `TEXT` | `NOT NULL` | Tour title (e.g., "Turkey Elegance") |
| `subtitle` | `TEXT` | - | Subtitle highlighting cities visited |
| `description` | `TEXT` | - | Paragraph overview of key events |
| `price` | `NUMERIC` | - | Pricing in PKR |
| `duration` | `TEXT` | - | E.g. "10 Days / 9 Nights" |
| `image_url` | `TEXT` | - | Destination header image URL |
| `highlights` | `TEXT[]` | - | Array of major attractions |
| `is_featured` | `BOOLEAN` | `DEFAULT false` | Feature on home slides |

---

### 3. `visa_services` (Global Visa Handling)
Contains pricing, speed, requirements, and information details for target visa regions.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY`, `DEFAULT gen_random_uuid()` | Unique visa ID |
| `title` | `TEXT` | `NOT NULL` | Target (e.g., "Umrah Visa", "Schengen Visa") |
| `description` | `TEXT` | - | Detail explanation of the processing |
| `processing_time` | `TEXT` | - | Duration (e.g., "3-5 Business Days") |
| `fee` | `TEXT` | - | Cost outline (e.g., "PKR 15,000") |
| `icon` | `TEXT` | `DEFAULT 'description'` | Material Icon identifier string |
| `documents` | `TEXT[]` | - | Required materials array (e.g., "Valid Passport") |

---

### 4. `gallery` (Islamic & Historic Media)
Supports photo displays in the Gallery section categorized into groups.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY`, `DEFAULT gen_random_uuid()` | Unique image record ID |
| `src` | `TEXT` | `NOT NULL` | Image URL |
| `label` | `TEXT` | - | Overlay title shown on hover |
| `category` | `TEXT` | `DEFAULT 'Kaaba'` | Categories (e.g., "Kaaba", "Masjid Nabawi", "Ziyarat") |
| `type` | `TEXT` | `DEFAULT 'standard'` | Grid sizes (e.g., "wide", "tall", "standard") |

---

### 5. `blog_posts` (Pilgrimage Guides & Articles)
Houses educational contents, guides, packing suggestions, and seasonal updates.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY`, `DEFAULT gen_random_uuid()` | Unique blog post ID |
| `title` | `TEXT` | `NOT NULL` | Article title |
| `excerpt` | `TEXT` | - | Brief summary card snippet |
| `content` | `TEXT` | - | Rich content text or Markdown representation |
| `category` | `TEXT` | - | Category (e.g., "Guides", "Planning") |
| `image_url` | `TEXT` | - | Banner image URL |
| `read_time` | `TEXT` | - | E.g. "8 min read" |
| `featured` | `BOOLEAN` | `DEFAULT false` | Main blog section focus item |

---

### 6. `cms_content` (Dynamic Homepage Settings)
Supports content modifications from the admin panels without altering hardcoded code elements.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `TEXT` | `PRIMARY KEY` | Page section ID key (e.g., `cms_home`, `page_media`) |
| `content` | `JSONB` | `NOT NULL` | Arbitrary key-value config block (title, address, numbers) |

---

## 🔒 Security & Row Level Security (RLS) Policies

To protect backend entities from unauthorized write operations, **Row Level Security (RLS)** is enabled on all tables. 

The security strategy splits permissions as follows:

```sql
-- Example SQL Commands mapping security policies:

-- 1. Packages Policies
CREATE POLICY "Public can view packages" ON packages FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert packages" ON packages FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update packages" ON packages FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete packages" ON packages FOR DELETE USING (auth.role() = 'authenticated');
```

### Explanation of Security Clearances:
*   **Reads (SELECT)**: Completely open. Public read policy allows any unauthenticated user or client device to view products immediately, supporting quick CDN cache hits.
*   **Writes/Deletes (INSERT/UPDATE/DELETE)**: Highly restricted. Write actions require an `authenticated` user payload matching Supabase session tokens, **OR** must utilize a server-to-database connection executing requests under a `SUPABASE_SERVICE_ROLE_KEY` bypass client context.
*   **Server Bypass**: Since the website admin system logs in with standalone JWTs via backend API handlers, serverless endpoints under `api/` act as proxy supervisors. They receive incoming JWT authentication headers, authorize them, and utilize the secret **Supabase Admin Client** (bypassing RLS with `service_role`) to submit inserts and updates.

---

## 📂 Supabase Storage Buckets

To store dynamic images, a **Public Storage Bucket** needs to be active:
*   **Name**: `uploads`
*   **Public Access**: True
*   **Path Reference**: Images uploaded via the Admin Dashboard are placed under `uploads/`, generating static fully qualified URLs accessible on any client device.
