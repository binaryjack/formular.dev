import { Constructor } from '@core/fields/field-base-input/constructors/constructors'
import { RadioBaseInput } from '@core/fields/radio-base-input/radio-base-input'
import { IRadioBaseInput } from '@core/fields/radio-base-input/radio-base-input.types'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { ITrackingOutputProvider } from '@core/tracker/tracker.types'
import { IValidationMethodStrategy } from '@core/validation-strategy/validation-strategy.types'
import { IParserStrategy } from '@core/value-strategy/value-strategy.types'
import { IFieldBuilder } from '../field-builder'

export const createRadioBased = function (
    this: IFieldBuilder,
    descriptor: IFieldDescriptor,
    validationStrategies: IValidationMethodStrategy[],
    trackingStrategies: ITrackingOutputProvider[],
    valueStrategies: IParserStrategy<any>[]
): IRadioBaseInput | undefined {
    try {
        const _radioInput = new RadioBaseInput(new Constructor(descriptor, undefined))

        if (
            _radioInput.field.initializeBase(
                descriptor,
                validationStrategies,
                trackingStrategies,
                valueStrategies
            )
        ) {
            throw Error(`The initialization failed ${RadioBaseInput.name}`)
        }

        if (!(_radioInput instanceof RadioBaseInput)) {
            throw Error(`The immediate clone of ${RadioBaseInput.name} is not well formed!`)
        }
        return _radioInput
    } catch (e: any) {
        generalExceptionHandler(
            undefined,
            'critical',
            createRadioBased.name,
            `an error has occured when initializing initializeDommable ${this.name} class: ${e.message}`
        )
        return undefined
    }
}
