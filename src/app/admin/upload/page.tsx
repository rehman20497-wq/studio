'use client';

import { useUser, useAuth } from '@/firebase';
import AdminHeader from '@/components/admin/admin-header';
import AdminLayout from '@/components/admin/admin-layout';
import UploadProviderForm from '@/components/admin/upload-provider-form';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function UploadProviderPage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/admin');
    }
  }, [user, isUserLoading, router]);

  const handleLogout = () => {
    if (auth) {
      signOut(auth);
    }
  };

  if (isUserLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FEF9F2]">
        <p>Loading...</p>
      </div>
    );
  }
  
  return (
    <AdminLayout onLogout={handleLogout}>
        <div className="p-4 sm:p-8 md:p-12">
            <AdminHeader userName="Faizan" />
            <div className="mt-12">
                <UploadProviderForm />
            </div>
        </div>
    </AdminLayout>
  );
}
