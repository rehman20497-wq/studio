import type { Metadata } from 'next';
import './globals.css';
import MainLayout from '@/components/layout/main-layout';

const appUrl = 'https://telsysinc.com';

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: 'Telsys Inc. | Cloud, AI, Communications & Connectivity Solutions',
    template: '%s | Telsys Inc.',
  },
  description: 'Telsys Inc. delivers expert-driven solutions in Cloud, AI, Communications, and Connectivity. We help businesses in the USA innovate faster, scale smarter, and operate with confidence.',
  keywords: 'Telsys Inc, Cloud Solutions, AI Solutions, Business Communications, Network Connectivity, Technology Partner, IT Services USA, Digital Transformation',
  authors: [{ name: 'Telsys Inc.' }],
  creator: 'Telsys Inc.',
  publisher: 'Telsys Inc.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: 'KXEdky5lxc8xMkxBaH0tsuprp4ngpRJwQ5Ur4FjiCro',
  },
  openGraph: {
    type: 'website',
    title: 'Telsys Inc. | Expert Cloud, AI & Communications Solutions',
    description: 'Transform your business with Telsys Inc. Expert solutions in Cloud, AI, and Connectivity tailored for growth and reliability.',
    siteName: 'Telsys Inc.',
    locale: 'en_US',
    url: appUrl,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Telsys Inc. - Smarter Tech. Better Decisions.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Telsys Inc. | Smarter Tech. Better Decisions.',
    description: 'Expert-driven solutions in Cloud, AI, and Communications to help your business thrive.',
    images: [`${appUrl}/og-image.png`],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180' }
    ]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "Organization",
                            "@id": `${appUrl}/#organization`,
                            "name": "Telsys Inc.",
                            "url": appUrl,
                            "logo": {
                                "@type": "ImageObject",
                                "@id": `${appUrl}/#logo`,
                                "url": `${appUrl}/tele.png`,
                                "contentUrl": `${appUrl}/tele.png`,
                                "width": 160,
                                "height": 40,
                                "caption": "Telsys Inc."
                            },
                            "image": { "@id": `${appUrl}/#logo` },
                            "email": "Info@telsysinc.com",
                            "telephone": "+1-555-123-4567",
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
                            ],
                            "contactPoint": {
                                "@type": "ContactPoint",
                                "telephone": "+1-555-123-4567",
                                "contactType": "customer service",
                                "areaServed": "US",
                                "availableLanguage": "en"
                            }
                        },
                        {
                            "@type": "WebSite",
                            "@id": `${appUrl}/#website`,
                            "url": appUrl,
                            "name": "Telsys Inc.",
                            "description": "Expert Cloud, AI, and Communications solutions.",
                            "publisher": { "@id": `${appUrl}/#organization` },
                            "potentialAction": {
                                "@type": "SearchAction",
                                "target": {
                                    "@type": "EntryPoint",
                                    "urlTemplate": `${appUrl}/blogs?q={search_term_string}`
                                },
                                "query-input": "required name=search_term_string"
                            }
                        }
                    ]
                })
            }}
        />
      </head>
      <body className="font-body antialiased overflow-x-clip">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
