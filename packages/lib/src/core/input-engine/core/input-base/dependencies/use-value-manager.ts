import { logManager } from '@core/managers/log-manager/log-manager'
import { IValueManager, SValueManager } from '@core/managers/value-manager/value-manager.types'
import { IInputBase } from '../input-base.types'

export const useValueManager = function (
    this: IInputBase,
    valueManagerInstance: IValueManager | null
): IInputBase {
    try {
        // 🎯 OPTIMIZATION: Lazy value manager
        if (valueManagerInstance !== null) {
            this.valueManager = valueManagerInstance
        } else {
            // Define lazy getter that resolves on first access
            let _valueManager: IValueManager | null = null
            Object.defineProperty(this, 'valueManager', {
                get: function () {
                    if (!_valueManager && this.serviceManager) {
                        _valueManager = this.serviceManager.lazy<IValueManager>(SValueManager)?.()
                    }
                    return _valueManager
                },
                set: function (value: IValueManager) {
                    _valueManager = value
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
            useValueManager.name,
            `an error has occured when initializing initializeValueStrategy ${this.name} class: ${e.message}`
        )
        return this
    }
}
