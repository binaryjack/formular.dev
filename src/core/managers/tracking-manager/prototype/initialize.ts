import { IFieldInitializationParameters } from '@core/field-engine/generator/builder/field-builder'

import { logManager } from '@core/managers/log-manager/log-manager'
import { defaultOutputTrackingProvider } from '../tracker-manager.default.provider'
import { ITrackingManager } from '../tracker-manager.types'

export const initialize = function <T extends HTMLElement>(
    this: ITrackingManager,
    params: IFieldInitializationParameters
) {
    logManager(undefined, 'info', 'initialize', this.dependencyName)

    if (params.trackingStrategies.length === 0) {
        logManager(
            undefined,
            'warning',
            this.dependencyName,
            `No tracking outputProvider was provided, the default outputProvider will operate.`
        )

        this.addProviders([defaultOutputTrackingProvider])
    } else {
        this.addProviders(params.trackingStrategies)
    }

    this.isInitialized = true
    // this.tracker = tracker
}
