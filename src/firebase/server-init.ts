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
    // Only log in production to keep dev logs clean if they haven't set it yet
    if (process.env.NODE_ENV === 'production') {
        console.error('FIREBASE_SERVICE_ACCOUNT_KEY is MISSING.');
    }
    return null;
  }

  try {
    let parsedKey;
    
    // Vercel sometimes double-escapes strings in JSON env vars or wraps them in extra quotes
    if (typeof serviceAccountKey === 'string') {
      const trimmed = serviceAccountKey.trim();
      try {
        // Attempt standard parse
        parsedKey = JSON.parse(trimmed);
        
        // If the result is still a string (double escaped), parse again
        if (typeof parsedKey === 'string') {
            parsedKey = JSON.parse(parsedKey);
        }
      } catch (e) {
        // Fallback for non-JSON strings
        console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY JSON:', e);
        return null;
      }
    } else {
      parsedKey = serviceAccountKey;
    }

    if (!parsedKey || !parsedKey.private_key) {
      console.error('Invalid service account key format: missing private_key');
      return null;
    }

    // CRITICAL: Ensure newline characters are correctly handled for the private key
    // This is the most common cause of hangs/failures on Vercel
    if (typeof parsedKey.private_key === 'string') {
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
    
    const db = getFirestore(app);
    // Optional: Settings to handle environment specific needs
    return { firestore: db };
  } catch (error) {
    console.error('Error getting Firestore instance:', error);
    return { firestore: null };
  }
}
