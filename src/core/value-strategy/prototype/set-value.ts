import { FieldDataTypes } from '@core/framework/common/common.field.data.types'
import { newEvent } from '../../events/events.types'
import { IValueStrategy } from '../value-strategy.types'

export const setValue = function (
    this: IValueStrategy,
    value: Omit<FieldDataTypes, 'object' | 'INDate' | 'DateObject'> | null
) {
    switch (this.field.type) {
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

    this.field.styler?.update('dirty', this.field.originalValue !== this.field.value)

    this.field.notifier?.notify(
        'onChange',
        newEvent(this.name, setValue.name, 'onChange', `field.${setValue.name}`)
    )

    // this.observers.trigger()
}
