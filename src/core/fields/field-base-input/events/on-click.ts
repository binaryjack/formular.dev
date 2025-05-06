import { newEvent } from '@core/events/events.types'
import { IFieldBaseInput } from '../field-input-base-types'

export const onClick = (f: IFieldBaseInput, e: Event) => {
    const inputElement = e.target as HTMLInputElement

    f.styler?.update('dirty', f.originalValue !== f.value)

    e.stopPropagation()
    e.preventDefault()

    f?.notifier?.notify(
        'onClick',
        newEvent(f.name, onClick.name, 'onClick', `field.${onClick.name}`)
    )
}
