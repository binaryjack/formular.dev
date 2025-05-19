import { newEvent } from '@core/framework/events/new-event'
import { IExtendedInput } from '../input-base.types'

export const onClickOption = <T extends IExtendedInput>(f: T, optionId: string, e: Event) => {
    const inputElement = e.target as HTMLInputElement

    // console.log('onClickLabel', f.name, optionId, inputElement.value)
    const option = f.optionBase.getOptionById(optionId)
    if (option) {
        f.input.value = option.id
        f.optionBase.selectedOptionId = option.sequenceId
    }
    f.input.domManager.dmSetChecked(optionId, true)

    f.input.styleManager.update('dirty', f.input.originalValue !== f.input.value)

    f.input?.notificationManager?.notify(
        'onClick',
        newEvent(
            f.input.name,
            onClickOption.name,
            'onClick',
            `field.option.label.${onClickOption.name}`,
            f.input.name,
            f
        )
    )

    f.input?.notificationManager?.notify(
        'onUiUpdate',
        newEvent(
            f.input.name,
            onClickOption.name,
            'onUiUpdate',
            `field.option.label.${onClickOption.name}`,
            f.input.name,
            f
        )
    )

    e.stopPropagation()
    // e.preventDefault()
}
