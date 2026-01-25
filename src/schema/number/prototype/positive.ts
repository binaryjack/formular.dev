import { DefaultErrorMessages, SchemaErrorCode } from '../../constants'
import type { INumberSchema } from '../../types'
import type { INumberSchemaImpl } from '../number.types'

export function positive(this: INumberSchemaImpl, message?: string): INumberSchema {
    return this.refine((val) => val > 0, {
        message: message ?? DefaultErrorMessages.invalidPositive,
        code: SchemaErrorCode.InvalidNumber
    }) as INumberSchema
}
