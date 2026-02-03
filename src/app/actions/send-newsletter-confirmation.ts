
'use server';

import { sendEmail } from '@/lib/email';

export async function sendNewsletterConfirmation(email: string) {
  if (!process.env.ADMIN_EMAIL) {
    console.error('ADMIN_EMAIL environment variable is not set.');
    return;
  }
  
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002';

  // Email to the user
  await sendEmail({
    to: email,
    subject: 'Welcome to the Future | Telesys Newsletter Confirmation',
    text: `Thank you for subscribing to our newsletter! You will now receive the latest news and updates from us. Explore more at ${appUrl}/blogs or learn about us at ${appUrl}/about.`,
    html: `
      <div style="background-color: #0a0a0a; color: #f0f0f0; font-family: 'Inter', Arial, sans-serif; padding: 40px; text-align: center;">
        <style>
          .button-explore:hover {
            background-color: #F5D34A !important;
            color: #000000 !important;
            box-shadow: 0 6px 20px rgba(245, 211, 74, 0.5) !important;
            transform: translateY(-2px);
          }
          .button-about:hover {
            background-color: #F5D34A !important;
            color: #000000 !important;
          }
        </style>
        <div style="max-width: 600px; margin: 0 auto; background-color: #1a1a1a; border-radius: 20px; overflow: hidden; border: 1px solid #333;">
          
          <div style="padding: 30px 40px; text-align: left; position: relative;">
           <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
  <tr>
    <td align="center">
      <img
        src="${appUrl}/mob.webp"
        alt="Telesys Logo"
        width="220"
        style="
          display: block;
          max-width: 220px;
          height: auto;
          margin: 0 auto;
        "
      />
    </td>
  </tr>
</table>


            
            <h1 style="font-family: 'Raleway', Arial, sans-serif; font-size: 32px; color: #ffffff; margin-bottom: 20px; text-shadow: 0 0 10px hsla(var(--primary), 0.5);">
              Welcome to the Network.
            </h1>
            
            <p style="font-size: 16px; line-height: 1.6; color: #b3b3b3; margin-bottom: 30px;">
              Thank you for subscribing! You're now connected to the forefront of innovation. Get ready for exclusive insights, updates, and resources delivered directly to your inbox.
            </p>
            
            <div style="text-align: center; margin-bottom: 40px;">
              <a href="${appUrl}/blogs" class="button-explore" style="background-color: #00ADBF; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px; margin: 0 10px; display: inline-block; box-shadow: 0 4px 15px rgba(0, 173, 191, 0.4); transition: all 0.3s ease;">Explore Our Blog</a>
              <a href="${appUrl}/about" class="button-about" style="background-color: #333; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px; margin: 0 10px; display: inline-block; transition: all 0.3s ease;">About Telesys</a>
            </div>
          </div>
          
          <div style="background-color: #000; padding: 20px 40px; font-size: 12px; color: #666; text-align: center;">
            <p>You received this email because you subscribed to the Telesys newsletter.</p>
            <p style="margin-top: 10px;">Telesys Inc. | 1531 E Bradford Pkwy, Springfield MO 65804 | &copy; 2024 All Rights Reserved</p>
          </div>
        </div>
      </div>
    `,
  });

  // Notification to the admin
  await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: '🚀 New Newsletter Subscriber',
    text: `A new user has subscribed to the newsletter with the email: ${email}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f9f9f9; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 30px; border: 1px solid #e0e0e0;">
          <h2 style="font-size: 24px; color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Subscriber Alert</h2>
          <p style="font-size: 16px; color: #555;">A new user has joined the Telesys mailing list.</p>
          <div style="background-color: #f0faff; border: 1px dashed #cceeff; border-radius: 4px; padding: 15px; margin-top: 20px; text-align: center;">
            <p style="font-size: 18px; color: #333; font-weight: bold; margin: 0;">${email}</p>
          </div>
        </div>
      </div>
    `,
  });
}
