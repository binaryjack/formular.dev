import { conventions } from '@components/context/conventions/conventions'
import { newEvent } from '@core/framework/events/new-event'
import { IInputBase } from '../input-base.types'

export const onFocusHandle = (f: IInputBase) => {
    if (!f.validationManager?.validationTriggerModeType.includes('onFocus')) return
    // console.log('onFocusHandle', f.name, f.value)
    f.notificationManager?.debounceNotify(
        'onValidate',
        conventions.validations.triggerDelay,
        newEvent(f.name, onFocusHandle.name, 'onValidate', `field.state.${onFocusHandle.name}`)
    )
}
