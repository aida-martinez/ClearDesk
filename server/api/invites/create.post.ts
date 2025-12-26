import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  
  if (!user) {
    throw createError({ statusCode: 401, message: 'Authentication required' })
  }

  const supabase = await serverSupabaseServiceRole(event)
  
  // Check if user has available invites or is admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('available_invites, role')
    .eq('id', user.id)
    .single()

  if (!profile) {
    throw createError({ statusCode: 404, message: 'Profile not found' })
  }

  const isAdmin = profile.role === 'admin'
  const hasInvites = profile.available_invites > 0

  if (!isAdmin && !hasInvites) {
    throw createError({ 
      statusCode: 403, 
      message: 'You do not have any available invites' 
    })
  }

  const { planCode, expiresInDays } = await readBody(event)

  // Generate invite code
  const inviteCode = `${user.email?.split('@')[0]?.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`
  
  // Calculate expiration date if specified
  let expiresAt = null
  if (expiresInDays && expiresInDays > 0) {
    expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + expiresInDays)
  }

  // Create the invite
  const { error: inviteError } = await supabase
    .from('referral_invites')
    .insert({
      invite_code: inviteCode,
      referrer_user_id: user.id,
      target_plan_code: planCode || '0', // Default to free plan for member invites
      status: 'active',
      expires_at: expiresAt
    })

  if (inviteError) {
    throw createError({ statusCode: 500, message: 'Failed to create invite code' })
  }

  // Decrement available_invites for non-admin users
  if (!isAdmin) {
    await supabase
      .from('profiles')
      .update({ available_invites: profile.available_invites - 1 })
      .eq('id', user.id)
  }

  return { 
    success: true, 
    inviteCode,
    expiresAt
  }
})
