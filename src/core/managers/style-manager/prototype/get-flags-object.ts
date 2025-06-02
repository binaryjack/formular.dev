import { IFieldStateFlags, IStyleManager } from '../style-manager.types'

/**
 * Retrieves all flags (field states) as an object.
 *
 * @returns {IFieldStateFlags} - An object containing all field states as boolean values.
 */
export function getFlagsObject(this: IStyleManager): IFieldStateFlags {
    const flags: any = {}
    this.classesList.forEach((value, key) => {
        // Convert string values to boolean: if the value doesn't start with "no-", it's true
        flags[key] = !value.startsWith('no-')
    })
    return flags as IFieldStateFlags
}
