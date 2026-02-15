import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Download Zync SSH Client for macOS, Windows & Linux',

    description:
        'Download Zync, the modern open-source SSH client for developers and DevOps engineers. Manage remote servers securely on macOS, Windows, and Linux.',

    metadataBase: new URL('https://zync.thesudoer.in'),

    alternates: {
        canonical: '/download',
    },

    openGraph: {
        title: 'Download Zync SSH Client',
        description:
            'Modern open-source SSH client for developers and DevOps. Fast, secure, and cross-platform.',
        url: 'https://zync.thesudoer.in/download',
        siteName: 'Zync',
        type: 'website',
        images: [
            {
                url: 'https://zync.thesudoer.in/og-image2.png',
                width: 1200,
                height: 630,
            },
        ],
    },

    keywords: [
        'SSH client download',
        'open source SSH client',
        'DevOps tools',
        'remote server management',
        'Linux SSH client',
        'terminal emulator',
        'secure shell client'
    ],
};

export default function DownloadLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
