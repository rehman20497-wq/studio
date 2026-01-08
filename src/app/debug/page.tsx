'use client';

import { useMemo } from 'react';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, limit, query } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { cloudinaryConfig } from '@/lib/cloudinary';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import Header from '@/components/layout/header';

const StatusIndicator = ({ status, message, data }: { status: 'loading' | 'success' | 'error'; message: string, data?: any }) => {
  return (
    <div className="flex items-start gap-4 p-4 border rounded-lg bg-white shadow-sm">
      <div>
        {status === 'loading' && <AlertTriangle className="w-6 h-6 text-yellow-500 animate-pulse" />}
        {status === 'success' && <CheckCircle className="w-6 h-6 text-green-500" />}
        {status === 'error' && <XCircle className="w-6 h-6 text-red-500" />}
      </div>
      <div className="flex-grow">
        <p className="font-bold text-lg text-zinc-800">{message}</p>
        {status === 'error' && data && (
            <pre className="mt-2 text-xs bg-red-50 text-red-700 p-2 rounded-md overflow-x-auto">
                <code>{JSON.stringify(data, null, 2)}</code>
            </pre>
        )}
         {status === 'success' && data && (
            <pre className="mt-2 text-xs bg-green-50 text-green-700 p-2 rounded-md overflow-x-auto">
                <code>{JSON.stringify(data, null, 2)}</code>
            </pre>
        )}
      </div>
    </div>
  );
};


const FirestoreConnectionTest = () => {
    const firestore = useFirestore();
    const memoizedQuery = useMemo(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'reviewer_profiles'), limit(1));
    }, [firestore]);

    const { data, isLoading, error } = useCollection(memoizedQuery);

    let status: 'loading' | 'success' | 'error' = 'loading';
    let message = 'Attempting to connect to Firestore...';
    let displayData = null;

    if (isLoading) {
        status = 'loading';
        message = 'Fetching test data from reviewer_profiles...';
    } else if (error) {
        status = 'error';
        message = 'Firestore Connection Failed.';
        displayData = {
            error: error.name,
            message: error.message,
        }
    } else if (data) {
        status = 'success';
        message = 'Firestore Connection Successful!';
        displayData = {
            documentsFound: data.length,
            firstDocument: data[0] || 'No documents in collection.',
        }
    }

    return <StatusIndicator status={status} message={message} data={displayData} />;
}

const CloudinaryConnectionTest = () => {
    let status: 'success' | 'error' = 'loading' as 'success' | 'error';
    let message = '';
    let displayData = null;

    if (cloudinaryConfig && cloudinaryConfig.cloudName) {
        status = 'success';
        message = 'Cloudinary config loaded successfully.';
        displayData = {
            cloudName: cloudinaryConfig.cloudName,
            apiKey: cloudinaryConfig.apiKey ? '*********' : 'Not Found',
            apiSecret: cloudinaryConfig.apiSecret ? '*********' : 'Not Found'
        }
    } else {
        status = 'error';
        message = 'Cloudinary config not found or invalid.';
        displayData = {
            error: 'The configuration object in src/lib/cloudinary.ts seems to be missing or empty.'
        }
    }

    return <StatusIndicator status={status} message={message} data={displayData} />;
}


export default function DebugPage() {
  return (
    <div className="bg-[#FCFBF8] min-h-screen">
        <Header />
        <main className="py-12 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold font-headline text-zinc-900 mb-8">Debug Panel</h1>
                <div className="space-y-6">
                    <FirestoreConnectionTest />
                    <CloudinaryConnectionTest />
                </div>
            </div>
        </main>
    </div>
  );
}