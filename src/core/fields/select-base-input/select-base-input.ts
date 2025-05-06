import { ISelectBaseInput } from './select-base-input.types'

import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { ClickBaseInput } from '../click-base-input/click-base-input'
import { Constructor, IConstructor } from '../field-base-input/constructors/constructors'
import { FieldInput } from '../field-base-input/field-input-base'
import { IFieldBaseInput } from '../field-base-input/field-input-base-types'
import { OptionBaseInput } from '../option-based-input/option-base-input'
import { handleOnChanged } from './prototype/handle-on-changed'
import { handleOnSelected } from './prototype/handle-on-selected'
import { initialize } from './prototype/initialize'
import { onSelectItem } from './prototype/on-select-item'
import { ref } from './prototype/ref'
import { refOption } from './prototype/ref-option'
import { register } from './prototype/register'
import { registerOption } from './prototype/register-option'

export const SelectBaseInput = function (this: ISelectBaseInput, constructor: IConstructor) {
    if (constructor.type === 'new') {
        this.field = new FieldInput(constructor.output as IFieldDescriptor)
        this.clickBase = new ClickBaseInput(new Constructor(undefined, this.field))
        this.optionBase = new OptionBaseInput(new Constructor(undefined, this.field))
    }
    if (constructor.type === 'inherits') {
        this.field = constructor.output as IFieldBaseInput
        this.clickBase = new ClickBaseInput(constructor)
        this.optionBase = new OptionBaseInput(constructor)
    }
    this.initialize()
    // Extend the prototype of FieldStateStyle with FieldInput's prototype
    Object.setPrototypeOf(SelectBaseInput.prototype, FieldInput.prototype)
} as any as ISelectBaseInput

Object.assign(SelectBaseInput.prototype, {
    initialize,
    handleOnChanged,
    handleOnSelected,
    ref,
    register,
    refOption,
    registerOption,
    onSelectItem
})
