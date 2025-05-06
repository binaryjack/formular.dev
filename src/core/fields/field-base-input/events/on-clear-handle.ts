import { newEvent } from '@core/events/events.types'
import { IFieldBaseInput } from '../field-input-base-types'

export const onClearHandle = (f: IFieldBaseInput) => {
    if (!f.validationStrategy?.validationTriggerModeType.includes('onClear')) return

    f.notifier?.debounceNotify(
        'onValidate',
        500,
        newEvent(f.name, onClearHandle.name, 'onValidate', `field.state.${onClearHandle.name}`)
    )
}
