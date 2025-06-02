import { newEvent } from '@core/framework/events/new-event'
import { IExtendedInput, IInput } from '@core/input-engine/core/input-base/input-base.types'
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

        discriminatedInput.notificationManager?.notify(
            'onValueChange',
            newEvent(
                this.input.name,
                clear.name,
                'onValueChange',
                'field.selected',
                field.name,
                field as IExtendedInput
            )
        )
    } catch (e) {
        console.error(
            `CLEARING TYPE ${field?.input?.type ?? 'no type found'} in field: ${field?.input?.name ?? field?.name} `,
            e
        )
    }
}
