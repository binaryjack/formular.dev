import { conventions } from '@components/context/conventions/conventions'
import { newEvent } from '@core/framework/events/new-event'
import { IExtendedInput } from '../input-base.types'

export const onChange = (f: IExtendedInput, e: Event) => {
    const inputElement = e.target as HTMLInputElement

    f.input.valueManager.setValueFromHtmlElement(f, inputElement)

    f.input.notificationManager?.debounceNotify(
        'onChange',
        conventions.events.onChange.triggerDelay,
        newEvent(f.input.name, onChange.name, 'onChange', `field.${onChange.name}`, f.input.name, f)
    )

    f.input.cursorPosition = inputElement.selectionStart ?? 0

    e.stopPropagation()
}
