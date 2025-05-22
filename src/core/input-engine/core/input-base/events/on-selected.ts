import { newEvent } from '@core/framework/events/new-event'
import { IExtendedInput } from '../input-base.types'

export const onBlur = (f: IExtendedInput, e: Event) => {
    const inputElement = e.target as HTMLInputElement

    f.input.isFocus = false
    f.input.styleManager?.update('focus', f.input.isFocus)

    // e.preventDefault()

    f?.input.notificationManager?.notify(
        'onBlur',
        newEvent(f.input.name, onBlur.name, 'onBlur', `field.${onBlur.name}`, f.input.name, f)
    )

    e.stopPropagation()
}
