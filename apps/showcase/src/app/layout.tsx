import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '../components/layout/SiteHeader';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Formular | Reactive Schema-First Validation Engine',
  description: 'High-performance, framework-agnostic form management and validation engine for TypeScript. Sub-millisecond reactive validation with zero runtime dependencies.',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-screen flex flex-col bg-[#08090c] text-neutral-300 relative overflow-x-hidden selection:bg-indigo-500/20 selection:text-indigo-200">
        {/* Linear Engineering CAD Grid Background */}
        <div className="fixed inset-0 -z-10 pointer-events-none bg-cad-grid mask-radial-vignette opacity-70" />

        {/* Global Top Navigation Header */}
        <SiteHeader />

        {/* Main Application Container */}
        <main className="flex-1 min-w-0 relative z-10 flex flex-col pt-14">
          {children}
        </main>
      </body>
    </html>
  );
}
