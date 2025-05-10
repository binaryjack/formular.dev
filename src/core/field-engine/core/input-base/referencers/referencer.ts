import { IOptionItem } from '@core/framework/schema/options-schema/options.scheme.types'
import { IExtendedFieldInput, IFieldBaseInput } from '../field-input-base-types'

export const referencer = function (context: IFieldBaseInput, ref: HTMLInputElement | null) {
    context.domManager?.dmRegister(ref)
}

export const optionReferencer = function (
    context: IExtendedFieldInput,
    ref: HTMLInputElement | null
) {
    if (!ref) return null
    /** Okay this following check after investigating is useless
     * I will keep it anyways because for me
     * it makes the code more readable and understandable
     * but it's does nothing at all since refs comes not null and only once
     *
     * I guessing that maybe a day if the render is dubbled
     * by the StrictMode of something else like that
     * we expect to have only one ref and it could avoid bugs
     */
    context.field.domManager?.dmRegister(ref)
    if (context.field.optionsInitialized) return
    if (context.field.checkOptionsInitialized()) {
        context.field.vlaueManager?.setValue(
            context.field.defaultValue as IOptionItem | string | number | null
        )
        context.field.optionsInitialized = true
    }

    // const existingRef = this.get(ref.id)
    // return existingRef

    // console.log('refOption', this.internalHTMLElementRefs)
}
