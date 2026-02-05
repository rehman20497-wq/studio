'use client';

import { usePathname } from 'next/navigation';
import { Toaster } from "@/components/ui/toaster";
import ResourcesButtonSection from '@/components/resources-button-section';
import FooterCta from '@/components/footer-cta';
import FinalFooter from '@/components/layout/final-footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import BlogSection from '@/components/blog-section';
import DisableZoom from "@/components/disable-zoom";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');
  
  return (
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
      <DisableZoom />
      <Analytics />
      <SpeedInsights />
    </FirebaseClientProvider>
  );
}
