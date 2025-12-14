import React, { useState } from 'react'

// Define the shape of our form data
interface IUserForm {
    firstName: string
    lastName: string
    email: string
    age: number
}

/**
 * A basic example component demonstrating how to integrate with the formular.dev.lib
 * This is a simplified version showing the structure needed for integration.
 *
 * To fully integrate with the lib:
 * 1. Import { FormularManager, IFormular } from 'formular.dev.lib' once the build is fixed
 * 2. Use FormularManager to create form instances
 * 3. Connect field components to the formular engine
 */
export const BasicFormExample: React.FC = () => {
    const [formData, setFormData] = useState<IUserForm>({
        firstName: '',
        lastName: '',
        email: '',
        age: 0
    })

    const [errors, setErrors] = useState<Partial<Record<keyof IUserForm, string>>>({})

    const handleInputChange = (field: keyof IUserForm, value: any) => {
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

    const validateField = (field: keyof IUserForm, value: any): string | null => {
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Validate all fields
        const newErrors: Partial<Record<keyof IUserForm, string>> = {}
        let hasErrors = false

        Object.keys(formData).forEach((key) => {
            const field = key as keyof IUserForm
            const error = validateField(field, formData[field])
            if (error) {
                newErrors[field] = error
                hasErrors = true
            }
        })

        setErrors(newErrors)

        if (!hasErrors) {
            console.log('Form submitted successfully:', formData)
            alert('Form submitted successfully! Check console for data.')

            // Reset form
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                age: 0
            })
        }
    }

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                User Registration Form
            </h2>
            <p className="text-sm text-gray-600 mb-4 text-center">
                This form demonstrates the structure for integrating with formular.dev.lib
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
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                >
                    Submit
                </button>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-md">
                <h3 className="text-lg font-medium mb-2 text-gray-800">Current Form State:</h3>
                <pre className="text-sm text-gray-600 overflow-x-auto">
                    {JSON.stringify(formData, null, 2)}
                </pre>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-md">
                <h4 className="text-md font-medium mb-2 text-blue-800">Integration Notes:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                    <li>• The lib package is installed as a workspace dependency</li>
                    <li>• FormularManager and other exports are available for import</li>
                    <li>• Field components can be connected to the formular engine</li>
                    <li>• Validation rules can be defined in the FormularManager</li>
                </ul>
            </div>
        </div>
    )
}

export default BasicFormExample
