import { IValidationResult, IValidatorStrategyData } from '../base/validatiors/validator.types'

export type TNotifierEventsType =
    | 'changed'
    | 'get'
    | 'validate'
    | 'isValidating'
    | 'clicked'
    | 'blurred'
    | 'focused'
    | 'selected'
    | 'formattingStateChanged'
    | 'engineStateChanged'

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

export const notify = <T>(
    id: string,
    method: TNotifierMethod<T> | TNotifierMethodAsnyc<T>,
    type: TNotifierEventsType
) => {
    return { id, method, type }
}
