import {
    IServiceManager,
    IServiceOptions,
    ServiceFactoryType,
    ServiceIdType
} from '../service-manager.types'
import { ILazyDependencyProxy, LazyDependencyProxy } from './register-proxy/getter'

export const registerClass = function <T>(
    this: IServiceManager,
    identifier: ServiceIdType<T>,
    constructor: new (...args: any[]) => T,
    options: IServiceOptions = {}
): any {
    this.throwIfDisposed()

    const factory: ServiceFactoryType<T> = (container: IServiceManager, ...parameters: any[]) => {
        const dependencies = options.dependencies ?? []
        const lazyDependencies = dependencies.map((dependency: ServiceIdType<any>) => {
            if (dependency === null || dependency === undefined) return null

            const lazyDependency: ILazyDependencyProxy<T> = new LazyDependencyProxy(
                identifier,
                container,
                dependency
            )

            try {
                return lazyDependency.proxy()
            } catch (e: any) {
                throw new Error(
                    `IServiceManager: Failed to resolve dependency ${container.getServiceName(dependency)} for service ${container.getServiceName(identifier)} - ${e.message}`
                )
            }
        })
        // Runtime parameters are passed directly, not resolved from container
        return new constructor(...lazyDependencies, ...parameters)
    }
    this.register<T>(identifier, factory, options)
}
