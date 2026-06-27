# LaunchPilot 🚀

LaunchPilot is an AI-Powered Pre-Launch Verification platform for Mobile Apps. It analyzes your app using advanced LLMs (OpenAI, Anthropic, Gemini) and provides actionable insights and health scores before you submit it to the App Store or Google Play.

## 🏗 Architecture

This project is structured as a **Turborepo** monorepo containing:

- `apps/web`: Next.js 15 frontend using React 19, TailwindCSS, and shadcn/ui. Built with strict MVVM principles.
- `apps/api`: NestJS backend handling REST API requests, background queue processing, AI routing, Stripe, and Email.
- `packages/database`: Prisma ORM and PostgreSQL schema.
- `packages/config`: Centralized application configuration.

## 🛠 Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript, TailwindCSS, shadcn, Framer Motion, Recharts
- **Backend:** Node.js, NestJS, BullMQ
- **Database:** PostgreSQL, Prisma
- **Auth:** Clerk
- **Storage:** Supabase Storage
- **Payments:** Stripe
- **Email:** Resend
- **AI:** OpenAI, Anthropic, Gemini
- **Deployment:** Docker

## 🚀 Getting Started (Local Development)

### 1. Prerequisites
- Node.js >= 18
- Docker Desktop (for Postgres & Redis)
- A Clerk Account (for auth)
- A Supabase Account (for storage)

### 2. Environment Variables
Copy the `.env.example` file to the root of your project:
```bash
cp .env.example .env
```
Fill in the required keys, specifically:
- `DATABASE_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` & `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- AI API Keys (`OPENAI_API_KEY`, etc.)

### 3. Start Infrastructure
Start the PostgreSQL database and Redis queue:
```bash
docker-compose up -d db redis
```

### 4. Setup Database
Navigate to the database package and push the schema:
```bash
cd packages/database
npx prisma db push
npx prisma generate
```

### 5. Install Dependencies & Run
From the root directory:
```bash
npm install
npm run dev
```
- Frontend will run on `http://localhost:3000`
- Backend will run on `http://localhost:3001`

## 🐳 Production Deployment

To run the entire application stack using Docker:

1. Ensure your `.env` is fully configured with production keys.
2. Build and start the containers:
```bash
docker-compose up --build -d
```
3. The app is now running in isolated containers ready for a VPS or cloud provider.

## ⚙️ Configuration

Application settings (pricing plans, feature flags) can be modified in `packages/config/launchpilot.config.ts`.
