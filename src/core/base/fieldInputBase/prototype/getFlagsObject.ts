import { IFieldInput } from '../fieldInput.types'

export const getFlagsObject = function (this: IFieldInput) {
    return this.fieldStateStyle.getFlagsObject()
}
