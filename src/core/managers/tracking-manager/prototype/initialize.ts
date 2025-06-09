import { logManager } from '@core/managers/log-manager/log-manager'
import { defaultOutputTrackingProvider } from '../tracker-manager.default.provider'
import { ITrackingManager } from '../tracker-manager.types'

export const initialize = function <T extends HTMLElement>(this: ITrackingManager) {
    logManager(undefined, 'info', 'initialize', this.dependencyName)
    this.addProviders([defaultOutputTrackingProvider])
    this.isInitialized = true
    // this.tracker = tracker
}
