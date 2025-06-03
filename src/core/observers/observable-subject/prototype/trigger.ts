import { IObservableSubject } from '../observable-subject.types'

/**
 * Executes all observer functions in the list of observers.
 */
export function trigger<T = any>(this: IObservableSubject) {
    // this.observers.forEach((o: WeakRef<observableFunction>) => {
    //     o.deref?.()?.call(this)
    // })
    this.observersStrong.forEach((obs) => {
        if (obs) {
            obs?.call(this)
        }
    })

    this.observersWeak.forEach((ref) => {
        const obs = ref.deref()
        if (obs) {
            obs?.call(this)
        }
    })
}
