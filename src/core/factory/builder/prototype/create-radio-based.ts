import { Constructor } from '@core/fields/field-base-input/constructors/constructors'
import { RadioBaseInput } from '@core/fields/radio-base-input/radio-base-input'
import { IRadioBaseInput } from '@core/fields/radio-base-input/radio-base-input.types'
import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { IBuilderParams, IFieldBuilder } from '../field-builder'

export const createRadioBased = function (
    this: IFieldBuilder,
    params: IBuilderParams
): IRadioBaseInput | undefined {
    try {
        const _radioInput = new RadioBaseInput(new Constructor(params, undefined))

        if (!(_radioInput instanceof RadioBaseInput)) {
            throw Error(`The immediate clone of ${RadioBaseInput.name} is not well formed!`)
        }
        return _radioInput
    } catch (e: any) {
        generalExceptionHandler(
            undefined,
            'critical',
            createRadioBased.name,
            `an error has occured when initializing ${createRadioBased.name} class: ${e.message}`
        )
        return undefined
    }
}
