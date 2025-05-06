import { newEvent } from '@core/events/events.types'
import { IFieldBaseInput } from '../field-input-base-types'

export const onFocus = (f: IFieldBaseInput, e: Event) => {
    f.isFocus = true
    f.styler?.update('focus', f.isFocus)

    e.stopPropagation()
    e.preventDefault()

    f?.notifier?.notify(
        'onFocus',
        newEvent(f.name, onFocus.name, 'onFocus', `field.${onFocus.name}`)
    )
}
