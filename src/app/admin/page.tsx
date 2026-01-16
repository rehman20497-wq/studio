'use client';

import AdminPageWrapper, { PermissionGuard } from '@/components/admin/admin-page-wrapper';
import AdminPanel from '@/components/admin/admin-panel';
import AdminHeader from '@/components/admin/admin-header';
import { useAdminUser } from '@/firebase';

function AdminDashboardContent() {
  const { session } = useAdminUser();
  return (
    <PermissionGuard pageId="dashboard">
      <div className="p-4 sm:p-8 md:p-12">
        <AdminHeader userName={session?.user.name || 'Admin'} />
        <div className="mt-12">
          <AdminPanel />
        </div>
      </div>
    </PermissionGuard>
  );
}

export default function AdminDashboardPage() {
  return (
    <AdminPageWrapper screenTitle="Dashboard">
      <AdminDashboardContent />
    </AdminPageWrapper>
  );
}
