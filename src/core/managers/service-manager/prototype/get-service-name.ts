import { IServiceManager, ServiceIdType } from '../service-manager.types'

export const getServiceName = function (
    this: IServiceManager
): (identifier: ServiceIdType) => string {
    this.throwIfDisposed()

    return (identifier: ServiceIdType): string => {
        if (typeof identifier === 'string') {
            return identifier
        }
        if (typeof identifier === 'symbol') {
            return identifier.toString()
        }
        if (typeof identifier === 'function') {
            return identifier.name ?? 'AnonymousClass'
        }
        throw new Error('IServiceManager: Invalid service identifier type')
    }
}
