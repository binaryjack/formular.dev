import { conventions } from '@components/context/conventions/conventions'
import { newEvent } from '@core/framework/events/new-event'
import { IExtendedInput } from '../input-base.types'

export const onBlur = (f: IExtendedInput, e: Event) => {
    const inputElement = e.target as HTMLInputElement
    // console.log('onBlur', f.name, inputElement.value)
    f.input.isFocus = false
    f.input.styleManager?.update('focus', f.input.isFocus)

    f?.input.notificationManager?.debounceNotify(
        'onBlur',
        conventions.events.onBlur.triggerDelay,
        newEvent(f.input.name, onBlur.name, 'onBlur', `field.${onBlur.name}`, f.input.name, f)
    )

    f.input.cursorPosition = null

    e.stopPropagation()
    // e.preventDefault()
}
