import { IFieldInput } from '../field-input-base-types'

/**
 * Here we have a focus function that will focus the main root input if it's available, otherwise
 * it will try to focus the first child option item.
 */
export const focus = function (this: IFieldInput) {
    this.dmSetFocus(this.id.toString())
}
