/**
 * FORMULAR - React Service Hook
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Updated hook using React context instead of global singleton
 */

import { ServiceIdType } from 'formular.dev.lib'
import { useMemo } from 'react'
import { useServiceManager } from '../providers/service-manager-provider'

/**
 * React hook for accessing services from the service manager.
 *
 * This hook provides access to the dependency injection container through React context.
 * It replaces the previous global singleton approach with a context-based solution.
 *
 * @returns Object with service access methods
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const { getService, getServiceSync } = useService()
 *
 *   const configService = getService(SConfigService)
 *   // or for immediate resolution:
 *   const validationService = getServiceSync(SValidationService)
 *
 *   return <div>...</div>
 * }
 * ```
 */
export const useService = () => {
    const serviceManager = useServiceManager()

    const getService = useMemo(() => {
        return <T>(identifier: ServiceIdType<T>): T | undefined => {
            try {
                const resolver = serviceManager.lazy<T>(identifier)
                if (!resolver) {
                    throw new Error(`Service not found for identifier: ${identifier?.toString()}`)
                }
                return resolver()
            } catch (error: any) {
                throw new Error(
                    `useService: Error resolving service ${identifier?.toString()}: ${error.message}`
                )
            }
        }
    }, [serviceManager])

    const getServiceSync = useMemo(() => {
        return <T>(identifier: ServiceIdType<T>): T => {
            try {
                return serviceManager.resolve<T>(identifier)
            } catch (error: any) {
                throw new Error(
                    `useService: Error resolving service ${identifier?.toString()}: ${error.message}`
                )
            }
        }
    }, [serviceManager])

    return {
        getService,
        getServiceSync,
        serviceManager
    }
}
