import { IValidationSchema } from '../../validation.schema.types'
import {
    IValidationSchemaBuilder,
    ValidationSchemaBuilderType
} from '../builder/validation.schema.builder.types'

export interface IValidationSchemaFactory {
    new (): IValidationSchemaFactory
    builders: ValidationSchemaBuilderType[]
    addBuilders: (...builders: ValidationSchemaBuilderType[]) => void
    /** If we need a min max min length max length based validation we can start here
     *  put the name of desired combination or alone validation definition and get the builder
     *  then: use the builder to prep for the finalizer
     * if not found it returns an empty validation builder
     */
    createValidationSchemaBuilder: <ValidationSchemaBuilderType>(
        builderName: string
    ) => ValidationSchemaBuilderType
    /**
     * create or finalize previousely done with createMinMaxBasedBuilder
     * @param base  ()
     * @param required
     * @param pattern
     * @param customGuide
     * @param customError
     * @returns
     */
    finalizer: (
        required: boolean,
        base?: IValidationSchemaBuilder,
        pattern?: RegExp,
        customGuide?: string,
        customError?: string
    ) => IValidationSchema | undefined
    create: (
        required: boolean,
        pattern?: RegExp,
        customGuide?: string,
        customError?: string
    ) => IValidationSchema | undefined
}
