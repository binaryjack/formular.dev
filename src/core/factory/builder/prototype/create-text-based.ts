import { Constructor } from '@core/fields/field-base-input/constructors/constructors'
import { TextBaseInput } from '@core/fields/text-base-input/text-base-input'
import { ITextBaseInput } from '@core/fields/text-base-input/text-base-input.types'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { ITrackingOutputProvider } from '@core/tracker/tracker.types'
import { IValidationMethodStrategy } from '@core/validation-strategy/validation-strategy.types'
import { IParserStrategy } from '@core/value-strategy/value-strategy.types'
import { IFieldBuilder } from '../field-builder'

export const createTextBased = function (
    this: IFieldBuilder,
    descriptor: IFieldDescriptor,
    validationStrategies: IValidationMethodStrategy[],
    trackingStrategies: ITrackingOutputProvider[],
    valueStrategies: IParserStrategy<any>[]
): ITextBaseInput | undefined {
    try {
        const _textInput = new TextBaseInput(new Constructor(descriptor, undefined))

        if (
            !_textInput.field.initializeBase(
                descriptor,
                validationStrategies,
                trackingStrategies,
                valueStrategies
            )
        ) {
            throw Error(`The initialization failed ${TextBaseInput.name}`)
        }

        if (!(_textInput instanceof TextBaseInput)) {
            throw Error(`The immediate clone of ${TextBaseInput.name} is not well formed!`)
        }

        return _textInput
    } catch (e: any) {
        generalExceptionHandler(
            undefined,
            'critical',
            createTextBased.name,
            `an error has occured when initializing initializeDommable ${this.name} class: ${e.message}`
        )
        return undefined
    }
}
