import { newEvent } from '@core/framework/events/events.types'
import { IFieldBaseInput } from '../field-input-base-types'

export const onChangedHandle = (f: IFieldBaseInput) => {
    if (!f.validationManager?.validationTriggerModeType.includes('onChange')) return
    console.log('onChangedHandle', f.name, f.value)
    f.notificationManager?.debounceNotify(
        'onValidate',
        500,
        newEvent(f.name, onChangedHandle.name, 'onValidate', onChangedHandle.name)
    )
}
