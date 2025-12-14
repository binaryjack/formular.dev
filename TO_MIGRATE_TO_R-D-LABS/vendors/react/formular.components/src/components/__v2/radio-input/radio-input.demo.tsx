/**
 * FORMULAR - Radio Input Component Demo
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 */

import { mainOptions } from '../../../demo-data'
import { RadioInput } from './radio-input.ui'

export const RadioInputDemo = () => {
    return (
        <div className="radio-input-demo p-4 space-y-8">
            <h2 className="text-2xl font-bold text-primary">🔘 Radio Input Component Demo</h2>

            {/* Basic Usage Section */}
            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Basic Usage</h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                    <RadioInput
                        id={'radio-basic'}
                        options={mainOptions}
                        mainLabelVariants={{
                            variant: 'primary',
                            aspect: { size: 'md' },
                            typography: {
                                variant: 'primary',
                                size: 'md',
                                case: 'normal-case'
                            }
                        }}
                        variants={{
                            variant: 'primary',
                            aspect: { size: 'md' },
                            typography: {
                                variant: 'primary',
                                size: 'sm'
                            }
                        }}
                    />
                </div>
            </section>

            {/* Variant Styles Section */}
            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Color Variants</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">Secondary Variant</h4>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <RadioInput
                                id={'radio-secondary'}
                                options={mainOptions}
                                mainLabelVariants={{
                                    variant: 'secondary',
                                    aspect: { size: 'sm' },
                                    typography: {
                                        variant: 'secondary',
                                        size: 'sm',
                                        case: 'uppercase'
                                    }
                                }}
                                variants={{
                                    variant: 'secondary',
                                    aspect: { size: 'sm' },
                                    typography: {
                                        variant: 'secondary',
                                        size: 'xs'
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">Success Variant</h4>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <RadioInput
                                id={'radio-success'}
                                options={mainOptions}
                                mainLabelVariants={{
                                    variant: 'success',
                                    aspect: { size: 'lg' },
                                    typography: {
                                        variant: 'success',
                                        size: 'lg',
                                        case: 'capitalize'
                                    }
                                }}
                                variants={{
                                    variant: 'success',
                                    aspect: { size: 'lg' },
                                    typography: {
                                        variant: 'success',
                                        size: 'md'
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Size Variants Section */}
            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Size Variants</h3>
                <div className="space-y-6">
                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">Large Size</h4>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <RadioInput
                                id={'radio-large'}
                                options={mainOptions}
                                mainLabelVariants={{
                                    variant: 'info',
                                    aspect: { size: 'xl' },
                                    typography: {
                                        variant: 'info',
                                        size: 'xl',
                                        case: 'uppercase'
                                    }
                                }}
                                variants={{
                                    variant: 'info',
                                    aspect: { size: 'xl' },
                                    typography: {
                                        variant: 'info',
                                        size: 'lg'
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">Extra Large Size</h4>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <RadioInput
                                id={'radio-xl'}
                                options={mainOptions}
                                mainLabelVariants={{
                                    variant: 'warning',
                                    aspect: { size: '2xl' },
                                    typography: {
                                        variant: 'warning',
                                        size: '2xl',
                                        case: 'uppercase'
                                    }
                                }}
                                variants={{
                                    variant: 'warning',
                                    aspect: { size: '2xl' },
                                    typography: {
                                        variant: 'warning',
                                        size: 'xl'
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Examples Section */}
            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Interactive Examples</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">
                            Survey Question Style
                        </h4>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                            <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
                                How would you rate your overall experience?
                            </p>
                            <RadioInput
                                id={'survey-rating'}
                                options={mainOptions}
                                mainLabelVariants={{
                                    variant: 'info',
                                    aspect: { size: 'sm' },
                                    typography: {
                                        variant: 'info',
                                        size: 'sm',
                                        case: 'normal-case'
                                    }
                                }}
                                variants={{
                                    variant: 'info',
                                    aspect: { size: 'sm' },
                                    typography: {
                                        variant: 'info',
                                        size: 'xs'
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">
                            Settings Choice Style
                        </h4>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                Select your default theme:
                            </p>
                            <RadioInput
                                id={'settings-theme'}
                                options={mainOptions}
                                mainLabelVariants={{
                                    variant: 'neutral',
                                    aspect: { size: 'md' },
                                    typography: {
                                        variant: 'neutral',
                                        size: 'md',
                                        case: 'normal-case'
                                    }
                                }}
                                variants={{
                                    variant: 'neutral',
                                    aspect: { size: 'md' },
                                    typography: {
                                        variant: 'neutral',
                                        size: 'sm'
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Real-world Use Cases Section */}
            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Real-world Use Cases</h3>
                <div className="space-y-6">
                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">Shipping Options</h4>
                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                            <p className="text-sm text-green-800 dark:text-green-200 mb-4">
                                Choose your shipping method:
                            </p>
                            <RadioInput
                                id={'shipping-method'}
                                options={mainOptions}
                                mainLabelVariants={{
                                    variant: 'success',
                                    aspect: { size: 'sm' },
                                    typography: {
                                        variant: 'success',
                                        size: 'sm',
                                        case: 'capitalize'
                                    }
                                }}
                                variants={{
                                    variant: 'success',
                                    aspect: { size: 'sm' },
                                    typography: {
                                        variant: 'success',
                                        size: 'xs'
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">Payment Method</h4>
                        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                            <p className="text-sm text-orange-800 dark:text-orange-200 mb-4">
                                Select your payment method:
                            </p>
                            <RadioInput
                                id={'payment-method'}
                                options={mainOptions}
                                mainLabelVariants={{
                                    variant: 'warning',
                                    aspect: { size: 'md' },
                                    typography: {
                                        variant: 'warning',
                                        size: 'md',
                                        case: 'normal-case'
                                    }
                                }}
                                variants={{
                                    variant: 'warning',
                                    aspect: { size: 'md' },
                                    typography: {
                                        variant: 'warning',
                                        size: 'sm'
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">
                            Account Type Selection
                        </h4>
                        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                            <p className="text-sm text-purple-800 dark:text-purple-200 mb-4">
                                Choose your account type:
                            </p>
                            <RadioInput
                                id={'account-type'}
                                options={mainOptions}
                                mainLabelVariants={{
                                    variant: 'secondary',
                                    aspect: { size: 'lg' },
                                    typography: {
                                        variant: 'secondary',
                                        size: 'lg',
                                        case: 'capitalize'
                                    }
                                }}
                                variants={{
                                    variant: 'secondary',
                                    aspect: { size: 'lg' },
                                    typography: {
                                        variant: 'secondary',
                                        size: 'md'
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Accessibility Section */}
            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">
                    Accessibility Features
                </h3>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="text-lg font-medium mb-3 text-primary">
                        Built-in Accessibility
                    </h4>
                    <ul className="text-sm space-y-2 mb-4">
                        <li className="flex items-center gap-2">
                            <span className="text-green-600">✓</span>
                            <span>Keyboard navigation support (Tab, Arrow keys, Space)</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-green-600">✓</span>
                            <span>Screen reader compatible with proper ARIA attributes</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-green-600">✓</span>
                            <span>Focus indicators for keyboard navigation</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-green-600">✓</span>
                            <span>Single selection enforced (mutually exclusive)</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-green-600">✓</span>
                            <span>Grouped fieldset with legend for screen readers</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-green-600">✓</span>
                            <span>High contrast support for better visibility</span>
                        </li>
                    </ul>

                    <p className="text-xs text-blue-700 dark:text-blue-300">
                        <strong>Try it:</strong> Use Tab to navigate between options, Arrow keys for
                        selection within group, and Space to select the focused option.
                    </p>
                </div>
            </section>

            {/* Comparison Section */}
            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">
                    Radio vs Checkbox Comparison
                </h3>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <div className="text-sm text-yellow-800 dark:text-yellow-200 space-y-2">
                        <h4 className="font-medium">When to use Radio inputs:</h4>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Single selection from multiple options (mutually exclusive)</li>
                            <li>User must select exactly one option</li>
                            <li>All options are visible and limited in number</li>
                            <li>Examples: Payment method, shipping option, account type</li>
                        </ul>

                        <h4 className="font-medium mt-4">When to use Checkboxes instead:</h4>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Multiple selections allowed</li>
                            <li>Independent choices (not mutually exclusive)</li>
                            <li>Optional selections (can select none)</li>
                            <li>Examples: Features, permissions, preferences</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    )
}
