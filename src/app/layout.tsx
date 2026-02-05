import type { Metadata } from 'next';
import './globals.css';
import MainLayout from '@/components/layout/main-layout';

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://telsysinc.com';

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: 'Telsys Inc. | Cloud, AI, Communications & Connectivity Solutions',
    template: '%s | Telsys Inc.',
  },
  description: 'Telsys Inc. provides expert-driven solutions in Cloud, AI, Communications, and Connectivity to help businesses in the USA innovate faster, grow smarter, and operate with confidence.',
  keywords: 'Cloud Solutions, AI, Communications, Connectivity, Technology Partner, Business Growth, IT Services, USA, Telsys Inc.',
  authors: [{ name: 'Telsys Inc.' }],
  verification: {
    google: 'KXEdky5lxc8xMkxBaH0tsuprp4ngpRJwQ5Ur4FjiCro',
  },
  openGraph: {
    type: 'website',
    title: 'Telsys Inc. | Cloud, AI, Communications & Connectivity Solutions',
    description: 'Telsys Inc. provides expert-driven solutions in Cloud, AI, Communications, and Connectivity to help businesses innovate faster, grow smarter, and operate with confidence.',
    siteName: 'Telsys Inc.',
    locale: 'en_US',
    url: appUrl,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Telsys Inc. logo and services banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Telsys Inc. | Cloud, AI, Communications & Connectivity Solutions',
    description: 'Telsys Inc. provides expert-driven solutions in Cloud, AI, Communications, and Connectivity to help businesses innovate faster, grow smarter, and operate with confidence.',
    images: [`${appUrl}/og-image.png`],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-64x64.png', sizes: '64x64', type: 'image/png' },
    ],
    apple: [
        { url: '/apple-touch-icon.png', sizes: '128x128' }
    ]
  },
  manifest: '/site.webmanifest',
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
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
