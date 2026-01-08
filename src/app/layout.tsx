import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import ResourcesButtonSection from '@/components/resources-button-section';
import FooterCta from '@/components/footer-cta';
import FinalFooter from '@/components/layout/final-footer';
import BlogSection from '@/components/blog-section';

export const metadata: Metadata = {
  title: 'USA Testimonial Network',
  description: 'A premium, cinematic animated testimonial experience.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Gochi+Hand&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <BlogSection />
        <ResourcesButtonSection />
        <FooterCta />
        <FinalFooter />
        <Toaster />
      </body>
    </html>
  );
}
