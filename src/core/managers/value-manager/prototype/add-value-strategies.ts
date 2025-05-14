import { InputDataTypes } from '@core/framework/common/common.input.data.types'
import { IParserStrategy, IValueManager } from '../value-manager.types'

/**
 * Adds one or more parser strategies to the ValueStrategy instance.
 * Ensures no duplicate strategies are added.
 * @param parsers - Array of parser strategies to add.
 */
export function addValueStrategies(this: IValueManager, ...parsers: IParserStrategy<any>[]) {
    for (const parser of parsers) {
        if (this.valueStrategies.find((o: IParserStrategy<InputDataTypes>) => o.id === parser.id))
            continue
        this.valueStrategies.push(parser)
    }
}
