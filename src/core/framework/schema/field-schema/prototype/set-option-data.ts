import { IOptionItem } from '../../options-schema/options.scheme.types'
import { IFieldSchemaBuilder } from '../field-schema-types'

export function setOptionData(this: IFieldSchemaBuilder, target: string, options: IOptionItem[]) {
    this.target = target
    this.options = options
    return this
}
