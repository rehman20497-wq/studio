
'use client';

import AdminPageWrapper from '@/components/admin/admin-page-wrapper';
import AdminPanel from '@/components/admin/admin-panel';
import AdminHeader from '@/components/admin/admin-header';

export default function AdminDashboardPage() {
  return (
    <AdminPageWrapper screenTitle="Welcome, Faizan!">
      <div className="p-4 sm:p-8 md:p-12">
        <AdminHeader userName="Faizan" />
        <div className="mt-12">
          <AdminPanel />
        </div>
      </div>
    </AdminPageWrapper>
  );
}
