import { ServiceIdType } from '@core/managers/service-manager/service-manager.types'
import { useMemo } from 'react'
import { applifeCylceInstance } from 'src/environment/start/app-lifecycle-instances'

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
                return serviceManager.resolve<T>(identifier)
            } catch (error: any) {
                throw new Error(
                    `useService: Error resolving service ${identifier?.toString()}: ${error.message}`
                )
            }
        }
    }
}
