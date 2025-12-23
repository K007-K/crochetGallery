# CrochetGallery - The Ultimate Guide
> **For Beginners & Developers:** A complete breakdown of how this E-Commerce Application is built, from concepts to code.

---

## 1. What is this Project?
**CrochetGallery** is an online store for selling handmade crochet items.
Think of it like a mini-Amazon, but built specifically for a boutique brand.

**Key Features:**
*   **Customers can:** Browse products, search, filter by category, add items to a cart, and place orders.
*   **The System can:** Validate addresses (Indian format), calculate totals in Rupees (₹), and track order status (Placed -> Delivered).

---

## 2. Technology Stack (The "Ingredients")

To build this, we used the **MERN** stack approach (minus the MongoDB, for simplicity). Here is what everything does:

### A. The Frontend (What the User Sees)
*   **React:** A library for building user interfaces. Instead of writing HTML for every page, we build "Components" (like `Navbar`, `ProductCard`) and reuse them.
*   **Vite:** A tool that runs our React app extremely fast while developing.
*   **Context API:** The "Brain" of the frontend. It holds data (like the Cart items) that needs to be accessible by *every* page.
*   **Lucide React:** A library for the icons (Shopping Bag, User, Menu).
*   **Axios:** A messenger. It lets our Frontend talk to our Backend (e.g., "Hey Backend, give me the list of products").

### B. The Backend (The Server / Logic)
*   **Node.js:** Allows us to run JavaScript outside the browser (on the server).
*   **Express.js:** A framework that makes building a server easy. It handles "Routes" (like `/api/products` or `/api/login`).
*   **JWT (JSON Web Token):** A secure digital ID card. When a user logs in, we give them a token. They show this token to prove who they are when placing an order.
*   **File Storage (JSON):** Instead of a complex database, we save data in simple text files (`.json`). This makes the project easy to move and run anywhere.

---

## 3. Project Structure (The "Map")

### Root Folder
*   `package.json`: The ID card for the project. Lists dependencies and start scripts.
*   `concurrently`: A tool used in our `npm start` script to run both Backend and Frontend with one command.

### `backend/` Folder
*   **`server.js`**: The Entry Point. This file starts the server and says "I am ready to listen for requests."
*   **`routes/`**: The Menu of the server.
    *   `auth.js`: Handles Login/Register.
    *   `products.js`: Handles fetching product lists.
    *   `cart.js`: Handles adding/removing items from cart.
    *   `orders.js`: Handles checkout and history.
*   **`data/`**: Our "Database".
    *   `users.json`, `products.json`, `orders.json`.
*   **`middleware/`**: The Security Guards.
    *   `authMiddleware.js`: Checks if a user has a valid Token before letting them access protected routes (like Cart or Orders).

### `frontend/` Folder
*   **`src/pages/`**: The actual screens (Shop Page, Checkout Page, etc.).
*   **`src/components/`**: Reusable parts (Navbar, Footer).
*   **`src/context/`**:
    *   `ShopContext.jsx`: Magic file that handles the whole Shopping Cart logic (Add, Remove, Calculate Total).
    *   `AuthContext.jsx`: Handles User Login/Logout state.

---

## 4. Deep Dive: How It Works

### Scenario 1: A User Logs In
1.  **Frontend:** User enters email/password in `Login.jsx`.
2.  **Action:** `axios.post('/api/auth/login')` sends this data to the Backend.
3.  **Backend (`routes/auth.js`):**
    *   Reads `users.json`.
    *   Finds the user.
    *   Checks if password matches (using `bcrypt` to compare hashes).
    *   If correct, generates a **JWT Token**.
4.  **Result:** Backend sends the Token back. Frontend saves it in `localStorage` (browser memory) and updates `AuthContext` to say "User is Logged In".

### Scenario 2: Adding to Cart
1.  **Frontend:** User clicks "Add to Cart" on a Product.
2.  **Logic (`ShopContext.jsx`):**
    *   If user is NOT logged in -> Alert "Please Login".
    *   If logged in -> Call API `POST /api/cart/add`.
3.  **Backend (`routes/cart.js`):**
    *   Reads `carts.json`.
    *   Finds the user's cart.
    *   Adds the item (or increases quantity if it exists).
    *   Saves the file.
4.  **Sync:** Frontend fetches the updated cart immediately so the number in the Navbar updates.

### Scenario 3: Checkout & Validation
1.  **Page:** `Checkout.jsx`.
2.  **User Input:** Enters Name, Mobile, Address.
3.  **Validation (The "Bouncer"):**
    *   Before sending, the code checks: *Is Mobile 10 digits? Is Pincode 6 digits?*
    *   If NO: Show red error text.
    *   If YES: Send order to Backend.
4.  **Backend (`routes/orders.js`):**
    *   Double-checks validation (Safety first!).
    *   Creates a new Order Object with status "Placed".
    *   Saves to `orders.json`.
    *   Clears the user's cart.
5.  **Result:** User is redirected to the "My Orders" page.

---

## 5. Critical Code Snippets Explained

### A. The Authentication Middleware (`backend/middleware/authMiddleware.js`)
This function runs before protected routes. It acts like a ticket checker.
```javascript
const authenticateToken = (req, res, next) => {
    // 1. Get the token from the request header "Authorization: Bearer <token>"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // 2. No token? You shall not pass!
    if (!token) return res.sendStatus(401);

    // 3. Verify token is real and not expired
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        // 4. Attach user info to the request so the next function knows who this is
        req.user = user;
        next(); // Proceed to the actual route
    });
};
```

### B. Formatting Currency (`frontend/src/utils/currency.js`)
Ensures every price looks like "₹1,299" and not "$1299" or "1299".
```javascript
export const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', { // 'en-IN' = English (India)
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0 // No decimal cents for clean look
    }).format(amount);
};
```

---

## 6. How to Run This Project

If you are a complete beginner, here is how you start this engine:

1.  **Download:** Clone the code or download the ZIP.
2.  **Terminal:** Open your command prompt/terminal in the project folder.
3.  **Install:** Type `npm install` and hit Enter. This downloads all the "ingredients" (React, Express, etc.).
4.  **Setup:** Type `npm run install-all`. This ensures both backend and frontend get their specific libraries.
5.  **Start:** Type `npm start`.
    *   You will see messages saying "Server running on 3000" and "Vite ready".
6.  **Browser:** Open `http://localhost:5173`.

**Congratulations! You are now running a full-stack e-commerce store.**
