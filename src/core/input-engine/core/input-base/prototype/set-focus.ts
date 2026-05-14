import { IInput } from '../input-base.types'

/**
 * Sets the focus state for the field input.
 *
 * This method checks if the internal HTML element reference is disabled.
 * If it is not disabled, it updates the `isFocus` property to `true`,
 * applies the focus state style to the field, and sets focus on the
 * internal HTML element.
 *
 * @this IInput - The context of the field input instance.
 */
export const setFocus = function (this: IInput) {
    const element = this.domManager?.dmGet(this.id.toString())
    if (!element || element.disabled) return
    this.isFocus = true
    this.styleManager?.update('focus', this.isFocus)
    this.domManager?.dmSetFocus(this.id.toString())
}
