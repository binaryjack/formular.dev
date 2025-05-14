import { conventions } from '@components/context/conventions/conventions'
import { newEvent } from '@core/framework/events/new-event'
import { IExtendedInput } from '../input-base.types'

export const onFocusHandle = (f: IExtendedInput) => {
    if (!f.input.validationManager?.validationTriggerModeType.includes('onFocus')) return
    // console.log('onFocusHandle', f.name, f.value)
    f.input.notificationManager?.debounceNotify(
        'onValidate',
        conventions.validations.triggerDelay,
        newEvent(f.name, onFocusHandle.name, 'onValidate', `field.state.${onFocusHandle.name}`)
    )
}
