'use client';

import React from 'react';
import Link from 'next/link';
import { ZyncLogo } from './zync-logo';
import { ThemeToggle } from './theme-toggle';
import { Star, Download } from 'lucide-react';
import { useGitHubData } from '@/hooks/use-github-data';
import { Button } from './ui/button';

export function Navbar() {
  const { stars } = useGitHubData();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/60 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-11 grid grid-cols-3 items-center">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <ZyncLogo className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="text-base font-black tracking-tighter uppercase">Zync</span>
          </Link>
        </div>

        {/* Center: Links - Grid ensures true centering */}
        <div className="hidden md:flex items-center justify-center gap-6">
          <Link href="/" className="text-[10px] font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">Home</Link>
          <Link href="/#features" className="text-[10px] font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">Features</Link>
          <Link href="https://github.com/gajendraxdev/zync" target="_blank" className="text-[10px] font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">Docs</Link>
          <Link href="/#faq" className="text-[10px] font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">FAQ</Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-end gap-1.5">
          <Link href="https://github.com/gajendraxdev/zync" target="_blank">
            <Button variant="outline" size="sm" className="hidden sm:flex gap-1 h-7 text-[9px] px-2 font-bold border-border/60">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{stars}</span>
            </Button>
          </Link>
          <ThemeToggle />
          <Link href="/download">
            <Button size="sm" className="gap-1.5 h-7 text-[9px] px-3 font-black uppercase tracking-tighter bg-primary text-white">
              <Download className="w-3 h-3" />
              <span>Download</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
