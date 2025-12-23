# Project Analysis & FAQ

## 1. Advantages (Pros)
*   **Zero-Config Portability:** The biggest strength. Because it uses JSON files for a database, anyone can clone and run it immediately without installing MongoDB, SQL, or setting up cloud accounts. This makes it perfect for demos, hackathons, and assignments.
*   **Full-Stack Architecture:** Unlike a simple UI clone, this is a distinct "Three-Tier" architecture (Client, Server, Database), demonstrating a complete understanding of how web apps work.
*   **Security Best Practices:** Even though it's simple, it implements real-world security:
    *   **Password Hashing:** Passwords are not stored in plain text (uses `bcrypt`).
    *   **JWT Authentication:** Uses stateless token-based auth, the industry standard.
    *   **Input Validation:** Strict Regex checks on the backend for Indian mobile numbers and pincodes.
*   **Performance:** For a small dataset, reading from local JSON files coupled with Vite's fast bundling makes the application feel instant.

## 2. Disadvantages (Cons)
*   **Scalability:** JSON file storage is not a real database. It reads/writes the *entire* file for every operation. If you had 100,000 users, the app would become extremely slow or crash.
*   **Concurrency Issues:** If two users try to buy an item at the exact same millisecond, the file write might conflict, leading to data loss (File locks are not implemented).
*   **No Real Payment Gateway:** The checkout uses "Cash on Delivery" logic. A real store needs Stripe or Razorpay integration.
*   **Static Assets:** Images are stored locally (`/public`). In a production app, you would use a cloud service like AWS S3 or Cloudinary.

---

## 3. Common Interview/Viva Questions

**Q1: Why did you use JSON files instead of a database like MongoDB?**
*Answer:* "I prioritized portability and simplicity for this iteration. It allows the project to be 'plug-and-play' on any machine without environment setup. However, the architecture is modular - the `fileStorage.js` utility could be easily swapped out for a MongoDB connection without changing the main logic."

**Q2: How do you handle User Authentication?**
*Answer:* "I implemented stateless authentication using **JSON Web Tokens (JWT)**. When a user logs in, the server signs a token with a secret key. This token is sent to the client and stored in LocalStorage. For subsequent requests, an `authMiddleware` intercepts the request, verifies the token's signature, and allows access only if valid."

**Q3: What happens if I refresh the page? Do I lose my cart?**
*Answer:* "No. The cart data is persisted on the Server (in `carts.json`) linked to the User ID. When the page reloads, the `ShopContext` immediately requests the latest cart state from the backend API, ensuring the data is always synced."

**Q4: How are you validating the checkout form?**
*Answer:* "I implemented validation on **both** the Frontend and Backend.
*   **Frontend:** Gives immediate visual feedback to the user (e.g., 'Mobile number must be 10 digits') using Regex before they submit.
*   **Backend:** Acts as the final safety net. Even if someone bypasses the UI, the API will reject the request if the data format is incorrect."

**Q5: How would you improve this if you had more time?**
*Answer:* "I would introduce a real database (MongoDB), implement image uploading using Cloudinary, add a payment gateway like Razorpay, and add an Admin Dashboard to manage products and order statuses."
