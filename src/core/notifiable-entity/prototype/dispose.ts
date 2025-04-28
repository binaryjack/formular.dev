import { INotifiableEntity } from '../notifiable-entity-base.types'

/**
 * Disposes of the entity by unsubscribing all observers.
 */
export function dispose(this: INotifiableEntity) {
    this.observers.unSubscribeAll()
    this.notifiers.clear()
}
