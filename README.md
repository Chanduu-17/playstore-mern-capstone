# Play Store - MERN Stack Capstone

A full-stack Play Store web application built with MongoDB, Express.js, React, and Node.js.

## Features

### User
- Register, login, logout with JWT auth
- Browse apps by category
- Search apps by name
- Filter apps by rating
- View app details: name, description, release date, version, ratings, genre
- Add reviews/comments
- Download apps
- Receive update notifications

### Owner
- Register, login, logout with JWT auth
- Add, edit, delete apps
- Toggle app visibility
- View download counts
- View comments on owned apps
- Receive download notifications
- Announce updates to users

## Tech Stack
- **Frontend:** React, React Router, Axios, Bootstrap
- **Backend:** Node.js, Express.js, Mongoose, JWT, bcryptjs
- **Database:** MongoDB
- **Testing:** Jest, React Testing Library, Supertest

## Project Structure

```
playstore-mern-capstone/
├── client/     # React frontend
├── server/     # Node/Express backend
└── docs/       # API and schema docs
```

## Run Locally

### 1. Backend
```bash
cd server
cp .env.example .env
npm install
npm run dev
```

### 2. Frontend
```bash
cd client
cp .env.example .env
npm install
npm start
```

### 3. Seed Demo Data
```bash
cd server
npm run seed
```

## Default API URL
- Backend: `http://localhost:5000/api`
- Frontend: `http://localhost:3000`

## Modules Covered from JD
- Authentication
- App CRUD
- Search and filter
- Category listing
- Reviews/comments
- Notifications
- Download tracking
- Responsive SPA structure
- DTO-style response mapping
- Service layer separation
# mern-capstone-playstore
