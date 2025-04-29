import { IFieldDescriptor } from '../../../../dependency/schema/descriptor/field.descriptor'
import { IValidator } from '../validator.types'

export const initializeValidation = function (this: IValidator, descriptor: IFieldDescriptor) {
    this.field.validationOptions = descriptor.validationOptions
    this.field.shouldValidate = descriptor.shouldValidate ?? true
    /** the On form request will be trigger by the form! It should remains as the basic one in this list */
    this.validationTriggerModeType = ['onBlur', 'onSubmit']
}
