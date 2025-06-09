import { conventions, MissingPropEnum } from '@components/context/conventions/conventions'

import { IValidationOptions } from '@core/managers/validation-manager/validation-manager.types'
import { IFieldDescriptor } from '../schema/descriptor/field.descriptor'
import { IEntityScheme } from '../schema/field-schema/field.schema.types'

export const mapSchemaToFieldDescriptor = (scheme: IEntityScheme): IFieldDescriptor[] => {
    const output: IFieldDescriptor[] = []

    scheme.properties.forEach((f) => {
        const newF: IFieldDescriptor = {
            id: f.id ?? conventions.IsMissing(MissingPropEnum.ID, mapSchemaToFieldDescriptor.name),
            isDirty: false,
            isFocus: false,
            isPristine: true,
            isValid: false,
            loaded: false,
            label:
                f.name ??
                conventions.IsMissing(MissingPropEnum.LABEL, mapSchemaToFieldDescriptor.name),
            name:
                f.name ??
                conventions.IsMissing(MissingPropEnum.NAME, mapSchemaToFieldDescriptor.name),
            type: f.type,
            value: null,
            target: f.target === null || f.target === '' ? undefined : f.target,
            options: f?.options.map((o, i) => {
                return { ...o, sequenceId: i }
            }),
            errors: [],
            guides: [],
            shouldValidate: f.shouldValidate,
            expectedValue:
                f.expectedValue === null || f.expectedValue === '' ? undefined : f.expectedValue,
            validationOptions: {
                required: f.required,
                max: f.max,
                min: f.min,
                maxLength: f.maxLength,
                minLength: f.minLength,
                pattern: f.pattern
            } as IValidationOptions,
            objectValue: null,
            defaultValue: f.defaultValue,
            mask: f.mask ?? undefined
        }
        output.push(newF)
        // console.log(output)
    })
    const newOutPut = output.sort((a, b) => a.id - b.id)
    return newOutPut
}
