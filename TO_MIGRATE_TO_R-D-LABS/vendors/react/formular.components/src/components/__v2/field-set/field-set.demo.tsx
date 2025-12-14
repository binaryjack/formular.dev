/**
 * FORMULAR - Field Set Component Demo
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 */

import React from 'react'
import { Button } from '../button/button.ui'
import { FieldSet } from './field-set.ui'

export const FieldSetDemo = () => {
    const handleButtonClick = () => {
        console.log('Button clicked')
    }

    return (
        <div className="field-set-demo p-4 space-y-8">
            <h2 className="text-2xl font-bold text-primary"> Field Set Component Demo</h2>

            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Basic Field Set</h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                    <FieldSet
                        id="basic-fieldset"
                        label="Username"
                        input={
                            <input
                                type="text"
                                placeholder="Enter your username"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        }
                        buttons={[
                            <Button
                                key="submit"
                                id="submit-btn"
                                title="Submit form"
                                onClick={handleButtonClick}
                                variants={{
                                    variant: 'success',
                                    aspect: { size: 'sm' },
                                    typography: {
                                        variant: 'success',
                                        size: 'xs'
                                    }
                                }}
                            >
                                Submit
                            </Button>,
                            <Button
                                key="cancel"
                                id="cancel-btn"
                                title="Cancel form"
                                onClick={handleButtonClick}
                                variants={{
                                    variant: 'secondary',
                                    aspect: { size: 'sm' },
                                    typography: {
                                        variant: 'secondary',
                                        size: 'xs'
                                    }
                                }}
                            >
                                Cancel
                            </Button>
                        ]}
                    />
                </div>
            </section>

            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Simple Field Set (No Buttons)</h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                    <FieldSet
                        id="simple-fieldset"
                        label="Email Address"
                        input={
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        }
                        buttons={null}
                    />
                </div>
            </section>

            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Field Set with Textarea</h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                    <FieldSet
                        id="textarea-fieldset"
                        label="Description"
                        input={
                            <textarea
                                placeholder="Enter a description"
                                rows={4}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                            />
                        }
                        buttons={null}
                    />
                </div>
            </section>

            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Form Layout Examples</h3>
                <div className="space-y-6">
                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">Contact Form</h4>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                            <div className="space-y-4 max-w-md">
                                <FieldSet
                                    id="contact-name"
                                    label="Full Name"
                                    input={
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full p-3 border rounded-lg"
                                            aria-label="Full Name"
                                        />
                                    }
                                    buttons={null}
                                />

                                <FieldSet
                                    id="contact-email"
                                    label="Email"
                                    input={
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full p-3 border rounded-lg"
                                            aria-label="Email Address"
                                        />
                                    }
                                    buttons={null}
                                />

                                <FieldSet
                                    id="contact-select"
                                    label="Category"
                                    input={
                                        <select
                                            className="w-full p-3 border rounded-lg"
                                            title="Select a category"
                                            aria-label="Category"
                                        >
                                            <option value="">Choose a category</option>
                                            <option value="general">General Inquiry</option>
                                            <option value="support">Support</option>
                                            <option value="sales">Sales</option>
                                        </select>
                                    }
                                    buttons={null}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">Settings Form</h4>
                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                            <div className="space-y-4 max-w-md">
                                <FieldSet
                                    id="settings-action"
                                    label="Quick Actions"
                                    input={
                                        <input
                                            type="text"
                                            placeholder="Set your preferences"
                                            className="w-full p-3 border rounded-lg"
                                            aria-label="Notification Preferences"
                                        />
                                    }
                                    buttons={[
                                        <Button
                                            key="info-btn"
                                            id="info-btn"
                                            title="Get information"
                                            onClick={handleButtonClick}
                                            variants={{
                                                variant: 'info',
                                                aspect: { size: 'lg' },
                                                typography: {
                                                    variant: 'info',
                                                    size: 'md'
                                                }
                                            }}
                                        >
                                            Get Info
                                        </Button>
                                    ]}
                                />

                                <FieldSet
                                    id="settings-profile"
                                    label="Profile Settings"
                                    input={
                                        <textarea
                                            placeholder="Tell us about yourself"
                                            rows={3}
                                            className="w-full p-3 border rounded-lg resize-vertical"
                                            aria-label="Bio"
                                        />
                                    }
                                    buttons={[
                                        <Button
                                            key="save-btn-sm"
                                            id="save-btn-sm"
                                            title="Save changes"
                                            onClick={handleButtonClick}
                                            variants={{
                                                variant: 'info',
                                                aspect: { size: 'sm' },
                                                typography: {
                                                    variant: 'info',
                                                    size: 'xs'
                                                }
                                            }}
                                        >
                                            Save
                                        </Button>,
                                        <Button
                                            key="reset-btn"
                                            id="reset-btn"
                                            title="Reset to defaults"
                                            onClick={handleButtonClick}
                                            variants={{
                                                variant: 'neutral',
                                                aspect: { size: 'sm' },
                                                typography: {
                                                    variant: 'neutral',
                                                    size: 'xs'
                                                }
                                            }}
                                        >
                                            Reset
                                        </Button>
                                    ]}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">Advanced Actions</h4>
                        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                            <div className="space-y-4 max-w-md">
                                <FieldSet
                                    id="advanced-config"
                                    label="Configuration"
                                    input={
                                        <input
                                            type="text"
                                            placeholder="Configuration value"
                                            className="w-full p-3 border rounded-lg"
                                            aria-label="Configuration input"
                                        />
                                    }
                                    buttons={[
                                        <Button
                                            key="apply-btn"
                                            id="apply-btn"
                                            title="Apply configuration"
                                            onClick={handleButtonClick}
                                            variants={{
                                                variant: 'success',
                                                aspect: { size: 'sm' },
                                                typography: {
                                                    variant: 'success',
                                                    size: 'xs'
                                                }
                                            }}
                                        >
                                            Apply
                                        </Button>
                                    ]}
                                />

                                <FieldSet
                                    id="advanced-compact"
                                    label="Compact Layout"
                                    input={
                                        <input
                                            type="text"
                                            placeholder="Compact input"
                                            className="w-full p-2 text-sm border rounded"
                                            aria-label="Compact input field"
                                        />
                                    }
                                    buttons={[
                                        <Button
                                            key="compact-save"
                                            id="compact-save"
                                            title="Save changes"
                                            onClick={handleButtonClick}
                                            variants={{
                                                variant: 'success',
                                                aspect: { size: 'xs' },
                                                typography: {
                                                    variant: 'success',
                                                    size: '2xs'
                                                }
                                            }}
                                        >
                                            Save
                                        </Button>,
                                        <Button
                                            key="compact-cancel"
                                            id="compact-cancel"
                                            title="Cancel changes"
                                            onClick={handleButtonClick}
                                            variants={{
                                                variant: 'neutral',
                                                aspect: { size: 'xs' },
                                                typography: {
                                                    variant: 'neutral',
                                                    size: '2xs'
                                                }
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Features</h3>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <ul className="text-sm space-y-1">
                        <li> Flexible field container with label and input sections</li>
                        <li> Optional action buttons with custom styling</li>
                        <li> Configurable layouts and spacing</li>
                        <li> Accessibility-friendly structure</li>
                        <li> Supports various input types and form controls</li>
                    </ul>
                </div>
            </section>
        </div>
    )
}
