import { IValidationOptions } from '@core/managers/validation-manager/validation-manager.types'
import { IFieldSchemaBuilder } from '../field-schema-types'

export function setValidationData(
    this: IFieldSchemaBuilder,
    shouldValidate: boolean,
    validationData?: IValidationOptions
) {
    Object.assign(this, {
        shouldValidate: shouldValidate,
        ...validationData
    })
    return this
}
