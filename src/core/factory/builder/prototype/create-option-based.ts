import { Constructor } from '@core/fields/field-base-input/constructors/constructors'
import { OptionBaseInput } from '@core/fields/option-based-input/option-base-input'
import { IOptionBaseInput } from '@core/fields/option-based-input/option-base-input.types'
import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { IBuilderParams, IFieldBuilder } from '../field-builder'

export const createOptionBased = function (
    this: IFieldBuilder,
    params: IBuilderParams
): IOptionBaseInput | undefined {
    try {
        const _optionInput = new OptionBaseInput(new Constructor(params, undefined))

        if (!(_optionInput instanceof OptionBaseInput)) {
            throw Error(`The immediate clone of ${OptionBaseInput.name} is not well formed!`)
        }
        return _optionInput
    } catch (e: any) {
        generalExceptionHandler(
            undefined,
            'critical',
            createOptionBased.name,
            `an error has occured when initializing ${createOptionBased.name} class: ${e.message}`
        )
        return undefined
    }
}
