import { FieldInputStateType } from '../../common.types'
import { IFieldInput } from '../field-base-input/field-input-base-types'
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
export const FieldStateStyle = function (this: IFieldStateStyle, field: IFieldInput) {
    this.field = field
    this.classesList = new Map<FieldInputStateType, string>([
        ['dirty', 'is-not-dirty'],
        ['errors', 'no-errors'],
        ['focus', 'is-not-focus'],
        ['open', 'is-closed'],
        ['pristine', 'is-pristine'],
        ['valid', 'is-valid'],
        ['required', 'required']
    ])
} as any as IFieldStateStyle

Object.assign(FieldStateStyle.prototype, {
    initialize,
    classNames,
    update,
    get,
    getFlagsList,
    getFlagsObject
})
