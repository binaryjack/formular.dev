import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { DemoSettingsProvider } from '../components/DemoSettings'
import { Navigation } from '../components/Navigation'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Formular Atomos',
    default: 'Formular Atomos - Form Management for React'
  },
  description: 'A powerful form management library integrating Atomos UI with Formular.dev validation',
  keywords: ['react', 'forms', 'validation', 'typescript', 'atomos', 'formular'],
  authors: [{ name: 'BinaryJack' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Formular Atomos',
    title: 'Formular Atomos - Form Management for React',
    description: 'A powerful form management library integrating Atomos UI with Formular.dev validation',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DemoSettingsProvider>
          <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
            <Navigation />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </div>
        </DemoSettingsProvider>
      </body>
    </html>
  )
}
