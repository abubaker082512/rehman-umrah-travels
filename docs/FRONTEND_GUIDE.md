# 🎨 Frontend React Client Developer Guide

Welcome to the frontend reference manual for **Rehman Umrah & Travels** (branded as **Royal Travels & Tours**). This document describes page routes, layouts, design rules, stylesheet variables, global interactive widgets, and customization parameters.

---

## 🗺 Application Router (`client/src/App.jsx`)

The frontend application uses client-side routing managed by `react-router-dom` under a main router setup. The active page mapping matches the table below:

| Route Path | Page Component | Description |
| :--- | :--- | :--- |
| `/` | `Home.jsx` | Classic Gold/Green Landing Theme |
| `/home2` | `Home2.jsx` | Premium Modern Variant ("Proudly Serving") |
| `/home3` | `Home3.jsx` | Alternative Elegant Visual Layout (Current Logo + Assets) |
| `/flights` | `Flights.jsx` | Real-time / Static Flight Search and Book Module |
| `/packages` | `Packages.jsx` | Available Umrah, Hajj & Special Packages grid |
| `/package/:id` | `PackageDetail.jsx` | Detail package viewer (Itinerary, inclusions, form) |
| `/visa-services` | `VisaServices.jsx` | Requirements and pricing details for various countries |
| `/international-tours`| `InternationalTours.jsx`| International tourism products and custom bookings |
| `/gallery` | `Gallery.jsx` | Photo feed from Islamic holy places & tour groups |
| `/blog` | `Blog.jsx` | Listing of informative pilgrimage guides & articles |
| `/blog/:id` | `BlogPost.jsx` | Detailed rich article reader |
| `/about` | `About.jsx` | Company history, mission statements, and offices |
| `/faq` | `FAQ.jsx` | Interactive accordion with popular customer queries |
| `/contact` | `Contact.jsx` | Main office coordinates, interactive maps, and contact form |
| `/admin/login` | `Admin/Login.jsx` | Security portal for administrator session initiation |
| `/admin/dashboard` | `Admin/Dashboard.jsx` | Interactive CRUD console for managing packages, tours, and CMS content |

---

## 🎨 Global Styling System & Poppins Integration

The interface relies on **Tailwind CSS v4** combined with global stylesheet variables to maintain an elegant, premium look.

### ✒ Typography Switch to Poppins
All pages use the premium **Poppins font family** (weights 300 to 900) to project a smooth, highly readable, and contemporary feel. This was accomplished by remapping style configuration tokens:

1.  **Google Fonts Import** (`client/index.html`):
    Imports Poppins with full weight ranges dynamically:
    ```html
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Noto+Serif:wght@400;700&family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
    ```
2.  **Tailwind Class Core Mappings** (`client/tailwind.config.js`):
    Forces theme font tokens (`font-manrope`, `font-notoSerif`, `font-headline`, `font-body`, `font-label`) to leverage Poppins directly:
    ```javascript
    fontFamily: {
      "notoSerif": ["Poppins", "sans-serif"],
      "manrope": ["Poppins", "sans-serif"],
      "headline": ["Poppins", "sans-serif"],
      "body": ["Poppins", "sans-serif"],
      "label": ["Poppins", "sans-serif"]
    }
    ```
3.  **Root Fallbacks** (`client/src/index.css`):
    ```css
    :root {
      font-family: 'Poppins', sans-serif;
      --font-noto-serif: "Poppins", sans-serif;
      --font-manrope: "Poppins", sans-serif;
    }
    ```

---

## 🧩 Key Global Layout Elements

### 🍔 Premium Navigation Bar (`client/src/components/Navbar.jsx`)
*   **Logo Size Upgrade**: The brand logo height properties have been scaled up to **twice their original size** (`h-16 sm:h-20 w-auto`) to achieve clear, premium branding visibility.
*   **"Book Now" Action Button**: An elegant golden call-to-action button is integrated right into the navigation header on both desktop and mobile layouts. This links directly to the `/packages` directory for immediate package reservation.
*   **Props**: Supports `isVersion2` (transparent/overlay backdrop styles used on custom home pages).

### 📞 Interactive Floating WhatsApp Button
To maintain high customer conversion rates, a sticky, animated WhatsApp bubble is loaded in the bottom-right corner of the window.

```html
<!-- Floating Widget Structure -->
<a 
  href="https://wa.me/923XXXXXXXXX" 
  target="_blank" 
  rel="noopener noreferrer"
  className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 hover:bg-[#20ba5a] transition-all group"
>
  <!-- Interactive Label (Revealed on Hover) -->
  <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-bold tracking-wide uppercase transition-all duration-300 group-hover:max-w-xs group-hover:mr-2">
    Chat with Us
  </span>
  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">...</svg>
</a>
```

---

## 🏠 Comparison of Home Page Landing Variants

The project includes three homepage landing concepts, each with its own visual style and layout structure:

### 🌟 Home 1 (`client/src/pages/Home.jsx`)
*   **Visual Direction**: Classic Gold & Teal palette.
*   **Layout Sections**: Main Hero, core packages grid, custom booking inquiries card, about blocks, international tours highlights, interactive maps.

### 💎 Home 2 (`client/src/pages/Home2.jsx`)
*   **Visual Direction**: Modern and spacious layout.
*   **Key Phrase Change**: The main sub-headline in the hero section is updated from `Welcome to Royal Travels` to **`Proudly Serving`** to match local authority and heritage.
*   **Layout Features**: Fullscreen overlay header, clean grids, bold numbers counters.

### 👑 Home 3 (`client/src/pages/Home3.jsx`)
*   **Visual Direction**: Rich, visual landscape and image collage designs.
*   **Logo Synchronizations**: Integrates the updated corporate logo (`import logo from '../assets/Rehman Travel Logo.png'`).
*   **Hero Image Update**: Uses the premium high-definition background asset (`import background3 from '../assets/home-3.jpg'`) to match other site themes.
