export interface ISchemaValidationData {
    name: string
    required: boolean
    shouldValidate?: boolean
    pattern?: RegExp
    min?: number
    max?: number
    minLength?: number
    maxLength?: number
    customGuide?: string
    customError?: string
}

export type minMaxTypeMethodBuilder = () => IValidationDataBuilder
export type minMaxTypeMethodBuilder1 = (Argument1: number) => IValidationDataBuilder
export type minMaxTypeMethodBuilder2 = (
    Argument1: number,
    Argument2: number
) => IValidationDataBuilder
export type minMaxTypeMethodBuilder3 = (
    Argument1: number,
    Argument2: number,
    Argument3: number
) => IValidationDataBuilder
export type minMaxTypeMethodBuilder4 = (
    Argument1: number,
    Argument2: number,
    Argument3: number,
    Argument4: number
) => IValidationDataBuilder

export type minMaxMethodBuilderTypes =
    | minMaxTypeMethodBuilder
    | minMaxTypeMethodBuilder1
    | minMaxTypeMethodBuilder2
    | minMaxTypeMethodBuilder3
    | minMaxTypeMethodBuilder4

export interface IValidationDataBuilder extends ISchemaValidationData {
    new (name: string): IValidationDataBuilder
    fromBuilder: (baseBuilder?: IValidationDataBuilder) => IValidationDataBuilder
    isRequired: (required: boolean) => IValidationDataBuilder
    hasMin: (min: number) => IValidationDataBuilder
    hasMax: (max: number) => IValidationDataBuilder
    hasMinLength: (minLength: number) => IValidationDataBuilder
    hasMaxLength: (maxLength: number) => IValidationDataBuilder
    hasPattern: (pattern?: RegExp) => IValidationDataBuilder
    hasCustomGuide: (messageOrKey?: string) => IValidationDataBuilder
    hasCustomError: (messageOrKey?: string) => IValidationDataBuilder
    build: () => ISchemaValidationData
}

export interface IValidationFatory {
    new (): IValidationFatory
    builders: minMaxMethodBuilderTypes[]
    addBuilders: (...builders: minMaxMethodBuilderTypes[]) => void
    /** If we need a min max min length max length based validation we can start here
     *  put the name of desired combination or alone validation definition and get the builder
     *  then: use the builder to prep for the finalizer
     * if not found it returns an empty validation builder
     */
    createMinMaxBasedBuilder: <minMaxMethodBuilderTypes>(
        name: ValidationBuildersEnum
    ) => minMaxMethodBuilderTypes
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
        base?: IValidationDataBuilder,
        pattern?: RegExp,
        customGuide?: string,
        customError?: string
    ) => ISchemaValidationData | undefined
    create: (
        required: boolean,
        pattern?: RegExp,
        customGuide?: string,
        customError?: string
    ) => ISchemaValidationData | undefined
}

export enum ValidationBuildersEnum {
    empty = 'empty',
    required = 'required',
    min = 'min',
    max = 'max',
    minMax = 'minMax',
    minMinLength = 'minMinLength',
    minMinLengthMaxLength = 'minMinLengthMaxLength',
    minMaxLength = 'minMaxLength',

    maxMinLength = 'maxMinLength',
    maxMaxLength = 'maxMaxLength',

    minMaxMinLength = 'minMaxMinLength',
    minMaxMaxLength = 'minMaxMaxLength',

    minMaxMinLengthMaxLength = 'minMaxMinLengthMaxLength',
    maxMinLengthMaxLength = 'maxMinLengthMaxLength',

    minLength = 'minLength',
    maxLength = 'maxLength',
    minLengthMaxLength = 'minLengthMaxLength'
}
