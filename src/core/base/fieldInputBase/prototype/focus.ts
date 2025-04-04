import { IFieldInput } from '../fieldInput.types'

/**
 * Here we have a focus function that will focus the main root input if it's available, otherwise
 * it will try to focus the first child option item.
 */
export const focus = function (this: IFieldInput) {
    if (this.internalHTMLElementRef?.current) {
        this.internalHTMLElementRef.current.focus()
    } else {
        const firstChildOptionItem = this
            .internalHTMLElementRefs?.[0] as React.RefObject<HTMLInputElement>

        if (firstChildOptionItem?.current) {
            firstChildOptionItem.current.focus()
        }
    }
}
