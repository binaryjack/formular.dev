import { IExtendedInput } from '../input-base.types'

export const onFocus = (f: IExtendedInput, e: Event) => {
    const inputElement = e.target as HTMLInputElement

    f.input.isFocus = true
    f.input.styleManager?.update('focus', f.input.isFocus)

    if (f.input.cursorPosition && f.input.cursorPosition !== null) {
        inputElement.setSelectionRange(f.input.cursorPosition, f.input.cursorPosition)
    }

    e.stopPropagation()
    // e.preventDefault()
}
