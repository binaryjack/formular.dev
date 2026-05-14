import { ServiceManager } from '../service-manager'
import { IServiceManager } from '../service-manager.types'

export const createScope = function (this: IServiceManager): any {
    this.throwIfDisposed()
    return new ServiceManager(this)
}
