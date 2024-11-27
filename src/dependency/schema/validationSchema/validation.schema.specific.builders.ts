import { ValidationSchemaBuilder } from './validation.schema.builder'
import {
    IValidationSchemaBuilder,
    ValidationSchemaBuildersEnum
} from './validation.schema.builder.types'

export const BaseEmptyBuilder = () =>
    new ValidationSchemaBuilder(ValidationSchemaBuildersEnum.BaseEmptyBuilder)
export const RequiredBuilder = () =>
    new ValidationSchemaBuilder(ValidationSchemaBuildersEnum.RequiredBuilder)

export const MinBuilder = (min: number): IValidationSchemaBuilder =>
    new ValidationSchemaBuilder(ValidationSchemaBuildersEnum.MinBuilder).hasMin(min)

export const MaxBuilder = (max: number): IValidationSchemaBuilder =>
    new ValidationSchemaBuilder(ValidationSchemaBuildersEnum.MaxBuilder).hasMax(max)

export const MinMaxBuilder = (min: number, max: number): IValidationSchemaBuilder =>
    new ValidationSchemaBuilder(ValidationSchemaBuildersEnum.MinMaxBuilder).hasMin(min).hasMax(max)

export const MinAndMinLengthBuilder = (min: number, minLength: number): IValidationSchemaBuilder =>
    new ValidationSchemaBuilder(ValidationSchemaBuildersEnum.MinAndMinLengthBuilder)
        .hasMin(min)
        .hasMinLength(minLength)

export const MaxAndMinLengthBuilder = (max: number, minLength: number): IValidationSchemaBuilder =>
    new ValidationSchemaBuilder(ValidationSchemaBuildersEnum.MaxAndMinLengthBuilder)
        .hasMax(max)
        .hasMinLength(minLength)

export const MinMaxAndMinLengthBuilder = (
    min: number,
    max: number,
    minLength: number
): IValidationSchemaBuilder =>
    new ValidationSchemaBuilder(ValidationSchemaBuildersEnum.MinMaxAndMinLengthBuilder)
        .hasMin(min)
        .hasMax(max)
        .hasMinLength(minLength)

export const MinAndMaxLengthBuilder = (min: number, maxLength: number): IValidationSchemaBuilder =>
    new ValidationSchemaBuilder(ValidationSchemaBuildersEnum.MinAndMaxLengthBuilder)
        .hasMin(min)
        .hasMaxLength(maxLength)

export const MaxAndMaxLengthBuilder = (max: number, maxLength: number): IValidationSchemaBuilder =>
    new ValidationSchemaBuilder(ValidationSchemaBuildersEnum.MaxAndMaxLengthBuilder)
        .hasMax(max)
        .hasMaxLength(maxLength)

export const MinMaxAndMaxLengthBuilder = (
    min: number,
    max: number,
    maxLength: number
): IValidationSchemaBuilder =>
    new ValidationSchemaBuilder(ValidationSchemaBuildersEnum.MinMaxAndMaxLengthBuilder)
        .hasMin(min)
        .hasMax(max)
        .hasMaxLength(maxLength)

export const MinMinLengthAndMaxLengthBuilder = (
    min: number,
    minLength: number,
    maxLength: number
): IValidationSchemaBuilder =>
    new ValidationSchemaBuilder(ValidationSchemaBuildersEnum.MinMinLengthAndMaxLengthBuilder)
        .hasMin(min)
        .hasMinLength(minLength)
        .hasMaxLength(maxLength)

export const MaxMinLengthAndMaxLengthBuilder = (
    max: number,
    minLength: number,
    maxLength: number
): IValidationSchemaBuilder =>
    new ValidationSchemaBuilder(ValidationSchemaBuildersEnum.MaxMinLengthAndMaxLengthBuilder)
        .hasMax(max)
        .hasMinLength(minLength)
        .hasMaxLength(maxLength)

export const MinMaxMinLengthAndMaxLengthBuilder = (
    min: number,
    max: number,
    minLength: number,
    maxLength: number
): IValidationSchemaBuilder =>
    new ValidationSchemaBuilder(ValidationSchemaBuildersEnum.MinMaxMinLengthAndMaxLengthBuilder)
        .hasMin(min)
        .hasMax(max)
        .hasMinLength(minLength)
        .hasMaxLength(maxLength)

export const MinLengthBuilder = (minLength: number): IValidationSchemaBuilder =>
    new ValidationSchemaBuilder(ValidationSchemaBuildersEnum.MinLengthBuilder).hasMinLength(
        minLength
    )

export const MaxLengthBuilder = (maxLength: number): IValidationSchemaBuilder =>
    new ValidationSchemaBuilder(ValidationSchemaBuildersEnum.MaxLengthBuilder).hasMaxLength(
        maxLength
    )

export const MinLengthAndMaxLengthBuilder = (
    minLength: number,
    maxLength: number
): IValidationSchemaBuilder =>
    new ValidationSchemaBuilder(ValidationSchemaBuildersEnum.MinLengthAndMaxLengthBuilder)
        .hasMinLength(minLength)
        .hasMaxLength(maxLength)
