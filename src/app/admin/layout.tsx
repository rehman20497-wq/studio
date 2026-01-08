
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Admin Panel | USA Testimonial Network',
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
