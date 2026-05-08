
import { initializeApp, getApp, getApps, cert, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

/**
 * Initializes the Firebase Admin SDK for server-side use.
 * Optimized for Vercel's environment variable handling.
 */
function getFirebaseAdminApp(): App | null {
  if (getApps().length > 0) {
    return getApp();
  }

  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountKey) {
    console.error('FIREBASE_SERVICE_ACCOUNT_KEY is MISSING.');
    return null;
  }

  try {
    let keyStr = serviceAccountKey.trim();
    
    // Vercel sometimes provides a double-escaped string
    if (keyStr.startsWith('"') && keyStr.endsWith('"')) {
      try {
        keyStr = JSON.parse(keyStr);
      } catch (e) {
        // Not double-escaped, just starts/ends with quotes
        keyStr = keyStr.slice(1, -1);
      }
    }

    const serviceAccount = typeof keyStr === 'string' ? JSON.parse(keyStr) : keyStr;

    if (serviceAccount.private_key) {
      // Standard Firebase requirement for newline characters
      serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    }

    return initializeApp({
      credential: cert(serviceAccount),
    });
  } catch (error: any) {
    console.error('Firebase Admin SDK Initialization Error:', error.message);
    return null;
  }
}

/**
 * Provides access to Firestore on the server.
 * Returns null if initialization fails to avoid hanging components.
 */
export function initializeFirebase(): { firestore: Firestore | null } {
  try {
    const app = getFirebaseAdminApp();
    if (!app) return { firestore: null };
    return { firestore: getFirestore(app) };
  } catch (error) {
    console.error('Error getting Firestore instance:', error);
    return { firestore: null };
  }
}
