
'use client';

import { usePathname } from 'next/navigation';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import ResourcesButtonSection from '@/components/resources-button-section';
import FooterCta from '@/components/footer-cta';
import FinalFooter from '@/components/layout/final-footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import BlogSection from '@/components/blog-section';
import DisableZoom from "@/components/disable-zoom";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <html lang="en">
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <title>Telsys – Enabling Confident Technology Decisions</title>
        <meta name="description" content="Telsys helps you make confident technology decisions with expert insights, innovative solutions, and reliable digital guidance." />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-body antialiased overflow-x-clip">
        <FirebaseClientProvider>
          {children}

          {!isAdminPage && (
            <>
              <BlogSection />
              <ResourcesButtonSection />
              <FooterCta />
              <FinalFooter />
            </>
          )}
          <Toaster />
        </FirebaseClientProvider>
        <DisableZoom />
      </body>
    </html>
  );
}
