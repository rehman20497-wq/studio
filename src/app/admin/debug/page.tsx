
'use client';

import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, limit, query, getDocs } from 'firebase/firestore';
import { cloudinaryConfig } from '@/lib/cloudinary';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle } from 'lucide-react';
import AdminPageWrapper from '@/components/admin/admin-page-wrapper';
import AdminHeader from '@/components/admin/admin-header';

const StatusIndicator = ({ status, title, message, data }: { status: 'loading' | 'success' | 'error' | 'info'; title: string; message: string, data?: any }) => {
  const getStatusInfo = () => {
    switch (status) {
      case 'loading':
        return { icon: <AlertTriangle className="w-6 h-6 text-yellow-500 animate-pulse" />, color: 'bg-yellow-50 border-yellow-200' };
      case 'success':
        return { icon: <CheckCircle className="w-6 h-6 text-green-500" />, color: 'bg-green-50 border-green-200' };
      case 'error':
        return { icon: <XCircle className="w-6 h-6 text-red-500" />, color: 'bg-red-50 border-red-200' };
      default:
        return { icon: <HelpCircle className="w-6 h-6 text-blue-500" />, color: 'bg-blue-50 border-blue-200' };
    }
  };

  const { icon, color } = getStatusInfo();

  return (
    <div className={`flex items-start gap-4 p-4 border rounded-lg shadow-sm ${color}`}>
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-grow">
        <p className="font-bold text-lg text-zinc-800">{title}</p>
        <p className="text-sm text-zinc-600 mt-1">{message}</p>
        {data && (
          <pre className="mt-4 text-xs bg-white text-zinc-700 p-3 rounded-md overflow-x-auto border border-zinc-200">
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        )}
      </div>
    </div>
  );
};


const FirestoreConnectionTest = ({ collectionName, testName }: { collectionName: string; testName: string }) => {
    const firestore = useFirestore();
    const memoizedQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        // This query is what your admin panel uses. It fetches all documents.
        return query(collection(firestore, collectionName));
    }, [firestore, collectionName]);

    const { data, isLoading, error } = useCollection(memoizedQuery);

    let status: 'loading' | 'success' | 'error' = 'loading';
    let message = `Attempting to list documents from the "${collectionName}" collection...`;
    let displayData = null;

    if (isLoading) {
        status = 'loading';
    } else if (error) {
        status = 'error';
        message = `Failed to list documents from "${collectionName}". This confirms the security rule issue.`;
        displayData = {
            errorName: error.name,
            errorMessage: error.message,
        };
    } else if (data) {
        status = 'success';
        message = `Successfully listed ${data.length} document(s) from "${collectionName}".`;
        displayData = {
            documentsFound: data.length,
            sampleDocument: data[0] || `No documents in collection. Add one to see a sample.`,
        };
    }

    return <StatusIndicator status={status} title={testName} message={message} data={displayData} />;
}

const CloudinaryConnectionTest = () => {
    let status: 'success' | 'error' | 'info' = 'info';
    let message = '';
    let displayData = null;

    if (cloudinaryConfig && cloudinaryConfig.cloudName && cloudinaryConfig.uploadPreset) {
        status = 'success';
        message = 'Cloudinary config seems correct. Uploads should work.';
        displayData = {
            cloudName: cloudinaryConfig.cloudName,
            uploadPreset: cloudinaryConfig.uploadPreset,
            apiKey: cloudinaryConfig.apiKey ? '********* (loaded)' : 'Not Found (OK for unsigned uploads)',
        }
    } else {
        status = 'error';
        message = 'Cloudinary config is incomplete! Upload preset is missing.';
        displayData = {
            error: 'The configuration object in src/lib/cloudinary.ts must have a `cloudName` and `uploadPreset`.',
            configFound: cloudinaryConfig,
        }
    }

    return <StatusIndicator status={status} title="Cloudinary Connection" message={message} data={displayData} />;
}

const RulesAnalysis = () => {
    const firestore = useFirestore();
    const { data: providerData, error: providerError } = useCollection(useMemoFirebase(() => firestore ? query(collection(firestore, 'providers')) : null, [firestore]));
    const { data: blogData, error: blogError } = useCollection(useMemoFirebase(() => firestore ? query(collection(firestore, 'blog_posts')) : null, [firestore]));

    const isProviderWorking = providerData !== null && providerError === null;
    const isBlogFailing = blogData === null && blogError !== null;
    
    if (isProviderWorking && isBlogFailing) {
        return <StatusIndicator 
            status="info"
            title="Debugging Analysis"
            message="The debug tests show that listing `providers` works, but listing `blog_posts` fails with a permission error. This confirms the issue is in your `firestore.rules` file."
            data={{
                Conclusion: "The security rule for `blog_posts` is incorrect. It needs to allow authenticated users (like the admin) to perform a `list` operation without requiring a filter. The `providers` rule works, so the `blog_posts` rule should be made identical to it."
            }}
        />
    }

    return null;
}


export default function DebugAdminPage() {
  return (
    <AdminPageWrapper screenTitle="Debug Panel">
       <div className="p-4 sm:p-8 md:p-12">
        <AdminHeader userName="Faizan" />
        <div className="mt-12 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold font-headline text-zinc-900 mb-8">System Status & Debug</h1>
            <div className="space-y-6">
                <CloudinaryConnectionTest />
                <FirestoreConnectionTest collectionName="providers" testName="Providers Collection Test" />
                <FirestoreConnectionTest collectionName="blog_posts" testName="Blog Posts Collection Test" />
                <RulesAnalysis />
            </div>
        </div>
      </div>
    </AdminPageWrapper>
  );
}
