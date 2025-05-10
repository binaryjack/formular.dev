import { TNotifierMethod } from '@core/managers/notification-manager/notification-manager.types'
import { ISignal } from '../signal.type'

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
