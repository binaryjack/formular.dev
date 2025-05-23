import { InputTypeNames } from '@core/framework/common/common.input.types'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { IValidationOptions } from '@core/managers/validation-manager/validation-manager.types'

export const fileDescriptorMock = (
    name: string,
    label: string,
    type: InputTypeNames,
    validationOptions?: IValidationOptions,
    options?: any[],
    mask?: string
): IFieldDescriptor => {
    return {
        id: 1,
        name: name,
        label: label,
        value: null,
        objectValue: null,
        defaultValue: null,
        type: type,
        errors: [],
        guides: [],
        validationOptions: validationOptions ?? {},
        options: options ?? [],
        isValid: true,
        isDirty: false,
        isPristine: true,
        isFocus: false,
        shouldValidate: true,
        mask: mask ?? undefined
    }
}
