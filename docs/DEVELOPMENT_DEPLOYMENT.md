# 🛠 Development & Deployment Guide

This guide explains how to run **Rehman Umrah & Travels** locally, manage environment variables, connect to your Supabase instance, and deploy the application to Vercel.

---

## 💻 Local Development Setup

To run both the server and client concurrently on your local machine, follow these steps:

### 1. Prerequisite Installations
*   Ensure **Node.js** (v18 or higher) and **npm** are installed.

### 2. Dependency Resolution
Run `npm install` at the **repository root** to configure the project dependencies, including concurrently:
```bash
npm install
```

This installs key dependencies at the root level and allows scripts to manage both components.

### 3. Setup Local Environment Variables
Create a file named `.env` inside the `server/` directory:
```env
PORT=5000
SUPABASE_URL=https://your-supabase-project-id.supabase.co
SUPABASE_KEY=your-supabase-anon-public-key
JWT_SECRET=your_custom_secret_key_for_tokens
```

For the client, Vite dynamically references the API proxy. If you prefer to declare variables explicitly, create a `client/.env` file:
```env
VITE_API_URL=http://localhost:5000
```

### 4. Running the Dev Servers
Launch the concurrent developer scripts by running:
```bash
npm run dev
```

This command uses `concurrently` to boot up:
1.  **Express Backend**: Starts at `http://localhost:5000`.
2.  **Vite Dev Server**: Starts at `http://localhost:5173`.
    *   *Note*: The client dev server proxy in `client/vite.config.js` will automatically redirect requests starting with `/api` to `http://localhost:5000`.

---

## ⚡ Database Sync (Supabase PostgreSQL)

To sync your database instance with the required structure:
1.  Go to your **Supabase Dashboard** -> **SQL Editor**.
2.  Open the `supabase-setup.sql` script located in the project root.
3.  Copy and paste the entire script content into the editor and click **Run**.
4.  This creates the tables (`packages`, `tours`, `visa_services`, `gallery`, `blog_posts`, `cms_content`), enables Row Level Security (RLS) on each, configures the public select/authenticated modify security policies, and inserts starter seed data.

---

## 🚀 Deployment to Vercel (Production)

The repository is fully configured for seamless deployment as a **hybrid serverless application** on Vercel.

### 📁 How Vercel Processes Your Code
*   **Vite Static Assets**: The frontend React app is built using the command `npm run build` specified inside the `client/` folder. The built files are outputted to `client/dist`, which Vercel hosts on its edge CDN.
*   **Serverless APIs**: Vercel detects files under the `api/` directory and deploys them as independent, auto-scaling serverless Node.js lambda functions.
*   **Path Routing**: The rewrites in `vercel.json` map `/api/*` requests to their corresponding serverless handler files, while forwarding all standard browser URLs to `index.html` to allow the React client to handle routing.

### ⚙ Required Vercel Environment Variables
When importing the project into the Vercel Dashboard, navigate to **Project Settings** -> **Environment Variables** and add the following keys:

| Environment Key | Recommended Value | Purpose |
| :--- | :--- | :--- |
| `SUPABASE_URL` | `https://xxxx.supabase.co` | Supabase endpoint |
| `SUPABASE_KEY` | `your-anon-public-key` | Used for safe SELECT operations |
| `SUPABASE_SERVICE_ROLE_KEY` | `your-secret-service-key` | **Required** for dashboard modifications |
| `JWT_SECRET` | `your_custom_secret_key` | Signs and validates admin sessions |

### 🛠 Deployment CLI Commands
If deploying manually via the Vercel CLI:
```bash
# 1. Install Vercel CLI globally (if not done)
npm install -g vercel

# 2. Deploy a staging version
vercel

# 3. Deploy to production
vercel --prod
```
