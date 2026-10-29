'use client'

import { JsonView, defaultStyles } from 'react-json-view-lite'
import 'react-json-view-lite/dist/index.css'

interface JsonDisplayProps {
  data: unknown
  title?: string
}

export function JsonDisplay({ data, title }: JsonDisplayProps) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
      {title && (
        <div className="bg-gray-700 px-4 py-2 border-b border-gray-600">
          <span className="text-sm font-medium text-white">{title}</span>
        </div>
      )}
      <div className="p-4 overflow-x-auto bg-gray-850 text-white json-view-white">
        <JsonView
          data={data as object | unknown[]}
          shouldExpandNode={(level) => level < 2}
          style={{
            ...defaultStyles,
            container: 'font-mono text-sm',
            basicChildStyle: 'padding-left: 1rem',
          }}
        />
      </div>
    </div>
  )
}
