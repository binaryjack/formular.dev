import { newEvent } from '@core/events/events.types'
import { IFieldBaseInput } from '../field-input-base-types'

export const onSelectHandle = (f: IFieldBaseInput) => {
    if (!f.validationStrategy?.validationTriggerModeType.includes('onSelect')) return

    f.notifier?.debounceNotify(
        'onValidate',
        500,
        newEvent(f.name, onSelectHandle.name, 'onValidate', `field.state.${onSelectHandle.name}`)
    )
}
