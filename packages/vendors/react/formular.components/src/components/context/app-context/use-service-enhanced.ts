/**
 * Enhanced useService hook that uses the merged AppContext
 * This maintains the same interface as before while using the new merged context
 */

import useAppContext from './app-context-enhanced.context'

/**
 * React hook for accessing services from the merged app context.
 *
 * This hook provides the same interface as the original useService hook
 * but now uses the merged AppContext instead of separate providers.
 *
 * @returns Object with service access methods
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const { getService, getServiceSync, serviceManager } = useService()
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

/**
 * Backward compatibility export
 * @deprecated Use useService from the merged context instead
 */
export const useServiceManager = () => {
    const appContext = useAppContext()
    return appContext.serviceManager
}
