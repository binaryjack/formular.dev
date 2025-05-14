import { InputDataTypes } from '@core/framework/common/common.input.data.types'

import { newEvent } from '@core/framework/events/new-event'
import { IInput } from '@core/input-engine/core/input-base/input-base.types'
import { IValueManager } from '../value-manager.types'

export const setValue = function (
    this: IValueManager,
    field: IInput,
    value: InputDataTypes | null
) {
    switch (this.input.type) {
        case 'checkbox':
            this.setValueCheckBox(field, value as boolean)
            break
        case 'radio':
            this.setValueRadio(field, value as string)
            break
        case 'select':
            this.setValueSelect(value as string)
            break
        case 'text':
        case 'email':
        case 'date':
        case 'password':
        case 'range':
        case 'tel':
        case 'toggle':
        case 'richtext':
        case 'number':
        case 'time':
        case 'url':
        default:
            this.setValueText(value as string)
            break
    }

    this.input.styleManager?.update('dirty', this.input.originalValue !== this.input.value)

    this.input.notificationManager?.notify(
        'onChange',
        newEvent(this.name, setValue.name, 'onChange', `field.${setValue.name}`)
    )

    // this.observers.trigger()
}
