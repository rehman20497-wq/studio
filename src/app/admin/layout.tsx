
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Admin Panel | Telsys-Smarter Tech. Better Decisions',
  description: 'Admin panel for managing the application.',
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
