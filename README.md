# AI Tools Directory - Simple Version

A simplified AI tools directory built with Next.js, Express, and PostgreSQL/Supabase.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS
- **Backend**: Express.js, Prisma ORM
- **Database**: PostgreSQL (local or Supabase)

## Quick Start

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
copy .env.example .env
# Edit .env with your PostgreSQL connection string

# Run Prisma migrations
npx prisma migrate dev --name init

# Seed the database with sample data
npm run seed

# Start the server
npm run dev
```

Backend will run on: http://localhost:3001

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

Frontend will run on: http://localhost:3000

## Supabase Setup (Optional)

If you want to use Supabase instead of local PostgreSQL:

1. Create a Supabase project at https://supabase.com
2. Get your connection string from Settings > Database
3. Update the `DATABASE_URL` in `backend/.env`:
   ```
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
   ```
4. Run `npx prisma migrate dev --name init` to create tables
5. Run `npm run seed` to add sample data

## Features

- **Homepage**: Hero section, featured tools, categories, popular tools
- **Tools Listing**: Search, filter by category/pricing, sort options
- **Tool Detail**: Full info, features list, external link
- **Categories**: Browse tools by category
- **Admin**: Submit new tools via form

## Pages

- `/` - Homepage
- `/tools` - Browse all tools
- `/tools/[slug]` - Tool details
- `/categories` - Browse categories
- `/admin` - Submit a new tool

## Sample Data

The seed script includes 16 AI tools across 6 categories:
- Text & Writing: ChatGPT, Claude, Jasper
- Image Generation: Midjourney, DALL-E 3, Stable Diffusion
- Code & Development: GitHub Copilot, Cursor, Replit
- Video & Animation: Runway, Synthesia
- Audio & Music: ElevenLabs, Mubert
- Marketing & SEO: Surfer SEO, Semrush

## API Endpoints

```
GET  /api/health              # Health check
GET  /api/tools               # List all tools (with filters)
GET  /api/tools/featured      # Get featured tools
GET  /api/tools/popular       # Get popular tools
GET  /api/tools/newest        # Get newest tools
GET  /api/tools/:slug         # Get tool by slug
POST /api/tools               # Create new tool
GET  /api/categories          # List all categories
GET  /api/categories/:slug    # Get category by slug
```

## Project Structure

```
ai-tools-simple/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma    # Database schema
│   │   └── seed.js          # Seed data
│   ├── src/
│   │   ├── index.js         # Express server
│   │   └── routes/
│   │       ├── tools.js     # Tools API routes
│   │       └── categories.js # Categories API routes
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx     # Homepage
│   │   │   ├── layout.tsx   # Root layout
│   │   │   ├── globals.css  # Global styles
│   │   │   ├── tools/       # Tools pages
│   │   │   ├── categories/  # Categories page
│   │   │   └── admin/       # Admin page
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ToolCard.tsx
│   │   │   └── CategoryCard.tsx
│   │   └── lib/
│   │       └── api.ts       # API client
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```
