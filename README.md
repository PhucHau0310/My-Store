<<<<<<< HEAD

# 🛍️ My Store E-commerce Platform

My Store is a modern, scalable e-commerce platform built with **Next.js**. Designed to deliver a seamless shopping experience, it integrates powerful technologies like **Prisma**, **Redux**, **Firebase**, and **MUI**, providing a feature-rich and responsive application.

---

## ✨ Features

### 🔐 Authentication

-   Secure user login and registration powered by **Clerk**.

### 🗃️ Database Management

-   Utilizes **Prisma ORM** for efficient and type-safe database access.

### 📊 Analytics & Charts

-   Visualize sales and user data using **MUI Charts** and **X-Data-Grid**.

---

## 🛠️ Tech Stack

### 💻 Frontend

-   **React** – Component-based UI
-   **Next.js** – SSR & SSG framework
-   **Tailwind CSS** – Utility-first CSS
-   **MUI** – Component library for consistent design

### 🧠 Backend & Services

-   **Prisma** – Type-safe ORM for DB access
-   **Firebase** – Notifications & real-time sync
-   **Nodemailer** – Email sending service

### 📦 State Management

-   **Redux Toolkit** – Centralized state management
-   **Redux Persist** – Persist Redux state between sessions

### 🧰 Development Tools

-   **TypeScript** – Type safety
-   **Vercel** – Deployment platform

---

## 🧭 Entity Relationship Diagram (ERD)

![App Screenshot](public/reports/ERD.png)

---

## 🚀 Getting Started

## Installation

### 1. Clone the repository:

```bash
git clone https://github.com/PhucHau0310/My-Store.git
cd my-store
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

```bash
DATABASE_URL=your-database-url
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_CLERK_FRONTEND_API=your-clerk-frontend-api
CLERK_API_KEY=your-clerk-backend-api-key
```

### 4. Setup the Database

```bash
npx prisma generate
npx prisma migrate deploy
```

## 🚀 Deployment

This project is optimized for deployment on Vercel.
Ensure that all required environment variables are properly set in your Vercel project settings.

## 📸 Screenshots

### 🏠 Homepage

![Home Page](public/reports/homepage.png)

### 🛒 Product Listing

![Product List](public/reports/showproduct.png)

### 📊 Admin Dashboard

![Admin Dashboard](public/reports/dashboard.png)

## 📬 Contact

-   Name: Nguyễn Phúc Hậu
-   Email: haunhpr024@gmail.com
-   GitHub: PhucHau0310
