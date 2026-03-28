# ✦ Text-to-Learn

An AI-powered course generator that creates structured learning courses from a single topic prompt.

🌐 **Live:** [text-to-learn.swastikdattagupta.in](https://text-to-learn.swastikdattagupta.in)

## What it does

- Enter any topic and get a full course generated instantly using Gemini AI
- Each course has modules and lessons with headings, paragraphs, code blocks, MCQs, and YouTube videos
- Lessons are generated on demand using a priority-based BullMQ queue with Redis
- Download any lesson as a PDF

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS, Auth0, React Router  
**Backend:** Node.js, Express, MongoDB, Mongoose  
**Queue:** BullMQ, Redis  
**AI:** Google Gemini API  
**Auth:** Auth0 (JWT, RS256)  
**Infrastructure:** Docker, AWS EC2, Nginx, GitHub Actions  
**Other:** YouTube Data API v3, jsPDF, Let's Encrypt

## Architecture
```
GitHub → GitHub Actions → Docker Hub → AWS EC2
                                           ├── Nginx (reverse proxy + SSL)
                                           ├── React frontend (Nginx container)
                                           ├── Node.js backend (Express container)
                                           └── Redis (BullMQ queue)
                                                    ↓
                                              MongoDB Atlas
```

## Project Structure
```
/
├── client/                  # React frontend
│   ├── Dockerfile
│   └── nginx.conf
├── server/                  # Express backend
│   └── Dockerfile
├── docker-compose.yml
└── .github/workflows/       # GitHub Actions CI/CD
```

## Getting Started

### Prerequisites
- Node.js
- Docker
- MongoDB Atlas account
- Auth0 account
- Gemini API key
- YouTube Data API v3 key

### Running locally with Docker Compose

Clone the repo and create a `.env` file in the `server` folder based on `.env.example`:
```properties
AUTH0_AUDIENCE=
AUTH0_ISSUER=
FRONTEND_URL=
PORT=
MONGO_URI=
GEMINI_KEY=
YOUTUBE_KEY=
REDIS_HOST=redis
REDIS_PORT=6379
```

Then run:
```bash
docker compose up --build
```

Frontend available at `http://localhost:3000`, backend at `http://localhost:8080`.

### Running without Docker

#### Backend
```bash
cd server
npm install
node server.js
```

#### Frontend
```bash
cd client
npm install
npm run dev
```
Create `server/.env` based on `server/.env.example`:
```properties
AUTH0_AUDIENCE=
AUTH0_ISSUER=
FRONTEND_URL=
PORT=
MONGO_URI=
GEMINI_KEY=
YOUTUBE_KEY=
```
Create a `.env` file in the `client` folder based on `.env.example`:
```properties
VITE_AUTH0_DOMAIN=
VITE_AUTH0_CLIENT_ID=
VITE_AUTH0_AUDIENCE=
VITE_SERVER_URL=
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

## CI/CD

On every push to main, GitHub Actions:
1. Builds Docker images for frontend and backend
2. Pushes images to Docker Hub
3. SSHs into EC2 and pulls the latest images
4. Restarts containers with zero manual intervention

## Deployment

Deployed on AWS EC2 (t3.micro, Ubuntu 22.04) with:
- Nginx as a reverse proxy routing subdomains to containers
- SSL certificates via Let's Encrypt and Certbot
- Docker Compose managing all containers
- `restart: always` policy for automatic recovery on reboot