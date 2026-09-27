# EcoTrack – Smart Waste Collection & Recycling Platform

> **FIT-FEST 2026 HACKATHON ENTRY**  
> **Challenge:** Smart Waste Collection & Recycling Platform  
> **Target Audience:** Urban households, municipal logistics & certified recyclers  

---

## 🍃 Project Overview

**EcoTrack** is a complete, working full-stack environmental management web application engineered for the **FIT-FEST 2026 Hackathon**. EcoTrack simplifies household waste collection by providing automated disposal guidance, seamless pickup scheduling, unique request ID generation (`ET-2026-XXXX`), live MongoDB tracking, and a SaaS-style administrative dashboard with interactive Recharts analytics.

---

## 🎯 Problem & Solution

### Problem
Household waste segregation and pickup logistics are often fragmented. Citizens lack clarity on recyclability rules, while collection agencies struggle with opaque status tracking, unorganized route schedules, and insufficient data on waste volume distribution.

### Solution
EcoTrack introduces a transparent end-to-end digital lifecycle:
1. **Rule-Based Disposal Guidance:** Instant guidance tailored to specific waste categories (Plastic, Paper, Organic, E-Waste, Glass, Metal, General Waste).
2. **Transparent Customer Tracking:** Every request generates a custom Request ID (`ET-2026-XXXX`) backed by real-time status updates directly from MongoDB.
3. **Operational Admin Console:** Real-time request management, search & multi-filter controls, route dispatching, and visual analytics powered by Recharts.

---

## ✨ Key Features

### 👤 Customer Features
- **Modern Tech Landing Page:** Environmental startup UI featuring impact metrics, process steps, and category highlights.
- **Smart Waste Guide:** Instant disposal tips for 7 waste categories (Plastic, Paper, Organic, E-Waste, Glass, Metal, General Waste).
- **Pickup Scheduling Form:** Real-time form validation with custom pickup time slots, date selection, and quantity estimates.
- **Unique Request ID Generation:** Server automatically generates human-readable IDs like `ET-2026-1042`.
- **Live Status Tracking (`/track`):** Interactive visual timeline showing progress (`Pending` → `Scheduled` → `Assigned` → `Picked Up` → `Completed` or `Cancelled`).

### 🛡️ Admin Features
- **Demo Portal Auth (`/admin/login`):** Pre-configured admin credentials for hackathon evaluation.
- **Operational Dashboard (`/admin/dashboard`):** Real-time KPI metric cards (Total, Pending, Scheduled, Picked Up, Completed).
- **Request Management Table (`/admin/requests`):** Search by customer name, phone, ID or city; filter by status and category; trigger inline status transitions stored immediately in MongoDB.
- **Route Dispatching (`/admin/scheduled`):** Dedicated dispatch view for active driver pickup routes.
- **Historical Archive (`/admin/history`):** Complete record of fulfilled and cancelled waste collections.
- **Interactive Recharts Analytics (`/admin/analytics`):**
  - Waste collected by category (Donut Chart)
  - Weekly pickup trends (Line Chart)
  - Status distribution comparison (Bar Chart)
  - Est. total waste weight diverted from landfills (Statistic Card)

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS v4, React Router DOM v7, Lucide React, Recharts
- **Backend:** Node.js, Express.js v5, Mongoose v8, CORS, dotenv
- **Database:** MongoDB (Local MongoDB for dev: `mongodb://127.0.0.1:27017/ecotrack`)
- **Deployment:** Docker Multi-stage build, Google Cloud Run ready

---

## 🏗️ Architecture & Project Structure

```text
ecotrack/
├── client/                     # Vite + React + Tailwind CSS Frontend
│   ├── src/
│   │   ├── components/         # Navbar, Footer, SmartWasteGuide, StatusTimeline, AdminSidebar
│   │   ├── context/            # AuthContext (Admin Session)
│   │   ├── pages/              # Home, RequestPickup, TrackRequest, AdminLogin, Admin Dashboard Views
│   │   ├── App.jsx             # Main Router Setup
│   │   └── main.jsx
│   ├── vite.config.js          # API Proxy & Tailwind plugin configuration
│   └── package.json
├── server/                     # Node.js + Express + Mongoose Backend
│   ├── config/
│   │   └── db.js               # MongoDB Mongoose connection
│   ├── models/
│   │   └── PickupRequest.js    # PickupRequest Schema
│   ├── controllers/
│   │   └── requestController.js# CRUD APIs & Analytics calculator
│   ├── routes/
│   │   └── requestRoutes.js   # Express Router endpoints
│   ├── seed.js                 # Realistic seed dataset (Indian locations)
│   ├── server.js               # Express application entrypoint
│   └── package.json
├── .env                        # Local environment variables
├── .env.example                # Example environment template
├── .gitignore                  # Git ignore rules
├── Dockerfile                  # Production container definition for Cloud Run
├── package.json                # Root package configuration
└── README.md                   # Complete documentation
```

---

## 🔑 Demo Credentials

To access the Admin Portal:

- **Login URL:** `/admin/login`
- **Email:** `admin@ecotrack.com`
- **Password:** `admin123`

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- Node.js (v18+ or v20+)
- npm (v9+ or v10+)
- MongoDB installed & running locally on port `27017`

### 1. Install Dependencies
Install server and client packages from the root directory:
```bash
cd server && npm install
cd ../client && npm install
cd ..
```

### 2. Configure Environment
A `.env` file is prepared in the root directory:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/ecotrack
PORT=8080
NODE_ENV=development
```

### 3. Seed Database
Populate MongoDB with 15+ realistic demo requests across Ashta, Sangli, Islampur, Kolhapur, and Pune:
```bash
npm run seed
```

### 4. Build & Run Application
Build the React production bundle and launch the Express server:
```bash
npm run build
npm start
```
The application will be live at: **http://localhost:8080**

*(Alternatively, to run the Vite dev server with API proxy, run `cd client && npm run dev` in a second terminal window).*

---

## 📡 API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/requests` | Create a new pickup request (Generates `ET-2026-XXXX`) |
| `GET` | `/api/requests` | List requests with optional `search`, `status`, `category` filters |
| `GET` | `/api/requests/:requestId` | Fetch single request by custom Request ID or Mongo `_id` |
| `PATCH` | `/api/requests/:requestId/status` | Update status (`Pending`, `Scheduled`, `Assigned`, `Picked Up`, `Completed`, `Cancelled`) |
| `GET` | `/api/statistics` | Fetch dashboard counts, category distribution, and weekly trends |

---

## 🐳 Docker & Google Cloud Run Deployment

### Docker Container Build & Execution
Build the production Docker image locally:
```bash
docker build -t ecotrack:latest .
docker run -p 8080:8080 -e MONGODB_URI="mongodb+srv://<user>:<password>@cluster.mongodb.net/ecotrack" ecotrack:latest
```

### Deploying to Google Cloud Run
1. Set up a MongoDB Atlas cluster and acquire your production connection string: `mongodb+srv://...`
2. Push your image to Google Container Registry (GCR) or Artifact Registry:
   ```bash
   gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/ecotrack
   ```
3. Deploy to Cloud Run with environment variable configuration:
   ```bash
   gcloud run deploy ecotrack \
     --image gcr.io/YOUR_PROJECT_ID/ecotrack \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars MONGODB_URI="mongodb+srv://YOUR_ATLAS_URI/ecotrack"
   ```

---

## 🏆 FIT-FEST 2026 Hackathon Verification Checklist

- [x] Full-stack architecture implemented in single project repository
- [x] Local MongoDB integration via Mongoose (`mongodb://127.0.0.1:27017/ecotrack`)
- [x] Automated Request ID generation (`ET-2026-XXXX`)
- [x] Real-time tracking timeline backed by live MongoDB updates
- [x] Rule-based smart waste disposal guidance without AI dependencies
- [x] Admin Login with pre-filled demo credentials (`admin@ecotrack.com` / `admin123`)
- [x] Admin Dashboard & Requests table with status updates (`PATCH /api/requests/:requestId/status`)
- [x] Recharts analytics (Category Donut, Weekly Line, Status Bar charts)
- [x] Realistic seed data script (`npm run seed`)
- [x] Production Dockerfile and Cloud Run compatibility
