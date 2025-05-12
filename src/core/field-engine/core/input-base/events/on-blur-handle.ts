import { newEvent } from '@core/framework/events/new-event'
import { IInputBase } from '../input-base.types'

export const onBlurHandle = (f: IInputBase) => {
    if (!f.validationManager?.validationTriggerModeType.includes('onBlur')) return
    console.log('onBlurHandle', f.name, f.value)
    f.notificationManager?.debounceNotify(
        'onValidate',
        500,
        newEvent(f.name, onBlurHandle.name, 'onValidate', `field.state.${onBlurHandle.name}`)
    )
}
