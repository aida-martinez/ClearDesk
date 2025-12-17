set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  INSERT INTO public.profiles (id, subscription_status, available_invites)
  VALUES (new.id, 'free', 0);
  RETURN NEW;
END;
$function$
;


