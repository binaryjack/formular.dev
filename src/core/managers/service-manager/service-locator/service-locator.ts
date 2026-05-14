import { IServiceManager, ServiceIdType } from '../service-manager.types'

export interface IServiceLocator {
    get<T>(identifier: ServiceIdType<T>): T
    tryGet<T>(identifier: ServiceIdType<T>): T | undefined
    lazy<T>(identifier: ServiceIdType<T>): () => T
}

export const ServiceLocator = function (this: IServiceLocator, sm: IServiceManager) {
    const cache = new Map<ServiceIdType, any>()

    this.get = function <T>(this: IServiceLocator, identifier: ServiceIdType<T>): T {
        if (cache.has(identifier)) {
            return cache.get(identifier) as T
        }
        const service = sm.resolve<T>(identifier)
        cache.set(identifier, service)
        return service
    }

    this.tryGet = function <T>(this: IServiceLocator, identifier: ServiceIdType<T>): T | undefined {
        try {
            return this.get<T>(identifier)
        } catch {
            return undefined
        }
    }

    this.lazy = function <T>(this: IServiceLocator, identifier: ServiceIdType<T>): () => T {
        let resolved = false
        let service: T
        return () => {
            if (!resolved) {
                service = this.get<T>(identifier)
                resolved = true
            }
            return service
        }
    }
} as any as IServiceLocator
