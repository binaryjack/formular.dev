import {
    IServiceManager,
    IServiceOptions,
    ServiceFactoryType,
    ServiceIdType
} from '../service-manager.types'

export const registerClass = function <T>(
    this: IServiceManager,
    identifier: ServiceIdType<T>,
    constructor: new (...args: any[]) => T,
    options: IServiceOptions = {}
): any {
    this.throwIfDisposed()

    const factory: ServiceFactoryType<T> = (container: IServiceManager, ...parameters: any[]) => {
        const dependencies = options.dependencies ?? []
        const resolvedDependencies = dependencies.map((dependency: ServiceIdType<any>) => {
            try {
                if (dependency === null) return null
                return container.resolve(dependency)
            } catch (e: any) {
                throw new Error(
                    `IServiceManager: Failed to resolve dependency ${container.getServiceName(dependency)} for service ${container.getServiceName(identifier)} - ${e.message}`
                )
            }
        })
        // Runtime parameters are passed directly, not resolved from container
        return new constructor(...resolvedDependencies, ...parameters)
    }
    this.register<T>(identifier, factory, options)
}
