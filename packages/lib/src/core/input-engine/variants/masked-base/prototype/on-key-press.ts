import { IMaskedBaseInput } from '../masked-base-input.types'

export const onKeyPress = function (this: IMaskedBaseInput, e: KeyboardEvent) {
    const inputElement = e.target as HTMLInputElement
    this.input.cursorPosition = inputElement.selectionStart ?? 0
    console.log('onKeyPress this.input.cursorPosition ', this.input.cursorPosition)
    const key = e.key
}
