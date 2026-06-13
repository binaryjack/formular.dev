import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "formular.dev",
  description: "Advanced, high-performance, schema-first form management and validation engine.",
  themeConfig: {
    logo: '/logo.svg', // We can add this later if we have one
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/getting-started/quick-start' },
      { text: 'Schema API', link: '/schema-builder/types' }
    ],
    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Installation', link: '/getting-started/installation' },
          { text: 'Quick Start', link: '/getting-started/quick-start' }
        ]
      },
      {
        text: 'Core Concepts',
        items: [
          { text: 'Architecture & Performance', link: '/core-concepts/architecture' },
          { text: 'Inversion of Control', link: '/core-concepts/inversion-of-control' },
          { text: 'Submission Strategies', link: '/core-concepts/submission-strategies' }
        ]
      },
      {
        text: 'Schema Builder',
        items: [
          { text: 'Types', link: '/schema-builder/types' },
          { text: 'Modifiers', link: '/schema-builder/modifiers' },
          { text: 'Country-Specific Validation', link: '/schema-builder/country-validation' },
          { text: 'Presets', link: '/schema-builder/presets' }
        ]
      },
      {
        text: 'Framework Adapters',
        items: [
          { text: 'React', link: '/framework-adapters/react' },
          { text: 'Vue', link: '/framework-adapters/vue' },
          { text: 'Angular', link: '/framework-adapters/angular' },
          { text: 'Svelte', link: '/framework-adapters/svelte' },
          { text: 'SolidJS', link: '/framework-adapters/solidjs' },
          { text: 'Vanilla JS', link: '/framework-adapters/vanilla-js' }
        ]
      },
      {
        text: 'Advanced',
        items: [
          { text: 'Custom Validators', link: '/advanced/custom-validators' },
          { text: 'Localization (i18n)', link: '/advanced/localization' },
          { text: 'Performance Tuning', link: '/advanced/performance-tuning' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/binaryjack/formular.dev' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 Piana Tadeo'
    }
  },
  markdown: {
    config: (md) => {
      // Use markdown-it plugins if necessary
    }
  }
})
