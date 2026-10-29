import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Field Configuration Guide',
  description: 'Learn how to configure fields using FAField interface in Formular Atomos',
}

export default function FieldConfigPage() {
  return (
    <div className="max-w-4xl mx-auto prose prose-invert">
      <h1>Field Configuration Guide</h1>
      <p className="lead">
        Learn how to configure form fields using the <code>FAField</code> interface in Formular Atomos.
      </p>

      <h2>Basic Field Structure</h2>
      <p>Every field in Formular Atomos follows the <code>FAField</code> interface:</p>
      
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
        <code>{`interface FAField {
  name: string
  label: string
  type: FAFieldType
  value?: unknown
  required?: boolean
  disabled?: boolean
  options?: Array<{ value: string; label: string }>
  validation?: ValidationConfig
}`}</code>
      </pre>

      <h2>Field Types</h2>
      <p>Formular Atomos supports the following field types:</p>
      
      <table className="min-w-full">
        <thead>
          <tr>
            <th>Type</th>
            <th>Description</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><code>text</code></td><td>Single-line text input</td><td>Name, username</td></tr>
          <tr><td><code>email</code></td><td>Email address with validation</td><td>Email field</td></tr>
          <tr><td><code>password</code></td><td>Password input (masked)</td><td>Login password</td></tr>
          <tr><td><code>number</code></td><td>Numeric input</td><td>Age, quantity</td></tr>
          <tr><td><code>date</code></td><td>Date picker</td><td>Birth date</td></tr>
          <tr><td><code>time</code></td><td>Time picker</td><td>Meeting time</td></tr>
          <tr><td><code>textarea</code></td><td>Multi-line text</td><td>Comments</td></tr>
          <tr><td><code>select</code></td><td>Dropdown selection</td><td>Country</td></tr>
          <tr><td><code>radio</code></td><td>Radio button group</td><td>Shipping method</td></tr>
          <tr><td><code>toggle</code></td><td>Boolean toggle</td><td>Terms acceptance</td></tr>
          <tr><td><code>postal</code></td><td>Postal/ZIP code</td><td>Address postal code</td></tr>
        </tbody>
      </table>

      <h2>Simple Field Example</h2>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
        <code>{`const emailField: FAField = {
  name: 'email',
  label: 'Email Address',
  type: 'email',
  value: '',
  required: true,
}`}</code>
      </pre>

      <h2>Fields with Options</h2>
      <p>Select and radio fields require an <code>options</code> array:</p>
      
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
        <code>{`const countryField: FAField = {
  name: 'country',
  label: 'Country',
  type: 'select',
  value: 'US',
  required: true,
  options: [
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'UK', label: 'United Kingdom' },
  ],
}`}</code>
      </pre>

      <h2>Field Validation</h2>
      <p>Add validation rules to provide real-time feedback:</p>
      
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
        <code>{`const passwordField: FAField = {
  name: 'password',
  label: 'Password',
  type: 'password',
  value: '',
  required: true,
  validation: {
    required: { value: true, message: 'Password is required' },
    minLength: { value: 8, message: 'Password must be at least 8 characters' },
    pattern: {
      value: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\\\d).*$',
      message: 'Password must contain uppercase, lowercase, and number'
    },
    guide: 'Create a strong password (min 8 characters)',
  },
}`}</code>
      </pre>

      <h2>Best Practices</h2>
      <ul>
        <li><strong>Always provide clear labels</strong>: Help users understand what information is needed</li>
        <li><strong>Use appropriate field types</strong>: Leverage built-in browser validation</li>
        <li><strong>Add guide text</strong>: Provide helpful hints through <code>validation.guide</code></li>
        <li><strong>Set required fields</strong>: Mark mandatory fields with <code>required: true</code></li>
        <li><strong>Validate early</strong>: Add validation rules during field configuration</li>
      </ul>

      <h2>Next Steps</h2>
      <ul>
        <li><Link href="/docs/validation">Learn about Validation</Link></li>
        <li><Link href="/docs/api-integration">Explore API Integration</Link></li>
        <li><Link href="/examples">See Form Examples</Link></li>
      </ul>
    </div>
  )
}
