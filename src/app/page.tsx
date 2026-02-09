
import React from 'react';
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { FeatureGrid } from '@/components/feature-grid';
import { ThemeShowcase } from '@/components/theme-showcase';
import { FAQ } from '@/components/faq';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeatureGrid />
        <ThemeShowcase />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
