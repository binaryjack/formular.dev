import { DefaultErrorMessages, SchemaErrorCode } from '../../constants'
import type { IStringSchema } from '../../types'
import { validateAHV } from '../string'
import type { IStringSchemaImpl } from '../string.types'

export function ahv(this: IStringSchemaImpl, message?: string): IStringSchema {
    return this.refine((val) => validateAHV(val), {
        message: message ?? DefaultErrorMessages.invalidAHV,
        code: SchemaErrorCode.InvalidString
    }) as IStringSchema
}
