import { IFieldInput } from '../fieldInput.types'

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
    if (this.internalHTMLElementRef?.current?.disabled) return
    this.isFocus = true
    this.fieldStateStyle.update('focus', this.isFocus)
    this.internalHTMLElementRef?.current?.focus()
}
