import { defaultOutputTrackingProvider } from '../tracker-manager.default.provider'
import { ITrackingManager } from '../tracker-manager.types'

export const initialize = function <T extends HTMLElement>(this: ITrackingManager) {
    this.addProviders([defaultOutputTrackingProvider])
    this.isInitialized = true
    // this.tracker = tracker
}
