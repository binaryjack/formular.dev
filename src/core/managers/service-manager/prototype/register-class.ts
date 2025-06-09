import {
    IServiceManager,
    IServiceOptions,
    ServiceFactoryType,
    ServiceIdType
} from '../service-manager.types'

export const registerClass = function <T>(
    this: IServiceManager,
    constructor: new (...args: any[]) => T,
    options: IServiceOptions = {}
): any {
    this.throwIfDisposed()

    const factory: ServiceFactoryType<T> = (container: IServiceManager, ...paramters: any[]) => {
        const dependencies = [...(options.dependencies ?? []), ...paramters]
        const resolveDependency = dependencies?.map((dependency: ServiceIdType<any>) => {
            return container.resolve(dependency)
        })
        return new constructor(...resolveDependency)
    }
    this.register<T>(constructor, factory, options)
}
