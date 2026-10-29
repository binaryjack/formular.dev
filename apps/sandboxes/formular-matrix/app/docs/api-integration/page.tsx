import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'API Integration Guide',
  description: 'Learn how to connect forms to your backend with API-driven configurations in Formular Atomos',
}

export default function APIIntegrationPage() {
  return (
    <div className="max-w-4xl mx-auto prose prose-invert">
      <h1>API Integration Guide</h1>
      <p className="lead">
        Learn how to integrate Formular Atomos with your backend APIs for dynamic form generation and data submission.
      </p>

      <h2>API-Driven Form Configuration</h2>
      <p>Load field configurations from your API instead of hardcoding them:</p>
      
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
        <code>{`'use client'

import { useEffect, useState } from 'react'
import { FAProvider, FAInput, FASet } from '@formular/atomos'

function DynamicForm() {
  const [fields, setFields] = useState<FAField[]>([])

  useEffect(() => {
    async function loadFields() {
      const response = await fetch('/api/form-config')
      const data = await response.json()
      setFields(data.fields)
    }
    loadFields()
  }, [])

  return (
    <FAProvider fields={fields} onSubmit={handleSubmit}>
      {fields.map(field => (
        <FASet key={field.name} id={field.name}>
          <FAInput id={field.name} />
        </FASet>
      ))}
    </FAProvider>
  )
}`}</code>
      </pre>

      <h2>API Response Format</h2>
      <p>Your API should return field configurations in the FAField format:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
        <code>{`{
  "fields": [
    {
      "name": "email",
      "label": "Email Address",
      "type": "email",
      "value": "",
      "required": true,
      "validation": {
        "required": { "value": true, "message": "Email is required" },
        "email": { "value": true, "message": "Invalid email" }
      }
    }
  ]
}`}</code>
      </pre>

      <h2>Submitting Form Data</h2>
      <p>Handle form submission with API calls:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
        <code>{`async function handleSubmit(data: FAField[]) {
  // Transform FAField[] to your API format
  const payload = data.reduce((acc, field) => {
    acc[field.name] = field.value
    return acc
  }, {} as Record<string, unknown>)

  const response = await fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const result = await response.json()
  console.log('Success:', result)
}`}</code>
      </pre>

      <h2>Dynamic Field Updates</h2>
      <p>Update field configurations based on user selections:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
        <code>{`function DynamicFieldForm() {
  const [fields, setFields] = useState<FAField[]>(initialFields)

  const handleCountryChange = async (country: string) => {
    const response = await fetch(\`/api/fields?country=\${country}\`)
    const data = await response.json()
    
    setFields(prevFields => 
      prevFields.map(field => 
        field.name === 'state' ? data.stateField : field
      )
    )
  }

  return <FAProvider fields={fields} onSubmit={handleSubmit} />
}`}</code>
      </pre>

      <h2>Loading States</h2>
      <p>Provide feedback during API operations:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
        <code>{`function FormWithLoading() {
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (data: FAField[]) => {
    setSubmitting(true)
    try {
      await fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify(transformData(data)),
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <FAProvider fields={fields} onSubmit={handleSubmit}>
      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
    </FAProvider>
  )
}`}</code>
      </pre>

      <h2>Best Practices</h2>
      <ul>
        <li><strong>Cache field configurations</strong>: Reduce API calls for static forms</li>
        <li><strong>Handle errors gracefully</strong>: Provide clear feedback on API failures</li>
        <li><strong>Validate on both sides</strong>: Client-side for UX, server-side for security</li>
        <li><strong>Use TypeScript</strong>: Ensure type safety between frontend and backend</li>
        <li><strong>Show loading states</strong>: Keep users informed during async operations</li>
      </ul>

      <h2>Next Steps</h2>
      <ul>
        <li><Link href="/docs/field-configuration">Learn about Field Configuration</Link></li>
        <li><Link href="/docs/validation">Master Validation Rules</Link></li>
        <li><Link href="/examples">Explore Form Examples</Link></li>
      </ul>
    </div>
  )
}
