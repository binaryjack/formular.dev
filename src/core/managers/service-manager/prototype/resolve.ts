import { IServiceManager, ServiceIdType } from '../service-manager.types'

export const resolve = function <T>(
    this: IServiceManager,
    identifier: ServiceIdType<T>,
    ...parameters: any[]
): T {
    this.throwIfDisposed()

    const instance = this.tryResolve<T>(identifier, ...parameters)
    if (instance === undefined) {
        throw new Error(
            `IServiceManager - resolve: Service not found: ${this.getServiceName(
                identifier
            )} parameters: ${JSON.stringify(parameters)}`
        )
    }

    return instance
}
