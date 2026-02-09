'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const themes = [
    {
        id: 'dark',
        name: 'Standard',
        bg: '#09090b',
        fg: '#e4e4e7',
        accent: '#6366f1',
        keyword: '#c678dd',
        string: '#98c379',
        func: '#61afef'
    },
    {
        id: 'dracula',
        name: 'Dracula',
        bg: '#282a36',
        fg: '#f8f8f2',
        accent: '#ff79c6',
        keyword: '#ff79c6',
        string: '#f1fa8c',
        func: '#8be9fd'
    },
    {
        id: 'nord',
        name: 'Nord',
        bg: '#2e3440',
        fg: '#d8dee9',
        accent: '#88c0d0',
        keyword: '#81a1c1',
        string: '#a3be8c',
        func: '#88c0d0'
    },
    {
        id: 'monokai',
        name: 'Monokai',
        bg: '#272822',
        fg: '#f8f8f2',
        accent: '#a6e22e',
        keyword: '#f92672',
        string: '#e6db74',
        func: '#66d9ef'
    }
];

export function ThemeShowcase() {
    const [activeTheme, setActiveTheme] = useState(themes[0]);

    return (
        <section id="themes" className="py-20 px-4 bg-background/50">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
                        Yours, truly.
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Themes that sync across all your devices.
                    </p>

                    {/* Theme Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mt-8">
                        {themes.map(theme => (
                            <button
                                key={theme.id}
                                onClick={() => setActiveTheme(theme)}
                                className="relative px-5 py-2.5 rounded-full text-sm font-medium transition-all"
                            >
                                {activeTheme.id === theme.id && (
                                    <motion.div
                                        layoutId="activeTheme"
                                        className="absolute inset-0 bg-primary/20 border border-primary/30 rounded-full"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className={`relative z-10 ${activeTheme.id === theme.id ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>
                                    {theme.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Terminal Preview Window */}
                <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-b from-primary/10 to-transparent blur-3xl opacity-50 -z-10 rounded-2xl" />

                    <motion.div
                        className="relative rounded-xl shadow-2xl overflow-hidden border"
                        animate={{
                            backgroundColor: activeTheme.bg,
                            borderColor: 'rgba(255,255,255,0.1)'
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* macOS Title Bar */}
                        <div
                            className="h-10 flex items-center px-4 gap-2 border-b"
                            style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                        >
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                        </div>

                        {/* Terminal Content */}
                        <div
                            className="p-8 font-mono text-sm leading-relaxed min-h-[280px]"
                            style={{ color: activeTheme.fg }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTheme.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {/* Command Line */}
                                    <div className="mb-4">
                                        <span style={{ color: activeTheme.accent }}>➜</span>{' '}
                                        <span className="opacity-60">~</span>{' '}
                                        <span style={{ color: activeTheme.func }}>nvim</span> config.json
                                    </div>

                                    {/* Code Content */}
                                    <div className="pl-0 space-y-1">
                                        <div>
                                            <span className="opacity-40">1</span>{' '}
                                            <span style={{ color: activeTheme.keyword }}>{'{'}</span>
                                        </div>
                                        <div>
                                            <span className="opacity-40">2</span>{' '}
                                            &nbsp;&nbsp;<span style={{ color: activeTheme.keyword }}>"app_name"</span>: <span style={{ color: activeTheme.string }}>"Zync"</span>,
                                        </div>
                                        <div>
                                            <span className="opacity-40">3</span>{' '}
                                            &nbsp;&nbsp;<span style={{ color: activeTheme.keyword }}>"version"</span>: <span style={{ color: activeTheme.accent }}>1.3.0</span>,
                                        </div>
                                        <div>
                                            <span className="opacity-40">4</span>{' '}
                                            &nbsp;&nbsp;<span style={{ color: activeTheme.keyword }}>"theme"</span>: <span style={{ color: activeTheme.string }}>"{activeTheme.name}"</span>
                                            <span className="animate-pulse">_</span>
                                        </div>
                                        <div>
                                            <span className="opacity-40">5</span>{' '}
                                            <span style={{ color: activeTheme.keyword }}>{'}'}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
