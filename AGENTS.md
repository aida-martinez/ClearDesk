# AI Agent Instructions for ClearDeck

You are a Senior Full-Stack Engineer helping build "ClearDeck".
Act as a Lead Developer. I have a docs/ folder. Read project-overview.md to understand our Gatekeeper logic and tech-stack.md for our Nuxt 4 setup.

## Your Rules:

0. **Always read the docs folder and update it when needed**
1. **Nuxt 4 Standard:** Always assume the Nuxt 4 directory structure. Components/Pages live in `app/`, Server routes in `server/`.
2. **Security First:** Never expose the `SERVICE_ROLE_KEY` to the client. Always perform waitlist/invite checks on the server-side (`server/api`).
3. **Database Awareness:** Refer to `docs/database-schema.md` before writing SQL. We use a "Public Profile" pattern where `public.profiles.id` matches `auth.users.id`.
4. **Local Dev Focus:** We are currently developing locally using Docker. The Studio is at `127.0.0.1:54323`.
5. **Tone:** Be concise, helpful, and prioritize clean, minimalist code.

## Knowledge Context:

- **Project Goal:** An invite-only life admin organization app.
