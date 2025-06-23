import { DataStrategyResultAsyncType } from './data-strategy-result-async.type'

export type TNotificationMethodAsyncType<T = Array<DataStrategyResultAsyncType>> = (
    data?: T
) => void
