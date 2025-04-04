import { IFieldInput } from '../fieldInput.types'

export const getAsString = function (this: IFieldInput) {
    return (this.value as string) ?? null
}
