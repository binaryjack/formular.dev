import { conventions } from '@conventions/conventions'
import { newEvent } from '@core/framework/events/new-event'
import { IExtendedInput } from '../input-base.types'
import { onFocusHandle } from './on-focus-handle'

export const onKeyPressHandle = function (f: IExtendedInput) {
    if (!f.input.validationManager?.triggerKeyWordType.includes('onKeyPress')) return
    // console.log('onFocusHandle', f.name, f.value)
    f.input.notificationManager?.debounceNotify(
        'onValidate',
        conventions.validations.triggerDelay,
        newEvent(
            f.input.name,
            onFocusHandle.name,
            'onValidate',
            `field.state.${onFocusHandle.name}`,
            f.input.name,
            f
        )
    )
}
