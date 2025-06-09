import { IServiceManager } from '../service-manager.types'

export const throwIfDisposed = function (this: IServiceManager): void {
    if (this.isDisposed) {
        throw new Error('IServiceManager: Cannot use disposed service manager')
    }
}
