'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { motion } from 'framer-motion';
import { Apple, Monitor, Laptop, Copy, Check, Download, Command, Cpu, Zap } from 'lucide-react';
import { useGitHubData } from '@/hooks/use-github-data';
import { useOSDetection } from '@/hooks/use-os-detection';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download Zync - SSH Client for macOS, Windows & Linux',
  description: 'Download Zync SSH client for your platform. Available for macOS (Apple Silicon & Intel), Windows 10/11, and Linux (Debian, Arch, Fedora). Free and open source.',
  openGraph: {
    title: 'Download Zync SSH Client',
    description: 'Get Zync for macOS, Windows, or Linux. GPU-accelerated terminal with visual port forwarding.',
  },
};

export default function DownloadPage() {
  const { latestVersion, assets } = useGitHubData();
  const currentOs = useOSDetection();
  const [copied, setCopied] = useState(false);

  const installCommand = `curl -fsSL https://raw.githubusercontent.com/FDgajju/zync-website/main/public/install.sh | sh`;

  const copyCommand = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const platforms = [
    {
      id: 'macOS',
      name: 'macOS',
      icon: Apple,
      description: 'Built for Apple Silicon',
      subtitle: 'Universal Binary • macOS 11+',
      url: assets.mac,
      badges: [
        { icon: Command, text: 'Universal' },
        { icon: Cpu, text: 'Metal API' }
      ],
      gradient: 'from-slate-500/10 to-slate-500/5'
    },
    {
      id: 'Windows',
      name: 'Windows',
      icon: Monitor,
      description: 'Fluid & Native',
      subtitle: 'Windows 10/11 • x64/ARM64',
      url: assets.win,
      badges: [
        { icon: Zap, text: 'Fast' },
        { icon: Monitor, text: 'Native' }
      ],
      gradient: 'from-blue-500/10 to-blue-500/5'
    },
    {
      id: 'Linux',
      name: 'Linux',
      icon: Laptop,
      description: "The Hacker's Choice",
      subtitle: 'Debian • Arch • Fedora',
      url: assets.linux,
      badges: [
        { icon: Laptop, text: 'Open' },
        { icon: Command, text: 'CLI' }
      ],
      gradient: 'from-primary/10 to-primary/5',
      hasInstallCommand: true
    }
  ];

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full" />
        <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-violet-500/5 blur-[100px] rounded-full" />
      </div>

      <Navbar />


      <main className="flex-grow pt-24 pb-20 px-4 relative z-10">
        <div className="container mx-auto">

          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono font-bold mb-8 tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                System Ready • {latestVersion}
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
                Choose Your
                <br />
                <span className="text-foreground">Interface.</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Native performance on every dimension. Zync is optimized for the metal you run.
              </p>
            </motion.div>
          </div>

          {/* Platform Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {platforms.map((platform, idx) => {
              const isSelected = platform.id === currentOs;
              const Icon = platform.icon;

              return (
                <motion.div
                  key={platform.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1, duration: 0.5 }}
                >
                  <Card
                    className={`relative h-full border transition-all duration-300 hover:shadow-xl group ${isSelected
                      ? 'border-primary ring-2 ring-primary/20 shadow-lg'
                      : 'border-border hover:border-primary/30'
                      }`}
                  >
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${platform.gradient} opacity-50 rounded-lg pointer-events-none`} />

                    {/* Detected Badge */}
                    {isSelected && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                        <Badge className="bg-primary text-primary-foreground font-black text-[9px] px-3 py-0.5 shadow-lg border-none uppercase tracking-wider">
                          DETECTED
                        </Badge>
                      </div>
                    )}

                    <CardContent className="relative p-8 flex flex-col items-center text-center h-full">
                      {/* Icon */}
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${isSelected
                        ? 'bg-primary text-primary-foreground shadow-lg scale-110'
                        : 'bg-muted/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                        }`}>
                        <Icon className="w-8 h-8" />
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold mb-2">{platform.name}</h3>
                      <p className="text-sm text-primary font-semibold mb-1 uppercase tracking-wide">
                        {platform.description}
                      </p>
                      <p className="text-xs text-muted-foreground mb-6 font-mono">
                        {platform.subtitle}
                      </p>

                      {/* Badges */}
                      <div className="flex gap-3 mb-8">
                        {platform.badges.map((badge, i) => {
                          const BadgeIcon = badge.icon;
                          return (
                            <div key={i} className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                              <BadgeIcon size={12} />
                              <span>{badge.text}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Download Button / Install Command */}
                      <div className="mt-auto w-full">
                        {!platform.hasInstallCommand ? (
                          <Button
                            className={`w-full h-12 text-sm font-bold gap-2 ${isSelected ? 'bg-primary text-primary-foreground' : ''
                              }`}
                            size="lg"
                            asChild
                          >
                            <a href={platform.url} className="flex items-center justify-center">
                              <Download size={16} />
                              Download for {platform.name}
                            </a>
                          </Button>
                        ) : (
                          <div>
                            <div className="flex items-center gap-2 mb-3 justify-center text-xs font-black text-muted-foreground uppercase tracking-widest">
                              <Command size={12} />
                              <span>Install via Shell</span>
                            </div>
                            <div className="relative group/cmd">
                              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-violet-500 rounded-lg blur opacity-20 group-hover/cmd:opacity-40 transition-opacity" />
                              <div className="relative bg-zinc-950 dark:bg-zinc-900 border border-border/50 rounded-lg p-3 flex items-center gap-3">
                                <span className="text-primary text-sm font-mono flex-shrink-0">$</span>
                                <div className="flex-1 overflow-x-auto scrollbar-hide">
                                  <div className="text-xs font-mono text-zinc-300 whitespace-nowrap">
                                    <span className="text-primary">curl</span> -fsSL https://raw.githubusercontent.com/FDgajju/zync-website/main/public/install.sh | sh
                                  </div>
                                </div>
                                <button
                                  onClick={copyCommand}
                                  className="flex-shrink-0 text-zinc-500 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded"
                                  title="Copy"
                                >
                                  {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                                </button>
                              </div>
                            </div>
                            <div className="mt-4 text-center">
                              <a
                                href="https://github.com/FDgajju/zync/releases"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-muted-foreground hover:text-primary transition-colors underline underline-offset-4 font-medium"
                              >
                                View all releases on GitHub →
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
