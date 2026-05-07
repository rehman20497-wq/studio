import { initializeApp, getApp, getApps, cert, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

/**
 * Initializes the Firebase Admin SDK for server-side use.
 * Uses a global check to prevent multiple initializations in serverless environments.
 */
function getFirebaseAdminApp(): App | null {
  if (getApps().length > 0) {
    return getApp();
  }

  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountKey) {
    // Graceful exit for local dev without keys
    return null;
  }

  try {
    // Robust parsing for Vercel environment variables
    const serviceAccount = JSON.parse(serviceAccountKey.trim());

    if (serviceAccount.private_key) {
      serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    }

    return initializeApp({
      credential: cert(serviceAccount),
    });
  } catch (error) {
    console.error('Firebase Admin initialization failed:', error);
    return null;
  }
}

/**
 * Provides access to Firestore on the server.
 * Returns null if initialization fails to avoid hanging components.
 */
export function initializeFirebase(): { firestore: Firestore | null } {
  const app = getFirebaseAdminApp();
  if (!app) return { firestore: null };

  try {
    return { firestore: getFirestore(app) };
  } catch (error) {
    console.error('Error getting Firestore instance:', error);
    return { firestore: null };
  }
}
