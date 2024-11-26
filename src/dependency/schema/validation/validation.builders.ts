import { ValidationDataBuilder } from './validation.builder'
import { IValidationDataBuilder, ValidationBuildersEnum } from './validation.types'

export const BaseEmptyBuilder = () =>
    new ValidationDataBuilder(ValidationBuildersEnum.BaseEmptyBuilder)
export const RequiredBuilder = () =>
    new ValidationDataBuilder(ValidationBuildersEnum.RequiredBuilder)

export const MinBuilder = (min: number): IValidationDataBuilder =>
    new ValidationDataBuilder(ValidationBuildersEnum.MinBuilder).hasMin(min)

export const MaxBuilder = (max: number): IValidationDataBuilder =>
    new ValidationDataBuilder(ValidationBuildersEnum.MaxBuilder).hasMax(max)

export const MinMaxBuilder = (min: number, max: number): IValidationDataBuilder =>
    new ValidationDataBuilder(ValidationBuildersEnum.MinMaxBuilder).hasMin(min).hasMax(max)

export const MinAndMinLengthBuilder = (min: number, minLength: number): IValidationDataBuilder =>
    new ValidationDataBuilder(ValidationBuildersEnum.MinAndMinLengthBuilder)
        .hasMin(min)
        .hasMinLength(minLength)

export const MaxAndMinLengthBuilder = (max: number, minLength: number): IValidationDataBuilder =>
    new ValidationDataBuilder(ValidationBuildersEnum.MaxAndMinLengthBuilder)
        .hasMax(max)
        .hasMinLength(minLength)

export const MinMaxAndMinLengthBuilder = (
    min: number,
    max: number,
    minLength: number
): IValidationDataBuilder =>
    new ValidationDataBuilder(ValidationBuildersEnum.MinMaxAndMinLengthBuilder)
        .hasMin(min)
        .hasMax(max)
        .hasMinLength(minLength)

export const MinAndMaxLengthBuilder = (min: number, maxLength: number): IValidationDataBuilder =>
    new ValidationDataBuilder(ValidationBuildersEnum.MinAndMaxLengthBuilder)
        .hasMin(min)
        .hasMaxLength(maxLength)

export const MaxAndMaxLengthBuilder = (max: number, maxLength: number): IValidationDataBuilder =>
    new ValidationDataBuilder(ValidationBuildersEnum.MaxAndMaxLengthBuilder)
        .hasMax(max)
        .hasMaxLength(maxLength)

export const MinMaxAndMaxLengthBuilder = (
    min: number,
    max: number,
    maxLength: number
): IValidationDataBuilder =>
    new ValidationDataBuilder(ValidationBuildersEnum.MinMaxAndMaxLengthBuilder)
        .hasMin(min)
        .hasMax(max)
        .hasMaxLength(maxLength)

export const MinMinLengthAndMaxLengthBuilder = (
    min: number,
    minLength: number,
    maxLength: number
): IValidationDataBuilder =>
    new ValidationDataBuilder(ValidationBuildersEnum.MinMinLengthAndMaxLengthBuilder)
        .hasMin(min)
        .hasMinLength(minLength)
        .hasMaxLength(maxLength)

export const MaxMinLengthAndMaxLengthBuilder = (
    max: number,
    minLength: number,
    maxLength: number
): IValidationDataBuilder =>
    new ValidationDataBuilder(ValidationBuildersEnum.MaxMinLengthAndMaxLengthBuilder)
        .hasMax(max)
        .hasMinLength(minLength)
        .hasMaxLength(maxLength)

export const MinMaxMinLengthAndMaxLengthBuilder = (
    min: number,
    max: number,
    minLength: number,
    maxLength: number
): IValidationDataBuilder =>
    new ValidationDataBuilder(ValidationBuildersEnum.MinMaxMinLengthAndMaxLengthBuilder)
        .hasMin(min)
        .hasMax(max)
        .hasMinLength(minLength)
        .hasMaxLength(maxLength)

export const MinLengthBuilder = (minLength: number): IValidationDataBuilder =>
    new ValidationDataBuilder(ValidationBuildersEnum.MinLengthBuilder).hasMinLength(minLength)

export const MaxLengthBuilder = (maxLength: number): IValidationDataBuilder =>
    new ValidationDataBuilder(ValidationBuildersEnum.MaxLengthBuilder).hasMaxLength(maxLength)

export const MinLengthAndMaxLengthBuilder = (
    minLength: number,
    maxLength: number
): IValidationDataBuilder =>
    new ValidationDataBuilder(ValidationBuildersEnum.MinLengthAndMaxLengthBuilder)
        .hasMinLength(minLength)
        .hasMaxLength(maxLength)
