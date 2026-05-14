import { IExtendedInput } from '../input-base.types'

export const onKeyUp = function (f: IExtendedInput, e: KeyboardEvent) {
    const inputElement = e.target as HTMLInputElement
    const key = e.key

    if (f.input.cursorPosition && f.input.cursorPosition !== null) {
        inputElement.setSelectionRange(f.input.cursorPosition, f.input.cursorPosition)
    }

    e.stopPropagation()
}
