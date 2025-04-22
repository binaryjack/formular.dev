import { IFieldDescriptor } from '../../../../dependency/schema/descriptor/field.descriptor'
import { IFieldInput } from '../fieldInput.types'

export const initializeValidation = function (this: IFieldInput, descriptor: IFieldDescriptor) {
    this.validationOptions = descriptor.validationOptions
    /** the On form request will be trigger by the form! It should remains as the basic one in this list */
    this.validationTriggerModeType = ['onBlur', 'onSubmit']
}
