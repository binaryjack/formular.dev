'use client'

import { useEffect, useState } from 'react'
import { codeToHtml } from 'shiki'

interface CodeBlockProps {
  code: string
  language: string
  title?: string
}

export function CodeBlock({ code, language, title }: CodeBlockProps) {
  const [html, setHtml] = useState('')

  useEffect(() => {
    async function highlight() {
      const result = await codeToHtml(code, {
        lang: language,
        theme: 'github-dark',
      })
      setHtml(result)
    }
    highlight()
  }, [code, language])

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
      {title && (
        <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
          <span className="text-sm font-medium text-gray-300">{title}</span>
        </div>
      )}
      <div
        className="overflow-x-auto p-4 text-sm"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
