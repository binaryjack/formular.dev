import { INotifier } from '../notifications/notifications.types'
import { ISignal, SignalType } from '../signals/signal.type'

export interface ITracker {
    new (): ITracker
    signals: ISignal<SignalType>[]
    notifiers: Map<string, INotifier>
    onChanged: () => void
}
