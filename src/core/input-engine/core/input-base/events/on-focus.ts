import { newEvent } from '@core/framework/events/new-event'
import { IInputBase } from '../input-base.types'

export const onFocus = (f: IInputBase, e: Event) => {
    f.isFocus = true
    f.styleManager?.update('focus', f.isFocus)

    f?.notificationManager?.notify(
        'onFocus',
        newEvent(f.name, onFocus.name, 'onFocus', `field.${onFocus.name}`)
    )
    e.stopPropagation()
    e.preventDefault()
}
