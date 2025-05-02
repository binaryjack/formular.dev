import { newEvent } from '@core/events/events.types'
import { IFieldInput, IFieldInputExtended } from '../field-input-base-types'

export const onClickLabel = <T extends IFieldInputExtended<IFieldInput>>(
    f: T,
    optionId: string,
    e: Event
) => {
    const inputElement = e.target as HTMLInputElement
    const option = f.getOptionById(optionId)
    if (option) {
        f.field().value = option.id
        f.selectedOptionId = option.sequenceId
    }
    f.field()?.dom()?.dmSetChecked(optionId, true)

    f
        .field()
        .style()
        ?.fieldStateStyle.update('dirty', f.field().originalValue !== f.field().value)

    f
        .field()
        ?.notifier()
        ?.notify(
            'onClick',
            newEvent(
                f.field().name,
                onClickLabel.name,
                'onClick',
                `field.option.label.${onClickLabel.name}`
            )
        )

    e.stopPropagation()
    e.preventDefault()
}
