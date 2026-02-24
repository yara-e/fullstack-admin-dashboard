# E-Commerce Management & Analytics System

A full-stack e-commerce management system with a secure backend and a modern analytics dashboard.

The system includes authentication, role-based authorization, cursor-based pagination, global rate limiting, and caching for optimized performance.

---
# Live Demo 
[click here](https://dashboard-for-admins.up.railway.app/)
demo credentials:
- email : emily_thomas9@example.com
- password : 123456

## Tech Stack

### Frontend
- React.js
- TypeScript
- TailwindCSS
- Recharts
- TanStack Query
- Axios

### Backend
- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Role-Based Authorization

---

## Security & Performance

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (ADMIN, MANAGER)
- Protected routes using middleware

### Rate Limiting
- Global rate limiting applied to all API requests
- Protects the server from abuse and excessive traffic

### Caching (Analytics Module)
- Analytics endpoints are cached
- Reduces database load
- Improves dashboard response time
- Optimized for repeated analysis requests

---

## Analytics Module

The system includes:

- Overview statistics
- Orders trend analysis
- Orders by status
- Revenue insights
- Stock distribution visualization

All analytics routes are restricted to ADMIN and MANAGER roles.

---

## Cursor-Based Pagination

The backend implements cursor-based pagination for scalable and efficient data retrieval.


