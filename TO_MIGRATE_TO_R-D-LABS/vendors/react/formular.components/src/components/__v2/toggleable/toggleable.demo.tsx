/**
 * FORMULAR - Toggleable Component Demo
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 */

import { Toggleable } from './toggleable'

export const ToggleableDemo = () => {
    return (
        <div className="toggleable-demo p-4 space-y-8">
            <h2 className="text-2xl font-bold text-primary"> Toggleable Component Demo</h2>

            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Toggle States</h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg space-y-4">
                    <Toggleable id="demo-toggle-1">
                        <div className="p-4 border rounded bg-white dark:bg-gray-700">
                            <h4 className="font-medium mb-2">Collapsible Content</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                This content can be shown or hidden using the toggleable
                                functionality. Great for accordions, expandable sections, and modal
                                dialogs.
                            </p>
                        </div>
                    </Toggleable>

                    <Toggleable id="demo-toggle-2">
                        <div className="p-4 border rounded bg-blue-50 dark:bg-blue-900/20">
                            <h4 className="font-medium mb-2">Another Section</h4>
                            <p className="text-sm text-blue-800 dark:text-blue-200">
                                Each toggleable component maintains its own state independently.
                            </p>
                        </div>
                    </Toggleable>
                </div>
            </section>

            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Usage</h3>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <p className="text-sm">
                        Toggleable provides state management for show/hide functionality, useful for
                        collapsible content, modals, and interactive UI elements.
                    </p>
                </div>
            </section>
        </div>
    )
}
