
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
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.telesys.com';

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        
        {/* <!-- Google Site Verification --> */}
        <meta name="google-site-verification" content="KXEdky5lxc8xMkxBaH0tsuprp4ngpRJwQ5Ur4FjiCro" />

        {/* <!-- Primary Meta Tags --> */}
        <title>Telsys Inc. | Cloud, AI, Communications & Connectivity Solutions</title>
        <meta name="title" content="Telsys Inc. | Cloud, AI, Communications & Connectivity Solutions" />
        <meta name="description" content="Telsys Inc. provides expert-driven solutions in Cloud, AI, Communications, and Connectivity to help businesses in the USA innovate faster, grow smarter, and operate with confidence." />
        <meta name="keywords" content="Cloud Solutions, AI, Communications, Connectivity, Technology Partner, Business Growth, IT Services, USA, Telsys Inc." />
        <meta name="author" content="Telsys Inc." />
        <link rel="canonical" href={appUrl} />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={appUrl} />
        <meta property="og:title" content="Telsys Inc. | Cloud, AI, Communications & Connectivity Solutions" />
        <meta property="og:description" content="Telsys Inc. provides expert-driven solutions in Cloud, AI, Communications, and Connectivity to help businesses innovate faster, grow smarter, and operate with confidence." />
        <meta property="og:image" content={`${appUrl}/og-image.png`} />
        <meta property="og:site_name" content="Telsys Inc." />
        <meta property="og:locale" content="en_US" />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={appUrl} />
        <meta property="twitter:title" content="Telsys Inc. | Cloud, AI, Communications & Connectivity Solutions" />
        <meta property="twitter:description" content="Telsys Inc. provides expert-driven solutions in Cloud, AI, Communications, and Connectivity to help businesses innovate faster, grow smarter, and operate with confidence." />
        <meta property="twitter:image" content={`${appUrl}/og-image.png`} />

        {/* <!-- Icons --> */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="128x128" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="64x64" href="/favicon-64x64.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* <!-- Structured Data (JSON-LD) --> */}
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "Organization",
                            "name": "Telsys Inc.",
                            "url": appUrl,
                            "logo": `${appUrl}/tele.png`,
                            "email": "Info@telsysinc.com",
                            "address": {
                                "@type": "PostalAddress",
                                "streetAddress": "1531 E Bradford Pkwy",
                                "addressLocality": "Springfield",
                                "addressRegion": "MO",
                                "postalCode": "65804",
                                "addressCountry": "US"
                            },
                            "sameAs": [
                                "https://www.facebook.com/share/17t544dvNq/",
                                "https://www.instagram.com/telsysinc?igsh=MXB0dmNjb285cXBnNw==",
                                "https://www.linkedin.com/company/telsysinc"
                            ]
                        },
                        {
                            "@type": "WebSite",
                            "url": appUrl,
                            "name": "Telsys Inc.",
                            "publisher": {
                                "@type": "Organization",
                                "name": "Telsys Inc."
                            },
                            "potentialAction": {
                                "@type": "SearchAction",
                                "target": `${appUrl}/search?q={search_term_string}`,
                                "query-input": "required name=search_term_string"
                            }
                        }
                    ]
                })
            }}
        />
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
