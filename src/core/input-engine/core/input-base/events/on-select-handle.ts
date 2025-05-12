import { newEvent } from '@core/framework/events/new-event'
import { IInputBase } from '../input-base.types'

export const onSelectHandle = (f: IInputBase) => {
    if (!f.validationManager?.validationTriggerModeType.includes('onSelect')) return
    console.log('onSelectHandle', f.name, f.value)
    f.notificationManager?.debounceNotify(
        'onValidate',
        500,
        newEvent(f.name, onSelectHandle.name, 'onValidate', `field.state.${onSelectHandle.name}`)
    )
}
