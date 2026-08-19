<div align="center">
  <img src="public/shortly-nav.png" alt="Shortly Logo" width="340" />
  
  <p align="center">
    <strong>Technical URL Shortener & Precision Analytics Telemetry Platform</strong>
  </p>

  <p align="center">
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-16.3.1-black?logo=next.js" alt="Next.js" /></a>
    <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19-blue?logo=react" alt="React 19" /></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript" alt="TypeScript" /></a>
    <a href="https://tanstack.com/query"><img src="https://img.shields.io/badge/TanStack_Query-v5-FF4154?logo=react-query" alt="TanStack Query" /></a>
    <a href="https://www.postgresql.org"><img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql" alt="PostgreSQL" /></a>
    <a href="https://www.docker.com"><img src="https://img.shields.io/badge/Docker-Supported-2496ED?logo=docker" alt="Docker" /></a>
  </p>
</div>

---

## 📌 Overview

**Shortly** is a state-of-the-art, enterprise-grade URL shortener and telemetry analytics platform built using Next.js 16 (App Router), React 19, TypeScript, PostgreSQL, Prisma ORM, and TanStack React Query.

Designed with high aesthetics and robust backend architecture, Shortly empowers users to generate branded short links, set custom alias slugs, secure links with encrypted passwords, define click limits and expiration dates, and analyze real-time visitor demographics.

---

## ✨ Features

- **⚡ Branded Custom Slugs**: Create clean, memorable URLs (e.g. `shortly.to/promo-2026` or auto-generated `shortCode`).
- **🔒 Enterprise Password Protection**: Protect sensitive destinations with bcrypt-hashed passcodes and custom verification screens.
- **⌛ Automatic Expiration & Click Limits**: Set expiry dates or maximum click quotas with automated status updates.
- **📊 Real-Time Analytics & Telemetry**:
  - **Traffic Trends**: Interactive Area Chart tracking daily click velocity.
  - **Device Breakdown**: Multi-color Doughnut Pie Chart categorizing Mobile, Desktop, Tablet, and Other devices.
  - **Top Browsers**: Distinct color-mapped Bar Chart for Chrome, Safari, Firefox, Edge, etc.
  - **Referrer Logs**: Track origin traffic sources.
- **🔄 3-Second SVG Circular Interstitial Redirect**: High-engagement interstitial countdown ring before redirecting visitors.
- **⚡ TanStack React Query Integration**: Automated client-side caching, background revalidation, and optimistic state updates.
- **🔍 Shadcn UI & Search Debouncing**: Built-in 300ms search debounce, dynamic page/limit pagination, and responsive layout.
- **📱 Instant QR Code Generator**: One-click PNG image download and direct clipboard image copy.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16.3.1 (App Router)](https://nextjs.org/) |
| **Frontend Library** | [React 19](https://react.dev/) & [TypeScript 5](https://www.typescriptlang.org/) |
| **State & Data Fetching** | [TanStack React Query v5](https://tanstack.com/query) |
| **Database & ORM** | [PostgreSQL 16](https://www.postgresql.org/) & [Prisma ORM 7.9](https://www.prisma.io/) |
| **UI & Styling** | [Tailwind CSS v4](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/), [Lucide Icons](https://lucide.dev/) |
| **Charts & Telemetry** | [Recharts](https://recharts.org/) |
| **Security & Auth** | JOSE JWT, bcryptjs, Zod validation |
| **Containerization** | [Docker](https://www.docker.com/) & Docker Compose |

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=mysecretpassword
POSTGRES_DB=url_shortener

# PostgreSQL Connection String
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/url_shortener?schema=public"

# JWT Secret Key
JWT_SECRET="shortly-secret-key-2026-secure-jwt-token-key"
```

---

## 🚀 Running with Docker

### 1. Local Development (`docker-compose.dev.yml`)

Runs PostgreSQL and Next.js hot-reloading development server inside containers:

```bash
# Start development stack
docker compose -f docker-compose.dev.yml up --build

# Stop stack
docker compose -f docker-compose.dev.yml down
```

Access the application at `http://localhost:3000`.

---

### 2. Production Deployment with Traefik Reverse Proxy (`docker-compose.yml`)

If you are using **Traefik v3** (with SSL / Let's Encrypt), add your domain and network to `.env` or run:

```bash
# Set your domain in .env
DOMAIN=shortly.yourdomain.com

# Build and start production stack in detached mode
docker compose up -d --build

# View application logs
docker compose logs -f web
```

---

## 💻 Manual Local Setup (Without Docker)

### Prerequisites
- Node.js 20+
- pnpm (or npm / yarn)
- PostgreSQL database running locally

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/kenziehh/shortly.git
   cd shortly
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Run Prisma Migrations**:
   ```bash
   npx prisma db push
   # or
   npx prisma migrate dev
   ```

4. **Start Development Server**:
   ```bash
   pnpm dev
   ```

Open `http://localhost:3000` in your browser.

---

## 📁 Project Architecture

```
url-shortener/
├── public/
│   ├── shortly.png          # Main App & Favicon Icon
│   └── shortly-nav.png      # Navigation & Branding Logo
├── prisma/
│   └── schema.prisma        # Database Schema
├── src/
│   ├── app/                 # Next.js App Router Pages & API Routes
│   │   ├── [shortCode]/     # Interstitial Redirect Page
│   │   ├── api/             # REST API Handlers (Auth, URLs, Analytics)
│   │   ├── dashboard/       # Dashboard & Analytics Views
│   │   ├── login/           # Login Page
│   │   ├── register/        # Register Page
│   │   └── pass/            # Password Verification Page
│   ├── components/          # Reusable UI & Dashboard Components
│   ├── hooks/               # TanStack React Query Hooks (useAuth, useUrls, useAnalytics)
│   ├── lib/                 # Prisma client, API fetchers, Zod validations
│   └── services/            # Business Logic Layer (UrlService, AnalyticsService)
├── docker-compose.yml       # Production Docker Stack
├── docker-compose.dev.yml   # Development Docker Stack
└── README.md                # Documentation
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
