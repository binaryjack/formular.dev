import { logManager } from '@core/managers/log-manager/log-manager'
import { IStyleManager, SStyleManager } from '@core/managers/style-manager/style-manager.types'
import { IInputBase } from '../input-base.types'

export const useStyleManager = function (
    this: IInputBase,
    styleManager: IStyleManager | null
): IInputBase {
    try {
        if (!styleManager) {
            // 🎯 OPTIMIZATION: Lazy style manager
            let _styleManager: IStyleManager | null = null
            Object.defineProperty(this, 'styleManager', {
                get: function () {
                    if (!_styleManager && this.serviceManager) {
                        _styleManager = this.serviceManager.lazy<IStyleManager>(SStyleManager)?.()
                        if (_styleManager) {
                            _styleManager.input = this
                        }
                    }
                    return _styleManager
                },
                set: function (value: IStyleManager) {
                    _styleManager = value
                    if (_styleManager) {
                        _styleManager.input = this
                    }
                },
                configurable: true,
                enumerable: true
            })
        } else {
            this.styleManager = styleManager
            this.styleManager.input = this
        }
        return this
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            useStyleManager.name,
            `an error has occured when initializing initializeStyle ${this.name} class: ${e.message}`
        )
        return this
    }
}
