'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Is Zync really free?",
    a: "Yes. Zync is free and open-source software (MIT License). We believe developer tools should be accessible to everyone. There are no paid subscriptions or locked features."
  },
  {
    q: "Where are my SSH keys and passwords stored?",
    a: "Everything is stored locally on your machine using secure storage. We never sync your credentials to the cloud unless you explicitly use a cloud-synced folder for your data path."
  },
  {
    q: "Does it support ProxyJump / Bastion hosts?",
    a: "Yes! You can configure jump hosts easily in the settings. Zync handles the chaining automatically."
  },
  {
    q: "I'm on Windows. Do I need WSL?",
    a: "No. Zync runs natively on Windows using native terminal emulation. However, it integrates seamlessly with WSL distributions if you prefer that environment."
  },
  {
    q: "How does Portable Mode work?",
    a: "Just copy the Zync executable and create a 'data' folder next to it. Zync will automatically detect it and store all config, logs, and keys there. Perfect for USB sticks."
  },
  {
    q: "Which platforms are supported?",
    a: "Zync provides native binaries for Windows 10/11, macOS (Universal binary for both Intel and Apple Silicon), and major Linux distributions (Debian, Arch, Fedora)."
  },
  {
    q: "Can I import my existing SSH config?",
    a: "Absolutely! Zync can import hosts from your ~/.ssh/config file. You can also import PuTTY sessions on Windows."
  },
  {
    q: "Does it support SFTP file transfers?",
    a: "Yes! Zync includes a built-in SFTP client with drag-and-drop support for easy file transfers between your local machine and remote servers."
  },
  {
    q: "What about port forwarding?",
    a: "Zync features a visual port forwarding manager that makes creating and managing SSH tunnels incredibly easy, with support for both local and remote port forwarding."
  },
  {
    q: "Is there a plugin system?",
    a: "Yes! Zync supports a plugin system that allows you to extend functionality and customize your workflow. Check our GitHub for available plugins."
  }
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-muted-foreground">
            Have something else? Join our Discord or check GitHub.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-xl px-5 bg-card/30 hover:bg-card/50 transition-colors">
              <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
