import type { IStringSchema } from '../../types'
import type { IStringSchemaImpl } from '../string.types'

export function trim(this: IStringSchemaImpl): IStringSchema {
    return this.transform((val) => (val as string).trim()) as IStringSchema
}
