import { IEvents } from '@core/events/events.types'
import {
    IValidationResult,
    IValidationStrategyData
} from '@core/validation-strategy/validation-strategy.types'

export type dataStrategyResultAsyncType = (
    data: IValidationStrategyData
) => Promise<IValidationResult>

export type TNotifierMethod<T = any> = (data?: T) => void

export type TNotifierMethodAsnyc<T = Array<dataStrategyResultAsyncType>> = (data?: T) => void

export interface INotifier {
    event: IEvents
    method: TNotifierMethod
}
