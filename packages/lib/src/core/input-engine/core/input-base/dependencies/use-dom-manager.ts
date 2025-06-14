import { IDomManager } from '@core/managers/dom-manager/dom-manager.types'
import { logManager } from '@core/managers/log-manager/log-manager'
import { IInputBase } from '../input-base.types'

export const useDomManager = function (
    this: IInputBase,
    domManagerInstance: IDomManager<HTMLInputElement>
): IInputBase {
    try {
        this.domManager = domManagerInstance
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
