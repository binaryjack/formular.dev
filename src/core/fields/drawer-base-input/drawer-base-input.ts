import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { IConstructor } from '../field-base-input/constructors/constructors'
import { FieldInput } from '../field-base-input/field-input-base'
import { IFieldBaseInput } from '../field-base-input/field-input-base-types'
import { IDrawerBaseInput } from './drawer-base-input.types'
import { initialize } from './prototype/initialize'
import { setOpenState } from './prototype/set-open-state'

export const DrawerBaseInput = function (this: IDrawerBaseInput, constructor: IConstructor) {
    if (constructor.type === 'new') {
        this.field = new FieldInput(constructor.output as IFieldDescriptor)
    }
    if (constructor.type === 'inherits') {
        this.field = constructor.output as IFieldBaseInput
    }
    Object.setPrototypeOf(DrawerBaseInput.prototype, FieldInput.prototype)

    if (this.field.initializeBase(constructor.configuration)) {
        this.initialize()
    } else {
        throw Error(`The initialization failed ${DrawerBaseInput.name}`)
    }
    // Extend the prototype of FieldStateStyle with FieldInput's prototype
} as any as IDrawerBaseInput

Object.assign(DrawerBaseInput.prototype, {
    initialize,
    setOpenState
})
