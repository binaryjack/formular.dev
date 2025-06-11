import { IServiceManager, ServiceIdType } from '../../service-manager.types'

export interface ILazyDependencyProxy<T> {
    new (
        identifier: ServiceIdType<T>,
        container: IServiceManager,
        dependency: ServiceIdType<any>
    ): any
    container: IServiceManager
    resolvedDependency: any
    isResolved: boolean
    dependency: ServiceIdType<any>
    proxy: () => ProxyHandler<any>
    identifier: ServiceIdType<T>
    get: (target: any, prop: PropertyKey, receiver: any) => any
    set: (target: any, prop: PropertyKey, value: any) => boolean
    has: (target: any, prop: PropertyKey) => boolean
    ownKeys: (target: any) => ArrayLike<string | symbol>
    getOwnPropertyDescriptor: (target: any, prop: PropertyKey) => PropertyDescriptor | undefined
}

export const LazyDependencyProxy = function <T>(
    this: ILazyDependencyProxy<T>,
    identifier: ServiceIdType<T>,
    container: IServiceManager,
    dependency: ServiceIdType<any>
) {
    this.resolvedDependency = null
    this.isResolved = false
    this.identifier = identifier
    this.dependency = dependency
    this.container = container

    this.proxy = () =>
        new Proxy(this, {
            get: this.get,
            set: this.set,
            has: this.has,
            ownKeys: this.ownKeys,
            getOwnPropertyDescriptor: this.getOwnPropertyDescriptor
        }) as ProxyHandler<any>

    this.get = (target, prop, receiver) => {
        if (!this.isResolved) {
            try {
                this.resolvedDependency = container.resolve(this.dependency)
                this.isResolved = true
            } catch (e: any) {
                throw new Error(
                    `IServiceManager: Failed to resolve dependency ${container.getServiceName(dependency)} 
                    for service ${container.getServiceName(this.identifier)} - ${e.message}`
                )
            }
        }
        const value = this.resolvedDependency[prop]
        return typeof value === 'function' ? value.bind(this.resolvedDependency) : value
    }

    this.set = (target, prop, value) => {
        if (!this.isResolved) {
            try {
                this.resolvedDependency = container.resolve(dependency)
                this.isResolved = true
            } catch (e: any) {
                throw new Error(
                    `IServiceManager: Failed to resolve dependency ${container.getServiceName(dependency)} 
                    for service ${container.getServiceName(this.identifier)} - ${e.message}`
                )
            }
        }
        this.resolvedDependency[prop] = value
        return true
    }

    this.has = (target, prop) => {
        if (!this.isResolved) {
            try {
                this.resolvedDependency = container.resolve(dependency)
                this.isResolved = true
            } catch (e: any) {
                throw new Error(
                    `IServiceManager: Failed to resolve dependency ${container.getServiceName(dependency)} 
                    for service ${container.getServiceName(this.identifier)} - ${e.message}`
                )
            }
        }
        return prop in this.resolvedDependency
    }

    this.ownKeys = (target) => {
        if (!this.isResolved) {
            try {
                this.resolvedDependency = container.resolve(dependency)
                this.isResolved = true
            } catch (e: any) {
                throw new Error(
                    `IServiceManager: Failed to resolve dependency ${container.getServiceName(dependency)}                     
                    for service ${container.getServiceName(this.identifier)} - ${e.message}`
                )
            }
        }
        return Reflect.ownKeys(this.resolvedDependency)
    }

    this.getOwnPropertyDescriptor = (target, prop) => {
        if (!this.isResolved) {
            try {
                this.resolvedDependency = container.resolve(dependency)
                this.isResolved = true
            } catch (e: any) {
                throw new Error(
                    `IServiceManager: Failed to resolve dependency ${container.getServiceName(dependency)} 
                    for service ${container.getServiceName(this.identifier)} - ${e.message}`
                )
            }
        }
        return Reflect.getOwnPropertyDescriptor(this.resolvedDependency, prop)
    }
} as any as ILazyDependencyProxy<any>
