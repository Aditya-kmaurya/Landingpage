# Kidrove | AI & Robotics Summer Workshop Landing Page

Kidrove is a premium, production-quality educational landing page and backend server for a fictional robotics platform. This project features a responsive frontend, a high-tech modern landing page layout (inspired by startup product pages), and an Express.js server equipped with MongoDB integration and an automatic local JSON database fallback.

---

## 🚀 Tech Stack

### Frontend
- **React 19** (Vite, TypeScript)
- **Tailwind CSS v4** (Modern utility CSS, native variables)
- **Framer Motion** (Subtle premium micro-animations)
- **Sonner** (Visual toast notifications)
- **Lucide React** (Consistent svg iconography)
- **Canvas Confetti** (Interactive success celebrations)

### Backend
- **Node.js + Express.js** (ES Modules)
- **MongoDB + Mongoose** (Persistent data store)
- **Fallback Adapter** (Local file system database fallback in `backend/data/enquiries.json`)
- **Dotenv** (Environment variable management)
- **Cors** (Cross-origin sharing)

---

## 📂 Project Structure

```
gema/
├── backend/
│   ├── data/                 # JSON file fallback database (created on first save if Mongo is offline)
│   ├── src/
│   │   ├── config/          # DB connection configuration
│   │   ├── controllers/     # Route controller & regex email/phone validations
│   │   ├── models/          # Enquiry Mongoose Schema & local file save adapter
│   │   ├── routes/          # Express routing (POST /api/enquiry)
│   │   └── server.js        # Express application boot script
│   ├── .env                 # Server ports & MongoDB URI
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── public/              # Served robot illustration image assets
│   ├── src/
│   │   ├── components/      # Modular layout elements (Hero, FAQ accordion, Form, Navbar)
│   │   ├── services/        # Frontend API consumer layer
│   │   ├── App.tsx          # Main assembly page
│   │   └── index.css        # Tailwind v4 directives and color tokens
│   ├── vite.config.ts       # Vite configuration with Tailwind CSS v4
│   └── package.json
├── package.json             # Root monorepo scripts for concurrent launch
└── README.md                # Global documentation
```

---

## ⚙️ Quick Start Installation

Follow these steps to set up and run the project locally.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended, tested on v22.13.0)
- npm (tested on 10.9.2)
- *Optional*: [MongoDB Community Server](https://www.mongodb.com/try/download/community) (If not running, the backend automatically falls back to JSON file storage)

### Step 1: Install Dependencies
Run the following command in the **root** folder of the workspace to install all packages for the root, frontend, and backend automatically:
```bash
npm run install:all
```

### Step 2: Configure Environment Variables
Inside the `backend` folder, a default `.env` is created for you:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/kidrove
NODE_ENV=development
```
- If you have a running MongoDB instance locally or on Atlas, ensure `MONGODB_URI` points to it.
- If MongoDB is not running or the database cannot be selected within **3 seconds**, the server logs a fallback notice and will save all registrations to `backend/data/enquiries.json`.

### Step 3: Run the Application
Start both the React frontend dev server and the Express backend server concurrently by running:
```bash
npm run dev
```

The terminal will launch:
- **Frontend Developer Server**: [http://localhost:5173](http://localhost:5173)
- **Backend Express Server**: [http://localhost:5000](http://localhost:5000)

---

## 🛠️ API Documentation

### Register Enquiry
Submit a new registration enquiry from the landing page form.

- **Endpoint**: `/api/enquiry`
- **Method**: `POST`
- **Content-Type**: `application/json`

#### Payload Format
```json
{
  "name": "Alex Mercer",
  "email": "alex@mercer.com",
  "phone": "+91 9876543210"
}
```

#### Validations Enforced
- `name`: Must be present, non-empty, and at least 2 characters.
- `email`: Must be present and match valid email syntax (`user@domain.com`).
- `phone`: Must be present and consist of 10 to 15 digits (allowing spaces, hyphens, and a leading `+`).

#### Success Response (`201 Created`)
```json
{
  "success": true,
  "message": "Registration submitted successfully"
}
```

#### Validation Failure (`400 Bad Request`)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": "Please enter a valid email address",
    "phone": "Please enter a valid phone number (10-15 digits)"
  }
}
```

---

## 💡 Key Features Implemented

1. **Dual DB Adapter Pattern**: Seamless fallback to local JSON database storage if MongoDB is down, providing zero-friction evaluations.
2. **Tailwind CSS v4 System**: Color-coded design tokens (indigo/cyan theme) supporting custom grid patterns and radial glow filters.
3. **Smooth Theme Switcher**: Persisted light/dark mode switcher tied to system media preferences.
4. **Client-Side Validation & Live Prompts**: Highlighting validation errors immediately during typing and showing loaded state feedback.
5. **Interactive FAQ Accordion**: Custom height animation toggles.
6. **Confetti Celebration**: Celebrates successful registrations.
