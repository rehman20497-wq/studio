
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
    <div style="background-color: #0a0a0a; color: #f0f0f0; font-family: 'Inter', Arial, sans-serif; padding: 40px;">
      <div style="max-width: 680px; margin: 0 auto; background-color: #1a1a1a; border-radius: 20px; overflow: hidden; border: 1px solid #333;">
        
        <div style="padding: 30px 40px; border-bottom: 1px solid #333; position: relative;">
         <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
  <tr>
    <td align="left">
      <img
        src="${appUrl}/tele.png"
        alt="Telesys Logo"
        width="220"
        style="display: block; max-width: 220px; height: auto;"
      />
    </td>
    <td align="right">
      <img
        src="${appUrl}/new.gif"
        alt="New"
        width="70"
        height="70"
        style="display: block;"
      />
    </td>
  </tr>
</table>

        </div>

        <div style="padding: 40px; line-height: 1.7; font-size: 17px; color:rgb(255, 255, 255); font-family: 'Inter', Arial, sans-serif;">
  ${payload.body}
</div>

        
        <div style="background-color: #000; padding: 30px 40px; font-size: 12px; color: #666; text-align: center;">
          <p style="margin-bottom: 15px;">
            <a href="${appUrl}/about" style="color: #00ADBF; text-decoration: none; margin: 0 10px;">About Us</a> |
            <a href="${appUrl}/blogs" style="color: #00ADBF; text-decoration: none; margin: 0 10px;">Blog</a> |
            <a href="${appUrl}/contact" style="color: #00ADBF; text-decoration: none; margin: 0 10px;">Contact</a>
          </p>
          <p>You received this email because you subscribed to the Telesys newsletter.</p>
          <p style="margin-top: 10px;">Telesys Inc. | 401 N Michigan Ave, Chicago, IL | &copy; 2024 All Rights Reserved</p>
          <p style="margin-top: 10px;">If you no longer wish to receive these emails, you can <a href="#" style="color: #888; text-decoration: underline;">unsubscribe here</a>.</p>
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
