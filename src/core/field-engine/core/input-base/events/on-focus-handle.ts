import { newEvent } from '@core/framework/events/events.types'
import { IFieldBaseInput } from '../field-input-base-types'

export const onFocusHandle = (f: IFieldBaseInput) => {
    if (!f.validationManager?.validationTriggerModeType.includes('onFocus')) return
    console.log('onFocusHandle', f.name, f.value)
    f.notificationManager?.debounceNotify(
        'onValidate',
        500,
        newEvent(f.name, onFocusHandle.name, 'onValidate', `field.state.${onFocusHandle.name}`)
    )
}
