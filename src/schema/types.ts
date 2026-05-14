/**
 * Schema system types
 * Core type definitions for the formular.dev schema system
 */

import type { IFieldDescriptor } from '../core/framework/schema/descriptor/field.descriptor'
import { SchemaErrorCode } from './constants'

/**
 * Validation error result
 */
export interface IValidationError {
    readonly path: string[]
    readonly message: string
    readonly code: string
}

/**
 * Successful parse result
 */
export interface IParseSuccess<T> {
    readonly success: true
    readonly data: T
}

/**
 * Failed parse result
 */
export interface IParseFailure {
    readonly success: false
    readonly error: IValidationError
}

/**
 * Parse result union
 */
export type IParseResult<T> = IParseSuccess<T> | IParseFailure

/**
 * Schema refinement function
 */
export type IRefinementFn<T> = (value: T) => boolean

/**
 * Schema refinement options
 */
export interface IRefinementOptions {
    readonly message?: string
    readonly code?: SchemaErrorCode
}

/**
 * Schema transformation function
 */
export type ITransformFn<TInput, TOutput> = (value: TInput) => TOutput

/**
 * Base schema interface
 * All schema types implement this interface
 */
export interface ISchemaBase<TOutput = unknown, TInput = TOutput> {
    /**
     * Parse and validate input value
     * Throws error if validation fails
     */
    parse(value: TInput): TOutput

    /**
     * Safely parse and validate input value
     * Returns result object instead of throwing
     */
    safeParse(value: TInput): IParseResult<TOutput>

    /**
     * Make this schema optional (allows undefined)
     */
    optional(): ISchemaBase<TOutput | undefined, TInput | undefined>

    /**
     * Make this schema nullable (allows null)
     */
    nullable(): ISchemaBase<TOutput | null, TInput | null>

    /**
     * Set default value for undefined inputs
     */
    default(value: TOutput): ISchemaBase<TOutput, TInput>

    /**
     * Transform output value
     */
    transform<TNewOutput>(fn: ITransformFn<TOutput, TNewOutput>): ISchemaBase<TNewOutput, TInput>

    /**
     * Add custom refinement/validation
     */
    refine(
        check: IRefinementFn<TOutput>,
        options?: IRefinementOptions
    ): ISchemaBase<TOutput, TInput>

    /**
     * Get the inferred TypeScript type
     * Internal use only
     */
    readonly _output: TOutput
    readonly _input: TInput
}

/**
 * String schema interface
 */
export interface IStringSchema extends ISchemaBase<string> {
    email(message?: string): IStringSchema
    url(message?: string): IStringSchema
    min(length: number, message?: string): IStringSchema
    max(length: number, message?: string): IStringSchema
    length(length: number, message?: string): IStringSchema
    pattern(regex: RegExp, message?: string): IStringSchema
    trim(): IStringSchema
    toLowerCase(): IStringSchema
    toUpperCase(): IStringSchema
    nonempty(message?: string): IStringSchema
    debounce(milliseconds: number): IStringSchema

    // Country-specific validators
    phone(countryCode: string, message?: string): IStringSchema
    postalCode(countryCode: string, message?: string): IStringSchema
    ahv(message?: string): IStringSchema
}

/**
 * Number schema interface
 */
export interface INumberSchema extends ISchemaBase<number> {
    min(value: number, message?: string): INumberSchema
    max(value: number, message?: string): INumberSchema
    int(message?: string): INumberSchema
    positive(message?: string): INumberSchema
    negative(message?: string): INumberSchema
    nonpositive(message?: string): INumberSchema
    nonnegative(message?: string): INumberSchema
    multipleOf(value: number, message?: string): INumberSchema
    finite(message?: string): INumberSchema
    safe(message?: string): INumberSchema
    debounce(milliseconds: number): INumberSchema
}

/**
 * Boolean schema interface
 */
export interface IBooleanSchema extends ISchemaBase<boolean> {
    true(message?: string): IBooleanSchema
    false(message?: string): IBooleanSchema
}

/**
 * Date schema interface
 */
export interface IDateSchema extends ISchemaBase<Date> {
    min(date: Date, message?: string): IDateSchema
    max(date: Date, message?: string): IDateSchema
}

/**
 * Literal schema interface
 */
export interface ILiteralSchema<T extends string | number | boolean> extends ISchemaBase<T> {
    readonly value: T
}

/**
 * Enum schema interface
 */
export interface IEnumSchema<T extends readonly [string, ...string[]]> extends ISchemaBase<
    T[number]
> {
    readonly values: T
}

/**
 * Array schema interface
 */
export interface IArraySchema<T> extends ISchemaBase<T[]> {
    min(length: number, message?: string): IArraySchema<T>
    max(length: number, message?: string): IArraySchema<T>
    length(length: number, message?: string): IArraySchema<T>
    nonempty(message?: string): IArraySchema<T>
    readonly element: ISchemaBase<T>
}

/**
 * Object schema shape
 */
export type IObjectShape = Record<string, ISchemaBase>

/**
 * Infer type from object shape
 */
export type IInferShape<T extends IObjectShape> = {
    [K in keyof T]: T[K]['_output']
}

/**
 * Object schema interface
 */
export interface IObjectSchema<T extends IObjectShape> extends ISchemaBase<IInferShape<T>> {
    readonly shape: T
    partial(): IObjectSchema<{ [K in keyof T]: ISchemaBase<IInferShape<T>[K] | undefined> }>
    required(): IObjectSchema<T>
    pick<K extends keyof T>(keys: readonly K[]): IObjectSchema<Pick<T, K>>
    omit<K extends keyof T>(keys: readonly K[]): IObjectSchema<Omit<T, K>>
    extend<U extends IObjectShape>(schema: U): IObjectSchema<T & U>
    merge<U extends IObjectShape>(schema: IObjectSchema<U>): IObjectSchema<T & U>
}

/**
 * Union schema interface
 */
export interface IUnionSchema<T extends readonly ISchemaBase[]> extends ISchemaBase<
    T[number]['_output']
> {
    readonly options: T
}

/**
 * Record schema interface
 */
export interface IRecordSchema<K extends string | number, V> extends ISchemaBase<Record<K, V>> {
    readonly keySchema: ISchemaBase<K>
    readonly valueSchema: ISchemaBase<V>
}

/**
 * Type inference helper
 */
export type IInfer<T extends ISchemaBase> = T['_output']

/**
 * Validator preset configuration
 */
export interface IValidatorPreset {
    readonly name: string
    readonly description: string
    readonly schema: IObjectSchema<IObjectShape>
    readonly fields: Record<string, IFieldDescriptor>
}

/**
 * Validator preset registry
 */
export interface IValidatorPresetRegistry {
    register(preset: IValidatorPreset): void
    get(name: string): IValidatorPreset | undefined
    list(): IValidatorPreset[]
    has(name: string): boolean
}
