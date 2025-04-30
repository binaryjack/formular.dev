import { IParserStrategy, IValueStrategy } from '../value-strategy.types'

export const acceptValueStrategies = function (
    this: IValueStrategy,
    ...parsers: IParserStrategy<any>[]
) {
    this.valueStrategies = [...parsers]
}
