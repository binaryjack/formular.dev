import type { Meta, StoryObj } from '@storybook/react'

const WelcomeComponent = () => {
    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    FORMULAR Component Library
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    A comprehensive React component library built on top of the FORMULAR form
                    management system. Explore our components, design patterns, and implementation
                    examples.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">🎨 Design System</h3>
                    <p className="text-blue-700 text-sm">
                        Built with TailwindCSS and a consistent design token system for beautiful,
                        accessible interfaces.
                    </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-900 mb-2">
                        🔧 Form Management
                    </h3>
                    <p className="text-green-700 text-sm">
                        Powerful form components integrated with the FORMULAR library for advanced
                        validation and state management.
                    </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-purple-900 mb-2">♿ Accessibility</h3>
                    <p className="text-purple-700 text-sm">
                        All components follow WCAG guidelines and include proper ARIA attributes for
                        screen reader support.
                    </p>
                </div>
            </div>

            <div className="bg-gray-50 border rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Component Categories</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2">Basic Components</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Button - Interactive buttons with multiple variants</li>
                            <li>• Typography - Flexible text rendering component</li>
                            <li>• Spinner - Loading indicators and progress spinners</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2">Form Components</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• InputText - Text input with validation</li>
                            <li>• Select - Dropdown selection component</li>
                            <li>• Checkbox - Boolean input controls</li>
                            <li>• Radio - Single selection from options</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-900 mb-2">📚 Getting Started</h3>
                <p className="text-yellow-700 text-sm mb-3">
                    Navigate through the sidebar to explore individual components. Each component
                    includes:
                </p>
                <ul className="text-yellow-700 text-sm space-y-1">
                    <li>• Interactive examples with controls</li>
                    <li>• Documentation and API reference</li>
                    <li>• Accessibility information</li>
                    <li>• Usage examples and best practices</li>
                </ul>
            </div>
        </div>
    )
}

const meta: Meta<typeof WelcomeComponent> = {
    title: 'Introduction/Welcome',
    component: WelcomeComponent,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Welcome to the FORMULAR Component Library - your comprehensive guide to building forms and interfaces.'
            }
        }
    },
    tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Welcome: Story = {}
