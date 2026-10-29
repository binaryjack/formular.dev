'use client'

import { FormInput, FormProvider, FormField, FieldSet, Label } from '@atomos/ui'
import { useState } from 'react'

export default function TestSimplePage() {
  const [fields, setFields] = useState<FormField[]>([
    { name: 'test', label: 'Test', value: '' }
  ])

  const handleChange = (name: string, value: unknown) => {
    console.log('handleChange called', name, value)
    setFields(prev => prev.map(f => 
      f.name === name ? { ...f, value } : f
    ))
  }

  const handleBlur = (name: string) => {
    console.log('handleBlur called', name)
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Simple Test</h1>
        <p className="text-gray-400">Testing the new Glassmorphism UI</p>
      </div>
      
      <FormProvider
        initialFields={fields}
        handleChange={handleChange}
        handleBlur={handleBlur}
        onSubmit={() => {}}
      >
        <FieldSet className="mb-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="test">Test Field</Label>
              <FormInput id="test" placeholder="Type something cool..." />
            </div>
          </div>
        </FieldSet>
        
        <div className="backdrop-blur-md bg-black/40 rounded-xl p-6 border border-white/5">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">State Inspector</h3>
          <pre className="font-mono text-sm text-blue-300 overflow-x-auto">
            {JSON.stringify(fields, null, 2)}
          </pre>
        </div>
      </FormProvider>
    </div>
  )
}
