/**
 * FORMULAR - Check Group Input Component Demo
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 */

import { mainCheckOptions } from '../../../demo-data'
import { CheckGroupInput } from './check-group-input.ui'

export const CheckGroupInputDemo = () => {
    return (
        <div className="check-group-input-demo p-4 space-y-8">
            <h2 className="text-2xl font-bold text-primary">☑️ Check Group Input Component Demo</h2>

            {/* Basic Usage Section */}
            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Basic Usage</h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                    <CheckGroupInput
                        id={'check-group-basic'}
                        options={mainCheckOptions}
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
                            <CheckGroupInput
                                id={'check-group-secondary'}
                                options={mainCheckOptions}
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
                            <CheckGroupInput
                                id={'check-group-success'}
                                options={mainCheckOptions}
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
                            <CheckGroupInput
                                id={'check-group-large'}
                                options={mainCheckOptions}
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
                            <CheckGroupInput
                                id={'check-group-xl'}
                                options={mainCheckOptions}
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
                        <h4 className="text-lg font-medium mb-3 text-primary">Survey Form Style</h4>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                            <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
                                Which features are most important to you?
                            </p>
                            <CheckGroupInput
                                id={'survey-features'}
                                options={mainCheckOptions}
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
                            Settings Panel Style
                        </h4>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                Configure your preferences:
                            </p>
                            <CheckGroupInput
                                id={'settings-preferences'}
                                options={mainCheckOptions}
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
                        <h4 className="text-lg font-medium mb-3 text-primary">
                            Multi-select Filters
                        </h4>
                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                            <p className="text-sm text-green-800 dark:text-green-200 mb-4">
                                Filter results by categories (select multiple):
                            </p>
                            <CheckGroupInput
                                id={'filter-categories'}
                                options={mainCheckOptions}
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
                        <h4 className="text-lg font-medium mb-3 text-primary">
                            Permission Settings
                        </h4>
                        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                            <p className="text-sm text-orange-800 dark:text-orange-200 mb-4">
                                Grant the following permissions:
                            </p>
                            <CheckGroupInput
                                id={'permissions'}
                                options={mainCheckOptions}
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
                            <span>Keyboard navigation support (Tab, Space, Arrow keys)</span>
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
                            <span>High contrast support for better visibility</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-green-600">✓</span>
                            <span>Grouped fieldset with legend for screen readers</span>
                        </li>
                    </ul>

                    <p className="text-xs text-blue-700 dark:text-blue-300">
                        <strong>Try it:</strong> Use Tab to navigate between options, Space to
                        toggle selection, and arrow keys for quick navigation within the group.
                    </p>
                </div>
            </section>
        </div>
    )
}
