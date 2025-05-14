import { IOptionItem } from '@core/framework/schema/options-schema/options.scheme.types'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { TGetter, TSetter } from '../value-manager.types'

export const optionGetter: TGetter<IOptionItem | null> = (
    field: IExtendedInput
): IOptionItem | null => {
    const radioItem = field?.tryGetOptionByIdOrValue(
        field.selectedOptionId?.toString() ?? '',
        field.input.value as string
    )
    if (!radioItem) {
        field.input.message(
            'error',
            'IFieldInput.setValue',
            `Unable to find the option for this field:  type: ${field.input.type}, name: ${field.input.name} option Id ${field.selectedOptionId} or Value: ${field.input.value as string}`
        )
        return null
    }
    return radioItem
}

export const optionSetter: TSetter<IOptionItem | null> = (
    field: IExtendedInput,
    value: any
): void => {
    if (value === null || value === undefined) {
        field.selectedOptionId = null
        field.input.value = null
        field.input.domManager.dmSetValue(field.input.id.toString(), null)
        return
    }
    const radioItem = field?.tryGetOptionByIdOrValue(value?.toString() ?? '', value as string)
    if (!radioItem) {
        field.input.message(
            'error',
            'IFieldInput.setValue',
            `Unable to find the option for this field:  type: ${field.input.type}, name: ${field.input.name} option Id or Value: ${value as string}`
        )
        return
    }
    field.selectedOptionId = Number(radioItem.id)
    field.input.value = radioItem.value
    field.input.domManager.dmSetValue(field.input.id.toString(), radioItem.value ?? '')
}
