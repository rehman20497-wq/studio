import { initializeApp, getApp, getApps, cert, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

/**
 * Initializes the Firebase Admin SDK in a robust, server-side manner.
 * Handles environment variable parsing for Vercel and prevents multiple initializations.
 */
function getFirebaseAdminApp(): App | null {
  // Prevent re-initialization if the app already exists
  if (getApps().length > 0) {
    return getApp();
  }

  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountKey) {
    // Log error but don't throw to avoid crashing the build/metadata generation
    console.error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set. Server-side operations will be limited.');
    return null;
  }

  try {
    // Parse the JSON string from environment variables
    const serviceAccount = JSON.parse(serviceAccountKey);

    // Vercel often escapes newlines in environment variables. 
    // We must ensure the private key has actual newlines.
    if (serviceAccount.private_key) {
      serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    }

    return initializeApp({
      credential: cert(serviceAccount),
    });
  } catch (error) {
    console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY or initialize Firebase Admin SDK:', error);
    return null;
  }
}

/**
 * Provides access to Firestore using the Admin SDK.
 * Safely handles cases where initialization might fail by returning null.
 */
export function initializeFirebase(): { firestore: Firestore | null } {
  const app = getFirebaseAdminApp();
  
  if (!app) {
    return { firestore: null };
  }

  try {
    return {
      firestore: getFirestore(app),
    };
  } catch (error) {
    console.error('Error obtaining Firestore instance from Admin SDK:', error);
    return { firestore: null };
  }
}
