import { conventions } from '@components/context/conventions/conventions'
import { newEvent } from '@core/framework/events/new-event'
import { IInputBase } from '../input-base.types'

export const onSelectHandle = (f: IExtendedInput) => {
    if (!f.validationManager?.validationTriggerModeType.includes('onSelect')) return
    // console.log('onSelectHandle', f.name, f.value)
    f.notificationManager?.debounceNotify(
        'onValidate',
        conventions.validations.triggerDelay,
        newEvent(f.name, onSelectHandle.name, 'onValidate', `field.state.${onSelectHandle.name}`)
    )
}
