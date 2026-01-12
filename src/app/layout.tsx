'use client';

import { usePathname } from 'next/navigation';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import ResourcesButtonSection from '@/components/resources-button-section';
import FooterCta from '@/components/footer-cta';
import FinalFooter from '@/components/layout/final-footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import BlogSection from '@/components/blog-section';
import { AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/page-transition';

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
        <title>TelSys – Enabling Confident Technology Decisions</title>
        <meta name="description" content="TelSys helps you make confident technology decisions with expert insights, innovative solutions, and reliable digital guidance." />
        <link rel="icon" href="/fav.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Gochi+Hand&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          <AnimatePresence mode="wait">
            <div key={pathname}>
              {children}
              {!isAdminPage && <PageTransition />}
            </div>
          </AnimatePresence>

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
      </body>
    </html>
  );
}
