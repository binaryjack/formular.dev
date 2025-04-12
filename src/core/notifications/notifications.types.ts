export type TNotifierEventsType =
    | 'changed'
    | 'get'
    | 'validate'
    | 'clicked'
    | 'blurred'
    | 'focused'
    | 'selected'
    | 'formattingStateChanged'

export type TNotifierMethod<T = any> = (data?: T) => void

export interface INotifier {
    id: string
    type: TNotifierEventsType
    method: TNotifierMethod
}

export const notify = <T>(id: string, method: TNotifierMethod<T>, type: TNotifierEventsType) => {
    return { id, method, type }
}
