import { newEvent } from '@core/events/events.types'
import { IFieldBaseInput } from '../field-input-base-types'

export const onBlur = (f: IFieldBaseInput, e: Event) => {
    const inputElement = e.target as HTMLInputElement

    f.isFocus = false
    f.styler?.update('focus', f.isFocus)

    e.stopPropagation()
    e.preventDefault()

    f?.notifier?.notify('onBlur', newEvent(f.name, onBlur.name, 'onBlur', `field.${onBlur.name}`))
}
