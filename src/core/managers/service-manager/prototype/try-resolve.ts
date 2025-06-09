import { logManager } from '@core/managers/log-manager/log-manager'
import { IServiceManager, ServiceIdType } from '../service-manager.types'

export const tryResolve = function <T>(
    this: IServiceManager,
    identifier: ServiceIdType<T>,
    ...parameters: any[]
): T | undefined {
    this.throwIfDisposed()

    if (this.singletonInstances.has(identifier)) {
        return this.singletonInstances.get(identifier) as T
    }

    if (this.scopedInstances.has(identifier)) {
        return this.scopedInstances.get(identifier) as T
    }

    const descriptor = this.findServiceDescriptor(identifier)
    if (!descriptor) {
        return undefined
    }

    try {
        const instance = descriptor.factory(this, parameters)

        switch (descriptor.lifetime) {
            case 'singleton':
                this.singletonInstances.set(identifier, instance)
                return instance as T
            case 'scoped':
                this.scopedInstances.set(identifier, instance)
                return instance as T
            case 'transient':
                // should no have cached instance !
                break
            /*return instance as T*/
            default:
                throw new Error(
                    `IServiceManager - tryResolve: Invalid lifetime ${descriptor.lifetime}`
                )
        }

        logManager(
            undefined,
            'info',
            'IServiceManager',
            `IServiceManager: Resolved service: ${this.getServiceName(identifier)} (${descriptor.lifetime})`
        )

        return instance
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            'IServiceManager',
            `Failed to resolve service: ${this.getServiceName(identifier)} - ${e.message}`
        )
    }
}
