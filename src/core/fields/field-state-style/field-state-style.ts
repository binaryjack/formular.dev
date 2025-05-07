import { FieldInputStateType } from '@core/framework/common/common.input.state.types'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { IConstructor } from '../field-base-input/constructors/constructors'
import { FieldInput } from '../field-base-input/field-input-base'
import { IFieldBaseInput } from '../field-base-input/field-input-base-types'
import { IFieldStateStyle } from './field-state-style.types'
import { classNames } from './prototype/class-names'
import { get } from './prototype/get'
import { getFlagsList } from './prototype/get-flags-list'
import { getFlagsObject } from './prototype/get-flags-object'
import { initialize } from './prototype/initialize'
import { update } from './prototype/update'

/**
 * Represents the style state of a field.
 *
 * @constructor
 * @this {IFieldStateStyle}
 *
 * @property {Map<FieldInputStateType, string>} classesList - A map that holds the class names for different field states.
 */
export const FieldStateStyle = function (this: IFieldStateStyle, constructor: IConstructor) {
    if (constructor.type === 'new') {
        this.field = new FieldInput(constructor.output as IFieldDescriptor)
    }
    if (constructor.type === 'inherits') {
        this.field = constructor.output as IFieldBaseInput
    }

    // Extend the prototype of FieldStateStyle with FieldInput's prototype
    Object.setPrototypeOf(FieldStateStyle.prototype, FieldInput.prototype)

    if (this.field.initializeBase(constructor.configuration)) {
        this.initialize()

        this.className = ''
        this.classesList = new Map<FieldInputStateType, string>([
            ['dirty', 'is-not-dirty'],
            ['errors', 'no-errors'],
            ['focus', 'is-not-focus'],
            ['open', 'is-closed'],
            ['pristine', 'is-pristine'],
            ['valid', 'is-valid'],
            ['required', 'required']
        ])
    } else {
        throw Error(`The initialization failed ${FieldStateStyle.name}`)
    }
} as any as IFieldStateStyle

Object.assign(FieldStateStyle.prototype, {
    initialize,
    classNames,
    update,
    get,
    getFlagsList,
    getFlagsObject
})
