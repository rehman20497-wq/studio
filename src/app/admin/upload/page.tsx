'use client';

import AdminPageWrapper, { PermissionGuard } from '@/components/admin/admin-page-wrapper';
import AdminHeader from '@/components/admin/admin-header';
import UploadProviderForm from '@/components/admin/upload-provider-form';
import { useAdminUser } from '@/firebase';

export default function UploadProviderPage() {
  const { session } = useAdminUser();
  return (
    <AdminPageWrapper screenTitle="Upload Provider">
      <PermissionGuard pageId="upload-provider">
        <div className="p-4 sm:p-8 md:p-12">
            <AdminHeader userName={session?.user.name || 'Admin'} />
            <div className="mt-12">
                <UploadProviderForm />
            </div>
        </div>
      </PermissionGuard>
    </AdminPageWrapper>
  );
}
