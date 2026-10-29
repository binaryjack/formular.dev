import React from "react";
import Link from "next/link";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row w-full flex-1">
      {/* Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0 border-b md:border-b-0 md:border-r border-white/[0.03] p-6 md:p-8 overflow-y-auto max-h-[calc(100vh-56px)] md:sticky md:top-14">
        <nav className="space-y-6">
          <div>
            <h4 className="font-mono text-xs tracking-wider text-neutral-400 uppercase mb-3">Getting Started</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/docs/introduction" className="text-neutral-300 hover:text-white transition-colors block py-1">
                  Introduction
                </Link>
              </li>
              <li>
                <Link href="/docs/validation" className="text-neutral-300 hover:text-white transition-colors block py-1">
                  Validation Engine
                </Link>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-white/[0.03]">
            <h4 className="font-mono text-xs tracking-wider text-neutral-400 uppercase mb-3">Advanced Validations</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/docs/validation-recipes" className="text-neutral-300 hover:text-white transition-colors block py-1">
                  Recipes & Schema Patterns
                </Link>
              </li>
              <li>
                <Link href="/docs/country-rules" className="text-neutral-300 hover:text-white transition-colors block py-1">
                  Country Rules (AHV, IBAN)
                </Link>
              </li>
              <li>
                <Link href="/docs/async-validation" className="text-neutral-300 hover:text-white transition-colors block py-1">
                  Async & Debounce
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="pt-4 border-t border-white/[0.03]">
            <h4 className="font-mono text-xs tracking-wider text-neutral-400 uppercase mb-3">Architecture & Patterns</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/docs/component-augmentation" className="text-neutral-300 hover:text-white transition-colors block py-1">
                  Component Augmentation
                </Link>
              </li>
              <li>
                <Link href="/docs/multi-step-wizards" className="text-neutral-300 hover:text-white transition-colors block py-1">
                  Multi-Step Wizards
                </Link>
              </li>
              <li>
                <Link href="/docs/ready-adapters" className="text-neutral-300 hover:text-white transition-colors block py-1">
                  Path 1: Ready Adapters
                </Link>
              </li>
              <li>
                <Link href="/docs/custom-adapters" className="text-neutral-300 hover:text-white transition-colors block py-1">
                  Path 2: Custom Adapters
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 lg:p-16 overflow-x-hidden">
        <div className="prose prose-invert prose-indigo max-w-3xl">
          {children}
        </div>
      </main>
    </div>
  );
}
