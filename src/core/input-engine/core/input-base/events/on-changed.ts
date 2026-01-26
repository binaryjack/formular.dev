import { IExtendedInput } from '../input-base.types'
import { onChangedHandle } from './on-changed-handle'

export const onChange = (f: IExtendedInput, e: Event) => {
    const inputElement = e.target as HTMLInputElement

    f.input.valueManager.setValueFromHtmlElement(f, inputElement)

    f.input.cursorPosition = inputElement.selectionStart ?? 0

    // Call the handle function to trigger validation
    onChangedHandle(f)

    e.stopPropagation()
}
