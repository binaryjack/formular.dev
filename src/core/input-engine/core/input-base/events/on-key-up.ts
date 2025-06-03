import { IExtendedInput } from '../input-base.types'

export const onKeyUp = function (f: IExtendedInput, e: KeyboardEvent) {
    const inputElement = e.target as HTMLInputElement
    const key = e.key

    // f?.input.notificationManager?.debounceNotify(
    //     'onKeyUp',
    //     conventions.events.onKeyUp.triggerDelay,
    //     newEvent(f.input.name, onKeyUp.name, 'onKeyUp', `field.${onKeyUp.name}`, f.input.name, f)
    // )

    if (f.input.cursorPosition && f.input.cursorPosition !== null) {
        inputElement.setSelectionRange(f.input.cursorPosition, f.input.cursorPosition)
    }

    e.stopPropagation()
}
