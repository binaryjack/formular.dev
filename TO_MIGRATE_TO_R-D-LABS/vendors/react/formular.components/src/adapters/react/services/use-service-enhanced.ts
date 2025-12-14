/**
 * Enhanced useService hook that uses the merged AppContext
 * This maintains backward compatibility while using the new merged provider
 */

import useAppContext from '@components/context/app-context/app-context.context'

/**
 * React hook for accessing services from the merged app context.
 *
 * This hook provides the same interface as the original useService hook
 * but now uses the merged AppContext instead of separate providers.
 *
 * @returns Object with service access methods and service manager
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
 * Direct access to service manager - backward compatibility
 */
export const useServiceManager = () => {
    const appContext = useAppContext()
    return appContext.serviceManager
}
