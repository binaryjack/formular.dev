import type { Metadata } from 'next'
import { RegistrationFormExample } from './RegistrationFormExample'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Registration Form Example',
  description: 'Complex multi-field registration form with password confirmation, terms acceptance, and custom validation using Formular Atomos',
}

export default function RegistrationPage() {
  return <RegistrationFormExample />
}
