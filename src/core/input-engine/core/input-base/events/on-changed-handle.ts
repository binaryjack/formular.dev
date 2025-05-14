import { conventions } from '@components/context/conventions/conventions'
import { newEvent } from '@core/framework/events/new-event'
import { IInputBase } from '../input-base.types'

export const onChangedHandle = (f: IInputBase) => {
    if (!f.validationManager?.validationTriggerModeType.includes('onChange')) return
    // console.log('onChangedHandle', f.name, f.value)
    f.notificationManager?.debounceNotify(
        'onValidate',
        conventions.validations.triggerDelay,
        newEvent(f.name, onChangedHandle.name, 'onValidate', onChangedHandle.name)
    )
}
