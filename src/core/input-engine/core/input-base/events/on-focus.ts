import { conventions } from '@components/context/conventions/conventions'
import { newEvent } from '@core/framework/events/new-event'
import { IExtendedInput } from '../input-base.types'

export const onFocus = (f: IExtendedInput, e: Event) => {
    const inputElement = e.target as HTMLInputElement

    f.input.isFocus = true
    f.input.styleManager?.update('focus', f.input.isFocus)

    f?.input.notificationManager?.debounceNotify(
        'onFocus',
        conventions.events.onFocus.triggerDelay,
        newEvent(f.input.name, onFocus.name, 'onFocus', `field.${onFocus.name}`, f.input.name, f)
    )

    if (f.input.cursorPosition && f.input.cursorPosition !== null) {
        inputElement.setSelectionRange(f.input.cursorPosition, f.input.cursorPosition)
    }

    e.stopPropagation()
    // e.preventDefault()
}
