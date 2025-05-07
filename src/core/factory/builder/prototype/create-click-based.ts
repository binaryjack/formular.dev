import { ClickBaseInput } from '@core/fields/click-base-input/click-base-input'
import { IClickBaseInput } from '@core/fields/click-base-input/click-base-input.types'
import { Constructor } from '@core/fields/field-base-input/constructors/constructors'
import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { IBuilderParams, IFieldBuilder } from '../field-builder'

export const createClickBased = function (
    this: IFieldBuilder,
    params: IBuilderParams
): IClickBaseInput | undefined {
    try {
        const _clickInput = new ClickBaseInput(new Constructor(params, undefined))

        if (!(_clickInput instanceof ClickBaseInput)) {
            throw Error(`The immediate clone of ${ClickBaseInput.name} is not well formed!`)
        }
        return _clickInput
    } catch (e: any) {
        generalExceptionHandler(
            undefined,
            'critical',
            createClickBased.name,
            `an error has occured when initializing ${createClickBased.name} class: ${e.message}`
        )
        return undefined
    }
}
