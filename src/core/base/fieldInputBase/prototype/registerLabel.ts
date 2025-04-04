import { IFieldInput } from '../fieldInput.types'

export const registerLabel = function (
    this: IFieldInput,
    refHtmlFor: React.RefObject<HTMLInputElement>
) {
    const onClick = (e: MouseEvent | React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
        const currentInputElement = refHtmlFor.current as unknown as HTMLInputElement

        this.value = currentInputElement?.value ?? ''
        currentInputElement.checked = true
        this.fieldStateStyle.update('dirty', this.originalValue !== this.value)

        this._notify('clicked', this.name, 'onChange')
        this.observers.trigger()

        e?.stopPropagation?.()
    }

    return {
        onClick
    }
}
