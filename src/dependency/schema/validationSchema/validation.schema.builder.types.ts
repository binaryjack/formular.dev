import { IValidationSchema } from './validation.schema.types'

export type minMaxTypeMethodBuilder = () => IValidationSchemaBuilder
export type minMaxTypeMethodBuilder1 = (Argument1: number) => IValidationSchemaBuilder
export type minMaxTypeMethodBuilder2 = (
    Argument1: number,
    Argument2: number
) => IValidationSchemaBuilder
export type minMaxTypeMethodBuilder3 = (
    Argument1: number,
    Argument2: number,
    Argument3: number
) => IValidationSchemaBuilder
export type minMaxTypeMethodBuilder4 = (
    Argument1: number,
    Argument2: number,
    Argument3: number,
    Argument4: number
) => IValidationSchemaBuilder

export type minMaxMethodBuilderTypes =
    | minMaxTypeMethodBuilder
    | minMaxTypeMethodBuilder1
    | minMaxTypeMethodBuilder2
    | minMaxTypeMethodBuilder3
    | minMaxTypeMethodBuilder4

export interface IValidationSchemaBuilder extends IValidationSchema {
    new (name: string): IValidationSchemaBuilder
    fromBuilder: (baseBuilder?: IValidationSchemaBuilder) => IValidationSchemaBuilder
    isRequired: (required: boolean) => IValidationSchemaBuilder
    hasMin: (min: number) => IValidationSchemaBuilder
    hasMax: (max: number) => IValidationSchemaBuilder
    hasMinLength: (minLength: number) => IValidationSchemaBuilder
    hasMaxLength: (maxLength: number) => IValidationSchemaBuilder
    hasPattern: (pattern?: RegExp) => IValidationSchemaBuilder
    hasCustomGuide: (messageOrKey?: string) => IValidationSchemaBuilder
    hasCustomError: (messageOrKey?: string) => IValidationSchemaBuilder
    build: () => IValidationSchema
}

export enum ValidationSchemaBuildersEnum {
    BaseEmptyBuilder = 'BaseEmptyBuilder',
    RequiredBuilder = 'RequiredBuilder',
    MinBuilder = 'MinBuilder',
    MaxBuilder = 'MaxBuilder',
    MinMaxBuilder = 'MinMaxBuilder',
    MinAndMinLengthBuilder = 'MinAndMinLengthBuilder',
    MaxAndMinLengthBuilder = 'MaxAndMinLengthBuilder',
    MinMaxAndMinLengthBuilder = 'MinMaxAndMinLengthBuilder',

    MinAndMaxLengthBuilder = 'MinAndMaxLengthBuilder',
    MinMaxAndMaxLengthBuilder = 'MinMaxAndMaxLengthBuilder',

    MaxAndMaxLengthBuilder = 'MaxAndMaxLengthBuilder',
    MinMinLengthAndMaxLengthBuilder = 'MinMinLengthAndMaxLengthBuilder',

    MaxMinLengthAndMaxLengthBuilder = 'MaxMinLengthAndMaxLengthBuilder',
    MinMaxMinLengthAndMaxLengthBuilder = 'MinMaxMinLengthAndMaxLengthBuilder',

    MinLengthBuilder = 'MinLengthBuilder',
    MaxLengthBuilder = 'MaxLengthBuilder',
    MinLengthAndMaxLengthBuilder = 'MinLengthAndMaxLengthBuilder'
}
