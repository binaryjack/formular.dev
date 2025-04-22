import { TNotifierEventsType } from '../../../notifications/notifications.types'
import { ValidationTriggerModeType } from '../../validatiors/validator.types'
import { newValidationOrogin } from '../../validatiors/validators.constructors'
import { IFieldInput } from '../fieldInput.types'

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
