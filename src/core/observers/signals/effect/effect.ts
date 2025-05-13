import { notification } from '@core/managers/notification-manager/utils/new-notification-visitor'
import { IEffect, TEffectBody } from '@core/observers/signals/effect/effect.type'
import { ISignal } from '../signal.type'

export const Effects = (function () {
    const cache: Map<string, IEffect> = new Map<string, IEffect>()

    const Effect = function (this: IEffect, id: string) {
        this.id = id
        this.actionMethod = null
        this.dependencies = []
        this.initialized = false
    } as any as IEffect

    Effect.prototype = {
        _init: function () {
            if (this.dependencies)
                for (const d of this.dependencies) {
                    d.accept(
                        notification(this, this.notify, 'onChange', 'onChange', this.notify.name)
                    )
                    this.initialized = true
                }
        },
        effect: function (callback: TEffectBody, dependencies: ISignal<unknown>[]) {
            if (this.initialized) {
                return
            }
            this.actionMethod = callback
            this.dependencies = dependencies
            this._init()
        },
        notify: function () {
            if (this.actionMethod) this.actionMethod?.()
        },
        dispose: function () {
            console.log('dispose effect')
            this.dependencies = null
            this.actionMethod = null
        }
    }

    const createEffectInstance = (id: string): IEffect => {
        const _tempEffect = new Effect(id)
        if (cache.has(id)) {
            return cache.get(id)!
        }
        cache.set(id, _tempEffect)
        return _tempEffect
    }

    return {
        createEffectInstance
    }
})()
