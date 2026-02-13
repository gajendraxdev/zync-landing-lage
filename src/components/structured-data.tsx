import Script from 'next/script';

export function StructuredData() {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Zync',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: ['macOS', 'Windows', 'Linux'],
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        description: 'Modern SSH client with GPU-accelerated terminal, visual port forwarding, and SFTP support.',
        screenshot: 'https://zync.thesudoer.in/og-image.png',
        softwareVersion: '2.0.0',
        author: {
            '@type': 'Organization',
            name: 'Zync Team',
            url: 'https://zync.thesudoer.in',
        },
        downloadUrl: 'https://zync.thesudoer.in/download',
        releaseNotes: 'https://github.com/gajendraxdev/zync/releases',
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            ratingCount: '150',
        },
        keywords: 'SSH client, terminal, SFTP, port forwarding, developer tools, macOS, Windows, Linux',
    };

    return (
        <Script
            id="structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}
