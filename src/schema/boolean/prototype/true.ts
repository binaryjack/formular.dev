import { SchemaErrorCode } from '../../constants'
import type { IBooleanSchema } from '../../types'
import type { IBooleanSchemaImpl } from '../boolean.types'

export function trueMethod(this: IBooleanSchemaImpl, message?: string): IBooleanSchema {
    return this.refine((val) => val === true, {
        message: message ?? 'Value must be true',
        code: SchemaErrorCode.Custom
    }) as IBooleanSchema
}
