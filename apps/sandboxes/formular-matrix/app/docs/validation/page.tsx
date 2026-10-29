import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Validation Guide',
  description: 'Master validation rules, custom validators, and error handling in Formular Atomos',
}

export default function ValidationPage() {
  return (
    <div className="max-w-4xl mx-auto prose prose-invert">
      <h1>Validation Guide</h1>
      <p className="lead">
        Learn how to implement powerful validation in your forms using Formular Atomos.
      </p>

      <h2>Validation Structure</h2>
      <p>Validation rules can be simple values or objects with custom messages:</p>
      
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
        <code>{`// Simple validation
validation: {
  required: true,
  minLength: 8
}

// With custom messages
validation: {
  required: { value: true, message: 'This field is required' },
  minLength: { value: 8, message: 'Minimum 8 characters' }
}`}</code>
      </pre>

      <h2>Built-in Validators</h2>
      
      <h3>Required Fields</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
        <code>{`validation: {
  required: { value: true, message: 'This field is required' }
}`}</code>
      </pre>

      <h3>Length Validation</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
        <code>{`validation: {
  minLength: { value: 3, message: 'Minimum 3 characters' },
  maxLength: { value: 20, message: 'Maximum 20 characters' }
}`}</code>
      </pre>

      <h3>Email Validation</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
        <code>{`validation: {
  email: { value: true, message: 'Please enter a valid email' }
}`}</code>
      </pre>

      <h3>Pattern Matching</h3>
      <p>Use regex patterns for custom validation:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
        <code>{`validation: {
  pattern: {
    value: '^[a-zA-Z0-9_]+$',
    message: 'Only letters, numbers, and underscores allowed'
  }
}`}</code>
      </pre>

      <h2>Custom Validators</h2>
      <p>Create custom validation logic with access to the current value and all fields:</p>
      
      <h3>Simple Custom Validator</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
        <code>{`validation: {
  custom: (value: unknown) => {
    if (value !== true) {
      return 'You must accept the terms'
    }
    return null
  }
}`}</code>
      </pre>

      <h3>Cross-Field Validation</h3>
      <p>Validate based on other field values:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
        <code>{`{
  name: 'confirmPassword',
  type: 'password',
  validation: {
    custom: (value: unknown, allFields?: FAField[]) => {
      const password = allFields?.find(f => f.name === 'password')?.value
      if (value !== password) {
        return 'Passwords do not match'
      }
      return null
    }
  }
}`}</code>
      </pre>

      <h2>Help Text & Guidance</h2>
      <p>Provide contextual help with the <code>guide</code> property:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
        <code>{`validation: {
  minLength: { value: 8, message: 'Password too short' },
  guide: 'Create a strong password with at least 8 characters'
}`}</code>
      </pre>

      <h2>Validation Patterns</h2>
      
      <h3>Password Strength</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
        <code>{`{
  name: 'password',
  type: 'password',
  validation: {
    required: { value: true, message: 'Password is required' },
    minLength: { value: 8, message: 'Minimum 8 characters' },
    pattern: {
      value: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\\\d).*$',
      message: 'Must include uppercase, lowercase, and number'
    }
  }
}`}</code>
      </pre>

      <h3>Postal Code (US)</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
        <code>{`{
  name: 'postalCode',
  type: 'postal',
  validation: {
    pattern: {
      value: '^[0-9]{5}(-[0-9]{4})?$',
      message: 'Please enter a valid ZIP code'
    }
  }
}`}</code>
      </pre>

      <h2>Best Practices</h2>
      <ul>
        <li><strong>Provide clear error messages</strong>: Tell users exactly what&apos;s wrong</li>
        <li><strong>Use guide text</strong>: Prevent errors with helpful guidance</li>
        <li><strong>Validate progressively</strong>: Start simple, add complexity as needed</li>
        <li><strong>Test edge cases</strong>: Ensure custom validators handle all scenarios</li>
      </ul>

      <h2>Next Steps</h2>
      <ul>
        <li><Link href="/docs/field-configuration">Explore Field Configuration</Link></li>
        <li><Link href="/docs/api-integration">Learn about API Integration</Link></li>
        <li><Link href="/examples/registration">See Validation Examples</Link></li>
      </ul>
    </div>
  )
}
