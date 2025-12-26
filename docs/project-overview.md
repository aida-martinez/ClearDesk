# Project Overview: ClearDesk

## 1. Vision

ClearDesk is a high-performance, minimalist Life Admin Organizer (“Adulting Dashboard”) application. It is an "invite-only" platform, focusing on a premium, curated user base rather than mass-market scale.
It's NOT a todo app or a productivity app. It's a Life Admin Organizer.

## 2. Core Principles

- **Minimalism:** No feature bloat. Every button must earn its place.
- **Privacy First:** Aggressive use of Row Level Security (RLS) to ensure data isolation.
- **Invite-Only:** Access is a privilege. Users must be referred or wait in line.
- **Speed:** Local-first feel using Nuxt 4's efficient hydration and Supabase's real-time capabilities.

## 3. The "Gatekeeper" Architecture

This is the most critical part of the application logic.

### Access Tiers:

1. **The Waitlist:** For users without an invite. They are stored in `public.waitlist`. They cannot log in.
2. **The Invited:** Users with a valid code from `public.referral_invites`.
3. **The Active User:** Users who have successfully registered. They have a record in both `auth.users` and `public.profiles`.

### Registration Logic:

- **Scenario A (Valid Code):** User provides code -> Server creates Auth account -> Trigger creates Profile -> User redirected to Dashboard.
- **Scenario B (No/Invalid Code):** User submitted -> Email saved to Waitlist table -> User shown "You're on the list" message.

## 4. Key User Roles

- **Admin:** Manages the waitlist and generates "Golden" invite codes.
- **Member:** Can manage tasks and (if they have enough `available_invites`) refer others.
- **Waitlisted:** A lead record with no authentication access.

## 5. Success Metrics for MVP

- Successful conversion from "Waitlisted" to "Active" via admin approval.
- Referral codes correctly "burning" (status changing to 'used') upon registration.
- Dashboard strictly protected by Nuxt Middleware.
