import { TGetter, TSetter } from '../value-manager.types'

import { IOptionItem } from '@core/framework/schema/options-schema/options.scheme.types'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'

export const selectGetter: TGetter<IOptionItem | null> = (
    field: IExtendedInput
): IOptionItem | null => {
    const optionItem = field?.optionBase.tryGetOptionBySequenceIdThenIdOrValue(
        field.optionBase.selectedOptionId ?? -1,
        field.optionBase.selectedOptionId?.toString() ?? '',
        field.input.value as string
    )
    if (!optionItem) {
        field.input.message(
            'error',
            'IFieldInput.setValue',
            `Unable to find the option for this field:  type: ${field.input.type}, name: ${field.input.name} option Id ${field.optionBase.selectedOptionId} or Value: ${field.input.value as string}`
        )
        return null
    }
    return optionItem
}

export const selectSetter: TSetter<IOptionItem | null> = (
    field: IExtendedInput,
    value: any
): void => {
    if (value === null || value === undefined) {
        field.optionBase.selectedOptionId = null
        field.input.value = null
        field.input.domManager.dmSetValue(field.input.id.toString(), null)
        return
    }
    const optionItem = field?.optionBase.tryGetOptionBySequenceIdThenIdOrValue(
        Number(value),
        value as string,
        value as string
    )
    if (!optionItem) {
        field.input.message(
            'error',
            'IFieldInput.setValue',
            `Unable to find the option for this field:  type: ${field.input.type}, name: ${field.input.name} option Id or Value: ${value as string}`
        )
        return
    }
    field.optionBase.selectedOptionId = Number(optionItem.id)
    field.input.value = optionItem.value
    field.input.domManager.dmSetValue(field.input.id.toString(), optionItem.value ?? '')
}
