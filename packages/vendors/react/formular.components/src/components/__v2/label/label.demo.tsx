/**
 * FORMULAR - Label Component Demo
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 */

import { Label } from './label.ui'

export const LabelDemo = () => {
    return (
        <div className="label-demo p-4 space-y-8">
            <h2 className="text-2xl font-bold text-primary"> Label Component Demo</h2>

            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Form Labels</h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg space-y-4">
                    <div>
                        <Label htmlFor="username" text="Username *" />
                        <input
                            id="username"
                            type="text"
                            className="mt-1 block w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <Label htmlFor="email" text="Email Address" />
                        <input
                            id="email"
                            type="email"
                            className="mt-1 block w-full p-2 border rounded"
                        />
                    </div>
                </div>
            </section>

            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Usage</h3>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <p className="text-sm">
                        Labels provide accessible form field identification and click-to-focus
                        functionality.
                    </p>
                </div>
            </section>
        </div>
    )
}
