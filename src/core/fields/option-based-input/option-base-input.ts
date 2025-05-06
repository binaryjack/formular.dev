import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { IConstructor } from '../field-base-input/constructors/constructors'
import { FieldInput } from '../field-base-input/field-input-base'
import { IFieldBaseInput } from '../field-base-input/field-input-base-types'
import { IOptionBaseInput } from './option-base-input.types'
import { checkOptionsInitialized } from './prototype/check-options-initialized'
import { getOptionById } from './prototype/get-option-by-id'
import { getOptionBySequenceId } from './prototype/get-option-by-sequence-id'
import { getOptionByValue } from './prototype/get-option-by-value'
import { getSelectedValue } from './prototype/get-selected-value'
import { initialize } from './prototype/initialize'
import { tryGetOptionByIdOrValue } from './prototype/try-get-option-by-id-or-value'
import { tryGetOptionBySequenceIdThenIdOrValue } from './prototype/try-get-option-by-sequence-id-then-id-or-value'

export const OptionBaseInput = function (this: IOptionBaseInput, constructor: IConstructor) {
    if (constructor.type === 'new') {
        this.field = new FieldInput(constructor.output as IFieldDescriptor)
    }
    if (constructor.type === 'inherits') {
        this.field = constructor.output as IFieldBaseInput
    }
    this.initialize()
    // Extend the prototype of FieldStateStyle with FieldInput's prototype
    Object.setPrototypeOf(OptionBaseInput.prototype, FieldInput.prototype)
} as any as IOptionBaseInput

Object.assign(OptionBaseInput.prototype, {
    initialize,
    checkOptionsInitialized,
    getSelectedValue,
    getOptionByValue,
    getOptionById,
    getOptionBySequenceId,
    tryGetOptionByIdOrValue,
    tryGetOptionBySequenceIdThenIdOrValue
})
