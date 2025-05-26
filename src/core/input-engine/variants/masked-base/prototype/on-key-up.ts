import { IMaskedBaseInput } from '../masked-base-input.types'

export const onKeyUp = function (this: IMaskedBaseInput, e: KeyboardEvent) {
    const inputElement = e.target as HTMLInputElement

    console.log('onKeyUp this.input.cursorPosition ', this.input.cursorPosition)
    const key = e.key
}
