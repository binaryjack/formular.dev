import { IParserStrategy, IValueManager } from '../value-manager.types'

export const acceptValueStrategies = function (
    this: IValueManager,
    ...parsers: IParserStrategy<any>[]
) {
    this.valueStrategies = [...parsers]
}
