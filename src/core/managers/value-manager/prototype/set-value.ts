import { InputDataTypes } from '@core/framework/common/common.input.data.types'

import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { IValueManager } from '../value-manager.types'

export const setValue = function (
    this: IValueManager,
    field: IExtendedInput,
    value: InputDataTypes | null
) {
    const strategy = this.valueStrategies.find((s) => s.concernedTypes.includes(field.input.type))

    if (!strategy) {
        console.error(`NO PARSER STRATEGY FOUND FOR THIS TYPE ${this.input.type} `)
        return
    }
    try {
        /** Factory */

        return strategy.setter(field, value)

        // switch (strategy.fieldValueProperty) {
        //     case 'id':
        //         return strategy.getter(field)
        //     case 'selectedOptionId':
        //         return strategy.getter(field)
        //     case 'value':
        //     default:
        //         return strategy.getter(field)
        // }
    } catch (e) {
        console.error(`PARSING ERROR FOR TYPE ${this.input.type} in field: ${this.input.name} `, e)
    }

    // this.input.styleManager?.update('dirty', this.input.originalValue !== this.input.value)

    // this.input.notificationManager?.notify(
    //     'onChange',
    //     newEvent(this.name, setValue.name, 'onChange', `field.${setValue.name}`)
    // )

    // this.observers.trigger()
}
