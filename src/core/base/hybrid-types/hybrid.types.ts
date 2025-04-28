import { EventsType, IEvents } from '../events/events.types'

export interface ITriggerableNotifiableEntity {
    _notify: (type: EventsType, event: IEvents) => void
}
