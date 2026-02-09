import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Download Zync - SSH Client for macOS, Windows & Linux',
    description: 'Download Zync SSH client for your platform. Available for macOS (Apple Silicon & Intel), Windows 10/11, and Linux (Debian, Arch, Fedora). Free and open source.',
    openGraph: {
        title: 'Download Zync SSH Client',
        description: 'Get Zync for macOS, Windows, or Linux. GPU-accelerated terminal with visual port forwarding.',
    },
};

export default function DownloadLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
