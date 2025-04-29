import { IParserStrategy, IValueStrategy } from '../value-strategy.types'

/**
 * Adds one or more parser strategies to the ValueStrategy instance.
 * Ensures no duplicate strategies are added.
 * @param parsers - Array of parser strategies to add.
 */
export function addStrategy(this: IValueStrategy, ...parsers: IParserStrategy<any>[]) {
    for (const parser of parsers) {
        if (this.strategies.find((o: IParserStrategy<unknown>) => o.id === parser.id)) continue
        this.strategies.push(parser)
    }
}
