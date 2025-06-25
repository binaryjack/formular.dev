import { IExtendedInput } from '../input-base.types'

export const onKeyPress = function (f: IExtendedInput, e: KeyboardEvent) {
    const inputElement = e.target as HTMLInputElement
    const key = e.key
    //TODO: [Play with it and see if we need to re enable this !!!!!!!!]
    // f?.input.notificationManager?.debounceNotify(
    //     'onKeyPress',
    //     conventions.events.onKeyDown.triggerDelay,
    //     newEvent(
    //         f.input.name,
    //         onKeyPress.name,
    //         'onKeyPress',
    //         `field.${onKeyPress.name}`,
    //         f.input.name,
    //         f
    //     )
    // )

    if (f.input.cursorPosition && f.input.cursorPosition !== null) {
        inputElement.setSelectionRange(f.input.cursorPosition, f.input.cursorPosition)
    }

    e.stopPropagation()
}
