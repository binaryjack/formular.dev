// DISCLAMER: it's okay to have any since we are in a demo file !!!! just do not take it in account

import { IEntityScheme, IFormular, IFormularManager, SFormularManager } from 'formular.dev.lib'
import { useState } from 'react'

import { useService } from '@adapters/react'
// Import components from your lib
import { Button } from '@components/button/button'
import FormularForm from '@components/formular-form/formular-form'
import InputText from '@components/input-text/input-text'
// Import preset builder
import { InputTextBuilder } from '@demo/form-demo/field-schema-builder/builders-preset/input-text-builder'

/**
 * Simple demo showcasing a button with input text using the lib and design system
 */
const SimpleButtonInputDemo = () => {
    const { getService } = useService()
    const [submitResult, setSubmitResult] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)

    // Get services from the lib
    const formularManager = getService<IFormularManager>(SFormularManager)

    // Create a simple schema using the preset builder
    const demoSchema: IEntityScheme = {
        name: 'simple-demo-schema',
        properties: [InputTextBuilder.setId(1).setName('userMessage').build()]
    }

    // Create form instance from schema
    const formular = formularManager?.createFromSchema(demoSchema) as IFormular<{
        userMessage: string
    }>

    // Handle form submission
    const handleSubmit = async () => {
        if (!formular) return

        setIsLoading(true)

        try {
            // Get form data - using the fields directly
            const messageField = formular.fields.find((f: any) => f.input.name === 'userMessage')
            const rawValue = messageField?.input?.valueManager?.getValue(messageField)

            // Safely convert to string
            let messageValue = ''
            if (typeof rawValue === 'string') {
                messageValue = rawValue
            } else if (rawValue !== null && rawValue !== undefined) {
                messageValue =
                    typeof rawValue === 'object' ? JSON.stringify(rawValue) : String(rawValue)
            }

            // Simple validation check
            if (!messageValue || messageValue.trim().length === 0) {
                setSubmitResult('❌ Please enter a message')
                setIsLoading(false)
                return
            }

            setSubmitResult(`✅ Success! Message: "${messageValue}"`)

            // Reset form after success
            setTimeout(() => {
                formular.fields.forEach((field: any) => field.input?.clear())
                setSubmitResult('')
            }, 3000)
        } catch (error) {
            console.error('Submit error:', error)
            setSubmitResult('❌ An error occurred while submitting')
        } finally {
            setIsLoading(false)
        }
    }
    const handleClear = () => {
        formular?.fields.forEach((field: any) => field.input?.clear())
        setSubmitResult('')
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200 space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Simple Demo</h1>
                <p className="text-gray-600 text-sm">
                    Button + Input Text using formular.dev.lib & design system
                </p>
            </div>

            {formular && (
                <FormularForm formular={formular}>
                    <div className="space-y-4">
                        {/* Input Text Field */}
                        <div>
                            <InputText fieldName="userMessage" />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 justify-center">
                            <Button
                                id="submit-btn"
                                title="Submit Message"
                                loading={isLoading}
                                disabled={isLoading}
                                onClickCallback={handleSubmit}
                                variantProperties={{
                                    variant: 'primary',
                                    size: 'md',
                                    rounded: true
                                }}
                            >
                                {isLoading ? 'Submitting...' : 'Submit'}
                            </Button>

                            <Button
                                id="clear-btn"
                                title="Clear Form"
                                disabled={isLoading}
                                onClickCallback={handleClear}
                                variantProperties={{
                                    variant: 'secondary',
                                    size: 'md',
                                    rounded: true
                                }}
                            >
                                Clear
                            </Button>
                        </div>

                        {/* Result Display */}
                        {submitResult && (
                            <div
                                className={`mt-4 p-3 rounded-md text-sm font-medium ${
                                    submitResult.includes('✅')
                                        ? 'bg-green-50 text-green-800 border border-green-200'
                                        : 'bg-red-50 text-red-800 border border-red-200'
                                }`}
                            >
                                {submitResult}
                            </div>
                        )}
                    </div>
                </FormularForm>
            )}

            {/* Demo Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-md text-xs text-gray-600">
                <h3 className="font-semibold mb-2">Demo Features:</h3>
                <ul className="space-y-1">
                    <li>• Uses formular.dev.lib for form management</li>
                    <li>• Integrates with existing components</li>
                    <li>• Simple form submission and clearing</li>
                    <li>• Button states (loading, disabled)</li>
                    <li>• Clean Tailwind CSS styling</li>
                </ul>
            </div>
        </div>
    )
}

export default SimpleButtonInputDemo
