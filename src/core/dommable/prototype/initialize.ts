import { IFieldInitializationParameters } from '@core/factory/builder/field-builder'
import { logManager } from '@core/general-logging-manager/log-manager'
import { IDommable } from '../dommable.types'

export const initialize = function <T extends HTMLElement>(
    this: IDommable<T>,
    params: IFieldInitializationParameters
) {
    logManager(undefined, 'info', 'initialize', this.dependencyName)
    // this.tracker = tracker
    this.isInitialized = true
}
