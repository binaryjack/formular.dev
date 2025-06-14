import { IFieldSchemaBuilder } from '../field-schema-types'

/**
 * To define a mask you must use # as numeric placeholder
 * example mask: '##/##/####' will be converted to 12/12/2023
 * @param mask
 *
 * @returns
 */
export function setMask(this: IFieldSchemaBuilder, mask: string) {
    this.mask = mask
    return this
}
