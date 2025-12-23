# CrochetGallery - Project Documentation

## 1. Executive Summary
**CrochetGallery** is a full-stack, "shop-first" e-commerce application designed for selling premium handmade crochet products. Built with **React** (Frontend) and **Node.js/Express** (Backend), it offers a complete shopping experience including user authentication, product browsing, cart management with live pricing, strict checkout validation tailored for Indian users, and a detailed order tracking system.

The project prioritizes a "Cozy & Artisanal" aesthetic and is architected for **portability**, using local JSON file storage to ensure it runs on any machine without complex database setups.

---

## 2. System Architecture

### Tech Stack
*   **Frontend:** React (Vite), CSS Modules, Context API, Lucide React (Icons), Axios.
*   **Backend:** Node.js, Express.js, JWT (JSON Web Tokens), Bcrypt.js, CORS.
*   **Database:** Server-side JSON File Storage (`/backend/data/`).

### Folder Structure
```
root/
├── package.json          # Root configuration for one-command startup
├── frontend/             # React Client
│   ├── src/
│   │   ├── components/   # Reusable UI (Navbar, Footer)
│   │   ├── context/      # global State (Auth, Shop)
│   │   ├── pages/        # Views (Shop, Cart, Checkout, Orders)
│   │   └── utils/        # Helpers (currency formatter)
├── backend/              # Node Server
│   ├── data/             # JSON Storage (products, users, orders)
│   ├── routes/           # API Endpoints
│   └── middleware/       # Auth Protection
```

---

## 3. Key Features & User Flow

### A. Authentication & Profile
*   **Secure Auth:** Users register and login using JWT-based authentication.
*   **Persistent Session:** Token stored in LocalStorage keeps users logged in.
*   **Profile Page:** Displays user details (Name, Email, Member ID) and provides a secure Logout function.

### B. Core Shopping Experience
*   **Shop-First Flow:** Post-login, users are instantly directed to the Shop grid.
*   **Product Discovery:**
    *   Live Category Filtering (Plushies, Home Decor, etc.).
    *   Real-time Search Bar.
*   **Product Details:** Deep dive page with high-res images, descriptions, and a custom quantity selector.
*   **INR Pricing:** All consistency strictly maintained in Indian Rupees (₹) using a central formatter.

### C. Smart Cart System
*   **Live Updates:** Add/Remove items and adjust quantities directly in the cart.
*   **Persistence:** Cart state is saved key-to-user in the backend, persisting across sessions.
*   **Dynamic Totals:** Subtotals and Grand Totals calculate instantly in INR.

### D. Secure Checkout & Validation
*   **Strict Validation Logic:**
    *   **Mobile:** Enforces exactly 10 digits (India standard). Refuses alphabets/symbols.
    *   **Pincode:** Enforces exactly 6 digits.
    *   **Mandatory Fields:** Name, Address, City, State are required.
*   **Error Handling:** Inline red error messages guide the user to correct mistakes before submission.

### E. Order Tracking System
*   **Order History:** List of all past orders with status badges (Placed, Shipped, Delivered).
*   **Timeline View:** Detailed order page showing a visual progress bar of the order status.
*   **Invoice Details:** Full breakdown of items, shipping address, and payment method (COD).

---

## 4. Technical Implementation Details

### Data Models (JSON Schema)

**1. Product (`products.json`)**
```json
{
  "id": "1",
  "name": "Cute Crochet Bear",
  "price": 1299,
  "category": "Plushies",
  "image": "/p1.jfif"
}
```

**2. Order (`orders.json`)**
```json
{
  "id": "1734969...",
  "userId": "user_123",
  "status": "Placed",
  "total": 3499,
  "shippingDetails": {
      "mobile": "9876543210",
      "zip": "500001",
      ...
  }
}
```

### API Endpoints (Backend)

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Create new user account | Public |
| `POST` | `/api/auth/login` | Authenticate & get Token | Public |
| `GET` | `/api/products` | Fetch all products | Public |
| `GET` | `/api/cart` | Get user's saved cart | **Protected** |
| `POST` | `/api/orders/checkout` | Validate & Place Order | **Protected** |
| `GET` | `/api/orders/history` | Get user's order list | **Protected** |
| `GET` | `/api/orders/:id` | Get single order details | **Protected** |

### Frontend State Management
*   **AuthContext:** Manages `user` object and `token`. Handles Auto-Login on refresh.
*   **ShopContext:** Central brain for the app.
    *   Fetches `products`.
    *   Syncs `cart` with backend.
    *   Exposes `addToCart`, `updateCartItemQuantity`, `getCartTotal` to all components.

---

## 5. How to Run (Portability)

The project is designed to be runnable on any system with Node.js installed.

1.  **Clone:** `git clone https://github.com/K007-K/crochetGallery.git`
2.  **Install:** Run `npm install && npm run install-all` in the root folder.
3.  **Start:** Run `npm start`.
    *   This fires up the Backend (Port 3000) and Frontend (Port 5173) simultaneously.
4.  **Access:** Open `http://localhost:5173`.
