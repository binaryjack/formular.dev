import { IEvents } from '../base/events/events.types'
import {
    IValidationResult,
    IValidatorStrategyData
} from '../base/validation-strategy/validator.types'

export type dataStrategyResultAsyncType = (
    data: IValidatorStrategyData
) => Promise<IValidationResult>

export type TNotifierMethod<T = any> = (data?: T) => void

export type TNotifierMethodAsnyc<T = Array<dataStrategyResultAsyncType>> = (data?: T) => void

export interface INotifier {
    event: IEvents
    method: TNotifierMethod
}
