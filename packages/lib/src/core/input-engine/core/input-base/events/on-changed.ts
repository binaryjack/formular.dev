import { IExtendedInput } from '../input-base.types'

export const onChange = (f: IExtendedInput, e: Event) => {
    const inputElement = e.target as HTMLInputElement

    f.input.valueManager.setValueFromHtmlElement(f, inputElement)

    f.input.cursorPosition = inputElement.selectionStart ?? 0

    e.stopPropagation()
}
