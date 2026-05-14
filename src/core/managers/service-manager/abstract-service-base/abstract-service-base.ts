import { IServiceLocator } from '../service-locator/service-locator'
import { IServiceManager } from '../service-manager.types'

export interface IAbstractServiceBase {
    new (serviceManager: IServiceManager): IAbstractServiceBase
    serviceLocator: IServiceLocator
    serviceManager: IServiceManager
}

export const AbstractServiceBase = function (
    this: IAbstractServiceBase,
    serviceManager: IServiceManager
) {
    if (!serviceManager) {
        throw new Error(
            'ServiceManager is not provided. Please provide a valid ServiceManager instance.'
        )
    }

    Object.defineProperties(this, {
        serviceManager: {
            get: function () {
                return serviceManager
            },
            enumerable: true,
            configurable: false
        },
        serviceLocator: {
            get: function () {
                return serviceManager
            },
            enumerable: true,
            configurable: false
        }
    })
}
