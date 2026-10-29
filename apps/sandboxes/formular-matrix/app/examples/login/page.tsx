import type { Metadata } from 'next'
import { LoginFormExample } from './LoginFormExample'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Login Form Example',
  description: 'Simple authentication form with email and password validation using Formular Atomos',
}

export default function LoginPage() {
  return <LoginFormExample />
}
