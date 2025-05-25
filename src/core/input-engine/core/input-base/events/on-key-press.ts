import { newEvent } from '@core/framework/events/new-event'
import { IExtendedInput } from '../input-base.types'

export const onKeyPress = function (f: IExtendedInput, e: KeyboardEvent) {
    const inputElement = e.target as HTMLInputElement
    const key = e.key

    f?.input.notificationManager?.notify(
        'onKeyPress',
        newEvent(
            f.input.name,
            onKeyPress.name,
            'onKeyPress',
            `field.${onKeyPress.name}`,
            f.input.name,
            f
        )
    )

    if (f.input.cursorPosition && f.input.cursorPosition !== null) {
        inputElement.setSelectionRange(f.input.cursorPosition, f.input.cursorPosition)
    }

    e.stopPropagation()
}
