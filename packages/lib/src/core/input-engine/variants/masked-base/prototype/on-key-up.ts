import { IMaskedBaseInput } from '../masked-base-input.types'

export const onKeyUp = function (this: IMaskedBaseInput, e: KeyboardEvent) {
    const inputElement = e.target as HTMLInputElement
    const key = e.key
}
