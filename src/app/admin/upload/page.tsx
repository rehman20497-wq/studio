'use client';
import AdminHeader from '@/components/admin/admin-header';
import UploadProviderForm from '@/components/admin/upload-provider-form';

export default function UploadProviderPage() {
  return (
    <div className="p-4 sm:p-8 md:p-12">
      <AdminHeader userName="Faizan" />
      <div className="mt-12">
        <UploadProviderForm />
      </div>
    </div>
  );
}
