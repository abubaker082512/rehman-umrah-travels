# 🗂 Rehman Umrah & Travels Code Index

Welcome to the central developer navigation index for **Rehman Umrah & Travels** (branded as **Royal Travels & Tours**). This file maps key files, architecture paths, database schemas, and references to specialized guides in this repository.

---

## 📖 System Guides & Documentation Directory

We have created highly-detailed guides to explain every aspect of the codebase. Click the links below to view the relevant documentation:

*   **🏛 [System Architecture & File Tree](file:///d:/Rehman%20Umrah%20&%20Travels/docs/ARCHITECTURE.md)**: Outlines the high-fidelity tech stack, folder layouts, and system request flows (both standalone and serverless environments).
*   **🗄 [Database & Security System](file:///d:/Rehman%20Umrah%20&%20Travels/docs/DATABASE.md)**: A complete data dictionary covering the 6 active tables, fields, types, RLS (Row Level Security) policies, and storage setup.
*   **🔌 [Backend API Reference Manual](file:///d:/Rehman%20Umrah%20&%20Travels/docs/API_REFERENCE.md)**: Comprehensive specification of serverless endpoints (`api/*`) and server routes (`server/*`), detailing request structures, methods, authentication, and responses.
*   **🎨 [Frontend Client Developer Guide](file:///d:/Rehman%20Umrah%20&%20Travels/docs/FRONTEND_GUIDE.md)**: Deep dive into the client directory (`client/`), covering client routes, layout differences (Home 1, 2, & 3), custom features (doubled logo, Poppins font remapping), and the interactive floating WhatsApp button.
*   **🛠 [Local Setup & Vercel Deployment](file:///d:/Rehman%20Umrah%20&%20Travels/docs/DEVELOPMENT_DEPLOYMENT.md)**: Step-by-step instructions on running the environment locally with concurrent dev servers, loading database SQL setup configurations, and deploying serverless environments in Vercel.

---

## 📁 Main Folders & Code Indexes

Below is an overview of the key directories and their active code files:

### 1. `api/` (Vercel Serverless Backends)
*   [api/packages.js](file:///d:/Rehman%20Umrah%20&%20Travels/api/packages.js): Handles all CRUD actions and database sync operations for packages, backed by Supabase.
*   [api/auth/login.js](file:///d:/Rehman%20Umrah%20&%20Travels/api/auth/login.js): Encodes JWT login tokens matching secure credentials.
*   [api/_utils/supabase.js](file:///d:/Rehman%20Umrah%20&%20Travels/api/_utils/supabase.js): Connects to the primary public client and the admin client (which bypasses RLS using the service role key).
*   [api/tours.js](file:///d:/Rehman%20Umrah%20&%20Travels/api/tours.js), [api/visa.js](file:///d:/Rehman%20Umrah%20&%20Travels/api/visa.js), [api/gallery.js](file:///d:/Rehman%20Umrah%20&%20Travels/api/gallery.js), [api/blog.js](file:///d:/Rehman%20Umrah%20&%20Travels/api/blog.js): Database interactions for the various frontend segments.

### 2. `client/` (Vite + React App)
*   [client/src/App.jsx](file:///d:/Rehman%20Umrah%20&%20Travels/client/src/App.jsx): Declares page routes and browser routers.
*   [client/src/index.css](file:///d:/Rehman%20Umrah%20&%20Travels/client/src/index.css): Sets base variables and imports standard Tailwind utility modules.
*   [client/tailwind.config.js](file:///d:/Rehman%20Umrah%20&%20Travels/client/tailwind.config.js): Remaps and synchronizes the global Poppins typography classes.
*   [client/vite.config.js](file:///d:/Rehman%20Umrah%20&%20Travels/client/vite.config.js): Configuration for dev servers and backend API proxies.

#### 🧩 Custom Client Components
*   [client/src/components/Navbar.jsx](file:///d:/Rehman%20Umrah%20&%20Travels/client/src/components/Navbar.jsx): Global header widget containing the scaled corporate logo and the gold "Book Now" action link.
*   [client/src/components/Footer.jsx](file:///d:/Rehman%20Umrah%20&%20Travels/client/src/components/Footer.jsx): Global footer presenting details fetched from CMS configurations.
*   [client/src/components/BannerContactForm.jsx](file:///d:/Rehman%20Umrah%20&%20Travels/client/src/components/BannerContactForm.jsx): High-fidelity booking form integrated with dynamic math captcha validations.

#### 🖥 Layout Variants & Pages
*   [client/src/pages/Home.jsx](file:///d:/Rehman%20Umrah%20&%20Travels/client/src/pages/Home.jsx): Classic green/gold homepage layout.
*   [client/src/pages/Home2.jsx](file:///d:/Rehman%20Umrah%20&%20Travels/client/src/pages/Home2.jsx): Modern homepage with "Proudly Serving" sub-headline.
*   [client/src/pages/Home3.jsx](file:///d:/Rehman%20Umrah%20&%20Travels/client/src/pages/Home3.jsx): Visual landscape design with custom background import configurations.
*   [client/src/pages/Admin/Dashboard.jsx](file:///d:/Rehman%20Umrah%20&%20Travels/client/src/pages/Admin/Dashboard.jsx): Extensive workspace console letting administrators upload images, catalog travel dates, and manage packages.

### 3. `server/` (Standalone Node/Express Server)
*   [server/index.js](file:///d:/Rehman%20Umrah%20&%20Travels/server/index.js): Express server entry point.
*   [server/routes/packageRoutes.js](file:///d:/Rehman%20Umrah%20&%20Travels/server/routes/packageRoutes.js): Endpoint routes handling data modifications.
*   [server/middleware/auth.js](file:///d:/Rehman%20Umrah%20&%20Travels/server/middleware/auth.js): Intercepts requests to validate admin tokens.

---

## ⚡ Fast-Track Launch CLI Reference

To get started quickly, run these commands in the root workspace folder:

```bash
# 1. Install dependencies across the project
npm install

# 2. Spin up the Express server and Vite React client concurrently
npm run dev
```

*   **API Local Root**: `http://localhost:5000`
*   **Vite Local Root**: `http://localhost:5173`
