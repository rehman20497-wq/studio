'use client';

import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, limit, query } from 'firebase/firestore';
import { useFirestore, useMemoFirebase, useAdminUser } from '@/firebase';
import { cloudinaryConfig } from '@/lib/cloudinary';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import AdminPageWrapper, { PermissionGuard } from '@/components/admin/admin-page-wrapper';
import AdminHeader from '@/components/admin/admin-header';

const StatusIndicator = ({ status, title, message, data }: { status: 'loading' | 'success' | 'error'; title: string; message: string, data?: any }) => {
  const getStatusInfo = () => {
    switch (status) {
      case 'loading':
        return { icon: <AlertTriangle className="w-6 h-6 text-yellow-500 animate-pulse" />, color: 'bg-yellow-50 border-yellow-200' };
      case 'success':
        return { icon: <CheckCircle className="w-6 h-6 text-green-500" />, color: 'bg-green-50 border-green-200' };
      case 'error':
        return { icon: <XCircle className="w-6 h-6 text-red-500" />, color: 'bg-red-50 border-red-200' };
      default:
        return { icon: <XCircle className="w-6 h-6 text-red-500" />, color: 'bg-red-50 border-red-200' };
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
        return query(collection(firestore, collectionName), limit(1));
    }, [firestore, collectionName]);

    const { data, isLoading, error } = useCollection(memoizedQuery);

    let status: 'loading' | 'success' | 'error' = 'loading';
    let message = `Attempting to connect to Firestore and fetch from "${collectionName}"...`;
    let displayData = null;

    if (isLoading) {
        status = 'loading';
    } else if (error) {
        status = 'error';
        message = `Firestore Connection Failed for "${collectionName}".`;
        displayData = {
            errorName: error.name,
            errorMessage: error.message,
        };
    } else if (data) {
        status = 'success';
        message = `Firestore Connection Successful! Fetched ${data.length} document(s) from "${collectionName}".`;
        displayData = {
            documentsFound: data.length,
            sampleDocument: data[0] || `No documents in collection matching query.`,
        };
    }

    return <StatusIndicator status={status} title={testName} message={message} data={displayData} />;
}

const CloudinaryConnectionTest = () => {
    let status: 'success' | 'error' = 'error';
    let message = '';
    let displayData = null;

    if (cloudinaryConfig && cloudinaryConfig.cloudName) {
        status = 'success';
        message = 'Cloudinary config loaded successfully.';
        displayData = {
            cloudName: cloudinaryConfig.cloudName,
            apiKey: cloudinaryConfig.apiKey ? '*********' : 'Not Found',
            uploadPreset: cloudinaryConfig.uploadPreset ? '********' : 'Not Found (Critical for uploads!)',
        }
    } else {
        status = 'error';
        message = 'Cloudinary config not found or invalid.';
        displayData = {
            error: 'The configuration object in src/lib/cloudinary.ts seems to be missing or empty.'
        }
    }

    return <StatusIndicator status={status} title="Cloudinary Connection" message={message} data={displayData} />;
}


export default function DebugPage() {
  const { session } = useAdminUser();
  
  return (
    <AdminPageWrapper screenTitle="Debug Panel">
      <PermissionGuard pageId="debug">
        <div className="p-4 sm:p-8 md:p-12">
            <AdminHeader userName={session?.user.name || 'Admin'} />
            <div className="mt-12 max-w-4xl mx-auto space-y-6">
                <FirestoreConnectionTest collectionName="providers" testName="Providers Collection Test" />
                <FirestoreConnectionTest collectionName="blog_posts" testName="Blog Posts Collection Test" />
                <FirestoreConnectionTest collectionName="admin_users" testName="Admin Users Collection Test" />
                <FirestoreConnectionTest collectionName="admin_roles" testName="Admin Roles Collection Test" />
                <CloudinaryConnectionTest />
            </div>
        </div>
      </PermissionGuard>
    </AdminPageWrapper>
  );
}
