import { IValidationLocalize } from './localize/localize.type'
import { TranslatioBuilderType } from './localize/localize.utils'
import { IFieldDescriptor } from './schema/descriptor/field.descriptor'
import { IEntityScheme } from './schema/fieldSchema/field.schema.types'
import { ValidationLocalizeKeys } from './schema/validationSchema/validation.localize.keys'
import {
    IMax,
    IMaxLength,
    IMin,
    IMinLength,
    IPattern,
    IRequired,
    IValidationOptions
} from './validation'

export const mapSchemaToFieldDescriptor = (
    scheme: IEntityScheme,
    gt: TranslatioBuilderType,
    translations: IValidationLocalize
): IFieldDescriptor[] => {
    const output: IFieldDescriptor[] = []

    const gtReady = gt(translations)
    const requiredError = gtReady(ValidationLocalizeKeys.requiredError)
    const requiredGuide = gtReady(ValidationLocalizeKeys.requiredGuide)
    const maxError = gtReady(ValidationLocalizeKeys.maxError)
    const maxGuide = gtReady(ValidationLocalizeKeys.maxGuide)
    const minError = gtReady(ValidationLocalizeKeys.minError)
    const minGuide = gtReady(ValidationLocalizeKeys.minGuide)
    const maxLengthError = gtReady(ValidationLocalizeKeys.maxLengthError)
    const maxLengthGuide = gtReady(ValidationLocalizeKeys.maxLengthGuide)
    const minLengthError = gtReady(ValidationLocalizeKeys.minLengthError)
    const minLengthGuide = gtReady(ValidationLocalizeKeys.minLengthGuide)
    const patternError = gtReady(ValidationLocalizeKeys.patternError)
    const patternGuide = gtReady(ValidationLocalizeKeys.patternGuide)

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
                required: {
                    required: f.required,
                    error: f.required ? requiredError() : '',
                    guide: f.required ? requiredGuide() : ''
                } as IRequired,
                max: f.max
                    ? ({
                          max: f.max,
                          error: f.max !== null ? maxError(`${f.max}`) : f.customGuide,
                          guide: f.max !== null ? maxGuide(`${f.max}`) : f.customGuide
                      } as IMax | undefined)
                    : undefined,
                min: f.min
                    ? ({
                          min: f.min,
                          error: f.min !== null ? minError(`${f.min}`) : f.customGuide,
                          guide: f.min !== null ? minGuide(`${f.min}`) : f.customGuide
                      } as IMin | undefined)
                    : undefined,
                maxLength: f.maxLength
                    ? ({
                          maxLength: f.maxLength,
                          error:
                              f.maxLength !== null
                                  ? maxLengthError(`${f.maxLength}`)
                                  : f.customGuide,
                          guide:
                              f.maxLength !== null
                                  ? maxLengthGuide(`${f.maxLength}`)
                                  : f.customGuide
                      } as IMaxLength | undefined)
                    : undefined,
                minLength: f.minLength
                    ? ({
                          minLength: f.minLength,
                          error:
                              f.minLength !== null
                                  ? minLengthError(`${f.minLength}`)
                                  : f.customGuide,
                          guide:
                              f.minLength !== null
                                  ? minLengthGuide(`${f.minLength}`)
                                  : f.customGuide
                      } as IMinLength | undefined)
                    : undefined,
                pattern: f.pattern
                    ? ({
                          pattern: f.pattern,
                          error: f.pattern !== null ? patternError(`${f.pattern}`) : f.customGuide,
                          guide: f.pattern !== null ? patternGuide(`${f.pattern}`) : f.customGuide
                      } as IPattern | undefined)
                    : undefined
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
