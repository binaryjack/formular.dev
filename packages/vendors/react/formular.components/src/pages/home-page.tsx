/**
 * FORMULAR - Home Page Component
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 */

import { useService } from '@adapters/react'
import { BoundaryErrorCatcher } from '@components/error-boundary-catcher/error-boundary-catcher'
import type { IConfigurationManager } from 'formular.dev.lib'
import { SConfigurationManager } from 'formular.dev.lib'

const ConfigurationTest = () => {
    const { getService } = useService()

    try {
        const configManager = getService<IConfigurationManager>(SConfigurationManager)

        if (!configManager) {
            return <div style={{ color: 'red' }}>❌ ConfigurationManager not found in DI</div>
        }

        const activeConfig = configManager.activeConfiguration

        if (!activeConfig || Object.keys(activeConfig).length === 0) {
            return <div style={{ color: 'red' }}>❌ Active configuration is empty</div>
        }

        return (
            <div style={{ padding: '10px', border: '1px solid #ccc', margin: '10px 0' }}>
                <h3 style={{ color: 'green' }}>✅ Configuration Manager Working!</h3>
                <p>
                    <strong>Configuration Name:</strong> {activeConfig.name}
                </p>
                <p>
                    <strong>Environment:</strong> {activeConfig.targetEnvironment}
                </p>
                <p>
                    <strong>Default Culture:</strong> {activeConfig.cultures?.defaultCulture?.name}
                </p>
            </div>
        )
    } catch (error) {
        return (
            <div style={{ color: 'red' }}>
                ❌ Error accessing configuration: {(error as Error).message}
            </div>
        )
    }
}

export const HomePage = () => {
    return (
        <div className="app flex flex-col items-center justify-center min-w-[200px]">
            <h1 className="text-3xl font-bold mb-8">FORMULAR React Components</h1>
            <p className="text-gray-600 mb-8 text-center max-w-2xl">
                A comprehensive collection of React components built with event-driven design
                patterns. Explore our demos, validation components, forms, and button
                implementations.
            </p>

            <BoundaryErrorCatcher>
                <ConfigurationTest />
            </BoundaryErrorCatcher>
        </div>
    )
}
