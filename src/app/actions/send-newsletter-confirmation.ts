
'use server';

import { sendEmail } from '@/lib/email';

export async function sendNewsletterConfirmation(email: string) {
  if (!process.env.ADMIN_EMAIL) {
    console.error('ADMIN_EMAIL environment variable is not set.');
    return;
  }
  
  // Email to the user
  await sendEmail({
    to: email,
    subject: 'Subscription Confirmation',
    text: 'Thank you for subscribing to our newsletter! You will now receive the latest news and updates from us.',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Thank You for Subscribing!</h2>
        <p>You've been added to our mailing list and will now receive the latest news and updates from us.</p>
        <p>Best,<br>The Telesys Team</p>
      </div>
    `,
  });

  // Notification to the admin
  await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: 'New Newsletter Subscriber',
    text: `A new user has subscribed to the newsletter with the email: ${email}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Subscriber Alert</h2>
        <p>A new user has subscribed to your newsletter.</p>
        <p><strong>Email:</strong> ${email}</p>
      </div>
    `,
  });
}
