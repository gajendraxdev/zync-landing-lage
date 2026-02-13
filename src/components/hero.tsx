'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Button } from './ui/button';
import {
  ArrowRight,
  Github,
  Terminal as TerminalIcon,
  PanelLeftClose,
  Search,
  ChevronDown,
  Network,
  Settings,
  X,
  Plus,
  Cpu,
  Activity,
  Wifi
} from 'lucide-react';
import { useOSDetection } from '@/hooks/use-os-detection';
import { useGitHubData } from '@/hooks/use-github-data';
import Link from 'next/link';
import Image from 'next/image';

function HostIcon({ src }: { src: string }) {
  return (
    <div className="w-5 h-5 rounded bg-zinc-800 flex items-center justify-center overflow-hidden border border-white/10 shrink-0 p-0.5">
      <Image
        src={`/icons/${src}`}
        alt=""
        width={20}
        height={20}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

export function Hero() {
  const os = useOSDetection();
  const { latestVersion, assets } = useGitHubData();
  const [stats, setStats] = useState({ cpu: 12, mem: 45, net: 2.4 });
  const spotlightRef = useRef<HTMLDivElement>(null);

  // Tilt Effect Hooks
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        cpu: Math.floor(Math.random() * 15) + 5,
        mem: Math.floor(Math.random() * 5) + 40,
        net: parseFloat((Math.random() * 3 + 1).toFixed(1))
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);

    if (spotlightRef.current) {
      spotlightRef.current.style.background = `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.06), transparent 40%)`;
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const getDownloadUrl = () => {
    if (os === 'Windows') return assets.win;
    if (os === 'macOS') return assets.mac;
    return assets.linux;
  };

  return (
    <section className="relative pt-12 pb-10 overflow-hidden">
      <div className="gradient-glow absolute inset-0 pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            {latestVersion} available
          </div>

          <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-2 hero-gradient-text">
            SSH, reimagined
          </h1>
          <p className="text-xl md:text-3xl font-bold text-muted-foreground mb-4">
            for modern devs.
          </p>

          <p className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
            Modern terminal with tabs & search. Visual port forwarding. Truly portable.
            Everything you need in one beautiful interface.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <Link href="/download">
              <Button size="lg" className="h-11 px-8 text-sm group bg-primary hover:bg-primary/90 font-bold">
                Download Zync
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="https://github.com/gajendraxdev/zync" target="_blank">
              <Button variant="outline" size="lg" className="h-11 px-8 text-sm gap-2 font-bold bg-background/50 backdrop-blur-sm border-border/60">
                <Github className="w-4 h-4" />
                Source Code
              </Button>
            </Link>
          </div>

          {/* App Screenshot Mimic with TILT */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ rotateX, rotateY, perspective: 1000 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full max-w-5xl mx-auto relative group"
          >
            {/* Perspective Glow */}
            <div className="absolute -inset-4 bg-primary/10 blur-3xl opacity-0 group-hover:opacity-20 -z-10 rounded-[2rem] transition-opacity duration-700" />

            {/* Window Container */}
            <div className="relative rounded-xl border border-zinc-800 bg-[#09090b] shadow-2xl overflow-hidden aspect-[16/10] flex text-left ring-1 ring-white/5 backdrop-blur-sm">

              {/* Spotlight Overlay */}
              <div ref={spotlightRef} className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300 z-50 mix-blend-soft-light" />

              {/* Sidebar */}
              <div className="hidden md:flex bg-zinc-900/95 backdrop-blur-xl border-r border-zinc-800/50 flex-col h-full shrink-0 z-10 w-64">
                <div className="p-4 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                      <TerminalIcon size={14} className="text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-xs text-zinc-100">Personal</span>
                      <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mt-0.5">Workspace</span>
                    </div>
                  </div>
                  <PanelLeftClose size={14} className="text-zinc-500 hover:text-zinc-100 cursor-pointer" />
                </div>

                <div className="px-3 mb-3">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2 h-3 w-3 text-zinc-500" />
                    <input disabled placeholder="Search..." className="w-full bg-zinc-800/50 rounded-md py-1.5 pl-8 text-[10px] text-zinc-100 placeholder-zinc-600 focus:outline-none" />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-2 space-y-4">
                  <div>
                    <div className="px-2 mb-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-zinc-500">
                        <ChevronDown size={10} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Active</span>
                      </div>
                      <span className="text-[9px] font-bold text-primary bg-primary/10 px-1.5 rounded-full">1</span>
                    </div>
                    <div className="px-2 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 relative overflow-hidden flex items-center gap-2.5">
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary" />
                      <HostIcon src="ubuntu.png" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-zinc-100">Production</div>
                        <div className="text-[10px] text-zinc-500 truncate">root@54.23.11.90</div>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    </div>
                  </div>

                  <div>
                    <div className="px-2 mb-1.5">
                      <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">All Hosts</span>
                    </div>
                    <div className="space-y-0.5">
                      {[
                        { name: 'Local Terminal', sub: 'local shell', icon: 'macos.png' },
                        { name: 'Builder', sub: 'builder@arch', icon: 'arch.png' },
                        { name: 'Prod DB', sub: 'postgres@db-01', icon: 'postgresql.png' },
                        { name: 'Debian Stable', sub: 'admin@core-s1', icon: 'debian.png' },
                        { name: 'Load Balancer', sub: 'nginx@lb-edge-01', icon: 'nginx.png' }
                      ].map((h, i) => (
                        <div key={i} className="px-2 py-1.5 rounded-lg hover:bg-zinc-800/50 flex items-center gap-2.5 text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer">
                          <HostIcon src={h.icon} />
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-medium">{h.name}</span>
                            <span className="text-[10px] opacity-60 truncate">{h.sub}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-3 border-t border-zinc-800/50 mt-auto">
                  <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer group">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                      <Settings size={14} className="text-zinc-500 group-hover:text-zinc-100" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-zinc-100">Settings</span>
                      <span className="text-[9px] text-zinc-500">v{latestVersion}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 flex flex-col bg-[#09090b] relative overflow-hidden">
                <div className="h-10 flex items-center px-4 border-b border-zinc-800">
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 rounded-md border border-zinc-800 pr-8 relative">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[10px] font-bold text-zinc-100">root@production</span>
                      <X size={10} className="absolute right-2 text-zinc-500 cursor-pointer hover:text-zinc-100" />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 hover:bg-zinc-900 rounded-md text-zinc-500 hover:text-zinc-100 transition-colors cursor-pointer">
                      <span className="text-[10px] font-medium">Local Terminal</span>
                    </div>
                    <Plus size={12} className="text-zinc-500 ml-2 cursor-pointer hover:text-zinc-100" />
                  </div>
                </div>

                <div className="flex-1 p-6 font-mono text-xs leading-relaxed text-zinc-100 overflow-hidden relative">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-emerald-500">➜</span>
                    <span className="text-primary font-bold">root@production</span>
                    <span className="text-zinc-500">~</span>
                  </div>

                  <div className="bg-primary/5 border border-primary/10 rounded-lg p-3 mb-4 max-w-md flex gap-3">
                    <span className="text-primary font-bold">i</span>
                    <div>
                      <div className="font-bold text-primary text-[10px]">System Update Available</div>
                      <div className="opacity-60 text-[10px]">Security patch ready. Run <span className="bg-primary/20 px-1 rounded">apt upgrade</span> to install.</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-emerald-500">➜</span>
                    <span className="text-primary font-bold">root@production</span>
                    <span className="text-zinc-100">docker ps</span>
                  </div>

                  <div className="text-zinc-400 text-[10px] mb-4 overflow-x-auto whitespace-pre pb-1">
                    {`CONTAINER ID   IMAGE          STATUS         PORTS                    NAMES
8f3d2a1b4c5e   postgres:14    Up 2 days      0.0.0.0:5432->5432/tcp   db_prod
9e8d7c6b5a4f   redis:7        Up 2 days      6379/tcp                 cache_prod
1a2b3c4d5e6f   nginx:latest   Up 2 days      0.0.0.0:80->80/tcp       web_proxy`}
                  </div>

                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-emerald-500">➜</span>
                    <span className="text-primary font-bold">root@production</span>
                    <span className="text-zinc-100">htop</span>
                  </div>

                  <div className="bg-zinc-900/50 rounded p-2 text-[9px] font-mono leading-tight border border-zinc-800 max-w-lg">
                    <div className="flex justify-between mb-1">
                      <span>CPU [||||||||||||||||    {stats.cpu}%]</span>
                      <span>Tasks: 42, 19 thr; 1 running</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Mem [||||||||||          {stats.mem}%]</span>
                      <span>Uptime: 14 days, 03:22:11</span>
                    </div>
                  </div>
                </div>

                {/* Status Bar */}
                <div className="h-6 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between px-3 text-[9px] font-bold text-zinc-500 tracking-wider uppercase">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-emerald-500">
                      <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                      Connected
                    </div>
                    <span>54.23.11.90</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5"><Cpu size={10} /> {stats.cpu}%</div>
                    <div className="flex items-center gap-1.5"><Activity size={10} /> {stats.mem}%</div>
                    <div className="flex items-center gap-1.5"><Wifi size={10} /> {stats.net} MB/s</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
