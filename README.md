# Campus Idea & Innovation Hub

A full-stack, MERN-stack web application that gives a campus community a single
place to **capture, share, and grow** ideas. Students can register, log in,
submit an innovation idea, explore the submissions of others, vote on what they
like, bookmark ideas to follow, and (as the author) edit or delete their own
ideas.

> Built with **React 18 + Vite + Tailwind CSS** on the front end and
> **Node.js + Express + MongoDB (Mongoose)** on the back end, secured with
> **JWT** authentication and **bcrypt** password hashing.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Prerequisites](#prerequisites)
5. [Getting Started](#getting-started)
6. [Usage Guide](#usage-guide)
7. [API Documentation](#api-documentation)
8. [Frontend Routes](#frontend-routes)
9. [Data Models](#data-models)
10. [Configuration Reference](#configuration-reference)
11. [Security Notes](#security-notes)
12. [Future Improvements](#future-improvements)

---

## Features

### Authentication
- **Register** — create a new account (name, email, password).
- **Login** — authenticate and receive a JWT stored in `localStorage`.
- **Session persistence** — the JWT and user are restored on page reload.
- **Protected routes** — authenticated API endpoints are guarded by a
  JWT-based middleware.

### Idea Management
- **Submit ideas** — fill in a title, problem statement, description, domain,
  technologies, and expected impact.
- **Duplicate prevention** — the same idea title (case-insensitive) cannot be
  submitted twice.
- **Edit / Delete** — only the author can update or remove their own idea.
- **Idea lifecycle** — each idea progresses through the statuses
  `Submitted → Under Review → Approved → Prototype → Implemented`.

### Discovery & Engagement
- **Search** — full-text search across title, problem, description,
  technologies, and domain.
- **Filter** — by domain and by status.
- **Sort** — by newest, oldest, highest votes, or title (A–Z).
- **Pagination** — ideas are paginated (6 per page on the feed).
- **Voting** — community members can vote once per idea; duplicate votes are
  prevented.
- **Bookmarking** — save ideas to follow later (stored in `localStorage`).
- **Live statistics** — a real-time stat bar on the home page shows total ideas,
  total votes, top vote count, and a breakdown by status.

---

## Tech Stack

| Layer        | Technology                                                                 |
| ------------ | -------------------------------------------------------------------------- |
| **Frontend** | React 18 · React Router DOM 6 · Vite · Tailwind CSS 3 · Axios              |
| **Backend**  | Node.js · Express 4 · MongoDB (Mongoose) · bcryptjs · jsonwebtoken · cors  |
| **Tooling**  | npm (monorepo with independent `package.json` per app)                    |

---


## Project Structure

```
ETE
├── README.md                  # This file
├── .gitignore
├── backend/
│   ├── .env                   # Environment variables (do NOT commit!)
│   ├── package.json
│   ├── server.js              # Express entry point & route wiring
│   ├── config/
│   │   └── db.js              # MongoDB connection helper
│   ├── controllers/
│   │   ├── authController.js  # register, login, get-profile
│   │   └── ideaController.js  # CRUD, voting, stats, search/filter/sort/pagination
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT protect middleware
│   ├── models/
│   │   ├── Idea.js
│   │   └── User.js
│   └── routes/
│       ├── authRoutes.js      # /api/auth
│       └── ideaRoutes.js      # /api/idea
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── src/
│       ├── main.jsx           # React entry point + router
│       ├── App.jsx            # Top-level layout, routing, global state
│       ├── api.js             # Axios instance + JWT interceptor
│       ├── constants.js       # Statuses, domain options, status styles, date formatter
│       ├── index.css
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Header.jsx
│       │   ├── About.jsx
│       │   ├── AuthSection.jsx        # toggles Login / Register
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── IdeaFeed.jsx           # search, filter, sort, paginate
│       │   ├── IdeaCard.jsx
│       │   └── IdeaForm.jsx           # submit + edit form
│       └── pages/
│           ├── HomePage.jsx
│           ├── IdeasPage.jsx
│           ├── IdeaDetailPage.jsx
│           ├── SubmitPage.jsx
│           └── EditPage.jsx
└── dist/  (frontend build output — ignored by git)
```

---

## Prerequisites

Make sure the following are installed on your machine:

| Tool        | Minimum version |
| ----------- | --------------- |
| Node.js     | 18.x+           |
| npm         | 9.x+            |
| MongoDB     | 5.0+ (local) **or** a MongoDB Atlas cluster |

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/ETE.git
cd ETE
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

#### Environment variables

A template is provided. Copy it and fill in your own values:

```bash
cp .env.example .env
```

Edit `backend/.env` with your own settings:

```env
PORT=5001
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.uto2dxl.mongodb.net/ideahub
JWT_SECRET=your_strong_random_secret_here
```

> **Replace the `MONGO_URI` and `JWT_SECRET`** in the default `.env` before
> running in any non-development context.

```bash
npm start
```

The API will be available at `http://localhost:5001`.

#### Backend scripts

| Script           | Description                             |
| ---------------- | --------------------------------------- |
| `npm start`      | Start the Express server (`server.js`)  |

### 3. Set Up the Frontend

> The frontend uses an **Axios instance** (`src/api.js`) whose `baseURL` is
> hardcoded to `http://localhost:5001/api`. Update that value if your backend
> runs on a different host/port.

```bash
cd ../frontend
npm install
```

```bash
npm run dev
```

Open **http://localhost:5173** in your browser.

#### Frontend scripts

| Script          | Description                                 |
| --------------- | ------------------------------------------- |
| `npm run dev`     | Start the Vite dev server            |
| `npm run build`   | Build a production bundle (`dist/`)  |
| `npm run preview` | Preview the production build locally   |

### 4. Run the App

| App       | URL                        |
| --------- | -------------------------- |
| Frontend  | `http://localhost:5173`     |
| Backend   | `http://localhost:5001`     |
| Root API  | `http://localhost:5001/` (health-check text) |

---

## Usage Guide

1. **Browse ideas** — visit `/` (home) or `/ideas`. The feed is viewable
   without an account.
2. **Register / Login** — click **Login** in the navbar (or use the
   AuthSection on the home page) to create an account or sign in.
3. **Submit an idea** — once logged in, click **+ Submit** (navbar or home
   page) and fill out the form. All fields marked `*` are required.
4. **Vote** — click the ▲ Vote button on any idea card or detail page.
   You can only vote once per idea.
5. **Bookmark** — click the ☆ Bookmark button to save ideas; filter the feed
   to show only bookmarked items.
6. **Search, filter & sort** — use the controls above the feed on `/ideas`.
7. **View details** — click **View** on any card to open the idea detail page,
   which includes a lifecycle tracker showing how far the idea has progressed.
8. **Edit / Delete** — the **Edit** and **Delete** buttons appear only on ideas
   you authored.

---

## API Documentation

All endpoints are prefixed with `/api` and available at
`http://localhost:5001/api`.

### Authentication

| Method | Endpoint             | Description                                     | Auth      |
| ------ | -------------------- | ----------------------------------------------- | --------- |
| POST   | `/auth/register`     | Register a new user                             | Public    |
| POST   | `/auth/login`        | Log in and receive a JWT                        | Public    |
| GET    | `/auth/me`           | Get the logged-in user's profile (`req.user`)   | Protected |

#### Register — `POST /api/auth/register`

**Request body**

```json
{
  "name": "Raghav Anand",
  "email": "raghav@campus.edu",
  "password": "secret123"
}
```

**Validation rules**

| Field      | Rule                                          |
| ---------- | --------------------------------------------- |
| `name`     | Required; minimum 3 characters                |
| `email`    | Required; must match a valid email pattern    |
| `password` | Required; minimum 6 characters             |

**Response** `201 Created`

```json
{
  "_id": "64f...",
  "name": "Raghav Anand",
  "email": "raghav@campus.edu",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login — `POST /api/auth/login`

**Request body**

```json
{ "email": "raghav@campus.edu", "password": "secret123" }
```

**Response** `200 OK` — same shape as register.

### Ideas

| Method | Endpoint              | Description                                         | Auth             |
| ------ | --------------------- | --------------------------------------------------- | ---------------- |
| GET    | `/idea`               | List all ideas (with search/filter/sort/paginate)   | Public           |
| POST   | `/idea`               | Create a new idea                                   | Protected        |
| GET    | `/idea/stats`         | Dashboard statistics                                | Public           |
| GET    | `/idea/:id`           | Get a single idea by ID                             | Public           |
| PUT    | `/idea/:id`           | Update an idea (owner only)                         | Protected        |
| PUT    | `/idea/:id/vote`      | Up-vote an idea (one vote per user)                 | Protected        |
| DELETE | `/idea/:id`           | Delete an idea (owner only)                         | Protected        |

#### Query parameters for `GET /api/idea`

| Query    | Type   | Description                                                                      |
| -------- | ------ | -------------------------------------------------------------------------------- |
| `search`  | string | Case-insensitive search across title, problemStatement, description, technologies, domain |
| `domain`  | string | Filter by exact domain (e.g. `Technology`, `Education`)                          |
| `status`  | string | Filter by exact status (e.g. `Approved`, `Prototype`)                          |
| `sort`    | string | One of `newest` (default), `oldest`, `votes`, `title`                            |
| `page`    | number | Page number for server-side pagination (1-based)                                |
| `limit`   | number | Items per page (min 1, max 50; default 6)                                      |

When `page` and/or `limit` are supplied, the response is a paginated object:

```json
{
  "data": [/* array of ideas */],
  "total": 42,
  "page": 1,
  "limit": 6,
  "pages": 3
}
```

Without pagination parameters the endpoint returns a plain array of all
matching ideas.

#### Create an idea — `POST /api/idea`

**Request body**

```json
{
  "title": "Smart campus attendance via face recognition",
  "problemStatement": "Manual attendance is slow and can be marked by proxies.",
  "description": "An automated system that captures faces at the lecture hall entrance.",
  "domain": "Technology",
  "technologies": "Python, OpenCV, Flask",
  "expectedImpact": "Reduces proxy attendance and saves faculty time."
}
```

**Validation rules**

| Field              | Rule                                        |
| ------------------ | ------------------------------------------- |
| `title`            | Required; minimum 3 characters              |
| `problemStatement` | Required; minimum 10 characters               |
| `domain`           | Required                                    |
| `technologies`     | Required; minimum 2 characters               |
| `expectedImpact`   | Required; minimum 3 characters               |
| `description`      | Optional                                    |

Returns `201 Created` with the created idea document.

#### Vote — `PUT /api/idea/:id/vote`

Returns the updated idea document. Returns `400` if the user has already voted.

#### Update / Delete — `PUT` / `DELETE /api/idea/:id`

Returns `200 OK` on success. Returns `403 Forbidden` if the requesting user is
not the owner; `404 Not Found` if the idea does not exist.

#### Statistics — `GET /api/idea/stats`

```json
{
  "total": 120,
  "totalVotes": 340,
  "topVoteCount": 28,
  "byStatus": [
    { "status": "Submitted",     "count": 12 },
    { "status": "Under Review",  "count": 8 },
    { "status": "Approved",      "count": 5 },
    { "status": "Prototype",     "count": 3 },
    { "status": "Implemented",   "count": 1 }
  ]
}
```

### Authentication for API requests

Protected endpoints require a Bearer token:

```
Authorization: Bearer <your-jwt>
```

The frontend Axios instance (`src/api.js`) attaches this header automatically
from `localStorage`.

---

## Frontend Routes

| Path            | Component          | Auth required | Description                                         |
| --------------- | ------------------ | ------------- | --------------------------------------------------- |
| `/`             | `HomePage`         | No            | Hero header, auth prompt, stats, recent ideas       |
| `/ideas`        | `IdeasPage`        | No            | Full idea feed with search/filter/sort/pagination    |
| `/ideas/:id`    | `IdeaDetailPage`   | No            | Detailed view of a single idea with lifecycle tracker |
| `/submit`       | `SubmitPage`       | Yes           | Form to create a new idea                           |
| `/edit/:id`     | `EditPage`         | Yes           | Form to update an existing idea (owner only)        |
| `/about`        | `About` (component) | No          | Project description                                 |

---

## Data Models

### User (`backend/models/User.js`)

| Field      | Type   | Constraints                          |
| ---------- | ------ | ------------------------------------ |
| `name`     | String | Required, trimmed                    |
| `email`    | String | Required, unique, lowercased, trimmed |
| `password` | String | Required, bcrypt-hashed, min 6 chars |
| timestamps |        | `createdAt`, `updatedAt`             |

### Idea (`backend/models/Idea.js`)

| Field              | Type     | Constraints                                                     |
| ------------------ | -------- | --------------------------------------------------------------- |
| `title`            | String   | Required, trimmed                                               |
| `problemStatement` | String   | Required, trimmed                                               |
| `description`      | String   | Trimmed, default `""`                                           |
| `domain`           | String   | Required, trimmed                                               |
| `technologies`     | String   | Required, trimmed                                               |
| `expectedImpact`   | String   | Required, trimmed                                               |
| `status`           | String   | Enum: `Submitted`, `Under Review`, `Approved`, `Prototype`, `Implemented` — default `Submitted` |
| `votes`            | ObjectId[] | Ref `User` — list of users who voted                         |
| `voteCount`        | Number   | Default `0`                                                     |
| `submittedBy`      | String   | Required, trimmed — author display name                         |
| `user`             | ObjectId | Required, ref `User` — author reference                         |
| timestamps         |          | `createdAt`, `updatedAt`                                        |

---

## Configuration Reference

### Backend (`backend/.env`)

| Variable     | Default                    | Description                          |
| ------------ | -------------------------- | ------------------------------------ |
| `PORT`       | `5001`                     | Port the Express server listens on   |
| `CLIENT_URL` | `http://localhost:5173`    | Allowed CORS origin                  |
| `MONGO_URI`  | _(provided)_               | MongoDB connection string            |
| `JWT_SECRET` | _(provided)_               | Secret used to sign JWT tokens       |

### Frontend

The frontend Axios base URL is set in `src/api.js` and defaults to
`http://localhost:5001/api`. To point the frontend at a different backend,
update that file.

---

## Security Notes

The following items were observed in the current codebase and are worth
addressing before any public deployment:

1. **`.gitignore` is empty** — `node_modules/` and build artifacts (`frontend/dist/`)
   are not ignored. Add at least:

   ```
   node_modules/
   dist/
   .env
   .env.local
   ```

2. **`backend/.env` is committed to git** — the file contains a real MongoDB
   Atlas connection string and `JWT_SECRET`. These should be **rotated** and
   the file should be **untracked**:

   ```bash
   git rm --cached backend/.env
   git commit -m "Remove committed .env file"
   ```

   Provide a `backend/.env.example` template instead.

3. **No rate limiting** — consider adding `express-rate-limit` to mitigate
   brute-force attacks on `/auth/login` and `/auth/register`.

4. **No input sanitisation on the backend** — while Mongoose provides some
   protection, consider `express-mongo-sanitize` to guard against NoSQL
   injection via query parameters.

5. **Frontend API URL is hardcoded** — wire it to an environment variable
   (`VITE_API_URL`) for cleaner dev/production configuration.

---

## Future Improvements

- Add **role-based access control** (e.g. admin/faculty moderators can update
  idea status, not just the author).
- Implement **image uploads** for ideas (e.g. via Cloudinary).
- Add **reactions** beyond up-votes (e.g. 👏, 🔥, 💡).
- Move from JWT-in-`localStorage` to **httpOnly cookies** for stronger XSS
  protection.
- Add **server-side pagination** by default instead of returning the full
  list on the feed.
- Write **unit & integration tests** (Jest + Supertest for the API; Vitest +
  React Testing Library for the frontend).
- Set up a shared **Docker Compose** setup for the backend + MongoDB for
  faster onboarding.

---

## License

This project is provided as-is for educational purposes.



