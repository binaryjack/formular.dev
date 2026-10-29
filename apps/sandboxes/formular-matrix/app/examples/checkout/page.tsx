import type { Metadata } from 'next'
import { CheckoutFormExample } from './CheckoutFormExample'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Checkout Form Example',
  description: 'E-commerce checkout form with address validation, payment details, and shipping options using Formular Atomos',
}

export default function CheckoutPage() {
  return <CheckoutFormExample />
}
