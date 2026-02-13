import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Zync SSH Client - Modern Open Source SSH Tool for Developers & DevOps",
    description: 'Zync is a modern open-source SSH client for developers, DevOps engineers, and system administrators. Manage remote servers with a fast and secure',
    openGraph: {
        title: "Zync SSH Client",
        description:
            "Modern open-source SSH client for developers and DevOps. Fast and secure.",
        url: "https://zync.thesudoer.in",
        siteName: "Zync",
        type: "website",
    },
    keywords: [
        "SSH client",
        "open source SSH client",
        "DevOps tools",
        "remote server management",
        "Linux SSH client",
        "terminal emulator",
        "secure shell client"
    ],

    metadataBase: new URL('https://zync.thesudoer.in'),
    alternates: {
        canonical: '/',
    },
};

export default function DownloadLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
