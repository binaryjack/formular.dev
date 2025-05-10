import { newEvent } from '@core/framework/events/events.types'
import { IFieldBaseInput } from '../field-input-base-types'

export const onClearHandle = (f: IFieldBaseInput) => {
    if (!f.validationManager?.validationTriggerModeType.includes('onClear')) return
    console.log('onClearHandle', f.name, f.value)
    f.notificationManager?.debounceNotify(
        'onValidate',
        500,
        newEvent(f.name, onClearHandle.name, 'onValidate', `field.state.${onClearHandle.name}`)
    )
}
