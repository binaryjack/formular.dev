import Link from 'next/link'

export function Navigation() {
  return (
    <nav className="bg-gray-900 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-white hover:text-gray-300">
            Formular Atomos
          </Link>
          <div className="flex space-x-6">
            <Link href="/examples" className="text-gray-300 hover:text-white transition-colors">
              Examples
            </Link>
            <Link href="/docs" className="text-gray-300 hover:text-white transition-colors">
              Documentation
            </Link>
            <a
              href="https://github.com/binaryjack/formular-atomos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
