import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { IValidationOptions } from '@core/managers/validation-manager/validation-manager.types'

export const txtFileDescriptorMock = (validationOptions: IValidationOptions) => {
    return {
        id: 1,
        name: 'sandboxField',
        label: 'Sandbox Field',
        type: 'text',
        value: '',
        validationOptions: validationOptions,
        isValid: true,
        isDirty: false,
        isPristine: true,
        isFocus: false,
        shouldValidate: true,
        objectValue: null,
        defaultValue: '',
        errors: [],
        guides: [],
        options: []
    } as IFieldDescriptor
}
