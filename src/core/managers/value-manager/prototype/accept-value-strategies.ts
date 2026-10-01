import { IParserStrategy, IValueManager } from '../value-manager.types'

export const acceptValueStrategies = function (
    this: IValueManager,
    ...parsers: IParserStrategy<any>[]
) {
    this.valueStrategies = [...parsers]
    this.strategyByType = new Map()
    for (const strategy of this.valueStrategies) {
        for (const type of strategy.concernedTypes) {
            this.strategyByType.set(type, strategy)
        }
    }
}
