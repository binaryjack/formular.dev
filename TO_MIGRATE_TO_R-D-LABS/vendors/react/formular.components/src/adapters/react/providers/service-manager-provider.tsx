/**
 * FORMULAR - React Service Manager Provider
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * React context provider for service manager DI
 */

import {
    IServiceManager,
    IServiceManagerSetupOptions,
    ServiceManagerFactory
} from 'formular.dev.lib'
import React, { createContext, ReactNode, useContext } from 'react'

/**
 * Context interface for service manager access
 */
interface IServiceManagerContext {
    serviceManager: IServiceManager
}

/**
 * React context for service manager
 */
const ServiceManagerContext = createContext<IServiceManagerContext | null>(null)

/**
 * Props for the ServiceManagerProvider component
 */
export interface IServiceManagerProviderProps {
    children: ReactNode
    /** Service manager instance to use. If not provided, creates a new one */
    serviceManager?: IServiceManager
    /** Options for creating a new service manager */
    setupOptions?: IServiceManagerSetupOptions
    /** Whether to dispose the service manager on unmount (only if created internally) */
    autoDispose?: boolean
}

/**
 * React provider component for service manager dependency injection.
 *
 * Provides access to a service manager instance throughout the React component tree.
 * Can either use an external service manager or create one internally based on setup options.
 *
 * @example
 * ```tsx
 * // Using with auto-created service manager
 * <ServiceManagerProvider setupOptions={{ includeCoreManagers: true }}>
 *   <App />
 * </ServiceManagerProvider>
 *
 * // Using with external service manager
 * const serviceManager = ServiceManagerFactory.create({ ... })
 * <ServiceManagerProvider serviceManager={serviceManager}>
 *   <App />
 * </ServiceManagerProvider>
 * ```
 */
export const ServiceManagerProvider: React.FC<IServiceManagerProviderProps> = ({
    children,
    serviceManager: externalServiceManager,
    setupOptions,
    autoDispose = true
}) => {
    const [internalServiceManager] = React.useState(() => {
        if (externalServiceManager) {
            return externalServiceManager
        }
        return ServiceManagerFactory.create(setupOptions)
    })

    const serviceManager = externalServiceManager || internalServiceManager
    const isInternallyManaged = !externalServiceManager

    React.useEffect(() => {
        return () => {
            if (isInternallyManaged && autoDispose) {
                serviceManager.dispose()
            }
        }
    }, [serviceManager, isInternallyManaged, autoDispose])

    return (
        <ServiceManagerContext.Provider value={{ serviceManager }}>
            {children}
        </ServiceManagerContext.Provider>
    )
}

/**
 * React hook for accessing the service manager from context.
 *
 * @throws {Error} If used outside of a ServiceManagerProvider
 * @returns The service manager instance from context
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const serviceManager = useServiceManager()
 *
 *   const configService = serviceManager.resolve(SConfigService)
 *   // ...
 * }
 * ```
 */
export const useServiceManager = (): IServiceManager => {
    const context = useContext(ServiceManagerContext)
    if (!context) {
        throw new Error('useServiceManager must be used within a ServiceManagerProvider')
    }
    return context.serviceManager
}
