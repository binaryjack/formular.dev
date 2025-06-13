import { IFieldSchemaBuilder } from '../field-schema-types'

export function setDefaultValue(this: IFieldSchemaBuilder, defaultValue: any | null) {
    this.defaultValue = defaultValue
    return this
}
