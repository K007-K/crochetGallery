# CrochetGallery E-Commerce Application

A premium, full-stack e-commerce solution for a handmade crochet brand. Built with React (Frontend) and Node.js/Express (Backend).

## 🚀 Features

- **Full E-Commerce Flow:** Browse Shop, Add to Cart, Checkout, and View Orders.
- **Authentication:** Secure Login and Registration (JWT).
- **Core Shopping:** Real-time search, category filtering, and quantity management.
- **Premium UI:** "Cozy & Artisanal" design system with responsive layout.
- **Portability:** Uses local JSON storage (no external database setup required).

## 🛠️ Tech Stack

- **Frontend:** React, Vite, CSS Modules, Lucide React (Icons), Axios.
- **Backend:** Node.js, Express, JWT, Bcrypt.
- **Data:** JSON File Storage (in `backend/data/`).

## 📦 Prerequisites

- **Node.js** (v18 or higher recommended).
- **npm** (comes with Node.js).

## 🏃‍♂️ How to Run

You can run the entire application with a single command from the root directory.

### 1. Initial Setup
Install dependencies for both frontend and backend:
```bash
npm install
npm run install-all
```

### 2. Start Application
Run both servers (Backend on `:3000`, Frontend on `:5173`) concurrently:
```bash
npm start
```

### 3. Access
Open your browser and navigate to:
[http://localhost:5173](http://localhost:5173)

## 🧪 Test Data
**Format:** INR (₹)
- **Email:** `test@example.com`
- **Password:** `password123`
(Or register a new account)

## 📂 Project Structure
- `frontend/`: React UI code.
- `backend/`: API server and data storage.
- `legacy/`: Old static HTML files.
