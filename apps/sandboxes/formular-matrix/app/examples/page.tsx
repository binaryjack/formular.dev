import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Form Examples',
  description: 'Interactive form examples demonstrating Formular Atomos capabilities',
}

export default function ExamplesPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-4">Form Examples</h1>
      <p className="text-lg text-gray-300 mb-8">
        Explore real-world form implementations with live code, validation, and JSON results.
      </p>

      <div className="grid gap-6">
        <ExampleCard
          href="/examples/login"
          title="Login Form"
          description="Simple authentication form with email and password validation"
          features={[
            'Email validation',
            'Password requirements',
            'Real-time feedback',
            'Help text guidance',
          ]}
        />
        <ExampleCard
          href="/examples/registration"
          title="Registration Form"
          description="Complex multi-field form with password confirmation and terms acceptance"
          features={[
            'Custom validators',
            'Cross-field validation',
            'Pattern matching',
            'Toggle component',
          ]}
        />
        <ExampleCard
          href="/examples/checkout"
          title="Checkout Form"
          description="E-commerce checkout with address, payment, and shipping validation"
          features={[
            'Multi-section layout',
            'Select fields',
            'Radio groups',
            'Postal code validation',
          ]}
        />
      </div>
    </div>
  )
}

function ExampleCard({
  href,
  title,
  description,
  features,
}: {
  href: string
  title: string
  description: string
  features: string[]
}) {
  return (
    <Link
      href={href}
      className="block bg-gray-800/50 rounded-lg p-6 hover:bg-gray-800 transition-colors border border-gray-700"
    >
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      <p className="text-gray-300 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {features.map((feature) => (
          <span
            key={feature}
            className="text-xs bg-gray-700 text-gray-200 px-2 py-1 rounded"
          >
            {feature}
          </span>
        ))}
      </div>
    </Link>
  )
}
