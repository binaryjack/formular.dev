import { IFieldDescriptor } from './common'
import { IEntityScheme } from './schema/field/field.scheme.types'
import {
    IMax,
    IMaxLength,
    IMin,
    IMinLength,
    IPattern,
    IRequired,
    IValidationOptions
} from './validation'

export const mapSchemaToFieldDescriptor = (scheme: IEntityScheme): IFieldDescriptor[] => {
    const output: IFieldDescriptor[] = []

    scheme.properties.forEach((f) => {
        const newF: IFieldDescriptor = {
            id: f.id,
            isDirty: false,
            isFocus: false,
            isPristine: true,
            isValid: false,
            loaded: false,
            label: f.name,
            name: f.name,
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
                required: { required: f.required } as IRequired,
                max:
                    f.max === null
                        ? undefined
                        : ({
                              max: f.max,
                              error: f.customError,
                              guide: f.customGuide
                          } as IMax | undefined),
                min:
                    f.min === null
                        ? undefined
                        : ({
                              min: f.min,
                              error: f.customError,
                              guide: f.customGuide
                          } as IMin | undefined),
                maxLength:
                    f.maxLength === null
                        ? undefined
                        : ({
                              maxLength: f.maxLength,
                              error: f.customError,
                              guide: f.customGuide
                          } as IMaxLength | undefined),
                minLength:
                    f.minLength === null
                        ? undefined
                        : ({
                              minLength: f.minLength,
                              error: f.customError,
                              guide: f.customGuide
                          } as IMinLength | undefined),
                pattern:
                    f.pattern === null
                        ? undefined
                        : ({
                              pattern: f.pattern,
                              error: f.customError,
                              guide: f.customGuide
                          } as IPattern | undefined)
            } as IValidationOptions,
            objectValue: null,
            defaultValue: null
        }
        output.push(newF)
        // console.log(output)
    })
    const newOutPut = output.sort((a, b) => a.id - b.id)
    return newOutPut
}
