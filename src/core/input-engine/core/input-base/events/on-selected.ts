import { newEvent } from '@core/framework/events/new-event'
import { IExtendedInput } from '../input-base.types'

export const onBlur = (f: IExtendedInput, e: Event) => {
    const inputElement = e.target as HTMLInputElement

    f.isFocus = false
    f.styleManager?.update('focus', f.isFocus)

    e.stopPropagation()
    e.preventDefault()

    f?.notificationManager?.notify(
        'onBlur',
        newEvent(f.name, onBlur.name, 'onBlur', `field.${onBlur.name}`)
    )
}
