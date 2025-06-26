/**
 * FORMULAR - React Service Hook
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Updated hook using merged AppContext instead of separate providers
 */

import useAppContext from '@components/context/app-context/app-context.context'

/**
 * React hook for accessing services from the service manager.
 *
 * This hook provides access to the dependency injection container through the merged AppContext.
 * It replaces the previous approach of separate ServiceManagerProvider and AppContextProvider.
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
    const appContext = useAppContext()

    return {
        getService: appContext.getService,
        getServiceSync: appContext.getServiceSync,
        serviceManager: appContext.serviceManager
    }
}
