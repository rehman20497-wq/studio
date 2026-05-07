
import { initializeFirebase } from '@/firebase/server-init';
import Header from '@/components/layout/header';
import ClientOnly from '@/components/client-only';

export const dynamic = 'force-dynamic';

export default async function CheckStatusPage() {
  const envStatus = {
    hasKey: !!process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
    keyLength: process.env.FIREBASE_SERVICE_ACCOUNT_KEY?.length || 0,
    nodeEnv: process.env.NODE_ENV,
  };

  let firebaseStatus = 'Not Attempted';
  let firestoreTest = 'Not Attempted';
  let error: string | null = null;

  try {
    const { firestore } = initializeFirebase();
    if (firestore) {
      firebaseStatus = 'Initialized Successfully';
      
      // Attempt a very simple query with a timeout
      const testQuery = firestore.collection('blog_posts').limit(1).get();
      
      // Create a timeout promise
      const timeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Firestore query timed out after 5 seconds')), 5000)
      );

      try {
        const snapshot = await Promise.race([testQuery, timeout]) as any;
        firestoreTest = `Success! Found ${snapshot.size} documents in blog_posts.`;
      } catch (e: any) {
        firestoreTest = `Failed: ${e.message}`;
      }
    } else {
      firebaseStatus = 'Failed to get Firestore instance (Check server logs)';
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
              <p><strong>Key Length:</strong> {envStatus.keyLength} characters</p>
              <p><strong>NODE_ENV:</strong> {envStatus.nodeEnv}</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-purple-600 mb-2">2. Firebase Admin SDK</h2>
            <div className="bg-zinc-50 p-4 rounded-lg border">
              <p><strong>Status:</strong> {firebaseStatus}</p>
              <p><strong>Firestore Test:</strong> {firestoreTest}</p>
              {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded border border-red-200">
                  <strong>Error:</strong> {error}
                </div>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-green-600 mb-2">3. Diagnosis Help</h2>
            <div className="text-sm space-y-2 text-zinc-600">
              <p>• If <strong>List Pages</strong> work but <strong>Single Pages</strong> hang: The issue is the Admin SDK initialization on the server. List pages typically use the Client SDK (browser).</p>
              <p>• If <strong>Firestore Test</strong> shows "timed out": The server is unable to reach Google's database from the Vercel execution environment, or the credentials are invalid.</p>
              <p>• If <strong>FIREBASE_SERVICE_ACCOUNT_KEY</strong> is MISSING: You need to add it to your Vercel Environment Variables.</p>
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
