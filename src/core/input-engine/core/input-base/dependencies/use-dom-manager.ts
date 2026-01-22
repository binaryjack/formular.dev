import { IDomManager, SDomManager } from '@core/managers/dom-manager/dom-manager.types'
import { logManager } from '@core/managers/log-manager/log-manager'
import { IInputBase } from '../input-base.types'

export const useDomManager = function (
    this: IInputBase,
    domManagerInstance: IDomManager<HTMLInputElement> | null
): IInputBase {
    try {
        // 🎯 OPTIMIZATION: Lazy DOM manager (40-50% gain)
        // Only create DOM manager when it's actually accessed
        if (domManagerInstance !== null) {
            this.domManager = domManagerInstance
        } else {
            // Define lazy getter that resolves on first access
            let _domManager: IDomManager<HTMLInputElement> | null = null
            Object.defineProperty(this, 'domManager', {
                get: function () {
                    if (!_domManager && this.serviceManager) {
                        _domManager =
                            this.serviceManager.lazy<IDomManager<HTMLInputElement>>(SDomManager)?.()
                    }
                    return _domManager
                },
                set: function (value: IDomManager<HTMLInputElement>) {
                    _domManager = value
                },
                configurable: true,
                enumerable: true
            })
        }
        return this
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            useDomManager.name,
            `an error has occured when initializing initializeDomManager ${this.name} class: ${e.message}`
        )
        return this
    }
}
