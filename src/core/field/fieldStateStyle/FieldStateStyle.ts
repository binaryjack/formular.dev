import { FieldInputStateType } from '../common.types'
import { IFieldStateStyle } from './fieldStateStyle.types'

/**
 * Represents the style state of a field.
 *
 * @constructor
 * @this {IFieldStateStyle}
 *
 * @property {Map<FieldInputStateType, string>} classesList - A map that holds the class names for different field states.
 *
 * @method
 * @name update
 * @memberof FieldStateStyle
 * @param {FieldInputStateType} type - The type of the field input state.
 * @param {boolean} state - The state of the field input.
 * @description Updates the class name for a given field input state based on the provided state.
 *
 * @method
 * @name get
 * @memberof FieldStateStyle
 * @returns {string} A string containing all the class names for the field states.
 * @description Retrieves the concatenated class names for all field states.
 */
export const FieldStateStyle = function (this: IFieldStateStyle) {
    this.classesList = new Map<FieldInputStateType, string>([
        ['dirty', 'is-not-dirty'],
        ['errors', 'no-errors'],
        ['focus', 'is-not-focus'],
        ['open', 'is-closed'],
        ['pristine', 'is-pristine'],
        ['valid', 'is-valid']
    ])
    this.update = function (type: FieldInputStateType, state: boolean) {
        switch (type) {
            case 'errors':
                this.classesList.set(type, state ? `has-${type}` : `no-${type}`)
                break
            case 'open':
                this.classesList.set(type, state ? `is-${type}` : `is-closed`)
                break
            case 'valid':
            case 'dirty':
            case 'pristine':
            case 'focus':
                this.classesList.set(type, state ? `is-${type}` : `is-not-${type}`)
                break
        }
    }
    this.get = function () {
        return Array.from(this.classesList.values()).join(' ')
    }
} as any as IFieldStateStyle
