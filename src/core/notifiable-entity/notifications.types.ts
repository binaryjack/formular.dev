import {
    IValidationResult,
    IValidatorStrategyData
} from '../base/validation-strategy/validator.types'

export interface INotificationAutotrackingData {
    origin: string
    functionName: string
    data: any
}

export const newAutoTrackingData = (origin: string, functionName: string, data: any) => {
    return { origin, functionName, data }
}

export enum NotifierEventsEnum {
    changed = 'changed',
    get = 'get',
    validate = 'validate',
    isValidating = 'isValidating',
    clicked = 'clicked',
    blurred = 'blurred',
    focused = 'focused',
    selected = 'selected',
    formattingStateChanged = 'formattingStateChanged',
    engineStateChanged = 'engineStateChanged',
    autoTrack_accepted = 'autoTrack_accepted',
    autoTrack_subscription = 'autoTrack_subscription',
    autoTrack_notification = 'autoTrack_notification'
}

export type TNotifierEventsType = keyof typeof NotifierEventsEnum

export type dataStrategyResultAsyncType = (
    data: IValidatorStrategyData
) => Promise<IValidationResult>

export type TNotifierMethod<T = any> = (data?: T) => void

export type TNotifierMethodAsnyc<T = Array<dataStrategyResultAsyncType>> = (data?: T) => void

export interface INotifier {
    id: string
    type: TNotifierEventsType
    method: TNotifierMethod
}
