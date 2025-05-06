import { newEvent } from '@core/events/events.types'
import { IFieldBaseInput } from '../field-input-base-types'

export const onFocusHandle = (f: IFieldBaseInput) => {
    if (!f.validationStrategy?.validationTriggerModeType.includes('onFocus')) return

    f.notifier?.debounceNotify(
        'onValidate',
        500,
        newEvent(f.name, onFocusHandle.name, 'onValidate', `field.state.${onFocusHandle.name}`)
    )
}
