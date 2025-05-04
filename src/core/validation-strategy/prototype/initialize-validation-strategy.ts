import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { IValidationStrategy } from '../validation-strategy.types'

export const initializeValidationStrategy = function (
    this: IValidationStrategy,
    descriptor: IFieldDescriptor
) {
    this.validationOptions = descriptor.validationOptions
    this.shouldValidate = descriptor.shouldValidate ?? true

    this.isValidating = false
    this.validationTriggerModeType = []
    this.validationResults = []
    /** the On form request will be trigger by the form! It should remains as the basic one in this list */
    this.validationTriggerModeType = []
}
