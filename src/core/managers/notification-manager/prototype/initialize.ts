import { IFieldInitializationParameters } from '@core/input-engine/generator/builder/field-builder'

import { logManager } from '@core/managers/log-manager/log-manager'
import { INotificationManager } from '../notification-manager-base.types'

export const initialize = function <T extends HTMLElement>(
    this: INotificationManager,
    params: IFieldInitializationParameters
) {
    logManager(undefined, 'info', 'initialize', this.name)
    // this.tracker = tracke
    this.isInitialized = true
}
