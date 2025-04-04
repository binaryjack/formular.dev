export type TNotifierEventsType =
    | 'changed'
    | 'get'
    | 'validate'
    | 'clicked'
    | 'blurred'
    | 'focused'
    | 'selected'

export type TNotifierMethod = (data?: unknown) => void

export interface INotifier {
    id: string
    type: TNotifierEventsType
    method: TNotifierMethod
}

export const notify = (id: string, method: TNotifierMethod, type: TNotifierEventsType) => {
    return { id, method, type }
}
