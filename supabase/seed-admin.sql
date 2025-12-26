-- Admin User Seeder
-- Run this manually in Supabase Studio SQL Editor after initial migration

DO $$
DECLARE
    admin_user_id uuid;
    friends_plan_id uuid;
BEGIN
    -- Get the Friends plan ID
    SELECT id INTO friends_plan_id FROM public.plans WHERE code = '1';

    -- Create admin invite code first
    INSERT INTO public.referral_invites (invite_code, referrer_user_id, target_plan_code, status)
    VALUES (
        'ADMIN-BOOTSTRAP',
        '00000000-0000-0000-0000-000000000000', -- Temporary placeholder
        '1',
        'active'
    ) ON CONFLICT (invite_code) DO NOTHING;

    -- Now you can register with this code: ADMIN-BOOTSTRAP
    -- After registration, run the rest of this script:

    -- Get the user ID
    SELECT id INTO admin_user_id FROM auth.users WHERE email = 'aida-martinez@outlook.com';

    IF admin_user_id IS NOT NULL THEN
        -- Update profile to admin
        UPDATE public.profiles 
        SET 
            role = 'admin',
            subscription_status = '1',
            available_invites = 9999999
        WHERE id = admin_user_id;

        -- Update subscription to Friends plan
        UPDATE public.subscriptions
        SET plan_id = friends_plan_id
        WHERE user_id = admin_user_id;

        -- Mark the bootstrap code as used
        UPDATE public.referral_invites
        SET status = 'used', referrer_user_id = admin_user_id
        WHERE invite_code = 'ADMIN-BOOTSTRAP';

        RAISE NOTICE 'Admin user created successfully!';
    ELSE
        RAISE NOTICE 'User not found. Please register first with code: ADMIN-BOOTSTRAP';
    END IF;
END $$;
