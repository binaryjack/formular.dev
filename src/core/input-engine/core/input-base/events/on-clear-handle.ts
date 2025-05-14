import { conventions } from '@components/context/conventions/conventions'
import { newEvent } from '@core/framework/events/new-event'
import { IInputBase } from '../input-base.types'

export const onClearHandle = (f: IInputBase) => {
    if (!f.validationManager?.validationTriggerModeType.includes('onClear')) return
    // console.log('onClearHandle', f.name, f.value)
    f.notificationManager?.debounceNotify(
        'onValidate',
        conventions.validations.triggerDelay,
        newEvent(f.name, onClearHandle.name, 'onValidate', `field.state.${onClearHandle.name}`)
    )
}
