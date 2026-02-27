# ✦ Text-to-Learn

An AI-powered course generator that creates structured learning courses from a single topic prompt. Built for the hackathon.

## What it does

- Enter any topic and get a full course generated instantly using Gemini AI
- Each course has modules and lessons with headings, paragraphs, code blocks, MCQs, and YouTube videos
- Lessons are generated on demand and cached in MongoDB
- Download any lesson as a PDF

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS, Auth0, React Router  
**Backend:** Node.js, Express, MongoDB, Mongoose  
**AI:** Google Gemini API  
**Auth:** Auth0 (JWT, RS256)  
**Other:** YouTube Data API v3, jsPDF

## Project Structure

```
/
├── client/          # React frontend
└── server/          # Express backend
```

## Getting Started

### Prerequisites
- Node.js
- MongoDB Atlas account
- Auth0 account
- Gemini API key
- YouTube Data API v3 key

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file based on `.env.example`:
```properties
AUTH0_AUDIENCE=
AUTH0_ISSUER=
FRONTEND_URL=
PORT=8080
MONGO_URI=
GEMINI_KEY=
YOUTUBE_KEY=
```

```bash
node server.js
```

### Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file based on `.env.example`:
```properties
VITE_AUTH0_DOMAIN=
VITE_AUTH0_CLIENT_ID=
VITE_AUTH0_AUDIENCE=
VITE_SERVER_URL=
```

```bash
npm run dev
```

## Auth0 Configuration

In your Auth0 Dashboard:
- Application Type: Single Page Application
- Token Endpoint Authentication Method: None
- JsonWebToken Signature Algorithm: RS256
- Allowed Callback URLs: `<your frontend URL>`
- Allowed Logout URLs: `<your frontend URL>`
- Allowed Web Origins: `<your frontend URL>`
- Register an API with identifier matching `VITE_AUTH0_AUDIENCE`
- Enable **Allow Skipping User Consent** on the API

## Deployment

- Backend: [Render]()
- Frontend: [Vercel]()