'use client';

import React from 'react';
import Link from 'next/link';
import { ZyncLogo } from './zync-logo';
import { Github, AlertCircle, MessageSquare } from 'lucide-react';
import { useGitHubData } from '@/hooks/use-github-data';

export function Footer() {
  const { stars } = useGitHubData();

  return (
    <footer className="bg-primary text-primary-foreground py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <ZyncLogo className="w-6 h-6" />
              <span className="text-xl font-bold tracking-tight">Zync</span>
            </Link>
            <p className="text-primary-foreground/70 text-xs leading-relaxed max-w-xs">
              Modern open-source SSH client built for developers who care about speed, security, and design.
            </p>
            <div className="flex flex-col gap-1 text-[10px] font-medium text-yellow-400">
              <span className="flex items-center gap-1">⭐ {stars} GitHub stars</span>
              <span className="flex items-center gap-1">⭐ Open Source</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm">Product</h4>
            <ul className="space-y-2 text-xs text-primary-foreground/80">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/download" className="hover:text-white transition-colors">Download</Link></li>
              <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm">Resources</h4>
            <ul className="space-y-2 text-xs text-primary-foreground/80">
              <li><Link href="https://github.com/gajendraxdev/zync#readme" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Docs</Link></li>
              <li><Link href="https://github.com/gajendraxdev/zync/issues" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm">Connect</h4>
            <ul className="space-y-2 text-xs text-primary-foreground/80">
              <li>
                <Link href="https://github.com/gajendraxdev/zync" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Github size={14} /> GitHub
                </Link>
              </li>
              <li>
                <Link href="https://github.com/gajendraxdev/zync/issues/new" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                  <AlertCircle size={14} /> Report
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-primary-foreground/50">
          <p>© 2026 Zync Project. MIT.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
