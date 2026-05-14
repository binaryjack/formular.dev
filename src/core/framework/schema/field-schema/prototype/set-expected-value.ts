import { IFieldSchemaBuilder } from '../field-schema-types'

export function setExpectedValue(this: IFieldSchemaBuilder, expectedValue: any | null) {
    this.expectedValue = expectedValue
    return this
}
