-- Consolidated Initial Schema for ClearDesk "Life Admin Organizer"
-- Date: 2026-01-02

-- 0. Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

-- 1. Plans table
CREATE TABLE IF NOT EXISTS "public"."plans" (
    "id" "uuid" DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    "code" "text" NOT NULL UNIQUE,
    "display_name" "text" NOT NULL,
    "description" "text",
    "price_cents" integer DEFAULT 0 NOT NULL,
    "features" jsonb DEFAULT '{}'::jsonb NOT NULL,
    "active" boolean DEFAULT true NOT NULL,
    "stripe_price_id" "text",
    "created_at" timestamp with time zone DEFAULT now()
);

-- 2. Profiles table
CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    "display_name" "text",
    "avatar_url" "text",
    "role" "text" DEFAULT 'member'::"text" NOT NULL,
    "subscription_status" "text" DEFAULT 'free'::"text" NOT NULL,
    "available_invites" integer DEFAULT 0 NOT NULL,
    "referrer_code_used" "text",
    "stripe_customer_id" "text",
    "created_at" timestamp with time zone DEFAULT now()
);

-- 3. Subscriptions table
CREATE TABLE IF NOT EXISTS "public"."subscriptions" (
    "id" "uuid" DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    "user_id" "uuid" NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    "plan_id" "uuid" NOT NULL REFERENCES public.plans(id),
    "status" "text" NOT NULL, -- active, trialing, canceled, incomplete, etc.
    "stripe_subscription_id" "text",
    "started_at" timestamp with time zone DEFAULT now() NOT NULL,
    "ends_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT now()
);

-- 4. Categories table (Admin created/controlled)
CREATE TABLE IF NOT EXISTS "public"."categories" (
    "id" "uuid" DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    "name" "text" NOT NULL,
    "slug" "text" NOT NULL UNIQUE,
    "color" "text",
    "created_at" timestamp with time zone DEFAULT now()
);

-- 5. Tasks table
CREATE TABLE IF NOT EXISTS "public"."tasks" (
    "id" "uuid" DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    "user_id" "uuid" NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    "category_id" "uuid" REFERENCES public.categories(id),
    "title" "text" NOT NULL,
    "notes" "text",
    "due_date" "date" NOT NULL,
    "recurrence_type" "text" DEFAULT 'none'::"text" NOT NULL,
    "recurrence_value" integer DEFAULT 0 NOT NULL,
    "is_complete" boolean DEFAULT false NOT NULL,
    "created_at" timestamp with time zone DEFAULT now()
);

-- 6. Tags table (User created)
CREATE TABLE IF NOT EXISTS "public"."tags" (
    "id" "uuid" DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    "user_id" "uuid" NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    "name" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT now()
);

-- 7. Task Tags (Join Table)
CREATE TABLE IF NOT EXISTS "public"."task_tags" (
    "task_id" "uuid" NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
    "tag_id" "uuid" NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
    PRIMARY KEY ("task_id", "tag_id")
);

-- 8. Referral Invites table
CREATE TABLE IF NOT EXISTS "public"."referral_invites" (
    "invite_code" "text" NOT NULL PRIMARY KEY,
    "referrer_user_id" "uuid" REFERENCES auth.users(id) ON DELETE CASCADE,
    "invite_type" "text" DEFAULT 'waitlist_approval'::"text" NOT NULL, -- waitlist_approval
    "target_plan_code" "text" DEFAULT '0',
    "status" "text" DEFAULT 'active'::"text" NOT NULL, -- active, used, expired
    "expires_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT now(),
    CONSTRAINT invite_type_check CHECK (invite_type IN ('waitlist_approval', 'friends'))
);



-- 10. Functions & Triggers

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    free_plan_id uuid;
    name_from_meta text;
BEGIN
    -- Extract display_name from metadata if it exists
    name_from_meta := new.raw_user_meta_data->>'display_name';

    -- Get the ID for the free plan (code '0')
    SELECT id INTO free_plan_id FROM public.plans WHERE code = '0';

    -- Create profile
    INSERT INTO public.profiles (id, display_name, subscription_status, available_invites)
    VALUES (new.id, name_from_meta, '0', 0);

    -- Create initial free subscription
    IF free_plan_id IS NOT NULL THEN
        INSERT INTO public.subscriptions (user_id, plan_id, status, started_at)
        VALUES (new.id, free_plan_id, 'active', now());
    END IF;

    RETURN NEW;
END;
$function$;

CREATE TRIGGER on_auth_user_created 
AFTER INSERT ON auth.users 
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 11. RLS Policies

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own profile" ON public.profiles USING (auth.uid() = id);

ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Plans are viewable by everyone" ON public.plans FOR SELECT USING (true);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own subscriptions" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories are viewable by everyone" ON public.categories FOR SELECT USING (true);

ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own tasks" ON public.tasks USING (auth.uid() = user_id);

ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own tags" ON public.tags USING (auth.uid() = user_id);

ALTER TABLE public.task_tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own task_tags" ON public.task_tags 
USING (
  EXISTS (
    SELECT 1 FROM public.tasks WHERE id = task_id AND user_id = auth.uid()
  )
);



ALTER TABLE public.referral_invites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own invites" ON public.referral_invites FOR SELECT 
USING (referrer_user_id = auth.uid());

CREATE POLICY "Admins can create any invite" ON public.referral_invites FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Users with invites can create codes" ON public.referral_invites FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND available_invites > 0
  )
);

-- 12. Seed Data

INSERT INTO public.plans (code, display_name, description, price_cents, features)
VALUES 
('0', 'Free Plan', 'Basic life admin organization', 0, '{"max_tasks": 10}'),
('1', 'Friends', 'Full access for our early birds', 0, '{"max_tasks": 1000}'),
('2', 'Premium Plan', 'Pro adulting tools', 1500, '{"max_tasks": 100, "priority_support": true}'),
('3', 'Family Plan', 'Shared dashboards for the household', 2500, '{"max_tasks": 500, "members": 5}')
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.categories (name, slug, color)
VALUES 
('Admin & Paperwork', 'admin', '#64748b'),
('Finance & Bills', 'finance', '#22c55e'),
('Home & Maintenance', 'home', '#f59e0b'),
('Health & Wellness', 'health', '#ef4444'),
('Subscriptions & Renewals', 'renewals', '#3b82f6'),
('Deep Work', 'deep-work', '#8b5cf6')
ON CONFLICT (slug) DO NOTHING;

-- Create bootstrap admin invite code
-- This allows the first admin to register with code: ADMIN-BOOTSTRAP
INSERT INTO public.referral_invites (invite_code, referrer_user_id, target_plan_code, status)
VALUES (
    'ADMIN-BOOTSTRAP',
    NULL, -- Will be updated after admin registers
    '1', -- Friends plan
    'active'
) ON CONFLICT (invite_code) DO NOTHING;
