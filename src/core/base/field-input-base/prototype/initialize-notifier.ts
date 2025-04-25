import { TNotifierEventsType } from '../../../notifications/notifications.types'
import { ValidationTriggerModeType } from '../../validation-strategy/validator.types'
import { newValidationOrogin } from '../../validation-strategy/validators.constructors'
import { IFieldInput } from '../field-input.types'

export const initializeNotifier = function (this: IFieldInput) {
    return function (
        this: IFieldInput,
        type: TNotifierEventsType,
        fieldState: string,
        trigger: ValidationTriggerModeType
    ) {
        this.notify(
            type,
            newValidationOrogin(
                fieldState,
                this.validationTriggerModeType.includes(trigger) ? trigger : 'reset'
            )
        )
    }
}
