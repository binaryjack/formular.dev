import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Complete documentation for Formular Atomos form management library',
}

export default function DocsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-4">Documentation</h1>
      <p className="text-lg text-gray-300 mb-8">
        Everything you need to build powerful forms with Formular Atomos.
      </p>

      <div className="grid gap-6">
        <DocCard
          href="/docs/field-configuration"
          title="Field Configuration"
          description="Learn about FAField interface, field types, options, and state management."
          topics={[
            'Field types (text, email, password, etc.)',
            'Options for select and radio fields',
            'Required and disabled states',
            'Best practices',
          ]}
        />
        <DocCard
          href="/docs/validation"
          title="Validation Guide"
          description="Master validation rules, custom validators, and error handling strategies."
          topics={[
            'Built-in validators (required, minLength, pattern)',
            'Custom validation functions',
            'Cross-field validation',
            'Help text and guidance',
          ]}
        />
        <DocCard
          href="/docs/api-integration"
          title="API Integration"
          description="Connect forms to your backend with API-driven configurations and submissions."
          topics={[
            'Dynamic form loading from APIs',
            'Form data submission',
            'Server-side validation integration',
            'Multi-step forms',
          ]}
        />
      </div>

      <div className="mt-12 bg-gray-800/50 rounded-lg p-8 border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4">Quick Start</h2>
        <p className="text-gray-300 mb-4">
          Get started with a basic form in under 5 minutes:
        </p>
        <ol className="list-decimal list-inside text-gray-300 space-y-2 mb-6">
          <li>Install the package: <code className="bg-gray-700 px-2 py-1 rounded text-sm">pnpm add @formular/atomos</code></li>
          <li>Define your fields using the FAField interface</li>
          <li>Wrap your form with FAProvider</li>
          <li>Use FASet and field components</li>
          <li>Handle submission with onSubmit callback</li>
        </ol>
        <Link
          href="/examples/login"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          View Login Example
        </Link>
      </div>
    </div>
  )
}

function DocCard({
  href,
  title,
  description,
  topics,
}: {
  href: string
  title: string
  description: string
  topics: string[]
}) {
  return (
    <Link
      href={href}
      className="block bg-gray-800/50 rounded-lg p-6 hover:bg-gray-800 transition-colors border border-gray-700"
    >
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      <p className="text-gray-300 mb-4">{description}</p>
      <ul className="space-y-1">
        {topics.map((topic) => (
          <li key={topic} className="text-sm text-gray-400 flex items-start">
            <span className="text-blue-400 mr-2">→</span>
            {topic}
          </li>
        ))}
      </ul>
    </Link>
  )
}
