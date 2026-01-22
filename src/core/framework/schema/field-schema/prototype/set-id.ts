import { IFieldSchemaBuilder } from '../field-schema-types'

export function setId(this: IFieldSchemaBuilder, id: number) {
    Object.defineProperty(this, 'id', {
        value: id,
        writable: false, // Prevent modification
        configurable: false, // Prevent deletion or redefinition
        enumerable: true // Make the property visible in enumerations
    })
    return this
}
