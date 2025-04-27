import { getTrackingDate } from './prototype/get-tracking-date'
import { internalCritical } from './prototype/internal-critical'
import { internalError } from './prototype/internal-error'
import { internalInfo } from './prototype/internal-info'
import { internalWarning } from './prototype/internal-warning'
import { outputProviderSetup } from './prototype/output-provider-setup'
import { print } from './prototype/print'
import { printAll } from './prototype/print-all'
import { setTrackingActive } from './prototype/set-tracking-active'
import { ITracker, ITrackingOutputProvider } from './tracker.types'

export const Tracker = function (this: ITracker, providers?: ITrackingOutputProvider[]) {
    if (providers?.length === 0) {
        console.warn('Tracker was defined using default output provider')
    }

    this._trackingData = []
    this._trackingIsActive = true
} as any as ITracker

Object.assign(Tracker.prototype, {
    setTrackingActive,
    getTrackingDate,
    outputProviderSetup,
    internalCritical,
    internalError,
    internalWarning,
    internalInfo,
    print,
    printAll
})
