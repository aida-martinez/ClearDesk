![logo](/public/images/logo.svg)

# ClearDesk - Life admin, made simple

Keep track of recurring reponsabilities, like renewing your driver's license, paying bills, or scheduling checkups, without scheduling your life.

## Supabase - The "Development Loop"

Now that you have Docker running, this is how you should work from now on:

**Modify:** You can make changes to tables in your Local Studio (127.0.0.1:54323).

**Capture:** When you're happy, run supabase db diff -f add_new_column to create a migration file.

**Deploy:** When the feature is ready, run supabase db push to send those changes to your Cloud project.

### To get changes from the cloud

1. supabase db pull --schema public
2. supabase reset

## Useful commands

supabase status
supabase stop and supabase start

### When Windows claims the ports

netsh interface ipv4 show excludedportrange protocol=tcp

net stop winnat
net start winnat
