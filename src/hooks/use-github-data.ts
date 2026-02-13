
'use client';

import { useState, useEffect } from 'react';

interface GitHubData {
  stars: string;
  latestVersion: string;
  assets: {
    win: string;
    mac: string;
    linux: string;
  };
}

export function useGitHubData() {
  const [data, setData] = useState<GitHubData>({
    stars: '0',
    latestVersion: 'v2.0.1',
    assets: {
      win: '#',
      mac: '#',
      linux: '#',
    }
  });

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const repoRes = await fetch('https://api.github.com/repos/gajendraxdev/zync');
        if (!repoRes.ok) throw new Error('Repo fetch failed');
        const repoData = await repoRes.json();

        const stars = repoData.stargazers_count ?? 0;
        const formattedStars = stars > 1000 ? (stars / 1000).toFixed(1) + 'k' : stars.toString();

        const releaseRes = await fetch('https://api.github.com/repos/gajendraxdev/zync/releases/latest');
        if (!releaseRes.ok) throw new Error('Release fetch failed');
        const releaseData = await releaseRes.json();

        const assets = releaseData.assets || [];
        const winAsset = assets.find((a: any) => a.name.endsWith('.exe'))?.browser_download_url || '#';
        const macAsset = assets.find((a: any) => a.name.endsWith('.dmg') || (a.name.endsWith('.zip') && a.name.toLowerCase().includes('mac')))?.browser_download_url || '#';
        const linuxAsset = assets.find((a: any) => a.name.endsWith('.deb') || a.name.endsWith('.rpm') || a.name.endsWith('.AppImage'))?.browser_download_url || '#';

        setData({
          stars: formattedStars,
          latestVersion: releaseData.tag_name || 'v2.0.1',
          assets: {
            win: winAsset,
            mac: macAsset,
            linux: linuxAsset,
          }
        });
      } catch (error) {
        // Fallback or silent fail to prevent app crash
        console.warn('GitHub data fetch failed:', error);
      }
    };

    fetchRepo();
  }, []);

  return data;
}
