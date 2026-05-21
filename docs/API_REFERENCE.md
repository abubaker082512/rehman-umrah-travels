# 🔌 Backend API Reference

This document maps all server and serverless API endpoints available in the **Rehman Umrah & Travels** codebase, detailing request requirements, parameter expectations, and expected outputs.

---

## ⚡ Serverless Endpoints (`api/`)

Serverless handlers are mapped via `vercel.json` and executed as isolated runtime functions under cloud servers.

### 🔑 Authentication API (`api/auth/login.js`)
Handles admin authentication and distributes cryptographic JWT tokens.

*   **Endpoint**: `/api/auth/login`
*   **Method**: `POST`
*   **Request Headers**: `Content-Type: application/json`
*   **Request Payload**:
    ```json
    {
      "username": "admin",
      "password": "your_secure_password"
    }
    ```
*   **Successful Response (200 OK)**:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWlu..."
    }
    ```
*   **Error Response (401 Unauthorized)**:
    ```json
    {
      "message": "Invalid credentials"
    }
    ```

---

### 📦 Packages API (`api/packages.js`)
Performs CRUD operations and database seed triggers for devotional packages.

#### 1. List All Packages
*   **Endpoint**: `/api/packages`
*   **Method**: `GET`
*   **Response Format (200 OK)**: Returns an array of package objects sorted by creation date (newest first).
    ```json
    [
      {
        "id": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
        "title": "Premium 5-Star Executive Umrah",
        "price": 485000,
        "category": "5 Star",
        "duration": "15 Days",
        "location": "Makkah & Madinah",
        "hotel_name": "Pullman ZamZam Makkah",
        "distance_from_haram": "150m from Haram",
        "image_url": "https://...",
        "airline": "Qatar Airways",
        "stars": 5,
        "badge": "Best Seller",
        "includes": ["E-Visa Processing", "Return Flights"],
        "itinerary": [
          { "day": "Day 01", "title": "Arrival", "description": "Check-in at hotel" }
        ],
        "is_featured": true
      }
    ]
    ```

#### 2. Get Single Package Details
*   **Endpoint**: `/api/packages/:id`
*   **Method**: `GET`
*   **Response Format (200 OK)**: Returns the single target package object. Returns `404 Not Found` if the package ID is missing.

#### 3. Create Package
*   **Endpoint**: `/api/packages`
*   **Method**: `POST`
*   **Headers**: `Authorization: Bearer <JWT_TOKEN>`
*   **Request Payload**: Package detail key-value properties.
*   **Response Format (210 Created)**: Returns the newly inserted record with generated database UUID and metadata.

#### 4. Update Package Details
*   **Endpoint**: `/api/packages/:id`
*   **Method**: `PUT`
*   **Headers**: `Authorization: Bearer <JWT_TOKEN>`
*   **Request Payload**: Key-value pairs to modify.
*   **Response Format (200 OK)**: Updated package database representation.

#### 5. Delete Package
*   **Endpoint**: `/api/packages/:id`
*   **Method**: `DELETE`
*   **Headers**: `Authorization: Bearer <JWT_TOKEN>`
*   **Response Format (200 OK)**:
    ```json
    {
      "message": "Package deleted"
    }
    ```

---

### ✈ Tours API (`api/tours.js`)
Manages CRUD operations for international holiday packages.

*   **Endpoints**:
    *   `GET /api/tours` - Retrieve all vacation products.
    *   `GET /api/tours/:id` - Fetch details for a specific itinerary.
    *   `POST /api/tours` - Add a new holiday path (Requires Admin JWT).
    *   `PUT /api/tours/:id` - Edit a holiday schedule (Requires Admin JWT).
    *   `DELETE /api/tours/:id` - Erase a tour card from DB (Requires Admin JWT).

---

### 💳 Visa Services API (`api/visa.js`)
Handles inquiries and processing details for various visa destinations.

*   **Endpoints**:
    *   `GET /api/visa` - Return list of available country visas.
    *   `GET /api/visa/:id` - Check particular criteria for a specific country.
    *   `POST /api/visa` - Add dynamic visa records (Requires Admin JWT).
    *   `PUT /api/visa/:id` - Update fee, requirements, or documents (Requires Admin JWT).
    *   `DELETE /api/visa/:id` - Erase country records (Requires Admin JWT).

---

### 🖼 Gallery API (`api/gallery.js`)
Controls storage-linked gallery assets for the photography feed.

*   **Endpoints**:
    *   `GET /api/gallery` - Fetch list of photo paths, sizes, and hover labels.
    *   `POST /api/gallery` - Catalog a new image source link (Requires Admin JWT).
    *   `DELETE /api/gallery/:id` - Unlink photo coordinates (Requires Admin JWT).

---

### 📝 Blog Posts API (`api/blog.js`)
Responsible for reading and writing blog publications.

*   **Endpoints**:
    *   `GET /api/blog` - Retrieve all publications.
    *   `GET /api/blog/:id` - Return single detailed article data.
    *   `POST /api/blog` - Add new educational resources (Requires Admin JWT).
    *   `PUT /api/blog/:id` - Edit article content (Requires Admin JWT).
    *   `DELETE /api/blog/:id` - Remove blog listing (Requires Admin JWT).

---

### 🛠 CMS Settings API (`api/cms.js`)
Stores key homepage content elements (headings, subheaders, contact information block) in an isolated database catalog to support live content updates.

*   **Endpoints**:
    *   `GET /api/cms` - Return site settings map and address details.
    *   `POST /api/cms` - Save layout changes and settings block in `cms_content` table (Requires Admin JWT).

---

### 💓 Health Check API (`api/health.js`)
*   **Endpoint**: `/api/health`
*   **Method**: `GET`
*   **Response Format (200 OK)**:
    ```json
    {
      "status": "healthy",
      "timestamp": "2026-05-21T10:00:00.000Z"
    }
    ```

---

## 🗄 Express Router Fallback (`server/`)

For standalone environments running under `node server/index.js` instead of serverless, Express maps routing identically:

*   **Router Base**: `http://localhost:5000/api`
*   **Admin Auth Routes**: Mounts routes defined in `server/routes/authRoutes.js` at `/api/auth`
*   **Package Routes**: Mounts routes defined in `server/routes/packageRoutes.js` at `/api/packages`
*   **Protection Middleware**: `server/middleware/auth.js` checks request authorization headers for valid JWT elements prior to passing requests to write routers.
