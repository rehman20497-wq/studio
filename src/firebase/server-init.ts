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
    let parsedKey;
    
    // Vercel sometimes double-escapes strings in JSON env vars
    if (typeof serviceAccountKey === 'string') {
      try {
        const firstPass = JSON.parse(serviceAccountKey.trim());
        parsedKey = typeof firstPass === 'string' ? JSON.parse(firstPass) : firstPass;
      } catch (e) {
        // Fallback for non-JSON strings (unlikely for this key)
        console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY JSON:', e);
        return null;
      }
    } else {
      parsedKey = serviceAccountKey;
    }

    if (parsedKey && parsedKey.private_key) {
      // Ensure newline characters are correctly handled for the private key
      parsedKey.private_key = parsedKey.private_key.replace(/\\n/g, '\n');
    }

    return initializeApp({
      credential: cert(parsedKey),
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
