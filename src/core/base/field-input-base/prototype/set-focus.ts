import { IFieldInput } from '../field-input.types'

/**
 * Sets the focus state for the field input.
 *
 * This method checks if the internal HTML element reference is disabled.
 * If it is not disabled, it updates the `isFocus` property to `true`,
 * applies the focus state style to the field, and sets focus on the
 * internal HTML element.
 *
 * @this IFieldInput - The context of the field input instance.
 */
export const setFocus = function (this: IFieldInput) {
    const element = this.dmGet(this.id.toString())
    if (!element || element.disabled) return
    this.isFocus = true
    this.fieldStateStyle.update('focus', this.isFocus)
    this.dmSetFocus(this.id.toString())
}
