import { SchemaBase } from '../base'
import { createTypeError } from '../error'
import type { IRecordSchema, ISchemaBase } from '../types'
import type { IRecordSchemaImpl } from './record.types'

export const RecordSchema = function <K extends string | number, V>(
    this: IRecordSchemaImpl<K, V>,
    keySchema: ISchemaBase<K>,
    valueSchema: ISchemaBase<V>
): void {
    this.keySchema = keySchema
    this.valueSchema = valueSchema
    // @ts-expect-error - SchemaBase.call() pattern has unavoidable type conflict with generic constructors
    SchemaBase.call(this, (value: unknown, path: string[]) => {
        if (typeof value !== 'object' || value === null || Array.isArray(value)) {
            throw new Error(createTypeError('record', path).message)
        }

        const result: Record<K, V> = {} as Record<K, V>
        const input = value as Record<string, unknown>

        for (const key in input) {
            if (Object.prototype.hasOwnProperty.call(input, key)) {
                try {
                    const parsedKey = keySchema.parse(key as K)
                    const parsedValue = valueSchema.parse(
                        input[key] as unknown as Parameters<typeof valueSchema.parse>[0]
                    )
                    result[parsedKey] = parsedValue
                } catch (err) {
                    const error = err as Error
                    throw new Error(`At key "${key}": ${error.message}`)
                }
            }
        }

        return result
    })
} as unknown as {
    new <K extends string | number, V>(
        keySchema: ISchemaBase<K>,
        valueSchema: ISchemaBase<V>
    ): IRecordSchemaImpl<K, V>
    prototype: IRecordSchema<any, any>
}
