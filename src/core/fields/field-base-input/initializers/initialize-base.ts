import { IFieldBaseInput } from '@core/fields/field-base-input/field-input-base-types'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { ITrackingOutputProvider } from '@core/tracker/tracker.types'
import { IValidationMethodStrategy } from '@core/validation-strategy/validation-strategy.types'
import { IParserStrategy } from '@core/value-strategy/value-strategy.types'

export const initializeBase = function (
    this: IFieldBaseInput,
    descriptor: IFieldDescriptor,
    validationStrategies: IValidationMethodStrategy[],
    trackingStrategies: ITrackingOutputProvider[],
    valueStrategies: IParserStrategy<any>[]
): boolean {
    try {
        this.initializeTracking(trackingStrategies)
            .initializeNotifier()
            .initializeDommable()
            .initializeValidationStrategy(descriptor, ...validationStrategies)
            .initializeStyle()
            .initializeDrawerableState()
            .initializeValueStrategy(...valueStrategies)

        return this.checkInitialized()
    } catch (e: any) {
        generalExceptionHandler(
            undefined,
            'critical',
            this.name,
            `an error has occured when initializing initializeDommable ${this.name} class: ${e.message}`
        )
        return false
    }
}
