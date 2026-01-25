import { SchemaErrorCode } from '../../constants'
import type { IBooleanSchema } from '../../types'
import type { IBooleanSchemaImpl } from '../boolean.types'

export function falseMethod(this: IBooleanSchemaImpl, message?: string): IBooleanSchema {
    return this.refine((val) => val === false, {
        message: message ?? 'Value must be false',
        code: SchemaErrorCode.Custom
    }) as IBooleanSchema
}
