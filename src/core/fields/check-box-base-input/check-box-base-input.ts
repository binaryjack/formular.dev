import { ICheckBoxBaseInput } from './check-box-base-input.types'

import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { ClickBaseInput } from '../click-base-input/click-base-input'
import { Constructor, IConstructor } from '../field-base-input/constructors/constructors'
import { FieldInput } from '../field-base-input/field-input-base'
import { IFieldBaseInput } from '../field-base-input/field-input-base-types'
import { handleOnChanged } from './prototype/handle-on-changed'
import { initialize } from './prototype/initialize'

export const CheckBoxInput = function (this: ICheckBoxBaseInput, constructor: IConstructor) {
    if (constructor.type === 'new') {
        this.field = new FieldInput(constructor.output as IFieldDescriptor)
        this.clickBase = new ClickBaseInput(new Constructor(undefined, this.field))
    }
    if (constructor.type === 'inherits') {
        this.field = constructor.output as IFieldBaseInput
        this.clickBase = new ClickBaseInput(constructor)
    }
    this.initialize()
    this.checked = undefined
    // Extend the prototype of FieldStateStyle with FieldInput's prototype
    Object.setPrototypeOf(CheckBoxInput.prototype, FieldInput.prototype)
} as any as ICheckBoxBaseInput

Object.assign(CheckBoxInput.prototype, {
    handleOnChanged,
    initialize
})
