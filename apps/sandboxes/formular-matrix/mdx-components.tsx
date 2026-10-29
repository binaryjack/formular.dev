import type { MDXComponents } from 'mdx/types'
import { CodeBlock } from './components/CodeBlock'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold text-white mb-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold text-white mb-4 mt-8">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold text-white mb-3 mt-6">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="ml-4">{children}</li>
    ),
    code: ({ children, className }) => {
      const language = className?.replace('language-', '') || 'typescript'
      const isInline = !className
      
      if (isInline) {
        return (
          <code className="bg-gray-800 text-pink-400 px-1.5 py-0.5 rounded text-sm font-mono">
            {children}
          </code>
        )
      }
      
      return (
        <CodeBlock
          code={String(children).trim()}
          language={language}
        />
      )
    },
    pre: ({ children }) => <>{children}</>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-400 my-4">
        {children}
      </blockquote>
    ),
    a: ({ children, href }) => (
      <a
        href={href}
        className="text-blue-400 hover:text-blue-300 underline"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full divide-y divide-gray-700">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="px-4 py-2 bg-gray-800 text-left text-sm font-semibold text-gray-200">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-2 border-t border-gray-700 text-sm text-gray-300">
        {children}
      </td>
    ),
    ...components,
  }
}
