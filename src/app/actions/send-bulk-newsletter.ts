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

  // Send one email with all subscribers in BCC
  await sendEmail({
    to: process.env.ADMIN_EMAIL, // Send to self
    bcc: subscriberEmails,        // Add all subscribers to BCC
    subject: payload.subject,
    text: 'This email contains HTML content. Please use an email client that supports HTML.',
    html: payload.body,
  });

  return { message: `Newsletter sent to ${subscriberEmails.length} subscribers.` };
}
