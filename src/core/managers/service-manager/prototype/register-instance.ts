import { logManager } from '@core/managers/log-manager/log-manager'
import { IServiceManager, ServiceIdType } from '../service-manager.types'

export const registerInstance = function <T>(
    this: IServiceManager,
    identifier: ServiceIdType<T>,
    instance: T
): any {
    this.throwIfDisposed()

    this.singletonInstances.set(identifier, instance)

    this.services.set(identifier, {
        identifier,
        factory: () => instance as T,
        lifetime: 'singleton'
    })

    logManager(
        undefined,
        'info',
        'IServiceManager',
        `Registered instance: ${this.getServiceName(identifier)}`
    )

    return this
}
