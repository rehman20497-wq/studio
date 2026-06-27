'use client';

import { useState, useEffect } from 'react';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, limit, query, doc, getDocs } from 'firebase/firestore';
import { useFirestore, useMemoFirebase, useAdminUser, updateDocumentNonBlocking } from '@/firebase';
import { cloudinaryConfig } from '@/lib/cloudinary';
import { CheckCircle, XCircle, AlertTriangle, Mail, Loader2, RefreshCw, ShieldAlert, Image as ImageIcon } from 'lucide-react';
import AdminPageWrapper, { PermissionGuard } from '@/components/admin/admin-page-wrapper';
import AdminHeader from '@/components/admin/admin-header';
import { Button } from '@/components/ui/button';
import { testEmailAction } from '@/app/actions/test-email';
import { useToast } from '@/hooks/use-toast';

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

const EmailConnectionTest = () => {
    const [testStatus, setTestStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('Verify SMTP connectivity by sending a test email to the administrator.');
    const [debugData, setDebugData] = useState<any>(null);

    const runTest = async () => {
        setTestStatus('loading');
        setMessage('Executing test-email server action...');
        setDebugData(null);

        try {
            // Calling the server action
            const result = await testEmailAction();
            
            if (result.success) {
                setTestStatus('success');
                setMessage('Test email sent successfully! Please check the inbox: ' + result.data?.recipient);
                setDebugData(result.data);
            } else {
                setTestStatus('error');
                setMessage(result.error?.message || 'Email delivery failed.');
                setDebugData(result.error);
            }
        } catch (err: any) {
            setTestStatus('error');
            setMessage('A system error occurred while calling the Server Action.');
            setDebugData({ 
                error: err.message,
                hint: 'If you see "Action not found", ensure you have redeployed the app and that environment variables are set in your hosting dashboard.' 
            });
        }
    };

    return (
        <div className="space-y-4">
            <StatusIndicator 
                status={testStatus === 'idle' ? 'loading' : testStatus} 
                title="Email (SMTP) Connection Test" 
                message={message} 
                data={debugData} 
            />
            <Button 
                onClick={runTest} 
                disabled={testStatus === 'loading'}
                variant="secondary"
                className="rounded-full shadow-md"
            >
                {testStatus === 'loading' ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                    <Mail className="w-4 h-4 mr-2" />
                )}
                Run Email Test
            </Button>
        </div>
    );
};

const CloudinaryMigrationTool = () => {
    const firestore = useFirestore();
    const { toast } = useToast();
    const [isScanning, setIsScanning] = useState(false);
    const [isRepairing, setIsRepairing] = useState(false);
    const [stats, setStats] = useState({ providers: 0, blogs: 0, brokenFound: 0 });

    const runScan = async () => {
        if (!firestore) return;
        setIsScanning(true);
        try {
            let brokenCount = 0;
            const legacy = cloudinaryConfig.legacyCloudName;

            const provSnap = await getDocs(collection(firestore, 'providers'));
            const blogSnap = await getDocs(collection(firestore, 'blog_posts'));

            provSnap.forEach(doc => {
                const d = doc.data();
                if (d.logoUrl?.includes(legacy) || d.bannerImageUrl?.includes(legacy)) brokenCount++;
            });

            blogSnap.forEach(doc => {
                const d = doc.data();
                if (d.featuredImageUrl?.includes(legacy) || d.authorImageUrl?.includes(legacy)) brokenCount++;
            });

            setStats({
                providers: provSnap.size,
                blogs: blogSnap.size,
                brokenFound: brokenCount
            });

            toast({ title: 'Scan Complete', description: `Found ${brokenCount} broken assets.` });
        } catch (e: any) {
            toast({ title: 'Scan Failed', description: e.message, variant: 'destructive' });
        } finally {
            setIsScanning(false);
        }
    };

    const runRepair = async () => {
        if (!firestore) return;
        setIsRepairing(true);
        try {
            const legacy = cloudinaryConfig.legacyCloudName;
            const current = cloudinaryConfig.cloudName;
            let repaired = 0;

            const provSnap = await getDocs(collection(firestore, 'providers'));
            const blogSnap = await getDocs(collection(firestore, 'blog_posts'));

            for (const docSnap of provSnap.docs) {
                const d = docSnap.data();
                const updates: any = {};
                if (d.logoUrl?.includes(legacy)) updates.logoUrl = d.logoUrl.replace(`/${legacy}/`, `/${current}/`);
                if (d.bannerImageUrl?.includes(legacy)) updates.bannerImageUrl = d.bannerImageUrl.replace(`/${legacy}/`, `/${current}/`);
                
                if (Object.keys(updates).length > 0) {
                    updateDocumentNonBlocking(doc(firestore, 'providers', docSnap.id), updates);
                    repaired++;
                }
            }

            for (const docSnap of blogSnap.docs) {
                const d = docSnap.data();
                const updates: any = {};
                if (d.featuredImageUrl?.includes(legacy)) updates.featuredImageUrl = d.featuredImageUrl.replace(`/${legacy}/`, `/${current}/`);
                if (d.authorImageUrl?.includes(legacy)) updates.authorImageUrl = d.authorImageUrl.replace(`/${legacy}/`, `/${current}/`);
                
                if (Object.keys(updates).length > 0) {
                    updateDocumentNonBlocking(doc(firestore, 'blog_posts', docSnap.id), updates);
                    repaired++;
                }
            }

            toast({ title: 'Repair Complete', description: `Updated ${repaired} assets to new cloud account.` });
            setStats(prev => ({ ...prev, brokenFound: 0 }));
        } catch (e: any) {
            toast({ title: 'Repair Failed', description: e.message, variant: 'destructive' });
        } finally {
            setIsRepairing(false);
        }
    };

    return (
        <div className="space-y-4">
             <div className="flex items-start gap-4 p-4 border rounded-lg shadow-sm bg-blue-50 border-blue-200">
                <div className="flex-shrink-0"><ImageIcon className="w-6 h-6 text-blue-500" /></div>
                <div className="flex-grow">
                    <p className="font-bold text-lg text-zinc-800">Cloudinary Asset Migration</p>
                    <p className="text-sm text-zinc-600 mt-1">
                        If you have moved your images from account <strong>{cloudinaryConfig.legacyCloudName}</strong> to <strong>{cloudinaryConfig.cloudName}</strong>, 
                        this tool will update the database links to prevent broken images.
                    </p>
                    <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                        <div className="bg-white p-2 rounded border"><p className="text-xs text-zinc-500">Providers</p><p className="font-bold">{stats.providers}</p></div>
                        <div className="bg-white p-2 rounded border"><p className="text-xs text-zinc-500">Blog Posts</p><p className="font-bold">{stats.blogs}</p></div>
                        <div className="bg-white p-2 rounded border border-red-200"><p className="text-xs text-red-500">Broken</p><p className="font-bold text-red-600">{stats.brokenFound}</p></div>
                    </div>
                </div>
            </div>
            <div className="flex gap-2">
                <Button onClick={runScan} disabled={isScanning} variant="outline" className="rounded-full">
                    {isScanning ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                    Scan for Broken Assets
                </Button>
                {stats.brokenFound > 0 && (
                    <Button onClick={runRepair} disabled={isRepairing} variant="default" className="rounded-full bg-red-600 hover:bg-red-700">
                        {isRepairing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <ShieldAlert className="w-4 h-4 mr-2" />}
                        Repair All URLs
                    </Button>
                )}
            </div>
        </div>
    )
}

function DebugContent() {
  const { session } = useAdminUser();
  return (
    <PermissionGuard pageId="debug">
      <div className="p-4 sm:p-8 md:p-12">
          <AdminHeader userName={session?.user.name || 'Admin'} />
          <div className="mt-12 max-w-4xl mx-auto space-y-10">
              <CloudinaryMigrationTool />
              <FirestoreConnectionTest collectionName="providers" testName="Providers Collection Test" />
              <FirestoreConnectionTest collectionName="blog_posts" testName="Blog Posts Collection Test" />
              <FirestoreConnectionTest collectionName="newsletter_subscribers" testName="Newsletter Subscribers Collection Test" />
              <CloudinaryConnectionTest />
              <EmailConnectionTest />
          </div>
      </div>
    </PermissionGuard>
  );
}

export default function DebugPage() {
  return (
    <AdminPageWrapper screenTitle="Debug Panel">
      <DebugContent />
    </AdminPageWrapper>
  );
}
