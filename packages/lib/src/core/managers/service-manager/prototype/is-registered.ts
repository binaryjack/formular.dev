import { IServiceManager, ServiceIdType } from '../service-manager.types'

export const isRegistered = function <T>(
    this: IServiceManager,
    identifier: ServiceIdType<T>
): boolean {
    return this.findServiceDescriptor(identifier) !== undefined
}
