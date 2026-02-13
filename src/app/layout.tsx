
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { StructuredData } from '@/components/structured-data';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0f172a',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://zync.thesudoer.in'),
  title: {
    default: 'Zync - Modern SSH Client for Developers',
    template: '%s | Zync'
  },
  description: 'Beautiful SSH client with visual tunnel manager, SFTP, and modern terminal. Open source and cross-platform for macOS, Windows, and Linux.',
  applicationName: 'Zync',
  authors: [{ name: 'Zync Team', url: 'https://zync.thesudoer.in' }],
  generator: 'Next.js',
  keywords: ['SSH client', 'terminal', 'SFTP', 'port forwarding', 'developer tools', 'macOS SSH', 'Windows SSH', 'Linux SSH', 'GPU accelerated terminal'],
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zync.thesudoer.in',
    siteName: 'Zync',
    title: 'Zync - The Modern SSH Client',
    description: 'Experience SSH reimagined. GPU-accelerated terminal, visual port forwarding, and seamless file transfer in one beautiful app.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Zync SSH Client Interface',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zync - Modern SSH Client',
    description: 'Beautiful SSH client with visual tunnel manager, SFTP, and modern terminal.',
    creator: '@zync_sh',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary selection:text-white">
        {children}
        <Toaster />

        {/* Structured Data for SEO */}
        <StructuredData />

        {/* Microsoft Clarity */}
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window,document,"clarity","script","ve4q4pf0jj");
          `}
        </Script>
      </body>
    </html>
  );
}
