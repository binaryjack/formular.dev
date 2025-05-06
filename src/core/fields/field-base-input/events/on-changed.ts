import { newEvent } from '@core/events/events.types'
import { IFieldBaseInput } from '../field-input-base-types'

export const onChange = (f: IFieldBaseInput, e: Event) => {
    const inputElement = e.target as HTMLInputElement

    f.value = inputElement.value
    f.isPristine = f.originalValue === f.value
    f.styler?.update('pristine', f.isPristine)
    f.isDirty = f.originalValue !== f.value
    f.styler?.update('dirty', f.isDirty)

    f?.notifier?.notify(
        'onChange',
        newEvent(f.name, onChange.name, 'onChange', `field.${onChange.name}`)
    )

    e.stopPropagation()
}
