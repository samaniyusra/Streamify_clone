<h1 align="center">✨ Fullstack Chat & Video Calling App ✨</h1>

Highlights:

- 🌐 Real-time Messaging with Typing Indicators & Reactions
- 📹 1-on-1 and Group Video Calls with Screen Sharing & Recording
- 🔐 JWT Authentication & Protected Routes
- 🌍 Language Exchange Platform with 32 Unique UI Themes
- ⚡ Tech Stack: React + Express + MongoDB + TailwindCSS + TanStack Query
- 🧠 Global State Management with Zustand
- 🚨 Error Handling (Frontend & Backend)
- 🚀 Deployed On render 
- 🎯 Built with Scalable Technologies like Stream
- ⏳ And much more!

---

## Sample login credentials:

- email:demo@gmail.com.
- password:demo123

## 🧪 .env Setup

### Backend (`/backend`)

```
PORT=5001
MONGO_URI=your_mongo_uri
STEAM_API_KEY=your_steam_api_key
STEAM_API_SECRET=your_steam_api_secret
JWT_SECRET_KEY=your_jwt_secret
NODE_ENV=development
```

### Frontend (`/frontend`)

```
VITE_STREAM_API_KEY=your_stream_api_key
```

---

## 🔧 Run the Backend

```bash
cd backend
npm install
npm run dev
```

## 💻 Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

# Streamify 

A full-stack real-time communication platform supporting authenticated chat and video calls.
Designed with modular architecture, clear separation of concerns, and production-ready patterns.

---

## Problem Statement

Real-time communication systems require low-latency messaging, secure authentication, and scalable client–server coordination.
This project implements these requirements using modern web technologies and third-party real-time SDKs.

---

## Solution Overview

* JWT-based authentication for secure access
* Real-time chat and video using Stream SDKs
* Modular frontend and backend architecture
* Scalable state and data management

---

## Architecture

**Client**

* React-based SPA
* Centralized state management
* API abstraction layer

**Server**

* REST APIs with Express
* Auth middleware with JWT
* MongoDB for persistence

**Real-Time Layer**

* Stream Chat SDK
* Stream Video SDK

---

## Tech Stack

**Frontend**

* React
* Tailwind CSS
* Zustand
* TanStack Query

**Backend**

* Node.js
* Express.js
* MongoDB

**Auth**

* JWT

---

## Repository Structure

```
Streamify_clone/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── store/
│   ├── api/
│   └── main.jsx
│
└── README.md
```

---

## Core Features

* Secure user authentication
* Real-time messaging
* One-to-one and group video calls
* Screen sharing
* Responsive UI
* Error handling and validation

---



## Setup Instructions

Clone repository:

```bash
git clone https://github.com/samaniyusra/Streamify_clone.git
cd Streamify_clone
```




## Execution Flow

1. User authenticates via JWT.
2. Client initializes Stream SDK with secure tokens.
3. Real-time messaging and video sessions are established.
4. Backend manages auth, user data, and access control.

---

## Engineering Focus

* Separation of concerns
* Stateless backend design
* Modular, maintainable code
* Production-style folder structure

---



