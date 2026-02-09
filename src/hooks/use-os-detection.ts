
'use client';

import { useState, useEffect } from 'react';

export type OS = 'Windows' | 'macOS' | 'Linux';

export function useOSDetection() {
  const [os, setOs] = useState<OS>('Windows');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const ua = window.navigator.userAgent;
    const platform = (window.navigator as any).platform || '';
    
    if (ua.includes('Win') || platform.includes('Win')) {
      setOs('Windows');
    } else if (ua.includes('Mac') || platform.includes('Mac')) {
      setOs('macOS');
    } else if (ua.includes('Linux') || platform.includes('Linux')) {
      setOs('Linux');
    }
  }, []);

  // Return Windows as default for SSR/Initial, update on client
  return os;
}
