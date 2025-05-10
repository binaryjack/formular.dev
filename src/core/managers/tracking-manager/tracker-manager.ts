import { addProviders } from './prototype/add-providers'
import { getTrackingDate } from './prototype/get-tracking-date'
import { initialize } from './prototype/initialize'
import { internalCritical } from './prototype/internal-critical'
import { internalError } from './prototype/internal-error'
import { internalInfo } from './prototype/internal-info'
import { internalWarning } from './prototype/internal-warning'
import { print } from './prototype/print'
import { printAll } from './prototype/print-all'
import { setTrackingActive } from './prototype/set-tracking-active'
import { ITrackingManager, ITrackingOutputProvider } from './tracker-manager.types'

export const TrackingManager = function (
    this: ITrackingManager,
    providers?: ITrackingOutputProvider[]
) {
    if (providers?.length === 0) {
        console.warn('Tracker was defined using default output provider')
    }

    this._trackingData = []
    this._outputProviders = providers ?? []
    this._trackingIsActive = true
    this.dependencyName = TrackingManager.name
} as any as ITrackingManager

Object.assign(TrackingManager.prototype, {
    setTrackingActive,
    getTrackingDate,
    addProviders,
    initialize,
    internalCritical,
    internalError,
    internalWarning,
    internalInfo,
    print,
    printAll
})
