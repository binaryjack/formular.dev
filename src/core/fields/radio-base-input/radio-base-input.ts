import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { FieldInput } from '../field-base-input/field-input-base'
import { handleOnChanged } from './prototype/handle-on-changed'
import { initialize } from './prototype/initialize'
import { ref } from './prototype/ref'
import { refOption } from './prototype/ref-option'
import { register } from './prototype/register'
import { registerLabel } from './prototype/register-label'
import { registerOption } from './prototype/register-option'

import { ClickBaseInput } from '../click-base-input/click-base-input'
import { Constructor, IConstructor } from '../field-base-input/constructors/constructors'
import { IFieldBaseInput } from '../field-base-input/field-input-base-types'
import { OptionBaseInput } from '../option-based-input/option-base-input'
import { IRadioBaseInput } from './radio-base-input.types'

export const RadioBaseInput = function (this: IRadioBaseInput, constructor: IConstructor) {
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

    // Extend the prototype of FieldStateStyle with FieldInput's prototype
    Object.setPrototypeOf(RadioBaseInput.prototype, FieldInput.prototype)

    if (this.field.initializeBase(constructor.configuration)) {
        this.initialize()
    } else {
        throw Error(`The initialization failed ${RadioBaseInput.name}`)
    }
} as any as IRadioBaseInput

Object.assign(RadioBaseInput.prototype, {
    initialize,
    handleOnChanged,
    ref,
    register,
    refOption,
    registerOption,
    registerLabel
})
