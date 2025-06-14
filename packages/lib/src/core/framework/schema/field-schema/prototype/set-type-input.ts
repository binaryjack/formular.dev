import { InputTypeNames } from '@core/framework/common/common.input.types'
import { IFieldSchemaBuilder } from '../field-schema-types'

export function setTypeInput(this: IFieldSchemaBuilder, type: InputTypeNames) {
    Object.defineProperty(this, 'type', {
        value: type,
        writable: false, // Prevent modification
        configurable: false, // Prevent deletion or redefinition
        enumerable: true // Make the property visible in enumerations
    })
    return this
}
