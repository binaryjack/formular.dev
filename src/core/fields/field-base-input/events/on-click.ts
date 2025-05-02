import { newEvent } from '@core/events/events.types'
import { IFieldInput } from '../field-input-base-types'

export const onClick = (f: IFieldInput, e: Event) => {
    const inputElement = e.target as HTMLInputElement

    f.style()?.fieldStateStyle.update('dirty', f.originalValue !== f.value)

    e.stopPropagation()
    e.preventDefault()

    f
        ?.notifier()
        ?.notify('onClick', newEvent(f.name, onClick.name, 'onClick', `field.${onClick.name}`))
}
