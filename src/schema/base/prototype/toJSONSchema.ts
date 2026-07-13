import type { ISchemaBaseImpl } from '../base.types'

export function toJSONSchema(this: ISchemaBaseImpl<any, any>): Record<string, any> {
    const base: Record<string, any> = {}
    const typeName = this.constructor.name

    if (this._isOptional) base.optional = true
    if (this._isNullable) base.nullable = true
    if (this._defaultValue !== undefined) base.default = this._defaultValue

    switch (typeName) {
        case 'StringSchema':
            base.type = 'string'
            // We could extract min/max/pattern from refinements if needed in the future
            break
        case 'NumberSchema':
            base.type = 'number'
            break
        case 'BooleanSchema':
            base.type = 'boolean'
            break
        case 'DateSchema':
            base.type = 'string'
            base.format = 'date-time'
            break
        case 'ArraySchema': {
            base.type = 'array'
            const self = this as any
            if (self.element && typeof self.element.toJSONSchema === 'function') {
                base.items = self.element.toJSONSchema()
            }
            break
        }
        case 'ObjectSchema': {
            base.type = 'object'
            base.properties = {}
            base.required = []
            const self = this as any
            if (self.shape) {
                for (const key in self.shape) {
                    const field = self.shape[key]
                    if (typeof field.toJSONSchema === 'function') {
                        base.properties[key] = field.toJSONSchema()
                        if (!field._isOptional) {
                            base.required.push(key)
                        }
                    }
                }
            }
            if (base.required.length === 0) {
                delete base.required
            }
            break
        }
        case 'EnumSchema': {
            base.type = 'string'
            const self = this as any
            if (self.values) {
                base.enum = [...self.values]
            }
            break
        }
        case 'LiteralSchema': {
            const self = this as any
            base.type = typeof self.value
            base.const = self.value
            break
        }
        case 'UnionSchema': {
            const self = this as any
            if (self.options && Array.isArray(self.options)) {
                base.anyOf = self.options.map((opt: any) => 
                    typeof opt.toJSONSchema === 'function' ? opt.toJSONSchema() : {}
                )
            }
            break
        }
        case 'RecordSchema': {
            base.type = 'object'
            const self = this as any
            if (self.valueSchema && typeof self.valueSchema.toJSONSchema === 'function') {
                base.additionalProperties = self.valueSchema.toJSONSchema()
            }
            break
        }
        default:
            base.type = 'unknown'
    }

    return base
}
