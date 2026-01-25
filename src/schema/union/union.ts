import { SchemaBase } from '../base'
import type { ISchemaBase, IUnionSchema } from '../types'
import type { IUnionSchemaImpl } from './union.types'

export const UnionSchema = function <T extends readonly ISchemaBase[]>(
    this: IUnionSchemaImpl<T>,
    options: T
): void {
    this.options = options
    SchemaBase.call(this, (value: unknown, path: string[]) => {
        const errors: string[] = []

        for (const schema of options) {
            const result = schema.safeParse(value)
            if (result.success) {
                return result.data as T[number]['_output']
            }
            errors.push(result.error.message)
        }

        throw new Error(`No union variant matched. Errors: ${errors.join('; ')}`)
    })
} as unknown as {
    new <T extends readonly ISchemaBase[]>(options: T): IUnionSchemaImpl<T>
    prototype: IUnionSchema<any>
}
