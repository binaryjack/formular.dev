import { newEvent } from '@core/events/events.types'
import { IFieldBaseInput } from '../field-input-base-types'

export const onChangedHandle = (f: IFieldBaseInput) => {
    if (!f.validationStrategy?.validationTriggerModeType.includes('onChange')) return

    f.notifier?.debounceNotify(
        'onValidate',
        500,
        newEvent(f.name, onChangedHandle.name, 'onValidate', onChangedHandle.name)
    )
}
