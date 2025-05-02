import { newEvent } from '@core/events/events.types'
import { IFieldInput } from '../field-input-base-types'

export const onBlurHandle = (f: IFieldInput) => {
    if (!f.validationStrategy()?.validationTriggerModeType.includes('onBlur')) return

    f
        .notifier()
        ?.debounceNotify(
            'onValidate',
            500,
            newEvent(f.name, onBlurHandle.name, 'onValidate', `field.state.${onBlurHandle.name}`)
        )
}
