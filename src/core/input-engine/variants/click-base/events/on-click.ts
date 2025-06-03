import { conventions } from '@components/context/conventions/conventions'
import { newEvent } from '@core/framework/events/new-event'
import { IExtendedInput } from '../../../core/input-base/input-base.types'

export const onClick = (f: IExtendedInput, e: Event) => {
    const inputElement = e.target as HTMLInputElement

    f.input.valueManager.setValueFromHtmlElement(f, inputElement)

    f.input.notificationManager?.debounceNotify(
        'onClick',
        conventions.events.onUiUpdate.triggerDelay,
        newEvent(f.input.name, onClick.name, 'onClick', `field.${onClick.name}`, f.input.name, f)
    )
    f.input?.notificationManager?.debounceNotify(
        'onUiUpdate',
        conventions.events.onUiUpdate.triggerDelay,
        newEvent(
            f.input.name,
            onClick.name,
            'onUiUpdate',
            `field.option.label.${onClick.name}`,
            f.input.name,
            f
        )
    )

    e.stopPropagation()
}
