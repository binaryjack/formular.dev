import { IConstructor } from '@core/fields/field-base-input/constructors/constructors'
import { FieldInput } from '@core/fields/field-base-input/field-input-base'
import { IFieldBaseInput } from '@core/fields/field-base-input/field-input-base-types'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { acceptValueStrategies } from './prototype/accept-value-strategies'
import { addValueStrategies } from './prototype/add-value-strategies'
import { getValue } from './prototype/get-value'
import { initialize } from './prototype/initialize'
import { setValue } from './prototype/set-value'
import { setValueCheckBox } from './prototype/set-value-checkbox'
import { setValueRadio } from './prototype/set-value-radio'
import { setValueSelect } from './prototype/set-value-select'
import { setValueText } from './prototype/set-value-text'
import { toString } from './prototype/to-string'
import { IValueStrategy } from './value-strategy.types'

export const ValueStrategy = function (this: IValueStrategy, constructor: IConstructor) {
    if (constructor.type === 'new') {
        this.field = new FieldInput(constructor.output as IFieldDescriptor)
    }
    if (constructor.type === 'inherits') {
        this.field = constructor.output as IFieldBaseInput
    }

    this.initialize()
    this.valueStrategies = []
    // Extend the prototype of FieldStateStyle with FieldInput's prototype
    Object.setPrototypeOf(ValueStrategy.prototype, FieldInput.prototype)
} as any as IValueStrategy

Object.assign(ValueStrategy.prototype, {
    initialize,
    acceptValueStrategies,
    addValueStrategies,
    getValue,
    setValue,
    toString,
    setValueCheckBox,
    setValueSelect,
    setValueText,
    setValueRadio
})
