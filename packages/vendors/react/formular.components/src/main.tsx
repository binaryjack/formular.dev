/**
 * FORMULAR - React Components Demo App Entry Point
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Main entry point for the development/demo application using the demo registry system
 */

import { AppContextProvider } from '@components/context/app-context/app-context'
import { VisualDebug } from '@components/context/debug/visual-debug'
import { ScrollContext } from '@components/context/scrolling/scrolling'

import ReactDOM from 'react-dom/client'
import { componentDemos } from './demo-registry'

document.title = import.meta.env.VITE_APP_NAME ?? 'FORMULAR React Components'
const rootComponent = document.getElementById('root')

if (!rootComponent) {
    throw new Error('Root element not found')
}

const root = ReactDOM.createRoot(rootComponent)

root.render(
    <VisualDebug options={{ enabled: false, color: 'bg-blue-100' }}>
        <ScrollContext>
            <AppContextProvider
                setupOptions={{
                    includeCoreManagers: true,
                    includeFormularManager: true,
                    includeInputEngine: true,
                    includeBaseConfigurations: true
                }}
            >
                {/* Component Demos from Registry */}
                <div className="component-demos-stack space-y-8 p-4">
                    {componentDemos.map(
                        ({ name, component: DemoComponent, description, category }) => (
                            <div
                                key={name}
                                className="demo-page border-b border-gray-200 dark:border-gray-700 pb-8 last:border-b-0"
                            >
                                <div className="demo-header mb-4">
                                    <h1 className="text-3xl font-bold text-primary mb-2">
                                        {name} Demo
                                    </h1>
                                    {description && (
                                        <p className="text-sm text-secondary mb-1">{description}</p>
                                    )}
                                    {category && (
                                        <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded">
                                            {category}
                                        </span>
                                    )}
                                </div>
                                <DemoComponent />
                            </div>
                        )
                    )}

                    {/* No demos message */}
                    {componentDemos.length === 0 && (
                        <div className="text-center py-12">
                            <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                                No demos currently active
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-500">
                                Uncomment demo entries in{' '}
                                <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                    demo-registry.ts
                                </code>{' '}
                                to view components
                            </p>
                        </div>
                    )}
                </div>
            </AppContextProvider>
        </ScrollContext>
    </VisualDebug>
)
