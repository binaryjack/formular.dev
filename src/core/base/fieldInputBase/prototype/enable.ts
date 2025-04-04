import { IFieldInput } from '../fieldInput.types'

export const enable = function (this: IFieldInput, enabled: boolean) {
    this.enabled = enabled
    if (!this.internalHTMLElementRef?.current) return

    if (!enabled) {
        this.internalHTMLElementRef?.current?.blur?.()
    }
    this.internalHTMLElementRef.current.disabled = !enabled
}
