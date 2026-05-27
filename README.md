# She Can Foundation

Full stack MERN application for She Can Foundation with JWT authentication, protected admin routes, contact message management, and a responsive React + Tailwind UI.

## Stack

- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs
- Frontend: React, Vite, Tailwind CSS, React Router DOM, Axios, Lucide React
- Deployment: Vercel for frontend, Render or Heroku for backend (optional)

## Setup

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## Environment

Create a `.env` file in `server/` using `server/.env.example` as a template.

## API Routes

- `POST /api/auth/register` - register a new user
- `POST /api/auth/login` - login and receive JWT
- `GET /api/auth/me` - retrieve current user profile
- `POST /api/contacts` - submit contact form
- `GET /api/contacts` - admin only: list messages
- `PUT /api/contacts/:id` - admin only: update message status
- `DELETE /api/contacts/:id` - admin only: delete message
- `GET /api/admin/users` - admin only: list users
- `PUT /api/admin/users/:id/role` - admin only: change user role
