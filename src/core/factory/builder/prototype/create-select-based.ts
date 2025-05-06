import { Constructor } from '@core/fields/field-base-input/constructors/constructors'
import { SelectBaseInput } from '@core/fields/select-base-input/select-base-input'
import { ISelectBaseInput } from '@core/fields/select-base-input/select-base-input.types'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { ITrackingOutputProvider } from '@core/tracker/tracker.types'
import { IValidationMethodStrategy } from '@core/validation-strategy/validation-strategy.types'
import { IParserStrategy } from '@core/value-strategy/value-strategy.types'
import { IFieldBuilder } from '../field-builder'

export const createSelectBased = function (
    this: IFieldBuilder,
    descriptor: IFieldDescriptor,
    validationStrategies: IValidationMethodStrategy[],
    trackingStrategies: ITrackingOutputProvider[],
    valueStrategies: IParserStrategy<any>[]
): ISelectBaseInput | undefined {
    try {
        const _selectInput = new SelectBaseInput(new Constructor(descriptor, undefined))

        if (
            _selectInput.field.initializeBase(
                descriptor,
                validationStrategies,
                trackingStrategies,
                valueStrategies
            )
        ) {
            throw Error(`The initialization failed ${SelectBaseInput.name}`)
        }

        if (!(_selectInput instanceof SelectBaseInput)) {
            throw Error(`The immediate clone of ${SelectBaseInput.name} is not well formed!`)
        }
        return _selectInput
    } catch (e: any) {
        generalExceptionHandler(
            undefined,
            'critical',
            createSelectBased.name,
            `an error has occured when initializing initializeDommable ${this.name} class: ${e.message}`
        )
        return undefined
    }
}
