import {
    IServiceDescriptor,
    IServiceManager,
    IServiceOptions,
    ServiceFactoryType,
    ServiceIdType
} from '../service-manager.types'

export const register = function <T>(
    this: IServiceManager,
    identifier: ServiceIdType<T>,
    factory: ServiceFactoryType<T>,
    options?: IServiceOptions
): any {
    this.throwIfDisposed()

    const descriptor: IServiceDescriptor<T> = {
        identifier,
        factory,
        lifetime: options?.lifetime ?? 'transient',
        dependencies: options?.dependencies ?? []
    }

    this.services.set(identifier, descriptor)

    // Disable verbose service registration logs
    // logManager(
    //     undefined,
    //     'info',
    //     'IServiceManager',
    //     `Registered service: ${this.getServiceName(identifier)} as ${descriptor.lifetime}`
    // )

    return this
}
