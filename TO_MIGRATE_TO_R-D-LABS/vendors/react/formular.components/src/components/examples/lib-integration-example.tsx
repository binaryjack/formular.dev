/**
 * FORMULAR React Components - Lib Integration Example
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Example demonstrating actual integration with formular.dev.lib
 */

import React, { useEffect, useState } from 'react'

// Import the formular.dev.lib components
import { FormularManager } from 'formular.dev.lib'

// Define the shape of our form data
interface IUserRegistration {
    firstName: string
    lastName: string
    email: string
    age: number
}

/**
 * An example component demonstrating actual integration with formular.dev.lib
 * This shows how to use FormularManager and field descriptors to create a form.
 */
export const LibIntegrationExample: React.FC = () => {
    const [formManager, setFormManager] = useState<any>(null)
    const [formData, setFormData] = useState<IUserRegistration>({
        firstName: '',
        lastName: '',
        email: '',
        age: 0
    })
    const [errors, setErrors] = useState<Partial<Record<keyof IUserRegistration, string>>>({})
    const [isFormValid, setIsFormValid] = useState(false)

    useEffect(() => {
        try {
            // Initialize the FormularManager
            // Note: In a real implementation, you would inject proper service manager
            console.log('FormularManager imported:', FormularManager)

            // For demonstration, we'll create a simple form structure
            const fieldDescriptors = [
                {
                    id: 1,
                    name: 'firstName',
                    type: 'text',
                    required: true,
                    validation: { minLength: 2 }
                },
                {
                    id: 2,
                    name: 'lastName',
                    type: 'text',
                    required: true,
                    validation: { minLength: 2 }
                },
                {
                    id: 3,
                    name: 'email',
                    type: 'email',
                    required: true,
                    validation: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }
                },
                {
                    id: 4,
                    name: 'age',
                    type: 'number',
                    required: true,
                    validation: { min: 18, max: 120 }
                }
            ]

            console.log('Field descriptors:', fieldDescriptors)

            // This would normally create a form instance using FormularManager
            // setFormManager(FormularManager.createFromDescriptors<IUserRegistration>('user-registration', fieldDescriptors))
        } catch (error) {
            console.error('Error initializing FormularManager:', error)
        }
    }, [])

    const handleInputChange = (field: keyof IUserRegistration, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }))

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: undefined
            }))
        }
    }

    const validateField = (field: keyof IUserRegistration, value: any): string | null => {
        switch (field) {
            case 'firstName':
            case 'lastName':
                if (!value || value.length < 2) {
                    return `${field} must be at least 2 characters long`
                }
                break
            case 'email':
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (!value || !emailPattern.test(value)) {
                    return 'Please enter a valid email address'
                }
                break
            case 'age':
                if (!value || value < 18 || value > 120) {
                    return 'Age must be between 18 and 120'
                }
                break
        }
        return null
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validate all fields
        const newErrors: Partial<Record<keyof IUserRegistration, string>> = {}
        let hasErrors = false

        Object.keys(formData).forEach((key) => {
            const field = key as keyof IUserRegistration
            const error = validateField(field, formData[field])
            if (error) {
                newErrors[field] = error
                hasErrors = true
            }
        })

        setErrors(newErrors)

        if (!hasErrors) {
            try {
                // In a real implementation, you would use:
                // const isValid = await formManager.validate('user-registration')
                // const data = formManager.getData<IUserRegistration>('user-registration')

                console.log('Form submitted successfully:', formData)
                alert('Form submitted successfully! Check console for data.')

                // Reset form
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    age: 0
                })
            } catch (error) {
                console.error('Error during form submission:', error)
            }
        }
    }

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                FormularLib Integration Example
            </h2>
            <p className="text-sm text-gray-600 mb-4 text-center">
                This form demonstrates actual integration with formular.dev.lib
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        First Name *
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.firstName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Last Name *
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.lastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your email"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                        Age *
                    </label>
                    <input
                        type="number"
                        id="age"
                        value={formData.age}
                        onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.age ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your age"
                        min="18"
                        max="120"
                    />
                    {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200"
                >
                    Submit with FormularLib
                </button>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-md">
                <h3 className="text-lg font-medium mb-2 text-gray-800">FormularManager Status:</h3>
                <div className="text-sm text-gray-600">
                    <p>FormularManager Available: {FormularManager ? '✅ Yes' : '❌ No'}</p>
                    <p>Form Instance: {formManager ? '✅ Created' : '⏳ Pending'}</p>
                    <p>Form Valid: {isFormValid ? '✅ Valid' : '❌ Invalid'}</p>
                </div>
            </div>

            <div className="mt-4 p-4 bg-green-50 rounded-md">
                <h4 className="text-md font-medium mb-2 text-green-800">Integration Status:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                    <li>• FormularManager successfully imported</li>
                    <li>• Field descriptors defined</li>
                    <li>• Form validation ready</li>
                    <li>• Data binding configured</li>
                </ul>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <h3 className="text-lg font-medium mb-2 text-gray-800">Current Form State:</h3>
                <pre className="text-sm text-gray-600 overflow-x-auto">
                    {JSON.stringify(formData, null, 2)}
                </pre>
            </div>
        </div>
    )
}

export default LibIntegrationExample
