import { IFieldSchemaBuilder } from '../field-schema-types'

export function setName(this: IFieldSchemaBuilder, name: string) {
    Object.defineProperty(this, 'name', {
        value: name,
        writable: false, // Prevent modification
        configurable: false, // Prevent deletion or redefinition
        enumerable: true // Make the property visible in enumerations
    })
    return this
}
