import { conventions } from '@components/context/conventions/conventions'
import { newEvent } from '@core/framework/events/new-event'
import { IExtendedInput } from '../input-base.types'

export const onClickHandle = (f: IExtendedInput) => {
    if (!f.input.validationManager?.validationTriggerModeType.includes('onClick')) return
    // console.log('onClickHandle', f.name, f.value)
    f.input.notificationManager?.debounceNotify(
        'onValidate',
        conventions.validations.triggerDelay,
        newEvent(f.name, onClickHandle.name, 'onValidate', `field.state.${onClickHandle.name}`)
    )
}
