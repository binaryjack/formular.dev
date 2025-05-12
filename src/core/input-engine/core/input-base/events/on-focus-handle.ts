import { newEvent } from '@core/framework/events/new-event'
import { IInputBase } from '../input-base.types'

export const onFocusHandle = (f: IInputBase) => {
    if (!f.validationManager?.validationTriggerModeType.includes('onFocus')) return
    console.log('onFocusHandle', f.name, f.value)
    f.notificationManager?.debounceNotify(
        'onValidate',
        500,
        newEvent(f.name, onFocusHandle.name, 'onValidate', `field.state.${onFocusHandle.name}`)
    )
}
