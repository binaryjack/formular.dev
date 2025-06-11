import { ServiceIdType } from '@core/managers/service-manager/service-manager.types'
import { applifeCylceInstance } from '@project/start/app-lifecycle-instances'
import { useMemo } from 'react'

export const useService = () => {
    const serviceManager = useMemo(() => {
        return applifeCylceInstance.getGlobalServiceManager()
    }, [])

    return {
        getService: <T>(identifier: ServiceIdType<T>): T | undefined => {
            if (!serviceManager) {
                throw new Error(
                    `useService: Error serviceManager is not initialized. Please ensure the ServiceManager is set up correctly.`
                )
            }
            try {
                return serviceManager.lazy<T>(identifier)?.()
            } catch (error: any) {
                throw new Error(
                    `useService: Error resolving service ${identifier?.toString()}: ${error.message}`
                )
            }
        }
    }
}
