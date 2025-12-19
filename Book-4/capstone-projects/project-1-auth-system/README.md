# Project 1: Full-Stack Authentication System

## Overview

Build a complete, production-ready authentication system with React frontend and Node.js/Express backend. This security-focused project teaches you JWT authentication, password hashing, protected routes, and deployment.

**What you'll build:**
- User registration and login system
- JWT-based authentication
- Protected routes (frontend & backend)
- Token refresh mechanism
- Deployed full-stack application

## Learning Objectives

- ✅ JWT authentication flow
- ✅ Password hashing with bcrypt
- ✅ HTTP-only cookies
- ✅ Protected API routes
- ✅ Frontend authentication state
- ✅ Token refresh strategy
- ✅ Environment variables
- ✅ Security best practices
- ✅ Full-stack deployment

## Requirements

### Frontend (React)

1. **Pages**
   - [ ] Home/Landing page
   - [ ] Login page
   - [ ] Register page
   - [ ] Dashboard (protected)
   - [ ] Profile page (protected)

2. **Features**
   - [ ] Registration form with validation
   - [ ] Login form
   - [ ] Logout functionality
   - [ ] Protected routes (redirect if not authenticated)
   - [ ] Remember me checkbox
   - [ ] Password visibility toggle
   - [ ] Form error handling

3. **State Management**
   - [ ] User authentication state
   - [ ] JWT token storage
   - [ ] Auth context provider
   - [ ] Persist auth across reloads

### Backend (Node.js/Express)

1. **API Endpoints**
   - [ ] POST `/api/auth/register`
   - [ ] POST `/api/auth/login`
   - [ ] POST `/api/auth/logout`
   - [ ] POST `/api/auth/refresh`
   - [ ] GET `/api/auth/me` (protected)
   - [ ] PUT `/api/auth/update-profile` (protected)

2. **Features**
   - [ ] User registration with validation
   - [ ] Password hashing with bcrypt
   - [ ] JWT token generation
   - [ ] Refresh token mechanism
   - [ ] HTTP-only cookie for tokens
   - [ ] Token verification middleware
   - [ ] CORS configuration
   - [ ] Rate limiting
   - [ ] Input sanitization

3. **Database**
   - [ ] User model (id, email, password hash, name, createdAt)
   - [ ] Refresh token storage
   - [ ] MongoDB or PostgreSQL

### Security Requirements

- [ ] Passwords hashed with bcrypt (min 10 rounds)
- [ ] JWT tokens with proper expiration
- [ ] HTTP-only cookies for tokens
- [ ] HTTPS in production
- [ ] Environment variables for secrets
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF protection
- [ ] Rate limiting on auth endpoints
- [ ] Strong password requirements

## Architecture

```
project/
  frontend/
    src/
      components/
      pages/
      context/
      hooks/
      services/
    .env
  backend/
    src/
      controllers/
      middleware/
      models/
      routes/
      utils/
    .env
```

## Checkpoints

### Checkpoint 1: Backend Setup
**Goal:** Set up Express server with basic auth

- [ ] Initialize Node.js project
- [ ] Install dependencies (express, bcrypt, jsonwebtoken, etc.)
- [ ] Set up Express server
- [ ] Configure environment variables
- [ ] Create User model
- [ ] Connect to database

**Test:** Server runs and connects to DB

### Checkpoint 2: Registration & Login
**Goal:** Implement registration and login

- [ ] Create auth routes
- [ ] Implement registration endpoint
- [ ] Hash passwords with bcrypt
- [ ] Implement login endpoint
- [ ] Generate JWT tokens
- [ ] Set HTTP-only cookies

**Test:** Can register and login via Postman

### Checkpoint 3: Protected Routes
**Goal:** Implement JWT verification

- [ ] Create auth middleware
- [ ] Verify JWT tokens
- [ ] Create protected endpoints
- [ ] Handle token expiration
- [ ] Implement token refresh

**Test:** Protected routes require valid token

### Checkpoint 4: Frontend Auth UI
**Goal:** Build React authentication UI

- [ ] Create login/register forms
- [ ] Form validation
- [ ] Auth API service
- [ ] Auth context provider
- [ ] Protected route component

**Test:** Can login/register from frontend

### Checkpoint 5: Integration & Polish
**Goal:** Connect everything and add security

- [ ] CORS configuration
- [ ] Rate limiting
- [ ] Input sanitization
- [ ] Error handling
- [ ] Loading states
- [ ] Success/error messages

**Test:** Full auth flow works end-to-end

### Checkpoint 6: Deployment
**Goal:** Deploy to production

- [ ] Prepare backend for deployment
- [ ] Prepare frontend for deployment
- [ ] Configure environment variables
- [ ] Deploy backend (Heroku/Railway/Render)
- [ ] Deploy frontend (Vercel/Netlify)
- [ ] Test in production

**Test:** Live application works correctly

## Tech Stack

### Frontend
- React
- React Router
- Axios or Fetch
- Context API or Redux

### Backend
- Node.js
- Express
- bcrypt
- jsonwebtoken
- MongoDB (Mongoose) OR PostgreSQL (Sequelize/Prisma)
- express-validator
- helmet (security)
- express-rate-limit

## Environment Variables

### Backend (.env)
```
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
JWT_REFRESH_SECRET=your_refresh_secret
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## JWT Flow

1. **Login**:
   - User submits credentials
   - Backend verifies credentials
   - Backend generates access token (15min) and refresh token (7days)
   - Tokens sent as HTTP-only cookies
   - User data returned to frontend

2. **Protected Request**:
   - Frontend makes request with credentials
   - Backend middleware verifies access token
   - If valid, request proceeds
   - If expired, try refresh

3. **Token Refresh**:
   - Frontend detects expired access token
   - Calls refresh endpoint with refresh token
   - Backend verifies refresh token
   - New access token generated
   - Request retried

4. **Logout**:
   - Clear tokens from cookies
   - Invalidate refresh token in database

## Stretch Goals

1. **Email Verification** - Send verification email
2. **Password Reset** - Forgot password flow
3. **OAuth Integration** - Google/GitHub login
4. **Two-Factor Authentication** - TOTP-based 2FA
5. **Account Deletion** - Allow users to delete account
6. **Session Management** - View active sessions
7. **Password Change** - Change password while logged in
8. **Account Lockout** - After failed login attempts
9. **Audit Log** - Track login history
10. **Admin Dashboard** - Manage users

## Security Checklist

- [ ] Passwords never stored in plain text
- [ ] JWT secrets in environment variables
- [ ] HTTPS in production
- [ ] HTTP-only cookies for tokens
- [ ] CORS properly configured
- [ ] Rate limiting on auth endpoints
- [ ] Input validation and sanitization
- [ ] SQL injection prevention
- [ ] XSS protection headers
- [ ] Strong password requirements enforced
- [ ] Tokens expire appropriately
- [ ] Refresh tokens can be revoked

## Testing

**Backend Tests:**
- [ ] Registration validation
- [ ] Login with valid/invalid credentials
- [ ] Token generation and verification
- [ ] Protected routes require auth
- [ ] Refresh token flow

**Frontend Tests:**
- [ ] Form validation
- [ ] Login/logout flow
- [ ] Protected routes redirect
- [ ] Token persistence

## Deployment Options

**Backend:**
- Railway
- Render
- Heroku
- DigitalOcean

**Frontend:**
- Vercel
- Netlify
- CloudFlare Pages

**Database:**
- MongoDB Atlas (free tier)
- Supabase (PostgreSQL)
- PlanetScale (MySQL)

## Common Pitfalls

**❌ Avoid:**
- Storing passwords in plain text
- Storing JWT in localStorage (XSS risk)
- Not setting token expiration
- Weak JWT secrets
- Not handling token refresh
- Exposing sensitive data in errors

**✅ Do:**
- Hash passwords with bcrypt
- Use HTTP-only cookies for tokens
- Set appropriate expiration times
- Use strong, random secrets
- Implement token refresh
- Handle errors gracefully
- Validate all inputs
- Use HTTPS in production

---

**This is your first full-stack project! Take security seriously and build something you can be proud of! 🔐**

