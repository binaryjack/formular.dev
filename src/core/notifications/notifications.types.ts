export type TNotifierType = 'changed' | 'get' | 'validate' | 'clicked'

export type TNotifierMethod = (data?: unknown) => void

export interface INotifier {
    id: string
    type: TNotifierType
    method: TNotifierMethod
}

export const notify = (id: string, method: TNotifierMethod, type: TNotifierType) => {
    return { id, method, type }
}
