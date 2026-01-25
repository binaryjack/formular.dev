import { DefaultErrorMessages, SchemaErrorCode } from '../../constants'
import type { IStringSchema } from '../../types'
import type { IStringSchemaImpl } from '../string.types'

export function nonempty(this: IStringSchemaImpl, message?: string): IStringSchema {
    return this.refine((val) => val.length > 0, {
        message: message ?? DefaultErrorMessages.requiredField,
        code: SchemaErrorCode.Required
    }) as IStringSchema
}
