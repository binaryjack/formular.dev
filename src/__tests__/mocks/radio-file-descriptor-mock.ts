import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { IOptionItem } from '@core/framework/schema/options-schema/options.scheme.types'
import { IValidationOptions } from '@core/managers/validation-manager/validation-manager.types'

export const radioFileDescriptorMock = (
    validationOptions: IValidationOptions,
    options: IOptionItem[]
) => {
    return {
        id: 1,
        name: 'radioSandbox',
        label: 'Radio Sandbox',
        type: 'radio',
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
        options: options
    } as IFieldDescriptor
}
