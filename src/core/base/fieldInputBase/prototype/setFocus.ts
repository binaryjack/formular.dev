import { IFieldInput } from '../fieldInput.types'

export const setFocus = function (this: IFieldInput) {
    if (this.internalHTMLElementRef?.current?.disabled) return
    this.isFocus = true
    this.fieldStateStyle.update('focus', this.isFocus)
    this.internalHTMLElementRef?.current?.focus()
}
