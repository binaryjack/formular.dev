'use client'

import type { FAField } from '@formular/atomos'
import { FAButton, FAInput, FAPassword } from '@formular/atomos'
import { FormDemo, useFormSubmit } from '../../../components/FormDemo'

const loginFields: FAField[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    value: '',
    required: true,
    validation: {
      required: { value: true, message: 'Email is required' },
      email: { value: true, message: 'Please enter a valid email address' },
      guide: 'Enter your registered email address',
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
      guide: 'Enter your password (minimum 8 characters)',
    },
  },
]

const codeExample = `import { FAProvider, FAInput, FAPassword, FAButton } from '@formular/atomos'

function LoginForm() {
  const handleSubmit = async (data: FAField[]) => {
    // Process login with validated data
    console.log('Login data:', data)
  }

  return (
    <FAProvider fields={loginFields} onSubmit={handleSubmit}>
      <div className="space-y-4">
        <FAInput id="email" />
        <FAPassword id="password" showToggle />

        <FAButton type="submit" variant="primary" className="w-full">
          Sign In
        </FAButton>
      </div>
    </FAProvider>
  )
}`

const configExample = `import { IFieldDescriptor } from 'formular.dev'

const loginFields: IFieldDescriptor[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    value: '',
    required: true,
    validation: {
      required: { value: true, message: 'Email is required' },
      email: { value: true, message: 'Please enter a valid email address' },
      guide: 'Enter your registered email address',
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
      guide: 'Enter your password (minimum 8 characters)',
    },
  },
]`

export function LoginFormExample() {
  return (
    <FormDemo
      formName="login-form"
      title="Login Form"
      description="A simple authentication form demonstrating email validation, password requirements, and real-time field validation with helpful guidance."
      fields={loginFields}
      codeExample={codeExample}
      configExample={configExample}
    >
      <LoginFormFields />
    </FormDemo>
  )
}

function LoginFormFields() {
  const { isSubmitting } = useFormSubmit()
  
  return (
    <div className="space-y-4">
      <FAInput id="email" />
      <FAPassword id="password" showToggle />

      <FAButton
        type="submit"
        variant="primary"
        className="w-full"
        isLoading={isSubmitting}
      >
        Sign In
      </FAButton>
    </div>
  )
}
