import { conventions } from '@conventions/conventions'
import { newEvent } from '@core/framework/events/new-event'
import { IExtendedInput } from '../input-base.types'

export const onSelectHandle = (f: IExtendedInput) => {
    if (!f.input.validationManager?.triggerKeyWordType.includes('onSelect')) return
    // console.log('onSelectHandle', f.name, f.value)
    f.input.notificationManager?.debounceNotify(
        'onValidate',
        conventions.validations.triggerDelay,
        newEvent(
            f.input.name,
            onSelectHandle.name,
            'onValidate',
            `field.state.${onSelectHandle.name}`,
            f.input.name,
            f
        )
    )
}
