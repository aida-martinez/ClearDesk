# Admin System: ClearDesk

## Overview

ClearDesk uses a simple role-based admin system where users can have either `'member'` or `'admin'` roles stored in the `profiles.role` field.

## Admin Capabilities

### 1. View Waitlist

- **Endpoint**: `GET /api/admin/waitlist`
- **Access**: Admin only
- Returns all users waiting for approval

### 2. Approve Waitlist Users

- **Endpoint**: `POST /api/admin/approve-waitlist`
- **Access**: Admin only
- **Body**: `{ email: string, planCode?: string }`
- Generates an invite code for the specified email
- Removes user from waitlist
- Default plan: `'1'` (Friends & Testers)

### 3. Create Invite Codes

- **Endpoint**: `POST /api/invites/create`
- **Access**: Admin OR users with `available_invites > 0`
- **Body**: `{ planCode?: string, expiresInDays?: number }`
- Admins: Unlimited invites, don't decrement counter
- Members: Decrements `available_invites` by 1

## Creating the First Admin

The migration automatically creates a bootstrap invite code: **`ADMIN-BOOTSTRAP`**

### Steps:

1. **Register** at `/register` with:
    - Email: `aida-martinez@outlook.com`
    - Password: (your choice)
    - Invite Code: `ADMIN-BOOTSTRAP`

2. **Upgrade to Admin** - Run this SQL in Supabase Studio:

    ```sql
    UPDATE public.profiles
    SET role = 'admin', available_invites = 9999999
    WHERE id = (SELECT id FROM auth.users WHERE email = 'aida-martinez@outlook.com');
    ```

3. **(Optional)** Link the bootstrap code to your account:
    ```sql
    UPDATE public.referral_invites
    SET referrer_user_id = (SELECT id FROM auth.users WHERE email = 'aida-martinez@outlook.com')
    WHERE invite_code = 'ADMIN-BOOTSTRAP';
    ```

## RLS Policies

### Waitlist

- Only admins can view (`SELECT`) waitlist entries

### Referral Invites

- Users can view their own invites
- Admins can create any invite
- Users with `available_invites > 0` can create invites

## Server Utilities

### `isAdmin(event)`

Located in `server/utils/isAdmin.ts`, this helper checks if the current user has admin role:

```typescript
if (!(await isAdmin(event))) {
    throw createError({ statusCode: 403, message: 'Admin access required' })
}
```

## Middleware Compatibility

The existing `auth.global.ts` middleware handles authentication. Admin checks are done at the API route level using the `isAdmin()` utility, not in middleware.
