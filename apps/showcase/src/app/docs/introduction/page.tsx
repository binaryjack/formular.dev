import React from "react";

export default function IntroductionPage() {
  return (
    <>
      <h1>Formular.dev</h1>
      <p className="lead">
        An advanced, high-performance, schema-first form management and validation engine for modern TypeScript and JavaScript applications.
      </p>

      <p>
        This framework is framework-agnostic, type-safe, and optimized for complex enterprise-grade forms with zero runtime dependencies.
      </p>

      <h2>Key Features</h2>
      <ul>
        <li><strong>Framework Agnostic</strong>: Core business logic and validation run independently of UI frameworks. Works seamlessly with React, Vue, Svelte, Angular, or Vanilla JS.</li>
        <li><strong>Schema-First Design</strong>: Define forms using a declarative, fluent schema builder (similar to Zod) and automatically infer complete TypeScript types.</li>
        <li><strong>Performance-First Architecture</strong>: Features a channel-based event bus that isolates field updates, minimizing dirty checks and maximizing responsiveness (sub-100ms initialization for 100+ fields, ~30ms validation).</li>
        <li><strong>Inversion of Control (IoC)</strong>: Built on a robust Dependency Injection container (<code>ServiceManager</code>), allowing developers to swap or extend core services seamlessly.</li>
        <li><strong>Built-in Localization (i18n)</strong>: Ships with translation assets and localized validators for 6 languages: English, French, Spanish, German, Portuguese, and Italian.</li>
        <li><strong>Country-Specific Validation</strong>: Includes out-of-the-box validation rules for 12+ countries, including specialized format checks like Swiss AHV/social security and US SSN.</li>
      </ul>

      <h2>Installation & Distribution</h2>
      <p>Choose your preferred installation method:</p>

      <h3>Option A: NPM Registry (Recommended)</h3>
      <pre>
        <code className="language-bash">
{`pnpm add @binaryjack/formular.dev
# or
npm install @binaryjack/formular.dev`}
        </code>
      </pre>

      <h3>Option B: Self-Hosted Tarball Archive (v2.4.0 Latest)</h3>
      <p>
        If installing directly from our sovereign deployment appliance:
      </p>
      <pre>
        <code className="language-bash">
{`# Direct install from the self-hosted distribution hub
pnpm add http://192.168.1.10:3000/downloads/formular.dev-latest.tgz
# or with npm
npm install http://192.168.1.10:3000/downloads/formular.dev-latest.tgz`}
        </code>
      </pre>

      <div className="p-4 my-4 rounded-lg bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="text-xs font-mono font-semibold text-white">Direct Download Tarball (.tgz)</div>
          <div className="text-[11px] font-mono text-neutral-400 mt-0.5">SHA-256: 66e0d6a13dd419d6...9a4446</div>
        </div>
        <a
          href="/downloads/formular.dev-latest.tgz"
          download
          className="px-3.5 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors whitespace-nowrap shadow-sm"
        >
          Download v2.4.0 (.tgz)
        </a>
      </div>

      <h2>The "Zero Friction" Two-Step Pattern</h2>
      <p>Regardless of your framework or component library, integration follows a simple two-step process:</p>
      
      <ol>
        <li><strong>Schema Definition:</strong> Define your validation logic using our fluent, chainable API.</li>
        <li><strong>Form Wrapper Context:</strong> Pass the schema to the provider, and use inputs linked strictly by their <code>name</code>.</li>
      </ol>

      <p>Explore the integration paths on the left sidebar to see this in action.</p>
    </>
  );
}
