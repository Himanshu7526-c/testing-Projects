# DevConnect Backend

This is the backend server for the DevConnect platform – a developer networking application where users can register, log in, post projects, comment on others' projects, and search developers or projects.

## 🛠️ Tech Stack

* **Node.js**
* **Express**
* **MongoDB + Mongoose**
* **Cookie-based Authentication**
* **bcryptjs** for password hashing
* **jsonwebtoken (JWT)** for session security
* **CORS** for cross-origin resource sharing

---

## 📁 Folder Structure

```
devconnect-backend/
├── controllers/          # Route logic for auth, users, projects, comments
├── middleware/           # Middleware for auth protection
├── models/               # Mongoose models (User, Project, Comment)
├── routes/               # Express routes
├── .env                  # Environment variables
├── server.js             # Entry point
├── package.json
```

---

## 🔐 Authentication

* Register & Login routes with hashed passwords
* Sessions are managed with **HTTP-only cookies**
* Middleware protects private routes like dashboard, comment, create project, etc.

---

## 🚀 Setup Instructions

1. **Clone the repo**

   ```bash
   git clone https://github.com/yourusername/devconnect-backend.git
   cd devconnect-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create a `.env` file**

   ```
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_secret_key
   NODE_ENV=development
   ```

4. **Start the server**

   ```bash
   npm run dev
   node app.js
   ```

   Server runs on `http://localhost:3000`

---

## ✅ Available Routes

### 📌 Auth Routes (`/auth`)

* `POST /register` — Register a new user
* `POST /login` — Login user & set cookie
* `GET /logout` — Clear cookie
* `GET /check` — Validate session

### 👤 User Routes (`/users`)

* `GET /:id` — Get user details
* `PUT /:id` — Edit user profile
* `GET /search?q=` — Search users by name

### 📁 Project Routes (`/projects`)

* `POST /` — Create a project (auth required)
* `GET /` — Get all projects
* `GET /search?q=` — Search projects by title
* `GET /:id` — Get project detail
* `GET /user/:userId` — Projects by user

### 💬 Comment Routes (`/comments`)

* `POST /:projectId` — Add comment
* `GET /:projectId` — Get all comments on a project

---

## 🧪 Sample `.env` File

```env
MONGO_URI=mongodb://localhost:27017/devconnect
JWT_SECRET=supersecretkey
NODE_ENV=development
```


