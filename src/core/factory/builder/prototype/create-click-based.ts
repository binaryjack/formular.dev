import { ClickBaseInput } from '@core/fields/click-base-input/click-base-input'
import { IClickBaseInput } from '@core/fields/click-base-input/click-base-input.types'
import { Constructor } from '@core/fields/field-base-input/constructors/constructors'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { ITrackingOutputProvider } from '@core/tracker/tracker.types'
import { IValidationMethodStrategy } from '@core/validation-strategy/validation-strategy.types'
import { IParserStrategy } from '@core/value-strategy/value-strategy.types'
import { IFieldBuilder } from '../field-builder'

export const createClickBased = function (
    this: IFieldBuilder,
    descriptor: IFieldDescriptor,
    validationStrategies: IValidationMethodStrategy[],
    trackingStrategies: ITrackingOutputProvider[],
    valueStrategies: IParserStrategy<any>[]
): IClickBaseInput | undefined {
    try {
        const _clickInput = new ClickBaseInput(new Constructor(descriptor, undefined))

        if (
            _clickInput.field.initializeBase(
                descriptor,
                validationStrategies,
                trackingStrategies,
                valueStrategies
            )
        ) {
            throw Error(`The initialization failed ${ClickBaseInput.name}`)
        }

        if (!(_clickInput instanceof ClickBaseInput)) {
            throw Error(`The immediate clone of ${ClickBaseInput.name} is not well formed!`)
        }
        return _clickInput
    } catch (e: any) {
        generalExceptionHandler(
            undefined,
            'critical',
            createClickBased.name,
            `an error has occured when initializing initializeDommable ${this.name} class: ${e.message}`
        )
        return undefined
    }
}
