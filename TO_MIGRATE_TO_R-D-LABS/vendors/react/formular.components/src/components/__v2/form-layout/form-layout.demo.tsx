/**
 * FORMULAR - Form Layout Component Demo
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 */

import React from 'react'
import { FormLayout } from './form-layout.ui'

export const FormLayoutDemo = () => {
    return (
        <div className="form-layout-demo p-4 space-y-8">
            <h2 className="text-2xl font-bold text-primary"> Form Layout Component Demo</h2>

            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Responsive Form Layout</h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                    <FormLayout>
                        <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">First Name</label>
                                    <input type="text" className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Last Name</label>
                                    <input type="text" className="w-full p-2 border rounded" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input type="email" className="w-full p-2 border rounded" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Message</label>
                                <textarea className="w-full p-2 border rounded" rows={4}></textarea>
                            </div>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                Submit
                            </button>
                        </div>
                    </FormLayout>
                </div>
            </section>

            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Usage</h3>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <p className="text-sm">Form Layout provides consistent spacing, alignment, and responsive behavior for form elements across different screen sizes.</p>
                </div>
            </section>
        </div>
    )
}
