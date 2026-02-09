'use client';

import React, { type MouseEvent } from 'react';
import { motion, useMotionTemplate, useMotionValue, useTransform } from 'framer-motion';
import { Zap, Network, HardDrive, Cpu, Puzzle, LayoutDashboard, FileUp } from 'lucide-react';
import { Card, CardContent } from './ui/card';

// 3D Tilt Card Animation Wrapper
function TiltCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouseMove(event: MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// Enhanced Feature Card with Radial Gradient Hover
function FeatureCard({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`
    radial-gradient(
      600px circle at ${mouseX}px ${mouseY}px,
      rgba(99, 102, 241, 0.08),
      transparent 70%
    )
  `;

  return (
    <Card
      className={`relative h-full border-border/60 bg-card/60 hover:border-primary/50 transition-all duration-300 group overflow-hidden shadow-sm hover:shadow-lg ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background }}
      />
      {children}
    </Card>
  );
}

export function FeatureGrid() {
  return (
    <section id="features" className="py-12 bg-background/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-black mb-2 tracking-tight">Powerful by default.</h2>
          <p className="text-sm text-muted-foreground">Every feature you need for modern server management.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto">

          {/* Performance Card - Wide with animation */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            className="col-span-1 md:col-span-2 md:row-span-2"
          >
            <TiltCard className="h-full">
              <FeatureCard>
                <CardContent className="p-5 h-full flex flex-col relative z-10">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 text-white shadow-lg shadow-black/10 transition-transform group-hover:scale-110 group-hover:rotate-3">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 tracking-tight">High Performance</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                      Built with Rust for maximum speed and minimal resource usage. Optimized for modern CPUs.
                    </p>
                  </div>

                  {/* Performance Visualization */}
                  <div className="mt-auto relative h-40 flex items-center justify-center rounded-lg border border-border bg-muted/30">
                    <div className="relative w-28 h-28 flex items-center justify-center">
                      <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                      <div className="relative w-20 h-20 bg-card border border-primary/30 rounded-xl flex items-center justify-center shadow-lg rotate-45 group-hover:rotate-0 transition-transform duration-500">
                        <Zap className="w-10 h-10 text-primary -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                      </div>
                      {/* Orbiting particles */}
                      <div className="absolute inset-0 animate-[spin_3s_linear_infinite]">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_currentColor]" />
                      </div>
                      <div className="absolute inset-0 animate-[spin_5s_linear_infinite_reverse] opacity-50">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary/60 rounded-full" />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[10px] font-mono text-muted-foreground">
                      <div className="flex gap-1">
                        <span className="text-primary font-bold">RAM</span> <span>~40MB</span>
                      </div>
                      <div className="flex gap-1">
                        <span className="text-green-500 font-bold">INIT</span> <span>&lt;100ms</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </FeatureCard>
            </TiltCard>
          </motion.div>

          {/* Port Forwarding Card - with tunnel animation */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="col-span-1"
          >
            <TiltCard className="h-full">
              <FeatureCard>
                <CardContent className="p-5 h-full flex flex-col relative z-10">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 text-white shadow-lg shadow-black/10 transition-transform group-hover:scale-110 group-hover:rotate-3">
                      <Network className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 tracking-tight">Port Forwarding</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                      Manage SSH tunnels visually. No more complex flags.
                    </p>
                  </div>

                  {/* Tunnel Animation */}
                  <div className="mt-auto h-32 relative flex items-center justify-center bg-muted/30 rounded-lg border border-border">
                    <svg className="w-full h-full p-3" viewBox="0 0 100 140">
                      {/* Nodes */}
                      <circle cx="50" cy="25" r="5" fill="currentColor" className="text-primary animate-pulse drop-shadow-[0_0_8px_currentColor]" />
                      <text x="62" y="29" fill="currentColor" className="text-muted-foreground" fontSize="7" fontFamily="monospace">:3000</text>

                      <circle cx="50" cy="115" r="5" fill="currentColor" className="text-muted-foreground" />
                      <text x="62" y="119" fill="currentColor" className="text-muted-foreground" fontSize="7" fontFamily="monospace">:80</text>

                      {/* Path */}
                      <path d="M 50 25 C 50 70 50 70 50 115" stroke="currentColor" className="text-border" strokeWidth="1.5" fill="none" strokeDasharray="4 4" opacity="0.5" />

                      {/* Moving Packet */}
                      <circle r="3" fill="currentColor" className="text-primary drop-shadow-[0_0_6px_currentColor]">
                        <animateMotion dur="2s" repeatCount="indefinite" path="M 50 25 C 50 70 50 70 50 115" />
                      </circle>
                    </svg>
                  </div>
                </CardContent>
              </FeatureCard>
            </TiltCard>
          </motion.div>

          {/* Dashboard Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="col-span-1"
          >
            <TiltCard className="h-full">
              <FeatureCard>
                <CardContent className="p-5 h-full flex flex-col relative z-10">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center mb-4 text-white shadow-lg shadow-black/10 transition-transform group-hover:scale-110 group-hover:rotate-3">
                      <LayoutDashboard className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 tracking-tight">Dashboard</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                      Monitor server health and sessions in real-time.
                    </p>
                  </div>

                  {/* Activity Graph */}
                  <div className="mt-auto h-24 bg-muted/30 border border-border rounded p-2 flex items-end justify-between gap-1">
                    {[60, 80, 45, 90, 70, 55, 85, 65].map((height, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-primary to-primary/50 rounded-sm"
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{
                          duration: 0.5,
                          delay: i * 0.1,
                          repeat: Infinity,
                          repeatType: "reverse",
                          repeatDelay: 2
                        }}
                      />
                    ))}
                  </div>
                </CardContent>
              </FeatureCard>
            </TiltCard>
          </motion.div>

          {/* Config Import Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="col-span-1"
          >
            <TiltCard className="h-full">
              <FeatureCard>
                <CardContent className="p-5 h-full flex flex-col relative z-10">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4 text-white shadow-lg shadow-black/10 transition-transform group-hover:scale-110 group-hover:rotate-3">
                      <FileUp className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 tracking-tight">Config Import</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                      Seamlessly import .ssh/config and PuTTY sessions.
                    </p>
                  </div>

                  {/* File Import Animation */}
                  <div className="mt-auto h-24 bg-muted/30 border border-border rounded p-3 relative overflow-hidden">
                    <div className="flex items-center justify-center gap-3 h-full">
                      {/* SSH Config File */}
                      <motion.div
                        className="flex flex-col items-center gap-1"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          repeatDelay: 2,
                          delay: 0
                        }}
                      >
                        <div className="w-10 h-12 bg-card border-2 border-primary/30 rounded flex items-center justify-center">
                          <FileUp className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-[7px] font-mono text-muted-foreground">config</span>
                      </motion.div>

                      {/* Arrow */}
                      <motion.div
                        animate={{ x: [0, 4, 0], opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <div className="text-muted-foreground">→</div>
                      </motion.div>

                      {/* PuTTY File */}
                      <motion.div
                        className="flex flex-col items-center gap-1"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          repeatDelay: 2,
                          delay: 0.3
                        }}
                      >
                        <div className="w-10 h-12 bg-card border-2 border-amber-500/30 rounded flex items-center justify-center">
                          <FileUp className="w-5 h-5 text-amber-500" />
                        </div>
                        <span className="text-[7px] font-mono text-muted-foreground">putty</span>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </FeatureCard>
            </TiltCard>
          </motion.div>

          {/* SFTP Card - with file transfer animation */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="col-span-1"
          >
            <TiltCard className="h-full">
              <FeatureCard>
                <CardContent className="p-5 h-full flex flex-col relative z-10">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4 text-white shadow-lg shadow-black/10 transition-transform group-hover:scale-110 group-hover:rotate-3">
                      <HardDrive className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 tracking-tight">SFTP Support</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                      Drag and drop file transfers integrated directly.
                    </p>
                  </div>

                  {/* SFTP Animation */}
                  <div className="mt-auto flex flex-col gap-2 bg-muted/30 border border-border rounded p-3">
                    <div className="flex justify-between items-center">
                      <div className="w-7 h-9 border-2 border-border rounded bg-card shadow-sm" />
                      <div className="h-px flex-1 bg-border mx-2 relative">
                        <motion.div
                          className="absolute top-1/2 -translate-y-1/2 w-3 h-4 bg-primary rounded-sm shadow-[0_0_10px_currentColor]"
                          animate={{
                            left: ["0%", "75%", "0%"],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </div>
                      <div className="w-7 h-9 border-2 border-primary/40 rounded bg-primary/10 shadow-sm" />
                    </div>
                    <div className="flex justify-between text-[8px] font-mono text-muted-foreground font-bold">
                      <span>LOCAL</span>
                      <span>REMOTE</span>
                    </div>
                  </div>
                </CardContent>
              </FeatureCard>
            </TiltCard>
          </motion.div>

          {/* Plugin System Card - wide with orbiting pieces */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="col-span-1 md:col-span-2"
          >
            <TiltCard className="h-full">
              <FeatureCard>
                <CardContent className="p-5 h-full flex flex-col relative z-10">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mb-4 text-white shadow-lg shadow-black/10 transition-transform group-hover:scale-110 group-hover:rotate-3">
                      <Puzzle className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 tracking-tight">Plugin System</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                      Extend functionality with a powerful plugin API. Build your own tools inside the terminal.
                    </p>
                  </div>

                  {/* Plugin Pieces Animation */}
                  <div className="mt-auto h-36 relative bg-muted/30 border border-border rounded flex items-center justify-center overflow-hidden">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      {/* Pulsing rings */}
                      <motion.div
                        className="absolute inset-0 border-2 border-primary/30 rounded-xl"
                        animate={{
                          scale: [1, 1.4, 1],
                          opacity: [0.5, 0, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                      />
                      <motion.div
                        className="absolute inset-0 border-2 border-violet-500/30 rounded-xl"
                        animate={{
                          scale: [1, 1.4, 1],
                          opacity: [0.5, 0, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          delay: 0.5,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                      />

                      {/* Center piece */}
                      <motion.div
                        className="relative w-14 h-14 bg-primary/20 border-2 border-primary/40 rounded-xl flex items-center justify-center shadow-lg"
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <Puzzle size={20} className="text-primary" />
                      </motion.div>

                      {/* Corner sparkles */}
                      {[
                        { top: '10%', left: '10%', delay: 0 },
                        { top: '10%', right: '10%', delay: 0.3 },
                        { bottom: '10%', left: '10%', delay: 0.6 },
                        { bottom: '10%', right: '10%', delay: 0.9 }
                      ].map((pos, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1.5 h-1.5 bg-primary rounded-full"
                          style={pos}
                          animate={{
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 1.5,
                            delay: pos.delay,
                            repeat: Infinity,
                            repeatDelay: 1
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </FeatureCard>
            </TiltCard>
          </motion.div>

          {/* Portable Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="col-span-1"
          >
            <TiltCard className="h-full">
              <FeatureCard>
                <CardContent className="p-5 h-full flex flex-col relative z-10">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-4 text-white shadow-lg shadow-black/10 transition-transform group-hover:scale-110 group-hover:rotate-3">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 tracking-tight">Fully Portable</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                      Single executable. Carry your config anywhere.
                    </p>
                  </div>

                  {/* USB Drive Visual */}
                  <div className="mt-auto h-20 flex items-center justify-center">
                    <div className="relative">
                      <motion.div
                        className="w-32 h-16 border-2 border-border bg-gradient-to-br from-muted to-card rounded-lg shadow-lg flex items-center justify-center"
                        animate={{ y: [0, -4, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        {/* USB Connector */}
                        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-3 h-6 bg-muted border border-border rounded-l" />

                        <div className="flex flex-col items-center gap-1">
                          <Cpu className="w-5 h-5 text-primary" />
                          <span className="font-mono text-[8px] text-muted-foreground font-bold">ZYNC</span>
                        </div>

                        {/* LED */}
                        <div className="absolute right-2 top-2 w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_currentColor]" />
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </FeatureCard>
            </TiltCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
}