import { IValidationSchema } from '@core/managers/validation-manager/validation-manager.types'
import { IValidationSchemaBuilder } from '../validation.schema.builder.types'

export function build(this: IValidationSchemaBuilder): IValidationSchema {
    return { ...this } as IValidationSchema
}
