import { FieldValuesTypes } from '../../../dependency/schema/descriptor/field.data.types'
import { IFieldInput } from '../fieldInputBase/fieldInputBase.types'
import { IParser, IValueStrategy } from './valueStrategy.types'

export const ValueStrategy = function (this: IValueStrategy, ...parser: IParser<any>[]) {
    this.parsers = parser
} as any as IValueStrategy

ValueStrategy.prototype = {
    addStrategy: function (...parsers: IParser<any>[]) {
        for (const parser of parsers) {
            if (this.parsers.find((o: IParser<unknown>) => o.id === parser.id)) continue
            this.parsers.push(parser)
        }
    },
    getValue: function (field: IFieldInput) {
        const parser = this.parsers.find((o: IParser<unknown>) =>
            o.concernedTypes.includes(field.type)
        ) as IParser<unknown>
        if (!parser) {
            console.error(`NO PARSE FOUND FOR THIS TYPE ${field.type} `)
            return
        }
        return parser.method(field.value as FieldValuesTypes)
    }
}
