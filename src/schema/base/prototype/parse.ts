import { SchemaValidationError } from '../../error'
import type { ISchemaBaseImpl } from '../base.types'

export function parse<TOutput, TInput>(
    this: ISchemaBaseImpl<TOutput, TInput>,
    value: TInput
): TOutput {
    const result = this.safeParse(value)
    if (!result.success) {
        throw new SchemaValidationError(result.error)
    }
    return result.data
}
