import { newEvent } from '@core/events/events.types'
import { IFieldBaseInput } from '../field-input-base-types'

export const onClickHandle = (f: IFieldBaseInput) => {
    if (!f.validationStrategy?.validationTriggerModeType.includes('onClick')) return

    f.notifier?.debounceNotify(
        'onValidate',
        500,
        newEvent(f.name, onClickHandle.name, 'onValidate', `field.state.${onClickHandle.name}`)
    )
}
