import { InputDataTypes } from '@core/framework/common/common.input.data.types'

import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { IValueManager } from '../value-manager.types'

export const setValue = function (
    this: IValueManager,
    field: IExtendedInput,
    value: InputDataTypes | null
) {
    const strategy = this.valueStrategies.find((s) => s.concernedTypes.includes(field.input.type))

    if (!strategy) {
        console.error(`NO PARSER STRATEGY FOUND FOR THIS TYPE ${this.input.type} `)
        return
    }
    try {
        strategy.setter(field, value)

        field.input.isPristine = field.input.originalValue === field.input.value
        field.input.isDirty = field.input.originalValue !== field.input.value

        field.input.styleManager?.update('pristine', field.input.isPristine)
        field.input.styleManager?.update('dirty', field.input.isDirty)

        // field.input?.notificationManager?.debounceNotify(
        //     'onUiUpdate',
        //     conventions.events.onUiUpdate.triggerDelay,
        //     newEvent(
        //         this.input.name,
        //         setValue.name,
        //         'onUiUpdate',
        //         `field.option.label.${setValue.name}`,
        //         field.input.name,
        //         field as unknown as IExtendedInput
        //     )
        // )
    } catch (e) {
        console.error(`PARSING ERROR FOR TYPE ${this.input.type} in field: ${this.input.name} `, e)
    }
}
