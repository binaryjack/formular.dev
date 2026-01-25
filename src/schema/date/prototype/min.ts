import { SchemaErrorCode } from '../../constants'
import type { IDateSchema } from '../../types'
import type { IDateSchemaImpl } from '../date.types'

export function min(
    this: IDateSchemaImpl,
    date: Date,
    message?: string
): IDateSchema {
    return this.refine((val) => val.getTime() >= date.getTime(), {
        message: message ?? `Date must be after ${date.toISOString()}`,
        code: SchemaErrorCode.TooSmall
    }) as IDateSchema
}
