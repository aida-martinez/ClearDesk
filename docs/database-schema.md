# Database Schema: ClearDesk

## 1. Authentication & Users

### `auth.users` (Internal)

- Managed by Supabase Auth.
- Trigger `handle_new_user` creates a corresponding entry in `public.profiles`.

### `public.profiles`

| Column               | Type        | Notes                                         |
| :------------------- | :---------- | :-------------------------------------------- |
| `id`                 | uuid        | PK, references `auth.users.id`                |
| `display_name`       | text        | Optional                                      |
| `avatar_url`         | text        | Optional                                      |
| `role`               | text        | Default: 'member', Options: 'member', 'admin' |
| `available_invites`  | int         | Default: 0                                    |
| `referrer_code_used` | text        | Optional                                      |
| `stripe_customer_id` | text        | Optional                                      |
| `created_at`         | timestamptz | Default: `now()`                              |

---

## 2. Plans & Subscriptions

### `public.plans`

| Column            | Type    | Notes                                                 |
| :---------------- | :------ | :---------------------------------------------------- |
| `id`              | uuid    | PK                                                    |
| `code`            | text    | Unique (e.g., 'free', 'premium', 'family', 'friends') |
| `display_name`    | text    | e.g., 'Premium Plan'                                  |
| `description`     | text    | Optional                                              |
| `price_cents`     | int     | 0 for free/friends                                    |
| `features`        | jsonb   | e.g., `{ "max_tasks": 50, "collaborations": true }`   |
| `active`          | boolean | Default: true                                         |
| `stripe_price_id` | text    | References Stripe Price                               |

### `public.subscriptions`

| Column                   | Type        | Notes                                                |
| :----------------------- | :---------- | :--------------------------------------------------- |
| `id`                     | uuid        | PK                                                   |
| `user_id`                | uuid        | FK to `auth.users.id`                                |
| `plan_id`                | uuid        | FK to `public.plans.id`                              |
| `status`                 | text        | e.g., 'active', 'trailing', 'canceled', 'incomplete' |
| `stripe_subscription_id` | text        | Optional                                             |
| `started_at`             | timestamptz |                                                      |
| `ends_at`                | timestamptz | Optional                                             |
| `created_at`             | timestamptz | Default: `now()`                                     |

---

## 3. Tasks & Organization

### `public.categories` (Admin Created)

| Column       | Type        | Notes                                  |
| :----------- | :---------- | :------------------------------------- |
| `id`         | uuid        | PK                                     |
| `name`       | text        | e.g., 'Deep Work', 'Admin', 'Meetings' |
| `slug`       | text        | Unique                                 |
| `color`      | text        | Hex or Tailwind class                  |
| `created_at` | timestamptz | Default: `now()`                       |

### `public.tags` (User Created)

| Column       | Type        | Notes                 |
| :----------- | :---------- | :-------------------- |
| `id`         | uuid        | PK                    |
| `user_id`    | uuid        | FK to `auth.users.id` |
| `name`       | text        |                       |
| `created_at` | timestamptz | Default: `now()`      |

### `public.tasks`

| Column             | Type        | Notes                                                |
| :----------------- | :---------- | :--------------------------------------------------- |
| `id`               | uuid        | PK                                                   |
| `user_id`          | uuid        | FK to `auth.users.id`                                |
| `category_id`      | uuid        | FK to `public.categories.id` (Optional)              |
| `title`            | text        | Required                                             |
| `notes`            | text        | Optional                                             |
| `due_date`         | date        | Required                                             |
| `recurrence_type`  | text        | enum: 'none', 'daily', 'weekly', 'monthly', 'yearly' |
| `recurrence_value` | int         | Default: 0                                           |
| `is_complete`      | boolean     | Default: false                                       |
| `created_at`       | timestamptz | Default: `now()`                                     |

#### `public.task_tags` (Join Table)

| Column    | Type | Notes                   |
| :-------- | :--- | :---------------------- |
| `task_id` | uuid | FK to `public.tasks.id` |
| `tag_id`  | uuid | FK to `public.tags.id`  |

---

## 4. Growth & Access

### `public.referral_invites`

| Column             | Type        | Notes                             |
| :----------------- | :---------- | :-------------------------------- |
| `invite_code`      | text        | PK                                |
| `referrer_user_id` | uuid        | FK to `auth.users.id` (Nullable)  |
| `target_plan_code` | text        | Optional (e.g., '1' for Friends)  |
| `status`           | text        | enum: 'active', 'used', 'expired' |
| `created_at`       | timestamptz | Default: `now()`                  |

### `public.waitlist`

| Column       | Type        | Notes             |
| :----------- | :---------- | :---------------- |
| `id`         | uuid        | PK                |
| `email`      | text        | Unique            |
| `status`     | text        | Default: 'queued' |
| `created_at` | timestamptz | Default: `now()`  |
