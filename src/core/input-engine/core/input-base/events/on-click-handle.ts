import { conventions } from '@components/context/conventions/conventions'
import { newEvent } from '@core/framework/events/new-event'
import { IInputBase } from '../input-base.types'

export const onClickHandle = (f: IInputBase) => {
    if (!f.validationManager?.validationTriggerModeType.includes('onClick')) return
    // console.log('onClickHandle', f.name, f.value)
    f.notificationManager?.debounceNotify(
        'onValidate',
        conventions.validations.triggerDelay,
        newEvent(f.name, onClickHandle.name, 'onValidate', `field.state.${onClickHandle.name}`)
    )
}
