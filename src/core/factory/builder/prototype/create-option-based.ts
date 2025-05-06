import { Constructor } from '@core/fields/field-base-input/constructors/constructors'
import { OptionBaseInput } from '@core/fields/option-based-input/option-base-input'
import { IOptionBaseInput } from '@core/fields/option-based-input/option-base-input.types'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { ITrackingOutputProvider } from '@core/tracker/tracker.types'
import { IValidationMethodStrategy } from '@core/validation-strategy/validation-strategy.types'
import { IParserStrategy } from '@core/value-strategy/value-strategy.types'
import { IFieldBuilder } from '../field-builder'

export const createOptionBased = function (
    this: IFieldBuilder,
    descriptor: IFieldDescriptor,
    validationStrategies: IValidationMethodStrategy[],
    trackingStrategies: ITrackingOutputProvider[],
    valueStrategies: IParserStrategy<any>[]
): IOptionBaseInput | undefined {
    try {
        const _optionInput = new OptionBaseInput(new Constructor(descriptor, undefined))

        if (
            _optionInput.field.initializeBase(
                descriptor,
                validationStrategies,
                trackingStrategies,
                valueStrategies
            )
        ) {
            throw Error(`The initialization failed ${OptionBaseInput.name}`)
        }

        if (!(_optionInput instanceof OptionBaseInput)) {
            throw Error(`The immediate clone of ${OptionBaseInput.name} is not well formed!`)
        }
        return _optionInput
    } catch (e: any) {
        generalExceptionHandler(
            undefined,
            'critical',
            createOptionBased.name,
            `an error has occured when initializing initializeDommable ${this.name} class: ${e.message}`
        )
        return undefined
    }
}
