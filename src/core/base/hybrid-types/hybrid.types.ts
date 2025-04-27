import { TNotifierEventsType } from '../../notifiable-entity/notifications.types'
import { ValidationTriggerModeType } from '../validation-strategy/validator.types'

export interface ITriggerableNotifiableEntity {
    _notify: (
        type: TNotifierEventsType,
        fieldState: string,
        trigger: ValidationTriggerModeType
    ) => void
}
