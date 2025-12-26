# User Flows: ClearDesk

### 1. Registration Gatekeeper

- **Submission:** User submits Email, Password, and an optional **Invite Code**.
- **Validation:**
    - If code is present:
        - Check if code exists in `referral_invites` and status is `'active'`.
        - Check if code has NOT expired.
    - If code is valid:
        - Create `auth.user`.
        - DB Trigger creates `public.profile`.
        - Assign initial subscription based on `target_plan_code` (default to '0' if not specified).
        - Mark code as `'used'`.
    - If code is missing or invalid:
        - Add email to `public.waitlist` with status `'queued'`.
        - Show "You're on the list" message.

### 2. Referral System

- **Eligibility:** Only users with `available_invites > 0` can generate referral links.
- **Generation:** User generates a code. This decrements their `available_invites` and creates a record in `referral_invites`.
- **Special Invites:** Admins can generate "Golden" codes that might have `target_plan_code = '1'` (Friends) or no expiration.

### 3. Subscription & Stripe Flow

1. **Plan Selection:** User picks a plan (Pro, Family, etc.).
2. **Checkout:** Redirect to Stripe Checkout.
3. **Webhook:** Stripe sends `checkout.session.completed`.
4. **Provisioning:**
    - Create/Update record in `public.subscriptions`.
    - Store `stripe_customer_id` in `public.profiles`.
5. **Lifecycle:** Webhooks handle `invoice.paid` (renewals) and `customer.subscription.deleted` (cancellations).

### 4. Task Management

- **Creation:** Users can create tasks.
- **Organization:**
    - Select from Global **Categories** (Admin-managed).
    - Add custom **Tags** (User-managed).
- **Recurrence:** If set, when a task is marked complete, a new instance is generated based on the recurrence rule.
