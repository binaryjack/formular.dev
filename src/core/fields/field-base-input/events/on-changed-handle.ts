import { newEvent } from '@core/events/events.types'
import { IFieldInput } from '../field-input-base-types'

export const onChangedHandle = (f: IFieldInput) => {
    if (!f.validationStrategy()?.validationTriggerModeType.includes('onChange')) return

    f
        .notifier()
        ?.debounceNotify(
            'onValidate',
            500,
            newEvent(
                f.name,
                onChangedHandle.name,
                'onValidate',
                `field.state.${onChangedHandle.name}`
            )
        )
}
