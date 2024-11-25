import { ValidationDataBuilder } from './validation.builder'
import { IValidationDataBuilder, ValidationBuildersEnum } from './validation.types'

export const BaseEmptyBuilder = () => new ValidationDataBuilder(ValidationBuildersEnum.empty)
export const RequiredBuilder = () => new ValidationDataBuilder(ValidationBuildersEnum.required)

export const MinBuilder = (min: number): IValidationDataBuilder =>
    new ValidationDataBuilder(ValidationBuildersEnum.min).hasMin(min)

export const MaxBuilder = (max: number): IValidationDataBuilder =>
    new ValidationDataBuilder(ValidationBuildersEnum.max).hasMax(max)

export const MinMaxBuilder = (min: number, max: number): IValidationDataBuilder =>
    new ValidationDataBuilder(ValidationBuildersEnum.minMax).hasMin(min).hasMax(max)

export const MinAndMinLengthBuilder = (min: number, minLength: number): IValidationDataBuilder =>
    new ValidationDataBuilder(ValidationBuildersEnum.minMinLength)
        .hasMin(min)
        .hasMinLength(minLength)

export const MaxAndMinLengthBuilder = (max: number, minLength: number): IValidationDataBuilder =>
    new ValidationDataBuilder(ValidationBuildersEnum.maxMinLength)
        .hasMax(max)
        .hasMinLength(minLength)

export const MinMaxAndMinLengthBuilder = (
    min: number,
    max: number,
    minLength: number
): IValidationDataBuilder =>
    new ValidationDataBuilder(ValidationBuildersEnum.minMaxMinLength)
        .hasMin(min)
        .hasMax(max)
        .hasMinLength(minLength)

export const MinAndMaxLengthBuilder = (min: number, maxLength: number): IValidationDataBuilder =>
    new ValidationDataBuilder(ValidationBuildersEnum.minMaxLength)
        .hasMin(min)
        .hasMaxLength(maxLength)

export const MaxAndMaxLengthBuilder = (max: number, maxLength: number): IValidationDataBuilder =>
    new ValidationDataBuilder(ValidationBuildersEnum.maxMaxLength)
        .hasMax(max)
        .hasMaxLength(maxLength)

export const MinMaxAndMaxLengthBuilder = (
    min: number,
    max: number,
    maxLength: number
): IValidationDataBuilder =>
    new ValidationDataBuilder(ValidationBuildersEnum.minMaxMaxLength)
        .hasMin(min)
        .hasMax(max)
        .hasMaxLength(maxLength)

export const MinMinLengthAndMaxLengthBuilder = (
    min: number,
    minLength: number,
    maxLength: number
): IValidationDataBuilder =>
    new ValidationDataBuilder(ValidationBuildersEnum.minMinLengthMaxLength)
        .hasMin(min)
        .hasMinLength(minLength)
        .hasMaxLength(maxLength)

export const MaxMinLengthAndMaxLengthBuilder = (
    max: number,
    minLength: number,
    maxLength: number
): IValidationDataBuilder =>
    new ValidationDataBuilder(ValidationBuildersEnum.maxMinLengthMaxLength)
        .hasMax(max)
        .hasMinLength(minLength)
        .hasMaxLength(maxLength)

export const MinMaxMinLengthAndMaxLengthBuilder = (
    min: number,
    max: number,
    minLength: number,
    maxLength: number
): IValidationDataBuilder =>
    new ValidationDataBuilder(ValidationBuildersEnum.minMaxMinLengthMaxLength)
        .hasMin(min)
        .hasMax(max)
        .hasMinLength(minLength)
        .hasMaxLength(maxLength)

export const MinLengthBuilder = (minLength: number): IValidationDataBuilder =>
    new ValidationDataBuilder(ValidationBuildersEnum.minLength).hasMinLength(minLength)

export const MaxLengthBuilder = (maxLength: number): IValidationDataBuilder =>
    new ValidationDataBuilder(ValidationBuildersEnum.maxLength).hasMaxLength(maxLength)

export const MinLengthAndMaxLengthBuilder = (
    minLength: number,
    maxLength: number
): IValidationDataBuilder =>
    new ValidationDataBuilder(ValidationBuildersEnum.minLengthMaxLength)
        .hasMinLength(minLength)
        .hasMaxLength(maxLength)
