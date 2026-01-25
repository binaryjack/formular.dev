import { DefaultErrorMessages, SchemaErrorCode } from '../../constants'
import type { INumberSchema } from '../../types'
import type { INumberSchemaImpl } from '../number.types'

export function min(this: INumberSchemaImpl, value: number, message?: string): INumberSchema {
    return this.refine((val) => val >= value, {
        message: message ?? DefaultErrorMessages.tooSmall(value, 'number'),
        code: SchemaErrorCode.TooSmall
    }) as INumberSchema
}
