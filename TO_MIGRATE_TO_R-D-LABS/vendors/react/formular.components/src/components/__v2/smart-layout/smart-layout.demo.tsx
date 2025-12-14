/**
 * FORMULAR - Smart Layout Component Demo
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 */

import React from 'react'
import { SmartLayout } from './smart-layout.ui'

export const SmartLayoutDemo = () => {
    return (
        <div className="smart-layout-demo p-4 space-y-8">
            <h2 className="text-2xl font-bold text-primary"> Smart Layout Component Demo</h2>

            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Basic Layout</h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                    <SmartLayout id="basic-layout">
                        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded border">
                            <h4 className="font-medium">Item 1</h4>
                            <p className="text-sm">First layout item</p>
                        </div>
                        <div className="bg-green-100 dark:bg-green-900 p-4 rounded border">
                            <h4 className="font-medium">Item 2</h4>
                            <p className="text-sm">Second layout item</p>
                        </div>
                        <div className="bg-orange-100 dark:bg-orange-900 p-4 rounded border">
                            <h4 className="font-medium">Item 3</h4>
                            <p className="text-sm">Third layout item</p>
                        </div>
                    </SmartLayout>
                </div>
            </section>

            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Custom Grid</h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                    <SmartLayout 
                        id="custom-grid"
                        grid={{
                            gaps: { '2xs': 'gap-4' }
                        }}
                    >
                        <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded border">
                            <h4 className="font-medium">Card A</h4>
                            <p className="text-sm">Responsive card layout</p>
                        </div>
                        <div className="bg-teal-100 dark:bg-teal-900 p-4 rounded border">
                            <h4 className="font-medium">Card B</h4>
                            <p className="text-sm">Adapts to screen size</p>
                        </div>
                    </SmartLayout>
                </div>
            </section>

            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Features</h3>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <ul className="text-sm space-y-1">
                        <li> Responsive breakpoint-based layout</li>
                        <li> Configurable grid gaps and rows</li>
                        <li> Mobile-first design approach</li>
                        <li> Semantic HTML structure</li>
                    </ul>
                </div>
            </section>
        </div>
    )
}
