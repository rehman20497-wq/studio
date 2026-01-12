
'use server';

import { sendEmail } from '@/lib/email';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { initializeFirebase } from '@/firebase/server-init';

interface NewsletterPayload {
  subject: string;
  body: string;
}

export async function sendBulkNewsletter(payload: NewsletterPayload) {
  if (!process.env.ADMIN_EMAIL) {
    console.error('ADMIN_EMAIL environment variable is not set.');
    throw new Error('Server configuration error.');
  }

  // Initialize Firebase Admin on the server
  const { firestore } = initializeFirebase();

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
