import { IFieldInput, IFieldInputExtended } from '../field-input-base-types'

export const referencer = function (
    context: IFieldInputExtended<IFieldInput>,
    ref: HTMLInputElement | null
) {
    context.field().dom()?.dmRegister(ref)
}
