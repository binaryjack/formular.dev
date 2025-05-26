import { conventions } from '@components/context/conventions/conventions'
import { newEvent } from '@core/framework/events/new-event'
import { IExtendedInput } from '../input-base.types'
import { onFocusHandle } from './on-focus-handle'

export const onKeyUpHandle = function (f: IExtendedInput) {
    if (!f.input.validationManager?.validationTriggerModeType.includes('onKeyUp')) return
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
