import { InputDataTypes } from '@core/framework/common/common.input.data.types'

import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { IValueManager } from '../value-manager.types'

export const setValue = function (
    this: IValueManager,
    field: IExtendedInput,
    value: InputDataTypes | null
) {
    const fieldType = field?.input?.type
    let strategy = this.strategyByType?.get(fieldType)
    if (!strategy) {
        strategy = this.valueStrategies.find((s) => s.concernedTypes.includes(fieldType))
        if (strategy && this.strategyByType) {
            this.strategyByType.set(fieldType, strategy)
        }
    }

    if (!strategy) {
        console.error(`NO PARSER STRATEGY FOUND FOR THIS TYPE ${fieldType} `)
        return
    }
    try {
        strategy.setter(field, value)

        field.input.isPristine = field.input.originalValue === field.input.value
        field.input.isDirty = field.input.originalValue !== field.input.value

        field.input.styleManager?.update('pristine', field.input.isPristine)
        field.input.styleManager?.update('dirty', field.input.isDirty)
    } catch (e) {
        console.error(
            `PARSING ERROR FOR TYPE ${field.input.type} in field: ${field.input.name} `,
            e
        )
    }
}
