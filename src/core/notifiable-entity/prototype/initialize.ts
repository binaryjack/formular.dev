import { IFieldInitializationParameters } from '@core/factory/builder/field-builder'
import { logManager } from '@core/general-logging-manager/log-manager'
import { INotifiableEntity } from '../notifiable-entity-base.types'

export const initialize = function <T extends HTMLElement>(
    this: INotifiableEntity,
    params: IFieldInitializationParameters
) {
    logManager(undefined, 'info', 'initialize', this.name)
    // this.tracker = tracke
    this.isInitialized = true
}
