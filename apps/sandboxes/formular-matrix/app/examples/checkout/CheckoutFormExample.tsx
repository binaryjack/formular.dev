'use client'

import type { FAField } from '@formular/atomos'
import { FAInput, FARadioGroup, FASelect, FASet } from '@formular/atomos'
import { FormDemo } from '../../../components/FormDemo'

const checkoutFields: FAField[] = [
  {
    name: 'fullName',
    label: 'Full Name',
    type: 'text',
    value: '',
    required: true,
    validation: {
      required: { value: true, message: 'Full name is required' },
      minLength: { value: 2, message: 'Please enter your full name' },
      guide: 'Enter your name as it appears on your payment method',
    },
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    value: '',
    required: true,
    validation: {
      required: { value: true, message: 'Email is required' },
      email: { value: true, message: 'Please enter a valid email address' },
      guide: 'Order confirmation will be sent to this email',
    },
  },
  {
    name: 'address',
    label: 'Street Address',
    type: 'text',
    value: '',
    required: true,
    validation: {
      required: { value: true, message: 'Address is required' },
      minLength: { value: 5, message: 'Please enter a complete address' },
      guide: 'Enter your shipping address',
    },
  },
  {
    name: 'city',
    label: 'City',
    type: 'text',
    value: '',
    required: true,
    validation: {
      required: { value: true, message: 'City is required' },
      guide: 'Enter your city name',
    },
  },
  {
    name: 'postalCode',
    label: 'Postal Code',
    type: 'postal',
    value: '',
    required: true,
    validation: {
      required: { value: true, message: 'Postal code is required' },
      pattern: { value: '^[0-9]{5}(-[0-9]{4})?$', message: 'Please enter a valid postal code (e.g., 12345 or 12345-6789)' },
      guide: 'Enter your ZIP or postal code',
    },
  },
  {
    name: 'country',
    label: 'Country',
    type: 'select',
    value: 'US',
    required: true,
    options: [
      { value: 'US', label: 'United States' },
      { value: 'CA', label: 'Canada' },
      { value: 'UK', label: 'United Kingdom' },
      { value: 'FR', label: 'France' },
      { value: 'DE', label: 'Germany' },
    ],
    validation: {
      required: { value: true, message: 'Country is required' },
      guide: 'Select your country',
    },
  },
  {
    name: 'cardNumber',
    label: 'Card Number',
    type: 'text',
    value: '',
    required: true,
    validation: {
      required: { value: true, message: 'Card number is required' },
      pattern: { value: '^[0-9]{16}$', message: 'Please enter a valid 16-digit card number' },
      guide: 'Enter your 16-digit card number',
    },
  },
  {
    name: 'shipping',
    label: 'Shipping Method',
    type: 'radio',
    value: 'standard',
    required: true,
    options: [
      { value: 'standard', label: 'Standard Shipping (5-7 days) - $5.99' },
      { value: 'express', label: 'Express Shipping (2-3 days) - $12.99' },
      { value: 'overnight', label: 'Overnight Shipping (1 day) - $24.99' },
    ],
    validation: {
      required: { value: true, message: 'Please select a shipping method' },
    },
  },
]

const codeExample = `import { FAProvider, FAInput, FASet, FASelect, FARadioGroup } from '@formular/atomos'

function CheckoutForm() {
  const handleSubmit = async (data: FAField[]) => {
    // Process checkout with validated data
    console.log('Checkout data:', data)
  }

  return (
    <FAProvider fields={checkoutFields} onSubmit={handleSubmit}>
      <div className="space-y-6">
        {/* Customer Information */}
        <section>
          <h3>Customer Information</h3>
          <FASet id="fullName">
            <FAInput id="fullName" />
          </FASet>
          <FASet id="email">
            <FAInput id="email" />
          </FASet>
        </section>

        {/* Shipping Address */}
        <section>
          <h3>Shipping Address</h3>
          <FASet id="address">
            <FAInput id="address" />
          </FASet>
          <div className="grid grid-cols-2 gap-4">
            <FASet id="city">
              <FAInput id="city" />
            </FASet>
            <FASet id="postalCode">
              <FAInput id="postalCode" />
            </FASet>
          </div>
          <FASet id="country">
            <FASelect id="country" />
          </FASet>
        </section>

        {/* Payment & Shipping */}
        <section>
          <h3>Payment</h3>
          <FASet id="cardNumber">
            <FAInput id="cardNumber" />
          </FASet>
          <FASet id="shipping">
            <FARadioGroup id="shipping" />
          </FASet>
        </section>

        <button type="submit">Complete Purchase</button>
      </div>
    </FAProvider>
  )
}`

const configExample = `const checkoutFields: FAField[] = [
  {
    name: 'postalCode',
    label: 'Postal Code',
    type: 'postal',
    value: '',
    required: true,
    validation: {
      required: { value: true, message: 'Postal code is required' },
      // Pattern validation for US ZIP codes
      pattern: { 
        value: '^[0-9]{5}(-[0-9]{4})?$', 
        message: 'Please enter a valid postal code (e.g., 12345 or 12345-6789)' 
      },
      guide: 'Enter your ZIP or postal code',
    },
  },
  {
    name: 'country',
    label: 'Country',
    type: 'select',
    value: 'US',
    required: true,
    // Options for select fields
    options: [
      { value: 'US', label: 'United States' },
      { value: 'CA', label: 'Canada' },
      { value: 'UK', label: 'United Kingdom' },
    ],
    validation: {
      required: { value: true, message: 'Country is required' },
    },
  },
  {
    name: 'shipping',
    label: 'Shipping Method',
    type: 'radio',
    value: 'standard',
    required: true,
    // Options for radio group
    options: [
      { value: 'standard', label: 'Standard (5-7 days) - $5.99' },
      { value: 'express', label: 'Express (2-3 days) - $12.99' },
      { value: 'overnight', label: 'Overnight (1 day) - $24.99' },
    ],
  },
]`

export function CheckoutFormExample() {
  return (
    <FormDemo
      formName="checkout-form"
      title="Checkout Form"
      description="A complete e-commerce checkout form demonstrating address validation, select fields, radio groups for shipping options, payment details, and multi-section form organization."
      fields={checkoutFields}
      codeExample={codeExample}
      configExample={configExample}
    >
      <div className="space-y-6">
        {/* Customer Information */}
        <section>
          <h3 className="text-lg font-semibold text-white mb-3">Customer Information</h3>
          <div className="space-y-4">
            <FASet id="fullName">
              <FAInput id="fullName" />
            </FASet>
            <FASet id="email">
              <FAInput id="email" />
            </FASet>
          </div>
        </section>

        {/* Shipping Address */}
        <section>
          <h3 className="text-lg font-semibold text-white mb-3">Shipping Address</h3>
          <div className="space-y-4">
            <FASet id="address">
              <FAInput id="address" />
            </FASet>
            <div className="grid grid-cols-2 gap-4">
              <FASet id="city">
                <FAInput id="city" />
              </FASet>
              <FASet id="postalCode">
                <FAInput id="postalCode" />
              </FASet>
            </div>
            <FASet id="country">
              <FASelect id="country" />
            </FASet>
          </div>
        </section>

        {/* Payment */}
        <section>
          <h3 className="text-lg font-semibold text-white mb-3">Payment Information</h3>
          <div className="space-y-4">
            <FASet id="cardNumber">
              <FAInput id="cardNumber" />
            </FASet>
          </div>
        </section>

        {/* Shipping Method */}
        <section>
          <h3 className="text-lg font-semibold text-white mb-3">Shipping Method</h3>
          <FASet id="shipping">
            <FARadioGroup id="shipping" />
          </FASet>
        </section>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          Complete Purchase
        </button>
      </div>
    </FormDemo>
  )
}
