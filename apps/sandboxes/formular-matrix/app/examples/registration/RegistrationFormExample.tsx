'use client'

import type { FAField } from '@formular/atomos'
import { FAInput, FASet, FAToggle } from '@formular/atomos'
import { FormDemo } from '../../../components/FormDemo'

const registrationFields: FAField[] = [
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    value: '',
    required: true,
    validation: {
      required: { value: true, message: 'Username is required' },
      minLength: { value: 3, message: 'Username must be at least 3 characters' },
      maxLength: { value: 20, message: 'Username must not exceed 20 characters' },
      pattern: { value: '^[a-zA-Z0-9_]+$', message: 'Username can only contain letters, numbers, and underscores' },
      guide: 'Choose a unique username (3-20 characters, letters, numbers, and underscores only)',
    },
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    value: '',
    required: true,
    validation: {
      required: { value: true, message: 'Email is required' },
      email: { value: true, message: 'Please enter a valid email address' },
      guide: 'We\'ll send a verification email to this address',
    },
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    value: '',
    required: true,
    validation: {
      required: { value: true, message: 'Password is required' },
      minLength: { value: 8, message: 'Password must be at least 8 characters' },
      pattern: { 
        value: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$', 
        message: 'Password must contain uppercase, lowercase, and number' 
      },
      guide: 'Create a strong password (min 8 characters with uppercase, lowercase, and number)',
    },
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    value: '',
    required: true,
    validation: {
      required: { value: true, message: 'Please confirm your password' },
      custom: (value: unknown, allFields?: FAField[]) => {
        const password = allFields?.find(f => f.name === 'password')?.value
        if (value !== password) {
          return 'Passwords do not match'
        }
        return null
      },
      guide: 'Re-enter your password to confirm',
    },
  },
  {
    name: 'terms',
    label: 'I agree to the Terms of Service and Privacy Policy',
    type: 'toggle',
    value: false,
    required: true,
    validation: {
      custom: (value: unknown) => {
        if (value !== true) {
          return 'You must accept the terms to continue'
        }
        return null
      },
    },
  },
]

const codeExample = `import { FAProvider, FAInput, FASet, FAToggle } from '@formular/atomos'

function RegistrationForm() {
  const handleSubmit = async (data: FAField[]) => {
    // Process registration with validated data
    console.log('Registration data:', data)
  }

  return (
    <FAProvider fields={registrationFields} onSubmit={handleSubmit}>
      <div className="space-y-4">
        <FASet id="username">
          <FAInput id="username" />
        </FASet>

        <FASet id="email">
          <FAInput id="email" />
        </FASet>

        <FASet id="password">
          <FAInput id="password" />
        </FASet>

        <FASet id="confirmPassword">
          <FAInput id="confirmPassword" />
        </FASet>

        <FASet id="terms">
          <FAToggle id="terms" />
        </FASet>

        <button type="submit" className="btn-primary">
          Create Account
        </button>
      </div>
    </FAProvider>
  )
}`

const configExample = `const registrationFields: FAField[] = [
  {
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
      guide: 'Create a strong password with mixed case and numbers',
    },
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    value: '',
    required: true,
    validation: {
      required: { value: true, message: 'Please confirm your password' },
      // Custom validator with access to all fields
      custom: (value: unknown, allFields?: FAField[]) => {
        const password = allFields?.find(f => f.name === 'password')?.value
        if (value !== password) {
          return 'Passwords do not match'
        }
        return null
      },
      guide: 'Re-enter your password to confirm',
    },
  },
  {
    name: 'terms',
    label: 'I agree to the Terms of Service',
    type: 'toggle',
    value: false,
    required: true,
    validation: {
      custom: (value: unknown) => {
        if (value !== true) {
          return 'You must accept the terms to continue'
        }
        return null
      },
    },
  },
]`

export function RegistrationFormExample() {
  return (
    <FormDemo
      formName="registration-form"
      title="Registration Form"
      description="A comprehensive registration form demonstrating complex validation including password strength, confirmation matching, pattern validation, and custom validators with cross-field dependencies."
      fields={registrationFields}
      codeExample={codeExample}
      configExample={configExample}
    >
      <div className="space-y-4">
        <FASet id="username">
          <FAInput id="username" />
        </FASet>

        <FASet id="email">
          <FAInput id="email" />
        </FASet>

        <FASet id="password">
          <FAInput id="password" />
        </FASet>

        <FASet id="confirmPassword">
          <FAInput id="confirmPassword" />
        </FASet>

        <FASet id="terms">
          <FAToggle id="terms" />
        </FASet>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Create Account
        </button>
      </div>
    </FormDemo>
  )
}
