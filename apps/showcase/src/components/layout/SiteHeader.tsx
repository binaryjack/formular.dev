'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { FormularLogo } from '../../shared/ui/FormularLogo';

const NAV_LINKS = [
  { href: '/#live-lab', label: 'Live Validation Lab' },
  { href: '/playground', label: 'Playground' },
  { href: '/docs/introduction', label: 'Docs' },
  { href: '/docs/ready-adapters', label: 'Adapters' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#08090c]/85 backdrop-blur-md border-b border-white/[0.025]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-7 h-7 rounded-lg border border-white/[0.03] bg-white/[0.02] flex items-center justify-center group-hover:border-indigo-500/30 transition-all">
            <FormularLogo size={22} orientation="horizontal" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-100 tracking-tight text-sm">
              FORMULAR
            </span>
            <span className="text-neutral-600 text-xs">/</span>
            <span className="text-neutral-400 font-medium text-xs tracking-wide">
              DEV
            </span>
          </div>
          <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 ml-1">
            v2.4.0
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isAnchor = link.href.startsWith('/#');
            const isActive = !isAnchor && (pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href)));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded text-xs transition-colors ${
                  isActive
                    ? 'text-neutral-100 bg-white/[0.04] font-medium'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.02]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Header Action Button & GitHub */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/binaryjack/formular.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-200 transition-colors p-1.5"
            aria-label="GitHub Repository"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>

          <Link
            href="/playground"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-sm border border-indigo-500/40"
          >
            <span>Launch Playground</span>
            <span>→</span>
          </Link>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04]"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/[0.045] bg-[#0b0d13]/98 px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map((link) => {
            const isAnchor = link.href.startsWith('/#');
            const isActive = !isAnchor && pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded text-xs transition-colors ${
                  isActive
                    ? 'text-neutral-100 bg-white/[0.06] font-medium'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.03]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
