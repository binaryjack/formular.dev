import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { IValidationOptions } from '@core/managers/validation-manager/validation-manager.types'

export const selectFileDescriptorMock = (
    validationOptions: IValidationOptions,
    options: any[]
): IFieldDescriptor => {
    return {
        id: 1,
        name: 'selectedOption',
        label: 'Select an Option',
        value: null,
        objectValue: null,
        defaultValue: null,
        type: 'select',
        errors: [],
        guides: [],
        validationOptions: validationOptions,
        options,
        isValid: true,
        isDirty: false,
        isPristine: true,
        isFocus: false,
        shouldValidate: true
    }
}
