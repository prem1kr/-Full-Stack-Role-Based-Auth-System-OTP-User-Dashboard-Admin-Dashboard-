# 🚀 Full Stack Role-Based Auth System (OTP + Admin Dashboard)

A **MERN-style full stack web application** with role-based authentication, OTP verification, profile management, and admin dashboard functionality.

---

## 📁 Project Structure

```
backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   └── profileController.js
│
├── middleware/
│   ├── admin.js
│   └── jwtToken.js
│
├── models/
│   ├── authModel.js
│   ├── profileModel.js
│   └── userModel.js
│
├── routes/
│   ├── authRoute.js
│   └── profileRoute.js
│
├── utils/
│   └── sendEmail.js
│
├── server.js
└── .env
```

---

```
frontend/
│
├── src/
│   ├── components/
│   │   ├── AdminSidebar.jsx
│   │   └── Loading.jsx
│   │
│   ├── hooks/
│   │   ├── api.js
│   │   ├── useAuth.js
│   │   └── useProfile.js
│   │
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── Home.jsx
│   │   │   ├── Course.jsx
│   │   │   ├── Department.jsx
│   │   │   └── Student.jsx
│   │   │
│   │   └── users/
│   │       ├── Home.jsx
│   │       ├── Profile.jsx
│   │       ├── Login.jsx
│   │       ├── Signup.jsx
│   │       └── ForgotPassword.jsx
│   │
│   ├── styles/
│   │   ├── adminDashboard/
│   │   ├── course/
│   │   ├── forgot-password/
│   │   ├── loading/
│   │   └── login/
│   │
│   └── App.js
```

---

## ⚙️ Features

### 🔐 Authentication System

* User Signup with Email OTP verification
* Login with Role-based access (User / Admin)
* JWT Authentication
* Forgot Password (OTP based reset)

---

### 👤 User Features

* Create & Update Profile
* View dashboard with personal details
* Manage profile information (course, branch, semester, etc.)

---

### 🛠️ Admin Features

* Admin Dashboard
* Manage Students
* View Courses & Departments
* Sidebar navigation system

---

### 📧 Email System

* OTP sent via email using Resend
* Secure password reset flow

---

## 🧠 Tech Stack

### Frontend:

* React.js
* React Router
* Axios
* CSS (Custom modern UI)

### Backend:

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Resened mailer

---

## 🔐 Environment Variables (.env)

```env
MONGO_URI=
PORT=5000
JWT_SECRET=premkumar
NODE_ENV=production
RESEND_API_KEY=

```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/prem1kr/SMTP---Role-based-and-OTP-Verification-Authentication-and-Autheraization.git
```

---

### 2. Backend Setup

```bash
cd backend
npm install
npm start
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 📌 API Routes

### Auth Routes

* `POST /api/auth/signup`
* `POST /api/auth/login`
* `POST /api/auth/send-otp/:id`
* `POST /api/auth/verify-otp/:id`
* `POST /api/auth/reset-password/:id`

---

### Profile Routes

* `GET /api/profile/:id`
* `POST /api/profile/add-profile`
* `PUT /api/profile/update-profile/:id`
* `DELETE /api/profile/delete-profile/:id`

---

## 🎯 Key Highlights

* Clean role-based architecture
* Secure JWT authentication
* OTP-based verification system
* Modern dashboard UI design
* Scalable backend structure

---

## 👨‍💻 Developer

**Prem Kumar**

---

## 📸 UI Preview (Optional)

![alt text](<Screenshot 2026-05-22 122819.png>) ![alt text](<Screenshot 2026-05-22 122835.png>) ![alt text](<Screenshot 2026-05-22 122844.png>) ![alt text](<Screenshot 2026-05-22 122938.png>) ![alt text](<Screenshot 2026-05-22 123007.png>) ![alt text](<Screenshot 2026-05-22 123038.png>) ![alt text](<Screenshot 2026-05-22 123202.png>) ![alt text](<Screenshot 2026-05-22 123209.png>) ![alt text](<Screenshot 2026-05-22 123216.png>) ![alt text](<Screenshot 2026-05-22 123224.png>) ![alt text](<Screenshot 2026-05-22 123322.png>) ![alt text](<Screenshot 2026-05-22 123329.png>) ![alt text](<Screenshot 2026-05-22 123405.png>) ![alt text](<Screenshot 2026-05-22 123449.png>)