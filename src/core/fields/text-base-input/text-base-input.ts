import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { IConstructor } from '../field-base-input/constructors/constructors'
import { FieldInput } from '../field-base-input/field-input-base'
import { IFieldBaseInput } from '../field-base-input/field-input-base-types'
import { handleOnChanged } from './prototype/handle-on-changed'
import { initialize } from './prototype/initialize'
import { ref } from './prototype/ref'
import { register } from './prototype/register'
import { ITextBaseInput } from './text-base-input.types'

export const TextBaseInput = function (this: ITextBaseInput, constructor: IConstructor) {
    if (constructor.type === 'new') {
        this.field = new FieldInput(constructor.output as IFieldDescriptor)
    }
    if (constructor.type === 'inherits') {
        this.field = constructor.output as IFieldBaseInput
    }
    this.initialize()
    // Extend the prototype of FieldStateStyle with FieldInput's prototype
    Object.setPrototypeOf(TextBaseInput.prototype, FieldInput.prototype)
} as any as ITextBaseInput

Object.assign(TextBaseInput.prototype, {
    initialize,
    handleOnChanged,
    ref,
    register
})
