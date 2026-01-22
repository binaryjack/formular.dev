import { logManager } from '@core/managers/log-manager/log-manager'
import { IServiceManager } from '../service-manager.types'

export const dispose = function (this: IServiceManager): any {
    if (this.isDisposed) {
        return
    }

    for (const [identifier, instance] of this.singletonInstances) {
        if (instance && typeof instance.dispose === 'function') {
            try {
                instance.dispose()
                logManager(
                    undefined,
                    'info',
                    'IServiceManager',
                    `Disposed service: ${this.getServiceName(identifier)}`
                )
            } catch (e: any) {
                logManager(
                    undefined,
                    'error',
                    'IServiceManager',
                    `Error disposing service: ${this.getServiceName(identifier)} - ${e.message}`
                )
            }
        }
    }

    for (const [identifier, instance] of this.scopedInstances) {
        if (instance && typeof instance.dispose === 'function') {
            try {
                instance.dispose()
                logManager(
                    undefined,
                    'info',
                    'IServiceManager',
                    `Disposed service: ${this.getServiceName(identifier)}`
                )
            } catch (e: any) {
                logManager(
                    undefined,
                    'error',
                    'IServiceManager',
                    `Error disposing service: ${this.getServiceName(identifier)} - ${e.message}`
                )
            }
        }
    }
    this.services.clear()
    this.singletonInstances.clear()
    this.scopedInstances.clear()
    this.isDisposed = true
}
