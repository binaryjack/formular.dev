import { IExtendedInput, IInput } from '@core/input-engine/core/input-base/input-base.types'
import { IValidationResult } from '@core/managers/validation-manager/validation-manager.types'
import { IValueManager } from '../value-manager.types'

export const clear = function (this: IValueManager, field: IExtendedInput | IInput) {
    try {
        const discriminatedInput = field.dependencyName === 'InputBase' ? field : field.input

        discriminatedInput.value = null
        discriminatedInput.originalValue = null
        discriminatedInput.objectValue = null

        discriminatedInput.isPristine =
            discriminatedInput.originalValue === discriminatedInput.value
        discriminatedInput.isDirty = discriminatedInput.originalValue !== discriminatedInput.value

        discriminatedInput.styleManager?.update('pristine', discriminatedInput.isPristine)
        discriminatedInput.styleManager?.update('dirty', discriminatedInput.isDirty)

        // Always trigger validation after clearing to ensure isValid and style states are updated
        // This ensures validation runs regardless of whether 'onClear' is in the validation trigger modes
        if (discriminatedInput.validationManager && discriminatedInput.shouldValidate) {
            const validationResults = discriminatedInput.validationManager.validate(
                field as IExtendedInput
            )
            discriminatedInput.isValid = validationResults.every(
                (result: IValidationResult) => result.state
            )
            discriminatedInput.validationResults = validationResults

            // Update validation-related styles
            discriminatedInput.styleManager?.update('valid', discriminatedInput.isValid)
            discriminatedInput.styleManager?.update('errors', !discriminatedInput.isValid)
        }

        // discriminatedInput.notificationManager?.debounceNotify(
        //     'onUiUpdate',
        //     conventions.events.onUiUpdate.triggerDelay,
        //     newEvent(
        //         this.input.name,
        //         clear.name,
        //         'onUiUpdate',
        //         'field.selected',
        //         field.name,
        //         field as IExtendedInput
        //     )
        // )
    } catch (e) {
        console.error(
            `CLEARING TYPE ${field?.input?.type ?? 'no type found'} in field: ${field?.input?.name ?? field?.name} `,
            e
        )
    }
}
