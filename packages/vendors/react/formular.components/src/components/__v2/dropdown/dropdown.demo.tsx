/**
 * FORMULAR - Dropdown Component Demo
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 */

import { mainOptions } from '../../../demo-data'
import { DropdownUI } from './dropdown.ui'

export const DropdownDemo = () => {
    return (
        <div className="dropdown-demo p-4 space-y-8">
            <h2 className="text-2xl font-bold text-primary"> Dropdown Component Demo</h2>

            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Basic Usage</h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                    <div className="max-w-md">
                        <DropdownUI
                            id="dropdown-basic"
                            label="Choose an option"
                            options={mainOptions}
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
                </div>
            </section>

            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Color Variants</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">Secondary Variant</h4>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <div className="max-w-md">
                                <DropdownUI
                                    id="dropdown-secondary"
                                    label="Secondary dropdown"
                                    options={mainOptions}
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
                    </div>

                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">Success Variant</h4>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <div className="max-w-md">
                                <DropdownUI
                                    id="dropdown-success"
                                    label="Success dropdown"
                                    options={mainOptions}
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
                </div>
            </section>

            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Size Variants</h3>
                <div className="space-y-6">
                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">Large Size</h4>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <div className="max-w-lg">
                                <DropdownUI
                                    id="dropdown-large"
                                    label="Large dropdown"
                                    options={mainOptions}
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
                    </div>

                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">Extra Small Size</h4>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <div className="max-w-sm">
                                <DropdownUI
                                    id="dropdown-xs"
                                    label="Extra small dropdown"
                                    options={mainOptions}
                                    variants={{
                                        variant: 'neutral',
                                        aspect: { size: 'xs' },
                                        typography: {
                                            variant: 'neutral',
                                            size: '2xs'
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Interactive Examples</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">Form Selection</h4>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                            <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
                                Select your preferred category:
                            </p>
                            <div className="max-w-md">
                                <DropdownUI
                                    id="form-category"
                                    label="Category"
                                    options={mainOptions}
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
                    </div>

                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">Settings Selector</h4>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                Choose your language preference:
                            </p>
                            <div className="max-w-md">
                                <DropdownUI
                                    id="language-selector"
                                    label="Language"
                                    options={mainOptions}
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
                </div>
            </section>

            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Compact Form Layout</h3>
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800">
                    <p className="text-sm text-indigo-800 dark:text-indigo-200 mb-4">
                        Dropdowns are perfect for forms with limited space.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 max-w-4xl">
                        <DropdownUI
                            id="dept-compact"
                            label="Department"
                            options={mainOptions}
                            variants={{
                                variant: 'neutral',
                                aspect: { size: 'sm' },
                                typography: { variant: 'neutral', size: 'xs' }
                            }}
                        />
                        <DropdownUI
                            id="priority-compact"
                            label="Priority"
                            options={mainOptions}
                            variants={{
                                variant: 'neutral',
                                aspect: { size: 'sm' },
                                typography: { variant: 'neutral', size: 'xs' }
                            }}
                        />
                        <DropdownUI
                            id="status-compact"
                            label="Status"
                            options={mainOptions}
                            variants={{
                                variant: 'neutral',
                                aspect: { size: 'sm' },
                                typography: { variant: 'neutral', size: 'xs' }
                            }}
                        />
                    </div>
                </div>
            </section>

            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Features</h3>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <ul className="text-sm space-y-1">
                        <li> Searchable dropdown with filter</li>
                        <li> Keyboard navigation support</li>
                        <li> Customizable variants and sizing</li>
                        <li> Responsive design</li>
                        <li> Accessible with proper ARIA attributes</li>
                    </ul>
                </div>
            </section>
        </div>
    )
}
