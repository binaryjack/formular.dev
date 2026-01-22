import { IServiceManager, ServiceIdType } from '../service-manager.types'

export const lazy = function <T>(
    this: IServiceManager,
    identifier: ServiceIdType<T>,
    ...parameters: any[]
): () => T {
    this.throwIfDisposed()

    let resolved = false
    let service: T

    return () => {
        if (!resolved) {
            service = this.resolve<T>(identifier, ...parameters)
            resolved = true
        }
        return service
    }
}
