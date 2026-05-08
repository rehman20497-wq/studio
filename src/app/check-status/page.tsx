import { initializeFirebase } from '@/firebase/server-init';
import Header from '@/components/layout/header';
import ClientOnly from '@/components/client-only';

export const dynamic = 'force-dynamic';

export default async function CheckStatusPage() {
  const keyEnv = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  const envStatus = {
    hasKey: !!keyEnv,
    keyLength: keyEnv?.length || 0,
    nodeEnv: process.env.NODE_ENV,
    keyPreview: keyEnv ? `${keyEnv.substring(0, 15)}...${keyEnv.substring(keyEnv.length - 15)}` : 'N/A'
  };

  let firebaseStatus = 'Not Attempted';
  let firestoreTest = 'Not Attempted';
  let error: string | null = null;

  try {
    const { firestore } = initializeFirebase();
    if (firestore) {
      firebaseStatus = 'Admin SDK Initialized Successfully';
      
      // Attempt a very simple query with a timeout to catch hangs
      const testQuery = firestore.collection('blog_posts').limit(1).get();
      
      // Create a timeout promise to identify hangs
      const timeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Firestore query timed out after 5 seconds - Check credentials/network')), 5000)
      );

      try {
        const snapshot = await Promise.race([testQuery, timeout]) as any;
        firestoreTest = `Success! Found ${snapshot.size} documents in blog_posts. Database is reachable.`;
      } catch (e: any) {
        firestoreTest = `Query Failed: ${e.message}`;
      }
    } else {
      firebaseStatus = 'Failed to initialize Admin SDK (Key might be invalid or missing)';
    }
  } catch (e: any) {
    firebaseStatus = 'Crash during initialization';
    error = e.message;
  }

  return (
    <div className="bg-[#FCFBF8] min-h-screen font-mono p-8">
      <ClientOnly>
        <Header />
      </ClientOnly>
      <main className="max-w-4xl mx-auto mt-20 bg-white p-8 rounded-2xl shadow-xl border-2 border-zinc-200">
        <h1 className="text-3xl font-bold mb-8 border-b pb-4">System Status Debugger</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold text-blue-600 mb-2">1. Environment Variables</h2>
            <div className="bg-zinc-50 p-4 rounded-lg border">
              <p><strong>FIREBASE_SERVICE_ACCOUNT_KEY:</strong> {envStatus.hasKey ? 'SET' : 'MISSING'}</p>
              <p><strong>Key Length:</strong> {envStatus.keyLength} characters (Should be approx 2300+)</p>
              <p><strong>Key Preview:</strong> <code className="bg-zinc-200 px-1">{envStatus.keyPreview}</code></p>
              <p><strong>NODE_ENV:</strong> {envStatus.nodeEnv}</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-purple-600 mb-2">2. Firebase Admin SDK (Server-Side)</h2>
            <div className="bg-zinc-50 p-4 rounded-lg border">
              <p><strong>Init Status:</strong> {firebaseStatus}</p>
              <p><strong>Firestore Connection:</strong> {firestoreTest}</p>
              {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded border border-red-200">
                  <strong>Error Trace:</strong> {error}
                </div>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-green-600 mb-2">3. Troubleshooting Action</h2>
            <div className="text-sm space-y-2 text-zinc-600">
              <p>• <strong>If status is MISSING</strong>: You must add <code>FIREBASE_SERVICE_ACCOUNT_KEY</code> to your environment. In local dev, use <code>.env.local</code>. In Vercel, use Project Settings.</p>
              <p>• <strong>If status is Success but pages don't load</strong>: Clear your browser cache and check the slug values in your database.</p>
              <p>• <strong>If status is Timed Out</strong>: The SDK cannot reach Google. Verify the <code>private_key</code> in your JSON hasn't been corrupted by copy-pasting.</p>
            </div>
          </section>

          <div className="pt-8 border-t flex justify-center">
            <a href="/" className="px-6 py-2 bg-black text-white rounded-full hover:bg-zinc-800 transition-colors">
              Return Home
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
