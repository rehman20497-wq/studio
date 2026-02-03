
'use server';

import { sendEmail } from '@/lib/email';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { initializeApp, getApps } from 'firebase/app';
import { firebaseConfig } from '@/firebase/config';

interface NewsletterPayload {
  subject: string;
  body: string;
}

// Helper to initialize Firebase client SDK on the server
function initializeClientApp() {
    if (getApps().length) {
        return getApps()[0];
    }
    return initializeApp(firebaseConfig);
}

export async function sendBulkNewsletter(payload: NewsletterPayload) {
  if (!process.env.ADMIN_EMAIL) {
    console.error('ADMIN_EMAIL environment variable is not set.');
    throw new Error('Server configuration error.');
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002';

  // Initialize Firebase Client on the server
  const app = initializeClientApp();
  const firestore = getFirestore(app);

  // Fetch all subscriber emails
  const subscribersCollection = collection(firestore, 'newsletter_subscribers');
  const snapshot = await getDocs(subscribersCollection);
  
  if (snapshot.empty) {
    console.log('No subscribers to send to.');
    return { message: 'No subscribers found.' };
  }

  const subscriberEmails = snapshot.docs.map(doc => doc.data().email);

  const emailHtml = `
<div style="background-color: #0a0a0a; font-family: 'Inter', Arial, sans-serif; padding: 40px; color: #ffffff;">
  <div style="max-width: 680px; margin: 0 auto; background-color: #1a1a1a; border-radius: 20px; overflow: hidden; border: 1px solid #333;">
    
    <div style="padding: 30px 40px; border-bottom: 1px solid #333; position: relative;">
      <!-- Logo + GIF -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 0;">
        <tr style="height: 70px;">
          <td align="left" valign="top" style="padding: 0;">
            <img src="${appUrl}/mob1.png" alt="Telesys Logo" width="220" style="display: block; max-width: 220px; height: auto; line-height: 0; font-size: 0;" />
          </td>
          <td align="right" valign="top" style="padding: 0;">
            <img src="${appUrl}/new.gif" alt="New" width="70" height="70" style="display: block; line-height: 0; font-size: 0;" />
          </td>
        </tr>
      </table>
    </div>

    <div style="padding: 10px; line-height: 1.1; font-size: 17px; color: #A8A8A8; margin: 0;">
      <div style="color: #A8A8A8 !important; margin: 0; padding: 0;">
        <style>
          p, ul, ol, li, div {
            margin: 0 !important;
            padding: 0 !important;
          }
          ul, ol {
            padding-left: 20px !important;
            list-style-position: inside !important;
          }
          b, strong {
            color: #F5D34A !important; /* Make bold text yellow */
          }
        </style>
        ${payload.body}
      </div>
    </div>

    <div style="background-color: #000; padding: 30px 40px; font-size: 12px; text-align: center;">
      <p style="margin-bottom: 15px;">
        <a href="${appUrl}/about" style="color: #00ADBF; text-decoration: none; margin: 0 10px;">About Us</a> |
        <a href="${appUrl}/blogs" style="color: #00ADBF; text-decoration: none; margin: 0 10px;">Blog</a> |
        <a href="${appUrl}/contact" style="color: #00ADBF; text-decoration: none; margin: 0 10px;">Contact</a>
      </p>
      <p style="color: #ffffff;">You received this email because you subscribed to the Telesys newsletter.</p>
      <p style="margin-top: 10px; color: #ffffff;">Telesys Inc. | 1531 E Bradford Pkwy, Springfield MO 65804| &copy; 2024 All Rights Reserved</p>
      <div style="text-align: center; margin-top: 20px;">
        <a href="#" style="
          background-color: #F5D34A;
          color: #ffffff;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 50px;
          font-weight: bold;
          font-size: 15px;
          display: inline-block;
        ">Unsubscribe</a>
      </div>
    </div>
  </div>
</div>
`;


  // Send one email with all subscribers in BCC
  await sendEmail({
    to: process.env.ADMIN_EMAIL, // Send to self
    bcc: subscriberEmails,        // Add all subscribers to BCC
    subject: payload.subject,
    text: 'This email contains HTML content. Please use an email client that supports HTML.',
    html: emailHtml,
  });

  return { message: `Newsletter sent to ${subscriberEmails.length} subscribers.` };
}
