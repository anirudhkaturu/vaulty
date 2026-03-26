# Vaulty

**Collect files without the chase.**

Vaulty is a secure document request management system designed for accounting, immigration, and legal teams to collect, verify, and organize client documents automatically. No more messy email chains or WhatsApp threads.

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (React 19, App Router)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) with [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication:** [Supabase Auth](https://supabase.com/auth)
- **Storage:** [Cloudflare R2](https://www.cloudflare.com/products/r2/) (via S3 SDK)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)

## ✨ Features

- **Client Management:** Maintain a centralized directory of clients and their request history.
- **Request Templates:** Create reusable templates for common document requests (e.g., "Tax Filing", "Visa Application").
- **Automated Requests:** Send secure, token-based upload links to clients via a dedicated portal.
- **Secure Upload Portal:** A frictionless, mobile-friendly interface for clients to upload documents without needing an account.
- **Document Review:** Track review status (pending, approved, rejected) and provide feedback on submitted files.
- **Dashboard Stats:** Get a bird's-eye view of active requests and pending documents.

## 📁 Project Structure

```text
src/
├── app/                  # Next.js App Router
│   ├── api/              # API Routes
│   ├── auth/             # Authentication logic & callbacks
│   ├── dashboard/        # Main application dashboard
│   ├── login/            # Login & Get Started pages
│   └── p/                # Public client upload portal ([token] based)
├── components/           # React components
│   └── landing/          # Landing page sections
├── lib/                  # Shared libraries & utilities
│   ├── db/               # Database schema & connection
│   ├── supabase/         # Supabase client/server configuration
│   ├── r2.ts             # Cloudflare R2 client
│   └── storage.ts        # Storage abstraction layer
└── ...
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (e.g., Supabase or local)
- Cloudflare R2 Bucket
- Supabase Project

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/vaulty.git
   cd vaulty
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

   ```env
   # Database
   DATABASE_URL=your_postgres_url

   # Supabase (Public)
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Cloudflare R2
   R2_ENDPOINT=your_r2_endpoint
   R2_ACCESS_KEY_ID=your_r2_access_key_id
   R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
   R2_BUCKET_NAME=your_r2_bucket_name
   ```

4. Push the database schema:
   ```bash
   npx drizzle-kit push
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

## 📄 License

This project is private and intended for demonstration purposes.
