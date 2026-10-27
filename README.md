# CampusMart

A campus marketplace where students can sell items they no longer use, and other students can buy what they need.

**Demo video:** [Watch on Google Drive](PASTE_YOUR_GOOGLE_DRIVE_SHAREABLE_LINK_HERE)

**Live app:** PASTE_YOUR_VERCEL_URL_HERE
**API:** PASTE_YOUR_RENDER_URL_HERE

## Features

- Register / login with JWT authentication
- Post items for sale (title, description, price, category, condition, image URL)
- Browse all items with search and category filter
- Item detail page with seller contact (visible after login) and WhatsApp chat link
- My Listings dashboard: edit, delete, mark as sold / available
- Protected routes and owner-only edit/delete

## Tech Stack

- **Frontend:** React (Vite), React Router, Axios, Context API
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT, bcryptjs
- **Deployment:** Vercel (frontend), Render (backend), MongoDB Atlas (database)

## Project Structure

```
campus-marketplace/
├── client/            # React frontend
│   └── src/
│       ├── components/    # Navbar, ListingCard, ProtectedRoute
│       ├── context/       # AuthContext (login state)
│       ├── pages/         # Home, Login, Register, ListingDetail, ListingForm, MyListings
│       └── api.js         # Axios instance with token
└── server/            # Express backend
    ├── config/        # DB connection
    ├── models/        # User, Listing
    ├── middleware/    # JWT auth
    ├── controllers/   # Business logic
    └── routes/        # API routes
```

## Run Locally

### 1. Backend

```bash
cd server
npm install
cp .env.example .env      # then fill in MONGO_URI and JWT_SECRET
npm run dev
```

### 2. Frontend

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:5173

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | No | Create account |
| POST | /api/auth/login | No | Login |
| GET | /api/auth/me | Yes | Current user |
| GET | /api/listings | No | All available listings (search, category, minPrice, maxPrice) |
| GET | /api/listings/mine | Yes | Logged-in user's listings |
| GET | /api/listings/:id | No | Single listing |
| POST | /api/listings | Yes | Create listing |
| PUT | /api/listings/:id | Yes (owner) | Update listing / mark sold |
| DELETE | /api/listings/:id | Yes (owner) | Delete listing |

## Environment Variables

**server/.env**
```
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_long_random_secret
CLIENT_URL=http://localhost:5173
```

**client/.env**
```
VITE_API_URL=http://localhost:5000/api
```
