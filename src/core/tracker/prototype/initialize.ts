import { IFieldInitializationParameters } from '@core/factory/builder/field-builder'
import { logManager } from '@core/general-logging-manager/log-manager'
import { defaultOutputTrackingProvider } from '../tracker.default.provider'
import { ITracker } from '../tracker.types'

export const initialize = function <T extends HTMLElement>(
    this: ITracker,
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
