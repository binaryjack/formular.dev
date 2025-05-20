import { IOptionItem } from '@core/framework/schema/options-schema/options.scheme.types'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { TGetter, TSetter } from '../value-manager.types'

export const optionGetter: TGetter<IOptionItem | null> = (
    field: IExtendedInput
): IOptionItem | null => {
    const optionItem = field?.optionBase.tryGetOptionByIdOrValue(
        field.optionBase.selectedOptionId?.toString() ?? '',
        field.input.value as string
    )
    if (!optionItem) {
        field.input.message(
            'info',
            'IFieldInput.setValue',
            `Unable to find the option for this field:  type: ${field.input.type}, name: ${field.input.name} option Id ${field.optionBase.selectedOptionId} or Value: ${field.input.value as string}`
        )
        return null
    }
    return optionItem
}

export const optionSetter: TSetter<IOptionItem | null> = (
    field: IExtendedInput,
    value: any
): void => {
    if (value === null || value === undefined) {
        field.optionBase.selectedOptionId = null
        field.input.value = null
        field.input.domManager.dmSetValue(field.input.id.toString(), null)
        return
    }
    const optionItem = field?.optionBase.tryGetOptionByIdOrValue(
        value?.toString() ?? '',
        value as string
    )
    if (!optionItem) {
        field.input.message(
            'info',
            'IFieldInput.setValue',
            `Unable to find the option for this field:  type: ${field.input.type}, name: ${field.input.name} option Id or Value: ${value as string}`
        )
        return
    }
    field.optionBase.selectedOptionId = Number(optionItem.id)
    field.input.value = optionItem.value
    field.input.domManager.dmSetValue(field.input.id.toString(), optionItem.value ?? '')
    field.input.domManager.dmSetSelected(field.input.id.toString(), optionItem.text)
    field.input.domManager.dmSetFocus(field.input.id.toString())
}
