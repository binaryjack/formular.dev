import { IExtendedInput } from '../input-base.types'

export const onBlur = (f: IExtendedInput, e: Event) => {
    const inputElement = e.target as HTMLInputElement
    // console.log('onBlur', f.name, inputElement.value)
    f.input.isFocus = false
    f.input.styleManager?.update('focus', f.input.isFocus)

    f.input.cursorPosition = null

    e.stopPropagation()
    // e.preventDefault()
}
