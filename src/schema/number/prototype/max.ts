import { DefaultErrorMessages, SchemaErrorCode } from '../../constants'
import type { INumberSchema } from '../../types'
import type { INumberSchemaImpl } from '../number.types'

export function max(this: INumberSchemaImpl, value: number, message?: string): INumberSchema {
    return this.refine((val) => val <= value, {
        message: message ?? DefaultErrorMessages.tooBig(value, 'number'),
        code: SchemaErrorCode.TooBig
    }) as INumberSchema
}
