# Garments Order & Production Tracker System (Haystack)

## Live Link: [https://b12-a11-category-16-bijoy-chandra-roy.netlify.app](https://b12-a11-category-16-bijoy-chandra-roy.netlify.app)

## Purpose
The **Garments Order & Production Tracker System** (branded as **Haystack**) is a comprehensive web-based platform designed to bridge the gap between garment buyers and manufacturing factories. Its primary purpose is to streamline the production workflow by offering real-time transparency. It allows factory managers to oversee production stages (from cutting to shipping), enables global buyers to track their orders via a visual timeline, and provides administrators with analytics to monitor overall business performance.

## Key Features
* **Role-Based Dashboards:** Distinct, secure dashboards for three user roles:
    * **Admins:** Manage users, view financial analytics (Recharts), and oversee system stats.
    * **Managers:** Add/Edit products, update production status (Cutting, Sewing, Finishing, etc.), and manage inventory.
    * **Buyers:** Browse products, place orders, view payment history, and track shipments.
* **Real-Time Production Tracking:** A visual timeline and Leaflet-based map integration allow buyers to see exactly which stage their order is in and its current location.
* **Secure Authentication:** Powered by **Firebase** (Google & Email/Password) with JWT (JSON Web Token) implementation for secure, role-protected routes (Private, Admin, and Manager routes).
* **Payment Integration:** Seamless payment processing using **Stripe**, supporting secure transactions for bulk orders.
* **Data Visualization:** Interactive charts for admins to visualize revenue, user growth, and order statistics.
* **Responsive & Interactive UI:** Built with **Tailwind CSS** and **DaisyUI** for a fully responsive design, featuring **SwiperJS** for testimonials and **Framer Motion** for animations.

## Technologies & NPM Packages

### Client-Side (Front-End)
* **Vite:** Build tool and development server.
* **React:** UI library (v19).
* **React Router:** For client-side routing (v7).
* **Tailwind CSS & DaisyUI:** Utility-first CSS framework and component library.
* **Firebase:** For authentication.
* **@tanstack/react-query:** For efficient server state management and data fetching.
* **Axios:** For making HTTP requests to the backend.
* **React Hook Form:** For efficient form handling and validation.
* **Stripe:** Payment processing integration.
* **Leaflet & React-Leaflet:** For interactive maps.
* **Recharts:** For data visualization and analytics charts.
* **Swiper:** For carousels and sliders.
* **Framer Motion:** For UI animations.
* **SweetAlert2:** For beautiful popup alerts and confirmations.
* **React Icons:** For scalable vector icons.

### Server-Side (Back-End)
* **Node.js & Express.js:** Runtime environment and web framework.
* **MongoDB:** NoSQL database for storing users, products, orders, and payments.
* **Firebase Admin SDK:** For verifying tokens and managing user privileges.
* **Stripe SDK:** For backend payment intent creation.
* **Dotenv:** For managing environment variables.
* **Cors:** For enabling Cross-Origin Resource Sharing.