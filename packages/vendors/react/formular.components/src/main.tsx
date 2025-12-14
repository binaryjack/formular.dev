/**
 * FORMULAR - React Components Demo App Entry Point
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Main entry point for the development/demo application
 */

import { OptionBuilder, OptionsBuilder } from 'formular.dev.lib'
import ReactDOM from 'react-dom/client'

import { AppContextProvider } from '@components/context/app-context/app-context'
import { VisualDebug } from '@components/context/debug/visual-debug'
import { ScrollContext } from '@components/context/scrolling/scrolling'

export const onlyOneOption = new OptionBuilder('I Accept').setValue('1').setSequenceId(0).build()

export const mainOptions = new OptionsBuilder()
    .setOptions(
        ...[
            new OptionBuilder('Option 1').setValue('1').setSequenceId(0),
            new OptionBuilder('Option 2').setValue('2').setSequenceId(1),
            new OptionBuilder('Option 3').setValue('3').setSequenceId(2),
            new OptionBuilder('Option 4').setValue('4').setSequenceId(3)
        ]
    )
    .build()

export const mainCheckOptions = new OptionsBuilder()
    .setOptions(
        ...[
            new OptionBuilder('Option 1').setValue('1').setSequenceId(0),
            new OptionBuilder('Option 2').setValue('2').setSequenceId(1),
            new OptionBuilder('Option 3').setValue('3').setSequenceId(2),
            new OptionBuilder('Option 4').setValue('4').setSequenceId(3),
            new OptionBuilder('Option 5').setValue('5').setSequenceId(4),
            new OptionBuilder('Option 6').setValue('6').setSequenceId(5),
            new OptionBuilder('Option 7').setValue('7').setSequenceId(6),
            new OptionBuilder('Option 8').setValue('8').setSequenceId(7),
            new OptionBuilder('Option 9').setValue('9').setSequenceId(8),
            new OptionBuilder('Option 10').setValue('10').setSequenceId(9),
            new OptionBuilder('Option 11').setValue('11').setSequenceId(10),
            new OptionBuilder('Option 12').setValue('12').setSequenceId(11),
            new OptionBuilder('Option 13').setValue('13').setSequenceId(12),
            new OptionBuilder('Option 14').setValue('14').setSequenceId(13),
            new OptionBuilder('Option 15').setValue('15').setSequenceId(14),
            new OptionBuilder('Option 16').setValue('16').setSequenceId(15),
            new OptionBuilder('Option 17').setValue('17').setSequenceId(16)
        ]
    )
    .build()

document.title = import.meta.env.VITE_APP_NAME ?? 'FORMULAR React Components'
const rootComponent = document.getElementById('root')

if (!rootComponent) {
    throw new Error('Root element not found')
}

const root = ReactDOM.createRoot(rootComponent)

const html = document.documentElement

const currentTheme = html.getAttribute('data-theme')

root.render(
    <VisualDebug options={{ enabled: false, color: '' }}>
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
