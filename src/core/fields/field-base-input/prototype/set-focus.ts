import { IFieldInput } from '../field-input-base-types'

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
    const element = this.dom?.dmGet(this.id.toString())
    if (!element || element.disabled) return
    this.isFocus = true
    this.styler?.update('focus', this.isFocus)
    this.dom?.dmSetFocus(this.id.toString())
}
