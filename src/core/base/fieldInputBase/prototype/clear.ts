import { IFieldInput } from '../fieldInput.types'

export const clear = function (this: IFieldInput) {
    this.errors = []
    this.guides = []

    this.internalHTMLElementRefs?.forEach((element: React.RefObject<HTMLInputElement>) => {
        if (element.current) {
            element.current.checked = false
        }
    })

    this.notify('validate', {
        fieldName: this.name,
        fieldState: 'reset'
    })
    this.notify('changed', {
        fieldName: this.name,
        fieldState: 'onChange'
    })

    this.fieldStateStyle.update('clear', true)
    this.value = null

    this.focus()

    if (!this.internalHTMLElementRef?.current) {
        return
    }
    this.internalHTMLElementRef.current.value = ''
    this.internalHTMLElementRef.current.checked = false
}
