import { newEvent } from '@core/framework/events/events.types'
import { IFieldBaseInput } from '../field-input-base-types'

export const onFocus = (f: IFieldBaseInput, e: Event) => {
    f.isFocus = true
    f.styleManager?.update('focus', f.isFocus)
    console.log('onFocus', f.name, f.value)
    e.stopPropagation()
    e.preventDefault()

    f?.notificationManager?.notify(
        'onFocus',
        newEvent(f.name, onFocus.name, 'onFocus', `field.${onFocus.name}`)
    )
}
