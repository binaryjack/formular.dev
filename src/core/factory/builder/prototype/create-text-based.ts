import { Constructor } from '@core/fields/field-base-input/constructors/constructors'
import { TextBaseInput } from '@core/fields/text-base-input/text-base-input'
import { ITextBaseInput } from '@core/fields/text-base-input/text-base-input.types'
import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { IBuilderParams, IFieldBuilder } from '../field-builder'

export const createTextBased = function (
    this: IFieldBuilder,
    params: IBuilderParams
): ITextBaseInput | undefined {
    try {
        const _textInput = new TextBaseInput(new Constructor(params, undefined))

        if (!(_textInput instanceof TextBaseInput)) {
            throw Error(`The immediate clone of ${TextBaseInput.name} is not well formed!`)
        }

        return _textInput
    } catch (e: any) {
        generalExceptionHandler(
            undefined,
            'critical',
            createTextBased.name,
            `an error has occured when initializing ${createTextBased.name} class: ${e.message}`
        )
        return undefined
    }
}
