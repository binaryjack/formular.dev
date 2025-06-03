import { conventions } from '@components/context/conventions/conventions'
import { newEvent } from '@core/framework/events/new-event'
import { IExtendedInput } from '../../../core/input-base/input-base.types'

export const onClickOption = <T extends IExtendedInput>(f: T, optionId: string, e: Event) => {
    f.input.valueManager.setValue(f, optionId)

    f.input?.notificationManager?.debounceNotify(
        'onClick',
        conventions.events.onClick.triggerDelay,
        newEvent(
            f.input.name,
            onClickOption.name,
            'onClick',
            `field.option.label.${onClickOption.name}`,
            f.input.name,
            f
        )
    )

    f.input?.notificationManager?.debounceNotify(
        'onUiUpdate',
        conventions.events.onUiUpdate.triggerDelay,
        newEvent(
            f.input.name,
            onClickOption.name,
            'onUiUpdate',
            `field.option.label.${onClickOption.name}`,
            f.input.name,
            f
        )
    )

    e.stopPropagation()
    // e.preventDefault()
}
