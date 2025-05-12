import { FieldDataTypes } from '@core/framework/common/common.field.data.types'

import { newEvent } from '@core/framework/events/new-event'
import { IValueManager } from '../value-manager.types'

export const setValue = function (
    this: IValueManager,
    value: Omit<FieldDataTypes, 'object' | 'INDate' | 'DateObject'> | null
) {
    switch (this.input.type) {
        case 'checkbox':
            this.setValueCheckBox(value as boolean)
            break
        case 'radio':
            this.setValueRadio(value as string)
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
