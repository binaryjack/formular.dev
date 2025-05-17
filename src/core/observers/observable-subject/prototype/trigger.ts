import { IObservableSubject } from '../observable-subject.types'

/**
 * Executes all observer functions in the list of observers.
 */
export function trigger<T = any>(this: IObservableSubject) {
    // this.observers.forEach((o: WeakRef<observableFunction>) => {
    //     o.deref?.()?.call(this)
    // })

    this.observers = this.observers.filter((ref) => {
        const obs = ref.deref()
        if (obs) {
            obs?.call(this)
            return true
        }
        return false
    })
}
