import { IValidationSchema } from '../../validation.schema.types'

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

export type ValidationSchemaBuilderType = (...args: number[]) => IValidationSchemaBuilder
