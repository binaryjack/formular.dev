import { IParserStrategy, IValueStrategy } from '../value-strategy.types'

export const accept = function (this: IValueStrategy, ...parsers: IParserStrategy<any>[]) {
    this.strategies = [...parsers]
}
