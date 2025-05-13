import { IEvents } from '@core/framework/events/events.types'
import {
    IValidationResult,
    IValidationStrategyData
} from '../validation-manager/validation-manager.types'

export type dataStrategyResultAsyncType = (
    data: IValidationStrategyData
) => Promise<IValidationResult>

export type TNotificationMethod<T = any> = (data?: T) => void

export type TNotificationMethodAsnyc<T = Array<dataStrategyResultAsyncType>> = (data?: T) => void

export interface INotification {
    event: IEvents
    method: TNotificationMethod
}
