import type { IStringSchema } from '../../types'
import type { IStringSchemaImpl } from '../string.types'

export function toLowerCase(this: IStringSchemaImpl): IStringSchema {
    return this.transform((val) => (val as string).toLowerCase()) as IStringSchema
}
