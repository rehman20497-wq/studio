
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
    console.error('FIREBASE_SERVICE_ACCOUNT_KEY is not defined in environment variables.');
    return null;
  }

  try {
    // Robust parsing for Vercel environment variables
    // Vercel might sometimes double-escape or wrap the JSON in quotes
    let sanitizedKey = serviceAccountKey.trim();
    
    // If it starts and ends with double quotes, it might be a double-stringified JSON from some CI tools
    if (sanitizedKey.startsWith('"') && sanitizedKey.endsWith('"')) {
      sanitizedKey = sanitizedKey.substring(1, sanitizedKey.length - 1).replace(/\\"/g, '"');
    }

    const serviceAccount = JSON.parse(sanitizedKey);

    if (serviceAccount.private_key) {
      // Ensure newline characters are correctly interpreted
      serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    }

    return initializeApp({
      credential: cert(serviceAccount),
    });
  } catch (error: any) {
    console.error('Firebase Admin initialization failed:', error.message);
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
