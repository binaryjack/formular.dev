/**
 * FORMULAR - Status Icon Component Demo
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 */

import { StatusIcon } from './status-icon.ui'

export const StatusIconDemo = () => {
    return (
        <div className="status-icon-demo p-4 space-y-8">
            <h2 className="text-2xl font-bold text-primary"> Status Icon Component Demo</h2>

            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Status Indicators</h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="flex items-center gap-2">
                            <StatusIcon
                                id="success-icon"
                                isLoading={false}
                                icon={<span className="text-green-500">✓</span>}
                                variants={{ variant: 'success' }}
                            />
                            <span>Success</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <StatusIcon
                                id="warning-icon"
                                isLoading={false}
                                icon={<span className="text-yellow-500">⚠</span>}
                                variants={{ variant: 'warning' }}
                            />
                            <span>Warning</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <StatusIcon
                                id="error-icon"
                                isLoading={false}
                                icon={<span className="text-red-500">✗</span>}
                                variants={{ variant: 'danger' }}
                            />
                            <span>Error</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <StatusIcon
                                id="info-icon"
                                isLoading={false}
                                icon={<span className="text-blue-500">ⓘ</span>}
                                variants={{ variant: 'info' }}
                            />
                            <span>Info</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <StatusIcon
                                id="pending-icon"
                                isLoading={true}
                                icon={<span className="text-gray-500">●</span>}
                                variants={{ variant: 'neutral' }}
                            />
                            <span>Pending</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Usage</h3>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <p className="text-sm">
                        Status icons provide quick visual feedback for system states, form
                        validation, and process status.
                    </p>
                </div>
            </section>
        </div>
    )
}
