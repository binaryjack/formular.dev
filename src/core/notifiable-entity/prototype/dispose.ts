import { INotifiableEntity } from '../notifiable-entity-base.types'
import { newAutoTrackingData } from '../notifications.types'

/**
 * Disposes of the entity by unsubscribing all observers.
 */
export function dispose(this: INotifiableEntity) {
    this.observers.unSubscribeAll()
    if (this.autoTracker) {
        this.autoTracker?.notify(
            'autoTrack_accepted',
            newAutoTrackingData(`UNSUBSCRIPTION`, `ALL`, {})
        )
        this.autoTracker?.observers.trigger()
    }
}
