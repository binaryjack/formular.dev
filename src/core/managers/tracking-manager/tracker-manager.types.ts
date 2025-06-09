import { IInitializableDependency } from '../initialization-manager/initialization-manager.types'

export const STrackingManager = Symbol.for('ITrackingManager')
export const STrackingOutputProvider = Symbol.for('ITrackingOutputProvider')

export type TrackingType = 'warning' | 'info' | 'error' | 'critical'

export interface ITrackingOutputProvider {
    new (): ITrackingOutputProvider
    id: string
    funcAll: (data: ITrackingData[]) => void
    func: (data: ITrackingData) => void
}

export interface ITrackingData {
    id: string
    ts: string
    type: TrackingType
    source: string
    message: string
}

export const newDtId = (dts: ITrackingData[]) => {
    const newId = dts.length + 1
    return newId.toString().padStart(10, '0')
}

export const newTrackingData = (
    id: string,
    type: TrackingType,
    source: string,
    message: string
) => {
    const currentTimestamp = new Date().toISOString()
    return {
        id,
        ts: currentTimestamp,
        type,
        source,
        message
    }
}

export interface ITrackingManager extends IInitializableDependency {
    new (providers?: ITrackingOutputProvider[]): ITrackingManager
    _trackingData: ITrackingData[]
    _trackingIsActive: boolean
    _outputProviders: ITrackingOutputProvider[]
    setTrackingActive: (active: boolean) => void
    getTrackingDate: () => ITrackingData[]
    addProviders: (providers?: ITrackingOutputProvider[]) => void
    internalCritical: (source: string, message: string) => void
    internalError: (source: string, message: string) => void
    internalWarning: (source: string, message: string) => void
    internalInfo: (source: string, message: string) => void
    print: (data: ITrackingData) => void
    printAll: () => void
}
