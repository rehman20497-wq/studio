
import { initializeApp, getApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// IMPORTANT: Do not modify this file.
// This is the server-side initialization for Firebase Admin SDK.

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  : undefined;

function getFirebaseAdminApp() {
  if (getApps().length > 0) {
    return getApp();
  }

  if (!serviceAccount) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set. Cannot initialize Firebase Admin SDK.');
  }

  return initializeApp({
    credential: cert(serviceAccount),
  });
}

export function initializeFirebase() {
    const app = getFirebaseAdminApp();
    return {
        firestore: getFirestore(app),
    };
}
