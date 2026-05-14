import { logManager } from '@core/managers/log-manager/log-manager'
import { IServiceManager, ServiceIdType } from '../service-manager.types'

export const tryResolve = function <T>(
    this: IServiceManager,
    identifier: ServiceIdType<T>,
    ...parameters: any[]
): T | undefined {
    this.throwIfDisposed()

    // Check for circular dependency
    if (this.resolutionStack.has(identifier)) {
        const stack = Array.from(this.resolutionStack)
            .map((id) => this.getServiceName(id))
            .join(' -> ')
        throw new Error(
            `Circular dependency detected: ${stack} -> ${this.getServiceName(identifier)}`
        )
    }

    // Add to resolution stack
    this.resolutionStack.add(identifier)

    try {
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

        // For singletons, reserve the spot to prevent circular issues
        if (descriptor.lifetime === 'singleton') {
            this.singletonInstances.set(identifier, Symbol('resolving'))
        }

        const instance = descriptor.factory(this, ...parameters)

        switch (descriptor.lifetime) {
            case 'singleton':
                this.singletonInstances.set(identifier, instance)
                return instance as T
            case 'scoped':
                this.scopedInstances.set(identifier, instance)
                return instance as T
            case 'transient':
                // should not have cached instance !
                break
            default:
                throw new Error(
                    `IServiceManager - tryResolve: Invalid lifetime ${descriptor.lifetime}`
                )
        }

        // Disable verbose resolution logs
        // logManager(
        //     undefined,
        //     'info',
        //     'IServiceManager',
        //     `IServiceManager: Resolved service: ${this.getServiceName(identifier)} (${
        //         descriptor.lifetime
        //     })`
        // )

        return instance
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            'IServiceManager',
            `Failed to resolve service: ${this.getServiceName(identifier)} - ${e.message}`
        )

        // Re-throw the error for proper error handling
        throw e
    } finally {
        // Remove from resolution stack
        this.resolutionStack.delete(identifier)
    }
}
