'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LiveValidationLab } from '../components/home/LiveValidationLab';

export default function Home() {
  const [copiedInstall, setCopiedInstall] = useState(false);

  const handleCopyInstall = () => {
    navigator.clipboard.writeText('pnpm add formular.dev');
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* ── 1. Hero Section ── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 flex flex-col items-center text-center">
        {/* Release / Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.04] bg-white/[0.02] text-xs font-mono text-neutral-300 mb-8 backdrop-blur-sm">
          <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
          <span className="text-neutral-400">Release v2.1</span>
          <span className="text-neutral-600">·</span>
          <span>Zero Runtime Dependencies</span>
          <span className="text-neutral-600">·</span>
          <span className="text-indigo-400">Standard Schema Ready</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 max-w-4xl">
          Reactive Validation at Scale. <br />
          <span className="gradient-text-indigo">
            Bulletproof Forms. Zero Friction.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-sm sm:text-base text-neutral-400 mb-10 leading-relaxed">
          Formular.dev completely decouples business logic from your UI. Define your schema once with TypeScript precision, and run sub-millisecond reactive validation across React, Vue, Svelte, Solid, and headless environments.
        </p>

        {/* CTAs & Install Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mb-10">
          <Link
            href="/playground"
            className="w-full sm:w-auto px-5 py-2.5 rounded text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-500/25 border border-indigo-400/30"
          >
            Launch Playground →
          </Link>
          <a
            href="#live-lab"
            className="w-full sm:w-auto px-5 py-2.5 rounded text-xs font-medium bg-white/[0.03] hover:bg-white/[0.06] text-neutral-200 transition-colors border border-white/[0.04]"
          >
            Explore Live Lab ↓
          </a>
          <Link
            href="/docs/introduction"
            className="w-full sm:w-auto px-5 py-2.5 rounded text-xs font-medium text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            Read Documentation
          </Link>
        </div>

        {/* Installation & Download Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div
            onClick={handleCopyInstall}
            className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-lg border border-white/[0.03] bg-[#0c0e14]/80 text-xs font-mono text-neutral-400 hover:border-indigo-500/30 hover:text-neutral-200 transition-all cursor-pointer shadow-sm group"
            title="Click to copy"
          >
            <span className="text-indigo-400">$</span>
            <span>pnpm add @binaryjack/formular.dev</span>
            <span className="text-[10px] text-neutral-400 group-hover:text-indigo-400 transition-colors">
              {copiedInstall ? '✓ Copied' : 'Copy'}
            </span>
          </div>

          <a
            href="/downloads/formular.dev-latest.tgz"
            download
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-indigo-500/20 bg-indigo-950/20 text-xs font-mono text-indigo-300 hover:bg-indigo-900/30 hover:border-indigo-500/40 transition-all shadow-sm"
          >
            <span>📦</span>
            <span>Download .tgz (v2.4.0)</span>
            <span className="text-[10px] px-1 py-0.2 rounded bg-indigo-500/20 text-indigo-200 font-mono">638 KB</span>
          </a>
        </div>
      </section>

      {/* ── 2. Performance Metrics Bar ── */}
      <section className="w-full border-y border-white/[0.025] bg-[#08090c]/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-white mb-1">&lt; 0.8 ms</span>
            <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Validation Latency</span>
            <span className="text-[11px] text-neutral-400 mt-0.5">Isolated event bus channels</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-white mb-1">0 KB</span>
            <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">External Deps</span>
            <span className="text-[11px] text-neutral-400 mt-0.5">Zero runtime baggage</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-white mb-1">12+</span>
            <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Country Validators</span>
            <span className="text-[11px] text-neutral-400 mt-0.5">Swiss AHV, US SSN, French NIR</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-white mb-1">7+</span>
            <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Environments</span>
            <span className="text-[11px] text-neutral-400 mt-0.5">React, Vue, Svelte, Solid, Node</span>
          </div>
        </div>
      </section>

      {/* ── 3. Live Interactive Validation Lab ── */}
      <LiveValidationLab />

      {/* ── 4. Architectural Foundations (Linear Bento Grid) ── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-20 border-t border-white/[0.025]">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-white/[0.03] bg-white/[0.02] text-xs font-mono text-neutral-400 mb-3">
            ARCHITECTURAL PILLARS
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Built for High-Throughput Enterprise Systems.
          </h2>
          <p className="text-neutral-400 text-sm max-w-2xl mx-auto">
            Engineered from first principles with Dependency Injection, channel-based event propagation, and zero runtime dependencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="card-sovereign p-6 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs font-mono mb-4">
                01
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Channel-Based Event Bus</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Field changes publish strictly to scoped channels. Formular isolates dirty checks so updating one field never triggers recalculations across the entire DOM tree.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.025] flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span>Benchmark</span>
              <span className="text-indigo-400">&lt; 30ms for 100+ fields</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card-sovereign p-6 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs font-mono mb-4">
                02
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Inversion of Control (IoC)</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Powered by a built-in <code className="text-indigo-300">ServiceManager</code> container. Swap validation strategies, register async server oracles, and intercept submission lifecycles with zero monkey-patching.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.025] flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span>Extensibility</span>
              <span className="text-indigo-400">Pluggable Services</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card-sovereign p-6 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs font-mono mb-4">
                03
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Two-Step Ready Adapters</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Using ready adapters like <code className="text-indigo-300">@formular/atomos</code>, integration requires exactly two steps: define your schema, and mount inputs. State synchronization is entirely automatic.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.025] flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span>Productivity</span>
              <span className="text-indigo-400">Zero Boilerplate</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="card-sovereign p-6 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs font-mono mb-4">
                04
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Standard Schema &amp; Zod Interop</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Adheres strictly to the Standard Schema specification. Use fluent <code className="text-indigo-300">f.object()</code> builder with static type inference, or plug existing Zod schemas without refactoring.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.025] flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span>Standard</span>
              <span className="text-indigo-400">100% Type-Safe</span>
            </div>
          </div>

          {/* Card 5 */}
          <div className="card-sovereign p-6 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs font-mono mb-4">
                05
              </div>
              <h3 className="text-base font-semibold text-white mb-2">12+ Sovereign Country Rules</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Built-in localized format validations for Switzerland (AHV/AVS), France (NIR/Sécu), United States (SSN), Germany (Steuer-ID), plus IBAN and global postal checks out of the box.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.025] flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span>Compliance</span>
              <span className="text-indigo-400">Multi-Jurisdiction</span>
            </div>
          </div>

          {/* Card 6 */}
          <div className="card-sovereign p-6 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs font-mono mb-4">
                06
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Prototype-Optimized Engine</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Constructed with optimized prototype inheritance instead of heavy runtime wrappers. Delivers sub-megabyte bundle impact and rapid JIT execution across modern browsers and V8 runtimes.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.025] flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span>Runtime</span>
              <span className="text-indigo-400">Ultra-Light Footprint</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Two Integration Pathways (Linear Style) ── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-20 border-t border-white/[0.025]">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Two Paths, One Uncompromising Engine.
          </h2>
          <p className="text-neutral-400 text-sm max-w-2xl mx-auto">
            Choose between plug-and-play ready adapters for rapid delivery, or low-level headless hooks to adapt custom enterprise component libraries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Path 1: Ready Adapter */}
          <div className="rounded-xl border border-white/[0.03] bg-[#0c0e14] overflow-hidden flex flex-col shadow-xl">
            <div className="p-6 border-b border-white/[0.03]">
              <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-[10px] font-mono uppercase mb-4">
                Path 1: Ready Adapters
              </div>
              <h3 className="text-xl font-bold text-white mb-2">The "Zero Friction" Way</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Using pre-built adapters like <code className="text-indigo-300">@formular/atomos</code>, define the schema once, wrap with <code className="text-indigo-300">&lt;FAProvider&gt;</code>, and drop in inputs. Validation is handled automatically without manual state wiring.
              </p>
            </div>
            <div className="p-6 bg-[#08090c] flex-1">
              <pre className="text-xs text-neutral-300 font-mono overflow-x-auto leading-relaxed">
                <code>{`import { f } from 'formular.dev';
import { FAProvider, FAInput, FAButton } from '@formular/atomos';

const schema = f.object({
  id: f.string().required(),
  firstName: f.string().min(2),
  lastName: f.string().min(2)
});

<FAProvider form={schema} onSubmit={handleSubmit}>
  <FAInput id="id" />
  <FAInput id="firstName" />
  <FAInput id="lastName" />
  <FAButton type="submit">Submit</FAButton>
</FAProvider>`}</code>
              </pre>
            </div>
          </div>

          {/* Path 2: Custom Headless Adapter */}
          <div className="rounded-xl border border-white/[0.03] bg-[#0c0e14] overflow-hidden flex flex-col shadow-xl">
            <div className="p-6 border-b border-white/[0.03]">
              <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-[10px] font-mono uppercase mb-4">
                Path 2: Custom Adapters
              </div>
              <h3 className="text-xl font-bold text-white mb-2">The "Enterprise Headless" Way</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Adapting custom internal component systems or design libraries like shadcn/ui, MUI, or Ant Design? Use our low-level reactive field hooks to map validation state directly to your design tokens.
              </p>
            </div>
            <div className="p-6 bg-[#08090c] flex-1">
              <pre className="text-xs text-neutral-300 font-mono overflow-x-auto leading-relaxed">
                <code>{`// Adapt any custom component library seamlessly
const { value, error, onChange, onBlur } = 
  useFormularField('firstName');

return (
  <ShadcnInput 
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    error={Boolean(error)}
    helperText={error?.message}
  />
);`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Footer ── */}
      <footer className="w-full border-t border-white/[0.025] py-12 px-4 sm:px-6 text-center text-xs text-neutral-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-300">Formular.dev</span>
            <span>·</span>
            <span>Enterprise Reactive Validation Engine</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/playground" className="hover:text-neutral-300 transition-colors">
              Playground
            </Link>
            <Link href="/docs/introduction" className="hover:text-neutral-300 transition-colors">
              Documentation
            </Link>
            <a
              href="https://github.com/binaryjack/formular.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-300 transition-colors"
            >
              GitHub
            </a>
          </div>

          <div>
            <span>© {new Date().getFullYear()} Codernic &amp; BinaryJack. AGPLv3.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
