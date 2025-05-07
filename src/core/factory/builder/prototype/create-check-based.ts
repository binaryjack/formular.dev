import { CheckBoxInput } from '@core/fields/check-box-base-input/check-box-base-input'
import { ICheckBoxBaseInput } from '@core/fields/check-box-base-input/check-box-base-input.types'
import { Constructor } from '@core/fields/field-base-input/constructors/constructors'
import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { IBuilderParams, IFieldBuilder } from '../field-builder'

export const createCheckBased = function (
    this: IFieldBuilder,
    params: IBuilderParams
): ICheckBoxBaseInput | undefined {
    try {
        const _checkInput = new CheckBoxInput(new Constructor(params, undefined))

        if (!(_checkInput instanceof CheckBoxInput)) {
            throw Error(`The immediate clone of ${CheckBoxInput.name} is not well formed!`)
        }
        return _checkInput
    } catch (e: any) {
        generalExceptionHandler(
            undefined,
            'critical',
            createCheckBased.name,
            `an error has occured when initializing ${createCheckBased.name} class: ${e.message}`
        )
        return undefined
    }
}
