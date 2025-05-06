import { CheckBoxInput } from '@core/fields/check-box-base-input/check-box-base-input'
import { ICheckBoxBaseInput } from '@core/fields/check-box-base-input/check-box-base-input.types'
import { Constructor } from '@core/fields/field-base-input/constructors/constructors'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { ITrackingOutputProvider } from '@core/tracker/tracker.types'
import { IValidationMethodStrategy } from '@core/validation-strategy/validation-strategy.types'
import { IParserStrategy } from '@core/value-strategy/value-strategy.types'
import { IFieldBuilder } from '../field-builder'

export const createCheckBased = function (
    this: IFieldBuilder,
    descriptor: IFieldDescriptor,
    validationStrategies: IValidationMethodStrategy[],
    trackingStrategies: ITrackingOutputProvider[],
    valueStrategies: IParserStrategy<any>[]
): ICheckBoxBaseInput | undefined {
    try {
        const _checkInput = new CheckBoxInput(new Constructor(descriptor, undefined))

        if (
            _checkInput.field.initializeBase(
                descriptor,
                validationStrategies,
                trackingStrategies,
                valueStrategies
            )
        ) {
            throw Error(`The initialization failed ${CheckBoxInput.name}`)
        }

        if (!(_checkInput instanceof CheckBoxInput)) {
            throw Error(`The immediate clone of ${CheckBoxInput.name} is not well formed!`)
        }
        return _checkInput
    } catch (e: any) {
        generalExceptionHandler(
            undefined,
            'critical',
            createCheckBased.name,
            `an error has occured when initializing initializeDommable ${this.name} class: ${e.message}`
        )
        return undefined
    }
}
