# 🎓 Student Management System

A **Student Management System** built using **React (Vite)**, **Node.js**, **Express**, and **MongoDB**.
The system supports authentication, role-based access (Admin & Student), student records management, and a modern responsive UI using Bootstrap.

---

## 🚀 Features

### 🔐 Authentication

* User registration (Admin / Student)
* Login & Logout
* JWT-based authentication
* Role-based access control

### 🧑‍💼 Admin Capabilities

* Add students
* Edit student records
* Delete students
* View all students
* Search students

### 🎓 Student Capabilities

* Register account
* Login
* Register own profile
* View student list (learning-level implementation)

### 🧰 UI

* Bootstrap responsive layout
* Clean dashboard
* Search functionality

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* React Router DOM
* Axios
* Bootstrap

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs

---

## 📁 Project Structure

```
student-management-system-level2/
│
├── backend       
└── frontend
```

---

## ⚙️ Installation

### 1️⃣ Clone Repository

```
git clone https://github.com/yourusername/student-management-system-level2.git
cd student-management-system-level2
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```
npm run dev
```

---

### 3️⃣ Frontend Setup

Open new terminal:

```
cd frontend
npm install
npm run dev
```

---

## 🌐 Running URLs

Frontend:

```
http://localhost:5173
```

Backend:

```
http://localhost:5000
```

---

## 🧠 Learning Purpose

This project is designed for:

* Beginners learning MERN stack
* Understanding CRUD operations
* Authentication & authorization
* File uploads
* React forms & state management

It is **not yet a production-level SIS**, but a strong foundation. Some more features will be implemented later like.

* Attendance system
* Messaging system
* Charts & analytics
* Course management
* Password reset
* Email verification
---

## 🛡 Security Notes

* Passwords are hashed
* JWT authentication
* Protected API routes

---

## 👨‍💻 Author

Developed by: **[Oscar Kimenyi]**

---

## 📜 License

This project is open-source and free to use for learning.

---
