export const SServiceManager = Symbol.for('IServiceManager')

export type ServiceLifeCycleType = 'singleton' | 'transient' | 'scoped'

export type ServiceIdType<T = any> = null | string | symbol | (new (...args: any[]) => T)

export type ServiceFactoryType<T = any> = (container: IServiceManager, ...parameters: any[]) => T

export interface IServiceDescriptor<T = any> {
    identifier: ServiceIdType<T>
    factory: ServiceFactoryType<T>
    lifetime: ServiceLifeCycleType
    dependencies?: ServiceIdType[]
}

export interface IServiceOptions {
    lifetime?: ServiceLifeCycleType
    dependencies?: ServiceIdType[]
}

export interface IDisposableService {
    dispose(): void
}

export interface IServiceManager {
    new (parent?: IServiceManager): IServiceManager
    readonly resolutionStack: Set<ServiceIdType>
    readonly services: Map<ServiceIdType, IServiceDescriptor>
    readonly singletonInstances: Map<ServiceIdType, any>
    readonly scopedInstances: Map<ServiceIdType, any>
    readonly parent?: IServiceManager
    isDisposed: boolean
    register: <T>(
        identifier: ServiceIdType<T>,
        factory: ServiceFactoryType<T>,
        options?: IServiceOptions
    ) => IServiceManager
    registerClass<T>(
        identifier: ServiceIdType<T>,
        constructor: new (...args: any[]) => T,
        options?: IServiceOptions
    ): IServiceManager
    validateNoCycles: () => void
    registerInstance: <T>(identifier: ServiceIdType<T>, instance: T) => IServiceManager
    resolve: <T>(identifier: ServiceIdType<T>, ...parameters: any[]) => T
    tryResolve: <T>(identifier: ServiceIdType<T>, ...parameters: any[]) => T | undefined
    lazy: <T>(identifier: ServiceIdType<T>, ...parameters: any[]) => () => T
    isRegistered: <T>(identifier: ServiceIdType<T>) => boolean
    throwIfDisposed: () => void
    getServiceName: <T>(identifier: ServiceIdType<T>) => string
    createScope: () => IServiceManager
    findServiceDescriptor: <T>(identifier: ServiceIdType<T>) => IServiceDescriptor | undefined
    dispose: () => void
}
