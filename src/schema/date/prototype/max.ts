import { SchemaErrorCode } from '../../constants'
import type { IDateSchema } from '../../types'
import type { IDateSchemaImpl } from '../date.types'

export function max(this: IDateSchemaImpl, date: Date, message?: string): IDateSchema {
    return this.refine((val) => val.getTime() <= date.getTime(), {
        message: message ?? `Date must be before ${date.toISOString()}`,
        code: SchemaErrorCode.TooBig
    }) as IDateSchema
}
