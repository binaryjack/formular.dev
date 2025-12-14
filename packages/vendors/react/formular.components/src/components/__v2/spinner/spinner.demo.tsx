/**
 * FORMULAR - Spinner Component Demo
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 */

import React from 'react'
import { Spinner } from './spinner.ui'

export const SpinnerDemo = () => {
    return (
        <div className="spinner-demo p-4 space-y-8">
            <h2 className="text-2xl font-bold text-primary">🔄 Spinner Component Demo</h2>

            {/* Basic Usage Section */}
            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Basic Usage</h3>
                <div className="flex flex-wrap items-center gap-8">
                    <div className="text-center">
                        <Spinner size="lg" color="primary" />
                        <p className="text-sm text-secondary mt-2">Default Spinner</p>
                    </div>
                </div>
            </section>

            {/* Size Variants Section */}
            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Size Variants</h3>
                <div className="flex flex-wrap items-center gap-8">
                    <div className="text-center">
                        <Spinner size="xs" color="primary" />
                        <p className="text-sm text-secondary mt-2">Extra Small (xs)</p>
                    </div>
                    <div className="text-center">
                        <Spinner size="sm" color="primary" />
                        <p className="text-sm text-secondary mt-2">Small (sm)</p>
                    </div>
                    <div className="text-center">
                        <Spinner size="md" color="primary" />
                        <p className="text-sm text-secondary mt-2">Medium (md)</p>
                    </div>
                    <div className="text-center">
                        <Spinner size="lg" color="primary" />
                        <p className="text-sm text-secondary mt-2">Large (lg)</p>
                    </div>
                    <div className="text-center">
                        <Spinner size="xl" color="primary" />
                        <p className="text-sm text-secondary mt-2">Extra Large (xl)</p>
                    </div>
                    <div className="text-center">
                        <Spinner size="2xl" color="primary" />
                        <p className="text-sm text-secondary mt-2">2X Large (2xl)</p>
                    </div>
                </div>
            </section>

            {/* Color Variants Section */}
            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Color Variants</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                        <Spinner size="lg" color="primary" />
                        <p className="text-sm text-secondary mt-2">Primary</p>
                    </div>
                    <div className="text-center">
                        <Spinner size="lg" color="secondary" />
                        <p className="text-sm text-secondary mt-2">Secondary</p>
                    </div>
                    <div className="text-center">
                        <Spinner size="lg" color="success" />
                        <p className="text-sm text-secondary mt-2">Success</p>
                    </div>
                    <div className="text-center">
                        <Spinner size="lg" color="danger" />
                        <p className="text-sm text-secondary mt-2">Danger</p>
                    </div>
                    <div className="text-center">
                        <Spinner size="lg" color="warning" />
                        <p className="text-sm text-secondary mt-2">Warning</p>
                    </div>
                    <div className="text-center">
                        <Spinner size="lg" color="info" />
                        <p className="text-sm text-secondary mt-2">Info</p>
                    </div>
                    <div className="text-center">
                        <Spinner size="lg" color="neutral" />
                        <p className="text-sm text-secondary mt-2">Neutral</p>
                    </div>
                </div>
            </section>

            {/* Use Cases Section */}
            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Common Use Cases</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Loading States */}
                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">Loading States</h4>
                        <div className="space-y-4">
                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg flex items-center gap-3">
                                <Spinner size="sm" color="primary" />
                                <span className="text-sm">Loading data...</span>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg flex items-center justify-center">
                                <div className="text-center">
                                    <Spinner size="lg" color="primary" />
                                    <p className="text-sm text-secondary mt-2">
                                        Processing request
                                    </p>
                                </div>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg flex items-center gap-3">
                                <Spinner size="xs" color="success" />
                                <span className="text-sm">Saving changes...</span>
                            </div>
                        </div>
                    </div>

                    {/* Status Indicators */}
                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">Status Indicators</h4>
                        <div className="space-y-4">
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-center gap-3 border border-blue-200 dark:border-blue-800">
                                <Spinner size="sm" color="info" />
                                <span className="text-sm">Syncing with server...</span>
                            </div>
                            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg flex items-center gap-3 border border-yellow-200 dark:border-yellow-800">
                                <Spinner size="sm" color="warning" />
                                <span className="text-sm">Processing with warnings...</span>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg flex items-center gap-3 border border-green-200 dark:border-green-800">
                                <Spinner size="sm" color="success" />
                                <span className="text-sm">Upload in progress...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Examples Section */}
            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Interactive Examples</h3>
                <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                        <h4 className="text-lg font-medium mb-3 text-primary">
                            Simulated Loading Process
                        </h4>
                        <LoadingSimulation />
                    </div>
                </div>
            </section>

            {/* Performance & Accessibility Section */}
            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">
                    Performance & Accessibility
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">
                            Accessibility Features
                        </h4>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <ul className="text-sm space-y-2">
                                <li className="flex items-center gap-2">
                                    <Spinner size="xs" color="success" />
                                    <span>ARIA labels for screen readers</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Spinner size="xs" color="info" />
                                    <span>Respects prefers-reduced-motion</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Spinner size="xs" color="warning" />
                                    <span>High contrast color support</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Spinner size="xs" color="primary" />
                                    <span>Semantic role attributes</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">
                            Performance Optimized
                        </h4>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <ul className="text-sm space-y-2">
                                <li className="flex items-center gap-2">
                                    <Spinner size="xs" color="success" />
                                    <span>CSS animations (hardware accelerated)</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Spinner size="xs" color="info" />
                                    <span>Minimal DOM footprint</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Spinner size="xs" color="warning" />
                                    <span>No JavaScript animation loops</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Spinner size="xs" color="primary" />
                                    <span>Responsive to theme changes</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Edge Cases Section */}
            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">
                    Edge Cases & Special Scenarios
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">Tiny Spaces</h4>
                        <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded text-center">
                            <Spinner size="xs" color="primary" />
                            <p className="text-xs mt-1">Compact</p>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">Large Areas</h4>
                        <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded text-center">
                            <Spinner size="2xl" color="primary" />
                            <p className="text-sm mt-2">Full screen loader</p>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">Inline Usage</h4>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
                            <p className="text-sm">
                                Processing <Spinner size="xs" color="primary" /> your request...
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

// Helper component for interactive loading simulation
const LoadingSimulation = () => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [progress, setProgress] = React.useState(0)

    const startSimulation = () => {
        setIsLoading(true)
        setProgress(0)

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setTimeout(() => {
                        setIsLoading(false)
                        setProgress(0)
                    }, 500)
                    return 100
                }
                return prev + 10
            })
        }, 200)
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <button
                    onClick={startSimulation}
                    disabled={isLoading}
                    className="px-4 py-2 bg-primary-500 text-white rounded disabled:opacity-50"
                >
                    {isLoading ? 'Loading...' : 'Start Loading Simulation'}
                </button>
                {isLoading && (
                    <div className="flex items-center gap-2">
                        <Spinner size="sm" color="primary" />
                        <span className="text-sm">Progress: {progress}%</span>
                    </div>
                )}
            </div>

            {isLoading && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Loading Progress</span>
                        <span className="text-sm">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-primary-500 h-2 rounded-full transition-all duration-200"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
