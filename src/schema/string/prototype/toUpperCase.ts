import type { IStringSchema } from '../../types'
import type { IStringSchemaImpl } from '../string.types'

export function toUpperCase(this: IStringSchemaImpl): IStringSchema {
    return this.transform((val) => (val as string).toUpperCase()) as IStringSchema
}
