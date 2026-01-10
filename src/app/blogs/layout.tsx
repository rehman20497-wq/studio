
import { FirebaseClientProvider } from '@/firebase/client-provider';
import BlogSection from '@/components/blog-section';
import ResourcesButtonSection from '@/components/resources-button-section';
import FooterCta from '@/components/footer-cta';
import FinalFooter from '@/components/layout/final-footer';
import { Toaster } from '@/components/ui/toaster';

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        {children}
        <ResourcesButtonSection />
        <FooterCta />
        <FinalFooter />
    </>
  );
}
