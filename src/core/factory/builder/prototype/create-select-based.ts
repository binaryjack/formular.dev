import { Constructor } from '@core/fields/field-base-input/constructors/constructors'
import { SelectBaseInput } from '@core/fields/select-base-input/select-base-input'
import { ISelectBaseInput } from '@core/fields/select-base-input/select-base-input.types'
import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { IBuilderParams, IFieldBuilder } from '../field-builder'

export const createSelectBased = function (
    this: IFieldBuilder,
    params: IBuilderParams
): ISelectBaseInput | undefined {
    try {
        const _selectInput = new SelectBaseInput(new Constructor(params, undefined))

        if (!(_selectInput instanceof SelectBaseInput)) {
            throw Error(`The immediate clone of ${SelectBaseInput.name} is not well formed!`)
        }
        return _selectInput
    } catch (e: any) {
        generalExceptionHandler(
            undefined,
            'critical',
            createSelectBased.name,
            `an error has occured when initializing ${createSelectBased.name} class: ${e.message}`
        )
        return undefined
    }
}
