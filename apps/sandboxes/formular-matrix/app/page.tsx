import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">
          Formular Atomos
        </h1>
        <p className="text-xl text-gray-300">
          Powerful form management combining Atomos UI with Formular.dev validation
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <FeatureCard
          title="Type-Safe Forms"
          description="Full TypeScript support with strict typing and zero 'any' types"
          icon="🔒"
        />
        <FeatureCard
          title="Real-Time Validation"
          description="Instant feedback with customizable validation rules"
          icon="⚡"
        />
        <FeatureCard
          title="Field-Level Context"
          description="Hooks-based architecture with useFAField for clean component logic"
          icon="🎯"
        />
        <FeatureCard
          title="Extensible Design"
          description="Easy to integrate custom validators and field types"
          icon="🔧"
        />
      </div>

      <div className="bg-gray-800/50 rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Explore Examples</h2>
        <div className="grid gap-4">
          <ExampleLink
            href="/examples/login"
            title="Login Form"
            description="Simple authentication form with email and password validation"
          />
          <ExampleLink
            href="/examples/registration"
            title="Registration Form"
            description="Complex multi-field form with password confirmation and terms acceptance"
          />
          <ExampleLink
            href="/examples/checkout"
            title="Checkout Form"
            description="E-commerce checkout with address, payment, and shipping validation"
          />
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Learn More</h2>
        <div className="grid gap-4">
          <DocLink
            href="/docs/field-configuration"
            title="Field Configuration"
            description="Learn about IFieldDescriptor and field setup options"
          />
          <DocLink
            href="/docs/validation"
            title="Validation Guide"
            description="Master validation rules, custom validators, and error handling"
          />
          <DocLink
            href="/docs/api-integration"
            title="API Integration"
            description="Connect forms to your backend with API-driven configurations"
          />
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="bg-gray-800/50 rounded-lg p-6 hover:bg-gray-800/70 transition-colors">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}

function ExampleLink({ href, title, description }: { href: string; title: string; description: string }) {
  return (
    <Link
      href={href}
      className="block bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors border border-gray-600"
    >
      <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </Link>
  )
}

function DocLink({ href, title, description }: { href: string; title: string; description: string }) {
  return (
    <Link
      href={href}
      className="block bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors border border-gray-600"
    >
      <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </Link>
  )
}
