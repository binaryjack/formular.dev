import { newEvent } from '@core/framework/events/new-event'
import { IExtendedInput } from '../input-base.types'

export const onFocus = (f: IExtendedInput, e: Event) => {
    f.input.isFocus = true
    f.input.styleManager?.update('focus', f.input.isFocus)

    f?.input.notificationManager?.notify(
        'onFocus',
        newEvent(f.input.name, onFocus.name, 'onFocus', `field.${onFocus.name}`)
    )
    e.stopPropagation()
    e.preventDefault()
}
