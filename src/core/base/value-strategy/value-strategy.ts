import { IFieldInput } from '../field-base-input/field-input-base-types'
import { accept } from './prototype/accept'
import { addStrategy } from './prototype/add-strategy'
import { getValue } from './prototype/get-value'
import { IValueStrategy } from './value-strategy.types'

/*
        booleanParserStrategy,
        stringParserStrategy,
        numericParserStrategy,
        dateOrTimeParserStrategy,
        numericOptionBasedParserStrategy,
*/

export const ValueStrategy = function (this: IValueStrategy, field: IFieldInput) {
    this.field = field
    this.strategies = []
} as any as IValueStrategy

Object.assign(ValueStrategy.prototype, {
    accept,
    addStrategy,
    getValue
})
