import { conventions } from '@conventions/conventions'
import { newEvent } from '@core/framework/events/new-event'
import { IExtendedInput } from '../input-base.types'

export const onBlurHandle = (f: IExtendedInput) => {
    if (!f.input.validationManager?.triggerKeyWordType.includes('onBlur')) return
    // console.log('onBlurHandle', f.name, f.value)
    f.input.notificationManager?.debounceNotify(
        'onValidate',
        conventions.validations.triggerDelay,
        newEvent(f.input.name, onBlurHandle.name, 'onValidate', onBlurHandle.name, f.input.name, f)
    )
}
