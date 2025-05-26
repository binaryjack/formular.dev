import { IExtendedInput, IInput } from '@core/input-engine/core/input-base/input-base.types'
import { IValueManager } from '../value-manager.types'

export const clear = function (this: IValueManager, field: IExtendedInput | IInput) {
    try {
        const discriminatedInput = field.dependencyName === 'InputBase' ? field : field.input

        discriminatedInput.value = null
        discriminatedInput.originalValue = null

        discriminatedInput.isPristine = field.input.originalValue === field.input.value
        discriminatedInput.isDirty = field.input.originalValue !== field.input.value

        discriminatedInput.styleManager?.update('pristine', field.input.isPristine)
        discriminatedInput.styleManager?.update('dirty', field.input.isDirty)
    } catch (e) {
        console.error(`CLEARING TYPE ${this.input.type} in field: ${this.input.name} `, e)
    }
}
