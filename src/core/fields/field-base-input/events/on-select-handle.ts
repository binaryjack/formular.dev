import { newEvent } from '@core/events/events.types'
import { IFieldInput } from '../field-input-base-types'

export const onSelectHandle = (f: IFieldInput) => {
    if (!f.validationStrategy()?.validationTriggerModeType.includes('onSelect')) return

    f
        .notifier()
        ?.debounceNotify(
            'onValidate',
            500,
            newEvent(
                f.name,
                onSelectHandle.name,
                'onValidate',
                `field.state.${onSelectHandle.name}`
            )
        )
}
