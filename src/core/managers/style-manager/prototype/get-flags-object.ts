import { IFlags, IStyleManager } from '../style-manager.types'

/**
 * Retrieves all flags (field states) as an object.
 *
 * @returns {IFlags} - An object containing all field states and their associated class names.
 */
export function getFlagsObject(this: IStyleManager): IFlags {
    const flags: any = {}
    this.classesList.forEach((value, key) => {
        flags[key] = value
    })
    return flags as IFlags
}
