export interface IValidationSchema {
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
