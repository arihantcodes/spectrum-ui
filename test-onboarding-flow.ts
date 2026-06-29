import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { sendFounderWelcomeEmail } from './lib/resend';
import { supabaseAdmin } from './lib/supabase-admin';
import { syncUser } from './lib/user-sync';

async function testOnboardingFlow() {
  const mockSession = {
    user: {
      email: 'test-onboarding-casing@example.com',
      name: 'Test Casing User',
    }
  };

  const userEmail = mockSession.user.email.toLowerCase();
  console.log('[Test] Starting onboarding test for:', userEmail);
  console.log('[Test] API Key present:', !!process.env.RESEND_API_KEY);

  // 1. Clean up existing test user if any
  await supabaseAdmin.from('users').delete().eq('email', userEmail);
  console.log('[Test] Cleaned up existing test user record.');

  // 2. Sync User (normally done first)
  console.log('[Test] Running syncUser...');
  await syncUser({
    email: userEmail,
    name: mockSession.user.name,
    githubUsername: 'test-github-user',
    buildingType: 'Startup'
  });

  // 3. Run welcome email logic exactly as in actions.ts
  console.log('[Test] Running welcome email check & trigger...');
  try {
    const { data: userRecord } = await supabaseAdmin
      .from('users')
      .select('welcome_email_sent')
      .eq('email', userEmail)
      .single();

    console.log('[Test] User record welcome_email_sent status before:', userRecord?.welcome_email_sent);

    if (userRecord && !userRecord.welcome_email_sent) {
      console.log('[Test] Attempting to send welcome email...');
      const sendResult = await sendFounderWelcomeEmail(userEmail, mockSession.user.name || '');
      console.log('[Test] Resend response:', sendResult);
      
      const { error: dbError } = await supabaseAdmin
        .from('users')
        .update({ welcome_email_sent: true })
        .eq('email', userEmail);
        
      if (dbError) {
        console.error('[Test] Failed to update DB for welcome email:', dbError);
      } else {
        console.log('[Test] Successfully updated DB welcome_email_sent to true!');
      }
    } else {
      console.log('[Test] Skipped email sending (already sent or user not found)');
    }
  } catch (err) {
    console.error('[Test] Welcome email failed:', err);
  }

  // 4. Verify DB status after execution
  const { data: finalRecord } = await supabaseAdmin
    .from('users')
    .select('welcome_email_sent')
    .eq('email', userEmail)
    .single();
  console.log('[Test] Final welcome_email_sent status in DB:', finalRecord?.welcome_email_sent);

  // Clean up
  await supabaseAdmin.from('users').delete().eq('email', userEmail);
  console.log('[Test] Cleaned up test user record.');
}

testOnboardingFlow();
