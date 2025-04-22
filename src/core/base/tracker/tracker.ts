import {
    ITracker,
    ITrackingData,
    ITrackingOutputProvider,
    newDtId,
    newTrackingData
} from './tracker.types'

export const Tracker = function (this: ITracker, providers?: ITrackingOutputProvider[]) {
    if (providers?.length === 0) {
        console.warn('Tracker was defined using default output provider')
    }

    this._trackingData = []
    this._trackingIsActive = true
} as any as ITracker

Object.assign(Tracker.prototype, {
    setTrackingActive: function (this: ITracker, active: boolean) {
        this._trackingIsActive = active
    },
    getTrackingDate: function (this: ITracker) {
        if (!this._trackingIsActive) return
        return this._trackingData
    },
    outputProviderSetup: function (this: ITracker, providers?: ITrackingOutputProvider[]) {
        this._outputProviders = providers ? [...providers] : []
    },
    internalCritical: function (this: ITracker, source: string, message: string) {
        if (!this._trackingIsActive) return
        const dt = newTrackingData(newDtId(this._trackingData), 'critical', source, message)
        this._trackingData.push(dt)
        this.print(dt)
    },
    internalError: function (this: ITracker, source: string, message: string) {
        if (!this._trackingIsActive) return
        const dt = newTrackingData(newDtId(this._trackingData), 'error', source, message)
        this._trackingData.push(dt)
        this.print(dt)
    },
    internalWarning: function (this: ITracker, source: string, message: string) {
        if (!this._trackingIsActive) return
        const dt = newTrackingData(newDtId(this._trackingData), 'warning', source, message)
        this._trackingData.push(dt)
        this.print(dt)
    },
    internalInfo: function (this: ITracker, source: string, message: string) {
        if (!this._trackingIsActive) return
        const dt = newTrackingData(newDtId(this._trackingData), 'info', source, message)
        this._trackingData.push(dt)
        this.print(dt)
    },
    print: function (this: ITracker, data: ITrackingData) {
        if (!this._trackingIsActive) return
        if (this._outputProviders?.length === 0) {
            return
        }

        this._outputProviders.forEach((p) => {
            p.func(data)
        })
    },
    printAll: function (this: ITracker) {
        if (!this._trackingIsActive) return
        if (this._outputProviders?.length === 0) {
            return
        }

        this._outputProviders.forEach((p) => {
            p.funcAll(this._trackingData)
        })
    }
})
