import { IServiceManager, ServiceIdType } from '../service-manager.types'

export const findServiceDescriptor = function (this: IServiceManager, identifier: ServiceIdType) {
    if (this.services.has(identifier)) {
        return this.services.get(identifier)
    }
    /** Chain of responsibility pattern */
    return this.parent?.findServiceDescriptor(identifier)
}
