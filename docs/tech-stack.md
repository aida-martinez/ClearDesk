# Tech Stack: ClearDesk

## Frontend / Framework

- **Framework:** Nuxt 4 (using the `app/` directory structure)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Nuxt `useState` / `useAsyncData`

## Backend / Database

- **Platform:** Supabase
- **Local Dev:** Supabase CLI with Docker (Local ports: API 54321, Studio 54323)
- **Auth:** Supabase Auth (Email/Password-only for now)
- **Logic:** Nuxt Server Routes (`server/api/`) using `serverSupabaseServiceRole` for admin tasks.

## Key Conventions

- Use **ES Modules** (import/export).
- Use **Nuxt Runtime Config** for env variables (`NUXT_PUBLIC_` prefix).
- Database triggers handle the link between `auth.users` and `public.profiles`.

## Database Schema

For the full database structure, including table definitions, relationships, and RLS policies, please refer to [database-schema.md](./database-schema.md).
