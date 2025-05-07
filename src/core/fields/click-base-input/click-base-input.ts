import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { IConstructor } from '../field-base-input/constructors/constructors'
import { FieldInput } from '../field-base-input/field-input-base'
import { IFieldBaseInput } from '../field-base-input/field-input-base-types'
import { IClickBaseInput } from './click-base-input.types'
import { handleOnClicked } from './prototype/handle-on-clicked'
import { initialize } from './prototype/initialize'

export const ClickBaseInput = function (this: IClickBaseInput, constructor: IConstructor) {
    if (constructor.type === 'new') {
        this.field = new FieldInput(constructor.output as IFieldDescriptor)
    }
    if (constructor.type === 'inherits') {
        this.field = constructor.output as IFieldBaseInput
    }
    // Extend the prototype of FieldStateStyle with FieldInput's prototype
    Object.setPrototypeOf(ClickBaseInput.prototype, FieldInput.prototype)

    if (this.field.initializeBase(constructor.configuration)) {
        this.initialize()
    } else {
        throw Error(`The initialization failed ${ClickBaseInput.name}`)
    }
} as any as IClickBaseInput

Object.assign(ClickBaseInput.prototype, {
    handleOnClicked,
    initialize
})
