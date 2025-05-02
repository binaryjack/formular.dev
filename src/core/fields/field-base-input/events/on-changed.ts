import { newEvent } from '@core/events/events.types'
import { IFieldInput } from '../field-input-base-types'

export const onChange = (f: IFieldInput, e: Event) => {
    const inputElement = e.target as HTMLInputElement

    f.value = inputElement.value
    f.isPristine = f.originalValue === f.value
    f.style()?.fieldStateStyle.update('pristine', f.isPristine)
    f.isDirty = f.originalValue !== f.value
    f.style()?.fieldStateStyle.update('dirty', f.isDirty)

    f
        ?.notifier()
        ?.notify('onChange', newEvent(f.name, onChange.name, 'onChange', `field.${onChange.name}`))

    e.stopPropagation()
}
