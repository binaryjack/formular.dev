import { newEvent } from '@core/events/events.types'
import { IFieldInput } from '../field-input-base-types'

export const onFocus = (f: IFieldInput, e: Event) => {
    f.isFocus = true
    f.style()?.fieldStateStyle.update('focus', f.isFocus)

    e.stopPropagation()
    e.preventDefault()

    f
        ?.notifier()
        ?.notify('onFocus', newEvent(f.name, onFocus.name, 'onFocus', `field.${onFocus.name}`))
}
