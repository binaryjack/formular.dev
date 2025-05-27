import { conventions, MissingPropEnum } from '@components/context/conventions/conventions'
import { DescriptorValidationBuilder } from '@core/managers/validation-manager/builder/descriptor-validation-builder'
import {
    IMax,
    IMaxLength,
    IMin,
    IMinLength,
    IPattern,
    IRequired,
    IValidationOptions,
    ValidationErrorsCodes
} from '@core/managers/validation-manager/validation-manager.types'
import { ValidationLocalizeKeys } from '../../managers/validation-manager/validation-schema/validation.localize.keys'
import { IValidationLocalize } from '../localize/localize.type'
import { TranslatioBuilderType } from '../localize/localize.utils'
import { newFieldError } from '../models/errors/new-field-error'
import { newFieldGuide } from '../models/errors/new-field-guide'
import { IFieldDescriptor } from '../schema/descriptor/field.descriptor'
import { IEntityScheme } from '../schema/field-schema/field.schema.types'

const maxValidationOptionsBuilder = (
    max: number | null,
    fieldName: string,
    error: (data?: string, data2?: string) => string,
    guide: (data?: string, data2?: string) => string
) =>
    new DescriptorValidationBuilder<IMax>('max')
        ?.setMax(max)
        .setError(() => newFieldError(fieldName, ValidationErrorsCodes.max, error()))
        .setGuide(() => newFieldGuide(fieldName, ValidationErrorsCodes.max, guide()))
        .build()

const minValidationOptionsBuilder = (
    min: number | null,
    fieldName: string,
    error: (data?: string, data2?: string) => string,
    guide: (data?: string, data2?: string) => string
) =>
    new DescriptorValidationBuilder<IMin>('min')
        ?.setMin(min)
        .setError(() => newFieldError(fieldName, ValidationErrorsCodes.min, error()))
        .setGuide(() => newFieldGuide(fieldName, ValidationErrorsCodes.min, guide()))
        .build()

const maxLengthValidationOptionsBuilder = (
    maxLength: number | null,
    fieldName: string,
    error: (data?: string, data2?: string) => string,
    guide: (data?: string, data2?: string) => string
) =>
    new DescriptorValidationBuilder<IMaxLength>('maxLength')
        ?.setMaxLength(maxLength)
        .setError(() => newFieldError(fieldName, ValidationErrorsCodes.maxLength, error()))
        .setGuide(() => newFieldGuide(fieldName, ValidationErrorsCodes.maxLength, guide()))
        .build()

const minLengthValidationOptionsBuilder = (
    minLength: number | null,
    fieldName: string,
    error: (data?: string, data2?: string) => string,
    guide: (data?: string, data2?: string) => string
) =>
    new DescriptorValidationBuilder<IMinLength>('minLength')
        ?.setMinLength(minLength)
        .setError(() => newFieldError(fieldName, ValidationErrorsCodes.minLength, error()))
        .setGuide(() => newFieldGuide(fieldName, ValidationErrorsCodes.minLength, guide()))
        .build()

const patternValidationOptionsBuilder = (
    pattern: RegExp | null,
    fieldName: string,
    error: (data?: string, data2?: string) => string,
    guide: (data?: string, data2?: string) => string
) =>
    new DescriptorValidationBuilder<IPattern>('pattern')
        ?.setPattern(pattern)
        .setError(() => newFieldError(fieldName, ValidationErrorsCodes.pattern, error()))
        .setGuide(() => newFieldGuide(fieldName, ValidationErrorsCodes.pattern, guide()))
        .build()

const requiredValidationOptionsBuilder = (
    required: boolean,
    fieldName: string,
    error: (data?: string, data2?: string) => string,
    guide: (data?: string, data2?: string) => string
) =>
    new DescriptorValidationBuilder<IRequired>('required')
        ?.setRequired(required)
        .setError(() => newFieldError(fieldName, ValidationErrorsCodes.required, error()))
        .setGuide(() => newFieldGuide(fieldName, ValidationErrorsCodes.required, guide()))
        .build()

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
        // Use builder functions for all validation options for consistency
        const maxValidationOptions = maxValidationOptionsBuilder(
            f.max,
            f.name ?? conventions.IsMissing(MissingPropEnum.NAME, mapSchemaToFieldDescriptor.name),
            maxError,
            maxGuide
        )

        const minValidationOptions = minValidationOptionsBuilder(
            f.min,
            f.name ?? conventions.IsMissing(MissingPropEnum.NAME, mapSchemaToFieldDescriptor.name),
            minError,
            minGuide
        )

        const maxLengthValidationOptions = maxLengthValidationOptionsBuilder(
            f.maxLength,
            f.name ?? conventions.IsMissing(MissingPropEnum.NAME, mapSchemaToFieldDescriptor.name),
            maxLengthError,
            maxLengthGuide
        )

        const minLengthValidationOptions = minLengthValidationOptionsBuilder(
            f.minLength,
            f.name ?? conventions.IsMissing(MissingPropEnum.NAME, mapSchemaToFieldDescriptor.name),
            minLengthError,
            minLengthGuide
        )

        const patternValidationOptions = patternValidationOptionsBuilder(
            f.pattern,
            f.name ?? conventions.IsMissing(MissingPropEnum.NAME, mapSchemaToFieldDescriptor.name),
            patternError,
            patternGuide
        )
        const requiredValidationOptions = requiredValidationOptionsBuilder(
            f.required,
            f.name ?? conventions.IsMissing(MissingPropEnum.NAME, mapSchemaToFieldDescriptor.name),
            requiredError,
            requiredGuide
        )

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
                required: requiredValidationOptions,
                max: maxValidationOptions,
                min: minValidationOptions,
                maxLength: maxLengthValidationOptions,
                minLength: minLengthValidationOptions,
                pattern: patternValidationOptions
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
