import { TNotifierMethod } from '@core/notifiable-entity/notifications.types'
import { ISignal } from '../signals/signal.type'

export type TEffectBody = () => void

export interface IEffect {
    new (id: string): IEffect
    id: string
    actionMethod: TEffectBody | null
    dependencies: ISignal<unknown>[]
    initialized: boolean
    effect: (callback: TEffectBody, dependencies: ISignal<unknown>[]) => void
    body: (callback: () => void) => void
    notify: TNotifierMethod
    dispose: () => void
}
