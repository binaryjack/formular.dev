import { conventions } from '@components/context/conventions/conventions'
import { IValidationSchemaBuilder } from '../validation.schema.builder.types'

export function fromBuilder(
    this: IValidationSchemaBuilder,
    baseBuilder?: IValidationSchemaBuilder
) {
    this.name = baseBuilder?.name ?? conventions.NameIsEmpty()
    this.required = baseBuilder?.required ?? false
    this.shouldValidate = baseBuilder?.shouldValidate
    this.pattern = baseBuilder?.pattern
    this.min = baseBuilder?.min
    this.max = baseBuilder?.max
    this.minLength = baseBuilder?.minLength
    this.maxLength = baseBuilder?.maxLength
    this.customGuide = baseBuilder?.customGuide
    this.customError = baseBuilder?.customError
    return this
}
