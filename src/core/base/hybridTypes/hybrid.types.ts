import { TNotifierEventsType } from '../../notifications/notifications.types'
import { ValidationTriggerModeType } from '../validatiors/validator.types'

export interface ITriggerableNotifiableEntity {
    _notify: (
        type: TNotifierEventsType,
        fieldState: string,
        trigger: ValidationTriggerModeType
    ) => void
}
